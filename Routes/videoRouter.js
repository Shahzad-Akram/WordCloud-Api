import express from 'express';
import video from '../Controllers/comment';

const videoRouter = express.Router();

// @ /video/[currentroute]

videoRouter.post('/', video.createComment);

videoRouter.get('/:id', video.getWordCloudByVideoID);
export default videoRouter;
