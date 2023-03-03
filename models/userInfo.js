import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email:  { type:String, unique:true, },
    password: String,
    accountActive: { type: Boolean, default: true },
    libraryInfo: {
      libraryActive: { type: Boolean, default: false },
      libraryId:String,
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
    },
    usersList:[
      {
        userType:String,
        userIdProof:String,
        userIdNumber:String,
        userFullName:String,
        userEmailId:String,
        userMobilePhone:String,
        userAddress:String,
        userCourseName:String,
        userClassName:String,
        userEducation:String,
        userSchoolName:String,
        userSchoolStandard:String,
        userCollegeName:String,
        userGender:String,
        userDOB:Date,
        userBatch:String,
        userGender:String,
        userSection:String,
        userNumOfIssued:{type:Number, default:0}
      }
    ]
  },
  { timestamps: true }
);



userSchema.methods.addUser = async function(userData){
  try{
    this.usersList = this.usersList.concat(userData);
    await this.save();
    return this.usersList;
  }
  catch(error){
    console.log(error);
  }
}


mongoose.models = {};
const UsersInfo = mongoose.model("usersinfo", userSchema);

export default UsersInfo;
