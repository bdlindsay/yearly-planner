const express = require('express');
const app = express();
const webpack = require("webpack");


// if (process.env.NODE_ENV == "development") {
//     console.log("dev")
    const webpackConfig = require("./webpack.config");
    const compiler = webpack(webpackConfig);
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
// } else {
    // console.log("prod")
    // const webpackConfig = require("./webpack-prod.config");
    // const compiler = webpack(webpackConfig);
 // }

app.set('view engine', 'pug');
app.set('views', 'public');

app.get('/*', (req, res) => {
  res.render('index', {title: "Yearly Planner"})
});

app.use(express.static('build'));

app.listen(3000, () => {
  console.log("listening at localhost:3000")
});
