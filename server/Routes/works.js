const Router = require("express").Router();
const ObjectId = require("mongoose").Types.ObjectId;
const ClientDoc = require("../Models/Client");
const LogDoc = require("../Models/Log");
const getISTTime = require("../helpers/getISTTime");

const AddWorkMiddleware = async (req, res, next) => {
  const { clientid } = req.params;
  const { work } = req.body;

  if (!clientid || !work)
    next(new Error("clientid as paramter and work in body is required"));

  try {
    await LogDoc.create({
      action: "ADD",
      entity: "WORK",
      clientid: clientid,
      message: `${work.title} done on ${work.date}`,
    });
    next();
  } catch (e) {
    next(e);
  }
};

Router.post("/:clientid", AddWorkMiddleware, async (req, res, next) => {
  try {
    const { clientid } = req.params;
    const { work } = req.body;

    if (!work) throw "work is required in body";

    const client = await ClientDoc.findByIdAndUpdate(
      clientid,
      { $push: { work } },
      { new: true }
    );
    res.send({
      status: "success",
      body: client,
    });
  } catch (e) {
    next(e);
  }
});

const DeleteWorkMiddleware = async (req, res, next) => {
  const { clientid, workid } = req.params;

  if (!clientid || !workid) next(new Error("clienti and workid are required"));
  let message = "Work deleted";

  const client = await ClientDoc.findById(clientid).select("work");
  const work = client.work.find((work) => work._id.toString() === workid);
  console.log(work);
  if (work)
    message = `Deleted work ${work.title} done on ${getISTTime(work.date)}`;

  try {
    await LogDoc.create({
      action: "DELETE",
      entity: "WORK",
      clientid: clientid,
      message: message,
    });
    next();
  } catch (e) {
    next(e);
  }
};

Router.delete(
  "/:clientid/:workid",
  DeleteWorkMiddleware,
  async (req, res, next) => {
    try {
      const { clientid, workid } = req.params;

      const result = await ClientDoc.findByIdAndUpdate(clientid, {
        $pull: { work: { _id: ObjectId(workid) } },
      });

      res.send({
        status: "deleted",
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = Router;
