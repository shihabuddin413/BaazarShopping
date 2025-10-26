

class CartItemModel {

  constructor(item, count) {
    this.id = item.id,
    this.cartItem = item;
    this.quantity = count;
  }

  partialBill() {
    return (this.cartItem.price * this.quantity);
  }
}

export default CartItemModel;










