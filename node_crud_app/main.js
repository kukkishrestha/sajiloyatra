require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser'); 
const MongoDBStore = require('connect-mongodb-session')(session);

const VehicleModel = require('./models/Vehicle');

const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB configuration
const DB_URI = process.env.DB_URI || 'mongodb+srv://soham:soham123@cluster0.qi8pg.mongodb.net/rental?retryWrites=true&w=majority&appName=Cluster0'; // Connect to the "rental" database

// Connect to MongoDB
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB database: rental'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit if the connection fails
  });

// MongoDB session store configuration
const store = new MongoDBStore({
  uri: DB_URI,
  collection: 'sessions', // Collection for session data
});

// Handle errors from session store
store.on('error', (error) => console.error('Session store error:', error));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const path = require('path');

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey', // Use a secret from environment variables
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false, // Set to `true` when using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // Session lifetime (24 hours)
    },
  })
);

// Middleware to handle flash messages
app.use((req, res, next) => {
  console.log('Session object:', req.session); // Debugging log for sessions
  res.locals.message = req.session?.message || null;
  delete req.session?.message;
  next();
});

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use('', require('./routes/routes'));
// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('public'));
app.set('view engine', 'ejs');
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));








