const Package = require("../Models/package")

exports.list = (req, res) => {
    Package.find()
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
    const package = new Package(req.body)
    await package.save()
    res.send({statut:200,message: "delivery successully create", data:package});
};

exports.getPackage = (req, res) => {
    const id = req.params.id;
    Package.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found any package" });
            else res.send({status:200,data: data});
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving package" });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Package.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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


exports.deletePackage = async (req, res) => {
    const id = req.params.id;
    try {
        await Package.softDelete({_id: id});
        res.status(204).end();  // This sends the 204 status and ends the response
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};
