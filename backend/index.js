import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {userCtrl, productCtrl} from "./controllers/index.js";

import {authValidator, registryValidator} from './helpers/validators-express/user-validation.js';
import {productValidator} from "./helpers/validators-express/product-validation.js";

import {checkAuth, handleValidationErrors} from "./helpers/middleware/index.js";

mongoose
  .set('strictQuery', false)
  .connect('mongodb+srv://admin:1111@cluster0.otlrykd.mongodb.net/shop?retryWrites=true&w=majority')
  .then(() => console.log('Connection for database is ready.'))
  .catch((err) => console.log('Connection for database is failed', err));

const app = express();

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use(cors());

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage});

app.get('/', (req, res) => {
  res.send('Hello world, my dear friend!')
});

app.post('/registry', registryValidator, handleValidationErrors, userCtrl.registration)

app.post('/auth', authValidator, handleValidationErrors, userCtrl.authorization)

app.get('/profile', checkAuth, userCtrl.getUserInfo)


/// checkAuth --- checking, middleware
/// loaded.single('images') --- multer middleware
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
      url: `/uploads/${req.file.originalname}`,
  });
})


app.post('/products', checkAuth, productValidator, productCtrl.addProduct)
app.get('/products', productValidator, productCtrl.getAllProducts)
app.get('/products/:id', productValidator, productCtrl.getProductById)
app.delete('/products/:id', checkAuth, productValidator, productCtrl.removeProductById)
app.patch('/products/:id', checkAuth, productValidator, productCtrl.updateProductById)


app.listen(5000, (err) => {
  if (err) {
    return console.log('Server has not started', err);
  }
  console.log('Server has started successfully');
});

