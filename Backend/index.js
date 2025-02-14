const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const registrationRoutes = require('./routes/registrationRoutes');
const itemRoutes = require('./routes/itemRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}))

// This is required in case of using LocalStorage
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(registrationRoutes);
app.use(itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on Port ${PORT}`));