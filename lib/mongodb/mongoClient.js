const { connect } = require("mongoose");
const { MONGO_URI } = require("../../utils/constants");

async function connectDB() {
  try {
    const conn = await connect(MONGO_URI, { useNewUrlParser: true });
    console.log(
      `Connected to the MongoDB Database : ${conn?.connection?.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
