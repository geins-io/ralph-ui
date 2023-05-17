export const updateProductQuantityInCart = ({
  gtmInputs,
  products,
  previousQuantity,
  currentQuantity
}) => {
  if (currentQuantity > previousQuantity) {
    addToCart({ gtmInputs, products });
    return;
  }
  removeFromCart({ gtmInputs, products });
};

export const addToCart = ({ gtmInputs: { gtm, currency, key }, products }) => {
  if (gtm) {
    gtm.push({
      event: 'Add to Cart',
      ecommerce: {
        currencyCode: currency,
        add: {
          [`${key}`]: products
        }
      },
      'gtm.uniqueEventId': 11
    });
  }
};

export const removeFromCart = ({
  gtmInputs: { gtm, currency, key },
  products
}) => {
  if (gtm) {
    gtm.push({
      event: 'Remove from Cart',
      ecommerce: {
        currencyCode: currency,
        remove: {
          [`${key}`]: products
        }
      },
      'gtm.uniqueEventId': 12
    });
  }
};

// mapper to match gtm event interface with data from api
export const transformProductForGTM = items => {
  return items.map(item => ({
    id: item.productId,
    name: item.name,
    brand: item.brand?.name,
    category: item.primaryCategory?.name,
    price: item.unitPrice?.sellingPriceExVat,
    tax: item.unitPrice.vat,
    quantity: item.quantity,
    variant: item.skus.find(i => i.skuId === item.skuId).name,
    sku: item.skuId
  }));
};
