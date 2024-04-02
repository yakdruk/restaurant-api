const express = require('express');
const cors = require("cors");
require('dotenv').config();
require("./db/db")();
const logger = require("morgan");
const verifyToken = require("./Middleware/auth.middleware")




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger("dev"));



// Routes
const authRoutes = require('./routers/auth.router');
const clientRoutes = require('./routers/clientRoutes');
const dishRoutes = require('./routers/dishRoutes');
const workerRoutes = require('./routers/workerRoutes');
const eventRoutes = require('./routers/eventRoutes');

// Routes
app.use('/api/auth', authRoutes); // Mount authentication routes
app.use('/api/clients', verifyToken, clientRoutes); // Mount client routes with authentication middleware
app.use('/api/dishes', dishRoutes); // Mount dish routes
app.use('/api/workers', verifyToken, workerRoutes); // Mount worker routes with authentication middleware
app.use('/api/events', verifyToken, eventRoutes); // Mount event routes with authentication middleware


// app.use('/clients', clientRoutes);
// app.use('/dishes', dishRoutes);
// app.use('/workers', workerRoutes);
// app.use('/events', eventRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
