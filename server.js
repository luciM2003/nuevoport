import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  const extname = path.extname(filePath).toLowerCase();
  let contentType = 'text/html';
  
  if (extname === '.css') contentType = 'text/css';
  if (extname === '.js') contentType = 'text/javascript';
  if (extname === '.png') contentType = 'image/png';
  if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
  if (extname === '.gif') contentType = 'image/gif';
  if (extname === '.svg') contentType = 'image/svg+xml';
  if (extname === '.pdf') contentType = 'application/pdf';
  if (extname === '.mp4') contentType = 'video/mp4';
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Portfolio servidor corriendo en http://localhost:${PORT}`);
});
