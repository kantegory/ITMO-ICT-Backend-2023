const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/authRoutes')
const userRoutes = require('./app/routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});