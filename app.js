const PORT = process.env.PORT || 3000;
const contentController = require("./controllers/content");
const allowCORS = require("./middleware/allowCORS");
const contentRoutes = require("./routes/content");
const searchRoutes = require("./routes/search");

const express = require("express");
const app = express();
app.use(allowCORS);
app.set('view engine', 'ejs');
//console.log("URL", URL.hostname)

const theBible = contentController.getWholeBibleFromDisk();
app.use((req, res, next) => {
  res.locals.theBible = theBible;
  next();
});

// Define routes
app.use("/api/contents", contentRoutes);
app.use("/api/search", searchRoutes);

app.get("/", function(req, res) {
  console.log("Get root");
  var fullHost = req.protocol + '://' + req.get('host');
  console.log(fullHost)

  //res.status(200).sendFile('files/help.html', {root: __dirname});
  res.status(200).render('help.ejs', {host: fullHost});
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}...`);
  console.log(URL)
});
