import { LeaguePage } from './app.po';

describe('league App', () => {
  let page: LeaguePage;

  beforeEach(() => {
    page = new LeaguePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
