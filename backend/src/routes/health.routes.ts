import { Router } from 'express';
const router = Router();

// Health check route
router.get('/', (_, res) => {
  res.json({
    status: 'ok',
    service: 'birthday-song-backend',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000
  });
});

export default router;
