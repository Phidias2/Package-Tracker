var express = require("express"),
    router = express.Router(),
    {create,list,getPackage, update, deletePackage} = require("../Controller/package")


/**
 * @swagger
 * definitions:
 *   Package:
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
 * /package/:
 *   post:
 *     description: Create a package
 *     tags:
 *       - Package
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Package'
 *     responses:
 *       200:
 *         description: Package created successfully
 *         schema:
 *           $ref: '#/definitions/Package'
 */
router.post("/package/", create, function (req, res) {
});

/**
 * @swagger
 * /package/:
 *   get:
 *     description: List all packages
 *     tags:
 *       - Package
 *     responses:
 *       200:
 *         description: An array of package
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Package'
 *       404:
 *         description: No packages found
 */

router.get("/package/", list, function (req, res) {
});


/**
 * @swagger
 * /package/{id}:
 *   get:
 *     description: Get a specific package by ID
 *     tags:
 *       - Package
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID of the package to fetch
 *     responses:
 *       200:
 *         description: Specific package details
 *         schema:
 *           $ref: '#/definitions/Package'
 *       404:
 *         description: Package not found
 */
router.get("/package/:id", getPackage, function (req, res) {
});



/**
 * @swagger
 * /package/{id}:
 *   put:
 *     description: Update a specific package by ID
 *     tags:
 *       - Package
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID of the package to update
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Package'
 *     responses:
 *       200:
 *         description: Delivery updated successfully
 *         schema:
 *           $ref: '#/definitions/Package'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Package not found
 */
router.put("/package/:id", update, function (req, res) {
});


/**
 * @swagger
 * /package/{id}:
 *   delete:
 *     description: Delete a specific package by ID
 *     tags:
 *       - Package
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: ID of the package to delete
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       404:
 *         description: Package not found
 */

router.delete("/package/:id", deletePackage, function (req, res) {
});

module.exports = router;