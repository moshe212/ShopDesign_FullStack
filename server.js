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

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const SubCategorySchema = new mongoose.Schema({
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categorys" },
  name: String,
});

const ProductSchema = new mongoose.Schema({
  title: String,
  image: String,
  quantity: Number,
  price: Number,
  subCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "subCategorys" },
  mainCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categorys" },
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
const Category = mongoose.model("categorys", CategorySchema);
const SubCategory = mongoose.model("subCategorys", SubCategorySchema);
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
    useFindAndModify: false,
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

// Category.find({}).then((res) => {
//   console.log(res);
// });

app.post("/api/Whatsapp", async (req, res) => {
  console.log("whatsapp ok", req);
  const jsonFile = { reply: "שלום, אני השרת של משה. תודה שפנית אלי.." };
  res.send(jsonFile);
});

//החזרת כל המוצרים או לפי חיפוש אם יש חיפוש == Mongo
app.get("/api/products", async (req, res) => {
  console.log("QUERY:", req.query);
  const search = req.query.search;
  const categoryName = req.query.category;
  console.log(categoryName);

  if (search) {
    const filteredProducts = await Product.find(
      { title: { $regex: search, $options: "i" } },
      (err, filteredProducts) => {
        if (err) return console.error(err);
        res.send(filteredProducts);
      }
    );
  } else if (categoryName) {
    const filteredCategory = await Category.findOne(
      { name: categoryName },
      async (err, category) => {
        if (err) return console.error(err);
        console.log(category);
        if (!category) {
          await SubCategory.findOne(
            { name: categoryName },
            async (err, subcategory) => {
              if (err) return console.error(err);
              console.log("sub", subcategory);
              const filteredProducts = await Product.find(
                { subCategoryID: subcategory._id },
                (err, filteredProductsList) => {
                  if (err) return console.error(err);
                }
              )
                .populate("subCategoryID")
                .populate("mainCategoryID")
                .exec();

              res.send(filteredProducts);
            }
          );
        } else {
          const filteredProducts = await Product.find(
            { mainCategoryID: category._id },
            (err, filteredProducts) => {
              if (err) return console.error(err);
            }
          )
            .populate("subCategoryID")
            .populate("mainCategoryID")
            .exec();

          res.send(filteredProducts);
        }
      }
    );
  } else {
    const ProductList = await Product.find((err, productItems) => {
      if (err) return console.error(err);
      // console.log(productItems);
      // res.send(productItems);
    })
      .populate("subCategoryID")
      .populate("mainCategoryID")
      .exec();

    // const x = await SubCategory.find({}).populate("categoryID");

    console.log(ProductList);
    // console.log(x);
    res.send(ProductList);
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
    console.log("NextDayDate", NextDayDate, new Date(NextDayDate));
    const filteredOrders = await Order.find(
      {
        OrderDate: { $gte: new Date(StartDate), $lt: new Date(NextDayDate) },
      },
      (err, filtered) => {
        if (err) return console.error(err);
        // console.log(filteredOrders);
      }
    )
      .populate("Products.productid")
      .populate("CustomerID")
      .exec();

    // console.log(filtered);
    res.send(filteredOrders);
  } else {
    const OrdersList = await Order.find((err, orderItems) => {
      if (err) return console.error(err);
      // console.log(orderItems);
      // res.send(orderItems);
    })
      .populate("CustomerID")
      .exec();

    // const getArray = async () => {
    //   let ProductListCartInServer = [];
    //   for (let i = 0; i < Orderitem.Products.length; i++) {
    //     const Prod = {
    //       id: Orderitem.Products[i].productid._id,
    //       title: Orderitem.Products[i].productid.title,
    //       image: Orderitem.Products[i].productid.image,
    //       quantity: Orderitem.Products[i].quantity,
    //       price: Orderitem.Products[i].productid.price,
    //     };
    //     ProductListCartInServer.push(Prod);
    //   }
    //   return ProductListCartInServer;
    // };
    // const ArrayForClient = await getArray();
    // res.status(200).send(ArrayForClient);
    console.log("OrdersList", OrdersList);
    res.send(OrdersList);
  }
});

//החזרת לקוחות לפי ביצוע הזמנות לפי תאריך
app.get("/api/orders_customers", async (req, res) => {
  const search = req.query.search.replace("'", "");
  const month = search.split("-")[1].replace("'", "");
  const year = search.split("-")[0];
  console.log("search", search);
  console.log(month, year);

  const filteredOrders = await Order.aggregate([
    {
      $addFields: {
        month: { $month: "$OrderDate" },
        year: { $year: "$OrderDate" },
        count: 1,
      },
    },
    { $match: { month: +month } },
    { $match: { year: +year } },
    // {
    //   $group: {
    //     _id: { CustomerID: "$CustomerID" },
    //     'סה"כ הזמנות': { $sum: 1 },
    //   },
    // },
    {
      $lookup: {
        from: "customers",
        localField: "CustomerID",
        foreignField: "_id",
        as: "CustomerDetails",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "Products.productid",
        foreignField: "_id",
        as: "ProductsDetails",
      },
    },
  ]);

  res.send(filteredOrders);
});

//החזרת כמות הזמנות לפי תאריך
app.get("/api/orders/dates", async (req, res) => {
  console.log("here");
  const search = req.query.search;
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

  console.log(OrdersCount);

  res.send(OrdersCount);
});

//החזרת סהכ הכנסות לחודש
app.get("/api/orders/total_income", async (req, res) => {
  const search = req.query.search;
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
});

app.get("/api/products/Admin/ManageProducts", (req, res) => {
  console.log("QUERY:", req.query);

  fs.readFile("product.json", (err, data) => {
    const products = JSON.parse(data);
    const Total = products.length;
    const size = req.query.per_page;
    const items = products.slice(0, size);

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
app.post("/api/upload", async (req, res) => {
  console.log("upload", req.query.filename);
  let dir = "productList/";

  //checking if the upload dir exists on server, create it if not
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  let csvFile = `${dir}${Date.now()}.csv`;

  req.pipe(fs.createWriteStream(csvFile));

  setTimeout(async () => {
    if (fs.existsSync(csvFile)) console.log(`${csvFile} exists`);
    else console.log(`${csvFile} NOT exists`);

    if (req.query.filename.includes("csv")) {
      console.log("csv", csvFile);
      await csv()
        .fromFile(csvFile)
        .then((jsonObj) => {
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
            // console.log("newProduct", newProduct);
            newProduct.save();
          }
          Product.find((err, productItems) => {
            if (err) return console.error(err);

            res.status(200).send("OK");
          });
        });
    }
  }, 2000);
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
app.post("/api/LogInCustomer", async (req, res) => {
  console.log(req.body);
  const { Email, Pass, TempCart } = req.body;
  console.log(Email, Pass);
  let Status = "";
  let CustomerID = "";
  let CustomerFullName = "";
  let UserHome = "";
  let UserStreet = "";
  let UserCity = "";
  let UserTelephone = "";
  let UserCellPhone = "";
  let UserMail = "";
  let OrderList = "";
  let SaveTempCart = "";

  const GetOrder = (ID) => {
    console.log(ID);
    let myPromise = new Promise((resolve, reject) => {
      const Orderitem = Order.findOne(
        { CustomerID: CustomerID, Status: false },
        (err, order) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("OrderList0_LogIn", order);
            if (order != null) {
              IsOrder = true;
            } else {
              IsOrder = false;
            }
            resolve(order);
          }
        }
      );
    });
    return myPromise;
  };

  const GetCustomer = (List) => {
    console.log(List);
    let myPromise2 = new Promise((resolve, reject) => {
      for (let i = 0; i < List.length; i++) {
        const {
          UserName,
          Password,
          FullName,
          Home,
          Street,
          City,
          Telephone,
          CellPhone,
        } = List[i];

        if (UserName === Email && Password === Pass) {
          CustomerID = List[i]._id;
          CustomerFullName = FullName;
          UserHome = Home;
          UserStreet = Street;
          UserCity = City;
          UserTelephone = Telephone;
          UserCellPhone = CellPhone;
          UserMail = UserName;

          resolve(CustomerID);
          break;
        } else {
          console.log("Status", Status);
        }
      }
      resolve("Not_Found_User");
    });
    return myPromise2;
  };

  const AddProductsFromTempCart = (ID, TempCart) => {
    let myPromise = new Promise((resolve, reject) => {
      Order.findById(ID, async (err, order) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const ThisOrder = order;
          for (let p = 0; p < JSON.parse(TempCart).length; p++) {
            await ThisOrder.Products.push({
              productid: JSON.parse(TempCart)[p]._id,
              quantity: JSON.parse(TempCart)[p].quantity,
            });
            await ThisOrder.save();
          }

          const Thisorder_ToClient = ThisOrder;

          resolve(Thisorder_ToClient);
        }
      });
    });
    return myPromise;
  };

  const CustomerItem = Customer.find(async (err, Customers) => {
    if (err) {
      console.error(err);
    } else {
      await GetCustomer(Customers).then(
        (result) => {
          if (result === "Not_Found_User") {
            Status = "Not_Allow";
            res.status(200).send(Status);
          } else {
            GetOrder(CustomerID).then(
              (result) => {
                if (result != null) {
                  IsOrder = true;
                  if (TempCart) {
                    SaveTempCart = TempCart;
                  }
                  Status = [
                    "OK",
                    CustomerID,
                    CustomerFullName,
                    IsOrder,
                    UserHome,
                    UserStreet,
                    UserCity,
                    UserTelephone,
                    UserCellPhone,
                    UserMail,
                    SaveTempCart,
                  ];

                  res.status(200).send(Status);
                } else if (TempCart) {
                  let ProductsArrayForOrder;
                  let Totals;
                  let TotalAmount = 0;

                  ProductsArrayForOrder = JSON.parse(TempCart).map(
                    (prodObj) => ({
                      productid: prodObj._id,
                      quantity: prodObj.quantity,
                    })
                  );

                  Totals = JSON.parse(TempCart).map(
                    (prodObj) => prodObj.quantity * prodObj.price
                  );

                  TotalAmount = Totals.reduce((a, b) => a + b, 0);

                  const newOrder = new Order({
                    CustomerID: CustomerID,
                    Products: [],
                    OrderDate: Date.now(),
                    RequiredDate: Date.now(),
                    ShippedDate: Date.now(),
                    ShipStreet: "",
                    ShipHome: "",
                    ShipCity: "",
                    Status: false,
                    TotalAmount: TotalAmount,
                  });
                  newOrder.save(function async(err, order) {
                    if (err) {
                      console.log(err);
                    } else {
                      AddProductsFromTempCart(order._id, TempCart).then(
                        (result) => {
                          console.log("AddProductsFromTempCartresulte", result);
                          IsOrder = true;

                          Status = [
                            "OK",
                            CustomerID,
                            CustomerFullName,
                            IsOrder,
                            UserHome,
                            UserStreet,
                            UserCity,
                            UserTelephone,
                            UserCellPhone,
                            UserMail,
                            SaveTempCart,
                          ];
                          console.log("Status", Status);
                          res.status(200).send(Status);
                        }
                      );
                    }
                  });
                } else {
                  IsOrder = false;

                  Status = [
                    "OK",
                    CustomerID,
                    CustomerFullName,
                    IsOrder,
                    UserHome,
                    UserStreet,
                    UserCity,
                    UserTelephone,
                    UserCellPhone,
                    UserMail,
                    SaveTempCart,
                  ];

                  res.status(200).send(Status);
                }
              },
              (error) => {
                console.log("error", error);
              }
            );
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  });
});

//רישום לקוח
app.post("/api/RegisterCustomer", async (req, res) => {
  console.log(req.body);
  const {
    Email,
    Pass,
    FullName,
    House,
    Street,
    City,
    Phone,
    CellPhone,
    TempCart,
  } = req.body;

  let CustomerID;

  const AddProductsFromTempCart = (ID, TempCart) => {
    let myPromise = new Promise((resolve, reject) => {
      Order.findById(ID, async (err, order) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const ThisOrder = order;
          for (let p = 0; p < JSON.parse(TempCart).length; p++) {
            await ThisOrder.Products.push({
              productid: JSON.parse(TempCart)[p]._id,
              quantity: JSON.parse(TempCart)[p].quantity,
            });
            await ThisOrder.save();
          }

          const Thisorder_ToClient = ThisOrder;

          resolve(Thisorder_ToClient);
        }
      });
    });
    return myPromise;
  };

  let ProductsArrayForOrder;
  let Totals;
  let TotalAmount = 0;

  if (TempCart) {
    ProductsArrayForOrder = JSON.parse(TempCart).map((prodObj) => ({
      productid: prodObj._id,
      quantity: prodObj.quantity,
    }));

    Totals = JSON.parse(TempCart).map(
      (prodObj) => prodObj.quantity * prodObj.price
    );

    TotalAmount = Totals.reduce((a, b) => a + b, 0);
  }

  const newCustomer = new Customer({
    UserName: Email,
    Password: Pass,
    FullName: FullName,
    Home: House,
    Street: Street,
    City: City,
    Telephone: Phone,
    CellPhone: CellPhone,
  });
  newCustomer.save(function async(err, cust) {
    if (err) {
      console.log(err);
    } else {
      CustomerID = cust._id;

      if (TempCart) {
        const newOrder = new Order({
          CustomerID: CustomerID,
          Products: [],
          OrderDate: Date.now(),
          RequiredDate: Date.now(),
          ShippedDate: Date.now(),
          ShipStreet: "",
          ShipHome: "",
          ShipCity: "",
          Status: false,
          TotalAmount: TotalAmount,
        });
        newOrder.save(function async(err, order) {
          if (err) {
            console.log(err);
          } else {
            AddProductsFromTempCart(order._id, TempCart).then((result) => {
              console.log("resulte", result);

              res.status(200).send("RegOK");
            });
          }
        });
      } else {
        res.status(200).send("RegOK");
      }
    }
  });
});

app.post("/api/GetOpenOrderForCustomer", async (req, res) => {
  const { CustomerID } = req.body;

  const Orderitem = await Order.findOne({
    CustomerID: CustomerID,
    Status: false,
  })
    .populate("Products.productid")
    .exec();

  const getArray = async () => {
    let ProductListCartInServer = [];
    for (let i = 0; i < Orderitem.Products.length; i++) {
      const Prod = {
        id: Orderitem.Products[i].productid._id,
        title: Orderitem.Products[i].productid.title,
        image: Orderitem.Products[i].productid.image,
        quantity: Orderitem.Products[i].quantity,
        price: Orderitem.Products[i].productid.price,
      };
      ProductListCartInServer.push(Prod);
    }
    return ProductListCartInServer;
  };
  const ArrayForClient = await getArray();
  res.status(200).send(ArrayForClient);
});

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
  const CustomerID = req.body.CustomerID;
  const UnitPrice = req.body.UnitPrice;
  const Total = UnitPrice * Quantity;
  let Thisorder_ToClient;

  let ShipStreet;
  let ShipHome;
  let ShipCity;

  const AddToExistOrder = (ID) => {
    let myPromise = new Promise((resolve, reject) => {
      Order.find({ CustomerID: ID, Status: false }, async (err, order) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const OrderID = order[0]._id;
          const OrderTotal = order[0].TotalAmount;
          const OrderTotalEnd = OrderTotal + Total;

          const ThisOrder = await Order.findOne({
            _id: OrderID,
          });
          let IsNewProd;
          for (i = 0; i < ThisOrder.Products.length; i++) {
            const Pid = ThisOrder.Products[i].productid;
            if (String(Pid).trim() === String(ProductId).trim()) {
              ThisOrder.Products[i].quantity =
                ThisOrder.Products[i].quantity + Quantity;
              ThisOrder.TotalAmount = OrderTotalEnd;

              IsNewProd = false;

              await ThisOrder.save();
              break;
            } else {
              IsNewProd = true;
            }
          }
          if (IsNewProd) {
            await ThisOrder.Products.push({
              productid: ProductId,
              quantity: Quantity,
            });
            ThisOrder.TotalAmount = OrderTotalEnd;
            await ThisOrder.save();
          }

          Thisorder_ToClient = ThisOrder;

          resolve(Thisorder_ToClient);
        }
      });
    });
    return myPromise;
  };

  const CreateOrderAndAddProd = () => {
    let myPromise = new Promise((resolve, reject) => {
      const newOrder = new Order({
        CustomerID: CustomerID,
        Products: { productid: ProductId, quantity: Quantity },
        OrderDate: Date.now(),
        RequiredDate: Date.now(),
        ShippedDate: Date.now(),
        ShipStreet: ShipStreet,
        ShipHome: ShipHome,
        ShipCity: ShipCity,
        Status: false,
        TotalAmount: Total,
      });
      newOrder.save();
      Thisorder_ToClient = newOrder;
      resolve(Thisorder_ToClient);
    });
    return myPromise;
  };

  const FindProductsFromOrder = (ID, quantity) => {
    let myPromise = new Promise((resolve, reject) => {
      Product.findById(ID, async (err, prod) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const Prod = {
            id: prod._id,
            title: prod.title,
            image: prod.image,
            quantity: quantity,
            price: prod.price,
          };
          resolve(Prod);
        }
      });
    });
    return myPromise;
  };

  const UpdateQuantity = (ProductId) => {
    let myPromise = new Promise((resolve, reject) => {
      const ThisProduct = Product.findById(ProductId, async (err, prod) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          prod.quantity = prod.quantity - 1;
          await prod.save();
          resolve(prod);
        }
      });
    });
    return myPromise;
  };

  if (CustomerID) {
    await Order.find(
      { CustomerID: CustomerID, Status: false },
      (err, order) => {
        if (err) {
          console.log(err);
        } else {
          if (order.length > 0) {
            IsNewOrder = false;
          } else {
            IsNewOrder = true;
          }
        }
      }
    );
    await Customer.findById(CustomerID, async (err, customer) => {
      if (err) {
        console.log(err);
      } else {
        ShipStreet = customer.Street;
        ShipHome = customer.Home;
        ShipCity = customer.City;

        if (IsNewOrder) {
          await CreateOrderAndAddProd().then((result) => {
            console.log("result", result);
            if (result != null) {
              const promises = [];
              for (i = 0; i < result.Products.length; i++) {
                const productId = result.Products[i].productid;
                const quantity = result.Products[i].quantity;
                promises.push(FindProductsFromOrder(productId, quantity));
              }
              Promise.all(promises).then((result) => {
                if (result != null) {
                  Status = ["OK", CustomerID, result];
                  res.status(200).send(Status);
                } else {
                  console.log("Can not CreateProductListToClient");
                }
              });
            }
          });
        } else {
          console.log("not new");

          await AddToExistOrder(CustomerID).then((result) => {
            if (result != null) {
              const promises = [];
              for (i = 0; i < result.Products.length; i++) {
                const productId = result.Products[i].productid;
                const quantity = result.Products[i].quantity;
                promises.push(FindProductsFromOrder(productId, quantity));
              }
              Promise.all(promises).then((result) => {
                console.log("result_FindProductsFromOrder", result);
                if (result != null) {
                  Status = ["OK", CustomerID, result];
                  res.status(200).send(Status);
                } else {
                  console.log("Can not CreateProductListToClient");
                }
              });
            }
          });
        }
        await UpdateQuantity(ProductId);
      }
    });
  }

  // io.emit("UpdateQuantity", { id: productId, quantity: Quantity });
});

app.post("/api/OrderPay", async (req, res) => {
  console.log(req.body);
  const CustomerID = req.body.CustomerID;
  const Orderitem = Order.findOne(
    { CustomerID: CustomerID, Status: false },
    async (err, order) => {
      if (err) {
        console.log(err);
      } else {
        order.Status = true;
        await order.save();
        res.status(200).send("OK");
      }
    }
  );
});

//פרטי עגלה ללקוח - ניהול
app.post("/api/GetOrderForCustomer_Admin", async (req, res) => {
  const { OrderID } = req.body;

  const Orderitem = await Order.findOne({
    _id: OrderID,
  })
    .populate("Products.productid")
    .exec();

  const getArray = async () => {
    let ProductListCartInServer = [];
    for (let i = 0; i < Orderitem.Products.length; i++) {
      const Prod = {
        id: Orderitem.Products[i].productid._id,
        title: Orderitem.Products[i].productid.title,
        image: Orderitem.Products[i].productid.image,
        quantity: Orderitem.Products[i].quantity,
        price: Orderitem.Products[i].productid.price,
      };
      ProductListCartInServer.push(Prod);
    }
    return ProductListCartInServer;
  };
  const ArrayForClient = await getArray();
  res.status(200).send(ArrayForClient);
});

//מחיקת הזמנה - ניהול == Mongo
app.delete("/api/orders/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(req.params.id);
  Order.findByIdAndDelete(orderId, (err, order) => {
    if (err) {
      console.log(err);
    } else {
      console.log("delete", order);
    }
  });

  orderItems = await Order.find().exec();

  res.send(orderItems);
});

// עדכון הזמנה - ניהול == Mongo
app.put("/api/orders/:id", async (req, res) => {
  const orderId = req.params.id;
  console.log(req.body);

  Order.findByIdAndUpdate(
    orderId,
    { $set: { ...req.body } },
    // (options.new = true),
    (err, order) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update", order);
      }
    }
  );

  orderItems = await Order.find().exec();

  res.send(orderItems);
});

//טבלת ניהול לקוחות
app.post("/api/GetClients_Admin", async (req, res) => {
  console.log("req.body", req.body);
  // const limitRows = req.body.limit;
  const Clients = await Customer.find((err, customerItems) => {
    if (err) return console.error(err);
  });

  const getArrayOfClientOrders = async (CustID) => {
    const OrderList = await Order.find(
      { CustomerID: CustID },
      (err, orders) => {
        if (err) {
          console.log(err);
        } else {
          console.log("orders", orders);
        }
      }
    );

    return OrderList;
  };

  const getArrayOfClients = async () => {
    let ClientWithOrdersBelong = [];
    for (let i = 0; i < Clients.length; i++) {
      const Clientorders = await getArrayOfClientOrders(Clients[i]._id);

      const Client = {
        id: Clients[i]._id,
        UserName: Clients[i].UserName,
        FullName: Clients[i].FullName,
        Home: Clients[i].Home,
        Street: Clients[i].Street,
        City: Clients[i].City,
        Telephone: Clients[i].Telephone,
        CellPhone: Clients[i].CellPhone,
        Orders: Clientorders,
      };
      ClientWithOrdersBelong.push(Client);
    }
    return ClientWithOrdersBelong;
  };

  const ArrayOfClient = await getArrayOfClients();
  res.status(200).send(ArrayOfClient);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/Client/build/index.html"));
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
});
