import { readJSON } from '../utils'
const requestGame = readJSON('./requestGame.json')

export class RequestModel {
  static async getAll ({ type }) {
    if (type) {
      return requestGame.filter(request => {
        return request.type === type
      })
    }
    return requestGame
  }

  static async findIndex ({ playerX }) {
    requestGame.findIndex(request => request.user === playerX.user)
  }
}
