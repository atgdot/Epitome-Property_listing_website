import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan'
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import propertyRouter from './routes/addproperty-router.js'
import addUserRouter from './routes/addUser-route.js'
import addAgentRouter from './routes/addAgent-router.js'
dotenv.config(); // Load environment variables




connectDB()
const app = express();

app.use(morgan("tiny"));
// Middleware
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(helmet({
    crossOriginEmbedderPolicy: false,
  }));


app.get('/test', (req, res) => {
    res.json({ message: 'Hello World' });
    
})

//rouets
app.use('/api/v1/admin-dashboard/property' , propertyRouter)
app.use('/api/v1/admin-dashboard/user' , addUserRouter)
app.use('/api/v1/admin-dashboard/user' , addAgentRouter)





const PORT = process.env.PORT || 3000;


app.listen(PORT , () =>{
    console.log(`Server running on port ${PORT}`);
    
})