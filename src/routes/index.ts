import express from 'express';
import { home, create, enter, urlpage, about } from '../controllers/page';

const pagesRouter = express.Router();

pagesRouter.get('/', home);
pagesRouter.get('/create', create); 
pagesRouter.get('/enter', enter);
pagesRouter.get('/urlpage', urlpage);
pagesRouter.get('/about', about); 

export default pagesRouter;
 