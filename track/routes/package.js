var express = require("express"),
    router = express.Router(),
    {create,list,getPackage, update, deletePackage} = require("../Controller/package")

router.post("/package/", create, function (req, res) {
});

router.get("/package/", list, function (req, res) {
});

router.get("/package/:id", getPackage, function (req, res) {
});

router.put("/package/:id", update, function (req, res) {
});

router.delete("/package/:id", deletePackage, function (req, res) {
});

module.exports = router;