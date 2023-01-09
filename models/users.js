import mongoose from "mongoose";

let lcode = Math.floor(Math.random() * 100);

const myListSchema = new mongoose.Schema({

    fname: { type: String, required: true },
    lname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    library_name: { type: String, default: "" },
    library_code: { type: String, default: `LMS${lcode}`, unique: true },
    school_name: { type: String , default:""},
    university_name: { type: String, default:"" },
    librarian_name: {type:String, default:""},
    librarian_phone: {type:String, default:""}



  },{ timestamps: true }
);

mongoose.models = {}; // solution -> if get error: Cannot overwrite User model once compiled. at Mongoose.model

const Users = mongoose.model("users", myListSchema);

export default Users;

// On changes in any JS file other than the models gives error: Cannot overwriteUsermodel once compiled. at Mongoose.model next js since during hot reload as there are no changes in the model file so the previously compiled one is used (cached).
// In case someone is facing such issue can fix this in following way:

// *******solution*********

// global.User = global.User || mongoose.model("User", userSchema);
// export default global.User;
