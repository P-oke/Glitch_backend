const express = require("express");
const app = express();
const csvtojson=require("csvtojson")
const fs=require("fs")
const csvfilepath="file.csv"
const uuid=require("uuid")
const output=require("./output.json")

app.use(express.json())

app.post("/", (req, res)=>{
  res.status(201).send({
    url:req.body.url,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    age:req.body.age

  })

})

app.get("/", (req, res)=>{
    res.status(200).send({
        "conversion_key":uuid.v4(),
        "json": output

    })
})

csvtojson()
.fromFile(csvfilepath)
.then(json=>{
    
    //used to generate the output.json
    // fs.writeFileSync("output.json", JSON.stringify(json), "utf-8", (err)=>{
    //     if(err) throw err
    // })
}) 
    

.catch(err=>console.log(err.messsage))

const port=process.env.PORT||3000

app.listen(port, ()=>{
console.log(`server running on port ${port}`);
})