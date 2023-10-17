const mongoose = require ('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');
const Schema = mongoose.Schema;

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