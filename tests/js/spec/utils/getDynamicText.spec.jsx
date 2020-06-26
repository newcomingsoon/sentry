import getDynamicText from 'app/utils/getDynamicText';

describe('getDynamicText', function() {
  it('renders actual value', function() {
    expect(
      getDynamicText({
        fixed: 'Text',
        value: 'Dynamic Content',
      })
    ).toEqual('Dynamic Content');
  });

  it('renders fixed content when `process.env.IS_CI` is true', function() {
    // eslint-disable-next-line no-undef
    process.env.IS_CI = true;
    expect(
      getDynamicText({
        fixed: 'Text',
        value: 'Dynamic Content',
      })
    ).toEqual('Text');
    // eslint-disable-next-line no-undef
    process.env.IS_CI = null;
  });
});
