# BTC 永续合约秒级高频交易与做市研究 / BTC Perpetual High-Frequency Trading & Market-Making Research

## 中文简历版

- 构建 Point-in-time（点时正确；确保每个决策只使用当时已经到达的信息）秒级高频交易研究管线，将 4.92亿条逐笔成交、6,822.92万条 L1 与 6,822.94万条 L10 快照向后点时对齐，生成 48 个冻结候选因子（覆盖微观结构家族与低频背景基线）；在 86,700 行同定义基准上以 Polars 达到 3.65M 行/秒，较 Pandas 加速 4.43 倍。
- 设计并实现执行感知 LightGBM 复合目标，在时间外测试的 13,644 个 30 秒极端事件（0.2% 覆盖）上实现 60.46% 方向准确率与 0.1007 日度 Rank IC（秩信息系数；衡量每日预测排序与未来 30 秒收益排序的一致性）；微观因子相对低频基线提升 9.63 个百分点准确率和 0.0909 Rank IC，自定义目标相对同信息集 L2 基线提升 56.2% 执行效用。
- 实现双边 post-only（只做挂单；确保正常订单不主动吃单）状态机与 touch-and-volume execution proxy（触价与成交量执行代理；在没有真实队列位置时识别历史成交机会），将紧急退出限定为 reduce-only（只减仓；确保紧急订单只能降低已有风险敞口），并施加一倍杠杆、可见 L1 深度 1% 与 ±100% 敞口硬约束；Gate 机构费率情景的时间外仿真实现 397.85% 净收益、14.23 夏普比率和 1.61% 最大回撤，同时单列 1341.34% 做市费率补偿与 -316.63% 价格及价差贡献，并较对称挂单基线降低 8.72% 的 30 秒逆向选择。

## English resume version

- Built a point-in-time one-second high-frequency trading research pipeline that backward-aligned 491.75M tick trades, 68.23M L1 snapshots, and 68.23M L10 snapshots into 48 frozen candidate factors spanning microstructure families and a low-frequency context baseline; processed 86,700 benchmark rows at 3.65M rows/s with Polars, 4.43× the equivalent Pandas path.
- Designed and implemented an execution-aware LightGBM objective, reaching 60.46% directional accuracy on 13,644 out-of-sample 30-second extreme events at 0.2% coverage and 0.1007 mean daily Rank IC; microstructure features added 9.63 pp accuracy and 0.0909 Rank IC over the low-frequency baseline, while the custom objective improved execution utility by 56.2% versus the same-information L2 model.
- Engineered a two-sided post-only state machine with a touch-and-volume execution proxy, reduce-only emergency exits, 1× leverage, a 1% visible-L1 depth cap, and ±100% exposure limits; the chronological out-of-sample Gate institutional-fee simulation returned 397.85% with a 14.23 Sharpe and 1.61% maximum drawdown, while separately disclosing 1341.34% maker credits, -316.63% price-and-spread contribution, and an 8.72% reduction in 30-second adverse selection versus symmetric quoting.

## Evidence scope

All figures above are generated from one locked chronological out-of-sample evaluation covering 2025-04-01 through 2026-04-30. The market-making result is a historical touch-and-volume simulation under the frozen Gate institutional fee scenario at 1× leverage; it is not live trading evidence or a personal-account fee entitlement.
