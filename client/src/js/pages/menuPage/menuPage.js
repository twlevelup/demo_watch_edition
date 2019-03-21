const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;
const menuData = require('../../../data/menuItems.json');

const mod = (n,m) => ((n % m) + m) % m;

class MenuPage extends BasePage {
  template = require('./menuPage.hbs');

  pageWillLoad() {
    StorageHub.setData('menuItems', menuData);

    this.menuItems = StorageHub.getData('menuItems');
    this.selectedIndex = 0;
  }

  rightButtonEvent() {
    StorageHub.setData('selectedItem', this.menuItems[this.selectedIndex]);
    this.navigate('menuItem');
  }

  leftButtonEvent() {
    this.navigate('/');
  }

  topButtonEvent() {
    const currentIndex = this.selectedIndex;
    this.selectedIndex = mod((currentIndex - 1), this.menuItems.length);
    console.log('newIndex', this.selectedIndex, this.menuItems.length);
  }

  bottomButtonEvent() {
    const currentIndex = this.selectedIndex;
    this.selectedIndex = mod((currentIndex + 1), this.menuItems.length);
    console.log('newIndex', this.selectedIndex, this.menuItems.length);
  }
}

module.exports = MenuPage;
