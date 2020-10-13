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

  const Customer = mongoose.model("Customer", CustomerSchema);

  const newCustomer = new Customer({
    UserName: "David@gmail.com",
    Password: "123456789",
    FullName: "דוד כהן",
    Home: "",
    Street: "",
    City: "",
    Telephone: "",
    CellPhone: "",
  });
  newCustomer.save();

  //   const data = Kitten.find().exec();
  //   console.log(data);
});
