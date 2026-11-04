# MatchSense ⚡ • AI Live Match Companion
> **15s Story Catch-Ups & Real-Time Tactical Flashcards for Live Sports Fans**  
> *Built for the Dream11 Forward Deployed Engineer (FDE) Intern Assignment*

🌐 **Live Working Artifact**: [https://match-sense-vert.vercel.app](https://match-sense-vert.vercel.app)  
📁 **GitHub Repository**: [https://github.com/Nishant21Gaikwad/Match-Sense](https://github.com/Nishant21Gaikwad/Match-Sense)

---

## 📋 200-Word Submission Note

### 1. What Fan Problem Are We Solving?
During live high-stakes sports matches, fans face two major pain points:
1. **Context Loss (Late Tune-In Problem)**: Fans tuning in midway (after work or commute) only see cold scorecards (`173/5 in 18.4`). Numbers don't convey game momentum, dropped catches, or tactical turning points.
2. **Rule & Strategy Opacity (Casual Fan Friction)**: Modern cricket is packed with complex technicalities (DRS Hawkeye margins, Umpire's Call, MCC Law 18.11 strike rules, deep-crease biomechanics). Casual viewers often wonder why fielders shifted or why a review wasn't lost.

### 2. How Does MatchSense Help?
MatchSense transforms passive scoreboard watching into an intelligent interactive companion:
- **"Catch Me Up" (15s Story Engine)**: Delivers 15-second narrative briefings for missed overs (Last 2 Overs, Powerplay, or custom voice/text query) with one-tap broadcast voice readouts.
- **Interactive 3D Doubt Flashcards**: Automatically detects match events (DRS, bouncers, field shifts) and generates tactile, 3D flippable cards (Front: Question & Hook; Back: In-depth Tactical/Rule Breakdown & Telemetry).
- **Sticky Live Simulation**: Auto-advances ball-by-ball through the final death overs (18.1 to 20.0 climax) with instant pause/play controls.
- **Multilingual (EN / हिंदी / मराठी)**: Authentic regional sports experience with voice recognition and neural commentary voice.

### 3. Which AI Tools Did We Use?
- **Gemini 3.5 Flash API**: Live match reasoning, JSON-structured tactical flashcard generation, and contextual catch-up storytelling.
- **Web Speech Recognition API**: Hands-free voice input for custom over inquiries and cricket doubts.
- **Neural Speech Synthesis**: Cricket-normalized broadcast voice engine with Devanagari phoneme mapping.

---

## ⚡ Key Features

| Feature | Description |
| :--- | :--- |
| **🕹️ Sticky Live Sim Bar** | Fixed at the top so reviewers can pause/resume auto-advancing match simulation (`18.1` to `20.0`) anytime. |
| **🔄 3D Flippable Flashcards** | Neo-brutalist tactile cards with color-coded categories (DRS/Rules, Tactics, Bowling, Batter Matchups, AI Doubts). |
| **⏱️ 15-Second Catch Me Up** | Instant narrative recap of what happened while you were away, accompanied by natural voice audio. |
| **🎙️ Voice-First Interaction** | Tap "Speak" to ask any custom cricket query or dictate overs in English, Hindi, or Marathi. |
| **📊 Real-Time Telemetry** | Dynamic Win Probability graph, Run Rate pressures, ball-by-ball speeds, and captaincy trigger tracking. |
| **📱 Fully Responsive** | Designed with 3D perspective transforms optimized for mobile, tablet, and desktop viewports. |

---

## 🏏 12-Ball Serial Climax Timeline (MI vs SRH • Target: 194)

The built-in live simulation advances through 12 consecutive deliveries without skipping any balls:
- **18.1**: `0` • Bumrah wide yorker setup to Klaasen (fine-leg brought inside ring)
- **18.2**: `W` • Heinrich Klaasen LBW on Umpire's Call DRS (SRH 168/5)
- **18.3**: `4` • Abdul Samad top-edges 143 kph bouncer (1st bouncer signal)
- **18.4**: `1` • Blockhole yorker single puts Pat Cummins on strike
- **18.5**: `0` • Bumrah vicious 142 kph inswinging toe-crusher to Cummins
- **18.6**: `1` • Cummins inside-edge single; Bumrah completes masterclass **4-0-27-2** (SRH need 20 off 6)
- **19.1**: `4` • Samad cover drive pierces the gap (SRH need 16 off 5)
- **19.2**: `6` • Samad launches 102m monster pull into Wankhede stands (SRH need 10 off 4)
- **19.3**: `2` • Sliced wide yorker; Tim David diving boundary save on the rope
- **19.4**: `W` • Samad caught on the boundary rope by Tim David; MCC Law 18.11 explainer
- **19.5**: `1` • Bhuvneshwar single down to long-off (SRH need 7 to win, 6 for Super Over!)
- **19.6 / 20.0**: `4` • Hardik nails wide yorker; Cummins slices four, **Mumbai Indians win by 2 runs!**

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Neo-brutalist aesthetic with custom 3D perspective & backface visibility)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans & Noto Sans Devanagari (Google Fonts)
- **AI / LLM**: Google Gemini 3.5 Flash API
- **Speech**: Web Speech API (Recognition + Synthesis)
- **Deployment**: Vercel Production Platform

---

## 🚀 Getting Started Locally

```bash
# 1. Clone the repository
git clone https://github.com/Nishant21Gaikwad/Match-Sense.git
cd Match-Sense

# 2. Install dependencies
npm install

# 3. (Optional) Set your Gemini API Key in .env
# VITE_GEMINI_API_KEY=your_gemini_api_key_here

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build
```

---

## 👤 Author
**Nishant Gaikwad**  
- **GitHub**: [@Nishant21Gaikwad](https://github.com/Nishant21Gaikwad)  
- **Live Demo**: [https://match-sense-vert.vercel.app](https://match-sense-vert.vercel.app)
