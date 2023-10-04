import { Router, Request, Response } from 'express';
import Judge from '../models/judge';
import Competition from '../models/competition';
const axios = require('axios');


const Judgerout = Router();


//show all judge
Judgerout.get('/judge', async (req: Request, res: Response) => {
    try {
      const judges = await Judge.findAll();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
//get judge by id

Judgerout.get('/judge/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const judge = await Judge.findByPk(id, {
        include: [Competition],
      });
      if (judge) {
        res.json(judge);
      } else {
        res.status(404).json({ error: 'Judge not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //create a new judge

  Judgerout.post('/judge', async (req: Request, res: Response) => {
    const { userId, competitionId, otherRelevantDetails } = req.body;
    
    try {
      // Check if the user with the provided userId exists
      const userResponse = await axios.get(`http://localhost:5001/users/${userId}`);
      const user = userResponse.data;
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the competition with the provided competitionId exists
      const competition = await Competition.findByPk(competitionId);
      if (!competition) {
        return res.status(404).json({ error: 'Competition not found' });
      }
      
      const judge = new Judge();
      judge.userId = userId;
      judge.competitionId = competitionId;
      judge.otherRelevantDetails = otherRelevantDetails;
      await judge.save();
  
      res.json(judge);
    } catch (error) {
      if ((error as any).response && (error as any).response.status === 404) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  
  
  
//update

Judgerout.put('/judge/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, competitionId, otherRelevantDetails } = req.body;
  try {
    // Check if the user with the provided userId exists
    const userResponse = await axios.get(`http://localhost:5001/users/${userId}`);
    const user = userResponse.data;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the competition with the provided competitionId exists
    const competition = await Competition.findByPk(competitionId);
    if (!competition) {
      return res.status(404).json({ error: 'Competition not found' });
    }
    
    const judge = await Judge.findByPk(id);
    if (judge) {
      judge.userId = userId;
      judge.competitionId = competitionId;
      judge.otherRelevantDetails = otherRelevantDetails;
      await judge.save();
      res.json(judge);
    } else {
      res.status(404).json({ error: 'Judge not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

  
  
  //delete 
  Judgerout.delete('/judge/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const judge = await Judge.findByPk(id);
      if (judge) {
        await judge.destroy();
        res.json({ message: 'Judge deleted successfully' });
      } else {
        res.status(404).json({ error: 'Judge not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  export default Judgerout;

  
  