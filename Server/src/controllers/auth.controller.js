const authService = require("../services/auth.services");
const asyncHandler = require("../utils/async.handler.util");
const HttpStatusCodes = require("../config/http.status.config");

const createUser = asyncHandler(async (req, res) => {
  const userData = req.body;
  try {
    const user = await authService.createUser(userData);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.loginUser(email, password);

  res.cookie("refreshToken", token.refreshToken, {
    httpOnly: true, // Prevents access via JavaScript
    secure: true, // Ensures cookies are sent over HTTPS
    sameSite: "Strict", // Prevents cross-site request forgery
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie lifespan (1 week)
  });

  res.cookie("accessToken", token.accessToken, {
    httpOnly: false,
    secure: false,
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000, // Cookie lifespan (1 hour)
  });

  return res.status(HttpStatusCodes.OK.code).json({
    success: true,
    message: "Login successfully",
    data: {
      user: {
        id: token.user._id,
        email: token.user.email,
        role: token.user.role,
      },
    },
  });
});

module.exports = {
  createUser,
  loginUser,
};
