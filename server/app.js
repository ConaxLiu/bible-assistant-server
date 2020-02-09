const PORT = process.env.PORT || 3000;
const contentController = require("./controllers/content");
const allowCORS = require("./middleware/allowCORS");
const contentRoutes = require("./routes/content");
const searchRoutes = require("./routes/search");

const express = require("express");
const app = express();
app.use(allowCORS);

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
  res.status(401).send("This is the Conax Bible Assistant Server");
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}...`);
});
