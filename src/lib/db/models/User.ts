import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: { 
    type: String, 
    required: [true, 'Email is required.'], 
    unique: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    select: false
  },
  otpExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

UserSchema.virtual('apiTokens', {
  ref: 'ApiToken',
  localField: '_id',
  foreignField: 'userId',
});

export default models.User || model('User', UserSchema);
