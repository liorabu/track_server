require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParer = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes=require('./routes/tracksRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParer.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = 'mongodb+srv://admin:barak2020@cluster0.djhyw.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Erroe connection to mongo', err)
})


app.get('/', requireAuth, (req, res) => {
    res.send(`Your email is ${req.user.email}`);
})

app.listen(3000, () => {
    console.log("listenning on port 3000");
})