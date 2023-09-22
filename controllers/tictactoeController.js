import { TicTacToeModel } from '../models/tictactoe.js'
import { validateRequestGame } from '../schemas/requestGame.js'
import { validateGame } from '../schemas/tictactoe.js'
import { RequestGameModel } from '../models/requestGame.js'

export class TicTacToeController {
  static async getAll (req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    const games = await TicTacToeModel.getAll()
    res.json(games)
  }

  static async getById (req, res) {
    const { id } = req.params

    const game = await TicTacToeModel.getById({ id })

    if (game) { return res.json(game) }

    res.status(404).json({ message: 'Game not found' })
  }

  static async create (req, res) {
    const result = validateRequestGame(req.body)

    if (result.error) {
      return res.status(402).json({ error: JSON.parse(result.error.message) })
    }

    const { user, type } = result.data

    const filteredrequestGames = await RequestGameModel.getAll({ type })

    if (filteredrequestGames.length > 0) {
      const playerX = filteredrequestGames[0].user
      const playerO = user

      const index = await RequestGameModel.findIndex({ playerX })

      if (index !== -1) {
        await RequestGameModel.delete({ index })
      }

      const newGame = await TicTacToeModel.create({ playerX, playerO })

      return res.status(201).json(newGame)
    } else {
      await RequestGameModel.create({ user, type })

      return res.status(201).json({ message: 'Buscando rival' })
    }
  }

  static async update (req, res) {
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
  }
}
