const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const upload = require('../middlewares/multer');

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

        await user.findByIdAndUpdate(userID,{
            name,
            email,
            contact,
            profile: photo,
            state,
            district,
            village
        })
        res.status(200).json({message: "profile edited successfully"})
    } catch (error) {
        console.log("Internal Error : ", error.message);
        res.status(500).json({message: "Server Error"})
    }
})

// Deletion of Account
router.delete('/removeAccount', async (req, res) => {
    try {
        const userID = req.body.userID;
        await user.findByIdAndDelete(userID);
        res.status(200).json({message: "account removed successfully"})
    } catch (error) {
        console.log("Internal Error : ", error.message);
        res.status(500).json({message: "Server Error"})
    }
})

module.exports = router;