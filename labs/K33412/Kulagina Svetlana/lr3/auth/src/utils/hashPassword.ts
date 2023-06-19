const bcrypt = require('bcrypt');

export default (password: string): string => {
    console.log(password);
    return bcrypt.hashSync(password, 8);
};