import connectDB from "../../middleware/db";
import UsersInfo from "../../models/userInfo";

const handler = async (req, res) => {
  if (req.method == "GET") {
    try {
      const result = await UsersInfo.find({});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "500 Internal Server Error" });
    }
  }
};

export default connectDB(handler);
