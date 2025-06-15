
# Edu Zambia – AI-Powered Learning Platform

---

## 🌍 Overview

**Edu Zambia** is a groundbreaking AI-driven learning platform designed for Zambian students, teachers, and institutions. Blending traditional e-learning with generative AI, analytics, and community features, Edu Zambia empowers a new generation of lifelong learners to grow, connect, and succeed.

---

## 🚀 Quick Highlights

- **Modern UI/UX** with easy navigation, dark/light modes, and mobile responsiveness
- **AI Learning Lab** – Your personal AI tutors, study helpers, and note generators
- **YouTube Learning Hub** – Curated video learning with instant PDF study notes
- **Gamification** – XP, levels, EduCoins, and achievements to motivate progress
- **Social Learning Features** – Groups, messaging, knowledge feed, and mentorship
- **Smart Learning Paths** – Automatically generated journeys for any subject/grade
- **Comprehensive Analytics** – Track progress, get recommendations, improve outcomes
- **Secure and Scalable** – Built on Supabase Auth, Edge Functions, and strict security

---

## 🎯 Mission Statement

Our goal is to unlock the full learning potential of every Zambian student and teacher—combining accessibility, innovation, and local relevance through world-class technology.

---

## 📝 Key Features – In Depth

### 1. Dashboard & Personalization
- Fully personalized greeting and stats after login.
- Track learning progress, XP, level, and EduCoins earned.

### 2. AI Tools (Sidebar Access)
- **AI Tutors**: Ask subject questions, generate explanations, or solve problems using multiple AI models (OpenAI, Claude, Qwen, DeepSeek, Llama).
- **AI Flashcards & Teach Back**: Easily generate and review flashcards. Teach AI concepts to reinforce understanding.
- **Learning Path Generator**: Input any topic to get a full curriculum path with milestones and resources.
- **Smart Study Helper**: Get instant notes, summaries, and answer explanations.

### 3. YouTube Learning Hub
- Powerful educational video search (subject/grade filters).
- Watch and save recommended videos.
- Instantly create downloadable PDF notes from any video with AI.
- Gamified UX: Earn XP/EduCoins for learning actions.

### 4. Social & Community
- **Knowledge Feed**: Posts and resources from across campus or friends.
- **Discussion Groups**: Join or form study groups around subjects or schools.
- **Messenger**: Real-time chat with peers or mentors.
- **Campus Map & Event Calendar**: Find events, friends, and campus locations.

### 5. Analytics & Smart Recommendations
- View achievement badges, learning analytics, daily/weekly progress.
- System recommends new courses, learning paths, and social groups.

### 6. Gamification and Virtual Rewards
- Earn XP for studying, completing lessons, making notes.
- Level up your profile and unlock EduCoins.
- Buy certificates or unlock special content.

### 7. Accessibility & Multilingual
- Instant translations for lessons, notes, and chat.
- Responsive design for all device sizes.

---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn UI
- **UI:** Lucide-React icons, Shadcn pre-built components, responsive mobile-first layouts
- **Backend/APIs:** Supabase (Edge Functions for AI, YouTube, PDF), PostgreSQL, Secure Auth
- **AI Integrations:** OpenAI, Anthropic Claude, Qwen, DeepSeek, Llama (Edge Function secrets)
- **PDF Export:** On-demand note generation (Edge Function)
- **State Management:** @tanstack/react-query

---

## 🔒 Security & Privacy

- **Authentication:** Supabase Auth (secure, set for strong password policies)
- **Row-Level Security (RLS):** Enforced on all tables for data privacy
- **API Keys:** Managed as Supabase secrets in edge functions, never exposed to frontend
- **User Data:** Users control their profile, preferences, and can delete/export their data

---

## 🛠️ Local Development & Deployment

1. **Clone the repo:**
    ```
    git clone <your_repo_url>
    cd edu-zambia
    npm install
    ```

2. **Set up Supabase Project:**
    - Import SQL schema (if custom, or connect project for auto-migration)
    - Add API keys (OpenAI, Claude, etc) as secrets in the Supabase dashboard

3. **Run Locally:**
    ```
    npm run dev
    ```
    - App runs on [http://localhost:5173](http://localhost:5173)

4. **Deploy:**
    - Use Lovable's "Publish" option or deploy to Vercel/Netlify (for static frontend), with Supabase URL/keys configured through Lovable’s dashboard.

---

## 🧑‍💻 Feature Walkthrough

### **Login/Signup**
- Users create an account with email and strong password.
- Profiles are created for all users with role, country, avatar.

### **Navigation**
- Persistent sidebar with access to all major features, categorized for clarity.
- Responsive topbar greeting and easy sign-out.

### **AI Labs & Tutors**
- Send questions or text to multiple AI models.
- Use specialized tools for flashcards, summarization, emotion detection, etc.

### **YouTube Learning Hub**
- Search educational videos (edges call YouTube API via serverless function).
- Filtering by subject/grade.
- Click any result to generate PDF study notes (AI-generated, downloadable).

### **Achievements & Progress**
- Dashboard visualizes user’s XP, coin balance, and level progress.
- Achievement page lists unlocked badges.

### **Social & Community**
- Join and create groups. Post in feeds. Real-time chat.

---

## 🎉 Why Edu Zambia Is Special

- **Built for Emerging Education**: Focused on African and Zambian curriculum and realities.
- **Modern, Fun & Motivating:** Game mechanics, rewards, and beautiful, professional UI.
- **AI-first, Ethical, Safe:** AI is used to enhance—not replace—teachers and peer learning.
- **Scalable:** Cloud backend (Supabase/Postgres), designed for campus or nation-wide rollout.

---

## 🙏 Credits

- Built with ❤️ by Nawa Mulope, Brighton Nalionwa, Day, Mr. Loza, Mom, Dad, and the Zambian learning community.
- Powered by Lovable, Supabase, OpenAI, and contributors to FOSS.

---

## 🔗 Useful Links

- **Demo:** [YOUR EDU ZAMBIA URL](https://lovable.dev/projects/7ee78fd5-8854-4bfb-bc1a-38e0c56b2a95)
- **Supabase Docs:** https://supabase.com/docs
- **Lovable Docs:** https://docs.lovable.dev/

---

## 📬 Get In Touch

For more, contact the Edu Zambia team via [official website] or the app’s About page.

---

