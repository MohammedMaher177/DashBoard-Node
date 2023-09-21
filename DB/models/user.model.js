import { Schema, Types, model } from "mongoose";
import bcryptjs from "bcryptjs"
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minLength: 5,
      maxLength: 30,
    },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    age: Number,
    phnpone: String,
    gender: { type: String, enum: ["Male", "Female", "Not Selected"] },
    confirmEmail: { type: Boolean, default: false },
    passwordChangedAt: Date,
    role: { type: String, enum: ["User", "Admin", "Manager"], default: "User" },
    // wishList: [{ type: Types.ObjectId, ref: "product" }],
    addresses: [
      {
        address: String,
        city: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

// UserSchema.pre([/^find/, /^update/], function () {
//   this.populate("wishList", "name");
// });

UserSchema.pre(["save", /^update/, /^create/], async function () {
  const defultRound = parseInt(process.env.SALT_ROUNDS);
  if (this.password && bcryptjs.getRounds(this.password) != defultRound) {
    this.password = bcryptjs.hashSync(
      this.password,
      parseInt(process.env.SALT_ROUNDS)
    );
  }
});

const UserModel = model("User", UserSchema);

export default UserModel;
