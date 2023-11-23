const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const path=require('path');
require('./utils/db')
require('dotenv').config();
const PORT=process.env.PORT ;

const bodyparser=require('body-parser');
const userRoutes=require('./routes/userRoute')
const emailRoutes=require('./routes/emailRoute')
const projectRoutes=require('./routes/projectRoute')


const app=express();

// Cors
app.use(cors(
    {
        origin: ['http://localhost:5555', 'http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));



app.use(cookieParser())
app.use(bodyparser.json());
//API starter calls
app.use('/api',userRoutes);
app.use('/api',emailRoutes);
app.use('/api',projectRoutes);


app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send("Hello World");
});

app.listen(PORT, 'localhost'); // or server.listen(3001, '0.0.0.0'); for all interfaces
app.on('listening', function() {
    console.log('Express server started on port %s at %s', app.address().port, app.address().address);
});