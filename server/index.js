import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Product from './models/product.model.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path'

dotenv.config()

const app = express()

const __dirname = path.resolve()

app.use(express.json())

app.use('/api/products',productRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/client/dist")))

    app.use('*',(req,res) =>{
        res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
    })
}

mongoose.connect(process.env.MONGODB_URL)
.then( ()=>{
    app.listen(3000,()=>{
        console.log("Connected to DB")
    })
})
.catch(error => {
    console.log(error)
})