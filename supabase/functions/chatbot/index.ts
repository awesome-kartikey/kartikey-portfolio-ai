import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

console.log("Chatbot Function Initialized");

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // 1. Get Secrets 
    // We check PROJECT_URL in case SUPABASE_URL wasn't auto-injected or was overridden
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("PROJECT_URL");
    const supabaseServiceKey = Deno.env.get("SERVICE_ROLE_KEY");

    // Validate Secrets
    if (!geminiApiKey) throw new Error("Missing GEMINI_API_KEY");
    if (!supabaseUrl) throw new Error("Missing SUPABASE_URL or PROJECT_URL");
    if (!supabaseServiceKey) throw new Error("Missing SERVICE_ROLE_KEY");

    // Parse Body
    const { message } = await req.json();
    if (!message) throw new Error("No message provided in request body");

    // 2. Generate Embedding (Gemini 001)
    // We force 768 dimensions to match your pgvector table
    const embeddingResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "models/gemini-embedding-001",
          content: { parts: [{ text: message }] },
          outputDimensionality: 768
        }),
      }
    );

    const embeddingData = await embeddingResponse.json();

    // Catch Gemini API errors
    if (embeddingData.error) {
      console.error("Gemini Embedding Error Details:", JSON.stringify(embeddingData.error));
      throw new Error(`Gemini Embedding Error: ${embeddingData.error.message}`);
    }

    const queryEmbedding = embeddingData.embedding?.values;
    if (!queryEmbedding) throw new Error("Failed to generate embedding vector");

    // 3. Search Vector DB
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: documents, error: searchError } = await supabase.rpc('match_portfolio_content', {
      query_embedding: queryEmbedding,
      match_threshold: 0.3, // 0.3 allows for slightly looser matches
      match_count: 3
    });

    if (searchError) {
      console.error("Supabase RPC Error:", searchError);
      throw new Error(`Database Search Error: ${searchError.message}`);
    }

    // Prepare context
    const contextText = documents?.map((doc: any) => doc.content).join("\n---\n") || "No specific details found in the portfolio database.";

    // 4. Generate Answer (Gemini Flash)
    const chatResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an AI assistant for Kartikey Kumar's portfolio.
              
              INSTRUCTIONS:
              - Answer the user's question using the CONTEXT provided below.
              - If the answer is not in the context, be polite and suggest contacting Kartikey directly.
              - Keep answers concise and professional.
              
              CONTEXT:
              ${contextText}
              
              USER QUESTION:
              ${message}`
            }]
          }]
        }),
      }
    );

    const chatData = await chatResponse.json();

    if (chatData.error) {
      console.error("Gemini Chat Error Details:", JSON.stringify(chatData.error));
      throw new Error(`Gemini Chat Error: ${chatData.error.message}`);
    }

    const reply = chatData.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

    // Success Response
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("CRITICAL FUNCTION ERROR:", error.message);
    // Return the error to the frontend so you can see it in the console
    return new Response(JSON.stringify({
      error: error.message,
      reply: "I encountered a system error. Please check the console/logs."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});