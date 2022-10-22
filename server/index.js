const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const mysql = require('mysql2/promise')
const config = require('./config')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get("/",async function (req,res){
        try {
            const connection = await mysql.createConnection(config.db)
            const [result,] = await connection.execute('select * from task')

            if (!result) result=[]
            res.status(200).send(result)

        }catch(err){
            res.status(500).json({error: err.message})
        }
})

app.listen(port)