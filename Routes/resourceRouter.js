import express from 'express';
import resource from '../Controllers/createResource';
import comment from '../Controllers/comment';

const resourceRouter = express.Router();

// @ /resource/[currentroute]

resourceRouter.post('/create', resource.createResource);

resourceRouter.get('/', resource.getAllResources);

resourceRouter.post('/comment', comment.createComment);

resourceRouter.get('/:id', resource.getSingleResourceById);

export default resourceRouter;
