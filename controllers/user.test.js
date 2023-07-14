const { response } = require('express');
const User = require('../models/user');

jest.mock('../models/user');

const {
  userGet,
  userPut,
  userRolePut,
  userDelete
} = require('./user');

describe('userGet', () => {
  test('should return a list of users', async () => {

    const mockedUsers = [
      {name: 'User 1', email:"email1@email.com ", role: 'user'},
      {name: 'User 2', email:"email2@email.com ", role: 'user'}
    ];
    
    User.find.mockResolvedValueOnce(mockedUsers);
    
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    await userGet(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({ users: mockedUsers });
  });

  test('should return an error message on failure', async () => {
  
    User.find.mockRejectedValueOnce(new Error('Error in the database'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userGet(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting users' });
  });
});

describe('userPut', () => {
  test('should return a success message', () => {

    const req = {};
    const res = {
      json: jest.fn(),
    };

    userPut(req, res);

    expect(res.json).toHaveBeenCalledWith({ msg: 'put API - controller' });
  });
});

describe('userRolePut', () => {
  test('should update the role of an existing user', async () => {

    const userId = '123456789';
    const role = 'admin';
    
    const mockedUser = {
      _id: userId,
      role: 'user',
      save: jest.fn(), 
    };
    User.findById.mockResolvedValueOnce(mockedUser);
  
    const req = {
      params: { userId },
      body: { role },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    await userRolePut(req, res);

    expect(User.findById).toHaveBeenCalledWith(userId);

    expect(mockedUser.role).toBe(role);

    expect(mockedUser.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({ message: 'Role updated successfully' });
  });

  test('should return an error message if user is not found', async () => {

    User.findById.mockResolvedValueOnce(null);

    const req = {
      params: { userId: '123456789' },
      body: { role: 'admin' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userRolePut(req, res);
 
    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  test('should return an error message on failure', async () => {
  
    User.findById.mockRejectedValueOnce(new Error('Error in the database'));
    
    const req = {
      params: { userId: '123456789' },
      body: { role: 'admin' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    
    await userRolePut(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({ error: 'Error updating role' });
  });
});

describe('userDelete', () => {
  test('should delete an existing user', async () => {

    const req = {
      params: { userId: '123456789' },
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findByIdAndDelete.mockResolvedValueOnce();

    await userDelete(req, res);
  
    expect(User.findByIdAndDelete).toHaveBeenCalledWith(req.params.userId);

    expect(res.status).toHaveBeenCalledWith(200);
    
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
  });

  test('should return an error message on failure', async () => {

    User.findByIdAndDelete.mockRejectedValueOnce(new Error('Error in the database'));
    

    const req = {
      params: { userId: '123456789' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userDelete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting user' });
  });
});
