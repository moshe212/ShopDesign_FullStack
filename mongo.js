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

  const User = mongoose.model("User", UserSchema);

  const newUser = new User({
    UserName: "Dany@gmail.com",
    Password: 123,
    LastNmme: "דני",
    FirstName: "נסים",
    Title: "",
    BirthDate: "",
    HireDate: Date.now(),
    Address: "hagefen 3",
    City: "Hashmonaim",
    Region: "",
    PostalCode: "",
    HomePhone: "089761418",
    CellPhone: "0509761417",
    Notes: "",
    Admin: false,
  });
  newUser.save();

  // console.log(Orderitem);
});
