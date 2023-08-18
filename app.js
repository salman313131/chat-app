const express = require('express')
const cookieParser = require('cookie-parser'); 
const fs = require('fs')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/login',(req,res,next)=>{
    res.send('<form action="/" method="POST"><input type="text" name="user"><button>Login</button></form>')
})
app.get('/',(req,res,next)=>{
    fs.readFile('hello.txt', 'utf-8', (err, data) => {
      if (err) {
        res.send('<p>nothing to display</p><form action="/" method="POST"><input type="text" name="message"><button>Send</button></form>')
      } else {
        res.send(`<p>${data}</p><form action="/" method="POST"><input type="text" name="message"><button>Send</button></form>`)
      }
    })
})
app.post('/',(req,res,next)=>{
    if(req.body.user){
        const name = req.body.user;
        res.cookie('username',name)
        res.redirect('/')
    }
    if(req.body.message){
        const data = req.body.message
        const userName = req.cookies.username;
        fs.appendFileSync('hello.txt',`${userName}:${data} `)
    }
})

app.listen(8000)