const express = require("express");
const { connect } = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

const bookRoutes = require("./routes/book");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE, PUT",
  );
  next();
});

app.use(bookRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const data = err.data;

  res.json({
    message,
    data,
    status,
  });
});

connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server run on port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
