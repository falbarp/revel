const { userGet, userPut, userRolePut, userDelete } = require('./user');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

jest.mock('../models/user');
jest.mock('bcryptjs');

describe('User Controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      userData: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('userGet', () => {
    it('should return all users', async () => {
      const users = [{ name: 'John' }, { name: 'Jane' }];
      User.find.mockResolvedValue(users);

      await userGet(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ users });
    });

    it('should return an error if something goes wrong', async () => {
      User.find.mockRejectedValue(new Error());

      await userGet(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error getting users' });
    });
  });

  describe('userPut', () => {
    it('should update the user if authenticated', async () => {
      req.params.userId = '123';
      req.userData.userId = '123';
      req.body.name = 'John';
      const updatedUser = { name: 'John' };
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      await userPut(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user: updatedUser });
    });

    it('should not update the user if not authenticated', async () => {
      req.params.userId = '123';
      req.userData.userId = '456';

      await userPut(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Not authorized' });
    });

    it('should hash the password if provided', async () => {
      req.params.userId = '123';
      req.userData.userId = '123';
      req.body.password = 'password';
      const hashedPassword = 'hashedPassword';
      bcrypt.hash.mockResolvedValue(hashedPassword);
      const updatedUser = { password: hashedPassword };
      User.findByIdAndUpdate.mockResolvedValue(updatedUser);

      await userPut(req, res, next);

      expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.userId,
        { password: hashedPassword },
        { new: true }
      );
    });

    it('should return an error if something goes wrong', async () => {
        req.params.userId = '123';
        req.userData.userId = '123';
        User.findByIdAndUpdate.mockRejectedValue(new Error());

        await userPut(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error updating user' });
    });
  });

  describe('userRolePut', () => {
    it('should update the role of the user if found', async () => {
        req.params.userId = '123';
        req.body.role = 'admin';
        const user = { save: jest.fn() };
        User.findById.mockResolvedValue(user);

        await userRolePut(req, res, next);

        expect(user.role).toBe(req.body.role);
        expect(user.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Role updated successfully' });
    });

    it('should return an error if the user is not found', async () => {
        req.params.userId = '123';
        User.findById.mockResolvedValue(null);

        await userRolePut(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return an error if something goes wrong', async () => {
        req.params.userId = '123';
        User.findById.mockRejectedValue(new Error());

        await userRolePut(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error updating role' });
    });
  });

  describe('userDelete', () => {
    it('should delete the user if found', async () => {
        req.params.userId = '123';

        await userDelete(req, res, next);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith(req.params.userId);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return an error if something goes wrong', async () => {
        req.params.userId = '123';
        User.findByIdAndDelete.mockRejectedValue(new Error());

        await userDelete(req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error deleting user' });
    });
  });
});
