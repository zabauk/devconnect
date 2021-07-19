const express=require('express');
const app=new express();

//default end point
app.get('/', (req, res)=>res.send('API Server is running'));

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server is running on ${PORT}`));