module.exports = (app) => {
  const hewan = require("../controllers/hewan.controller");
  const r = require("express").Router();

  r.get("/", hewan.findAll);
  r.get("/:id", hewan.show);
  r.post("/", hewan.create);
  r.put("/:id", hewan.update);
  r.delete("/:id", hewan.delete);

  app.use("/hewan", r);
};
