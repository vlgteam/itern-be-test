const HomeContent = require("../models/HomeContent");

const createHomeContent = async (data) => {
  return await HomeContent.create(data);
};

const getAllHomeContents = async () => {
  const getAll = await HomeContent.find();
  console.log(getAll);
  return await HomeContent.find();
};

const getHomeContentById = async (id) => {
  return await HomeContent.findById(id);
};

const updateHomeContentById = async (id, data) => {
  return await HomeContent.findByIdAndUpdate(id, data, { new: true });
};

const deleteHomeContentById = async (id) => {
  return await HomeContent.findByIdAndDelete(id);
};

module.exports = {
  createHomeContent,
  getAllHomeContents,
  getHomeContentById,
  updateHomeContentById,
  deleteHomeContentById,
};
