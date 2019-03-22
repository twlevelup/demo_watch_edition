const QuestionnairePage = require('./questionnairePage');
const StorageHub = require('watch-framework').StorageHub;

describe('QuestionnairePage', () => {
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
    it('sets up the questionnaire object', () => {
      jest.spyOn(StorageHub, 'getData')
        .mockImplementation((key)  => {
          if (key === "questionIndex") {
            return 0;
          }
          return [
            {
              question: 'Can you come up with a question?',
              yes: {
                label: 'yes label',
                response: 'yes response',
              },
              no: {
                label: 'no label',
                response: 'no response',
              },
              maybe: {
                label: 'maybe label',
                response: 'maybe response🏽'
              },
            }
          ]
        });

      const page = new QuestionnairePage();
      page.index = 0;
      page.pageWillLoad();

      expect(page.question).toEqual('Can you come up with a question?');
      expect(page.yes).toEqual({
        label: 'yes label',
        response: 'yes response',
      });
      expect(page.maybe).toEqual({
        label: 'maybe label',
        response: 'maybe response🏽'
      });
      expect(page.no).toEqual({
        label: 'no label',
        response: 'no response',
      });
    });
  });

  describe('#render', () => {
    it('renders my page correctly', () => {
      const page = new QuestionnairePage();

      page.yes = { label: 'yes label' };
      page.maybe = { label: 'maybe label' };
      page.no = { label: 'no label' };
      page.question = 'Can you answer the question?';
      const result = page.render();

      expect(result).toContain("<p class=\"top\">yes label</p>");
      expect(result).toContain("<p class=\"left\">maybe label</p>");
      expect(result).toContain("<p class=\"center\">Can you answer the question?</p>");
      expect(result).toContain("<p class=\"right\">Back</p>");
      expect(result).toContain("<p class=\"bottom\">no label</p>");
    });
  });

  describe('#leftButtonEvent', () => {
    it('sets maybe value in storage hub', () => {
      const page = new QuestionnairePage({ watchFace });
      jest.spyOn(StorageHub,"setData");
      spyOn(page, 'navigate');

      page.maybe = {
        response: 'maybe value',
      };
      page.leftButtonEvent();

      expect(StorageHub.setData).toHaveBeenCalledTimes(1);
      expect(StorageHub.setData).toHaveBeenCalledWith("response", 'maybe value');
      expect(page.navigate).toHaveBeenCalledWith('response');
    });
  });

  describe('#rightButtonEvent', () => {
    it('navigates to home page', () => {
      const page = new QuestionnairePage();
      spyOn(page, 'navigate');

      page.rightButtonEvent();

      expect(page.navigate).toHaveBeenCalledWith('counter');
    });
  });

  describe('#bottomButtonEvent', () => {
    it('sets no response in storage hub', () => {
      const page = new QuestionnairePage({ watchFace });
      jest.spyOn(StorageHub,"setData");
      spyOn(page, 'navigate');

      page.no = {
        response: 'no value',
      };
      page.bottomButtonEvent();

      expect(StorageHub.setData).toHaveBeenCalledTimes(1);
      expect(StorageHub.setData).toHaveBeenCalledWith("response", 'no value');
      expect(page.navigate).toHaveBeenCalledWith('response');
    });
  });

  describe('#topButtonEvent', () => {
    it('sets yes response in storage hub', () => {
      const page = new QuestionnairePage({ watchFace });
      jest.spyOn(StorageHub,"setData");
      spyOn(page, 'navigate');

      page.yes = {
        response: 'yes value',
      };
      page.topButtonEvent();

      expect(StorageHub.setData).toHaveBeenCalledTimes(1);
      expect(StorageHub.setData).toHaveBeenCalledWith("response", 'yes value');
      expect(page.navigate).toHaveBeenCalledWith('response');
    });
  });
});
