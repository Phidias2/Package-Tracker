const express = require("express"),
    router = express.Router(),
    {create,list,getDelivery, update, deleteDelivery} = require("../Controller/delivery")


/**
 * @swagger
 * /delivery/:
 *   post:
 *     description: Create a delivery
 *     tags:
 *       - Delivery
 *     responses:
 *       200:
 *         description: Delivery created successfully
 */    
router.post("/delivery/", create, function (req, res) {
});

/**
 * @swagger
 * /delivery/:
 *   get:
 *     description: List all deliveries
 *     tags:
 *       - Delivery
 *     responses:
 *       200:
 *         description: A list of deliveries
 */
router.get("/delivery/", list, function (req, res) {
});

/**
 * @swagger
 * /delivery/{id}:
 *   get:
 *     description: Get a specific delivery by ID
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the delivery to fetch
 *     responses:
 *       200:
 *         description: Specific delivery details
 */
router.get("/delivery/:id", getDelivery, function (req, res) {
});

/**
 * @swagger
 * /delivery/{id}:
 *   put:
 *     description: Update a specific delivery by ID
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the delivery to update
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 */
router.put("/delivery/:id", update, function (req, res) {
});

/**
 * @swagger
 * /delivery/{id}:
 *   delete:
 *     description: Delete a specific delivery by ID
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the delivery to delete
 *     responses:
 *       200:
 *         description: Delivery deleted successfully
 */
router.delete("/delivery/:id", deleteDelivery, function (req, res) {
});


module.exports = router;