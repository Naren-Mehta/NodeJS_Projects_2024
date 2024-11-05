const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
/* Internal files */
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");

const app = express();

// Middleware to parse incoming JSON request body
app.use(express.json());
app.use(cookieParser());

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  console.log("Creating a new User!!", req.body);

  try {
    // Validation of data
    validateSignUpData(req);

    // Encrypt the password
    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      photoUrl,
      about,
      skills,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of a User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      photoUrl,
      about,
      skills,
    });

    const response = await user.save();
    console.log("Created a new User, ", response);

    res.send("User Created Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  // Check if password matches
  if (!emailId || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT token
      const token = await jwt.sign({ _id: user.id }, "DEV@Tinder$1140", {
        expiresIn: '10m'
      });

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);

      return res.status(200).send("Login Successfull!");
    }

    return res.status(400).json({ message: "Invalid credentials!" });
  } catch (err) {
    return res.status(400).send("ERROR " + err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    return res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/sendConnectionRequest", userAuth, (req, res) => {
  const { user } = req;
  console.log("Sending a connection request");

  res.send(user.firstName + " sent the connection request!");
});



app.get("/feed", async (req, res) => {
  const { emailId } = req.body;
  try {
    const users = await User.find({ emailId });

    if (users.length > 0) {
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

    if (users.length > 0) {
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
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(user);
  } catch (err) {
    console.error("Error while updating users: ", err);
    res.status(401).send("Error while updating users: " + err.message);
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
