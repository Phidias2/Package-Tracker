const mongoose = require('mongoose');
const {softDeletePlugin} = require('soft-delete-plugin-mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    lat: Number,
    lng: Number,
    _id: false
});

const PackageSchema = new Schema({

    // delivery_id: {
    //     type: Schema.Types.ObjectId,
    //     default: mongoose.Types.ObjectId
    // },

    active_delivery_id: {
        type: String,
        ref: 'Delivery',
        default: null

    },

    description: {
        type: String,
        require: false,
        default:null
    },

    weight: {
        type: Number,
        default:null
    },

    width: {
        type: Number,
        default:null
    },

    height: {
        type: Number,
        default:null
    },

    depth: {
        type: Number,
        default:null
    },

    from_name: {
        type: String,
        require: [true, "sender name is required"],
    },

    from_address: {
        type: String,
        require: [true, "sender address is required"],
    },

    from_location: {
        type: LocationSchema,
        require: [true, "sender location is required"],
    },

    to_name: {
        type: String,
        require: [true, "receiver name is required"],
    },

    to_address: {
        type: String,
        require: [true, "receiver address is required"],
    },

    to_location: {
        type: LocationSchema,
        require: [true, "receiver location is required"],
    },
    created: {
        type: Date,
        default: Date.now
    }


});
PackageSchema.plugin(softDeletePlugin);
module.exports = mongoose.model("Packages", PackageSchema);