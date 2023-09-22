import { readJSON } from '../utils.js'
const requestGame = readJSON('./requestGame.json')

export class RequestGameModel {
  static async getAll ({ type }) {
    if (type) {
      return requestGame.filter(request => {
        return request.type === type
      })
    }
    return requestGame
  }

  static async findIndex ({ playerX }) {
    const index = requestGame.findIndex(request => request.user === playerX)

    return index
  }

  static async create ({ user, type }) {
    const newRequest = {
      user,
      type
    }
    requestGame.push(newRequest)
  }

  static async delete ({ index }) {
    requestGame.splice(index, 1)
  }
}
