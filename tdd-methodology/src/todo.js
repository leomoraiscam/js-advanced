const { v4: uuidv4 } = require('uuid');

class Todo {
  constructor({ text, when }) {
    this.text = text;
    this.when = when;
    this.status = '';
    this.id = uuidv4();
  }

  isValid() {
    return !!this.text && !isNaN(this.when.valueOf())
  }
}

module.exports = Todo;