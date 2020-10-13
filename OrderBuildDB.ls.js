const mongoose = require("mongoose");

function connectToDB() {
  return mongoose.connect("mongodb://localhost/Shop", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

connectToDB().then(async () => {
  console.log("connected");

  const OrderSchema = new mongoose.Schema({
    CustomerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    OrderDate: Date,
    RequiredDate: Date,
    ShippedDate: Date,
    ShioAddress: String,
    ShipCity: String,
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

  const Order = mongoose.model("Order", OrderSchema);
  const Customer = mongoose.model("Customer", CustomerSchema);

  // const CustomerItem = Customer.find(
  //   { UserName: "Dany@gmail.com" },
  //   (err, filteredusers) => {
  //     if (err) return console.error(err);
  //     console.log(filteredusers[0]._id);

  //     const newOrder = new Order({
  //       CustomerID: filteredusers[0]._id,
  //       OrderDate: Date.now(),
  //       RequiredDate: Date.now(),
  //       ShippedDate: Date.now(),
  //       ShioAddress: "Ben Yehuda 16",
  //       ShipCity: "Jerusalem",
  //     });
  //     newOrder.save();
  //   }
  // );

  const Orderitem = Order.findOne({ ShipCity: "Jerusalem" })
    .populate("CustomerID")
    .exec(function (err, customer) {
      if (err) return handleError(err);
      console.log("The CustomerID is %s", customer);
      // prints "The author is Ian Fleming"
    });

  console.log(Orderitem);
});
