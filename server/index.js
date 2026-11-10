const express = require("express");
const http = require("http");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = http.createServer(app);
const port = Number(process.env.PORT || 10000);

app.get("/", (_req, res) => {
  res.status(200).send("Dunbar Caller signaling server is online.");
});
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
  console.log("Dunbar Caller signaling server listening on", port);
});
