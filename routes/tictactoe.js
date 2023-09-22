import { Router } from 'express'
import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'
import { validateRequestGame } from '../schemas/request.js'
import { validateGame } from '../schemas/tictactoe.js'

const tictactoe = readJSON('./tictactoe.json')
const requestGame = readJSON('./requestGame.json')

export const tictactoeRouter = Router()

tictactoeRouter.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.json(tictactoe)
})

tictactoeRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const game = tictactoe.find(game => game.id === id)

  if (game) return res.json(game)

  res.status(404).json({ message: 'Game not found' })
})

tictactoeRouter.post('/', (req, res) => {
  const result = validateRequestGame(req.body)

  if (result.error) {
    return res.status(402).json({ error: JSON.parse(result.error.message) })
  }

  const { user, type } = result.data

  const filteredrequestGames = requestGame.filter(request => {
    return request.type === type
  })

  if (filteredrequestGames.length > 0) {
    const newGame = {
      id: randomUUID(),
      playerX: filteredrequestGames[0].user,
      playerO: user,
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      moves: [],
      winner: ''
    }

    const index = requestGame.findIndex(request => request.user === filteredrequestGames[0].user)

    if (index < 0) {
      requestGame.splice(index, 1)
    }

    tictactoe.push(newGame)
    res.status(201).json(newGame)
  } else {
    requestGame.push({ user, type })
    res.status(201).json({ message: 'Buscando rival' })
  }
})

tictactoeRouter.patch('/:id', (req, res) => {
  const result = validateGame(req.body)

  if (result.error) {
    return res.status(402).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const gameIndex = tictactoe.findIndex(game => game.id === id)

  if (gameIndex < 0) {
    return res.status(404).json({ message: 'Partida no encontrada' })
  }

  console.log(gameIndex)

  const updateGame = {
    ...tictactoe[gameIndex],
    ...result.data
  }

  tictactoe[gameIndex] = updateGame

  return res.json(updateGame)
})
