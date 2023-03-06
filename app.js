const express=require('express');
const app=express();
const nodemailer=require('nodemailer');
const credential=require('./credential')
const bodyparser=require('body-parser')
const port=3000;

const fs=require('fs');
app.use(bodyparser.urlencoded({extended:true}))
// taking images static

app.use("/images",express.static('images'))

//static videos
// app.use(express.static('videos'));

//  css links 
app.use(express.static('styles'));

// fetching data from form 
app.post('/',(req,res)=>{
    const email=req.body.email;
    const number=req.body.number;
    const msg=req.body.message;
    console.log(email)
    
    var transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:credential.user,pass:credential.pass
        }
    })

    var mailoptions={
        from: "dainacraft11@gmail.com",
        to:email,
        subject:"thanks for giving feedback",
        html:`<b> My number:${number}</b><br><p>${email}</p><br><p>Message:${msg}</p>`,
       

    }

    transporter.sendMail(mailoptions, function(error, info){
        if(error){
        console.log(error); 
        }else{ 
        res.send("Mail sent Successfully")
        console.log('email sent'+info.response)
        }
    })
})

// register with ejs 
app.set('view engine','ejs')

// sending file based on url 
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about-us')
})
app.get('/gallery',(req,res)=>{
    res.render('gallery')
})
app.get('/download',(req,res)=>{
    res.render('download')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})

// redirect
app.get('/home',(req,res)=>{
    res.redirect('/')
})
app.get('/about-us',(req,res)=>{
    res.redirect('about')
})


app.use(function(req,res){
    res.status(404).render('error');
})
app.listen(port,(err)=>{
    if(err)
    throw err;
    console.log('server is running at 3000')
})
    
