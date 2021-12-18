import { PrismaClient } from '@prisma/client'
import express from 'express'


export type EntityInput = {
  name: string,
  cnpj: string
}

const prisma = new PrismaClient()

const app = express()


app.use(express.json())


app.get('/', async (req, res) => {
  const entitys = await prisma.entity.findMany({})
  res.json({
    success: true,
    payload: entitys,
    message: "Operation Successful",
  })
})

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});


app.listen(3001, () =>
  console.log('REST API server ready at: http://localhost:3001'),
)
