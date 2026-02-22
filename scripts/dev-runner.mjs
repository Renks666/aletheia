import fs from "node:fs";
import path from "node:path";
import {spawn} from "node:child_process";
import process from "node:process";

const projectRoot = process.cwd();
const nextDir = path.join(projectRoot, ".next");
const lockFile = path.join(nextDir, "dev.lock");
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const forwardArgs = process.argv.slice(2);

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

function isPidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return false;
  }

  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function removeLock() {
  try {
    fs.rmSync(lockFile, {force: true});
  } catch {
    // Ignore lock cleanup failures on shutdown.
  }
}

function ensureSingleDevServer() {
  const lock = readJson(lockFile);
  if (!lock) {
    return;
  }

  if (isPidAlive(lock.pid)) {
    console.error(
      `Another dev server is already running for this project (pid: ${lock.pid}). Stop it first.`,
    );
    process.exit(1);
  }

  removeLock();
}

function prepareNextDirectory() {
  fs.rmSync(nextDir, {recursive: true, force: true});
  fs.mkdirSync(nextDir, {recursive: true});
}

function writeLock() {
  const lockData = {
    pid: process.pid,
    startedAt: new Date().toISOString(),
  };
  fs.writeFileSync(lockFile, JSON.stringify(lockData), "utf8");
}

ensureSingleDevServer();
prepareNextDirectory();
writeLock();

const child = spawn(process.execPath, [nextBin, "dev", ...forwardArgs], {
  stdio: "inherit",
  cwd: projectRoot,
  env: process.env,
});

const forwardSignals = ["SIGINT", "SIGTERM", "SIGHUP"];
for (const signal of forwardSignals) {
  process.on(signal, () => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
}

child.on("exit", (code, signal) => {
  removeLock();
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

child.on("error", (error) => {
  removeLock();
  console.error(error);
  process.exit(1);
});

