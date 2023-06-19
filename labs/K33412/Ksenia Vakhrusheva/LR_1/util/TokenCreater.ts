const jwt = require('jsonwebtoken');
import User from '../models/user';
import Tokens from '../models/tokens';
require("dotenv").config();

const generateToken = async function (email: string) {
    try {
        const usertab = await User.findOne({ where: { email } });
        if (!usertab) {
            console.log("User not found");
            return null;
        }
        
        const jwtToken = jwt.sign(
            {
                id: usertab.id,
                email: usertab.email
            },
            process.env.SECRETKEY
        );

        const token = new Tokens();
        token.token = jwtToken;
        token.userId = usertab.id;
        await token.save();
        
        console.log("Token saved successfully");
        return jwtToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export default generateToken;
