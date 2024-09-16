/*
mkdir car-api
cd car-api
npm init -y
npm install express mongoose dotenv
*/

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

function startServer() {
  // start the server
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

function fillMongoDB() {
  return brandMongooseModel.insertMany([
    { name: 'Toyota' },
    { name: 'Ford' },
    { name: 'BMW' },
    { name: 'Tesla' }
  ]).then(brands => 
    modelMongooseModel.insertMany([
      { name: 'Corolla', brandId: brands[0]._id },
      { name: 'Camry', brandId: brands[0]._id },
      { name: 'F-150', brandId: brands[1]._id },
      { name: 'Mustang', brandId: brands[1]._id },
      { name: 'X5', brandId: brands[2]._id },
      { name: 'M3', brandId: brands[2]._id },
      { name: 'Model S', brandId: brands[3]._id },
      { name: 'Model X', brandId: brands[3]._id }
    ]).then(() => console.log('MongoDB filled successfully'))
  );
}

const brandMongooseModel = mongoose.model('Brand', new mongoose.Schema({
  name: { type: String, required: true }
}));

const modelMongooseModel = mongoose.model('Model', new mongoose.Schema({
  name: { type: String, required: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'brandMongooseModel', required: true }
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected OK to MongoDB!');
  brandMongooseModel.find({}).then( savedBrands => {
    if(savedBrands.length == 0) {
      console.log(`MongoDB is empty, fill it with curl http://localhost:${port}/seed`);
    } 
  });
  startServer();
}).catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/health', async (req, res) => {
  res.json("Everything is awesome");
});

app.get('/seed', async (req, res) => {
  try {
    await fillMongoDB();
    res.json("OK!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/brands', async (req, res) => {
  try {
    const brands = await brandMongooseModel.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/brands/:brandId', async (req, res) => {
  try {
    const brand = await brandMongooseModel.findById(req.params.brandId);
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/brands/:brandId/models', async (req, res) => {
  try {
    const models = await modelMongooseModel.find({ brandId: req.params.brandId });
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/models/:modelId', async (req, res) => {
  try {
    const model = await modelMongooseModel.findById(req.params.modelId);
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});