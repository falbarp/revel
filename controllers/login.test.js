const { loginPost } = require('./login');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('loginPost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log in the user and return a token', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockUser = {
      _id: 'user_id',
      role: 'user',
      password: 'hashed_password'
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compareSync.mockReturnValue(true);
    jwt.sign.mockReturnValue('mocked_token');

    await loginPost(mockRequest, mockResponse);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compareSync).toHaveBeenCalledTimes(1);
    expect(bcrypt.compareSync).toHaveBeenCalledWith('password123', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'user_id', role: 'user' }, process.env.JWT_SECRET);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ token: 'mocked_token' });
  });

  it('should return an error if the user does not exist', async () => {
    const mockRequest = {
      body: {
        email: 'email@email.com',
        password: 'password123'
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockResolvedValue(null);
    bcrypt.compareSync.mockReturnValue(true);
    jwt.sign.mockReturnValue('mocked_token');

    await loginPost(mockRequest, mockResponse);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email: mockRequest.body.email });
    expect(bcrypt.compareSync).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Incorrect credentials' });
  });


  it('should return an error if an error occurs during login', async () => {
    const mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    User.findOne.mockRejectedValue(new Error('DB error'));

    await loginPost(mockRequest, mockResponse);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledTimes(1);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error logging in' });
  });
});
