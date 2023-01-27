import connectDB from "../../../middleware/db";
import UsersInfo from "../../../models/userInfo";


const handler = async (req, res) =>{
 
  if(req.method == "POST"){

    const _id  = req.query.id;
    const userAddData = req.body;

    if(userAddData.userIdNumber == "" || userAddData.userFullName == "" || userAddData.userEducation == "" || userAddData.userClassName == "" || userAddData.userCourseName == ""){
      res.status(400).json({message :"Required fields !"});
    }

    else{
      try {
        const userExist = await UsersInfo.findById({_id});
        
        if(userExist){
          await userExist.addUser(userAddData);
          const result = await userExist.save();
  
          if(result){
            res.status(201).json({message :"Data Saved Successfully"});
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