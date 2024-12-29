const express = require('express');
const cors = require('cors');
const { PORT, FRONTEND_URL, JWT_SECRET_KEY, DB_NAME } = require('./environment/environment');
const authRouter = require('./controller/auth/authController');
const { mongoConnect } = require('./mongoConnect');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // [t] minutes
	limit: 30, // Limit each IP to [n] requests per `window` (here, per [t] minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
app.use(limiter)
if(!DB_NAME){
  throw new Error("DB_NAME must be set")
}
if(!FRONTEND_URL){
  throw new Error("FRONTEND_URL must be set")
}
if(!JWT_SECRET_KEY){
  throw new Error("JWT_SECRET_KEY must be set")
}
if (!PORT) {
  throw new Error("PORT has to be assigned as a environment variable");
}
app.use(express.json());
app.use(cors(/* {
  origin: FRONTEND_URL
} */
))
app.use(morgan(":method :url :status :date"))

app.get('/', (req, res) => {
  res.json({
    message: "Server is up and running!\n v0.0.1"
  })
})


mongoConnect();

// Routes
app.use("/api/auth", authRouter);

app.listen(parseInt(PORT), () => {
  console.log(`Server running on \n http://localhost:${PORT}`)
})