const UserController = require('../controllers/user');
const  UserAuth = require('./middlewares/auth');

module.exports = (app) => {
    
    const service = new UserController();

    app.post('/user/signup', async (req,res,next) => {
        try {
            const { name, email, password } = req.body;
            const { data } = await service.SignUp({ name, email, password}); 
           return res.json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.post('/user/login',  async (req,res,next) => {
        
        try {
            
            const { email, password } = req.body;
    
            const { data } = await service.SignIn({ email, password});
    
            return res.json(data);

        } catch (err) {
            next(err)
        }

    });
     

    app.get('/user/profile', UserAuth ,async (req,res,next) => {

        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });
            return res.json(data);
            
        } catch (err) {
            next(err)
        }
    });
    
}