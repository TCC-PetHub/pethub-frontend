import fs from "node:fs/promises";
import ts from "typescript";
const cache = new Map();
export async function importSource(relativePath) {
  const url = new URL(`../../src/${relativePath}`, import.meta.url);
  return import(await moduleUrl(url));
}
async function moduleUrl(url) {
  if (cache.has(url.href)) return cache.get(url.href);
  let source = await fs.readFile(url, "utf8");
  source = source.replace(/import\s+["']server-only["'];?/g, "");
  let js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  const imports = [...js.matchAll(/from\s+["']([^"']+)["']/g)];
  for (const item of imports) {
    const spec = item[1];
    const resolved = spec.startsWith("@/")
      ? await moduleUrl(new URL(`../../src/${spec.slice(2)}.ts`, import.meta.url))
      : spec.startsWith(".") ? await moduleUrl(new URL(`${spec}.ts`, url)) : import.meta.resolve(spec);
    js = js.replace(item[0], `from ${JSON.stringify(resolved)}`);
  }
  const encoded = `data:text/javascript;base64,${Buffer.from(js).toString("base64")}`;
  cache.set(url.href, encoded);
  return encoded;
}
