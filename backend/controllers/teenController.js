const teenService = require('../services/teenService');
const { successResponse } = require('../utils/response');

const getModules = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const modules = await teenService.getModules(userId);
    return successResponse(res, modules, 'Modules retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const getModuleById = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const moduleItem = await teenService.getModuleById(req.params.id, userId);
    return successResponse(res, moduleItem, 'Module details retrieved');
  } catch (err) {
    next(err);
  }
};

const getProgress = async (req, res, next) => {
  try {
    const progress = await teenService.getProgress(req.user.id);
    return successResponse(res, progress, 'Progress retrieved successfully');
  } catch (err) {
    next(err);
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const result = await teenService.updateProgress(req.user.id, req.body);
    return successResponse(res, result, 'Progress updated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getModules,
  getModuleById,
  getProgress,
  updateProgress,
};
