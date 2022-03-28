export class GtmService {
  getCheckoutUpdate(oldItems, newItems) {
    const newCartItems = newItems.slice();
    const getProductId = ({ product }) => product?.productId;

    for (const item of oldItems) {
      const itemIndex = newCartItems.findIndex(
        newItem => getProductId(newItem) === getProductId(item)
      );
      const newItem = newCartItems[itemIndex];

      if (itemIndex !== -1 && newItem.quantity !== item.quantity) {
        const isRemove = newItem.quantity < item.quantity;
        const remain = newItem.quantity - item.quantity;
        return {
          isRemove,
          products: this.transformProduct([
            {
              ...newItem,
              quantity: isRemove ? -remain : remain
            }
          ])
        };
      } else if (itemIndex === -1) {
        return { isRemove: true, products: this.transformProduct([item]) };
      }

      if (itemIndex !== -1) {
        newCartItems.splice(itemIndex, 1);
      }
    }

    if (newCartItems.length) {
      return { isRemove: false, products: this.transformProduct(newCartItems) };
    }

    return { isSame: true };
  }

  transformProduct(items) {
    return items.map(item => ({
      id: item.product.productId,
      name: item.product.name,
      brand: item.product.brand?.name,
      category: item.product.primaryCategory?.name,
      price: item.unitPrice?.sellingPriceExVat,
      tax: item.unitPrice.vat,
      quantity: item.quantity,
      variant: item.product.skus.find(i => i.skuId === item.skuId).name,
      sku: item.skuId
    }));
  }
}

export default new GtmService();
