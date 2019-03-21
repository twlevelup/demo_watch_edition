const fs = require("fs");
class StorageHub {
  constructor(filePath=null) {
    this.store = {};
    this.shouldDebug = false;
    this.filePath = filePath;
    if(this.filePath){
      // let content = this._loadFile();
      this.store = content
    }
  }

  loadFile(filePath) {
    const content = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    this.store = content;
  }

  setDebug(shouldDebug) {
    this.shouldDebug = shouldDebug;
  }

  setData(field, value) {

    if (typeof field !== 'string') {
      throw new Error('First parameter must be a string')
    }

    if (this.shouldDebug) {
      console.debug('[StorageHub] Before:', this.store)
    }
    this.store = {
      ...this.store,
      [field]: value,
    }

    if (this.shouldDebug) {
      console.debug('[StorageHub] After:', this.store)
    }
  }

  getData(field) {
    return this.store[field];
  }

  reset() {
    this.store = {};
  }

  uploadFile(filePath){
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    this.store = content;
  }
}

module.exports = StorageHub;
