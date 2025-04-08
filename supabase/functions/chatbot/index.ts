// supabase/functions/chatbot/index.ts
import { corsHeaders } from '../_shared/cors.ts';

// Retrieve your Gemini API key from environment variables
const geminiApiKey = Deno.env.get("GEMINI_API_KEY") || "";

console.log(`Function "chatbot" up and running!`);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { message, context } = await req.json();

    // Use your Gemini API
    const geminiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": geminiApiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Context about the portfolio owner: ${context}\n\nUser question: ${message}\n\nProvide a helpful, concise response as a portfolio chatbot.`
          }]
        }]
      }),
    });

    console.log("Gemini Response Status:", geminiResponse.status); //logging the status code
    const geminiData = await geminiResponse.json();
    console.log("Gemini Response Data:", geminiData); //logging the data.
    // Extract the response text from Gemini
    const geminiAnswer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response at this time.";

    // Return the response with CORS headers
    return new Response(
      JSON.stringify({ reply: geminiAnswer }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error("Error in chatbot function:", error, error.stack);

    // Return error response with CORS headers
    return new Response(
      JSON.stringify({
        error: error.message,
        reply: "Something went wrong. Please try again later."
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});