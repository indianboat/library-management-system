import connectDB from "../../../middleware/db";
import Book from "../../../models/newbookmodel";
import UsersInfo from "../../../models/userInfo";

const handler = async (req, res) => {
  if (req.method == "GET") {
    const library_id = req.query.bid[0];
    const bid = req.query.bid[1];
    const newData = [];

    try {
      const data = await Book.findOne({ library_id });

      for (let i = 0; i < data.bookList.length; i++) {
        const element = data.bookList[i];
        if (element.bookId == bid) {
          newData.push(element);
        }
      }

      if (newData.length > 0) {
        res.status(200).json(newData);
      } else if (newData.length === 0) {
        res.status(400).json({ message: "Book not found" });
      }
      else {
        res.status(400).json({ message: "Technical Error, Please try again..." });    
      }      
    } catch (error) {
      res.status(500).json({ messgae: "Server Error, Please try again..." });
    }
  } else if (req.method === "PATCH") {
    const library_id = req.query.bid[0];
    const userIdNum = req.query.bid[1];
    const userIndex = req.query.bid[2];
    const bid = req.query.bid[3];
    const { issuedDate, returnDate } = req.body;
    let bookQuantity;
    let numOfIssued;

    try {

      (await Book.findOne({ library_id })).bookList.map((item)=> {
        if(item.bookId == bid){
          bookQuantity = item.bookQuantity;
        }
      });

      await Book.findOneAndUpdate({library_id, "bookList.bookId":bid}, { "bookList.$.bookQuantity": bookQuantity > 0 ? bookQuantity-1 : 0 });

      (await UsersInfo.findOne({"libraryInfo.libraryId":library_id})).usersList.map((item)=>{
        if(item.userIdNumber == userIdNum){
          numOfIssued = item.numOfIssued;
        }
      })



      await UsersInfo.findOneAndUpdate({"libraryInfo.libraryId":library_id, "usersList.userIdNumber":userIdNum }, {"usersList.$.numOfIssued": numOfIssued >= 0 ? numOfIssued+1 : numOfIssued  })
      const userData = await UsersInfo.findOne({ "libraryInfo.libraryId": library_id });
      await userData.addBookId({ bookId: bid, issuedDate, returnDate }, userIndex );
      const result = await userData.save();

      if (result) {
        res.status(201).json({ message: "Saved" });
      } else {
        res.status(400).json({ message: "Technical Error" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default connectDB(handler);
