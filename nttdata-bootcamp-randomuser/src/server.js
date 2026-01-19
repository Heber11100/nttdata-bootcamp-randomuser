// Framework: Express (documentación: https://expressjs.com/)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getUsers } from './services/randomUserService.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers(10);
    res.json({ count: users.length, data: users });
  } catch (err) {
    console.error('Error /api/users:', err);
    res.status(502).json({ error: 'Upstream service failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
