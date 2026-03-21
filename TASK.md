# On-Chain Bitcoin Analytics Dashboard

Interactive dashboard visualizing Newhedge-style on-chain Bitcoin metrics.

## Trend Context

**Newhedge API launch (Mar 18, 2026)** — Making structured Bitcoin on-chain analytics accessible to developers.

**Key metrics**:
- On-chain market indicators (MVRV, Realized Price, Realized P/L, SOPR)
- Supply and holder analytics (Long-term vs Short-term holder supply, HODL Waves)
- Network activity (active addresses, transaction volume)
- Mining & network security (hashrate, hashprice, difficulty)

## Features

1. **Market Indicators Panel**
   - MVRV Ratio visualization
   - Realized Price vs Market Price
   - Realized Profit/Loss chart
   - SOPR (Spent Output Profit Ratio)

2. **Holder Distribution**
   - Long-term vs Short-term holder supply
   - HODL Waves breakdown
   - Coin age distribution

3. **Network Activity**
   - Active addresses over time
   - Transaction volume
   - Address growth rate

4. **Mining Metrics**
   - Hashrate
   - Hashprice
   - Mining difficulty
   - Miner revenue

5. **Educational Content**
   - Explaining each metric
   - Market cycle context
   - How to interpret signals

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts for visualizations
- Mock data (simulating Newhedge API responses)

## Design

- Dark theme (crypto-native)
- Data-heavy but readable
- Real-time simulation (metrics update every few seconds)
- Responsive layout

## Output

- Deploy to Vercel
- GitHub repo: github.com/Samdevrel/on-chain-analytics
- Blog post explaining on-chain analysis
