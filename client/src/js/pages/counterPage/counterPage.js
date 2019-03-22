const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;

class CounterPage extends BasePage {
  template = require('./counterPage.hbs');

  pageWillLoad() {
    this.count = StorageHub.getData('count');
  }

  updateCountDisplay() {
    const countValue = document.getElementById("count-value");
    if (countValue) {
      countValue.textContent = StorageHub.getData('count');
    }
  }

  rightButtonEvent() {
    this.navigate('/');
  }

  leftButtonEvent() {
    this.navigate('question');
  }

  faceButtonEvent() {
    StorageHub.setData('count', 0);
    this.updateCountDisplay();
  }

  topButtonEvent() {
    const currentCount = StorageHub.getData('count');
    StorageHub.setData('count', currentCount + 1);
    this.updateCountDisplay();
  }

  bottomButtonEvent() {
    const currentCount = StorageHub.getData('count');
    StorageHub.setData('count', currentCount - 1);
    this.updateCountDisplay();
  }
}

module.exports = CounterPage;
