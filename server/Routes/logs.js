const router = require("express").Router(),
  LogSchema = require("../Models/Log");

router.get("/", (req, res, next) => {
  LogSchema.find()
    .then((logs) => res.send(logs))
    .catch(next);
});

module.exports = router;
