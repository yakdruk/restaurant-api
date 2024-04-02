const Dish = require('../models/Dish');

const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json(dish);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createDish = async (req, res) => {
    try {
        const dish = new Dish(req.body);
        await dish.save();
        res.status(201).json({ message: 'Dish created successfully', dish });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateDish = async (req, res) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json({ message: 'Dish updated successfully', dish: updatedDish });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteDish = async (req, res) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete(req.params.id);
        if (!deletedDish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json({ message: 'Dish deleted successfully', dish: deletedDish });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllDishes, getDishById, createDish, updateDish, deleteDish };
