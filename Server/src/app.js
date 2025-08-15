import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Enable CORS for the specific origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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

// Serve Static file
app.use(express.static("public"));

// Configure Cookies as request of the client
app.use(cookieParser());

import contactRouter from './Routes/contact.routes.js'
app.use("/api/v1", contactRouter)


export { app };
