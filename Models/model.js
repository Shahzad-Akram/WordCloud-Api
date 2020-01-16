import commentSchema from './comment';
import resourceSchema from './resource';

class Model {
  static get commentSchema() {
    return commentSchema;
  }

  static get resourceSchema() {
    return resourceSchema;
  }
}

export default Model;
