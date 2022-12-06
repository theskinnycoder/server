const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { NODE_ENV, PORT, IS_PROD, COOKIE_SECRET } = require("./utils/constants")
const connectDB = require("./lib/mongodb/mongoClient")
const { notFound, errorCheck } = require("./middleware/error.middleware")

;(async () => {
  await connectDB()

  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
      ],
    }),
  )
  app.use(express.json())
  app.use(
    cookieParser(COOKIE_SECRET, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }),
  )
  if (!IS_PROD) {
    app.use(require("morgan")("dev"))
  }

  app.use("/api/blogs", require("./routes/blogs.routes"))
  app.use("/api/auth", require("./routes/auth.routes"))

  app.use(notFound)
  app.use(errorCheck)

  app.listen(PORT, () => {
    console.log(
      `Server is up & running in ${NODE_ENV} mode & is listening for requets at http://127.0.0.1:${PORT}`,
    )
  })
})()
