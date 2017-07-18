import { BicingPage } from './app.po';

describe('bicing App', () => {
  let page: BicingPage;

  beforeEach(() => {
    page = new BicingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
