const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, // This ensures Mongoose will create a unique index for the email field
      trim: true,
      lowercase: true, // converts email to lower case,
      trim: true, // will remove white spaces
    //   validate: {
    //     validator: (v) => {
    //       return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
    //     },
    //     message: (props) => `${props.value} is not a valid email!`,
    //   },
    validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error('Invalid email address');
        }
    }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if(!validator.isStrongPassword(value)) {
            throw new Error('Enter a Strong Password ');
        }
      }
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
      //   set: (value) => value.toLowerCase(),
    },
    photoUrl: {
      type: String,
      default: "www.example.com",
      validate(value) {
        if(!validator.isURL(value)) {
            throw new Error("photoUrl is not valid URL");
        }
      }
    },
    about: {
      type: String,
      default: "I am a cool person",
    },
    skills: {
      type: [String],
      default: "Travelling, singing",
      validate(value) {
        if (value.length > 1) {
          const map = {};

          value.forEach((skill) => {
            if (map[skill]) {
              throw new Error("Duplicate Entries");
            }

            map[skill] = skill;
          });
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
