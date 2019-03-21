const HomePage = require('./menuItemPage');
const StorageHub = require('watch-framework').StorageHub;

describe('MenuItemPage', () => {
  let watchFace;
  beforeEach(() => {
    document.body.innerHTML = `<div id='watch-face' style='height: 100px; width: 100px;'></div>`;
    watchFace = document.getElementById('watch-face');
  });

  describe('#pageWillLoad', () => {
    describe('with selectItem in storage hub', () => {
      let page;
      beforeEach(() => {
        jest.spyOn(StorageHub,"getData")
          .mockImplementation(() => ({label: 'foo', pageInfo: 'bar'}));
        page = new HomePage();
        spyOn(page, 'navigate');

        page.pageWillLoad();
      });

      it('retrieve selected item data on page load', () => {
        expect(StorageHub.getData).toBeCalledWith('selectedItem');
      });

      it('does not navigate away from page', () => {
        expect(page.navigate).toBeCalledTimes(0);
      });
    });

    it('navigates to menu page when there is no selected item', () => {
      jest.spyOn(StorageHub,"getData")
        .mockImplementation(() => undefined);
      const page = new HomePage();
      spyOn(page, 'navigate');

      page.pageWillLoad();

      expect(page.navigate).toBeCalledWith('menu');
    });
  });

  describe('#render', () => {
    it('should render my page correctly', () => {
      jest.spyOn(StorageHub,"getData")
        .mockImplementation(() => ({label: 'foo', pageInfo: 'bar'}));

      const page = new HomePage();

      expect(page.render()).toContain("<p class=\"title\">foo");
      expect(page.render()).toContain("<p class=\"description\">bar");
    });
  });

  describe('#leftButtonEvent', () => {
    it('returns to the menu page', () => {
      const page = new HomePage();
      spyOn(page, 'navigate');

      page.leftButtonEvent();

      expect(page.navigate).toHaveBeenCalledWith('menu');
    });
  });
});
