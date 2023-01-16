import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true, required: true },
    password: String,
    accountActive: { type: Boolean, default: true },
    libraryInfo: {
      libraryActive: { type: Boolean, default: false },
      library_code: { type: String, default: "", unique: true },
      library_name: { type: String, default: "" },
      library_type: { type: String, default: "" },
      librarian_phone: { type: String, default: "" },
      library_address: { type: String, default: "" },
    },
    booksInfo:{
      totalBooks:{type:Number, default:0},
      issuedBooks:{type:Number, default:0},
      returnedBooks:{type:Number, default:0},
      availableBooks:{type:Number, default:0},
    }
  },
  { timestamps: true }
);

mongoose.models = {};
const UsersInfo = mongoose.model("usersinfo", userSchema);

export default UsersInfo;
