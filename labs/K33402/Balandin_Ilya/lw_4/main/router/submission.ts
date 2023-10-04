import { Router, Request, Response } from 'express';
import Competition from '../models/competition';
import Team from '../models/teamData';
import Submission from '../models/submission';

const submissionRoute = Router();



// Create a submission
submissionRoute.post('/submissions', async (req: Request, res: Response) => {
    // Request body should contain submission details
    const { teamId, competitionId, submissionDateTime, sourceCodeOrFileURL, evaluationScore } = req.body;
    try {
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
  
      const submission = new Submission();
      submission.teamId = teamId;
      submission.competitionId = competitionId;
      submission.submissionDateTime = submissionDateTime;
      submission.sourceCodeOrFileURL = sourceCodeOrFileURL;
      submission.evaluationScore = evaluationScore;
      await submission.save();
  
      res.json(submission);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get all submissions
  submissionRoute.get('/submissions', async (req: Request, res: Response) => {
    try {
      const submissions = await Submission.findAll();
  
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get a submission by ID
  submissionRoute.get('/submissions/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const submission = await Submission.findByPk(id);
  
      if (submission) {
        res.json(submission);
      } else {
        res.status(404).json({ error: 'Submission not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Update a submission
  submissionRoute.put('/submissions/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { teamId, competitionId, submissionDateTime, sourceCodeOrFileURL, evaluationScore } = req.body;
    try {
      const submission = await Submission.findByPk(id);
  
      if (submission) {
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
  
        submission.teamId = teamId;
        submission.competitionId = competitionId;
        submission.submissionDateTime = submissionDateTime;
        submission.sourceCodeOrFileURL = sourceCodeOrFileURL;
        submission.evaluationScore = evaluationScore;
        await submission.save();
  
        res.json(submission);
      } else {
        res.status(404).json({ error: 'Submission not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Delete a submission
  submissionRoute.delete('/submissions/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const submission = await Submission.findByPk(id);
  
      if (submission) {
        await submission.destroy();
        res.json({ message: 'Submission deleted successfully' });
      } else {
        res.status(404).json({ error: 'Submission not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  export default submissionRoute;