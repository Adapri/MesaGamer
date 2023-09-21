const express = require('express')
const tictactoe = require('./tictactoe.json')

const PORT = 3000

const app = express()

app.disable('x-powered-by')

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mesa Gamer</h1>')
})

app.get('/tictactoe', (req, res) => {
  const { player } = req.query

  if (player) {
    const filteredGames = tictactoe.filter(game => {
      const playerXName = game.players.playerX.name.toLowerCase()
      const playerOName = game.players.playerO.name.toLowerCase()
      const playerNameToFindLower = player.toLowerCase()

      return playerXName === playerNameToFindLower || playerOName === playerNameToFindLower
    })

    return res.json(filteredGames)
  }
  res.json(tictactoe)
})

app.get('/tictactoe/:id', (req, res) => {
  const { id } = req.params
  const game = tictactoe.find(game => game.id === id)

  if (game) return res.json(game)

  res.status(404).json({ message: 'Game not found' })
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`)
})
