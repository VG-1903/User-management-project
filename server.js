// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const routes = require('./routes/routes');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.log("MongoDB Connection Error:", err));

// // Use User Routes
// app.use('/api/users', routes);

// app.get('/', (req, res) => res.send("Welcome To User Management Backend"));

// app.listen(port, () => console.log(`Server started at port ${port}`));




require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/userRoutes');

const app = express();
// const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("✅ Connected to MongoDB Atlas"))
// .catch(err => console.error("❌ MongoDB Connection Error:", err));
const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}

main();

app.use('/api/users', routes);

app.get('/', (req, res) => res.send("Welcome To User Management Backend"));

// app.listen(port, () => console.log(`🚀 Server started on port ${port}`));
const port = 5000;
app.listen(port, () => {
    console.log(`✅ Server started at http://localhost:${port}`);
});
