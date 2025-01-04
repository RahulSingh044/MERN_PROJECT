require('dotenv').config();
const express = require('express')
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router')
const connectDB = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const cors = require('cors');



app.use(cors(
    {
        origin: `${process.env.FRONTEND_URL}`,
        credentials: true,
        methods:["POST", "PUT", "PATCH","DELETE","GET"]
    }
));


// Middleware to parse JSON request bodies
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api', serviceRoute)
app.use('/api/admin',adminRoute);

// Error handling middleware to handle any uncaught errors
app.use(errorMiddleware)

// Run the server only when the connection is succesfully made with database
const PORT = 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
