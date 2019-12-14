import Model from '../Models/model';
import countWords from 'count-words-occurrence';

const updateWordFrequency = (videoId, frequency) => {
  return new Promise((resolve, reject) => {
    const wordFrequency = [];
    wordFrequency.push(frequency);
    const query = { videoId: videoId };
    const updatedPayLoad = { $set: { wordFrequency } };
    Model.videoSchema
      .findOneAndUpdate(query, updatedPayLoad, { upsert: true, new: true })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const getWordsFrequency = videoId => {
  const query = { videoId };

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

        updateWordFrequency(videoId, newWordCount).then(res => {
          resolve(res);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

const createComment = (req, res) => {
  const { videoId, username, email, text } = req.body;

  const comment = Model.commentSchema({
    videoId,
    username,
    email,
    text
  });
  comment
    .save()
    .then(comment => {
      getWordsFrequency(comment.videoId).then(word => {
        res.json({
          word
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
  const query = { videoId: id };
  Model.videoSchema
    .findOne(query)
    .then(video => {
      res.json(video);
    })
    .catch(err => {
      res.json(err);
    });
};

export default {
  createComment,
  getWordCloudByVideoID
};
