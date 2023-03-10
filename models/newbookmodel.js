import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
  {
    library_id: String,
    bookList: [
      {
        bookId:{ type:Number, unique:true },
        bookGenre:String,
        bookTitle: String,
        authorName: String,
        bookQuantity: Number,
        publisherName: String,
        publishDate: String,
        totalPages: Number,
        bookPrice:Number,
        bookAvailable:{type:Boolean, default:true},
        outOfStock:{type:Boolean, default:false},
      }
    ]
  },
  { timestamps: true }
);


booksSchema.methods.addBook = async function(bookData){
  try{
    this.bookList = this.bookList.concat(bookData);
    await this.save();
    return this.bookList;
  }
  catch(error){
    console.log(error);
  }
}



mongoose.models = {}; // solution -> if get error: Cannot overwrite User model once compiled. at Mongoose.model

const Book = mongoose.model("books", booksSchema);

export default Book;

// On changes in any JS file other than the models gives error: Cannot overwriteUsermodel once compiled. at Mongoose.model next js since during hot reload as there are no changes in the model file so the previously compiled one is used (cached).
// In case someone is facing such issue can fix this in following way:

// *******solution*********

// global.User = global.User || mongoose.model("User", userSchema);
// export default global.User;
