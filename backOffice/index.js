import  express  from 'express';
import  containerRouter from './routes/container.route.js'
import  mongoose  from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });


  app.use('/api/container', containerRouter);





  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
  

app.listen(process.env.PORT , () => {
  console.log(`Back Office is running on port ${process.env.PORT}`);
});