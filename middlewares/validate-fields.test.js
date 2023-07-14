jest.mock('express-validator', () => ({
    validationResult: jest.fn()
}));

const { validationResult } = require('express-validator');
const { validateFields } = require('./validate-fields'); // assuming the file is named validateFields.js

describe('validateFields middleware', () => {
    test('should call next() if there are no errors', () => {
        const req = {
            body: {}
        };
        const res = {};
        const next = jest.fn();
        
        validationResult.mockReturnValue({
            isEmpty: jest.fn().mockReturnValue(true)
        });
        
        validateFields(req, res, next);
        
        expect(next).toHaveBeenCalled();
    });
    
    test('should return a 400 response with errors if there are validation errors', () => {
        const req = {
            body: {}
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        
        validationResult.mockReturnValue({
            isEmpty: jest.fn().mockReturnValue(false),
            array: jest.fn().mockReturnValue(['error1', 'error2'])
        });
        
        
        
        validateFields(req, res, next);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(['error1', 'error2']);
    });
});
