import express from 'express';
import cors from 'cors';
import status from 'http-status';
import morgan from 'morgan';
import dbConnection from './Connection/dbConnect';
import resourceRouter from './Routes/resourceRouter';

dbConnection();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(status.OK).send({ Message: 'Connected', status: status.OK });
});

app.use('/resource', resourceRouter);

app.get('*', (req, res) => {
  res.status(status.BAD_REQUEST).send({
    Message: status['400_MESSAGE'],
    status: status['400_NAME']
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App listening On port http://localhost:${port}`)
);
