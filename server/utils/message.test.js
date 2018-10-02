const {generateMessage, generateLocationMessage} = require('./message');
const expect = require('expect');

describe('generateMessage', () => {
  it('Should generate the correct message objex', () => {
      var from = 'Julius';
      var text = 'is such a primadonna';
      var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message.text).toEqual(text);
        expect(message.from).toEqual(from);

  });
});
describe('generateLocationMessage', () => {
  it('should generate the corrext location', () => {
    var from = 'Julius';
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var location = generateLocationMessage(from, latitude, longitude);

    expect(location).toInclude({
      from,
      url
    });
    expect(location.createdAt).toBeA('number')
  });
});
