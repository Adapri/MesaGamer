const zod = require('zod')

const requestGameSchema = zod.object(
  {
    user: zod.string(),
    type: zod.enum(['online', 'IA'])
  }
)

function validateGame (object) {
  return requestGameSchema.safeParse(object)
}

module.exports = {
  validateGame
}
