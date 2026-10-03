# Digital Menu — Portrait Prototype

A dependency-free mobile prototype designed for GitHub Pages.

## What is included

- Portrait-first, full-screen menu.
- Vertical swipe/snap between:
  1. Introduction
  2. Flavors
  3. Flavor detail
  4. Milkshakes
  5. Milkshake detail
  6. Special
- Horizontal swipe/scroll through products inside Flavors and Milkshakes.
- Product detail screens with Arabic + English names and SAR pricing.
- Animated/smooth scrolling, snap points, counters, and gesture hints.
- `Special` is used instead of `Puddings`.
- No fruit props are used in the prototype visuals.

## Important branding note

`assets/brand-mark.svg` is a temporary placeholder so the package is immediately testable.

Replace it with your **actual transparent PNG of the blue/yellow branding mark** from your reference image. Keep the filename:

`assets/brand-mark.svg`

or change the `<img src="assets/brand-mark.svg">` references in `index.html` and `app.js` to your PNG filename.

This prototype intentionally does **not** use the Thekra wordmark.

## Test locally

You can simply open `index.html` in a browser.

For a local server:

```bash
python3 -m http.server 8000
```

Then open:

`http://localhost:8000`

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload all files/folders from this package.
3. Go to **Settings → Pages**.
4. Set the source to **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.
7. GitHub will provide the Pages URL.

No npm, build command, or framework is required.

## Where to edit prices/names

Open `index.html` and edit the `data-title`, `data-ar`, `data-price`, and `data-desc` values on each product card.

Example:

```html
data-title="Mango"
data-ar="مانجو"
data-price="12"
data-desc="Smooth mango flavor with a creamy finish."
```

## Next production step

Once you have the exact transparent branding PNG and the final product photos/cup images, replace the placeholder visuals/assets. The navigation and interaction structure can remain.
