import { Request, Response, NextFunction } from "express";
import { validateCpf } from "../utils/validate";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["token"] as string;

  if (!token) {
    res.status(401).json({ message: "Unauthorized. Token missing." });
    return;
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");

    if (validateCpf(decoded)) {
      return next();
    }

    res.status(403).json({ message: "Forbidden" });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
