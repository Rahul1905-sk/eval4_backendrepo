const express = require('express')
const { myServer } = require('./configs/db')
const { userRoutes } = require('./routes/User.routes') 
const { postRoutes } = require('./routes/Post.routes')
const { auth } = require('./middleware/auth.middleware')
const cors = require('cors');


require('dotenv').config()



const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())


app.use('/users', userRoutes)
 
app.use(auth)
app.use('/posts', postRoutes)


app.listen(PORT, async()=> {

    try {
        await myServer;
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }

console.log(`server started at` +' '+PORT);
})