const mongoose=require("mongoose");
const validator=require("validator")

const{Schema, model}=mongoose;

const userSchema = new Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: v => /^[6-9]\d{9}$/.test(v),
      message: props => `${props.value} is not a valid Indian number!`,
    }
  },
  otp: String,
  otpExpire: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);