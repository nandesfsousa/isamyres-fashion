import { PrismaClient } from '@prisma/client'
import express from 'express'


export type InventoryInput = {
  barCode: string;
  quantity: number;
  entityId: string;
  itemId: string;
  itemSizeId: string;
  warehouseId: string;
  purchasedRate: number;
  saleRate: number;
}
export type InventoryOutput = {
  id: string;
  itemId: string;
  itemSizeId: string;
  quantity: number;
}

const prisma = new PrismaClient()

export function inputInventory(list: InventoryInput[]): string{
  var batchs = []
  batchs.push(prisma.inventory.createMany({ data: list, skipDuplicates: true }))
  list.map((_i) => {
    const ib = prisma.item.update({
      where: { id: _i.itemId },
      data: { quantityInHand: { increment: _i.quantity } }
    })
    const is = prisma.itemSize.update({
      where: { id: _i.itemSizeId },
      data: { quantityInHand: { increment: _i.quantity } }
    })
    batchs.push(is)
  })
  try {
    return JSON.stringify(prisma.$transaction(batchs))
  } catch (error) {
    return "Fail"
  }
}
/**
export function outputInventory(list: InventoryOutput[]): string {
  var batchs = []
  list.map((_i) => {
    const it = prisma.inventory.update({
      where: { id: _i.id },
      data: { quantity: { increment: _i.quantity } }
    })
    const ib = prisma.item.update({
      where: { id: _i.itemId },
      data: { quantityInHand: { increment: _i.quantity } }
    })
    const is = prisma.itemSize.update({
      where: { id: _i.itemSizeId },
      data: { quantityInHand: { increment: _i.quantity } }
    })
    batchs.push(it)
    batchs.push(ib)
    batchs.push(is)
  })
  try {
    return JSON.stringify(prisma.$transaction(batchs))
  } catch (error) {
    return "Fail"
  }
}
 */
const app = express()


app.use(express.json())


app.get('/', async (req, res) => {
  const products = await prisma.item.findMany()
  res.json({
    success: true,
    payload: products,
    message: "Operation Successful",
  })
})

app.post('/input-inventory', async (req, res) => {
  const response = inputInventory(req.body.list)
  res.json({
    success: true,
    payload: {},
    message: response,
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


app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)
