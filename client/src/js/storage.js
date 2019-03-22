const StorageHub = require('watch-framework').StorageHub;
const data = require('../../resources/contacts.json');
StorageHub.setJSON(data);
StorageHub.setData('hello', 'world');
StorageHub.setData('count', 0)
