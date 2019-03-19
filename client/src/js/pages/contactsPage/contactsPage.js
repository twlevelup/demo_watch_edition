const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;

class ContactsPage extends BasePage {
  currentIndex = this.contacts.findIndex((contact) => contact.selected === true);
  numOfContacts = this.contacts.length;

  template = require('./contactsPage.hbs');
  _selected_contact = 0;


  pageWillLoad() {
    this.contacts = StorageHub.getData('contacts')
    document.getElementById("clock-time");

  }

  leftButtonEvent() {
    this.navigate('/');
  }

  topButtonEvent() {

  }

  bottomButtonEvent() {
    console.log(this.contacts);
    // let currentIndex = this.contacts.findIndex((contact) => contact.selected === true);
    this.contacts[currentIndex].selected = false;
    // const numOfContacts = this.contacts.length;
    const nextIndex = (currentIndex + 1) % numOfContacts;
    this.contacts[nextIndex].selected = true;
    this.render();
  }


}

module.exports = ContactsPage;
