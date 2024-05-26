import { Router, Request, Response } from "express";

// New Router instance
const router = Router();

// Home routes
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

router.get("/:id", (req: Request, res: Response) => {
  res.status(200).send({ message: `Home ${req.params.id} route!` });
});

export default router;
