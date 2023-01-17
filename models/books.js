import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    library_id: String,
    bookData: [
      {
        bookId: { type: String, unique: true },
        bookTitle: String,
        authorName: String,
        publisherName: String,
        publishDate: String,
        totalPages: Number,
        edition: { type: String, default: "" },
        rating: Number,
        summary: String,
      },
    ],
  },
  { timestamps: true }
);

mongoose.models = {}; // solution -> if get error: Cannot overwrite User model once compiled. at Mongoose.model

const BooksData = mongoose.model("booksdata", bookSchema);

export default BooksData;

// On changes in any JS file other than the models gives error: Cannot overwriteUsermodel once compiled. at Mongoose.model next js since during hot reload as there are no changes in the model file so the previously compiled one is used (cached).
// In case someone is facing such issue can fix this in following way:

// *******solution*********

// global.User = global.User || mongoose.model("User", userSchema);
// export default global.User;
