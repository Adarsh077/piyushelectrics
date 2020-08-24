process.stdout.write("\033c");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const developmentDB = "mongodb://localhost:27017/piyushelectrics";
const productionDB =
  "mongodb+srv://admin:kamlesh@07@piyushdb.hrf7c.gcp.mongodb.net/piyushelectrics?retryWrites=true&w=majority";

const MongoDBConnectionString =
  process.env.NODE_ENV === "production" ? productionDB : developmentDB;

mongoose
  .connect(MongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Logger
app.use(morgan("dev"));

app.use("/client", require("./Routes/clients"));
app.use("/logs", require("./Routes/logs"));

app.post("/authenticate", (req, res) =>
  res.send(req.body.password === "kamlesh@07")
);

app.use((err, req, res, next) => console.log(err) || res.status(400).send(err));

const port = process.env.PORT || 8000;
app.listen(port, (err) => console.log(err ? err : `Running on ${port}...`));
