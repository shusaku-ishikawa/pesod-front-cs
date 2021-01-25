const express = require('express');
var history = require('connect-history-api-fallback');

const port = process.env.PORT || 8000;
const app = express();
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

app.listen(port);