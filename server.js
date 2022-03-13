const path = require('path')
const express = require('express')
const buildDirectory = path.resolve(__dirname, "./build");
const port = 3000;

const app = express(),
  DIST_DIR = buildDirectory,
  HTML_FILE = path.join(DIST_DIR, './index.html')
app.use(express.static(DIST_DIR))

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})