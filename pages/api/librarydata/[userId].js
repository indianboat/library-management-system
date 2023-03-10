import connectDB from "../../../middleware/db";
import UsersInfo from "../../../models/userInfo";
import Book from "../../../models/newbookmodel";


const handler = async (req, res) =>{
  if(req.method == "PATCH"){

    const _id  = req.query.userId;
    const { newLibId } = req.body;

    try {
      const result = await UsersInfo.findByIdAndUpdate(_id, {"libraryInfo.libraryId":newLibId});

      if(result){
        res.status(201).json({message :"Data Saved Successfully"});        
      }
      else {
        res.status(400).json({message :"Technical Error"});
      }      
    } catch (error) {
      res.status(500).json({messgae:"Server Error, Please try again..."}) 
    }

  }
  else if(req.method == "GET"){
    const library_id  = req.query.userId;

    try {
      const data = await Book.findOne({library_id});

      if(data){
        res.status(201).json(data);        
      }
      else {
        res.status(400).json({message :"Technical Error"});
      }      

    } catch (error) {
      res.status(500).json({messgae:"Server Error, Please try again..."}) 
    }

  }
}

export default connectDB(handler);