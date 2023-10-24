const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         lat:
 *           type: number
 *           format: float
 *           example: 37.7749
 *         lng:
 *           type: number
 *           format: float
 *           example: -122.4194
 *     Delivery:
 *       type: object
 *       required:
 *         - package_id
 *         - status
 *       properties:
 *         delivery_id:
 *           type: string
 *           example: "1234abcd"
 *         package_id:
 *           type: string
 *           description: Reference to Packages
 *           example: "abcd1234"
 *         pickup_time:
 *           type: string
 *           format: date-time
 *           example: "2023-10-21T14:30:00Z"
 *         start_time:
 *           type: string
 *           format: date-time
 *           example: "2023-10-21T15:00:00Z"
 *         end_time:
 *           type: string
 *           format: date-time
 *           example: "2023-10-21T16:00:00Z"
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         status:
 *           type: string
 *           enum:
 *             - open
 *             - picked-up
 *             - in-transit
 *             - delivered
 *             - failed
 *           example: "open"
 */

const LocationSchema = new Schema({
    lat: Number,
    lng: Number,
    _id: false
});

const DeliverySchema = new Schema ({

    delivery_id: {
        type: String,
        required: false
    },

    package_id: {
        type: String,
        required: true,
        ref: 'Packages'
    },

    pickup_time: {
        type: Date,
        default: null
    },

    start_time: {
        type: Date,
        default: null
    },

    end_time: {
        type: Date,
        default: null
    },

    location: {
        type: LocationSchema,
    },

    status: {
        type: String,
        enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
        default: 'open'
    },
});

DeliverySchema.plugin(softDeletePlugin);
module.exports = mongoose.model("Delivery",DeliverySchema);