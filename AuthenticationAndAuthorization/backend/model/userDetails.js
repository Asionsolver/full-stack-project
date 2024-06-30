const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
    {
        uname: String,
        email: String,
        phoneNo: String,
    },{
        collection: "userInfo"
    }
);

mongoose.model("userInfo", userDetailsSchema);

