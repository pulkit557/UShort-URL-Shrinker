const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')

const app=express()

// const DB='mongodb+srv://pulkitsharma0607:pulkit@cluster0.wqj1mnb.mongodb.net/?retryWrites=true&w=majority'

// mongoose.connect(DB,{
//     useNewUrlParser : true,useCreateIndex: true,useUnifiedTopology : true,useFindAndModify:false
// }).then(()=> {
//     console.log('connection successful');
// }).catch((err) => console.log('no connection'));

mongoose.connect('mongodb+srv://pulkitsharma0607:pulkit@cluster0.wqj1mnb.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser :true,useUnifiedTopology:true
})


app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false}))

app.get('/',async (req,res)=>{
 const shortUrls = await ShortUrl.find()
 res.render('index',{ shortUrls: shortUrls})
})

app.post('/shortUrls',async (req,res)=>{
 await ShortUrl.create({ full: req.body.fullUrl })
 res.redirect('/')
})

app.get('/:shortUrl',async (req,res) =>{
    const shortUrl= await ShortUrl.findOne({ short:req.params.shortUrl })

    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)

})

app.listen(process.env.PORT || 5000)

  