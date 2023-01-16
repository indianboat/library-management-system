import connectDB from "../../middleware/db";
import UsersInfo from "../../models/userInfo";
import argon2id from "argon2";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { email, password } = req.body;

    try {
      const userExist = await UsersInfo.findOne({ email });

      if (!userExist) {
        res
          .status(400)
          .json({ message: "This email is not registered with us !" });
      } else {
        const matchPassword = await argon2id.verify(
          userExist.password,
          password
        );

        if (!matchPassword) {
          res.status(400).json({ message: "Invalid Credentials" });
        } else {
          const token = jwt.sign(
            { id: userExist._id, user_first_name: userExist.fname, user_last_name:userExist.lname},
            process.env.token_secret_key,
            { expiresIn: "30m" }
          );
          res.status(200).json({ message: "Login success", token });
        }
      }
    } catch (error) {
      res.status(422).json({ message: error });
    }
  }
};

export default connectDB(handler);
