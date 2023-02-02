import connectDB from "../../../middleware/db";
import Book from "../../../models/newbookmodel";

const handler = async (req, res) => {
  if (req.method == "POST") {

    const bookInfo = req.body;

    const newBookData = {
      "bookId":bookInfo.bookId, 
      "bookGenre":bookInfo.bookGenre, 
      "bookTitle":bookInfo.bookTitle,
      "bookQuantity":bookInfo.bookQuantity,
      "authorName" : bookInfo.authorName,
      "publisherName":bookInfo.publisherName,
      "publishDate":bookInfo.publishDate,
      "totalPages":bookInfo.totalPages,
      "bookPrice":bookInfo.bookPrice
    }

    if(bookInfo.bookId == "" || bookInfo.bookTitle == "" || bookInfo.authorName == "" || bookInfo.totalPages== "" || bookInfo.bookPrice == ""){
      res.status(400).json({message :"Required fields !"});
    }

    else{
      try {
        const libExist = await Book.findOne({ library_id: bookInfo.libId });


        if(libExist==null){
          const newBook = new Book({library_id:bookInfo.libId, bookList:newBookData});
  
          const data = await newBook.save();
  
          if(data){
            res.status(201).json({message :"success"});
          }
          else {
            res.status(400).json({message :"Technical Error"});
          }
        }
        else{
          await libExist.addBook(newBookData);
          const result = await libExist.save();

          if(result){
            res.status(201).json({message :"success"});
          }
          else {
            res.status(400).json({message :"Technical Error"});
          }
        }
  
      } catch (error) {
        res.status(500).json({ messgae: "Server Error, Please try again...", err: error });
      }
    }
  }
};

export default connectDB(handler);
