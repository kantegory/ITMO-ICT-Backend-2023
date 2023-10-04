import { Router, Request, Response } from 'express';
import Competition from '../models/competition';
import User from '../models/user';
import Team from '../models/teamData';
import Participant from '../models/participant';
const participantRoute = Router();



// Create a participant
participantRoute.post('/participants', async (req: Request, res: Response) => {
    // Request body should contain participant details
    const { userId, teamId, competitionId, role } = req.body;
    try {
      // Check if the user with the provided userId exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the team with the provided teamId exists
      const team = await Team.findByPk(teamId);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
  
      // Check if the competition with the provided competitionId exists
      const competition = await Competition.findByPk(competitionId);
      if (!competition) {
        return res.status(404).json({ error: 'Competition not found' });
      }
  
      const participant = new Participant();
      participant.userId = userId;
      participant.teamId = teamId;
      participant.competitionId = competitionId;
      participant.role = role;
      await participant.save();
  
      res.json(participant);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get all participants
  participantRoute.get('/participants', async (req: Request, res: Response) => {
    try {
      const participants = await Participant.findAll();
  
      res.json(participants);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get a participant by ID
  participantRoute.get('/participants/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const participant = await Participant.findByPk(id);
  
      if (participant) {
        res.json(participant);
      } else {
        res.status(404).json({ error: 'Participant not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update a participant
  participantRoute.put('/participants/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, teamId, competitionId, role } = req.body;
    try {
      const participant = await Participant.findByPk(id);
  
      if (participant) {
        // Check if the user with the provided userId exists
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Check if the team with the provided teamId exists
        const team = await Team.findByPk(teamId);
        if (!team) {
          return res.status(404).json({ error: 'Team not found' });
        }
  
        // Check if the competition with the provided competitionId exists
        const competition = await Competition.findByPk(competitionId);
        if (!competition) {
          return res.status(404).json({ error: 'Competition not found' });
        }
  
        participant.userId = userId;
        participant.teamId = teamId;
        participant.competitionId = competitionId;
        participant.role = role;
        await participant.save();
  
        res.json(participant);
      } else {
        res.status(404).json({ error: 'Participant not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a participant
  participantRoute.delete('/participants/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const participant = await Participant.findByPk(id);
  
      if (participant) {
        await participant.destroy();
        res.json({ message: 'Participant deleted successfully' });
      } else {
        res.status(404).json({ error: 'Participant not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  export default participantRoute;