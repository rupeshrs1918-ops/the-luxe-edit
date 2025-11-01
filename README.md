# The Luxe Edit — Static Handbag Store (HTML/CSS/JS)

This is a ready-to-deploy static website for *The Luxe Edit* — a luxury handbag boutique. It's built using plain HTML, CSS and JavaScript, and it includes a demo checkout (redirects to a placeholder payment link).

## What is included
- `index.html` — Home page with hero and featured products
- `shop.html` — Product listing with Add to Cart
- `cart.html` — Cart with quantity controls and demo checkout (redirects to a placeholder payment link)
- `about.html`, `contact.html` — simple pages
- `assets/css/style.css` — styles
- `assets/js/script.js` — product data, cart and checkout logic

## Demo checkout behavior
Clicking **Pay Now** on the cart page will redirect to:
```
https://yourbank.com/pay?amount=TOTAL&order=ORDERID
```
Replace `https://yourbank.com/pay` in `assets/js/script.js` with your real payment link when ready.

## Deploying
1. Upload the folder contents to a GitHub repository.
2. Deploy the repository as a **Static Site** on Render, or host on Vercel/Netlify.
   - If your `index.html` is at the root, set **Publish Directory** to `.`

## Local testing
Simply open `index.html` in your browser, or run a simple static server:
```
# using Python 3
python -m http.server 8000
# then open http://localhost:8000
```

If you want, I can now create a ZIP file of this project for you to download and upload to GitHub. Tell me and I'll produce the ZIP and a short deployment checklist.
