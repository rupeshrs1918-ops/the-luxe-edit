// Simple site script: product data, cart, and demo checkout redirect
const PRODUCTS = [
  { id: 'hb001', title: 'Melrose Leather Tote', price: 179.00, img: 'https://images.unsplash.com/photo-1520975915312-0e59822b6d2a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1', desc: 'Italian leather tote, roomy and refined.' },
  { id: 'hb002', title: 'Sable Crossbody', price: 129.00, img: 'https://images.unsplash.com/photo-1503342452485-86e9e4dc7d5a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2', desc: 'Compact crossbody with elegant hardware.' },
  { id: 'hb003', title: 'Nova Envelope Clutch', price: 99.00, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3', desc: 'Evening clutch with minimalist lines.' },
  { id: 'hb004', title: 'Verona Shoulder Bag', price: 149.00, img: 'https://images.unsplash.com/photo-1518441902110-2b8b3b8b6d0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4', desc: 'Soft leather shoulder bag with clean silhouette.' },
  { id: 'hb005', title: 'Lumen Satchel', price: 199.00, img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=5', desc: 'Structured satchel with timeless appeal.' },
  { id: 'hb006', title: 'Cove Mini Tote', price: 89.00, img: 'https://images.unsplash.com/photo-1528701800489-4761b12cbf1b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6', desc: 'Cute and practical mini tote.' }
];

function saveCart(cart){localStorage.setItem('luxe_cart', JSON.stringify(cart))}
function loadCart(){try{return JSON.parse(localStorage.getItem('luxe_cart')||'[]')}catch(e){return []}}

function addToCart(id){
  const cart = loadCart();
  const found = cart.find(i=>i.id===id);
  if(found) found.qty += 1; else { const p = PRODUCTS.find(x=>x.id===id); cart.push({id:p.id,title:p.title,price:p.price,img:p.img,qty:1}); }
  saveCart(cart); updateCartCount();
  alert('Added to cart');
}

function updateCartCount(){
  const cart = loadCart();
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const els = document.querySelectorAll('#cart-count, #cart-count-2, #cart-count-3, #cart-count-4, #cart-count-5');
  els.forEach(el=>el.textContent = count);
}

function formatPrice(n){return '$' + n.toFixed(2)}

function renderFeatured(){
  const grid = document.getElementById('featured-grid');
  if(!grid) return;
  const sample = PRODUCTS.slice(0,3);
  grid.innerHTML = sample.map(p=>`
    <div class="card">
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="muted">${p.desc}</p>
      <div class="row"><strong>${formatPrice(p.price)}</strong><button onclick="addToCart('${p.id}')" class="btn small">Add</button></div>
    </div>
  `).join('');
}

function renderProducts(){
  const grid = document.getElementById('product-grid');
  if(!grid) return;
  grid.innerHTML = PRODUCTS.map(p=>`
    <div class="card">
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="muted">${p.desc}</p>
      <div class="row"><strong>${formatPrice(p.price)}</strong><button onclick="addToCart('${p.id}')" class="btn">Add to Cart</button></div>
    </div>
  `).join('');
}

function renderCartPage(){
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!container) return;
  const cart = loadCart();
  if(cart.length===0){container.innerHTML='<p class="muted">Your cart is empty.</p>'; document.getElementById('cart-summary').style.display='none'; return;}
  document.getElementById('cart-summary').style.display='flex';
  container.innerHTML = cart.map(item=>`
    <div class="cart-item">
      <img src="${item.img}" alt="${item.title}">
      <div style="flex:1">
        <h4 style="margin:0">${item.title}</h4>
        <div class="muted">${formatPrice(item.price)} × ${item.qty}</div>
      </div>
      <div style="text-align:right">
        <div style="font-weight:600">${formatPrice(item.price * item.qty)}</div>
        <div style="margin-top:8px">
          <button onclick="changeQty('${item.id}', -1)" class="btn small">-</button>
          <button onclick="changeQty('${item.id}', 1)" class="btn small">+</button>
          <button onclick="removeItem('${item.id}')" class="btn small" style="background:#eee;color:#333;margin-left:8px">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0);
  totalEl.textContent = formatPrice(total);
}

function changeQty(id, delta){
  const cart = loadCart();
  const found = cart.find(i=>i.id===id); if(!found) return;
  found.qty = Math.max(1, found.qty + delta);
  saveCart(cart); renderCartPage(); updateCartCount();
}

function removeItem(id){
  let cart = loadCart();
  cart = cart.filter(i=>i.id!==id);
  saveCart(cart); renderCartPage(); updateCartCount();
}

function checkoutDemo(){
  const cart = loadCart();
  if(cart.length===0){alert('Cart is empty'); return;}
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0);
  const orderId = 'ORD' + Date.now();
  // redirect to placeholder payment link with params
  const paymentLink = `https://yourbank.com/pay?amount=${encodeURIComponent(total.toFixed(2))}&order=${orderId}`;
  // Clear cart on redirect (simulate)
  localStorage.removeItem('luxe_cart');
  updateCartCount();
  window.location.href = paymentLink;
}

function initContactForm(){
  const btn = document.getElementById('contact-submit');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    document.getElementById('contact-note').textContent = 'Thanks — this is a demo form. Messages are not sent yet.';
  });
}

function initNewsletter(){
  const btn = document.getElementById('subscribe-btn');
  const btn2 = document.getElementById('subscribe-btn-2');
  const btn3 = document.getElementById('subscribe-btn-3');
  const btn4 = document.getElementById('subscribe-btn-4');
  const btn5 = document.getElementById('subscribe-btn-5');
  [btn,btn2,btn3,btn4,btn5].forEach(b=>{ if(!b) return; b.addEventListener('click', ()=>alert('Subscribed (demo)')) });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderFeatured();
  renderProducts();
  updateCartCount();
  renderCartPage();
  initContactForm();
  initNewsletter();
  // wire pay button
  const payBtn = document.getElementById('pay-now'); if(payBtn) payBtn.addEventListener('click', checkoutDemo);
  // set year
  const years = document.querySelectorAll('#year,#year-2,#year-3,#year-4,#year-5');
  years.forEach(el=>el && (el.textContent = new Date().getFullYear()));
});
