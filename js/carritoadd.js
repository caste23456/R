const productoDOM = document.querySelector('.productos__center');
const carritoDOM = document.querySelector('.carrito');
const carritoCenter = document.querySelector('.carrito__center');
const openCarrito = document.querySelector('.carrito__icon');
const closeCarrito = document.querySelector('.close__carrito');
const overlay = document.querySelector('.carrito__overlay');
const carritoTotal = document.querySelector('.carrito__total');
const clearCarritoBtn = document.querySelector('.clear__carrito');
const itemTotales = document.querySelector('.item__total');
const detalles = document.getElementById('detalles');

let carrito = [];
let buttonDOM = [];

class UI {
  detalleProducto(idProduct) {
    const filtroDato = productos.filter((item) => item.idProduct == idProduct);
    let result = '';
    filtroDato.forEach((producto) => {
      result += `
			<article class='detalle-grid'>
				<img src=${producto.image} alt='${producto.name}' class='img-fluid'>
				<div class='detalles-content'>
					<h3>${producto.name}</h3>
					<div class='rating'>
						<span>
							<i class='bx bxs-star'></i>
						</span>
						<span>
							<i class='bx bxs-star'></i>
						</span>
						<span>
							<i class='bx bxs-star'></i>
						</span>
						<span>
							<i class='bx bxs-star'></i>
						</span>
						<span>
							<i class='bx bx-star'></i>
						</span>
					</div>
						<p class='price'><b>Precio: </b> $${producto.salePrice}</p>
						<p class='description'>
							<b>Descripcion: </b> <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quae ad ex sint expedita perspiciatis odit eligendi! Et quia ex aperiam dolorum sunt omnis maiores. Repudiandae delectus iste exercitationem vel?</span>
						</p>
						<p class='description'>
							<span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptates consequuntur in assumenda odit hic, aut cupiditate dolorem aspernatur! Quibusdam iusto magnam vero maxime quisquam voluptatibus minima aliquam molestias, iure ratione commodi, reiciendis quasi.</span>
						</p>

						<div class='bottom'>
							<div class='btn__group'>
								<button class='btn addToCart' data-id=${producto.idProduct}>Añadir carrito</button>
							</div>
						</div>
				</div>
			</article>
			`;
    });
    detalles.innerHTML = result;
  }

  renderProductos(productos) {
    let result = '';
    productos.forEach((producto) => {
      result += `
			<div class='producto'>
			<div class='image__container'>
			<img src=${producto.image} alt=''>
		</div>
          <div class='producto__footer'>
            <h1>${producto.name}</h1>
            <div class='rating'>
              <span>
                <i class='bx bxs-star'></i>
              </span>
              <span>
                <i class='bx bxs-star'></i>
              </span>
              <span>
                <i class='bx bxs-star'></i>
              </span>
              <span>
                <i class='bx bxs-star'></i>
              </span>
              <span>
                <i class='bx bx-star'></i>
              </span>
            </div>
            <div class='price'>$${producto.salePrice}</div>
          </div>
          <div class='bottom'>
            <div class='btn__group'>
              
              <a href='../app/e-comerce.html?id=${producto.id}' class='btn view'>Vista</a>
            </div>
          </div>
        </div>
				`;
    });
    productoDOM.innerHTML = result;
  }

  getButtons() {
    const buttons = [...document.querySelectorAll('.addToCart')];
    buttonDOM = buttons;
    buttons.forEach((button) => {
      const idProduct = button.dataset.idProduct;
      const inCart = carrito.find(
        (item) => item.idProduct === parseInt(idProduct, 10)
      );

      if (inCart) {
        button.innerHTML = 'En el carrito';
        button.disabled = true;
      }
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.innerHTML = 'En el carrito';
        e.target.disabled = true;

        // GET productos al carrito
        const carritoItem = { ...Storage.getProductos(idProduct), cantidad: 1 };

        //agregamos el producto al carrito
        carrito = [...carrito, carritoItem];

        //Guardamos el carrito al localstorage
        Storage.saveCart(carrito);

        //Set cart values
        this.setItemValues(carrito);
        this.addCarritoItem(carritoItem);
        //Show al carrito
      });
    });
  }

  setItemValues(carrito) {
    let tempTotal = 0;
    let itemTotal = 0;
    carrito.map((item) => {
      tempTotal += item.salePrice * item.cantidad;
      itemTotal += item.cantidad;
    });
    carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
    itemTotales.innerText = itemTotal;
  }

  addCarritoItem({ image, salePrice, name, id }) {
    const div = document.createElement('div');
    div.classList.add('carrito__item');

    div.innerHTML = `
		<img src=${image} alt=${name}>
		<div>
			<h3>${name}</h3>
			<p class='price'>$${salePrice}</p>
		</div>
		<div>
			<span class='increase' data-id=${id}>
				<i class='bx bxs-up-arrow'></i>
			</span>
			<p class='item__cantidad'>1</p>
			<span class='decrease' data-id=${id}>
				<i class='bx bxs-down-arrow'></i>
			</span>
		</div>
		<div>
			<span class='remove__item' data-id=${id}>
				<i class='bx bx-trash'></i>
			</span>
		</div>
		`;
    carritoCenter.appendChild(div);
  }
  show() {
    carritoDOM.classList.add('show');
    overlay.classList.add('show');
  }
  hide() {
    carritoDOM.classList.remove('show');
    overlay.classList.remove('show');
  }
  setAPP() {
    carrito = Storage.getCart();
    this.setItemValues(carrito);
    this.populate(carrito);
    openCarrito.addEventListener('click', this.show);
    closeCarrito.addEventListener('click', this.hide);
  }
  populate(carrito) {
    carrito.forEach((item) => this.addCarritoItem(item));
  }
  cartLogic() {
    clearCarritoBtn.addEventListener('click', () => {
      this.clearCarrito();
      this.hide();
    });

    carritoCenter.addEventListener('click', (e) => {
      const target = e.target.closest('span');
      const targetElement = target.classList.contains('remove__item');
      console.log(target);
      console.log(targetElement);
      if (!target) return;
      if (targetElement) {
        const idProduct = parseInt(target.dataset.idProduct);
        this.removeItem(idProduct);
        carritoCenter.removeChild(target.parentElement.parentElement);
      } else if (target.classList.contains('increase')) {
        const idProduct = parseInt(target.dataset.idProduct, 10);
        let tempItem = carrito.find((item) => item.idProduct === idProduct);
        tempItem.cantidad++;
        Storage.saveCart(carrito);
        this.setItemValues(carrito);
        target.nextElementSibling.innerText = tempItem.cantidad;
      } else if (target.classList.contains('decrease')) {
        const idProduct = parseInt(target.dataset.idProduct, 10);
        let tempItem = carrito.find((item) => item.idProduct === idProduct);
        tempItem.cantidad--;

        if (tempItem.cantidad > 0) {
          Storage.saveCart(carrito);
          this.setItemValues(carrito);
          target.previousElementSibling.innerText = tempItem.cantidad;
        } else {
          this.removeItem(idProduct);
          carritoCenter.removeChild(target.parentElement.parentElement);
        }
      }
    });
  }
  clearCarrito() {
    const cartItems = carrito.map((item) => item.idProduct);
    cartItems.forEach((idProduct) => this.removeItem(idProduct));

    while (carritoCenter.children.length > 0) {
      carritoCenter.removeChild(carritoCenter.children[0]);
    }
  }
  removeItem(idProduct) {
    carrito = carrito.filter((item) => item.idProduct !== idProduct);
    this.setItemValues(carrito);
    Storage.saveCart(carrito);
    let button = this.singleButton(idProduct);
    if (button) {
      button.disabled = false;
      button.innerText = 'Añadir carrito';
    }
  }
  singleButton(id) {
    return buttonDOM.find(
      (button) => parseInt(button.dataset.idProduct) === idProduct
    );
  }
}

class Storage {
  static saveProduct(obj) {
    localStorage.setItem('productos', JSON.stringify(obj));
  }
  static saveCart(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  static getProductos(idProduct) {
    const producto = JSON.parse(localStorage.getItem('productos'));
    return producto.find(
      (product) => product.idProduct === parseFloat(idProduct, 10)
    );
  }
  static getCart() {
    return localStorage.getItem('carrito')
      ? JSON.parse(localStorage.getItem('carrito'))
      : [];
  }
}

class Productos {
  async getProductos() {
    try {
      const result = await fetch('../json/productos.json');
      const data = await result.json();
      const productos = data.items;
      return productos;
    } catch (err) {
      console.log(err);
    }
  }
}

let category = '';
let productos = [];

function categoryValue() {
  const ui = new UI();

  category = document.getElementById('rm_category').value;
  if (category.length > 0) {
    const producto = productos.filter((regx) => regx.category === category);
    ui.renderProductos(producto);
    ui.getButtons();
  } else {
    ui.renderProductos(productos);
    ui.getButtons();
  }
}

const query = new URLSearchParams(window.location.search);
let id = query.get('id');

document.addEventListener('DOMContentLoaded', async () => {
  const productosLista = new Productos();
  const ui = new UI();

  ui.setAPP();

  productos = await productosLista.getProductos();
  if (id) {
    ui.detalleProducto(id);
    Storage.saveProduct(productos);
    ui.getButtons();
    ui.cartLogic();
  } else {
    ui.renderProductos(productos);
    Storage.saveProduct(productos);
    ui.getButtons();
    ui.cartLogic();
  }
});
