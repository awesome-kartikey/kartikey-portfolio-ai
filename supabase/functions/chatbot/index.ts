import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

interface Document {
  content: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

console.log("Chatbot Function Initialized");

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // Secrets
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("PROJECT_URL");
    const supabaseServiceKey = Deno.env.get("SERVICE_ROLE_KEY");

    if (!geminiApiKey || !supabaseUrl || !supabaseServiceKey) throw new Error("Missing Secrets");

    // 1. Parse Message AND History
    const { message, history } = await req.json(); // <--- Receive History

    // 2. Generate Embedding (Only for the CURRENT message)
    // We don't embed history because it dilutes the search intent.
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
    const queryEmbedding = embeddingData.embedding?.values;

    // 3. Search Vector DB
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: documents } = await supabase.rpc('match_portfolio_content', {
      query_embedding: queryEmbedding,
      match_threshold: 0.3,
      match_count: 3
    });

    const contextText = documents?.map((doc: Document) => doc.content).join("\n---\n") || "No specific details found.";

    // 4. Construct the Chat Prompt with History
    // We format previous messages into the prompt so Gemini "remembers"
    let historyContext = "";
    if (history && Array.isArray(history)) {
      historyContext = history.map((msg: Message) =>
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      ).join("\n");
    }

    // 5. Generate Answer
    const chatResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `
              You are an AI assistant for Kartikey Kumar, an Independent Software Engineer.
              
              GOAL:
              Convince the user that Kartikey is an exceptional engineer suitable for high-level roles.
              Be professional, concise, and slightly enthusiastic.
              
              KNOWLEDGE BASE (Use this to answer):
              ${contextText}
              
              CONVERSATION HISTORY:
              ${historyContext}
              
              CURRENT USER QUESTION:
              ${message}
              
              YOUR RESPONSE:`
            }]
          }]
        }),
      }
    );

    const chatData = await chatResponse.json();
    const reply = chatData.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: Error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});