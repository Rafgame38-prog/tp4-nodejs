import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRouter.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';
import { createDefaultAdmin } from './initAdmin.js';
dotenv.config();

const app = express();
app.use(express.json());

await connectDB();
await createDefaultAdmin();
app.use('/users', userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
