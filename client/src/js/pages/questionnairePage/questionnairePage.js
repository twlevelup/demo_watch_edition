const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;

const mod = (n,m) => ((n % m) + m) % m;

class QuestionnairePage extends BasePage {
  template = require('./questionnairePage.hbs');

  pageWillLoad() {
    this.questions = StorageHub.getData('questionnaire');
    const index = StorageHub.getData('questionIndex');
    this.index = mod(index + 1, this.questions.length);
    StorageHub.setData('questionIndex', this.index);
    console.log(index, this.index);

    this.questionObject = this.questions[this.index];
    this.question = this.questionObject.question;
    this.yes = this.questionObject.yes;
    this.no = this.questionObject.no;
    this.maybe = this.questionObject.maybe;
  }

  rightButtonEvent() {
    this.navigate('counter');
  }

  leftButtonEvent() {
    StorageHub.setData('response', this.maybe.response);
    this.navigate('response');
  }

  topButtonEvent() {
    StorageHub.setData('response', this.yes.response);
    this.navigate('response');
  }

  bottomButtonEvent() {
    StorageHub.setData('response', this.no.response);
    this.navigate('response');
  }
}

module.exports = QuestionnairePage;
