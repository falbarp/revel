const User = require('../models/user');


const emailDuplicity = async (email = '') => {

    const emailExists = await User.findOne({ email });
    if (emailExists) {
       throw new Error (`Email ${email} already in use`);
    }
}

module.exports = {
    emailDuplicity
}