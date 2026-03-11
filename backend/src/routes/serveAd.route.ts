import { Router } from 'express';

import { serveAd } from '@/controllers/serverAd.controller';

const router = Router();

router.post('/', serveAd);

export default router;
