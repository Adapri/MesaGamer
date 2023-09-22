import zod from 'zod'

const moveSchema = zod.object(
  {
    player: zod.string(),
    row: zod.number().int().min(0).max(2),
    col: zod.number().int().min(0).max(2)
  }
)

const tictactoeSchema = zod.object(
  {
    board: zod.array(zod.array(zod.enum(['', 'X', 'O']))),
    moves: zod.array(moveSchema),
    winner: zod.enum(['', 'x', 'o', 'Empate'])
  }
)

export function validateGame (object) {
  return tictactoeSchema.safeParse(object)
}
