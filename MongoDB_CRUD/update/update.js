const express = require("express");

const mongodb = require("mongodb");

const url = require("../url");

let mcl = mongodb.MongoClient;

let router = express.Router();

router.post("/", (req, res) => {
  let p_id = req.body.p_id
  let obj = {
    "p_name": req.body.p_name,
    "p_cost": req.body.p_cost,
  };

  mcl.connect(url, (err, conn) => {
    if (err) {
      console.log("Error" + err);
    } else {
      let db = conn.db("nodedb");
      db.collection("products").updateOne({ p_id }, { $set: obj }, (err,result) => {
        if (err) {
          console.log("Update Failed" + err);
        } else {
            if (result.matchedCount != 0) {
                console.log("Data updated ")
                res.json({ 'update': 'success' })
            }
            else {
                console.log("Data Not updated ")
                res.json({ 'update': 'Record Not found' })
            }
            conn.close();
        }
      });
    }
  });
});

module.exports = router;
