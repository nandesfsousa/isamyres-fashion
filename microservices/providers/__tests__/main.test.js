const Inventory = require("../src/main")

describe('testing inventory main', () => {
    const i = {
        barCode: '',
        quantity: 10,
        entityId: '',
        itemId: '',
        itemSizeId: '',
        warehouseId: '',
        purchasedRate: 32.12,
        saleRate: 36.50,
    }
    test('inputInventory function', () => {
        expect(Inventory.inputInventory([i])).toBe("{}");
    });
});