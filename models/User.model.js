const { model, Schema } = require("mongoose");
const { hashPassword, verifyPassword } = require("../lib/argon2");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

UserSchema.methods.verifyPassword = async function (plainPassword) {
  return await verifyPassword(plainPassword, this.password);
};

module.exports = model("User", UserSchema);
