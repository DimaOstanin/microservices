import express from 'express';
import { createcontainer, deletecontainer, updatecontainer, getcontainer, getAllcontainers } from '../controllers/container.controller.js';


const router = express.Router();

router.post('/create',  createcontainer);
router.delete('/delete/:id',  deletecontainer);
router.post('/update/:id', updatecontainer);
router.get('/get/:id', getcontainer);
router.get('/getAll', getAllcontainers);

export default router;
