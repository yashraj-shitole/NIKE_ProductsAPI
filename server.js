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
    const data = fs.readFileSync('allproducts.json');
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

  fs.writeFile('allproducts.json', JSON.stringify(products, null, 2), err => {
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
        console.error("Error reading tshirt file:", err);
        res.status(500).send("Error fetching tshirt");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.get('/api/shoes', (req, res) => {
    fs.readFile('shoes.json', (err, data) => {
      if (err) {
        console.error("Error reading shoes file:", err);
        res.status(500).send("Error fetching shoes");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.get('/api/trousers', (req, res) => {
    fs.readFile('trousers.json', (err, data) => {
      if (err) {
        console.error("Error reading trousers file:", err);
        res.status(500).send("Error fetching trousers");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });
  
  app.get('/api/accessories', (req, res) => {
    fs.readFile('accessories.json', (err, data) => {
      if (err) {
        console.error("Error reading accessories file:", err);
        res.status(500).send("Error fetching accessories");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });

  app.get('/api/allproducts', (req, res) => {
    fs.readFile('allproducts.json', (err, data) => {
      if (err) {
        console.error("Error reading allproducts file:", err);
        res.status(500).send("Error fetching allproducts");
      } else {
        res.json(JSON.parse(data));
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
