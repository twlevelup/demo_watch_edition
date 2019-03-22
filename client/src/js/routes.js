const HomePage = require('./pages/homePage/homePage');
const CounterPage = require('./pages/counterPage/counterPage');
const ContactsPage = require('./pages/contactsPage/contactsPage');
const TeamPage = require('./pages/teamPage/teamPage');
const FourOhFour = require('./pages/404Page/404Page'); 
const ContactDetailsPage = require('./pages/contactDetailsPage/contactDetailsPage');

module.exports = {
  '/': HomePage,
  'counter': CounterPage,
  'contacts': ContactsPage,
  'team': TeamPage,
  '404': FourOhFour,
  'contactDetails': ContactDetailsPage
};
