import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    library_id: String,
    bookList: [
      {
        bookId:Number,
        bookGenre:String,
        bookTitle: String,
        authorName: String,
        bookQuantity: Number,
        publisherName: String,
        publishDate: String,
        totalPages: Number,
        bookPrice:Number
      }
    ]
  },
  { timestamps: true }
);



bookSchema.methods.addBook = async function(bookData){
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

const BooksData = mongoose.model("booksdata", bookSchema);

export default BooksData;

// On changes in any JS file other than the models gives error: Cannot overwriteUsermodel once compiled. at Mongoose.model next js since during hot reload as there are no changes in the model file so the previously compiled one is used (cached).
// In case someone is facing such issue can fix this in following way:

// *******solution*********

// global.User = global.User || mongoose.model("User", userSchema);
// export default global.User;
