import type { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  const authToken = process.env.AUTH_TOKEN;

  if (!authToken) {
    return res.status(500).json({
      error: "Auth is not configured",
    });
  }

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== authToken) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  next();
}
