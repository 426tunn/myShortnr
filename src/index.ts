import express from 'express';
import { Config } from './envConfig/config';



const app = express();
const PORT = Config.PORT || 3130;


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use("/" , require("./routes/index"))
app.use("/auth" ,require("./routes/userRouter"))
app.use("/" , require("./routes/urlRoutes"))



    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

 