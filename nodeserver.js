const express = require('express');


const app = express();
const PORT = process.env.PORT | 3000;


app.get('/', (req,res)=>{
    res.json({message:"hello motherfuckers"});
});


app.listen(PORT, ()=>{
    console.log(`server is listening on ${PORT}`);
})