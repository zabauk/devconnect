const express=require('express');
const connectDB= require('./config/db');

const app=express();
//default end point
app.get('/', (req, res)=>res.send('API Server is running'));

//connect database
connectDB();

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server is running on ${PORT}`));