import Model from '../Models/model';
import countWords from 'count-words-occurrence';

const updateWordFrequency = (_id, frequency) => {
  return new Promise((resolve, reject) => {
    const wordFrequency = [];
    wordFrequency.push(frequency);
    const query = { _id: _id };
    const updatedPayLoad = { $set: { wordFrequency } };
    Model.resourceSchema
      .findOneAndUpdate(query, updatedPayLoad, { upsert: true, new: true })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getWordsFrequency = resourceId => {
  const query = { resourceId };
  return new Promise((resolve, reject) => {
    Model.commentSchema
      .find(query)
      .then(res => {
        const words = [];
        res.forEach(comments => {
          words.push(comments.text);
        });
        const wordCount = countWords(words.join(' '));
        const entries = Object.entries(wordCount);

        const newWordCount = [];

        entries.forEach(entry => {
          newWordCount.push({ text: entry[0], value: entry[1] });
        });

        updateWordFrequency(resourceId, newWordCount).then(res => {
          resolve(res);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

const createComment = (req, res) => {
  const { resourceId, username, email, text } = req.body;

  const comment = Model.commentSchema({
    resourceId,
    username,
    email,
    text
  });
  comment
    .save()
    .then(comment => {
      getWordsFrequency(comment.resourceId).then(word => {
        res.json({
          Message: 'Comment Added.'
        });
      });
    })
    .catch(err => {
      res.json({
        Message: 'Unable To Save Comment.',
        err
      });
    });
};

const getWordCloudByVideoID = (req, res) => {
  const { id } = req.params;
  const query = { resourceId: id };
  Model.resourceSchema
    .findOne(query)
    .then(video => {
      res.json(video.wordFrequency);
    })
    .catch(err => {
      res.json(err);
    });
};

export default {
  createComment,
  getWordCloudByVideoID
};
