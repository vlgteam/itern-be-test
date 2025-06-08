const homeRepo = require("../repositories/homeContent.repo");

const create = async (data) => {
  return await homeRepo.createHomeContent(data);
};

const getAll = async () => {
  return await homeRepo.getAllHomeContents();
};

const getById = async (id) => {
  return await homeRepo.getHomeContentById(id);
};

const updateById = async (id, data) => {
  return await homeRepo.updateHomeContentById(id, data);
};

const deleteById = async (id) => {
  return await homeRepo.deleteHomeContentById(id);
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
