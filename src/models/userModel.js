const mongoose=require("mongoose");
const validator=require("validator")

const{Schema, model}=mongoose;

const userSchema = new Schema({
  gmail: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: v => validator.isEmail(v),
      message: props => `${props.value} is not a valid mail!`,
    }
  },
  otp: String,
  otpExpire: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);