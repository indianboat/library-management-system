// import mongoose from "mongoose";

// let lcode = Math.floor(Math.random() * 100);

// const myListSchema = new mongoose.Schema({

//     fname: { type: String, required: true },
//     lname: { type: String },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     library_name: { type: String, default: "" },
//     library_type: { type: String, default: "" },
//     library_code: { type: String, default: `LMS${lcode}`, unique: true },
//     librarian_name: {type:String, default:""},
//     librarian_phone: {type:String, default:""},
//     library_address :{type:String, default:""}

//   },{ timestamps: true }
// );

// mongoose.models = {};

// const Users = mongoose.model("users", myListSchema);

// export default Users;