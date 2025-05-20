const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
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

dotenv.config();

// Storing media in localStorage

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../uploads/users'),
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({storage});

// User Registration
router.post('/register', upload.single('photo'), async (req, res) => {
    const {name, email, password, contact, state, district, village} = req.body;

    // This is used in case of localStorage
    // const profile = req.file ? `users/${req.file.filename}` : '';
    const profile = req.file ? req.file.path : '';

    const foundUser = await user.findOne({email});
    if(foundUser) return res.status(400).json({message : 'User already Registerd'})
    else{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const createUser = new user({
            name,
            email,
            password: hash,
            profile,
            contact,
            state,
            district,
            village
        });
        
        try {
            const savedUser = await createUser.save();
            res.status(200).json({message: "user registered successfully!"});
        } catch (error) {
            console.log("Error occured : ", error.message);
            res.status(500).json({message: "something went wrong"});
        }
    }
})

// User login
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const foundUser = await user.findOne({email});
        if(!foundUser) return res.json({message: 'Incorrect email or password'});

        bcrypt.compare(password, foundUser.password, (err, result) => {
            if (err) {
                return res.json({ message: "Something went wrong" });
            }
            if (!result) {
                return res.json({ message: 'Incorrect email or password' });
            }
            const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({token, foundUser});
        })
    } catch (error) {
        res.json({message: error.message});
    }
})

// Edit Account
router.put('/editAccount/:id', upload.single('photo'),  async (req, res) => {
    try {
        const userID = req.params.id;
        const {name, email, contact, state, district, village} = req.body;
        const photo = req.file? req.file.path : '';

        const updatedUser = await user.findByIdAndUpdate(userID,{
            name,
            email,
            contact,
            profile: photo,
            state,
            district,
            village
        }, {new: true})
        
        res.status(200).json({ message: "Account updated", updatedUser});

    } catch (error) {
        console.log("Internal Error : ", error.message);
        res.status(500).json({message: "Server Error"})
    }
})

// Deletion of Account
router.delete('/removeAccount', async (req, res) => {
    try {
        const userID = req.body.userID;
        if (!userID) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const newUser = await user.findById(userID);
        if (!newUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Removing the Items added by this user
        await machine.deleteMany({userEmail: newUser.email});
        await crop.deleteMany({userEmail: newUser.email});
        await animal.deleteMany({userEmail: newUser.email});
        await field.deleteMany({userEmail: newUser.email});
        await fertilizer.deleteMany({userEmail: newUser.email});
        await fruit.deleteMany({userEmail: newUser.email});
        await vegetable.deleteMany({userEmail: newUser.email});
        await plant.deleteMany({userEmail: newUser.email});
        await other.deleteMany({userEmail: newUser.email});

        await user.findByIdAndDelete(userID);
        res.status(200).json({message: "account removed successfully"})
    } catch (error) {
        console.log("Internal Error : ", error.message);
        res.status(500).json({message: "Server Error"})
    }
})

module.exports = router;