const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

class ContactsPage extends BasePage {
  template = require("./contactsPage.hbs");
  tracker = 0; 
  selected;

  pageWillLoad() {
    // StorageHub.uploadFile("../../resources/contacts.txt");
    this.contactDetails = StorageHub.getData("detailedContacts");
    this.contacts = StorageHub.getData("contacts");
    document.getElementById("clock-time");
  }

  pageDidLoad(){
    this.selectItem();
  }

  selectItem(item = 0) {
    const list = document.getElementsByClassName("contact");
    const currentItem = list[item];
    currentItem.setAttribute("data-selected", true);
  }

  unselectItem(item) {
    const list = document.getElementsByClassName("contact");
    const currentItem = list[item];
    currentItem.setAttribute("data-selected", false);
  }

  move(direction) {
    this.unselectItem(this.tracker);
    this.tracker = (this.tracker + direction).mod(this.contacts.length)
    this.contacts.length;
    this.selected = this.contacts[this.tracker];
    console.log(this.selected);
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
