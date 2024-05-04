import express from "express";
import fs from "fs"
let app=express();
let port=8000

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))
app.set("view engine","ejs")

app.get("/" , (req,res) =>{
    fs.readdir("./tasks",(err,files) => {
        res.render("tasklisthome",{files:files})
    })
})

// route to create task

app.post("/create" ,(req,res) => { 
    let title=req.body.title
    let taskdata=req.body.taskdata
  
let filename=title.split(' ').join('')

    fs.writeFile(`./tasks/${filename}.txt`,taskdata,()=>{
        console.log("task created succesfully");
        res.redirect("/")
    })
})


// route to show data of tasks

app.get("/file/:filename" ,function (req,res) {
  
    let a=req.params.filename.split(".")[0]
    fs.readFile(`./tasks/${req.params.filename}`,"utf-8",(err,filedata)=>{
res.render("show",{filename:a,filedata:filedata})
    })
})

app.get("/delete/:filename" ,function (req,res) {
  
   fs.unlink(`./tasks/${req.params.filename}`,()=>{
    console.log("Succesfully file deleted");
   })
   res.redirect("/")
})

app.get("/edit/:filename" ,function (req,res) {
  
   res.render("edit",{oldfile:req.params.filename})
 })

 app.post("/editname" ,function (req,res) {

       if(req.body.newtaskdata  && req.body.newtitle)
       {
        fs.writeFile(`./tasks/${req.body.oldtitle}`,`${req.body.newtaskdata}`,(err,data) =>{
            fs.rename(`./tasks/${req.body.oldtitle}`,`./tasks/${req.body.newtitle}.txt`,(err)=>{
                res.redirect("/") 
               })
        })
       }
    else{   

       if(req.body.newtaskdata){
        fs.writeFile(`./tasks/${req.body.oldtitle}`,`${req.body.newtaskdata}`,(err,data) =>{
            res.redirect("/") 
         })
       }

       if(req.body.newtitle){
        fs.rename(`./tasks/${req.body.oldtitle}`,`./tasks/${req.body.newtitle}.txt`,(err)=>{
            res.redirect("/") 
           })
       }

    }

 
  })

app.listen(port,()=>{
    console.log("server is listening on port ",port);
})