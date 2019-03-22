require('./main.css');
require('./js/storage');
require('./../resources/contactInfo');
const StorageHub = require('watch-framework').StorageHub;
const data = require('../resources/contacts.json');
StorageHub.setJSON(data);

const App = require('watch-framework').App;

const routes = require("./js/routes");
const notifications = require("./js/notifications");



new App(routes, notifications).navigateToLocation(window.location);
