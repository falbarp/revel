const { signupPost } = require('./signup');
const User = require('../models/user');
jest.mock('../models/user');

describe('signupPost', () => {
  let req;
  let res;
  let user;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    user = {
      save: jest.fn()
    };
    User.mockImplementation(() => user);
  });

  it('should create a new user and return a success message', async () => {
    await signupPost(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      user
    });
  });

  it('should return an error message if there is an error creating the user', async () => {
    user.save.mockImplementationOnce(() => {
      throw new Error();
    });
    await signupPost(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error creating user' });
  });
});
