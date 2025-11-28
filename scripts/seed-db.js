import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load .env from the project root
dotenv.config();

// Validation checks
if (!process.env.VITE_SUPABASE_URL) {
    console.error('❌ VITE_SUPABASE_URL is missing from .env');
    process.exit(1);
}
if (!process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ VITE_SUPABASE_SERVICE_ROLE_KEY is missing from .env');
    process.exit(1);
}
if (!process.env.VITE_GEMINI_API_KEY) {
    console.error('❌ VITE_GEMINI_API_KEY is missing from .env');
    process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
// IMPORTANT: Use embedding-001 but force 768 dimensions via config below
const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });

// Documents Array (Using your provided list)
const documents = [
    {
        content: "Kartikey Kumar is an Independent Full Stack Engineer & AI Engineer based in Roorkee, India. He has 1+ years of experience building scalable SaaS with Next.js 14, AWS, and OpenAI.",
        metadata: { type: "bio" }
    },
    {
        content: "Experience: Kartikey worked as an AI Model Trainer at Remotasks (Scale AI) from Nov 2023 to May 2024. He improved AI model performance by 30% using RLHF and engineered 200+ coding prompts.",
        metadata: { type: "experience" }
    },
    {
        content: "Experience: Built multiple production-grade full-stack applications independently, including Q&A platforms, real-time tools, and AI-driven SaaS products. Strong ownership mindset.",
        metadata: { type: "experience" }
    },
    {
        content: "Project SpeakEasyAI: A SaaS that converts video/audio into SEO blogs. Built with Next.js 14, OpenAI Whisper, GPT-4, and Stripe. Solved browser timeout issues by architecting an async AWS S3 ingestion pipeline.",
        metadata: { type: "project" }
    },
    {
        content: "Project Dev Overflow: A full-featured Q&A platform similar to Stack Overflow. Built with Next.js, TypeScript, MongoDB, and AI-powered search. Implemented rate limiting, tag-based ranking, and gamified reputation.",
        metadata: { type: "project" }
    },
    {
        content: "Project Home Bills Tracker (Nov 2025): An offline-first PWA for financial tracking built with React, TypeScript, and Vite. Features expense visualization and mobile-native feel.",
        metadata: { type: "project" }
    },
    {
        content: "Project Pathfinder Visualizer: An interactive algorithm simulator for BFS, DFS, Dijkstra, and A*. Demonstrates deep understanding of graph theory and performance optimization.",
        metadata: { type: "project" }
    },
    {
        content: "Engineering Philosophy: Kartikey follows the 'Mindful Creation' approach, inspired by the Bhagavad Gita. He focuses on disciplined action to build tools that reduce friction and increase human creativity.",
        metadata: { type: "philosophy" }
    },
    {
        content: "Technical Skills: Expert in JavaScript, TypeScript, Rust, Next.js 14, React, Node.js, PostgreSQL (NeonDB), and Vector Databases (Supabase pgvector).",
        metadata: { type: "skills" }
    },
    {
        content: "Technical Skills: Advanced in system design, API architecture, caching strategies, background processing, and event-driven workflows using queues and workers.",
        metadata: { type: "skills" }
    },
    {
        content: "AI Expertise: Skilled in LLM prompt engineering, embeddings-based retrieval (RAG), Whisper pipelines, streaming transcription, and lightweight fine-tuning workflows.",
        metadata: { type: "skills" }
    },
    {
        content: "LeetCode Stats: 650+ Problems solved. Global Rank: Top 8%. Active Streak: 360+ Days. Badge: 500 Days Badge. Strong in Graphs and DP.",
        metadata: { type: "stats" }
    },
    {
        content: "System Design Strengths: Experienced in designing scalable real-time applications, microservices using NestJS, CDN-based image optimization, and serverless-first architectures.",
        metadata: { type: "systemdesign" }
    },
    {
        content: "Open Source: Active contributor during Hacktoberfest 2025. Contributed complex CSS animations to 'Animation Nation' and backend refactors to 'ZTM URL Shortener' in Rust.",
        metadata: { type: "opensource" }
    },
    {
        content: "Career Objective: Building AI-first developer tools and modern SaaS. Long-term goal: become a Staff Engineer specializing in AI-driven product architecture.",
        metadata: { type: "objective" }
    },
    {
        content: "Education: Completed Bachelor of Computer Applications (BCA) from IGNOU. Learned low-level computing concepts, data structures, and algorithmic problem-solving.",
        metadata: { type: "education" }
    },
    {
        content: "Personal Story: Inspired by his father, a computer engineer in the Indian Army. Began coding through curiosity-driven exploration, including game memory manipulation and small utilities.",
        metadata: { type: "story" }
    },
    {
        content: "Work Style: High ownership, async-first communication, and preference for deep work. Avoids premature optimization and follows pragmatic engineering.",
        metadata: { type: "workstyle" }
    },
    {
        content: "Interests: Enjoys studying Hindu scriptures like the Bhagavad Gita, exploring AI tools, and contributing to open-source. Considers coding a mindful practice.",
        metadata: { type: "interests" }
    }
];

// Seed function
async function seed() {
    console.log('🌱 Starting seeding process...');

    // Clear existing data
    const { error: deleteError } = await supabase
        .from('portfolio_content')
        .delete()
        .neq('id', 0);
    if (deleteError) console.error('❌ Error clearing table:', deleteError);

    for (const doc of documents) {
        try {
            // FIXED: Added curly braces around the arguments object
            const result = await model.embedContent({
                content: { parts: [{ text: doc.content }] },
                outputDimensionality: 768
            });

            const embedding = result.embedding.values;

            const { error } = await supabase.from('portfolio_content').insert({
                content: doc.content,
                metadata: doc.metadata,
                embedding: embedding,
            });

            if (error) throw error;
            console.log(`✅ Indexed: ${doc.content.slice(0, 30)}...`);
        } catch (e) {
            console.error('❌ Error processing document:', e);
        }
    }

    console.log('✨ Database seeded successfully!');
}

seed();