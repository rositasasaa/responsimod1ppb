import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loanRoutes from './routes/loanRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Library Loan API aktif' });
});

app.use('/api/loans', loanRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan' });
});

const PORT = process.env.PORT || 3000;

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
  });
}

export default app;
