import zod from 'zod'

const requestGameSchema = zod.object(
  {
    user: zod.string(),
    type: zod.enum(['online', 'IA'])
  }
)

export function validateRequestGame (object) {
  return requestGameSchema.safeParse(object)
}
