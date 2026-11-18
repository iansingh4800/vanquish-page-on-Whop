# Click Here To Get Funded: Vanquish upsell page

A static upsell page for the StockHours Whop app. It pushes members to a Vanquish Trader funded options account through the affiliate link https://www.vanquishtrader.co/nour/ and code **NOUR**, which gives a discount on any Vanquish plan.

- `index.html`: page markup (hero, stats, how it works, plans, why, FAQ, final CTA, disclosures)
- `assets/styles.css`: StockHours black and gold styles
- `assets/app.js`: tap-to-copy buttons for the code (with a fallback for the Whop iframe) and the sticky phone CTA

## Deploy
The page has no build step. Host the folder on any static host (for example Vercel or Netlify), then put the URL in your Whop app's page or iframe setting.

Plan prices and rules come from vanquishtrader.com ($10K account list prices, November 2026). Update `index.html` if Vanquish changes them.
