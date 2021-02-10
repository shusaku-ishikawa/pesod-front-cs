const express = require('express');
var history = require('connect-history-api-fallback');

const port = process.env.PORT || 8000;
const app = express();
const ws = require('ws');
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  console.log('connect!!')
  socket.on('message', message => {
    console.log(message);
    socket.send(message);
  });
});

const staticFiles = express.static(__dirname + "/dist/");

app.use(staticFiles);
app.use(history({
  index: '/dist/index.html'
}));
app.use(staticFiles);



app.all("*", (_req, res) => {
  try {
    res.sendFile(__dirname + "/dist/index.html");
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

const server = app.listen(port, () => {
  console.log('server is listening...')
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});