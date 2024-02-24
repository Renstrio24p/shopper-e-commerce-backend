import { Request, Response } from 'express';
import { app, modules, mongo, mongo_compass } from './config/config';
import { imageEngine } from './routes/images';
import { router } from './routes/product';
import { userRoutes } from './routes/users';

app.use(modules.express.json());
app.use(modules.cors({
  origin: [
    // Admin Origin Port
    `http://localhost:${mongo.admin_port}`,
    // Destination Port
    `http://localhost:${mongo_compass.dest_port}`, 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'auth-token']
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
