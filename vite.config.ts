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

                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
                const clientReferer = (req.headers['referer'] as string) || 'https://match-sense-vert.vercel.app/';
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
                      responseSchema: schema
                    }
                  })
                });

                const data = await geminiRes.json();
                if (!geminiRes.ok) {
                  res.statusCode = geminiRes.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return;
                }

                const parsed = JSON.parse(data.candidates[0].content.parts[0].text);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result: parsed }));
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
