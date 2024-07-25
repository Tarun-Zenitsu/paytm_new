const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../db/user");
const authMiddleware = require("../middleware");

dotenv.config();

const router = express.Router();

const jwt_secret = process.env.JWT_SECRET;

const signUpSchema = z.object({
  username: z
    .string()
    .email("Invalid email format")
    .min(6, "Username must be at least 6 characters")
    .max(30, "Username must be no more than 30 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(3, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
});

router.post("/signup", async (req, res) => {
  const { success, error } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Incorrect inputs",
      errors: error.errors,
    });
  }

  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({
        message: "Username already taken, please use another username",
      });
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    await user.save();

    const userId = user._id;

    const token = jwt.sign({ userId }, jwt_secret);

    res.json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const signinSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success, error } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Incorrect inputs",
      errors: error.errors,
    });
  }

  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign({ userId: user._id }, jwt_secret);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

const updateSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
});

router.put("/user", authMiddleware, async (req, res) => {
  const { success, error } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Incorrect inputs",
      errors: error.errors,
    });
  }

  try {
    await User.updateOne({ _id: req.userId }, req.body);
    res.status(200).json({
      message: "User data updated successfully",
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
