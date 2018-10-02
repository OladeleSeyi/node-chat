const {generateMessage} = require('./message');
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
