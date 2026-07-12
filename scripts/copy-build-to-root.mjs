import { cp, copyFile, mkdir, readdir, rm, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const repoRoot = resolve(".");
const buildDir = join(repoRoot, "site-build");
const keep = new Set([".git", "source", "scripts", "node_modules", "package.json", "package-lock.json", "pnpm-lock.yaml", "README.md", ".gitignore"]);

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

if (!(await exists(buildDir))) {
  throw new Error("No existe site-build. Ejecuta npm run build primero.");
}

for (const entry of await readdir(repoRoot)) {
  if (keep.has(entry) || entry === "site-build") continue;
  await rm(join(repoRoot, entry), { recursive: true, force: true });
}

for (const entry of await readdir(buildDir)) {
  const from = join(buildDir, entry);
  const to = join(repoRoot, entry);
  const info = await stat(from);
  if (info.isDirectory()) {
    await cp(from, to, { recursive: true });
  } else {
    await copyFile(from, to);
  }
}

await mkdir(join(repoRoot, "assets"), { recursive: true });

console.log("Build publicado en la raiz del repositorio.");
