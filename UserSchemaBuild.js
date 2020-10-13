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
    FullName: String,
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

  const newUser1 = new User({
    UserName: "moshe212@gmail.com",
    Password: 123456,
    LastNmme: "Ansbacher",
    FirstName: "Moshe",
    FullName: "Moshe Ansbacher",
    Title: "",
    BirthDate: "",
    HireDate: Date.now(),
    Address: "hagefen 3",
    City: "Hashmonaim",
    Region: "",
    PostalCode: "",
    HomePhone: "089761418",
    CellPhone: "0523587990",
    Notes: "",
    Admin: true,
  });
  newUser1.save();

  const newUser2 = new User({
    UserName: "David@gmail.com",
    Password: 123456789,
    LastNmme: "Cohen",
    FirstName: "David",
    FullName: "David Cohen",
    Title: "",
    BirthDate: "",
    HireDate: Date.now(),
    Address: "hagefen 7",
    City: "Hashmonaim",
    Region: "",
    PostalCode: "",
    HomePhone: "089761419",
    CellPhone: "0523568528",
    Notes: "",
    Admin: false,
  });
  newUser2.save();

  const newUser3 = new User({
    UserName: "Dany@gmail.com",
    Password: 123,
    LastNmme: "נסים",
    FirstName: "דני",
    FullName: "דני נסים",
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
  newUser3.save();

  // console.log(Orderitem);
});
