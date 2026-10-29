import jwt from "jsonwebtoken";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const ADMIN_EMAIL = "admin@domrealty.com";
  const ADMIN_PASSWORD = "admin123";

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: "admin001",
      role: "admin",
    },
    process.env.JWT_SECRET || "domrealtysecret",
    { expiresIn: "7d" }
  );

  res.status(200).json({
    success: true,
    token,
    user: {
      name: "DOM Realty Admin",
      email: ADMIN_EMAIL,
    },
  });
};