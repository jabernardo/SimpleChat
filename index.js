const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 8000;

const server = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, './chat.html');
  const fileContent = fs.readFileSync(filePath);

  res.writeHead(200, {'content-type': 'text/html'});
  res.end(fileContent);
});

const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', (message) => {
    console.log('user says: ', message);
    io.emit('message', message);
  });
});

server.listen(port, () => {
  console.log(`Listening on https://localhost:${port}`);
});
