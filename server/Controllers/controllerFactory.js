const getModel = (modelName) => {
    return require(`../models/${modelName}`);
};

const createController = (modelName) => {
    const Model = getModel(modelName);

    const getAll = async (req, res) => {
        try {
            const items = await Model.find();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const createOne = async (req, res) => {
        try {
            const newItem = new Model(req.body);
            await newItem.save();
            res.status(201).json({ message: `${modelName} created successfully`, item: newItem });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const updateOne = async (req, res) => {
        try {
            const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (!updatedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }

            res.json({ message: `${modelName} updated successfully`, item: updatedItem });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    const deleteOne = async (req, res) => {
        try {
            const deletedItem = await Model.findByIdAndDelete(req.params.id);

            if (!deletedItem) {
                return res.status(404).json({ message: `${modelName} not found` });
            }

            res.json({ message: `${modelName} deleted successfully`, item: deletedItem });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    return { getAll, createOne, updateOne, deleteOne };
};

module.exports = createController;
