const BasePage = require('watch-framework').BasePage;
const StorageHub = require('watch-framework').StorageHub;

class ContactDetailsPage extends BasePage {
  template = require("./contactDetailsPage.hbs");

  pageWillLoad() {
    this.details = StorageHub.getData("selected");
    this.allContactDetails = StorageHub.getData("contactDetails");
    this.name = this.details
    console.log('here', this.details);
    document.getElementById("clock-time");
    this.display();
  }

  display(){
    this.details = this.allContactDetails.filter(contact => (contact.name == this.details.name))[0]
  }

  pageDidLoad() {}

  rightButtonEvent() {
  }

  leftButtonEvent() {
    this.navigate("contacts");
  }

  topButtonEvent() {
    this.watchFace.scrollTop -= 40;
  }

  bottomButtonEvent() {
    this.watchFace.scrollTop += 40;
  }
}

module.exports = ContactDetailsPage;
