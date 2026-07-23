import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
const root = resolve(import.meta.dirname, "../dist");
const port = Number(process.env.PORT || 4181);
const types = { ".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".json":"application/json",".svg":"image/svg+xml" };
createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = join(root, path.replace(/^\//, ""));
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}`));
