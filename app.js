import express, { json } from 'express'
import { tictactoeRouter } from './routes/tictactoe.js'

const PORT = process.env.PORT ?? 3000

const app = express()

app.disable('x-powered-by')

app.use(json())

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mesa Gamer</h1>')
})

app.use('/tictactoe', tictactoeRouter)

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`)
})
