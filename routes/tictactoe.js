import { Router } from 'express'
import { validateRequestGame } from '../schemas/request.js'
import { validateGame } from '../schemas/tictactoe.js'
import { TicTacToeModel } from '../models/tictactoe.js'
import { RequestModel } from '../models/request.js'

export const tictactoeRouter = Router()

tictactoeRouter.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const games = await TicTacToeModel.getAll()
  res.json(games)
})

tictactoeRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const game = await TicTacToeModel.getById({ id })

  if (game) { return res.json(game) }

  res.status(404).json({ message: 'Game not found' })
})

tictactoeRouter.post('/', async (req, res) => {
  const result = validateRequestGame(req.body)

  if (result.error) {
    return res.status(402).json({ error: JSON.parse(result.error.message) })
  }

  const { user, type } = result.data

  const filteredrequestGames = await RequestModel.getAll({ type })

  if (filteredrequestGames.length > 0) {
    const playerX = filteredrequestGames[0].user
    const playerO = user

    const index = await RequestModel.findIndex({ playerX })

    if (index !== -1) {
      requestGame.splice(index, 1)
    }

    const newGame = await TicTacToeModel.create({ playerX, playerO })
    console.log(newGame)
    return res.status(201).json(newGame)
  } else {
    requestGame.push({ user, type })
    return res.status(201).json({ message: 'Buscando rival' })
  }
})

tictactoeRouter.patch('/:id', async (req, res) => {
  const result = validateGame(req.body)

  if (result.error) {
    return res.status(402).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const input = result

  const updateGame = await TicTacToeModel.update({ id, input })

  if (updateGame === null) {
    return res.status(404).json({ message: 'Partida no encontrada' })
  }
  return res.json(updateGame)
})