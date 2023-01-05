import connectDB from "../../middleware/db";
import Users from "../../models/users";
import validator from 'validator';
import argon2id from 'argon2';

const handler = async (req, res) => {
  if(req.method == 'POST'){

    const { fname, lname, email, password } = req.body;

    if(!fname){
      res.status(400).json({message:"Required first name !"})
    }
    else if(!email){
      res.status(400).json({message:"Required email !"})
    }
    else if(!password){
      res.status(400).json({message:"Required password !"})
    }
    else if(!validator.isEmail(email)){
      res.status(400).json({message:"Email id invalid !"})
    }


    else {
      try {
        const userExist = await Users.findOne({ email });

        if(userExist){
          res.status(400).json({message:"User already exists !"})
        }
        else{
          const passHash = await argon2id.hash(password);
          const result = new Users({fname, lname, email, password:passHash});
          const data = await result.save();

          if(data){
            res.status(201).json({ message: "Sign up Success" });
          }
          else{
            res.status(500).json({ message: "Server Error, try again later" });
          }
        }

      } catch (error) {
        res.status(422).json({ message: error });
      }
    }
  }
}

export default connectDB(handler);