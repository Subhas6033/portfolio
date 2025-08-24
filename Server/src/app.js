import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Enable CORS for the specific origin
const allowedOrigins = [
  process.env.CORS_ORIGIN, 
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Configuration for handelling the JSON data
app.use(
  express.json({
    limit: "50kb",
  })
);

// Configuration for the URL data
app.use(
  express.urlencoded({
    limit: "100kb",
    extended: true,
  })
);

// Configure Cookies as request of the client
app.use(cookieParser());

import contactRouter from './Routes/contact.routes.js'
app.use("/api/v1", contactRouter)


export { app };