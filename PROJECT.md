
# Edu Zambia – AI-Powered Learning Platform

---

## 🌍 Overview

**Edu Zambia** is a modern, AI-powered learning platform built specifically for students, teachers, and institutions in Zambia. Designed as an all-in-one digital campus, it combines traditional e-learning with advanced AI tutoring, social learning, gamification, and actionable analytics to unlock every learner's full potential.

---

## 🎯 Mission Statement

*To empower Zambian learners and educators with accessible, innovative, and locally relevant technology, driving academic excellence, equity, and lifelong curiosity.*

---

## 🚀 Core Features

### 1. Secure Authentication & Profiles
- **Supabase Auth:** Robust, secure login & signup with strong password requirements and email verification.
- **User Roles:** Student, Teacher, and Admin roles for personalized experience.
- **Profile Management:** Personalized avatars, bios, and academic details.

### 2. Modern Dashboard
- Personalized stats, progress bars, XP, EduCoins, and motivational greetings on login.
- Visualizes recent learning history and quick access to main features.

### 3. AI Learning Lab
- **Multi-AI Tutors:** Access leading AI models (OpenAI, Claude, Qwen, DeepSeek, Llama) for instant answers, explanations, and guidance.
- **AI Flashcards:** Effortless generation and spaced repetition review.
- **Learning Path Generator:** Get a detailed curriculum with milestones/resources for any topic.
- **AI Study Helper:** Automatic note generation, summary, personalized Q&A.

### 4. YouTube Learning Hub
- **Smart Video Search:** Filter videos by Zambian curriculum topics and grades.
- **Save & Watch:** Bookmark and follow recommended educational videos.
- **Instant PDF Notes:** AI generates downloadable study notes from any selected video.

### 5. Adaptive Learning and Analytics
- **Progress Dashboard:** XP/leveling system, achievements, and EduCoins.
- **Learning Analytics:** Visualize progress, improvement areas, and engagement data.
- **Smart Recommendations:** The system suggests paths, videos, groups, and AI tools.

### 6. Gamification
- **XP & Leveling:** Earn XP for every learning activity, quizzes, and contributions.
- **EduCoins:** Loyalty coins to unlock special content, certificates, or features.
- **Achievements:** Badges and recognitions for milestones.
- **Leaderboards:** Friendly competition among users/groups.

### 7. Social & Community
- **Knowledge Feed:** A curated feed of useful posts, resources, and campus news.
- **Groups & Messenger:** Participate in study groups, events, and real-time chat.
- **Peer Finder & Mentorship:** Discover peers, mentors, and collaborative learning opportunities.
- **Campus Map & Calendar:** Explore campus activities and upcoming events.

### 8. Accessibility & Multilingual Support
- **Instant Translation:** Translate lessons, notes, and chat into multiple local languages.
- **Mobile-first Design:** Fully responsive and touch-optimized UI.

---

## ✨ User Experience Highlights

- Modern, professional UI based on Tailwind CSS and Shadcn UI.
- Sidebar with persistent access to all major features, intuitive navigation.
- Dynamic topbar greeting, user profile menu, and notification icons.
- Easy sign-in/out, profile editing, and switching between light/dark mode.

---

## ⚙️ Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn UI, Lucide Icons
- **State Management:** @tanstack/react-query
- **Backend/API:** Supabase (Auth, Database, Edge Functions, File Storage)
- **AI Integrations:** OpenAI, Anthropic Claude, Qwen, DeepSeek, Llama (managed via Supabase Edge Functions)
- **PDF & Video:** Dynamic PDF notes (Supabase function), YouTube Data API for educational search
- **Security:** Supabase Auth, Row-Level Security, strict handling of API keys

---

## 🛡 Security & Privacy

- **Authentication:** All user access and data modification protected by Supabase Auth.
- **Row-Level Security:** All sensitive data (learning progress, notes, stats, etc) only accessible by owners.
- **API Keys:** All AI/YouTube secrets stored securely on server-side, never exposed to frontend.
- **User Privacy:** Users can export or delete their data; all actions logged securely.

---

## 🗂 Database Structure Overview

- **profiles:** Contains user info, role, academic details, avatar, XP, EduCoins.
- **notes:** User-generated and AI-generated study notes.
- **learning_paths:** Generated curriculum milestones, mapped to users and topics.
- **videos:** Bookmarked and recommended YouTube education videos.
- **groups:** Study and social groups.
- **messages:** Real-time messages (with references to users/groups).
- **achievements:** Earned badges and leaderboard positions.
- (Plus: logs, analytics, and auxiliary tables as needed.)

---

## 📊 Feature Walkthrough

### Getting Started
- Sign up with email, verify, and set up your profile.
- Arrive at your personalized dashboard.

### Navigating the App
- **Sidebar:** Quick links to Dashboard, Courses, AI Lab, Analytics, Social, etc.
- **Topbar:** Profile controls, notifications, user info.

### AI Learning Lab
- Choose an AI tutor: Ask any subject question, receive immediate explanations.
- Use flashcard/teach-back tools to reinforce understanding.
- Generate a learning path for any new topic or area of difficulty.
- Summarize uploaded materials or turn YouTube videos into notes/PDFs.

### Social Learning
- Share questions or tips via Knowledge Feed.
- Join relevant study groups, or create/join campus events.
- Chat in real time and build academic connections.

### Gamification & Progress
- Track XP and EduCoins earned through learning activities.
- Unlock certificates or special content.
- View achievements, ranks, and analytics via dedicated pages.

---

## 🛠 Developer Guide

1. **Clone Project:**  
   ```sh
   git clone <your_repo_url>
   cd edu-zambia
   npm install
   ```

2. **Configure Supabase:**
   - Create/connect Supabase project.
   - Import SQL schemas (or auto-migrate via Lovable).
   - Set OpenAI, Claude, YouTube, and other API secrets in Supabase Edge Functions config.

3. **Run Locally:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173)

4. **Set Environment/Secrets:**
   - All secret keys are managed via Lovable and Supabase dashboard.
   - No .env file needed in frontend.

5. **Edge Functions:**
   - All AI/YouTube/PDF/notification integrations run via secure, serverless edge functions.
   - Monitor with Supabase logs for debugging.

6. **Deploy:**
   - Deploy with [Publish] in Lovable, or use Vercel/Netlify with Supabase connection for frontend.

---

## 🌐 Demo & Presentation

- **Public Demo:** [YOUR EDU ZAMBIA URL](https://lovable.dev/projects/7ee78fd5-8854-4bfb-bc1a-38e0c56b2a95)
- Demo walkthrough: Show dashboard, AI Lab, YouTube Hub, social feeds, profile, gamification, analytics.

---

## 🙏 Credits & Acknowledgments

Built with ❤️ by Nawa Mulope, Brighton Nalionwa, Day, Mr. Loza, Mom, Dad, and the Zambian learning community.

- Powered by [Lovable](https://lovable.dev/), [Supabase](https://supabase.com/), [OpenAI](https://openai.com/), and open-source contributors.
- Inspired by Zambian teachers, students, and parents.

---

## 📬 Contact

For more information, contact the Edu Zambia team via the app’s About page or official site.

---

## 📄 License

MIT – Free for educational and non-profit use.

