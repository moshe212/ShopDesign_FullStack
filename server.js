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
const server = http.createServer(app);
const io = socketIo.listen(server);
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const ProductSchema = new mongoose.Schema({
  // _id: String,
  title: String,
  image: String,
  quantity: Number,
  price: Number,
  Orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const CustomerSchema = new mongoose.Schema({
  UserName: String,
  Password: String,
  FullName: String,
  Home: String,
  Street: String,
  City: String,
  Telephone: Number,
  CellPhone: Number,
});

const OrderSchema = new mongoose.Schema({
  CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  Products: [
    {
      productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  OrderDate: Date,
  RequiredDate: Date,
  ShippedDate: Date,
  ShipStreet: String,
  ShipHome: String,
  ShipCity: String,
  Status: Boolean,
  TotalAmount: Number,
});

const UserSchema = new mongoose.Schema({
  UserName: String,
  Password: Number,
  LastNmme: String,
  FirstName: String,
  Title: String,
  BirthDate: Date,
  HireDate: Date,
  Address: String,
  City: String,
  Region: String,
  PostalCode: String,
  HomePhone: String,
  CellPhone: String,
  Notes: String,
  Admin: Boolean,
});

// const OrderDetailsSchema = new mongoose.Schema({
//   OrderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
//   ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//   Quantity: Number,
//   Price: Number,
// });

const User = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
const Product = mongoose.model("Product", ProductSchema);
// const OrderDetails = mongoose.model("OrderDetails", OrderDetailsSchema);

dotenv.config();
app.use(bodyParser.json());

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "Client/build")));

let DB_Name = process.env.DB_Name;
let DB_Pass = process.env.DB_Pass;
let Mongo_Path = process.env.Mongo_Path;

function connectToDB() {
  // const connection = mongoose.connect("mongodb://localhost/Shop", {

  const connection = mongoose.connect(Mongo_Path, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  // autoIncrement.initialize(connection);
  // ProductSchema.plugin(autoIncrement.plugin, "Product");

  return connection;
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//החזרת כל המוצרים או לפי חיפוש אם יש חיפוש == Mongo
app.get("/api/products", (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  console.log(search);

  if (search) {
    const filteredProducts = Product.find(
      { title: { $regex: search, $options: "i" } },
      (err, filteredProducts) => {
        if (err) return console.error(err);
        res.send(filteredProducts);
      }
    );
  } else {
    Product.find((err, productItems) => {
      if (err) return console.error(err);
      console.log(productItems);
      res.send(productItems);
    });
  }
});

//החזרת כל ההזמנות או לפי חיפוש אם יש חיפוש == Mongo
app.get("/api/orders", async (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  console.log(search);

  if (search) {
    const StartDate = new Date(search);
    const NextDay = new Date(+StartDate);
    const DayValue = NextDay.getDate() + 1;
    const NextDayDate = NextDay.setDate(DayValue);
    console.log("NextDayDate", NextDayDate);
    const filteredOrders = await Order.find(
      {
        OrderDate: { $gte: new Date("2020-10-25"), $lt: new Date(NextDayDate) },
      },
      (err, filteredOrders) => {
        if (err) return console.error(err);
        console.log(filteredOrders);
        res.send(filteredOrders);
      }
    );
  } else {
    Order.find((err, orderItems) => {
      if (err) return console.error(err);
      console.log(orderItems);
      res.send(orderItems);
    });
  }
});

//החזרת כמות הזמנות לפי תאריך
app.get("/api/orders/dates", async (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  console.log(search);
  const OrdersCount = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$OrderDate" } },
        // _id: { $dayOfYear: "$OrderDate" },
        'סה"כ הזמנות': { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  // const day = await Order.aggregate([
  //   { $project: { day: OrdersCount[0]._id } },
  // ]);
  // console.log(day);

  console.log(OrdersCount);

  res.send(OrdersCount);

  // const filteredProducts = Order.find(
  //   { title: { $regex: search, $options: "i" } },
  //   (err, filteredProducts) => {
  //     if (err) return console.error(err);
  //     res.send(filteredProducts);
  //   }
  // );
});

//החזרת סהכ הכנסות לחודש
app.get("/api/orders/total_income", async (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  console.log(search);
  const OrdersTotalIncome = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$OrderDate" } },
        // _id: "ProductID",
        'סה"כ הכנסות': { $sum: "$TotalAmount" },
      },
    },

    { $sort: { _id: 1 } },
  ]);
  // const day = await Order.aggregate([
  //   { $project: { day: OrdersCount[0]._id } },
  // ]);
  // console.log(day);

  console.log(OrdersTotalIncome);

  res.send(OrdersTotalIncome);

  // const filteredProducts = Order.find(
  //   { title: { $regex: search, $options: "i" } },
  //   (err, filteredProducts) => {
  //     if (err) return console.error(err);
  //     res.send(filteredProducts);
  //   }
  // );
});

//החזרת כל המוצרים או לפי חיפוש אם יש חיפוש == Mongo
// app.get("/api/products", (req, res) => {
//   console.log("QUERY:", req.query);
//   const search = req.query.search;
//   console.log(search);

//   if (search) {
//     const filteredProducts = Product.find(
//       { title: { $regex: search, $options: "i" } },
//       (err, filteredProducts) => {
//         if (err) return console.error(err);
//         res.send(filteredProducts);
//       }
//     );
//   } else {
//     Product.find((err, productItems) => {
//       if (err) return console.error(err);
//       console.log(productItems);
//       res.send(productItems);
//     });
//   }
// });

app.get("/api/products/Admin/ManageProducts", (req, res) => {
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

// הוספת מוצר == Mongo
app.post("/api/products", async (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const image = req.body.image;
  const quantity = req.body.quantity;
  const price = req.body.price;

  const newProduct = new Product({
    title: title,
    image: image,
    quantity: +quantity,
    price: +price,
  });
  await newProduct.save();
  Product.find((err, productItems) => {
    if (err) return console.error(err);
    // console.log(productItems);
    res.send(productItems);
  });
});

//מחיקת מוצר == Mongo
app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  Product.findByIdAndDelete(productId, (err, prod) => {
    if (err) {
      console.log(err);
    } else {
      console.log("delete", prod);
    }
  });

  productItems = await Product.find().exec();

  res.send(productItems);
});

// עדכון מוצר == Mongo
app.put("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  Product.findByIdAndUpdate(
    productId,
    { $set: { ...req.body } },
    // (options.new = true),
    (err, prod) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update", prod);
      }
    }
  );

  productItems = await Product.find().exec();

  res.send(productItems);
});

//הוספת הזמנה-- Mongo
app.post("/api/AddOrder", async (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const image = req.body.image;
  const quantity = req.body.quantity;
  const price = req.body.price;

  const newProduct = new Product({
    title: title,
    image: image,
    quantity: +quantity,
    price: +price,
  });
  await newProduct.save();
  Product.find((err, productItems) => {
    if (err) return console.error(err);
    // console.log(productItems);
    res.send(productItems);
  });
});

// הורדת קובץ מבנה לקבלת קובץ רשימת מוצרים להעלאה
app.get("/api/download/:file(*)", function (req, res) {
  // const file = "Test.txt";
  const file = req.params.file;
  const fileLocation = path.join("./", file);
  console.log(fileLocation);
  res.download(fileLocation, file); // Set disposition and send it.
});

// הוספת מוצרים מקובץ Csv == Mongo
app.post("/api/upload", (req, res) => {
  console.log(req.query);
  req.pipe(fs.createWriteStream(`./${req.query.filename}`));
  if (req.query.filename.includes("csv")) {
    csv()
      .fromFile(`./${req.query.filename}`)
      .then(function (jsonObj) {
        for (i = 0; i < jsonObj.length; i++) {
          const title = jsonObj[i].title;
          const image = jsonObj[i].image;
          const quantity = jsonObj[i].quantity;
          const price = jsonObj[i].price;

          const newProduct = new Product({
            title: title,
            image: image,
            quantity: +quantity,
            price: +price,
          });
          newProduct.save();
        }
        Product.find((err, productItems) => {
          if (err) return console.error(err);
          // console.log(productItems);
          res.status(200).send("OK");
          // res.send(productItems);
        });
      });
  }
});

// הוספת מוצר עם קובץ להעלאה עבור תמונה == Mongo
app.post("/api/AddProductWithImgFile", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  req.pipe(
    fs.createWriteStream(`../ShopDesign/public/Images/${req.query.filename}`)
  );
  const title = req.query.title;
  const image = `/Images/${req.query.filename}`;
  const quantity = req.query.quantity;
  const price = req.query.price;

  const newProduct = new Product({
    title: title,
    image: image,
    quantity: +quantity,
    price: +price,
  });
  newProduct.save();

  Product.find((err, productItems) => {
    if (err) return console.error(err);
    // console.log(productItems);
    res.send(productItems);
  });
});

// עדכון מוצר עם אפשרות להעלאת תמונה כקובץ == Mongo
app.put("/api/UpdateProduct", async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  if (req.query.filename.length > 0) {
    req.pipe(
      fs.createWriteStream(`../ShopDesign/public/Images/${req.query.filename}`)
    );
  }

  const Propertys = {};
  for (property in req.query) {
    if (property != "filename" && req.query[property].length > 0) {
      Propertys[property] = req.query[property];
    } else if (property === "filename" && req.query[property].length > 0) {
      Propertys["image"] = `/Images/${req.query.filename}`;
    }
  }

  console.log(Propertys);
  const productId = req.query.id;
  Product.findByIdAndUpdate(
    productId,
    { $set: { ...Propertys } },
    (err, prod) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update", prod);
      }
    }
  );

  productItems = await Product.find().exec();

  // res.send("YOU SUCCEED!!!");
  res.send(productItems);
});

// כניסת מנהל == Mongo
app.post("/api/LogInAdmin", (req, res) => {
  console.log(req.body);
  const { Email, Pass } = req.body;
  console.log(Email, Pass);

  const AdminItem = User.find({ Admin: true }, (err, Adminusers) => {
    if (err) return console.error(err);
    console.log(Adminusers);
    console.log(Adminusers.length);
    for (let i = 0; i < Adminusers.length; i++) {
      const { UserName, Password } = Adminusers[i];
      console.log(UserName, Password);
      if (UserName === Email && Password === parseInt(Pass)) {
        res.status(200).send("OK");
      } else {
        res.status(200).send("Not_allow");
      }
    }
  });
});

// כניסת לקוח == Mongo
app.post("/api/LogInCustomer", (req, res) => {
  console.log(req.body);
  const { Email, Pass } = req.body;
  console.log(Email, Pass);
  let Status = "";
  const CustomerItem = Customer.find((err, Customers) => {
    if (err) return console.error(err);
    console.log(Customers);
    for (let i = 0; i < Customers.length; i++) {
      const { UserName, Password, FullName } = Customers[i];
      console.log(UserName, Email, Password, Pass, FullName);
      if (UserName === Email && Password === Pass) {
        Status = ["OK", Customers[i]._id, FullName];
        break;
      } else {
        Status = "Not_allow";
      }
    }
    console.log(Status);
    res.status(200).send(Status);
  });
});

// כניסת משתמש == Mongo
// app.post("/api/LogInCustomer", (req, res) => {
//   console.log(req.body);
//   const { Email, Pass } = req.body;
//   console.log(Email, Pass);
//   let Status = "";
//   const CustomerItem = Customer.find({ Admin: false }, (err, Customers) => {
//     if (err) return console.error(err);
//     console.log(Customers);
//     for (let i = 0; i < Customers.length; i++) {
//       const { UserName, Password, FirstName, LastNmme } = Customers[i];
//       console.log(UserName, Password, FirstName, LastNmme);
//       if (UserName === Email && Password === parseInt(Pass)) {
//         Status = ["OK", Customers[i]._id, FirstName + " " + LastNmme];
//         break;
//       } else {
//         Status = "Not_allow";
//       }
//     }
//     console.log(Status);
//     res.status(200).send(Status);
//   });
// });

//עדכון מלאי
// app.put("/UpdateQuantity/:id", async (req, res) => {
//   // console.log(req.query);
//   // console.log(req.body);
//   const productId = req.params.id;
//   const Quantity = +req.body.quantity;
//   console.log(productId);
//   Product.findByIdAndUpdate(
//     productId,
//     { $set: { ...req.body } },
//     // (options.new = true),
//     (err, prod) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("update", prod);
//       }
//     }
//   );

//   productItems = await Product.find().exec();

//   res.send(productItems);
//   io.emit("UpdateQuantity", { id: productId, quantity: Quantity });
// });

//הוספת מוצר לעגלה
app.post("/api/AddToCart", async (req, res) => {
  // console.log(req.query);
  console.log(req.body);
  const ProductId = req.body.ProductID;
  const Quantity = +req.body.Quantity;
  const IsNewOrder = req.body.IsNewOrder;
  const CustomerID = req.body.CustomerID;
  const UnitPrice = req.body.UnitPrice;
  const Total = UnitPrice * Quantity;

  console.log("Total", Total);

  if (CustomerID) {
    Customer.findById(CustomerID, async (err, customer) => {
      if (err) {
        console.log(err);
      } else {
        console.log("find", customer);
        const ShipStreet = customer.Street;
        const ShipHome = customer.Home;
        const ShipCity = customer.City;
        console.log("ShipAddress", ShipStreet, ShipHome, ShipCity);
        console.log(ProductId, Quantity, IsNewOrder);
        if (IsNewOrder) {
          const newOrder = new Order({
            CustomerID: CustomerID,
            Products: { productid: ProductId, quantity: Quantity },
            // Quantity: Quantity,
            OrderDate: Date.now(),
            RequiredDate: Date.now(),
            ShippedDate: Date.now(),
            ShipStreet: ShipStreet,
            ShipHome: ShipHome,
            ShipCity: ShipCity,
            Status: false,
            TotalAmount: Total,
          });
          await newOrder.save();
          // console.log(newOrder._id);

          // const newOrderDetails = new OrderDetails({
          //   OrderID: newOrder._id,
          //   ProductID: ProductId,
          //   Quantity: Quantity,
          //   Price: UnitPrice,
          // });
          // await newOrderDetails.save();
        } else {
          console.log("not new");
          Order.find(
            { CustomerID: CustomerID, Status: false },
            async (err, order) => {
              if (err) {
                console.log(err);
              } else {
                const OrderID = order[0]._id;
                const OrderTotal = order[0].TotalAmount;
                const OrderTotalEnd = OrderTotal + Total;
                // console.log(order[0]);
                // console.log("find", OrderID, OrderTotal, OrderTotalEnd);

                const ThisOrder = await Order.findOne({
                  _id: OrderID,
                });
                await ThisOrder.Products.push({
                  productid: ProductId,
                  quantity: Quantity,
                });
                ThisOrder.TotalAmount = OrderTotalEnd;
                await ThisOrder.save();

                // ThisOrder({
                //   $push: {
                //     Products: { productid: ProductId, quantity: Quantity },
                //   },
                // });
                // ThisOrder({ TotalAmount: OrderTotalEnd });
                // ThisOrder.save();
                //   function (error, success) {
                //     if (error) {
                //       console.log(error);
                //     } else {
                //       console.log(success);
                //     }
                //   }
                // );
                // Order.findByIdAndUpdate(
                //   { _id: OrderID },
                //   {
                //     $push: {
                //       Products: { productid: ProductId, quantity: Quantity },
                //     },
                //   },
                //   { TotalAmount: OrderTotalEnd },
                //   { new: true, useFindAndModify: false },
                //   function (error, success) {
                //     if (error) {
                //       console.log(error);
                //     } else {
                //       console.log(success);
                //     }
                //   }
                // );
                // const newOrderDetails = new OrderDetails({
                //   OrderID: order[0]._id,
                //   ProductID: ProductId,
                //   Quantity: Quantity,
                //   Price: UnitPrice,
                // });
                // await newOrderDetails.save();
              }
            }
          );
        }
      }
    });
  }

  // Product.findByIdAndUpdate(
  //   productId,
  //   { $set: { ...req.body } },
  //   // (options.new = true),
  //   (err, prod) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("update", prod);
  //     }
  //   }
  // );

  // productItems = await Product.find().exec();

  // res.send(productItems);
  // io.emit("UpdateQuantity", { id: productId, quantity: Quantity });
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
});
