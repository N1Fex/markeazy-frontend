import {isUserValid} from "../utils/JwtUtils";

function saveProductLocally(product) {
  const cart = getLocalCart();
  const index = cart.findIndex(pr => pr.id === product.id);

  if (index !== -1) {
    cart[index].amount += 1;
  } else {
    cart.push({
      id: product,
      amount: 1
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeProductLocally(productId) {
  const cart = getLocalCart();
  const newCart = cart.filter(el => el.id !== productId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  return newCart;
}

function changeProductAmountLocally(productId, amount) {
  const cart = getLocalCart();

  const newCart = cart.map(pr => {
    return {
      id: pr.id,
      amount: pr.id === productId ? amount : pr.amount
    }
  });

  localStorage.setItem("cart", JSON.stringify(newCart));

}

function saveProductsInCartLocally(products) {
    localStorage.setItem("cart", JSON.stringify(products));
}

export function saveProductsInCart(products) {
  const items = products.map(pr => {
    return {
      id: pr.product.id,
      amount: pr.quantity,
    }
  });
  if (isUserValid()) {
    //todo
  } else {
    saveProductsInCartLocally(items);
  }
}

export function getLocalCart() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function addProductToCart(product) {

  if (isUserValid()) {
    console.log("Сохранение в корзину продукта..");
  } else {
    saveProductLocally(product);
  }

}

export function changeProductAmountInCart(productId, amount) {
  if (isUserValid()) {
    //todo backend
  } else {
    changeProductAmountLocally(productId, amount);
  }
}

export function removeProductFromCart(productId) {

  if (isUserValid()) {
    //todo
  } else {
    return removeProductLocally(productId);
  }

}

export function isProductInLocalCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart.findIndex(pr => pr.id === productId) !== -1;
}

