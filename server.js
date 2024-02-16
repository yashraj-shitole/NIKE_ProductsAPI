const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/add-product', (req, res) => {
  const { productId, title, description, price, imageUrl, category } = req.body;

  let products = [];
  try {
    const data = fs.readFileSync('products4.json');
    products = JSON.parse(data);
  } catch (err) {
    console.error("Error reading products file:", err);
  }

  products.push({
    productId,
    title,
    description,
    price,
    imageUrl,
    category
  });

  fs.writeFile('products4.json', JSON.stringify(products, null, 2), err => {
    if (err) {
      console.error("Error writing products file:", err);
      res.status(500).send("Error adding product");
    } else {
      console.log("Product added successfully");
      res.status(200).send("Product added successfully");
    }
  });
});



app.get('/api/tshirt', (req, res) => {
    fs.readFile('tshirt.json', (err, data) => {
      if (err) {
        console.error("Error reading products1 file:", err);
        res.status(500).send("Error fetching products1");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.get('/api/shoes', (req, res) => {
    fs.readFile('shoes.json', (err, data) => {
      if (err) {
        console.error("Error reading products2 file:", err);
        res.status(500).send("Error fetching products2");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.get('/api/trousers', (req, res) => {
    fs.readFile('trousers.json', (err, data) => {
      if (err) {
        console.error("Error reading products3 file:", err);
        res.status(500).send("Error fetching products3");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.get('/api/accessories', (req, res) => {
    fs.readFile('accessories.json', (err, data) => {
      if (err) {
        console.error("Error reading products4 file:", err);
        res.status(500).send("Error fetching products4");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
