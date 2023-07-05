import swaggerAutogen from "swagger-autogen";
import { Config } from './envConfig/config';  

console.log(Config.HOST_URL);

const doc = {
   info: {
    title: "myShortnr API",
    description: "myShortnr API documentation"
   },
   host: Config.HOST_URL,
   schemes: ['http', 'https'],
};

const endpointsFiles: string[] = [
"./routes/userRoute.js",
   "./routes/urlRoute.js",
 ];

 const outputFile: string = "./swagger-output.json";

swaggerAutogen(outputFile, endpointsFiles, doc);