import  mongoose from 'mongoose'
import { app } from './app'

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-serv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log("Listening on 3000!")
  })
}

start()