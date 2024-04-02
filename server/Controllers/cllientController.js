const Client = require('../models/Client');

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json({ message: 'Client created successfully', client });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json({ message: 'Client updated successfully', client: updatedClient });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json({ message: 'Client deleted successfully', client: deletedClient });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllClients, getClientById, createClient, updateClient, deleteClient };
