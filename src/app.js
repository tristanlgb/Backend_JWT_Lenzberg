import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import exphbs from 'express-handlebars'; // Import as exphbs instead of handlebars
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import viewRouter from './routes/views.router.js';
import sessionRouter from './routes/sessions.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB = 'eshop';
const MONGO = 'mongodb+srv://tristanlgb:holass12@cluster0.ttwijc2.mongodb.net/' + DB;
const PORT = 8080;
const app = express();
const connection = mongoose.connect(MONGO);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO,
        ttl: 3600
    }),
    secret: 'CoderSecret',
    resave: false,
    saveUninitialized: false
}));

app.engine('handlebars', exphbs); // Use exphbs without invoking it as a function
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);
app.use('/api/session', sessionRouter);

const server = app.listen(PORT, () => {
    console.log('Servicio funcionando en el puerto: ' + PORT);
});
