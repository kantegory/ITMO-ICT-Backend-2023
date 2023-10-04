const jwt = require('jsonwebtoken');
import User from '../models/user';
require("dotenv").config();

const generateToken = async function (email: string) {
    const user = await User.findOne({ where: { email } }).catch((error) => {
        console.log(error)
    })
    if (user) {
        const jwtToken = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.SECRETKEY
        );
        if (user.token) {
            user.token= jwtToken ;
            console.log(user.token)
        } else {
            user.token = jwtToken ;
            console.log(user.token)
        }
        await user.save();
        return jwtToken;
    } else {
        console.log("User is null")
    }
    
}

export default generateToken;
