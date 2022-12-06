const { model, Schema } = require("mongoose")

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    timeToRead: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

module.exports = model("Blog", BlogSchema)
