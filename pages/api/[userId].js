import connectDB from "../../middleware/db";
import Users from "../../models/users";

const handler = async (req, res) =>{
  if(req.method == "GET"){
      const {userId} = req.query;

      try {
        const data = await Users.findById({_id:userId});
        if (data) {
          res.status(200).json(data);
        }
        else {
          res.status(500).json({ message: "Technical Error, try again later" });
        }
      } catch (error) {
        res.status(500).json({messgae:"Server Error, Please try again..."})
      }
  }
  else if(req.method == "PATCH"){

    const _id  = req.query.userId;
    const libraryData = req.body;

    try {
      const result = await Users.findByIdAndUpdate(_id, libraryData);

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