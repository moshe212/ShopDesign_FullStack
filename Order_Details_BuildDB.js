const mongoose = require("mongoose");

function connectToDB() {
  return mongoose.connect(
    "mongodb+srv://moshe:Kisufim39!@cluster0.gopqy.mongodb.net/Shop?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  );
}

connectToDB().then(async () => {
  console.log("connected");

  const ProductSchema = new mongoose.Schema({
    // _id: String,
    title: String,
    image: String,
    quantity: Number,
    price: Number,
  });

  const OrderSchema = new mongoose.Schema({
    CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    OrderDate: Date,
    RequiredDate: Date,
    ShippedDate: Date,
    ShioAddress: String,
    ShipCity: String,
  });

  const OrderDetailsSchema = new mongoose.Schema({
    OrderID: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    Quantity: Number,
  });

  const Order = mongoose.model("Order", OrderSchema);
  const Customer = mongoose.model("Customer", CustomerSchema);
  const OrderDetails = mongoose.model("OrderDetails", OrderDetailsSchema);
  const Product = mongoose.model("Product", ProductSchema);

  const OrderItem = Order.find(
    { _id: "5f5e59be15a79f36b4436800" },
    (err, filteredorders) => {
      if (err) return console.error(err);
      console.log(filteredorders);

      //   const newOrder = new Order({
      //     CustomerID: filteredusers[0]._id,
      //     OrderDate: Date.now(),
      //     RequiredDate: Date.now(),
      //     ShippedDate: Date.now(),
      //     ShioAddress: "Ben Yehuda 16",
      //     ShipCity: "Jerusalem",
      //   });
      //   newOrder.save();
    }
  );

  //   const Orderitem = Order.findOne({ ShipCity: "Jerusalem" })
  //     .populate("CustomerID")
  //     .exec(function (err, customer) {
  //       if (err) return handleError(err);
  //       console.log("The CustomerID is %s", customer);
  //       // prints "The author is Ian Fleming"
  //     });

  //   console.log(Orderitem);
});
