const Worker = require('../models/Worker');

const getAllWorkers = async (req, res) => {
    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getWorkerById = async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(worker);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createWorker = async (req, res) => {
    try {
        const worker = new Worker(req.body);
        await worker.save();
        res.status(201).json({ message: 'Worker created successfully', worker });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateWorker = async (req, res) => {
    try {
        const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json({ message: 'Worker updated successfully', worker: updatedWorker });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteWorker = async (req, res) => {
    try {
        const deletedWorker = await Worker.findByIdAndDelete(req.params.id);
        if (!deletedWorker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json({ message: 'Worker deleted successfully', worker: deletedWorker });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllWorkers, getWorkerById, createWorker, updateWorker, deleteWorker };
