const express = require('express')
const app = express();
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/spunkDB',{
    useNewUrlParser: true,
  
    useUnifiedTopology: true
});
const Post = mongoose.model('Post', new mongoose.Schema({ title:String,content:String,upvotes:Number,thumburl:String }));
app.listen(3000,()=>{
    console.log("server running");
})

app.get('/:t/:c/:u',(req,res)=>{
   const newpost = new Post({
       title:req.params.t,
       content:req.params.c,
       upvotes:60,
       thumburl:req.params.u
   })
  newpost.save((err,con)=>{
      if(err)
      console.log(err)
      else
      console.log("post was saved succesfully")
  })
})


app.get("/",async (req,res)=>{
    let postarray;
    const posts = await Post.find({}).then((post)=>{
      
       postarray =[...post] ;
      
    
       
        
    }).catch(err=>console.log(err))
  
 

  console.log(postarray);

    res.render('index',{posts:postarray})
})

app.get("/admin",(req,res)=>{
    res.render("adminpanel")
})