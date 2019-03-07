var http = require('http'),
    httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function(req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080',
        // selfHandleResponse:true,
        secure: false,
        ws: false,
        prependPath: false,
        ignorePath: false,
    });
});
console.log("listening on port 8000");
server.listen(8000);

// Listen for the `error` event on `proxy`.
// as we will generate a big bunch of errors
proxy.on('error', function (err, req, res) {
  console.log(err);
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end("Oops");
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  res.setHeader('X-Total-Count',100);
  res.setHeader('Content-Range','bytes : 0-9/*');
  res.setHeader('Access-Control-Expose-Headers',['Content-Range','X-Total-Count']);
  /*res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');*/

  var body = new Buffer('');
  proxyRes.on('data', function (data) {
      body = Buffer.concat([body, data]);
  });

  proxyRes.on('end', function () {
    body = body.toString();
    console.log("res from proxied server:", body);
  });
});