const express = require("express");

/* Internal files */
const connectDB = require("./config/database");

const app = express();

// Middleware to parse incoming JSON request body
app.use(express.json());

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  console.log("Creating a new User!!", req.body);

  // Creating a new instance of a User model
  const user = new User(req.body);

  try {
    const response = await user.save();
    console.log("Created a new User, ", response);

    res.send("User Created Successfully");
  } catch (err) {
    console.log("Error while creating user ", err);

    res.status(400).send("Error while creating error " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  const { emailId } = req.body;
  try {
    const users = await User.find({ emailId });

    if(users.length > 0) {
      res.send(users);
    } else {
      res.status(401).send("User not found");  
    }
  } catch (err) {
    console.error("Error while fetching users ", err);
    res.status(401).send("Error while fetcing users " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const { emailId } = req.body;

  try {
    const users = await User.find({ emailId });

    if(users.length > 0) {
      res.send(users);
    } else {
      res.status(401).send("User not found");  
    }
  } catch (err) {
    console.error("Error while fetching users ", err);
    res.status(401).send("Error while fetcing users " + err.message);
  }
});


// CRUD operations
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error("Error while fetching users ", err);
    res.status(401).send("Error while fetcing users " + err.message);
  }
});

app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    console.error("Error while fetching user by id ", err);
    res.status(401).send("Error while fetcing user by id " + err.message);
  }
});

app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const userObj = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, userObj, {returnDocument: "after"});
    res.send(user);
  } catch (err) {
    console.error("Error while updating users ", err);
    res.status(401).send("Error while updating users " + err.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send(user);
  } catch (err) {
    console.error("Error while deleting users ", err);
    res.status(401).send("Error while deleting users " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established..");

    app.listen(3000, () => {
      console.log("Server is listing in port 3000");
    });
  })
  .catch((e) => {
    console.error("Failed while connecting with DB: ", e);
  });
