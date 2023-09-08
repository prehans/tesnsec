const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4500;



const Basket = mongoose.model('Basket', basketSchema);

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create a new basket
app.post('/apiv1/pantry/id/basket/882d810b-7914-4a89-8c25-1bf9be2d8e78', async (req, res) => {
  try {
    const { name, price } = req.body;
    const newBasket = new Basket({ name, price });
    const savedBasket = await newBasket.save();
    res.status(201).json({ success: true, basket: savedBasket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Read all baskets
app.get('/apiv1/pantry/id/basket/882d810b-7914-4a89-8c25-1bf9be2d8e78', async (req, res) => {
  try {
    const baskets = await Basket.find();
    res.status(200).json({ success: true, baskets });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Read a specific basket by ID
app.get('/apiv1/pantry/id/basket/882d810b-7914-4a89-8c25-1bf9be2d8e78', async (req, res) => {
  try {
    const basket = await Basket.findById(req.params.id);
    if (!basket) {
      return res.status(404).json({ success: false, message: 'Basket not found' });
    }
    res.status(200).json({ success: true, basket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update a specific basket by ID
app.put('/apiv1/pantry/id/basket/882d810b-7914-4a89-8c25-1bf9be2d8e78', async (req, res) => {
  try {
    const updatedBasket = await Basket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, 
        useFindAndModify: false, 
      }
    );
    if (!updatedBasket) {
      return res.status(404).json({ success: false, message: 'Basket not found' });
    }
    res.status(200).json({ success: true, basket: updatedBasket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a specific basket by ID
app.delete('/apiv1/pantry/id/basket/882d810b-7914-4a89-8c25-1bf9be2d8e78', async (req, res) => {
  try {
    const deletedBasket = await Basket.findByIdAndRemove(req.params.id);
    if (!deletedBasket) {
      return res.status(404).json({ success: false, message: 'Basket not found' });
    }
    res.status(200).json({ success: true, basket: deletedBasket });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
