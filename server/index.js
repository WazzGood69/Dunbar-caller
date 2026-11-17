const express = require("express");
const http = require("http");
const path = require("path");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT || 10000);

// Serve the actual Dunbar Caller web app from the repository's www folder.
app.use(express.static(path.join(__dirname, "..", "www")));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "dunbar-caller-signaling" });
});

const peerServer = ExpressPeerServer(server, {
  path: "/",
  proxied: true,
  allow_discovery: false
});
app.use("/peerjs", peerServer);

server.listen(port, "0.0.0.0", () => {
  console.log("Dunbar Caller web app and signaling server listening on", port);
});
