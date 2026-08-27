// Captures full-page screenshots of the app's pages (excluding the parked login screen)
// at a 1140px viewport width and saves them to prototype-screenshots/.
import { chromium } from "playwright"
import { mkdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, "..", "prototype-screenshots")
mkdirSync(outDir, { recursive: true })

const baseUrl = process.env.APP_URL ?? "http://localhost:5173"

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1140, height: 900 } })

await page.goto(baseUrl, { waitUntil: "networkidle" })
await page.screenshot({ path: join(outDir, "home.png"), fullPage: true })

await page.getByRole("button", { name: /Mary Rice/ }).click()
await page.getByRole("menuitem", { name: "Manage members" }).click()
await page.waitForTimeout(300)
await page.screenshot({ path: join(outDir, "manage-members.png"), fullPage: true })

await browser.close()
console.log("Saved screenshots to", outDir)
