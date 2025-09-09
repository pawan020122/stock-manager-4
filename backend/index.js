import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';



import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';


dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: [
    "https://stock-manager-4-khaki.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true, // if you’re using cookies or auth headers
}));

app.get("/", (req, res)=>{
    res.send("API is running...");
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);


app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: 'Server error' });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log("Server running on port", PORT);
});




// https://stock-manager-4.onrender.com