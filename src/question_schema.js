const questionSchema = {
  id: {
    prop: 'id',
    type: Number
  },
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
  question: {
    prop: 'question',
    type: String
  },
  inciso: {
    prop: 'inciso',
    type: String
  },
  subquestion: {
    prop: 'subquestion',
    type: String
  },
  instructions: {
    prop: 'instructions',
    type: String
  },
  type: {
    prop: 'type',
    type: String
  },
  answers: {
    prop: 'answers',
    type: String
  }
};

module.exports = questionSchema;
