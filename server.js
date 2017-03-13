var express = require('express');
var app = express();
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackDevMiddleware = require("webpack-dev-middleware");

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',
    stats: {
      colors: true
    },
    historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler));

app.set('view engine', 'pug');
app.set('views', 'public');

app.get('/*', (req, res) => {
  res.render('index', {title: "Yearly Planner"})
});

app.use(express.static('build'));

app.listen(3000, () => {
  console.log("listening at localhost:3000")
});
