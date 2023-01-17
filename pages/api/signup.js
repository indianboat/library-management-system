import connectDB from "../../middleware/db";
import UsersInfo from "../../models/userInfo";
import argon2id from "argon2";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { fname, lname, email, password } = req.body;

    try {
      const userExist = await UsersInfo.findOne({ email });

      if (userExist) {
        res.status(400).json({ message: "User already exists !" });
      } else {
        const passHash = await argon2id.hash(password);
        const result = new UsersInfo({ fname, lname, email, password: passHash });
        const data = await result.save();

        if (data) {
          res.status(201).json({ message: "Sign up Success" });
          console.log(data);
        } else {
          res.status(500).json({ message: "Server Error, try again later" });
          console.log(data);
        }
      }
    } catch (error) {
      res.status(422).json({ message: error });
      console.log(error);
    }
  }
};

export default connectDB(handler);
