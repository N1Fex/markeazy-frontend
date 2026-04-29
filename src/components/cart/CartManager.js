import {isSellerAccount, isUserValid} from "../utils/JwtUtils";
import {deleteToUrl, patchToUrl, postToUrl} from "../axios_config";

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
  if (isSellerAccount()) {
    return;
  }
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

export function addProductToCart(productId) {
  if (isSellerAccount()) {
    return;
  }

  if (isUserValid()) {
    postToUrl("/cart", [{
      product: {
        id: productId
      },
      quantity: 1
    }])
  } else {
    saveProductLocally(productId);
  }

}

export function changeProductAmountInCart(productId, amount) {
  if (isSellerAccount()) {
    return;
  }
  if (isUserValid()) {
    patchToUrl("/cart", {
      product: {
        id: productId
      },
      quantity: amount
    })
  } else {
    changeProductAmountLocally(productId, amount);
  }
}

export function removeProductFromCart(productId) {
  if (isSellerAccount()) {
    return;
  }

  if (isUserValid()) {
    deleteToUrl(`/cart?product_id=${productId}`);
  } else {
    return removeProductLocally(productId);
  }

}

export function isProductInLocalCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart.findIndex(pr => pr.id === productId) !== -1;
}

