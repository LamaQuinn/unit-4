

const express=require('express')
const cors=require('cors')
const app=express()


const {addPost,getAllPosts,getCurrentUserPosts,editPost,deletePost} = require('./controllers/posts')
const {login,register}=require('./controllers/auth')


const {sequelize}=require('./util/database')
const {Post}=require('./models/post')
const {User}=require('./models/user')

app.use(express.json())
app.use(cors())


User.hasMany(Post)
Post.belongsTo(User)

app.post('/register',register)
app.post('/login',login)
app.get('/posts',getAllPosts)
app.get('/userposts/:userId',getCurrentUserPosts)
app.post('/posts',addPost)
app.put('/posts/:id',editPost)
app.delete('/posts/:id',deletePost)




sequelize.sync()
.then(()=>{
    app.listen(4004,()=>console.log('Running on port 4004.'))
})


