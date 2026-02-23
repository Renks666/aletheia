/**
 * Commit & push: добавляет только файлы проекта (src/, app/, конфиги),
 * без .cursor/, .vscode/, затем коммит с осмысленным сообщением и push в origin main.
 * После пуша напоминает про автодеплой на Vercel.
 */
import { execSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();

// Каталоги и файлы, которые включаем в коммит (только код и конфиги проекта)
const INCLUDE_PATTERNS = [
  "src/",
  "app/",
  "public/",
  "e2e/",
  "next.config.ts",
  "next.config.js",
  "next.config.mjs",
  "tailwind.config.ts",
  "tailwind.config.js",
  "postcss.config.js",
  "postcss.config.mjs",
  "tsconfig.json",
  "components.json",
  "middleware.ts",
  "package.json",
  "package-lock.json",
  "playwright.config.ts",
  "README.md",
  ".gitignore",
];

// Исключаем эти пути
const EXCLUDE_PREFIXES = [".cursor/", ".vscode/", "node_modules/", ".next/", ".next-dev/"];

function run(cmd, options = {}) {
  return execSync(cmd, {
    encoding: "utf8",
    cwd: projectRoot,
    ...options,
  });
}

function runSilent(cmd) {
  try {
    return run(cmd, { stdio: "pipe" });
  } catch {
    return "";
  }
}

function getStatusLines() {
  const out = runSilent("git status --porcelain -u");
  return out
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const rest = line.slice(3).trim(); // после "XY "
      const arrow = rest.indexOf(" -> ");
      return arrow >= 0 ? rest.slice(arrow + 4) : rest;
    });
}

function pathAllowed(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  if (EXCLUDE_PREFIXES.some((p) => normalized.startsWith(p))) return false;
  return INCLUDE_PATTERNS.some((p) => {
    if (p.endsWith("/")) return normalized.startsWith(p) || normalized.startsWith(p.slice(0, -1) + "/");
    return normalized === p || normalized.startsWith(p + "/");
  });
}

function suggestMessage(stagedPaths) {
  const parts = new Set();
  for (const p of stagedPaths) {
    const n = p.replace(/\\/g, "/");
    if (n.startsWith("src/features/")) parts.add("features");
    else if (n.startsWith("src/app/")) parts.add("app");
    else if (n.startsWith("src/widgets/")) parts.add("widgets");
    else if (n.startsWith("src/shared/")) parts.add("shared");
    else if (n.startsWith("e2e/")) parts.add("e2e");
    else if (n.includes("tailwind") || n.includes("postcss")) parts.add("styles");
    else if (n.includes("next.config") || n.includes("tsconfig")) parts.add("config");
    else if (n === "package.json" || n === "package-lock.json") parts.add("deps");
    else if (n.includes("test") || n.includes("spec")) parts.add("tests");
    else if (n.startsWith("public/")) parts.add("public");
  }
  const list = [...parts];
  if (list.length === 0) return "chore: update project files";
  if (list.length === 1) {
    if (list[0] === "deps") return "chore: update dependencies";
    if (list[0] === "config") return "chore: update config";
    if (list[0] === "tests") return "test: update tests";
    return `chore: update ${list[0]}`;
  }
  return "chore: update " + list.slice(0, 4).join(", ");
}

function main() {
  console.log("Checking git status...\n");
  const statusOut = run("git status");
  console.log(statusOut);

  const lines = getStatusLines();
  const toAdd = lines.filter(pathAllowed);

  if (toAdd.length === 0) {
    console.log("No project files to commit (only src/, app/, configs; excluding .cursor/, .vscode/).");
    process.exit(0);
    return;
  }

  // Сбрасываем индекс и добавляем только нужные пути
  runSilent("git reset HEAD");
  for (const p of toAdd) {
    const full = path.join(projectRoot, p);
    if (fs.existsSync(full)) {
      const addResult = spawnSync("git", ["add", "--", p], {
        encoding: "utf8",
        cwd: projectRoot,
        stdio: "pipe",
      });
      if (addResult.status !== 0 && addResult.stderr) {
        console.warn("Skip add:", p, addResult.stderr.trim());
      }
    }
  }

  const staged = runSilent("git diff --cached --name-only")
    .trim()
    .split("\n")
    .filter(Boolean);

  if (staged.length === 0) {
    console.log("Nothing to commit after filtering.");
    process.exit(0);
    return;
  }

  const message = suggestMessage(staged);
  console.log("\nStaged files:", staged.length);
  console.log("Commit message:", message);
  console.log("\nCommitting...");

  const commitResult = spawnSync("git", ["commit", "-m", message], {
    encoding: "utf8",
    cwd: projectRoot,
    stdio: "inherit",
  });

  if (commitResult.status !== 0) {
    console.error("Commit failed.");
    process.exit(1);
  }

  const branch = runSilent("git rev-parse --abbrev-ref HEAD").trim() || "main";
  console.log(`\nPushing to origin ${branch}...`);
  const pushResult = spawnSync("git", ["push", "origin", branch], {
    encoding: "utf8",
    cwd: projectRoot,
    stdio: "inherit",
  });

  if (pushResult.status !== 0) {
    console.error("Push failed. Check remote and branch.");
    process.exit(1);
  }

  console.log(`\n✅ Push to origin ${branch} completed.`);
  if (branch === "main") {
    console.log("⏱  Vercel will deploy the site in about 1–2 minutes.");
  } else {
    console.log("⏱  To deploy on Vercel: merge this branch into main and push, or push main.");
  }
}

main();
