const mongoose = require("mongoose");

// user schema
const UserSchema = new mongoose.Schema({
  // name field
  name: {
    type: String,
    required: [true, "Please provide an name!"],
    unique: false,
  },
  // email field
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  //   password field
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  // role field
  mentor: {
    type: Boolean,
    required: [true, "Please provide a role"],
  },

  form_succeded: {
    type: Boolean,
    default: false,
  },

  mentees_id: {
    type: [String],
  },

  mentor_id: {
    type: String,
  },

  interests: {
    type: [{}],
  },

  academic_level: {
    type: String,
  },

  academic_experiences: {
    type: [{}],
  },

  profile_pic: {
    type: String,
  },

  work_experience: {
    type: [{}],
  },

  personal_description: {
    type: String,
  },

  available_time_slots: {
    type: [Date],
  },

  maximum_mentees: {
    type: Number,
  },

  booked_times: {
    type: [Date],
  },

  assignments: {
    type: [{}],
  },

  age: {
    type: Number,
  },

  languages: {
    type: [String],
  },

  registration_date: {
    type: Date,
    default: Date.now,
  },

  files: {
    type: Map,
    of: String,
  },

  phone_number: {
    type: String,
  },

  address: {
    type: String,
  },

  city: {
    type: String,
  },

  postal_code: {
    type: String,
  },

  gender: {
    type: String,
  },

  main_goal: {
    type: String,
  },

  goals: {
    type: [String],
  },
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
