import express from 'express';
import axios from 'axios';

require('dotenv').config();

// Middleware function to verify JWT token
async function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
  const secretKey = process.env.SECRETKEY;
//   const microserviceURL = 'http://localhost:9001/auth'; 

  // Extract token from the request header or designated location
  const token = req.headers.authorization?.split(' ')[1]; // Assumes token is provided in the "Authorization" header with format "Bearer <token>"
  const userId = req.header('userId'); // Assumes userId is provided in a custom header
  // console.log(token, userId)
  try {
    // Make a request to the microservice endpoint to validate the token and user
    const response = await axios.post("http://localhost:4001/verifyToken", null, {
      params: {
        token: token,
        userId: userId
      }
    });
        console.log(response.data)
        const { valid } = response.data;

    if (valid) {
      (req as any).userId = userId; // Set the userId in the request object for further processing
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token or user' });
    }
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        return res.status(401).json({ message: data.message });
      }
    }
    console.error(error);
    return res.status(500).json({ message: 'Error validating token and user' });
  }
}

export default verifyToken;