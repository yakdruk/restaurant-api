const Event = require('../models/Event');

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, date, location } = req.body;
        const newEvent = new Event({ name, date, location });
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, date, location } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(eventId, { name, date, location }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully', event: deletedEvent });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
