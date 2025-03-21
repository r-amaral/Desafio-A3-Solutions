import { Request, Response, NextFunction } from "express";
import { validateCpf } from "../utils/validate";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["token"] as string;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token missing." });
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");

    if (!validateCpf(decoded)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
