
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideMenu = document.getElementById('sideMenu');
const closeSideMenu = document.getElementById('closeSideMenu');
hamburgerBtn.addEventListener('click', () => {
  sideMenu.classList.add('open');
});
closeSideMenu.addEventListener('click', () => {
  sideMenu.classList.remove('open');
});
document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
    sideMenu.classList.remove('open');
  }
});
sideMenu.addEventListener('wheel', (e) => { e.stopPropagation(); });

document.getElementById('btnMotor').addEventListener('click', function(e) {
  e.preventDefault();
  var audio = document.getElementById('audioMotor');
  audio.currentTime = 0;
  audio.play();
});

const autos = [
  {titulo: "Fiat Cronos", precio: "$8.200.000", img: "https://cronos.fiat.com.ar//asset/versoes/like/negro.png"},
  {titulo: "Renault Kwid", precio: "$7.900.000", img: "https://tormonline.com.ar/contenido/vehiculos/renault-kwid-electrico-transparente.png"},
  {titulo: "Fiat Mobi", precio: "$6.800.000", img: "https://mobi.fiat.com.ar/images/Versions/trekking/000000.webp"},
  {titulo: "Peugeot 208", precio: "$9.400.000", img: "https://peugeotgiama.com.ar/wp-content/uploads/2023/04/BlueQuasar-450x250-1.png"},
  {titulo: "Chevrolet Onix", precio: "$8.600.000", img: "https://www.chevroletmegui.com.ar/content/dam/chevrolet/sa/ar/es/master/home/cars/onix/onix-2026/warranty-box/onix-wb.png?imwidth=1920"},
  {titulo: "Volkswagen Gol", precio: "$7.100.000", img: "https://www.planx5.com/web/sites/default/files/publico/styles/autos_usados_detalle/public/PRD/nuevo-gol.png?itok=FQ6iT_3Q"},
  {titulo: "Toyota Yaris", precio: "$9.900.000", img: "https://media.toyota.com.ar/91383439-f8b6-4536-a15c-532487e2c86d.png"},
  {titulo: "Ford Ka", precio: "$8.000.000", img: "https://www.ford.com.ar/content/ford/ar/es_ar/home/posventa/mantenimiento-garantia/ka/nuevo-ka/jcr:content/par/billboard/imageComponent/image.imgs.full.high.png"},
  {titulo: "Honda Fit", precio: "$10.300.000", img: "https://www.pngplay.com/wp-content/uploads/13/Honda-Fit-PNG-Images-HD.png"},
  {titulo: "Suzuki Swift", precio: "$9.700.000", img: "https://suzuki-lm.com.mx/assets/images/products/swift-sport/swift-sport.png"},
  {titulo: "Nissan March", precio: "$8.900.000", img: "https://cactuscar.com/wp-content/uploads/2025/09/cactus-nissan-march.png"},
  {titulo: "Citroën C3", precio: "$9.200.000", img: "https://citroenmarseille.com.ar/wp-content/uploads/2021/10/FEEL-PACK_SPRING_BLUE_BITONO_BLANCO.png"},
  {titulo: "Hyundai HB20", precio: "$10.200.000", img: "https://www.nachoinciarte.com/wp-content/uploads/2018/11/HB20-1.png"},
  {titulo: "Kia Rio", precio: "$8.850.000", img: "https://www.pngplay.com/wp-content/uploads/13/Kia-Rio-Transparent-Images.png"},
  {titulo: "Volkswagen Polo", precio: "$9.500.000", img: "https://www.greenncap.com/wp-content/uploads/VW-Polo_2020_0024-478x320.png"},
  {titulo: "Peugeot 301", precio: "$10.700.000", img: "https://www.monzarentacar.com/wp-content/uploads/2018/09/peugeot-301-automatic.png"},
];


function formatCurrency(number) {
  if (typeof number !== 'number') number = Number(number) || 0;
  return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parsePrice(precioString) {
  const digits = String(precioString).replace(/\D/g,'');
  return parseInt(digits || '0', 10);
}


const cardsDiv = document.getElementById('cardsContainer');
autos.forEach((auto, idx) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${auto.img}" alt="${auto.titulo}" class="card-img">
    <div class="card-title">${auto.titulo}</div>
    <div class="card-price">${auto.precio}</div>
    <button class="btn-comprar" data-index="${idx}">Comprar</button>
  `;
  cardsDiv.appendChild(card);
});


const CART_KEY = 'rcm_cart_v1';
let cart = loadCart();

const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartCountEl = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalEl = document.getElementById('cartTotal');
const closeCartBtn = document.getElementById('closeCart');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

function loadCart(){
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch(e){ return []; }
}
function saveCart(){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}
function cartItemCount(){
  return cart.reduce((sum, it) => sum + (it.qty || 1), 0);
}
function openCart(){ cartSidebar.setAttribute('aria-hidden','false'); renderCart(); }
function closeCart(){ cartSidebar.setAttribute('aria-hidden','true'); }

cartBtn.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
closeCartBtn.addEventListener('click', () => closeCart());
clearCartBtn.addEventListener('click', () => {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
});


document.querySelectorAll('.btn-comprar').forEach(btn => {
  btn.addEventListener('click', function(e){
    e.preventDefault();
    const idx = Number(this.dataset.index);
    addToCart(idx);
  });
});

function addToCart(idx){
  const auto = autos[idx];
  if(!auto) return;
  const priceNum = parsePrice(auto.precio);
  const existing = cart.find(ci => ci.index === idx);
  if(existing){
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({
      index: idx,
      titulo: auto.titulo,
      precioText: auto.precio,
      precioNumber: priceNum,
      img: auto.img,
      qty: 1
    });
  }
  saveCart();
  openCart();
}


function renderCart(){

  cartCountEl.textContent = cartItemCount();

  cartItemsList.innerHTML = '';
  if(cart.length === 0){
    cartItemsList.innerHTML = '<li style="color:#666;padding:12px;text-align:center">El carrito está vacío.</li>';
    cartTotalEl.textContent = formatCurrency(0);
    return;
  }
  let total = 0;
  cart.forEach((ci, i) => {
    total += (ci.precioNumber || 0) * (ci.qty || 1);
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${ci.img}" alt="${ci.titulo}">
      <div class="cart-item-info">
        <div class="cart-item-title">${ci.titulo}</div>
        <div class="cart-item-price">${formatCurrency(ci.precioNumber)} x <span class="cart-item-qty">${ci.qty}</span></div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="dec" data-i="${i}">-</button>
        <button class="qty-btn" data-action="inc" data-i="${i}">+</button>
        <button class="qty-btn" data-action="remove" data-i="${i}" title="Quitar">✕</button>
      </div>
    `;
    cartItemsList.appendChild(li);
  });
  cartTotalEl.textContent = formatCurrency(total);
}


cartItemsList.addEventListener('click', function(e){
  const btn = e.target.closest('button');
  if(!btn) return;
  const action = btn.dataset.action;
  const i = Number(btn.dataset.i);
  if(Number.isNaN(i)) return;
  if(action === 'inc'){
    cart[i].qty = (cart[i].qty || 1) + 1;
    saveCart();
  } else if(action === 'dec'){
    cart[i].qty = (cart[i].qty || 1) - 1;
    if(cart[i].qty <= 0) cart.splice(i,1);
    saveCart();
  } else if(action === 'remove'){
    cart.splice(i,1);
    saveCart();
  }
});


checkoutBtn.addEventListener('click', function(){

  const modalText = document.getElementById('modalErrorText');
  if(modalText) modalText.innerHTML = 'La compra no se pudo realizar.';
  mostrarError();
});


function mostrarError(){
  document.getElementById('modalError').style.display = 'flex';
}
function cerrarError(){
  document.getElementById('modalError').style.display = 'none';
}

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    cerrarError();
    closeCart();
  }
});


renderCart();
