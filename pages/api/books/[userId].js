import connectDB from "../../../middleware/db";
import UsersInfo from "../../../models/userInfo";


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
}

export default connectDB(handler);