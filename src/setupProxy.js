const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://13.209.66.46:5000/",
            changeOrigin: true,
        })
    );
};