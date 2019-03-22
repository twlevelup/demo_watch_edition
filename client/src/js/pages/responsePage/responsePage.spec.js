const ResponsePage = require('./responsePage');
const StorageHub = require('watch-framework').StorageHub;

describe('ResponsePage', () => {
  let watchFace;
  beforeEach(() => {
    document.body.innerHTML = `<div id='watch-face' style='height: 100px; width: 100px;'></div>`;
    watchFace = document.getElementById('watch-face');
  });

  afterEach(() => {
    StorageHub.reset();
    jest.resetAllMocks();
  });

  describe('#pageWillLoad', () => {
    it('sets page.response with response in storagehub', () => {
      jest.spyOn(StorageHub, 'getData')
        .mockImplementation(()  => 'result value');
      const page = new ResponsePage();

      page.pageWillLoad();

      expect(page.response).toEqual('result value');
    });

    it('navigates to question page when there is no response', () => {
      jest.spyOn(StorageHub, 'getData')
        .mockImplementation(()  => undefined);
      const page = new ResponsePage();
      spyOn(page, 'navigate');

      page.pageWillLoad();

      expect(page.navigate).toBeCalledWith('question');
    });
  });

  describe('#render', () => {
    it('renders my page correctly', () => {
      jest.spyOn(StorageHub, 'getData')
        .mockImplementation(()  => 'response value');
      const page = new ResponsePage();

      page.pageWillLoad();
      const result = page.render();

      expect(result).toContain("Back to home");
      expect(result).toContain("<p class=\"center\">response value</p>");
      expect(result).toContain("Try");
    });
  });

  describe('#bottomButtonEvent', () => {
    it('navigates to question page', () => {
      const page = new ResponsePage();
      spyOn(page, 'navigate');

      page.bottomButtonEvent();

      expect(page.navigate).toBeCalledWith('question');
    });
  });

  describe('#topButtonEvent', () => {
    it('navigates to home page', () => {
      const page = new ResponsePage();
      spyOn(page, 'navigate');

      page.topButtonEvent();

      expect(page.navigate).toBeCalledWith('/');
    });
  });
});
