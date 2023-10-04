import { Router, Request, Response } from 'express';
import Competition from '../models/competition';
import Team from '../models/teamData';
import User from '../models/user';

const teamRoute = Router();

// Create a team
teamRoute.post('/teams', async (req: Request, res: Response) => {
    // Request body should contain team details
    const { teamName, teamLeaderId, competitionId } = req.body;
    try {
      // Check if the user with the provided teamLeaderId exists
      const teamLeader = await User.findByPk(teamLeaderId);
      if (!teamLeader) {
        return res.status(404).json({ error: 'Team leader not found' });
      }
  
      // Check if the competition with the provided competitionId exists
      const competition = await Competition.findByPk(competitionId);
      if (!competition) {
        return res.status(404).json({ error: 'Competition not found' });
      }
  
      const team = new Team();
      team.teamName = teamName;
      team.teamLeaderId = teamLeaderId;
      team.competitionId = competitionId;
      await team.save();
  
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get all teams
  teamRoute.get('/teams', async (req: Request, res: Response) => {
    try {
      const teams = await Team.findAll();
  
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get a team by ID
  teamRoute.get('/teams/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const team = await Team.findByPk(id);
  
      if (team) {
        res.json(team);
      } else {
        res.status(404).json({ error: 'Team not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update a team
  teamRoute.put('/teams/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { teamName, teamLeaderId, competitionId } = req.body;
    try {
      const team = await Team.findByPk(id);
  
      if (team) {
        // Check if the user with the provided teamLeaderId exists
        const teamLeader = await User.findByPk(teamLeaderId);
        if (!teamLeader) {
          return res.status(404).json({ error: 'Team leader not found' });
        }
  
        // Check if the competition with the provided competitionId exists
        const competition = await Competition.findByPk(competitionId);
        if (!competition) {
          return res.status(404).json({ error: 'Competition not found' });
        }
  
        team.teamName = teamName;
        team.teamLeaderId = teamLeaderId;
        team.competitionId = competitionId;
        await team.save();
  
        res.json(team);
      } else {
        res.status(404).json({ error: 'Team not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a team
  teamRoute.delete('/teams/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const team = await Team.findByPk(id);
  
      if (team) {
        await team.destroy();
        res.json({ message: 'Team deleted successfully' });
      } else {
        res.status(404).json({ error: 'Team not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
export default teamRoute;