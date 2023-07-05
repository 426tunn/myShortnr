import  {config} from "dotenv";
import path from "path";
config();
// ((): void => {
//   config({
//     path: path.join(__dirname, "../../../", ".env"),
//   });
// })();


// console.log(process.env.PORT);

var getConfig = function() {
    return {
        PORT: Number(process.env.PORT || 3010),
        DBURL: String(process.env.DBURL),
        JWTSecret: String(process.env.JW_TOKEN),
        HOST_URL: String(process.env.HOST_URL)
    }
}

export const Config = getConfig();
