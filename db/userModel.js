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

  mentees_id: {
    type: Array,
  },

  mentor_id: {
    type: String,
  },

  interests: {
    type: Array,
  },

  academic_background: {
    type: String,
  },

  field_of_study: {
    type: Array,
  },

  profile_pic: {
    type: Picture,
  },

  work_experience: {
    type: Array,
  },

  industry_field: {
    type: Array,
  },

  description: {
    type: String,
  },

  available_time_slots: {
    type: Array,
  },

  maximum_mentees: {
    type: Integer,
  },

  booked_times: {
    type: Array,
  },

  assignments: {
    type: Array,
  },

  age: {
    type: Integer,
  },

  native_language: {
    type: String,
  },

  secondary_languages: {
    type: Array,
  },

  registration_date: {
    type: Date,
  },

  files: {
    type: Object,
  },
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
