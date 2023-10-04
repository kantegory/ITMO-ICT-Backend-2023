import { Router, Request, Response } from 'express';
import Competition from '../models/competition';



const competitionRoute = Router();


//getAll competitions
competitionRoute.get('/show', async (req: Request, res: Response) => {
    try {
      const competitions = await Competition.findAll();
      res.json(competitions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


//getById
competitionRoute.get('/show/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const competition = await Competition.findByPk(id);
      if (competition) {
        res.json(competition);
      } else {
        res.status(404).json({ error: 'Competition not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //create new
  competitionRoute.post('/addCompetition', async (req: Request, res: Response) => {
    const { title, description, startDate, endDate } = req.body;
    try {

      const competition =  new Competition() 
        competition.title =  title;
        competition.description =  description,
        competition.startDate = startDate,
        competition.endDate = endDate,
        await competition.save()
      res.json(competition);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //update a compettion

competitionRoute.put('/update/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, startDate, endDate } = req.body;
  
    const competition = await Competition.findByPk(id);
    if (competition) {
      competition.title = title;
      competition.description = description;
      competition.startDate = startDate;
      competition.endDate = endDate;
      await competition.save();
      res.json(competition);
    } else {
      res.status(404).json({ error: 'Competition not found' });
    }
});


//delete competition

competitionRoute.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const competition = await Competition.findByPk(id);
      if (competition) {
        await competition.destroy();
        res.json({ message: 'Competition deleted successfully' });
      } else {
        res.status(404).json({ error: 'Competition not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  export default competitionRoute;


  

  
