import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";
import { createServer } from "vite";

const root = process.cwd();
const screenshotDir = join(root, "screenshots");

await mkdir(screenshotDir, { recursive: true });

const server = await createServer({
  root,
  server: {
    host: "0.0.0.0",
    middlewareMode: false,
  },
  logLevel: "error",
});

await server.listen(4174);

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const captures = [
    { name: "desktop.png", width: 1440, height: 1000 },
    { name: "mobile.png", width: 390, height: 844 },
  ];

  for (const capture of captures) {
    const page = await browser.newPage({
      viewport: { width: capture.width, height: capture.height },
      deviceScaleFactor: 1,
    });

    await page.goto("http://127.0.0.1:4174", { waitUntil: "networkidle" });
    await page.screenshot({
      path: join(screenshotDir, capture.name),
      fullPage: false,
    });
    await page.close();
  }
} finally {
  await browser.close();
  await server.close();
}
