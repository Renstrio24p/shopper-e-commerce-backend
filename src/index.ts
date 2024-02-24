import { Request, Response } from 'express';
import { app, modules, mongo, mongo_compass } from './config/config';
import { imageEngine } from './routes/images';
import { router } from './routes/product';
import { userRoutes } from './routes/users';

app.use(modules.express.json());
app.use(modules.cors({
  origin: [
    // Admin Origin Port
    `http://localhost:5700`,
    // Destination Port
    `http://localhost:5600`, 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Database Connection
modules.mongoose.connect(mongo.url);

// API Creation
app.get('/', (_req: Request, res: Response) => {
  res.send(`<p>Node TS Express is Running</p>`);
});

imageEngine()
router()
userRoutes()

// connect to online Mongodb
app.listen(mongo.port, (e?: NodeJS.ErrnoException) => {
  if (!e) {
    console.log(`Node TS Server is running on port ${mongo.port}`);
    console.log(`Mongodb successfully connected to Node TS Server.`);
  } else {
    console.error(`Error starting server: ${e.message} connecting to online`);
  }
});
