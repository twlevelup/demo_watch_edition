const CountPage = require('./counterPage');
const StorageHub = require('watch-framework').StorageHub;
const AudioHub = require('watch-framework').AudioHub;

describe('CountPage', () => {
  let watchFace;
  beforeEach(() => {
    document.body.innerHTML = `<div id='watch-face' style='height: 100px; width: 100px;'></div>`;
    watchFace = document.getElementById('watch-face');
  });

  afterEach(() => {
    StorageHub.reset();
    jest.resetAllMocks();
  })

  describe('#pageWillLoad', () => {
    it('should set contacts data on page load', () => {
      const countValue = 1;
      jest.spyOn(StorageHub, 'getData')
        .mockImplementation(()  => countValue);

      const page = new CountPage();
      page.pageWillLoad();

      expect(StorageHub.getData).toBeCalledWith('count');
      expect(page.count).toEqual(countValue);
    })
  })

  describe('#render', () => {
    it('renders my page correctly', () => {
      const page = new CountPage();

      const result = page.render();

      expect(result).toContain("+");
      expect(result).toContain("<p id=\"count-value\"></p>");
      expect(result).toContain("-");
    });
  });

  describe('#leftButtonEvent', () => {
    it('resets counter to 0', () => {
      const page = new CountPage({ watchFace });
      jest.spyOn(StorageHub,"setData");
      jest.spyOn(page, 'updateCountDisplay');

      page.leftButtonEvent();

      expect(StorageHub.setData).toHaveBeenCalledTimes(1);
      expect(StorageHub.setData).toHaveBeenCalledWith("count", 0);
      expect(page.updateCountDisplay).toHaveBeenCalledTimes(1);
    });
  });

  describe('#rightButtonEvent', () => {
    it('goes to home page', () => {
      const page = new CountPage();
      spyOn(page, 'navigate');

      page.rightButtonEvent();
      expect(page.navigate).toHaveBeenCalledWith('/');
    });
  });

  describe('#bottomButtonEvent', () => {
    it('decrements count value by 1', () => {
      const page = new CountPage({ watchFace });
      const countValue = 1;
      jest.spyOn(StorageHub,"getData")
        .mockImplementation(()  => countValue);
      jest.spyOn(StorageHub,"setData");

      page.bottomButtonEvent();

      expect(StorageHub.getData).toHaveBeenCalledTimes(1);
      expect(StorageHub.getData).toHaveBeenCalledWith("count");

      expect(StorageHub.setData).toHaveBeenCalledTimes(1);
      expect(StorageHub.setData).toHaveBeenCalledWith("count", countValue - 1);
    });
  });

  describe('#topButtonEvent', () => {
    it('increments count value by 1', () => {
      const page = new CountPage({ watchFace });
      const countValue = 1;
      jest.spyOn(StorageHub,"getData")
        .mockImplementation(()  => countValue);
      jest.spyOn(StorageHub,"setData");

      page.topButtonEvent();

      expect(StorageHub.getData).toHaveBeenCalledTimes(1);
      expect(StorageHub.getData).toHaveBeenCalledWith("count");

      expect(StorageHub.setData).toHaveBeenCalledTimes(1);
      expect(StorageHub.setData).toHaveBeenCalledWith("count", countValue + 1);
    });
  });

  describe('#updateCountDisplay', () => {
    it('calls counter-value document element if its in the window', () => {
      const page = new CountPage();

      watchFace.innerHTML = page.render();

      jest.spyOn(StorageHub,"getData");
      page.updateCountDisplay();
      expect(StorageHub.getData).toHaveBeenCalledTimes(1);
      expect(StorageHub.getData).toHaveBeenCalledWith("count");
    });

    it('does not call count-value if its not in the window', () => {
      const page = new CountPage();

      jest.spyOn(StorageHub,"getData");
      page.updateCountDisplay();
      expect(StorageHub.getData).toHaveBeenCalledTimes(0);
    });
  });
});
