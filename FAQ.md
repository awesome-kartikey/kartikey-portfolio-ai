# Frequently Asked Questions (FAQ)

Here are answers to some common questions about the Kartikey Portfolio AI project.

**General**

1.  **Q: What is the main purpose of this project?**
    **A:** This project serves as a modern, AI-enhanced personal portfolio for Kartikey Kumar, a Full Stack Developer. It showcases his skills, projects, experience, and integrates an AI chatbot for interactive Q&A.

2.  **Q: Is this a template I can use for my own portfolio?**
    **A:** While the code is available (check the [LICENSE](LICENSE)), it's specifically designed for Kartikey Kumar. You would need to significantly modify the content, project data (`src/data/projectsData.js`), resume context (`src/components/features/chatbot/resumeContext.js`), styling, API keys, and potentially the chatbot logic to adapt it for your own use.

**Technical**

3.  **Q: How does the AI Chatbot work?**
    **A:**
    *   The frontend (`Chatbot.jsx`) captures user input.
    *   It sends the message along with pre-defined context about Kartikey (`resumeContext.js`) to a Supabase Edge Function (`supabase/functions/chatbot/index.ts`).
    *   The Supabase Edge Function securely calls the Google Gemini AI API, passing the user message and the context.
    *   Gemini generates a response based on the provided information.
    *   The Edge Function sends the AI's reply back to the frontend.
    *   Chat history and session IDs are managed, potentially using the Supabase Database (`chat_sessions` table) to provide context across interactions within a session.

4.  **Q: How is the contact form handled? Does it need a backend?**
    **A:** The contact form uses EmailJS (`src/services/emailService.js`). EmailJS is a third-party service that allows sending emails directly from the client-side (browser) without needing your own backend server for email handling. You need to configure it with your EmailJS Service ID, Template ID, and Public Key in the `.env` file. See `EMAIL_SETUP.md`.

5.  **Q: Where do the blog posts come from?**
    **A:** The blog posts displayed on the `/blog` and `/blog/:slug` pages are fetched dynamically from Kartikey Kumar's Hashnode publication using the Hashnode GraphQL API. The `src/services/hashnodeService.js` file handles the API requests.

6.  **Q: How does the dark/light mode theme switching work?**
    **A:**
    *   It uses a custom hook `src/hooks/useTheme.js`.
    *   The hook checks `localStorage` for a saved theme or detects the user's system preference.
    *   It adds either a `light` or `dark` class to the `<html>` element.
    *   Tailwind CSS is configured with `darkMode: 'class'` and CSS variables defined in `src/styles/tailwind.css` to apply different styles based on the presence of the `.dark` class.
    *   The user's preference is saved in `localStorage`.

7.  **Q: What is Supabase used for in this project?**
    **A:** Supabase provides the backend infrastructure for the AI chatbot.
    *   **Supabase Edge Functions:** Run the serverless code that interacts with the Gemini AI API securely.
    *   **Supabase Database:** Used to store chat session information (session\_id, message history) allowing for some level of conversational context persistence.
    *   **Supabase Client Library (`@supabase/supabase-js`):** Used in the frontend to invoke the Edge Function.

8.  **Q: How do I set up the required API keys and environment variables?**
    **A:** You need to create a `.env` file in the root directory of the project. The required variables are listed in the [Setup Instructions](#️-setup-instructions) section of the README.md. You'll need keys/IDs from EmailJS, Supabase, and Hashnode. The Gemini API key needs to be set as a secret in your Supabase project dashboard under Functions settings.

**Development**

9.  **Q: How can I contribute to the project?**
    **A:** Contributions are welcome! Please refer to the [Contributing](#-contributing) section in the README.md for guidelines on how to fork the repository, create a branch, make changes, and submit a pull request.

10. **Q: I found a bug. How can I report it?**
    **A:** Please open an issue on the project's GitHub repository, providing details about the bug, steps to reproduce it, and your environment (browser, OS).