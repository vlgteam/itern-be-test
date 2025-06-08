const asyncHandler = require("../utils/async.handler.util");
const homeService = require("../services/homeContent.service");
const HttpStatusCodes = require("../config/http.status.config");

const createHomeContent = asyncHandler(async (req, res) => {
  const { name, link } = req.body;
  const filename = req.file?.filename;
  const imageUrl = filename
    ? `${req.protocol}://${req.get("host")}/public/uploads/${filename}`
    : null;

  const content = await homeService.create({
    name,
    link,
    imageUrls: imageUrl,
  });

  res.status(HttpStatusCodes.CREATED.code).json({
    message: "Home content created successfully",
    content,
  });
});

const getAllHomeContents = asyncHandler(async (req, res) => {
  const contents = await homeService.getAll();
  res.status(HttpStatusCodes.OK.code).json({
    contents,
  });
});

const getHomeContentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const content = await homeService.getById(id);
  res.status(HttpStatusCodes.OK.code).json({
    message: `Fetched home content with ID: ${id}`,
    content,
  });
});

const updateHomeContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;

  const filename = req.file?.filename;
  const imageUrl = filename
    ? `${req.protocol}://${req.get("host")}/public/uploads/${filename}`
    : undefined; // không cập nhật nếu không có ảnh mới

  const updatedData = {
    name,
    link,
    ...(imageUrl && { imageUrls: imageUrl }),
  };

  const updated = await homeService.updateById(id, updatedData);

  res.status(HttpStatusCodes.OK.code).json({
    message: `Updated home content with ID: ${id}`,
    updated,
  });
});

const deleteHomeContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await homeService.deleteById(id);
  res.status(HttpStatusCodes.OK.code).json({
    message: `Deleted home content with ID: ${id}`,
    deleted,
  });
});

module.exports = {
  createHomeContent,
  getAllHomeContents,
  getHomeContentById,
  updateHomeContent,
  deleteHomeContent,
};
