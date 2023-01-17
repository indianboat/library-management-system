import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email:  { type:String, unique:true},
    password: String,
    accountActive: { type: Boolean, default: true },
    libraryInfo: {
      libraryActive: { type: Boolean, default: false },
      libraryCode:String,
      libraryName: String,
      libraryType: String,
      librarianPhone: String,
      libraryAddress: String
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
