const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

class ContactsPage extends BasePage {
  template = require("./contactsPage.hbs");
  tracker = 0; 
  selected;
  list;

  pageWillLoad() {
    this.contactDetails = StorageHub.getData("contactDetails");
    document.getElementById("clock-time");
  }

  pageDidLoad(){
    this.list = document.getElementsByClassName("contact");
    this.selected = this.contactDetails[this.tracker];
    this.selectItem();
  }

  selectItem(item = 0) {
    const currentItem = this.list[item];
    currentItem.setAttribute("data-selected", true);
  }

  unselectItem(item) {
    const currentItem = this.list[item];
    currentItem.setAttribute("data-selected", false);
  }

  move(direction) {
    this.unselectItem(this.tracker);
    const numContacts = this.contactDetails.length;
    this.tracker = (this.tracker + direction).mod(numContacts)
    this.selected = this.contactDetails[this.tracker];
    this.selectItem(this.tracker);
  }

  rightButtonEvent() {
    this.navigate("contactDetails");
    StorageHub.setData("selected", this.selected);
    
  }

  leftButtonEvent() {
    this.navigate("/");
  }

  topButtonEvent() {
    this.move(-1);
  }

  bottomButtonEvent() {
    this.move(1);
  }
}

module.exports = ContactsPage;
