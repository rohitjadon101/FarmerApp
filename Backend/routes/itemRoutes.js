const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const user = require('../models/user');
const machine = require('../models/machine');
const crop = require('../models/crop');
const animal = require('../models/animal');
const field = require('../models/field');
const fertilizer = require('../models/fertilizer');
const fruit = require('../models/fruit');
const vegetable = require('../models/vegetable');
const plant = require('../models/plant');
const other = require('../models/other');

const dotenv = require('dotenv');
dotenv.config();

// Fetching Item
router.get('/:category', async (req,res) => {
    try {
        const category = req.params.category;

        if(category === 'machine'){
            const items = await machine.find();
            res.status(200).json(items);
        }
        else if(category === 'crop'){
            const items = await crop.find();
            res.status(200).json(items);
        }
        else if(category === 'animal'){
            const items = await animal.find();
            res.status(200).json(items);
        }
        else if(category === 'field'){
            const items = await field.find();
            res.status(200).json(items);
        }
        else if(category === 'fertilizer'){
            const items = await fertilizer.find();
            res.status(200).json(items);
        }
        else if(category === 'fruit'){
            const items = await fruit.find();
            res.status(200).json(items);
        }
        else if(category === 'vegetable'){
            const items = await vegetable.find();
            res.status(200).json(items);
        }
        else if(category === 'plant'){
            const items = await plant.find();
            res.status(200).json(items);
        }
        else if(category === 'other'){
            const items = await other.find();
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
        
        if(category === 'machine'){
            const item = await machine.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'crop'){
            const item = await crop.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'animal'){
            const item = await animal.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'field'){
            const item = await field.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'fertilizer'){
            const item = await fertilizer.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'fruit'){
            const item = await fruit.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'vegetable'){
            const item = await vegetable.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'plant'){
            const item = await plant.findById(req.params.itemId);
            res.status(200).json(item);
        }
        else if(category === 'other'){
            const item = await other.findById(req.params.itemId);
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
        const {fieldCategory, measure, area, description, price, perArea, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';
        
        const newField = new field({
            fieldCategory,
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
// fertilizer
router.post('/add/fertilizer/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {name, description, price, quantity, fertilizerCategory, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newFertilizer = new fertilizer({
            firstField : name,
            description,
            price,
            quantity,
            image,
            category: fertilizerCategory,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "fertilizer"
        })
        await newFertilizer.save();
        foundUser.addedItem.push(newFertilizer);
        await foundUser.save();
        res.status(200).json({message: "Item added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})
// fruit
router.post('/add/fruit/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {name, description, price, quantity, fruitCategory, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newFruit = new fruit({
            firstField : name,
            description,
            price,
            quantity,
            image,
            category: fruitCategory,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "fruit"
        })
        await newFruit.save();
        foundUser.addedItem.push(newFruit);
        await foundUser.save();
        res.status(200).json({message: "Fruit added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})
// vegetable
router.post('/add/vegetable/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {name, description, price, quantity, vegetableCategory, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newVegetable = new vegetable({
            firstField : name,
            description,
            price,
            quantity,
            image,
            category: vegetableCategory,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "vegetable"
        })
        await newVegetable.save();
        foundUser.addedItem.push(newVegetable);
        await foundUser.save();
        res.status(200).json({message: "vegetable added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})
// plant
router.post('/add/plant/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {name, description, price, quantity, plantCategory, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newPlant = new plant({
            firstField : name,
            description,
            price,
            quantity,
            image,
            category: plantCategory,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "plant"
        })
        await newPlant.save();
        foundUser.addedItem.push(newPlant);
        await foundUser.save();
        res.status(200).json({message: "Item added successfully!"});
    } catch (error) {
        console.log("Internal Error:", error.message);
        res.status(500).json({message: "Something went wrong!"});
    }
})
// other
router.post('/add/other/:id', upload.single('photo'), async (req,res) => {
    try {
        const foundUser = await user.findById(req.params.id);
        const {name, description, price, quantity, state, district, place} = req.body;
        const image = req.file ? req.file.path : '';

        const newAccesory = new other({
            firstField : name,
            description,
            price,
            quantity,
            image,
            state,
            district,
            place,
            userName: foundUser.name,
            userDP: foundUser.profile,
            userAddress: foundUser.district + ', ' + foundUser.state,
            userContact: foundUser.contact, 
            userEmail: foundUser.email,
            domain: "other"
        })
        await newAccesory.save();
        foundUser.addedItem.push(newAccesory);
        await foundUser.save();
        res.status(200).json({message: "Item added successfully!"});
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

        if(category === 'machine'){
            item = await machine.findById(itemID);
        }
        else if(category === 'crop'){
            item = await crop.findById(itemID);
        }
        else if(category === 'animal'){
            item = await animal.findById(itemID);
        }
        else if(category === 'field'){
            item = await field.findById(itemID);
        }
        else if(category === 'fertilizer'){
            item = await fertilizer.findById(itemID);
        }
        else if(category === 'fruit'){
            item = await fruit.findById(itemID);
        }
        else if(category === 'vegetable'){
            item = await vegetable.findById(itemID);
        }
        else if(category === 'plant'){
            item = await plant.findById(itemID);
        }
        else if(category === 'other'){
            item = await other.findById(itemID);
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
        else if(itemDomain === "fertilizer"){
            await fertilizer.findByIdAndDelete(itemID);
        }
        else if(itemDomain === "fruit"){
            await fruit.findByIdAndDelete(itemID);
        }
        else if(itemDomain === "vegetable"){
            await vegetable.findByIdAndDelete(itemID);
        }
        else if(itemDomain === "plant"){
            await plant.findByIdAndDelete(itemID);
        }
        else if(itemDomain === "other"){
            await other.findByIdAndDelete(itemID);
        }
        res.status(200).json({message: "Your Item Removed"});
    } catch (error) {
        console.log("Error occured : ", error.message);
        res.status(500).json({message: "Internal Error"})
    }
})

module.exports = router;