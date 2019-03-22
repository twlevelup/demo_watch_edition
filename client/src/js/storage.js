const StorageHub = require('watch-framework').StorageHub;
const data = require('../../resources/contacts.json');
StorageHub.setJSON(data);
StorageHub.setData('hello', 'world');
StorageHub.setData('count', 0);
StorageHub.setData('questionIndex', 0);
StorageHub.setData('questionnaire', [{
  question: 'What\'s your favourite colour?',
  yes: {
    label: 'green',
    response: 'May the forest be with you',
  },
  no: {
    label: 'orange',
    response: 'Orange you so sweet',
  },
  maybe: {
    label: 'purple',
    response: 'Achieve grapeness 🍇💪🏽'
  },
}, {
  question: 'Has anyone ever called you boring?',
  yes: {
    label: 'yes',
    response: 'Don\'t worry we\'ll still like you 😊',
  },
  no: {
    label: 'no',
    response: 'Good for you 😄',
  },
  maybe: {
    label: 'maybe',
    response: 'Sorry for asking a weird question 😞',
  }
}, {
  question: 'How many cats do you have?',
  yes: {
    label: '1',
    response: '🐱'
  },
  no: {
    label: '10',
    response: '😸😹😺😻😼😽😾😿🙀'
  },
  maybe: {
    label: 'I hate cats',
    response: '🐶',
  },
}]);
