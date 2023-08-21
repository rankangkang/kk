const liveServer = require('live-server')

const options = {
  port: 5000,
  host: "0.0.0.0",
  root: "./",
  open: true,
  ignore: "node_modules",
  file: "index.html",
  wait: 300,
  middleware: [function(req, res, next) { next() }]
}

liveServer.start(options)