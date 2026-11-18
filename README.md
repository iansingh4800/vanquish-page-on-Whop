# Click Here To Get Funded: Vanquish upsell page

A static sales page for the StockHours Whop app. It sends members to a Vanquish Trader funded options account through the affiliate link https://www.vanquishtrader.co/nour/ and code **NOUR**, which gives a discount on any Vanquish plan.

## Page sections
1. Hero: "Click here to get funded", the $300K+ claim, Nour's YouTube video (starts at 0:35), the button and the copy-code box
2. Payout ticker: every payout card, scrolling
3. Payout statement: Brian A.'s 13 payouts ($100,247, Oct 30 to Nov 17). Each row opens its card.
4. Receipts: all 14 payout cards ($108,322)
5. Own account vs. a 50K Rapid account
6. Three steps, the plan comparison table, FAQ, closing call to action with a P.S., and disclosures

## Files
- `index.html`: the page
- `assets/styles.css`: styles (StockHours black and gold, plus Caveat for the hand-written notes)
- `assets/app.js`: the click-to-load YouTube player, copy-code buttons (with a fallback for the Whop iframe), the payout card viewer and the sticky bar
- `assets/video-thumb.jpg`: the video thumbnail
- `assets/payouts/`: payout cards resized to 1280×720 for the page
- `payouts-original/`: the original uploaded screenshots

## Deploy
The page has no build step. Host the folder on any static host (for example Vercel), then put the URL in your Whop app.

## Adding a payout
Export the card at 1280×720 into `assets/payouts/`. Then add it to the ticker (`.tick`), the receipts grid (`.receipts`), and, if it's Brian's, the statement (`.statement__rows`). Update the totals ($100,247 and $108,322) wherever they appear.
