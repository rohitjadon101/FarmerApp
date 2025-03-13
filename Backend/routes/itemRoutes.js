const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const user = require('../models/user');
const machine = require('../models/machine');
const crop = require('../models/crop');
const animal = require('../models/animal');
const field = require('../models/field');

const dotenv = require('dotenv');
dotenv.config();

// Fetching Item
router.get('/:category', async (req,res) => {
    try {
        const category = req.params.category;

        if(category == 'machine'){
            const items = await machine.find();
            res.status(200).json(items);
        }
        else if(category == 'crop'){
            const items = await crop.find();
            res.status(200).json(items);
        }
        else if(category == 'animal'){
            const items = await animal.find();
            res.status(200).json(items);
        }
        else if(category == 'field'){
            const items = await field.find();
            res.status(200).json(items);
        }
    } catch (error) {
        console.log('Internal Error : ', error.message);
        res.status(500).json({message: "Server Error:"});
    }
})

// Fetch a Single Item
router.get('/showItem/:category/:itemId', async (req,res) => {
    try {
        const category = req.params.category;
        
        if(category == 'machine'){
            const item = await machine.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category == 'crop'){
            const item = await crop.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category == 'animal'){
            const item = await animal.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category == 'field'){
            const item = await field.findById(req.params.itemId);
            res.status(200).json(item);
        }
    } catch (error) {
        console.log('Internal Error : ', error.message);
        res.status(500).json({message: "Server Error:"});
    }
})

// Adding Item
// machine
router.post('/add/machine/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {name, description, price, machineCategory, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newMachine = new machine({
            firstField : name,
            description,
            price,
            image,
            category: machineCategory,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "machine"
        })
        await newMachine.save();
        foundUser.addedItem.push(newMachine);
        await foundUser.save();
        res.status(200).json({message: "Machine added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})
// crop
router.post('/add/crop/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {name, description, price, measure, cropCategory, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newCrop = new crop({
            firstField : name,
            description,
            price: price + " " + measure,
            image,
            category: cropCategory,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "crop",
        })
        await newCrop.save();
        foundUser.addedItem.push(newCrop);
        await foundUser.save();
        res.status(200).json({message: "Crop added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})
// animal
router.post('/add/animal/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {animalCategory, description, price, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newAnimal = new animal({
            firstField: animalCategory,
            description,
            price,
            image,
            category: animalCategory,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "animal",
        })
        await newAnimal.save();
        foundUser.addedItem.push(newAnimal);
        await foundUser.save();
        res.status(200).json({message: "Animal added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})
// field
router.post('/add/field/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {measure, area, description, price, perArea, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';
        
        const newField = new field({
            firstField: area + " " + measure,
            description,
            price: price + " " + perArea,
            image,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "field",
        })
        await newField.save();
        foundUser.addedItem.push(newField);
        await foundUser.save();
        res.status(200).json({message: "Field added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})

// Add to Cart Functionality
router.post('/addToCart', async (req,res) => {
    try {
        const {itemID, category, userID} = req.body;

        const foundUser = await user.findById(userID);
        let item = null;

        if(category == 'machine'){
            item = await machine.findById(itemID);
        }
        else if(category == 'crop'){
            item = await crop.findById(itemID);
        }
        else if(category == 'animal'){
            item = await animal.findById(itemID);
        }
        else if(category == 'field'){
            item = await field.findById(itemID);
        }

        foundUser.cart.push(item);
        await foundUser.save();
        res.status(200).json({message: "added to cart"});
    } catch (error) {
        console.log('Internal Error : ', error.message);
        res.status(500).json({message: "Server Error:"});
    }
})

// Fetching saved items
router.get('/savedItems/:userID', async (req, res) => {
    try {
        const foundUser = await user.findById(req.params.userID);
        const savedItems = foundUser.cart;
        res.status(200).json(savedItems);
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error"})
    }
})
// Fetching items added by user
router.get('/userItems/:userID', async (req, res) => {
    try {
        const foundUser = await user.findById(req.params.userID);
        const savedItems = foundUser.addedItem;
        res.status(200).json(savedItems);
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error"})
    }
})
// Remove From Cart Functionality
router.post('/removeFromCart/:itemID', async (req, res) => {
    try {
        const foundUser = await user.findById(req.body.userID);
        foundUser.cart = foundUser.cart.filter((item) => item._id.toString() !== req.params.itemID);
        await foundUser.save();
        res.status(200).json({message: "Item removed from Cart"});
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error"})
    }
})
// Remove Added Items Functionality
router.delete('/removeAddedItems/:itemID', async (req, res) => {
    try {
        const {userID,itemDomain} = req.body;
        const itemID = req.params.itemID;

        const foundUser = await user.findById(userID);
        foundUser.addedItem = foundUser.addedItem.filter((item) => item._id.toString() !== itemID);
        await foundUser.save();

        if(itemDomain === "machine"){
            await machine.findByIdAndDelete(itemID);
        }
        else if(itemDomain === "crop"){
            await crop.findByIdAndDelete(itemID);
        }
        else if(itemDomain === "animal"){
            await animal.findByIdAndDelete(itemID);
        }
        else if(itemDomain === "field"){
            await field.findByIdAndDelete(itemID);
        }
        res.status(200).json({message: "Your Item Removed"});
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error"})
    }
})

module.exports = router;