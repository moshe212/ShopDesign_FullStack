const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const csv = require("csvtojson");
const utf8 = require("utf8");
const dotenv = require("dotenv");
// const { Socket } = require('dgram');
const server = http.createServer(app);
const io = socketIo(server);
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

dotenv.config();
app.use(bodyParser.json());

app.use(cors());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//החזרת כל המוצרים או לפי חיפוש אם יש חיפוש == Json
app.get("/products", (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  console.log(search);
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    if (search) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      res.send(filteredProducts);
    } else {
      res.send(products);
    }
  });
});

app.get("/products/Admin/ManageProducts", (req, res) => {
  console.log("QUERY:", req.query);

  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const Total = products.length;
    const size = req.query.per_page;
    const items = products.slice(0, size);
    console.log(items);
    // var items = list.slice(0, size).map(i => {
    //     return <myview item={i} key={i.id} />
    // }
    const resp = {
      page: req.query.page,
      per_page: req.query.per_page,
      total: Total,
      total_pages: Math.ceil(req.query.page / req.query.per_page),
      data: items,
    };
    console.log(resp);

    res.send(resp);
  });
});

//הסופת מוצר == Json
app.post("/products", (req, res) => {
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const title = req.body.title;
    const image = req.body.image;
    const quantity = req.body.quantity;
    const price = req.body.price;

    const IDs = products.map((prod) => prod.id);
    const MaxID = Math.max(...IDs);

    console.log(title);
    console.log("id", MaxID);
    products.push({
      id: MaxID + 1,
      title: title,
      image: image,
      quantity: quantity,
      price: price,
    });
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      fs.readFile("product.json", (err, data) => {
        const products = JSON.parse(data);
        console.log("YOU SUCCEED!!!", products);
        res.send(products);
      });
      // res.send("YOU SUCCEED!!!");
    });
  });
});

// מחיקת מוצר == Json
app.delete("/products/:id", (req, res) => {
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const productId = +req.params.id;
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    products.splice(productIndex, 1);
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      fs.readFile("product.json", (err, data) => {
        const products = JSON.parse(data);
        console.log("YOU SUCCEED!!!", products);
        res.send(products);
      });
      // res.send("YOU SUCCEED!!!");
    });
  });
});

// עדכון מוצר == Json
app.put("/products/:id", (req, res) => {
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const productId = +req.params.id;
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    for (property in req.body) {
      products[productIndex][property] = req.body[property];
    }
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      fs.readFile("product.json", (err, data) => {
        const products = JSON.parse(data);
        console.log("YOU SUCCEED!!!", products);
        res.send(products);
      });
      // res.send("YOU SUCCEED!!!");
    });
  });
});

// הורדת קובץ מבנה לקבלת קובץ רשימת מוצרים להעלאה
app.get("/download/:file(*)", function (req, res) {
  // const file = "Test.txt";
  const file = req.params.file;
  const fileLocation = path.join("./", file);
  console.log(fileLocation);
  res.download(fileLocation, file); // Set disposition and send it.
});

// הוספת מוצרים מקובץ Csv == Json
app.post("/upload", (req, res) => {
  console.log(req.query);
  req.pipe(fs.createWriteStream(`./${req.query.filename}`));
  if (req.query.filename.includes("csv")) {
    csv()
      .fromFile(`./${req.query.filename}`)
      .then(function (jsonObj) {
        fs.readFile("product.json", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            obj = JSON.parse(data);
            // const j = utf8.encode(JSON.stringify(jsonObj));
            // const je = utf8.encode(JSON.parse(jsonObj));
            // console.log(je);
            for (i = 0; i < jsonObj.length; i++) {
              const IDs = obj.map((prod) => prod.id);
              const MaxID = Math.max(...IDs);
              obj.push({
                id: MaxID + 1,
                title: jsonObj[i].title,
                image: jsonObj[i].image,
                quantity: jsonObj[i].quantity,
                price: jsonObj[i].price,
              });
            }
            json = JSON.stringify(obj); //convert it back to json

            fs.writeFile("product.json", json, "utf8", (err) => {
              console.log("OK");
            });
          }
        });
        // fs.writeFile("product_test.json", JSON.stringify(jsonObj), (err) => {
        //   if (err) return console.log(err);
        // });
      });
  }
  res.send("OK");
});

// הוספת מוצר עם קובץ להעלאה עבור התמונה == Json
app.post("/AddProductWithImgFile", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  req.pipe(
    fs.createWriteStream(`../ShopDesign/public/Images/${req.query.filename}`)
  );
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const title = req.query.title;
    const image = `/Images/${req.query.filename}`;
    const quantity = req.query.quantity;
    const price = req.query.price;

    const IDs = products.map((prod) => prod.id);
    const MaxID = Math.max(...IDs);

    console.log(title);
    console.log(image);
    console.log("id", MaxID);
    products.push({
      id: MaxID + 1,
      title: title,
      image: image,
      quantity: quantity,
      price: price,
    });

    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      fs.readFile("product.json", (err, data) => {
        const products = JSON.parse(data);
        console.log("YOU SUCCEED!!!", products);
        // res.send(products);
      });
      // res.send("YOU SUCCEED!!!");
    });
  });
});

// עדכון מוצר עם אפשרות להעלאת תמונה כקובץ == Json
app.put("/UpdateProduct", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  req.pipe(
    fs.createWriteStream(`../ShopDesign/public/Images/${req.query.filename}`)
  );
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const productId = +req.query.id;
    console.log("productId", productId);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    console.log("productIndex", productIndex);
    for (property in req.query) {
      // console.log("property", property);
      if (property != "filename") {
        console.log("property", property);
        if (property != "image") {
          products[productIndex][property] = req.query[property];
        }
        if (property === "image") {
          products[productIndex][property] = `/Images/${req.query.filename}`;
        }
      }
    }
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      // console.log("YOU SUCCEED!!!", products);
      res.send("YOU SUCCEED!!!");
    });
    // res.send("YOU SUCCEED!!!");
  });
});

// כניסת מנהל == Json
app.post("/LogInAdmin", (req, res) => {
  console.log(req.body);
  const { Email, Password } = req.body;
  console.log(Email, Password);
  if (
    Email === process.env.Admin_Email &&
    Password === process.env.Admin_Password
  ) {
    res.status(200).send("OK");
  } else {
    res.status(200).send("Not_allow");
  }
});

// כניסת משתמש == Json
app.post("/LogInUser", (req, res) => {
  console.log(req.body);
  const { Email, Password } = req.body;
  console.log(Email, Password);
  fs.readFile("Users.json", (err, data) => {
    const usersList = JSON.parse(data);
    let Status = "";

    for (i = 0; i < usersList.length; i++) {
      const Username = usersList[i].UserName;
      const Pass = usersList[i].Password;
      const UserID = usersList[i].ID;
      const FullName = usersList[i].FullName;
      console.log(Username, Pass, UserID, FullName);
      if (Username === Email && Pass === parseInt(Password)) {
        Status = ["OK", UserID, FullName];

        break;
      } else {
        Status = "Not_Allow";
      }
    }
    console.log(Status);
    res.status(200).send(Status);
  });
});

app.get("/LogInUser/ID", (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  console.log(search);
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    if (search) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      res.send(filteredProducts);
    } else {
      res.send(products);
    }
  });
});

//עדכון מלאי
app.put("/UpdateQuantity/:id", (req, res) => {
  // console.log(req.query);
  // console.log(req.body);
  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const productId = +req.params.id;
    const Quantity = +req.body.Quantity;
    console.log("productId", productId);
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );
    products[productIndex].quantity = Quantity;
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      res.send("YOU SUCCEED!!!");
    });
    io.emit("UpdateQuantity", { id: productId, quantity: Quantity });
  });
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
});
