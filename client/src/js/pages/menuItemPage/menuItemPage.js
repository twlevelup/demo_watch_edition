const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;
const _ = require('lodash');

class MenuItemPage extends BasePage {
  template = require('./menuItemPage.hbs');

  pageWillLoad() {
    const selected = StorageHub.getData('selectedItem');
    if (_.isEmpty(selected)) {
      this.navigate('menu');
    }
    this.selectedItem = selected;
  }

  rightButtonEvent() {
  }

  leftButtonEvent() {
    this.navigate('menu');
  }

  topButtonEvent() {
  }

  bottomButtonEvent() {
  }
}

module.exports = MenuItemPage;
