const express = require("express"),
    router = express.Router(),
    {create,list,getDelivery, update, deleteDelivery} = require("../Controller/delivery")


/**
 * @swagger
 * definitions:
 *   Delivery:
 *     type: object
 *     properties:
 *       delivery_id:
 *         type: string
 *       package_id:
 *         type: string
 *       pickup_time:
 *         type: string
 *         format: date-time
 *       start_time:
 *         type: string
 *         format: date-time
 *       end_time:
 *         type: string
 *         format: date-time
 *       location:
 *         type: object
 *         properties:
 *           lat:
 *             type: number
 *           lng:
 *             type: number
 *       status:
 *         type: string
 *         enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed']
 */

/**
 * @swagger
 * /delivery/:
 *   post:
 *     description: Create a delivery
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Delivery'
 *     responses:
 *       200:
 *         description: Delivery created successfully
 *         schema:
 *           $ref: '#/definitions/Delivery'
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
 *         description: An array of deliveries
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Delivery'
 *       404:
 *         description: No deliveries found
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
 *         type: string
 *         description: ID of the delivery to fetch
 *     responses:
 *       200:
 *         description: Specific delivery details
 *         schema:
 *           $ref: '#/definitions/Delivery'
 *       404:
 *         description: Delivery not found
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
 *         type: string
 *         description: ID of the delivery to update
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Delivery'
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *         schema:
 *           $ref: '#/definitions/Delivery'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Delivery not found
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
 *         type: string
 *         description: ID of the delivery to delete
 *     responses:
 *       200:
 *         description: Delivery deleted successfully
 *       404:
 *         description: Delivery not found
 */

router.delete("/delivery/:id", deleteDelivery, function (req, res) {
});


module.exports = router;