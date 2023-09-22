import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'
const tictactoe = readJSON('./tictactoe.json')

export class TicTacToeModel {
  static async getAll () {
    return tictactoe
  }

  static async getById ({ id }) {
    const game = tictactoe.find(game => game.id === id)
    return game
  }

  static async create ({ playerX, playerO }) {
    const newGame = {
      id: randomUUID(),
      playerX,
      playerO,
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      moves: [],
      winner: ''
    }

    tictactoe.push(newGame)

    return newGame
  }

  static async update ({ id, input }) {
    const gameIndex = tictactoe.findIndex(game => game.id === id)

    if (gameIndex < 0) { return null }

    const updateGame = {
      ...tictactoe[gameIndex],
      ...input
    }

    tictactoe[gameIndex] = updateGame

    return updateGame
  }
}
