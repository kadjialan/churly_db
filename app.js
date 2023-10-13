const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 5000;
const userRoutes = require('./routes/UserRoutes.js');
const { notFound, errorHandler } = require('./middleware/ErrorMiddleware.js');
const { connect } = require('mongoose');
const connectDB = require('./config/db.js');

connectDB();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/users', userRoutes )
app.use(notFound)
app.use(errorHandler) 

app.get('/', (req, res) =>res.send('server is ready'));
app.listen(port, () => console.log(`server started on port ${port}`));