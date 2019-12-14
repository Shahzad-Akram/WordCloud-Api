import commentSchema from './comment';
import videoSchema from './video';

class Model {
  static get commentSchema() {
    return commentSchema;
  }

  static get videoSchema() {
    return videoSchema;
  }
}

export default Model;
