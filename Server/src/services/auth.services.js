const authRepository = require("../repositories/auth.repo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshTokenRepository = require("../repositories/refresh.token.repo");
const {
  BadRequestError,
  BadRequest,
  NotFoundError,
} = require("../config/error.response.config");
const createUser = async (userData) => {
  try {
    const saltRounds = 10;
    const handlePassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = handlePassword;
    const user = await authRepository.createUser(userData);
    console.log("userData trước khi gọi repo:", userData);
    return user;
  } catch (error) {
    throw new BadRequestError("Error creating user: " + error.message);
  }
};
const loginUser = async (email, password) => {
  const user = await authRepository.findUser({ email });

  if (!user) {
    throw new BadRequest("Invalid email or password.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new BadRequest("Invalid email or password.");
  }

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

  // ✅ Dùng đúng biến tên "refreshTokenRepository"
  await refreshTokenRepository.revokeRefreshToken({ userId: user._id });

  const savedRefreshToken = await refreshTokenRepository.createRefreshToken({
    userId: user._id,
    userType: "Admin",
    refreshToken,
  });

  return {
    accessToken,
    refreshToken: savedRefreshToken.refreshToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  createUser,
  loginUser,
};
