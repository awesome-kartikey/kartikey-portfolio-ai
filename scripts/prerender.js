const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PORT = 4173; // Vite preview port
const BASE_URL = `http://localhost:${PORT}`;
const OUTPUT_DIR = path.join(__dirname, '../dist');

// Routes to prerender
const routes = [
  '/',
  '/about',
  '/projects',
  '/skills',
  '/contact',
  '/blog'
];

async function prerender() {
  console.log('Starting prerendering...');
  
  const browser = await puppeteer.launch({
    headless: "new"
  });
  const page = await browser.newPage();

  for (const route of routes) {
    try {
      console.log(`Prerendering ${route}...`);
      
      // Navigate to the route
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Get the HTML content
      const html = await page.content();

      // Determine output path
      const filePath = route === '/' 
        ? path.join(OUTPUT_DIR, 'index.html')
        : path.join(OUTPUT_DIR, route.slice(1), 'index.html');

      // Ensure directory exists
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Write the HTML file
      fs.writeFileSync(filePath, html);
      console.log(`Generated ${filePath}`);
    } catch (error) {
      console.error(`Error prerendering ${route}:`, error);
    }
  }

  await browser.close();
  console.log('Prerendering complete!');
}

prerender();
