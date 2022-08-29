const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const Port = process.env.PORT || 5000
const Schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql')
const connectDB = require('./config/db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect Database
connectDB()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
  })
)

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`)
})
