import express from 'express';
import { home, create, enter, urlpage} from '../controllers/page';

const pagesRouter = express.Router();

pagesRouter.get('/', home);
pagesRouter.get('/create', create); 
pagesRouter.get('/enter', enter);
pagesRouter.get('/urlpage', urlpage);


export default pagesRouter;
 