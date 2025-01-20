import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// import query from "express/lib/middleware/query";
//
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect("mongodb://localhost:27017/youtube-app-1")
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log("Error", err));
// schema mongo
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

// Api

app.post("/api/users", urlencodedParser, async (req, res) => {
  const body = req.body;
  if (!body || !body.firstName || !body.lastName) {
    return res.status(400).json({ msg: "Fields not found" });
  }
  //
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    gender: body.gender,
  });
  //   console.log("result ", result);
  return res.status(400).json({ msg: "success" });
});

//
app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  res.setHeader("X-UserName", "Prashant Mestry");
  return res.status(200).json(allUsers);
});

//
app.get("/api/users", async (req, res) => {
  const _gender = req.query.gender;
  console.log("gender = ", _gender);
  //   const allUsers = await User.find({ gender: _gender });
  return res.status(200).json({ msg: "success", data: req });
});
