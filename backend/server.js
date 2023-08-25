const express = require('express');
const mysql = require('mysql')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());   

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database:"signup"
})

app.post('/signup', (req,res) => {
    const sql=" INSERT INTO login (`name` ,`email`, `password` ) VALUES (?)";
    const values =[
        req.body.name,
        req.body.email,
        req.body.userPassword
    ]
    db.query(sql,[values],(err,data) => {
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })

})


// app.post ('/signup' , (req,res ) => {
//     const name = req.body.name;
//     const email = req.body.email;
//     const userPassword =req.body.userPassword;
    
//     db.query("INSERT INTO login (name,email,password) VALUES (?,?,?)", [name,email,userPassword],
    
//     (err,result) => {
//         if(result) {
//             res.send(result);
//         }else {
//             res.send({message : "Lütfen geçerli müşteri numarası ve şifre giriniz"})
//         }
//     }
//     )

// })


app.post('/login', (req,res) => {
    const sql="SELECT * FROM login WHERE `email` = ? AND `password` = ? ";

    db.query(sql,[req.body.email,req.body.password ],(err,data) => {
        if(err){
            return res.json("Error");
        }
        if(data.lenght>0 ) {
            return res.json("Success");
        }else {
            return res.json("Failed");
        }
    })

})


app.listen(8081, ()=>{
    console.log("listening");
})