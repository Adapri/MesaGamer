import { Router } from 'express'
import { TicTacToeController } from '../controllers/tictactoeController.js'

export const tictactoeRouter = Router()

tictactoeRouter.get('/', TicTacToeController.getAll)
tictactoeRouter.post('/', TicTacToeController.create)

tictactoeRouter.get('/:id', TicTacToeController.getById)
tictactoeRouter.patch('/:id', TicTacToeController.update)
