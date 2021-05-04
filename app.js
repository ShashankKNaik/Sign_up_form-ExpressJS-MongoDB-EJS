var express=require("express")
const mongoose=require("mongoose")

var app=express()

app.set("view engine","ejs")

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({
	extended:true
}))
app.use(express.static(__dirname))
mongoose.connect('mongodb://localhost:27017/formdata')

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"))
db.once('open', function(callback){
	console.log("connection sucessful")
})

app.post('/signup',(req,res)=>{

	var info={
		"name":req.body.name,
		"email":req.body.email,
		"phoneNo":req.body.pn,
		"gender":req.body.gender,
		"age":req.body.age
	}

	db.collection('userdata').insertOne(info,(err,collection)=>{
		if(err) throw err;
		 console.log("Record inserted")
	})
	
	res.render("signup")
})

app.get('/details',(req,res)=>{
	db.collection('userdata').find({}).toArray((err, result)=>{
		if(err) throw err;
		
		details=JSON.stringify(result)
		res.render("display",{details:details})
	})
})


app.get('/',(req,res)=>{
	res.render("signup")
}).listen(PORT)