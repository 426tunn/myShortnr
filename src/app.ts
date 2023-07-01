import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import router from './routes/urlRoute';
import logger from './Logger/logger';
import userRouter from './routes/userRoute';
import cookieParser from 'cookie-parser';
import { connectDB } from './db';
import swaggerjsdoc, {Options} from 'swagger-jsdoc'
import swaggerui from 'swagger-ui-express'
import { Config } from './envConfig/config';  


const app = express();
const PORT = Config.PORT; // Replace with your desired port number

connectDB();
app.use(cookieParser())

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  headers: true, // Return rate limit info in the `RateLimit-*` headers
});

 const options: Options = {
    definition: {
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "API documentation using Swagger",
      },
      openai: "3.0.0",
      servers: [
        {
          url: "http://localhost:3020"
        },
      ],
    },
    apis: ["./routes/*.ts"]
}


const spacs =swaggerjsdoc(options)
app.use('api-doc',
swaggerui.serve,
swaggerui.setup(spacs)
)

app.use(limiter);

app.use('/url', router);   
app.use('/auth', userRouter);
 
app.get('/', (req: Request, res: Response) => {
  res.render('index'); 
});

app.get('/create', (req: Request, res: Response) => {
  res.render('create');
});

app.get("/enter" , (req,res) => {
	res.render("enter")
})

app.get("/urlpage" , (req,res) => {
	res.render("urlpage")
})

app.get('/main', (req: Request, res: Response) => {
  res.render('main');  
});

app.get('*', function(req: Request, res: Response) {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  logger.info(`Server running on localhost:${PORT}`);
});
