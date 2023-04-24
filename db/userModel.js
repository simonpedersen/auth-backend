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
    type: [Number],
  },

  mentor_id: {
    type: String,
  },

  interests: {
    type: [String],
  },

  academic_background: {
    type: String,
  },

  field_of_study: {
    type: [String],
  },

  profile_pic: {
    type: String,
  },

  work_experience: {
    type: [String],
  },

  industry_field: {
    type: [String],
  },

  description: {
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
    type: [String],
  },

  age: {
    type: Number,
  },

  native_language: {
    type: String,
  },

  secondary_languages: {
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
});

// export UserSchema
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
