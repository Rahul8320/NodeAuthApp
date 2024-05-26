import { Router } from "express";
import homeRouter from "./home.routes";
import usersRouter from "./users.routes";

// Create a new Router instance
const router = Router();

// Mount the routers
// health-check route
router.get("/health-check", (_, res) => {
  try {
    res.status(200).json({ message: "Api helath is Good." });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Oops! Something went wrong on your api!" });
  }
});

router.use("/home", homeRouter);
router.use("/users", usersRouter);

export default router;
