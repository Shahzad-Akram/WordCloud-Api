import express from 'express';
import resource from '../Controllers/createResource';
import comment from '../Controllers/comment';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const resourceRouter = express.Router();

// @ /resource/[currentroute]

resourceRouter.post(
  '/create',
  upload.single('resourceImg'),
  resource.createResource
);

resourceRouter.get('/', resource.getAllResources);

resourceRouter.post('/comment', comment.createComment);

resourceRouter.get('/:id', resource.getSingleResourceById);

export default resourceRouter;
