// Dependency-free local preview of the static export. This is not a form API.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('out');
const port = Number(process.env.PORT || 3000);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.txt':'text/plain; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.ico':'image/x-icon', '.woff2':'font/woff2', '.ttf':'font/ttf', '.webmanifest':'application/manifest+json' };
createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}); res.end(); return; }
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    let file = resolve(root, '.' + pathname);
    if (!file.startsWith(root + sep) && file !== root) { res.writeHead(403); res.end(); return; }
    let code = 200;
    try {
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith('/')) { res.writeHead(308, {Location:pathname + '/' + url.search}); res.end(); return; }
        file = resolve(file, 'index.html');
      }
      await stat(file);
    } catch { file = resolve(root, '404.html'); code = 404; }
    const content = await readFile(file);
    res.writeHead(code, {'Content-Type':types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options':'nosniff', 'Cache-Control':'no-cache'});
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(500); res.end('Build the static export with npm run build before starting this preview.'); }
}).listen(port, '127.0.0.1', () => console.log(`CashVariance preview: http://localhost:${port}`));
