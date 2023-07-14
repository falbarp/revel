const jwt = require('jsonwebtoken');
const { authenticateUser, authorizeUser } = require('./auth');

jest.mock('jsonwebtoken');
jwt.verify.mockImplementation((token, secret) => {
  if (token === 'validToken') {
    return { userId: 'mockedUserId', role: 'userRole' };
  }
  throw new Error('Invalid token');
});

describe('authenticateUser', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer validToken',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('should set userData and call next when authentication is successful', () => {
    authenticateUser(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.JWT_SECRET);
    expect(req.userData).toEqual({ userId: 'mockedUserId', role: 'userRole' });
    expect(next).toHaveBeenCalled();
  });

  test('should return 401 status and error message when authentication fails', () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    authenticateUser(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.JWT_SECRET);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Authentication failed' });
    expect(next).not.toHaveBeenCalled();
  });
});

describe('authorizeUser', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      userData: {
        userId: 'mockedUserId',
        role: 'userRole',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('should call next when user role matches the required role', () => {
    const requiredRole = 'userRole';

    authorizeUser(requiredRole)(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should return 403 status and error message when user role does not match the required role', () => {
    const requiredRole = 'adminRole';

    authorizeUser(requiredRole)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized' });
    expect(next).not.toHaveBeenCalled();
  });
});
