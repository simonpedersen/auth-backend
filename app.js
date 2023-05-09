const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const auth = require("./auth");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data

      if (request.body.role == "mentee") {
        mentor = false;
      } else {
        mentor = true;
      }

      const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
        mentor: mentor,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.put("/update-user-info", (request, response) => {
  // find the user by ID
  User.findById(request.body.id)
    .then((user) => {
      if (!user) {
        console.log(req.body.id);
        return response.status(404).send({
          message: "User not found",
        });
      }

      // update the user
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      if (req.body.mentor !== undefined) {
        user.mentor = req.body.mentor;
      }
      if (req.body.form_succeded !== undefined) {
        user.form_succeded = req.body.form_succeded;
      }
      if (req.body.mentees_id) {
        user.mentees_id = req.body.mentees_id;
      }
      if (req.body.mentor_id) {
        user.mentor_id = req.body.mentor_id;
      }
      if (req.body.interestsArray) {
        user.interests = req.body.interestsArray;
      }
      if (
        req.body.experienceObject &&
        req.body.experienceObject.academicExperience
      ) {
        user.academic_level = req.body.experienceObject.academicExperience;
      }
      if (req.body.academicArray) {
        user.academic_experiences = req.body.academicArray;
      }
      if (
        req.body.personalInfoObject &&
        req.body.personalInfoObject.profilePicture
      ) {
        user.profile_pic = req.body.personalInfoObject.profilePicture;
      }
      if (req.body.professionalArray) {
        user.work_experience = req.body.professionalArray;
      }
      if (req.body.experienceObject && req.body.experienceObject.description) {
        user.personal_description = req.body.experienceObject.description;
      }
      if (req.body.available_time_slots) {
        user.available_time_slots = req.body.available_time_slots;
      }
      if (req.body.maximum_mentees) {
        user.maximum_mentees = req.body.maximum_mentees;
      }
      if (req.body.booked_times) {
        user.booked_times = req.body.booked_times;
      }
      if (req.body.assignments) {
        user.assignments = req.body.assignments;
      }
      if (req.body.personalInfoObject && req.body.personalInfoObject.age) {
        user.age = req.body.personalInfoObject.age;
      }
      if (eq.body.experienceObject && req.body.experienceObject.languages) {
        user.languages = req.bodyreq.body.experienceObject.languages;
      }
      if (req.body.files) {
        user.files = req.body.files;
      }
      if (
        req.body.personalInfoObject &&
        req.body.personalInfoObject.phoneNumber
      ) {
        user.phone_number = req.body.personalInfoObject.phoneNumber;
      }
      if (req.body.personalInfoObject && req.body.personalInfoObject.address) {
        user.address = req.body.personalInfoObject.address;
      }
      if (req.body.personalInfoObject && req.body.personalInfoObject.city) {
        user.city = req.body.personalInfoObject.city;
      }
      if (req.body.personalInfoObject && req.body.personalInfoObject.zipCode) {
        user.postal_code = req.body.personalInfoObject.zipCode;
      }
      if (req.body.personalInfoObject && req.body.personalInfoObject.gender) {
        user.gender = req.body.personalInfoObject.gender;
      }
      user.form_succeded = true;

      // save the updated user
      user
        .save()
        // return success if the user is updated in the database successfully
        .then((result) => {
          response.status(200).send({
            message: "User updated successfully",
            result,
          });
        })
        // catch error if the user wasn't updated successfully in the database
        .catch((error) => {
          response.status(500).send({
            message: "Error updating user",
            error,
          });
        });
    })
    // catch error if the user isn't found in the database
    .catch((error) => {
      response.status(500).send({
        message: "Error finding user",
        error,
      });
    });
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userName: user.name,
              userEmail: user.email,
              userMentor: user.mentor,
              isSignedUp: user.form_succeded,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            name: user.name,
            token: token,
          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  console.log("Access succeded");
  response.send({ message: "You are authorized to access me" });
});

// Route for getting a single user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route for getting all mentor users
app.get("/mentors", async (req, res) => {
  try {
    const mentors = await User.find({ mentor: true });
    res.status(200).json(mentors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route for getting all mentees with specific mentor
app.get("/mentees/:id", async (req, res) => {
  try {
    const user = await User.find({ mentor_id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = app;
