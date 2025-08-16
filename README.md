# Kartikey Kumar - AI Enhanced Portfolio

[![React](https://img.shields.io/badge/React-18.2.0-%2361DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-%23646CFF)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-%2306B6D4)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Edge_Functions-%233ECF8E)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Chatbot-%234285F4)](https://ai.google.dev/)

This is a modern, interactive developer portfolio showcasing projects, skills, and experience. It features smooth animations, a dark/light theme, blog integration, and an AI-powered chatbot assistant knowledgeable about the portfolio's owner.

## ✨ Features

- **Interactive UI:** Smooth page transitions and animations using Framer Motion.
- **Responsive Design:** Adapts seamlessly to desktop, tablet, and mobile devices.
- **Dark/Light Mode:** User-selectable theme with persistence using `localStorage`.
- **Project Showcase:** Displays featured projects and categorized project lists with links to live demos and source code.
- **Skills Visualization:** Highlights technical skills with proficiency indicators.
- **AI Chatbot:** An integrated chatbot powered by Google Gemini via Supabase Edge Functions, capable of answering questions about Kartikey's experience based on provided context.
- **Blog Integration:** Fetches and displays blog posts dynamically from Hashnode.
- **Contact Form:** Integrated with EmailJS for easy communication.
- **Resume Viewer:** Direct link to view/download the resume PDF.
- **Particle Background:** Engaging background animation using Three.js and React Three Fiber.

## 🛠️ Tech Stack

- **Frontend:**
  - React 18
  - Vite
  - JavaScript
  - Tailwind CSS
  - Framer Motion (Animations)
  - React Router (Routing)
  - React Hook Form (Form Handling)
  - Lucide React (Icons)
  - React Three Fiber / Drei (3D Particles)
  - React Markdown
- **Backend & Services:**
  - **Supabase:**
    - Edge Functions (Serverless chatbot backend)
    - Database (Storing chat sessions)
  - **Google Gemini AI:** Powers the chatbot's conversational abilities.
  - **EmailJS:** Handles contact form submissions.
  - **Hashnode API:** Fetches blog posts.
- **Development Tools:**
  - ESLint (Linting)
  - npm (Package Management)

## ⚙️ Setup Instructions

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/awesome-kartikey/kartikey-portfolio-ai.git
    cd kartikey-portfolio-ai
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root and add the following variables:

    ```env
    # EmailJS Credentials (See EMAIL_SETUP.md)
    VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
    VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
    VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
    VITE_RECIPIENT_EMAIL=YOUR_EMAIL_ADDRESS_FOR_CONTACT_FORM

    # Supabase Credentials (For Chatbot)
    VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

    # Hashnode Credentials (For Blog)
    VITE_HASHNODE_HOST=YOUR_HASHNODE_PUBLICATION_HOST # e.g., yourusername.hashnode.dev

    # Gemini API Key (Used in Supabase Function - Set this in Supabase Dashboard)
    # In your Supabase project dashboard -> Project Settings -> Functions -> chatbot -> Secrets
    # Add a secret named GEMINI_API_KEY with your Google AI Studio Gemini API key value.
    ```

    - See `EMAIL_SETUP.md` for EmailJS setup details.
    - You need a Supabase account and project for the chatbot.
    - You need a Hashnode account and publication host for the blog.
    - You need a Google AI Studio API key (for Gemini Flash) for the chatbot backend.

4.  **Deploy Supabase Functions:**
    If you haven't set up the Supabase CLI, follow the [Supabase Local Development Guide](https://supabase.com/docs/guides/cli/local-development).
    Link your local project to your Supabase project:

    ```bash
    supabase link --project-ref YOUR_PROJECT_REF
    ```

    Deploy the functions:

    ```bash
    supabase functions deploy --no-verify-jwt
    # Or deploy a specific function:
    # supabase functions deploy chatbot --no-verify-jwt
    ```

    _Note: Ensure the Gemini API Key secret is set in the Supabase dashboard as mentioned in step 3._

5.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:5173` (or another port if 5173 is busy).

6.  **Build for production:**
    ```bash
    npm run build
    ```
    This command creates a `dist` folder with the optimized production build.

## 🚀 Usage

Navigate the portfolio using the navigation bar:

- **Home:** Landing page with hero section, tech stack, and overview.
- **About:** Detailed information about Kartikey Kumar.
- **Projects:** Showcase of featured projects and a categorized list of all projects.
- **Skills:** Overview of technical skills and expertise.
- **Blog:** Dynamically loaded blog posts from Hashnode.
- **Contact:** Contact form to send messages via EmailJS.
- **AI Chatbot:** Click the chat bubble (bottom-right) to interact with the AI assistant. Ask questions about Kartikey's skills, projects, or experience.
- **Theme Toggle:** Switch between light and dark modes using the sun/moon icon.
- **View Resume:** Button to open the PDF resume in a new tab.
