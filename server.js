const express = require('express');
const app = express();

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
    console.log("webpacking...")
    const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');

  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
    console.log("reading static content")
    app.use(express.static(__dirname + '/dist'));
}

app.set('view engine', 'pug');
app.set('views', 'public');

app.get('/*', (req, res) => {
  res.render('index', {title: "Yearly Planner"})
});

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening at localhost:${port}`)
});
