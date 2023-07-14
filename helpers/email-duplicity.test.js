const User = require('../models/user');
const { emailDuplicity } = require('./email-duplicity');

jest.mock('../models/user', () => ({
  findOne: jest.fn(),
}));

describe('emailDuplicity', () => {
  it('should throw an error if email already exists', async () => {
    User.findOne.mockResolvedValueOnce(true);

    await expect(emailDuplicity('test@example.com')).rejects.toThrow(
      'Email test@example.com already in use'
    );
  });

  it('should not throw an error if email does not exist', async () => {
    User.findOne.mockResolvedValueOnce(false);

    await expect(emailDuplicity('test@example.com')).resolves.not.toThrow();
  });
});
