import connectDB from "../../middleware/db";
import BooksData from "../../models/books";

const handler = async (req, res) =>{
 
  if(req.method == "POST"){

    const bookData = req.body;

    const newBookData = {
      "bookId":bookData.bookId, 
      "bookGenre":bookData.bookGenre, 
      "bookTitle":bookData.bookTitle,
      "bookQuantity":bookData.bookQuantity,
      "authorName" : bookData.authorName,
      "publisherName":bookData.publisherName,
      "publishDate":bookData.publishDate,
      "totalPages":bookData.totalPages,
      "bookPrice":bookData.bookPrice
    }

    if(bookData.bookId == "" || bookData.bookTitle == "" || bookData.authorName == "" || bookData.totalPages=="" || bookData.bookPrice ==""){
      res.status(400).json({message :"Required fields !"});
    }

    else{
      try {
        const libExist = await BooksData.findOne({library_id:bookData.libId});
       
        if(libExist==null){
          console.log("if", newBookData);
          const newBook = new BooksData({library_id:bookData.libId, bookList:newBookData});
          const data = await newBook.save();

          if(data){
            res.status(201).json({message :"success"});
          }
          else {
            res.status(400).json({message :"Technical Error"});
          }
        }
        else{
          console.log("else", newBookData);
          await libExist.addBook(newBookData);
          const result = await libExist.save();
  
          if(result){
            res.status(201).json({message :"success"});
          }
          else {
            res.status(400).json({message :"Technical Error"});
          }
        }
  
      } 
      catch (error) {
        res.status(500).json({messgae:"Server Error, Please try again...", err:error})
      }
    }


  }
}

export default connectDB(handler);