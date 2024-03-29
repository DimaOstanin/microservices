import Container from '../models/container.model.js';
import { errorHandler } from '../utils/error.js';

export const createcontainer = async (req, res, next) => {
  try {
    const container = await Container.create(req.body);
    return res.status(201).json(container);
  } catch (error) {
    next(error);
  }
};

export const deletecontainer = async (req, res, next) => {
  const container = await Container.findById(req.params.id);

  if (!container) {
    return next(errorHandler(404, 'container not found!'));
  }

  try {
    await Container.findByIdAndDelete(req.params.id);
    res.status(200).json('container has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updatecontainer = async (req, res, next) => {
  const container = await Container.findById(req.params.id);
  if (!container) {
    return next(errorHandler(404, 'container not found!'));
  }
  
  try {
    const updatedcontainer = await Container.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedcontainer);
  } catch (error) {
    next(error);
  }
};

export const getcontainer = async (req, res, next) => {
  try {
    const container = await Container.findById(req.params.id);
    if (!container) {
      return next(errorHandler(404, 'container not found!'));
    }
    res.status(200).json(container);
  } catch (error) {
    next(error);
  }
};

export const getAllcontainers = async (req, res, next) => {
  try {
    const container = await Container.find({});
    if (!container) {
      return next(errorHandler(404, 'containers not found!'));
    }
    res.status(200).json(container);
  } catch (error) {
    next(error);
  }
};
