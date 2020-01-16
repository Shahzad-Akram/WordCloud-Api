import Model from '../Models/model';
import status from 'http-status';

const createResource = (req, res) => {
  const { name, caption, url, type } = req.body;

  const resource = Model.resourceSchema({
    name,
    caption,
    url,
    type
  });

  resource
    .save()
    .then(resource => {
      res.status(status.CREATED).send({
        Message: 'Resource Created Successfully',
        resource
      });
    })
    .catch(err => {
      res.status(status.CONFLICT).send({
        Message: 'Unable To Create Resource',
        err
      });
    });
};

const getAllResources = (req, res) => {
  Model.resourceSchema
    .find()
    .then(resources => {
      res.json(resources);
    })
    .catch(err => {
      res.json({
        Message: 'Unable to Fetch Resources',
        err
      });
    });
};

const getSingleResourceById = (req, res) => {
  const { id } = req.params;
  Model.resourceSchema
    .findOne({ _id: id })
    .then(resource => {
      res.json(resource);
    })
    .catch(err => {
      res.json({
        Message: 'No Resource Found With This Id',
        err
      });
    });
};

export default {
  createResource,
  getAllResources,
  getSingleResourceById
};
