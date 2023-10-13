const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
  },
  apikey: {
    type: "string",
  },
  admin: {
    type: 'boolean',
    default: false,
  }
}, {
    timestamp: true,
});

 userSchema.methods.matchPassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
 }

const User =  mongoose.model("User", userSchema)

module.exports = User;