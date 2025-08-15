/*import express from "express";
import "dotenv/config";
import morgan from "morgan";
import authRoute from "./routers/authRoute.js";
import { connectDb } from "./config/DbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import complaintRoute from "./routers/complaintRoute.js";
import fileupload from "express-fileupload";
import createSessionStore from "./utils/sessionStore.js";
import configureSession from "./config/sessionConfig.js";
import { GoogleAuth } from "./config/goggleauth.js";
import { frontendDomain, serverIp } from "./constants.js";
import cors from "cors";
const store = createSessionStore();
const app = express();
app.use(
  cors({
    origin: frontendDomain, // Specify the exact origin
    credentials: true, // Allows cookies and credentials
  }),
);
const PORT = process.env.PORT || 3000;
connectDb();
GoogleAuth();
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(cookieParser());
configureSession(app, store);
app.use(passport.initialize());
app.use(passport.session());
app.get("/health", (req, res) => {
  res.status(201).json({ message: "health is ok!" });
});
app.use("/grievance/auth", authRoute);
app.use("/grievance", complaintRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, serverIp, () => {
  console.log(`Server started on http://${serverIp}:${PORT}`);
});
*/
import express from "express";
import "dotenv/config";
import morgan from "morgan";
import authRoute from "./routers/authRoute.js";
import { connectDb } from "./config/DbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import complaintRoute from "./routers/complaintRoute.js";
import fileupload from "express-fileupload";
import createSessionStore from "./utils/sessionStore.js";
import configureSession from "./config/sessionConfig.js";
import { GoogleAuth } from "./config/goggleauth.js";
import { frontendDomain } from "./constants.js"; // Keep this in .env or constants.js
import cors from "cors";

// Create express app
const app = express();
const store = createSessionStore();

// ✅ Allow CORS for frontend (Vercel URL)
app.use(
  cors({
    origin: frontendDomain || "https://complaint-portal-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Connect to DB
connectDb();

// ✅ Initialize Google Auth
GoogleAuth();

// ✅ File uploads
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1); // for secure cookies on Render
app.use(cookieParser());

// ✅ Session & Passport
configureSession(app, store);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "health is ok!" });
});

// ✅ Routes
app.use("/grievance/auth", authRoute);
app.use("/grievance", complaintRoute);

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

// ✅ Start server (Render uses process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server started on port ${PORT}`);
});


