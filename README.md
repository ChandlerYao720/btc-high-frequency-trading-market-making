# BTC High-Frequency Trading & Market-Making Research

An English-first, instantly bilingual research showcase for BTC/USDT perpetual high-frequency trading and market making: tick trades, one-second L1/L10 states, a 30-second execution-aware forecast, five-second quote decisions, and a constrained historical maker simulation.

## Verified highlights

- 60.46% directional accuracy on 13,644 30-second extreme events at 0.2% coverage.
- 0.1007 mean daily time-series Rank IC across 395 out-of-sample days.
- 3.65M factor rows/s on 86,700 rows, 4.43× the equivalent Pandas path.
- 397.85% historical net return under the frozen institutional fee scenario at 1× leverage, with maker credits and negative price-and-spread contribution shown separately on the site.

## View locally

Serve this directory with any static HTTP server and open `index.html`. The site has no framework build step and no runtime analytics.

## Evidence boundary

The market-making section is a chronological out-of-sample historical simulation using a touch-and-volume execution proxy. It does not model queue position, does not represent live trading, and does not imply that a personal account receives the institutional fee schedule.
