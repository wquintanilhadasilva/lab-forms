import { LabFormsPage } from './app.po';

describe('lab-forms App', () => {
  let page: LabFormsPage;

  beforeEach(() => {
    page = new LabFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
