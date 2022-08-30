import axios from 'axios';
import Noty from 'noty';

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.getElementById('cartCounter')
let negativeCount = document.querySelectorAll('.negativeCount')
let plusCount = document.querySelectorAll('.plusCount');

function updateCart(pizza) {
  axios.post('/update-cart', pizza).then(res => {
    console.log(res)
    cartCounter.innerText = res.data.totalQty;
    new Noty({
      text: "Item added to cart",
      type: 'success',
      timeout: 1000,
    }).show()
  })
    .catch(err => {
      new Noty({
        text: "Something went wrong",
        type: 'error',
        timeout: 1000,
      }).show()
    })
}





