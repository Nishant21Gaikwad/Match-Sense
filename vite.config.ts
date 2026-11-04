import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '';

  return {
    plugins: [
      react(),
      {
        name: 'local-serverless-api-gemini',
        configureServer(server) {
          server.middlewares.use('/api/gemini', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const parsedBody = JSON.parse(body || '{}');
                const { prompt, schema } = parsedBody;

                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'No GEMINI_API_KEY configured in local environment' }));
                  return;
                }

                const models = ['gemini-3.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-3.5-flash'];
                const clientReferer = (req.headers['referer'] as string) || 'https://match-sense-vert.vercel.app/';

                let result = null;
                let lastError = null;

                for (const model of models) {
                  try {
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
                    const geminiRes = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Referer: clientReferer
                      },
                      body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                          responseMimeType: 'application/json',
                          responseSchema: schema,
                          temperature: 0.2
                        }
                      })
                    });

                    const data = await geminiRes.json();
                    if (!geminiRes.ok) {
                      lastError = data;
                      continue;
                    }

                    const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
                    result = parsed;
                    break;
                  } catch (err: any) {
                    lastError = err;
                  }
                }

                if (result) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ result }));
                } else {
                  res.statusCode = 502;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: lastError || 'Failed to generate from Gemini' }));
                }
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'Server error' }));
              }
            });
          });
        }
      }
    ]
  };
});
