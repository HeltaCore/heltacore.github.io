# Dirt & Diamonds — Growtopia Profit Hub

A fan-made, static information site for Growtopia: a farming profit
calculator, a Gems/World Lock/Diamond Lock converter, a flip
profit-per-hour calculator, and a written guide to common profit
methods.

Plain HTML, CSS and vanilla JavaScript — no build step, no
dependencies to install.

## Files

```
index.html            Home page
calculators.html       The three calculators
profit-methods.html    Profit methods write-up
css/style.css          Shared styles
js/script.js           Calculator logic
```

## Publish it on GitHub Pages

1. Create a new repository on GitHub (public, so Pages can serve it
   on the free tier).
2. Push these files to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a
   branch", pick the **main** branch and the **/ (root)** folder,
   then save.
5. GitHub gives you a URL shortly after
   (`https://<your-username>.github.io/<your-repo>/`) — that's the
   live site.

No further configuration is needed since everything is static.

## Customizing

- Colors, fonts and spacing are defined as CSS variables at the top
  of `css/style.css` under `:root`.
- Calculator math lives in `js/script.js` — each calculator has its
  own `calc...()` function.
- To add a fourth calculator, copy a `.signboard` block in
  `calculators.html` and wire its inputs to a new function in
  `script.js`.
