const express=require("express");
const mysql=require('mysql');
const cors=require('cors');
const app=express();
// app.use(cors());
app.use(express.json());
var router=express.Router();

// app.use(session({secret: "Your secret key"}));
// var session = require('express-session');
var cookieParser = require('cookie-parser');
const { METHODS } = require("http");
app.use(cookieParser());

var User ={uname:"",uid:"",admin:"0"};

const corsOptions = {
    //To allow requests from client
    origin:["http://localhost:3000","http://172.25.80.1:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"]
  };
  
  app.use("/", cors(corsOptions), router);

const db=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"moviedb"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

app.get('/getsession',(req,res)=>{
        // var sess_c={uname:req.session.uname,uid:req.session.uid};
        console.log(User,req.headers.cookies);
        res.status(200).send(User);
    })

app.get('/getsession2',(req,res)=>{
        res.cookie("uname",User.uname).cookie("uid",User.uid);
        res.status(200).send();
    })

app.post('/Login',(req,res)=>{
    
   console.log(req.body[0],'-----yoi');
   db.query(req.body[0],function(err,result,fields){
    if (err) throw err;
    
    console.log(result,"-----dude");
    
    if(result.length!=0){

    User.uname=result[0]["Account_username"];
    User.uid=result[0]["Account_id"];
    User.admin=result[0]["admin"]
    res.cookie("uname",result[0]["Account_username"]);
    res.cookie("uid",result[0]["Account_id"])
   }

    res.status(200).send(result);
})

})

app.post('/Filter',(req,res)=>{
console.log(req.body[0]);
db.query(req.body[0],function(err,result,fields){
    if(err){
        res.status(400).send(err)}
    else{
    console.log(result);
    res.status(200).send(result);}
})
})

app.get('/logout',(req,res)=>{
    User.uname="";
    User.uid="";
 })

app.get('/Actors',(req,res)=>{

    sql="SELECT * FROM credits_detail WHERE Actor_or_crew=1 ORDER BY Popularity DESC";
    
    db.query(sql,function(err,result,fields){
        if (err) throw err;
        
        console.log(result);
        res.status(200).send(result);
    })

})
app.post('/Home',(req,res)=>{
    console.log(req.headers.cookies);
    var sql="";
   if(req.body[0]=="Home")
      sql="SELECT * FROM movie_info,movie where movie_info.movie_id=movie.id";
    else{
        sql=`SELECT * FROM movie_info,movie WHERE Genre='${req.body[0]}' and movie_info.movie_id=movie.id`;
    }

   db.query(sql,function(err,result,fields){
        if (err) throw err;
    // console.log(result);
    // console.log(req.body[0]);
    res.status(200).send(result);
   })

})


app.post('/Register',(req,res)=>{

const sql="INSERT INTO users(`Account_id`,`Account_username`,`Join_data`,`Email`,`Background`,`Rating`,`Password`) VALUES (?)";

const values =[
    req.body.id,
    req.body.name,
    req.body.join_date,
    req.body.email,
    req.body.background,
    req.body.rating,
    req.body.password
]

const sql2=`SELECT * FROM users WHERE Account_username='${req.body.name}' OR Email='${req.body.email}'`;
db.query(sql2,function(err,result,fields){
     if(err)throw err;
     console.log(result);
     if(result.length>0){
        res.status(400).send('Username or email is already taken');
     }
     else{
        db.query(sql,[values],(err,data)=>{
            if(err){
                return console.error(err.message);
            }
            console.log(result);
            return res.json(data);
        })
     }
})

})

app.post('/Addmovie',(req,res)=>{

const sql="INSERT INTO movie(`Revenue`,`Budget`,`Release_data`,`Runtime`,`Title`,`Id`,`Homepage`) VALUES (?)";

const values=[
    req.body.revenue,
    req.body.budget,
    req.body.release_date,
    req.body.runtime,
    req.body.title,
    req.body.id,
    req.body.homepage,
]

db.query(sql,[values],(err,data)=>{
    if(err){
        console.log(err);
        if(err["code"]=='ER_DUP_ENTRY'){
        res.status(400).send('Movie is already present')}
        else{
            res.status(400).send(err["sqlMessage"]);
        }
    }
    return res.json(data);
})

})

app.post('/Addmovieinfo',(req,res)=>{
const sql="INSERT INTO movie_info(`movie_id`,`Genre`,`Overview`,`Vote_Avg`,`Picture`) VALUES (?)";

const values =[
    req.body.id,
    req.body.genre,
    req.body.overview,
    req.body.voteavg,
    req.body.picture
]

db.query(sql,[values],(err,data)=>{
    if(err){
        console.log(err);
        if(err["code"]=='ER_DUP_ENTRY'){
        res.status(400).send('Movie_info is already present')}
        else{
            res.status(400).send(err["sqlMessage"]);
        }
    }
    return res.json(data);
})

})

app.get('/Report1',(req,res)=>{ 
    sql=`SELECT movie_info.Genre,count(*) as genre_count,avg(movie_info.Vote_Avg) as avg_vote,SEC_TO_TIME(AVG(TIME_TO_SEC(movie.Runtime))) as AVG_runtime FROM lists,movie,movie_info where lists.mid=movie.Id and movie.Id=movie_info.movie_id and lists.uid=${User.uid} and lists.watch=1 group by movie_info.Genre`;
    db.query(sql,function(err,result,fields){
        if (err) throw err;
        
        console.log(result);
        res.status(200).send(result);
    })

}
)
app.get('/Report2',(req,res)=>{
    sql="SELECT * FROM user_report";
    db.query(sql,function(err,result,fields){
        if (err) throw err;
        
        console.log(result);
        res.status(200).send(result);
    })
}
)

app.get('/Report3',(req,res)=>{
    sql="SELECT * FROM cast_crew_report LIMIT 20";
    db.query(sql,function(err,result,fields){
        if (err) throw err;
        
        console.log(result);
        res.status(200).send(result);
    })
})

app.post('/generalq',(req,res)=>{

    const sql=req.body.sql;

    var values=[];

    for(var k in req.body){
        console.log(k);
        if (k!="sql"){
            values.push(req.body[k]);}
    }
    console.log(values);
    db.query(sql,[values],(err,data)=>{
        if(err){
            console.log(err);
            if(err["code"]=='ER_DUP_ENTRY'){
            res.status(400).send('Entry is already present')}
            else{
                res.status(400).send(err["sqlMessage"]);
            }
        }
        return res.json(data);
    })
    
    })

app.post('/generalup',(req,res)=>{

        const sql=req.body[0];
    
        console.log(sql);
        db.query(sql,(err,data)=>{
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            return res.json(data);
        })
        
        })

app.listen(8081,()=>{
    console.log("...............listening")
})