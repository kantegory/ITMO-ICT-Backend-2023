// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
import express from 'express'
require("dotenv").config();



// Middleware function to verify JWT token
function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const secretKey = process.env.SECRETKEY; // Replace with your own secret key

  // Extract token from the request header or designated location
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).userId = decoded.userId; // Set the decoded user ID in the request object for further processing
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export default verifyToken;