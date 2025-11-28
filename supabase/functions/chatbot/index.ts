import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const geminiApiKey: string = Deno.env.get("GEMINI_API_KEY") || "";
const supabaseUrl: string = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey: string = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// 1. Helper to generate embeddings using Gemini API (REST)
async function generateEmbedding(text: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/gemini-embedding-001",
        content: { parts: [{ text }] },
        embedding_config: {
          output_dimensionality: 768
        }
      }),
    }
  );
  const data = await response.json();
  return data.embedding.values;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { message } = await req.json();

    // 2. Initialize Supabase Client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Generate Embedding for User Query
    const queryEmbedding = await generateEmbedding(message);

    // 4. Search Vector Database (RPC Call)
    const { data: documents, error: searchError } = await supabase.rpc('match_portfolio_content', {
      query_embedding: queryEmbedding,
      match_threshold: 0.5, // Similarity threshold
      match_count: 3        // Top 3 relevant chunks
    });

    if (searchError) console.error("Vector search error:", searchError);

    // 5. Construct Context String
    const contextText = documents?.map((doc: { content: string }) => doc.content).join("\n---\n") || "No specific portfolio details found.";

    // 6. Generate Response with Gemini
    const geminiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + geminiApiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `
              You are an AI assistant for Kartikey Kumar's portfolio.
              Use the following context to answer the user's question.
              If the answer isn't in the context, be polite and say you don't know, but suggest contacting Kartikey.
              
              CONTEXT from Database:
              ${contextText}
              
              USER QUESTION:
              ${message}
            `
          }]
        }]
      }),
    });

    const geminiData = await geminiResponse.json();
    const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});