const HomePage = require('./menuPage');
const StorageHub = require('watch-framework').StorageHub;

const sampleItems = [
  {
    label: 'a',
    pageInfo: 'b'
  },
  {
    label: 'c',
    pageInfo: 'd'
  },
  {
    label: 'e',
    pageInfo: 'f'
  }
];

describe('MenuPage', () => {
  let watchFace;
  beforeEach(() => {
    document.body.innerHTML = `<div id='watch-face' style='height: 100px; width: 100px;'></div>`;
    watchFace = document.getElementById('watch-face');
  });

  describe('#pageWillLoad', () => {
    it('sets menu items and ssets selected index', () => {
      spyOn(StorageHub, 'setData');
      spyOn(StorageHub, 'getData');
      const page = new HomePage();

      page.pageWillLoad();

      expect(StorageHub.setData).toBeCalledWith('menuItems', expect.any(Object));
      expect(StorageHub.getData).toBeCalledWith('menuItems');
      expect(page.selectedIndex).toEqual(0);
    });
  });

  describe('#render', () => {
    it('renders my page with list', () => {
      jest.spyOn(StorageHub,"getData")
        .mockImplementation(() => ([{label: 'foo', pageInfo: 'bar'}]));
      const page = new HomePage();

      page.menuItems = [{label: 'foo', pageInfo: 'bar'}];
      const result = page.render();

      expect(result).toContain("<ul>\n<li class='menuItem#foo'>foo</li>\n</ul>");
    });
  });

  describe('#leftButtonEvent', () => {
    it('navigates to home page', () => {
      const page = new HomePage();
      spyOn(page, 'navigate');

      page.leftButtonEvent();

      expect(page.navigate).toHaveBeenCalledWith('/');
    });
  });

  describe('#rightButtonEvent', () => {
    it('navigates to menuItem page after setting selectItem in storage hub', () => {
      spyOn(StorageHub,"setData");
      const page = new HomePage();
      spyOn(page, 'navigate');

      page.selectedIndex = 0;
      page.menuItems = sampleItems;
      page.rightButtonEvent();

      expect(page.navigate).toHaveBeenCalledWith('menuItem');
      expect(StorageHub.setData).toHaveBeenCalledWith('selectItem', expect.any(Object));
    });
  });

  describe('#bottomButtonEvent', () => {
    it('loops through selected items', () => {

      const page = new HomePage({ watchFace });

      page.selectedIndex = 0;
      page.menuItems = [
        {
          label: 'a',
          pageInfo: 'b'
        },
        {
          label: 'c',
          pageInfo: 'd'
        }
      ];
      page.bottomButtonEvent();

      expect(page.selectedIndex).toEqual(1);

      page.bottomButtonEvent();

      expect(page.selectedIndex).toEqual(0);
    });
  });

  describe('#topButtonEvent', () => {
    it('loops through the items inversely', () => {
      const page = new HomePage({ watchFace });

      page.selectedIndex = 0;
      page.menuItems = sampleItems;
      page.topButtonEvent();

      expect(page.selectedIndex).toEqual(2);

      page.topButtonEvent();

      expect(page.selectedIndex).toEqual(1);
    });
  });
});
