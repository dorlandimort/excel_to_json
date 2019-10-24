const answerSchema = {
  categoryId: {
    prop: 'categoryId',
    type: Number
  },
  noQuestion: {
    prop: 'noQuestion',
    type: Number
  },
  comodin: {
    prop: 'comodin',
    type: String
  },
  inciso: {
    prop: 'inciso',
    type: String
  },
  option: {
    prop: 'option',
    type: String
  },
  selected: {
    prop: 'selected',
    type: Boolean
  },
  next: {
    prop: 'next',
    type: String
  },
  specify: {
    prop: 'specify',
    type: Boolean
  }
};

module.exports = answerSchema;
