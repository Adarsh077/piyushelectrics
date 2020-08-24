const router = require("express").Router(),
  clients = require("../Models/Client"),
  LogDoc = require("../Models/Log"),
  ObjectId = require("mongoose").Types.ObjectId;

router.use("/work", require("./works"));

const UpdateClientMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) next(new Error("id as paramter is required"));

    await LogDoc.create({
      action: "UPDATE",
      entity: "CLIENT",
      clientid: id,
      message: `${name || "Client"} updated`,
    });
    next();
  } catch (e) {
    next(e);
  }
};

router.get("/:id", (req, res, next) => {
  clients
    .findById(req.params.id)
    .then((client) => res.send(client))
    .catch(next);
});

router.get("/", (req, res, next) => {
  clients
    .find()
    .then((clients) => res.send(clients))
    .catch(next);
});

router.post("/", (req, res, next) => {
  clients
    .create(req.body)
    .then((client) => res.send(client))
    .catch(next);
});

router.put("/:id", UpdateClientMiddleware, (req, res, next) => {
  const { id } = req.params;

  clients
    .findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((client) => res.send(client))
    .catch(next);
});

router.delete("/", (req, res, next) => {
  let { ids } = req.query;
  ids = ids.split(",").map((id) => ObjectId(id));
  clients
    .deleteMany({ _id: { $in: ids } })
    .then((client) => res.send(client))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  clients
    .findOneAndDelete({ _id: req.params.id })
    .then((client) => res.send(client))
    .catch(next);
});

module.exports = router;
