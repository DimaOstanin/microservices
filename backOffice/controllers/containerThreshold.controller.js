import ContainerThreshold from '../models/ontainerThreshold.model.js';
import { errorHandler } from '../utils/error.js';

export const createContainerThreshold = async (req, res, next) => {
  try {
    const containerThreshold = await ContainerThreshold.create(req.body);
    return res.status(201).json(containerThreshold);
  } catch (error) {
    next(error);
  }containerThreshold
};

export const deleteContainerThreshold = async (req, res, next) => {
  const containerThreshold = await ContainerThreshold.findById(req.params.id);

  if (!containerThreshold) {
    return next(errorHandler(404, 'ContainerThreshold not found!'));
  }

  try {
    await ContainerThreshold.findByIdAndDelete(req.params.id);
    res.status(200).json('ContainerThreshold has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateContainerThreshold = async (req, res, next) => {
  const containerThreshold = await ContainerThreshold.findById(req.params.id);
  if (!containerThreshold) {
    return next(errorHandler(404, 'ContainerThreshold not found!'));
  }
  
  try {
    const updatedContainerThreshold = await ContainerThreshold.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContainerThreshold);
  } catch (error) {
    next(error);
  }
};

export const getContainerThreshold = async (req, res, next) => {
  try {
    const containerThreshold = await ContainerThreshold.findById(req.params.id);
    if (!containerThreshold) {
      return next(errorHandler(404, 'ContainerThreshold not found!'));
    }
    res.status(200).json(containerThreshold);
  } catch (error) {
    next(error);
  }
};

export const getAllContainerThresholds = async (req, res, next) => {
  try {
    const containerThreshold = await ContainerThreshold.find({});
    if (!containerThreshold) {
      return next(errorHandler(404, 'ContainerThresholds not found!'));
    }
    res.status(200).json(containerThreshold);
  } catch (error) {
    next(error);
  }
};
