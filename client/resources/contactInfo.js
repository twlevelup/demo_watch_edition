const StorageHub = require("watch-framework").StorageHub;

StorageHub.setData("contactDetails", [
  { 
    name: "Ray", 
    phoneNumber: "0431 111 111", 
    relationship: "Brother", 
    favouriteColour: "Orange" 
  },
  { 
    name: "Sinan", 
    phoneNumber: "0431 222 222", 
    relationship: "Sister", 
    favouriteColour: "Purple" 
  },
  { 
    name: "Jafari", 
    phoneNumber: "0431 333 333", 
    relationship: "Cousin", 
    favouriteColour: "Green" 
  },
]);