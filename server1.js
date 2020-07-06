const express =require('express');
const bodyParser= require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controller/register.js');
const signin=require('./controller/signin.js');
const image=require('./controller/image.js');
const profile=require('./controller/profile.js');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-colorful-57192',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{res.send('this is working')})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req, res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3001,()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})