import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

 export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createAt: Date;
  lastUpdateAt: Date;
  isValidPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdateAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model<IUser>("user", userSchema);

export default UserModel;
