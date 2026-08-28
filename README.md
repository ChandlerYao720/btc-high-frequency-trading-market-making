<p align="right">
  <strong>English-first webpage</strong> · 中文可在网页右上角即时切换
</p>

# High-Frequency Futures Price Prediction & Market-Making Strategy

An interactive BTC/USDT perpetual research showcase spanning tick trades, one-second L1/L10 states, market-microstructure factors, a 30-second execution-aware forecast, five-second quote decisions, and constrained two-sided market-making simulation.

## ▶ [CLICK TO OPEN THE INTERACTIVE RESEARCH SHOWCASE](https://chandleryao720.github.io/btc-high-frequency-trading-market-making/)

Inspect the synchronized event window, factor and model ablations, accuracy-versus-coverage curve, model-driven quote skew, post-fill price changes, risk path, market regimes, and end-to-end research architecture. The page opens in English and switches instantly to Chinese from the upper-right control.

## Verified highlights

- 60.46% directional accuracy on 13,644 30-second extreme events at 0.2% coverage.
- 0.1007 mean daily time-series Rank IC across 395 out-of-sample days.
- 3.65M factor rows/s on 86,700 rows, 4.43× the equivalent Pandas path.
- Model-driven quote skew reduced 30-second adverse selection by 8.72% and lowered maximum drawdown from 2.17% to 1.61% versus the zero-signal, inventory-controlled quoting ablation.

## View locally

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`. The site has no framework build step and no runtime analytics.

## Evidence boundary

All public metrics load from one locked chronological out-of-sample evaluation. The market-making section uses a touch-and-volume execution proxy under the frozen institutional fee schedule at 1× leverage; it does not model queue position or represent live trading. The zero-signal comparator holds quote controls fixed to isolate the prediction signal and is not a separately optimized production market-making strategy.
