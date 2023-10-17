const express = require("express"),
    router = express.Router(),
    {create,list,getDelivery, update, deleteDelivery} = require("../Controller/delivery")

router.post("/delivery/", create, function (req, res) {
});

router.get("/delivery/", list, function (req, res) {
});

router.get("/delivery/:id", getDelivery, function (req, res) {
});

router.put("/delivery/:id", update, function (req, res) {
});

router.delete("/delivery/:id", deleteDelivery, function (req, res) {
});


module.exports = router;