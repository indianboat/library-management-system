import connectDB from "../../middleware/db";
import Users from "../../models/users";
import validator from 'validator';
import argon2id from 'argon2';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if(req.method == 'POST'){

    const { email, password } = req.body;

    if(!email){
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

        if(!userExist){
          res.status(400).json({message:"This email is not registered with us !"})
        }
        else{
          const matchPassword = await argon2id.verify(userExist.password, password);

          if(!matchPassword){
            res.status(400).json({message:"Invalid Credentials"});
          }
          else{
            const token = jwt.sign({ id: userExist._id}, process.env.token_secret_key, {expiresIn:"30m"});
            res.status(200).json({ message: "Login success", token });
          }
        }

      } catch (error) {
        res.status(422).json({ message: error });
      }
    }
  }
}

export default connectDB(handler);