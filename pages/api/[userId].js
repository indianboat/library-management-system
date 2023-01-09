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
}

export default connectDB(handler);