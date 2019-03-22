const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;
const _ = require('lodash');

class ResponsePage extends BasePage {
  template = require('./responsePage.hbs');

  pageWillLoad() {
    this.response = StorageHub.getData('response');
    if (_.isEmpty(this.response)) {
      this.navigate('question')
    }
  }

  rightButtonEvent() {
  }

  leftButtonEvent() {
  }

  topButtonEvent() {
    this.navigate('/');
  }

  bottomButtonEvent() {
    this.navigate('question');
  }

  faceButtonEvent() {
    this.navigate('question');
  }
}

module.exports = ResponsePage;
