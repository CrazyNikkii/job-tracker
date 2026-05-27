import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { password } = req.body;

  const adminPassword = process.env.ADMIN_PASSWORD;
  const authToken = process.env.AUTH_TOKEN;

  if (!adminPassword || !authToken) {
    return res.status(500).json({
      error: "Auth is not configured",
    });
  }

  if (typeof password !== "string" || password !== adminPassword) {
    return res.status(401).json({
      error: "Invalid password",
    });
  }

  return res.json({
    token: authToken,
  });
});

export default router;
