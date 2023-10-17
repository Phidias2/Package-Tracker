const Delivery = require("../Models/delivery")

exports.list = (req, res) => {
    Delivery.find()
        .then(data => {
            res.send({status:200,data:data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving packages."
            });
        });
};

exports.create = async (req, res) => {
    const delivery = new Delivery(req.body)
    await delivery.save()
    Package.findByIdAndUpdate(delivery.package_id, {active_delivery_id:delivery._id}, { useFindAndModify: false })
    res.send({statut:200,message: "delivery successully create", data:delivery});
};


exports.getDelivery = (req, res) => {
    const id = req.params.id;

    Delivery.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found any delivery" });
            else res.send({status:200,data: data});
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving delivery" });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Delivery.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update widget with id=${id}. Maybe widget was not found!`
                });
            } else res.send({ message: "package was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating widget with id=" + id
            });
        });
};


exports.deleteDelivery = async (req, res) => {
    const id = req.params.id;
    try {
        await Delivery.softDelete({_id: id});
        res.status(204).end();
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};
