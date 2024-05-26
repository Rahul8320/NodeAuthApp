import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dotenv from "dotenv";
import router from "./routes";

// intialize env values
dotenv.config();

// Create Express server
const app = express(); // New express instance
const port = process.env.PORT; // Port number

// Express configuration
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morgan
app.use(express.json()); // Enable json body parser

// Add routers
app.use("/api", router);

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Express app
export default app;
