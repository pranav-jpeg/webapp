require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({ username: String, email: String });
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
  const newUser = new User({ username: req.body.username, email: req.body.email });
  newUser.save()
    .then(() => res.send('Saved to database'))
    .catch(() => res.send('Error'));
});

const port = process.env.PORT || 3000;

console.log('Static folder:', path.join(__dirname, 'public'));
console.log('Starting server on port:', port);

app.listen(port, () => console.log(`Server started on port ${port}`));
