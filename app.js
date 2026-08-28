"use strict";

const DATA_URL = "data/public_metrics.json";
const SVG_NS = "http://www.w3.org/2000/svg";

const state = {
  data: null,
  lang: "en",
  regimeView: "prediction",
  traceIndex: 120,
};

const copy = {
  en: {
    skip: "Skip to research evidence",
    navSignals: "Signals",
    navExecution: "Execution",
    navSystem: "System",
    navLimits: "Boundaries",
    heroEyebrow: "BTC HIGH-FREQUENCY TRADING × MARKET MAKING",
    heroTitle: "Forecasting the next move is only useful when the order survives contact with the market.",
    heroLead:
      "A point-in-time BTC perpetual high-frequency trading and market-making research stack mapping tick trades and one-second L1/L10 states into microstructure factors, a 30-second execution-aware forecast, five-second quote decisions, and a constrained historical maker simulation.",
    heroCommand: "show --locked-evidence",
    metricAccuracy: "Extreme direction accuracy",
    metricRankIc: "Mean daily Rank IC",
    metricThroughput: "Hot factor throughput",
    metricNetReturn: "Simulated net return",
    ribbonLabel: "READ THE RESULT CORRECTLY",
    sectionReplay: "01 / EVENT WINDOW",
    replayTitle: "A score becomes a quote, a fill, and then inventory.",
    replayIntro:
      "Explore a consecutive window from the locked simulation. Price and score paths are indexed for display; fills, quote bias, inventory direction, and regime come from the same event sequence.",
    legendMid: "Mid",
    legendBidAsk: "Bid / ask",
    legendScore: "Score",
    legendFill: "Fill",
    cursorLabel: "Inspect decision state",
    stateScore: "Score",
    stateQuote: "Quote skew",
    stateFill: "Observed fill",
    stateInventory: "Inventory",
    stateRegime: "Regime",
    stateOverride: "Order mode",
    replayCaption:
      "Data: a fixed window from the locked historical simulation. Boundary: touch and opposing volume indicate a fill opportunity; the replay does not reconstruct exchange queue position.",
    factorsTitle: "Microstructure—not low-frequency context—carries the forecast.",
    sectionFactors: "02 / SIGNAL EVIDENCE",
    factorsIntro:
      "The ablation keeps the test window fixed. B0 uses low-frequency context; B1 adds the frozen microstructure information set; M1 keeps B1 data and capacity but changes the learning objective.",
    familyKicker: "FACTOR FAMILIES",
    familyTitle: "Daily ordering evidence by family",
    oosTag: "OOS",
    tableToggle: "View accessible data table",
    ablationKicker: "B0 → B1 → M1",
    ablationTitle: "Same test, isolated changes",
    sameSampleTag: "SAME SAMPLE",
    coverageKicker: "ACCURACY × COVERAGE",
    coverageTitle: "The extreme-tail result is not a single isolated point.",
    objectiveTitle: "The custom objective changes economic emphasis, not model capacity.",
    sectionObjective: "03 / LEARNING OBJECTIVE",
    objectiveIntro:
      "Both models consume the identical frozen feature matrix and tree budget. Standard L2 fits average return error; the execution-aware objective also emphasizes extreme direction and passive-order economics during training.",
    b1Title: "Standard regression",
    b1Body: "Fits squared return error across the common sample and supplies the fair same-information baseline.",
    featuresNode: "Frozen features",
    l2Node: "L2 gradient",
    scoreNode: "Return score",
    m1Title: "Composite training economics",
    objectiveM1Kicker: "M1 / EXECUTION-AWARE",
    m1Body:
      "Combines upper-tail, lower-tail, passive maker-margin, and prediction-error terms; future outcomes appear only in training supervision.",
    lossUp: "Upper tail",
    lossDown: "Lower tail",
    lossMaker: "Maker margin",
    lossReg: "Error control",
    marketTitle: "The account made money in the fee scenario; price and spread economics did not.",
    sectionMarket: "04 / MARKET MAKING",
    marketIntro:
      "A transparent result needs both sides: net account performance and the attribution that produced it. The model's defensible execution gain is lower adverse selection, not superior net Sharpe versus symmetric quoting.",
    statReturn: "Net return",
    statReturnNote: "fee-scenario simulation",
    statSharpe: "Sharpe",
    statSharpeNote: "UTC daily, annualized",
    statDrawdown: "Maximum drawdown",
    statDrawdownNote: "sequential equity",
    statAdverse: "Adverse selection",
    statAdverseNote: "relative reduction at 30 seconds",
    equityKicker: "EQUITY + DRAWDOWN",
    equityTitle: "Model skew versus symmetric quoting",
    symmetricLabel: "Symmetric",
    attributionKicker: "PNL ATTRIBUTION",
    attributionTitle: "Fee credit is visible, not hidden.",
    regimeTitle: "Prediction stays positive across regimes; execution does not.",
    sectionRegimes: "05 / REGIME STABILITY",
    regimeIntro:
      "Volatility and liquidity thresholds were fitted on training data and then frozen. Toggle between forecast ordering and simulated return to see where evidence remains stable and where economics break.",
    regimePrediction: "Prediction Rank IC",
    regimeExecution: "Simulated return",
    systemTitle: "Training supervision ends before the live-time decision path begins.",
    sectionSystem: "06 / SYSTEM",
    systemIntro:
      "The system separates historical labels and fitting from frozen scoring, inventory-aware quote sizing, constrained execution, and sequential account attribution.",
    archQuoteArrow: "bounded quotes",
    archStep1: "INGEST",
    archStep2: "ALIGN",
    archStep3: "TARGET",
    archStep4: "LEARN",
    archStep5: "QUOTE",
    archStep6: "ACCOUNT",
    archLane1a: "DATA +",
    archLane1b: "FEATURES",
    archLane2a: "TRAINING",
    archLane2b: "ONLY",
    archLane3a: "LIVE-TIME",
    archLane3b: "DECISION",
    archLane4a: "EXECUTION +",
    archLane4b: "ACCOUNT",
    archDataTitle: "Market feeds",
    archDataSub: "trades · L1 · L10",
    archPanelTitle: "Point-in-time panel",
    archPanelSub: "backward alignment",
    archFactorTitle: "Frozen factors",
    archFactorSub: "market state",
    archTargetTitle: "Future label",
    archTargetSub: "training supervision",
    archModelTitle: "B0 · B1 · M1",
    archModelSub: "frozen trees",
    archScoreTitle: "Frozen score",
    archScoreSub: "no future input",
    archQuoteTitle: "Inventory skew",
    archQuoteSub: "two-sided quote",
    archRiskTitle: "Risk gates",
    archRiskSub: "depth · exposure · state",
    archExecTitle: "Execution proxy",
    archExecSub: "touch + volume",
    archAccountTitle: "Account ledger",
    archAccountSub: "PnL · episodes · state",
    archLegend: "FLOW",
    archLegendData: "data / parameter handoff",
    archLegendFocal: "focal quote-to-fill path",
    archLegendState: "account state feedback",
    archCaption:
      "Current implemented system, balanced overview. Ten nodes are retained from the full mechanism map; low-level storage, model serialization, and diagnostic branches are collapsed. The accent marks the risk-gated quote-to-fill handoff.",
    boundariesTitle: "The evidence is useful because the boundaries are explicit.",
    sectionBoundaries: "07 / METHODS + BOUNDARIES",
    boundariesIntro:
      "The project freezes the market, horizon, model family, validation budget, fees, leverage, order types, risk limits, and one-time test before public evaluation.",
    methodDataTitle: "Point-in-time data",
    methodModelTitle: "Fair model ablation",
    methodOrderTitle: "Order discipline",
    methodEvidenceTitle: "Evidence status",
    boundaryTableCaption: "What the result supports—and what it does not",
    supports: "Supports",
    doesNotSupport: "Does not support",
    footerLine: "research evidence, not a trading solicitation",
    backToTop: "Back to top ↑",
  },
  zh: {
    skip: "跳至研究证据",
    navSignals: "信号",
    navExecution: "执行",
    navSystem: "系统",
    navLimits: "边界",
    heroEyebrow: "BTC 秒级高频交易 × 做市研究",
    heroTitle: "短期走势预测只有转化为经得住市场检验的订单，才具有交易意义。",
    heroLead:
      "一套点时正确（确保每次决策只读取当时已知信息）的 BTC 永续合约秒级高频交易与做市研究体系，将逐笔成交和一秒 L1/L10 盘口状态转化为市场微观结构因子、30 秒执行感知预测、5 秒报价决策与受约束的历史做市仿真。",
    heroCommand: "展示 --锁定证据",
    metricAccuracy: "极端方向准确率",
    metricRankIc: "日度秩信息系数均值",
    metricThroughput: "热启动因子吞吐",
    metricNetReturn: "仿真净收益",
    ribbonLabel: "如何正确理解结果",
    sectionReplay: "01 / 事件窗口",
    replayTitle: "模型分数依次转化为报价、成交与库存。",
    replayIntro:
      "查看锁定仿真中的连续事件窗口。价格与分数路径仅为展示而指数化；成交、报价偏斜、库存方向和市场状态均来自同一事件序列。",
    legendMid: "中间价",
    legendBidAsk: "买一 / 卖一",
    legendScore: "模型分数",
    legendFill: "成交",
    cursorLabel: "检查决策状态",
    stateScore: "模型分数",
    stateQuote: "报价偏斜",
    stateFill: "观测成交",
    stateInventory: "库存",
    stateRegime: "市场状态",
    stateOverride: "订单模式",
    replayCaption:
      "数据来自锁定历史仿真的固定窗口。触价与成交量执行代理（touch-and-volume execution proxy）用于验证历史订单流中是否出现小额挂单成交机会，不重建交易所队列位置。",
    factorsTitle: "预测能力主要来自微观结构，而不是低频价量背景。",
    sectionFactors: "02 / 信号证据",
    factorsIntro:
      "消融实验固定同一测试期。B0 只使用低频价量背景；B1 加入冻结的微观结构信息集；M1 保持 B1 的样本、特征与树容量不变，只调整学习目标。",
    familyKicker: "因子家族",
    familyTitle: "各家族的日内排序证据",
    oosTag: "时间外",
    tableToggle: "查看无障碍数据表",
    ablationKicker: "B0 → B1 → M1",
    ablationTitle: "同一测试期，逐项隔离变化",
    sameSampleTag: "相同样本",
    coverageKicker: "准确率 × 覆盖率",
    coverageTitle: "极端尾部结果不是孤立的单点。",
    objectiveTitle: "自定义目标改变经济侧重点，不增加模型容量。",
    sectionObjective: "03 / 学习目标",
    objectiveIntro:
      "两个模型使用完全相同的冻结特征矩阵与树预算。标准 L2 拟合平均收益误差；执行感知目标在训练中进一步强调极端方向与被动挂单的经济结果。",
    b1Title: "标准回归",
    b1Body: "在共同样本上拟合平方收益误差，作为同信息集的公平基线。",
    featuresNode: "冻结特征",
    l2Node: "L2 梯度",
    scoreNode: "收益分数",
    m1Title: "复合训练经济目标",
    objectiveM1Kicker: "M1 / 执行感知",
    m1Body: "组合上涨尾部、下跌尾部、被动做市边际与预测误差项；未来结果只用于训练监督。",
    lossUp: "上涨尾部",
    lossDown: "下跌尾部",
    lossMaker: "做市边际",
    lossReg: "误差约束",
    marketTitle: "账户在费率情景下盈利，但价格与价差经济贡献为负。",
    sectionMarket: "04 / 做市仿真",
    marketIntro:
      "透明结果必须同时展示账户净表现及其来源。模型可辩护的执行增量是减少逆向选择，而不是相对对称挂单获得更高净夏普比率。",
    statReturn: "净收益",
    statReturnNote: "费率情景历史仿真",
    statSharpe: "夏普比率",
    statSharpeNote: "UTC 日收益年化",
    statDrawdown: "最大回撤",
    statDrawdownNote: "逐事件权益记账",
    statAdverse: "逆向选择",
    statAdverseNote: "三十秒成交后价格变化的相对改善",
    equityKicker: "权益 + 回撤",
    equityTitle: "模型偏斜与对称挂单",
    symmetricLabel: "对称基线",
    attributionKicker: "损益归因",
    attributionTitle: "明确展示费率补偿，不隐藏其贡献。",
    regimeTitle: "预测在各市场状态中保持正值，执行收益则并非如此。",
    sectionRegimes: "05 / 市场状态稳定性",
    regimeIntro:
      "波动率与流动性边界只在训练集拟合，随后完全冻结。切换预测排序与仿真收益，即可观察哪些证据稳定、哪些经济结果失效。",
    regimePrediction: "预测秩信息系数",
    regimeExecution: "仿真收益",
    systemTitle: "训练监督在实时决策路径开始前结束。",
    sectionSystem: "06 / 研究系统",
    systemIntro:
      "系统将历史标签与模型拟合，同冻结评分、库存感知报价、受约束执行和逐事件账户归因严格分离。",
    archQuoteArrow: "受约束报价",
    archStep1: "摄取",
    archStep2: "对齐",
    archStep3: "标签",
    archStep4: "学习",
    archStep5: "报价",
    archStep6: "记账",
    archLane1a: "数据 +",
    archLane1b: "特征",
    archLane2a: "仅用于",
    archLane2b: "训练",
    archLane3a: "决策时",
    archLane3b: "可见信息",
    archLane4a: "执行 +",
    archLane4b: "账户",
    archDataTitle: "市场数据",
    archDataSub: "成交 · L1 · L10",
    archPanelTitle: "点时面板",
    archPanelSub: "向后时间对齐",
    archFactorTitle: "冻结因子",
    archFactorSub: "市场状态",
    archTargetTitle: "未来标签",
    archTargetSub: "仅训练监督",
    archModelTitle: "B0 · B1 · M1",
    archModelSub: "冻结树模型",
    archScoreTitle: "冻结分数",
    archScoreSub: "不含未来输入",
    archQuoteTitle: "库存偏斜",
    archQuoteSub: "双边报价",
    archRiskTitle: "风险闸门",
    archRiskSub: "深度 · 敞口 · 状态",
    archExecTitle: "执行代理",
    archExecSub: "触价 + 成交量",
    archAccountTitle: "账户账本",
    archAccountSub: "损益 · 回合 · 状态",
    archLegend: "数据流",
    archLegendData: "数据 / 参数传递",
    archLegendFocal: "报价至成交的重点路径",
    archLegendState: "账户状态反馈",
    archCaption:
      "当前已实现系统的平衡概览。图中保留完整机制图的十个节点，并折叠底层存储、模型序列化与诊断分支；高亮路径标识经过风险闸门的报价到成交交接。",
    boundariesTitle: "明确证据边界，结果才真正有用。",
    sectionBoundaries: "07 / 方法与边界",
    boundariesIntro:
      "项目在公开评价前冻结市场、预测期限、模型族、验证预算、费率、杠杆、订单类型、风险限制与一次性测试。",
    methodDataTitle: "点时数据",
    methodModelTitle: "公平模型消融",
    methodOrderTitle: "订单纪律",
    methodEvidenceTitle: "证据状态",
    boundaryTableCaption: "结果能够支持什么，以及不能支持什么",
    supports: "能够支持",
    doesNotSupport: "不能支持",
    footerLine: "研究证据，不构成交易招揽",
    backToTop: "返回顶部 ↑",
  },
};

const names = {
  en: {
    book_imbalance: "L1/L10 imbalance",
    microprice: "Microprice displacement",
    order_flow: "Order-flow imbalance",
    aggressive_trades: "Aggressive trade flow",
    momentum_reversal_volatility: "Momentum / reversal / volatility",
    spread_liquidity: "Spread and liquidity",
    market_regime: "Market regime",
    intensity_large_trade: "Intensity and large trades",
    low_frequency_context: "Low-frequency context",
    low: "Low volatility",
    medium: "Medium volatility",
    high: "High volatility",
    ample: "Ample liquidity",
    normal: "Normal liquidity",
    tight: "Tight liquidity",
    bid: "Bid-heavy",
    ask: "Ask-heavy",
    balanced: "Balanced",
    both: "Both sides",
    buy: "Bid fill",
    sell: "Ask fill",
    none: "No fill",
    long: "Long",
    short: "Short",
    flat: "Flat",
  },
  zh: {
    book_imbalance: "L1/L10 盘口不平衡",
    microprice: "微价格偏离",
    order_flow: "订单流不平衡",
    aggressive_trades: "主动成交流",
    momentum_reversal_volatility: "动量 / 反转 / 波动率",
    spread_liquidity: "价差与流动性",
    market_regime: "市场状态",
    intensity_large_trade: "交易强度与大单",
    low_frequency_context: "低频价量背景",
    low: "低波动",
    medium: "中波动",
    high: "高波动",
    ample: "流动性充足",
    normal: "流动性正常",
    tight: "流动性紧张",
    bid: "买方偏斜",
    ask: "卖方偏斜",
    balanced: "均衡",
    both: "双侧成交",
    buy: "买单成交",
    sell: "卖单成交",
    none: "无成交",
    long: "多头",
    short: "空头",
    flat: "空仓",
  },
};

function el(id) {
  return document.getElementById(id);
}

function locale() {
  return state.lang === "zh" ? "zh-CN" : "en-US";
}

function number(value, digits = 0) {
  return new Intl.NumberFormat(locale(), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function signedNumber(value, digits = 2) {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${number(Math.abs(value), digits)}`;
}

function percent(value, digits = 2, signed = false) {
  const magnitude = number(Math.abs(value) * 100, digits);
  const sign = signed ? (value > 0 ? "+" : value < 0 ? "−" : "") : value < 0 ? "−" : "";
  return `${sign}${magnitude}%`;
}

function percentPoint(value, digits = 2) {
  return `${signedNumber(value, digits)} pp`;
}

function compact(value, digits = 2) {
  return new Intl.NumberFormat(locale(), {
    notation: "compact",
    maximumFractionDigits: digits,
  }).format(value);
}

function scientific(value, digits = 2) {
  const superscript = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  const [coefficient, rawExponent] = Number(value).toExponential(digits).split("e");
  const sign = rawExponent.startsWith("-") ? "⁻" : rawExponent.startsWith("+") ? "⁺" : "";
  const exponent = rawExponent.replace(/^[-+]/, "").split("").map((character) => superscript[character]).join("");
  return `${coefficient} × 10${sign}${exponent}`;
}

function dateLabel(value) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(locale(), {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function text(id, value) {
  const node = el(id);
  if (node) node.textContent = value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function languageName(key) {
  return names[state.lang][key] || key;
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = copy[lang][node.dataset.i18n];
    if (value) node.textContent = value;
  });

  const toggle = el("languageToggle");
  toggle.setAttribute("aria-pressed", String(lang === "zh"));
  toggle.setAttribute("aria-label", lang === "en" ? "切换为中文" : "Switch to English");

  document.title = lang === "en" ? "BTC High-Frequency Trading & Market Making" : "BTC 秒级高频交易与做市研究";
  document.querySelector('meta[name="description"]').content =
    lang === "en"
      ? "Verified BTC perpetual high-frequency trading and market-making research using tick trades, one-second L1/L10 states, 30-second forecasts, and constrained historical simulation."
      : "经验证的 BTC 永续合约秒级高频交易与做市研究：逐笔成交、一秒 L1/L10 盘口、30 秒预测及受约束历史仿真。";

  updateStaticAccessibility();
  if (state.data) renderAll();
}

function updateStaticAccessibility() {
  const zh = state.lang === "zh";
  const labels = {
    "trace-title": zh ? "指数化买一、卖一、中间价与模型分数" : "Indexed bid, ask, mid-price, and model score",
    "trace-desc": zh ? "带可交互游标的锁定历史决策窗口。" : "A locked historical decision window with an interactive cursor.",
    "coverage-title": zh ? "不同预测覆盖率下的方向准确率" : "Direction accuracy by prediction coverage",
    "coverage-desc": zh ? "包含六个点的时间外覆盖率曲线。" : "A six-point out-of-sample coverage curve.",
    "equity-title": zh ? "M1 与对称做市权益曲线及 M1 回撤" : "M1 and symmetric maker equity with M1 drawdown",
    "equity-desc": zh ? "相同费率和杠杆下按时间顺序进行的历史仿真。" : "Chronological historical simulation under identical fees and leverage.",
    "arch-title": zh ? "BTC 点时研究与做市仿真数据流" : "Point-in-time BTC research and maker-simulation data flow",
    "arch-desc": zh
      ? "四条泳道区分数据与特征、模型训练、决策时信息以及执行与记账。"
      : "Four lanes distinguish data and features, training, live decisions, and execution with accounting.",
  };
  Object.entries(labels).forEach(([id, value]) => text(id, value));

  const ariaLabels = [
    [".site-header", zh ? "主导航" : "Primary navigation"],
    [".brand", zh ? "BTC 秒级高频交易与做市研究首页" : "BTC high-frequency trading and market-making research home"],
    [".desktop-nav", zh ? "研究章节" : "Research sections"],
    [".hero-tags", zh ? "研究范围" : "Research scope"],
    [".hero-terminal", zh ? "核心证据" : "Headline evidence"],
    [".evidence-ribbon", zh ? "主要结论解释" : "Primary interpretation"],
    [".chart-legend", zh ? "事件图例" : "Trace legend"],
    [".mini-legend", zh ? "权益图例" : "Equity chart legend"],
    [".objective-flow", zh ? "标准 L2 路径" : "Standard L2 flow"],
    [".loss-parts", zh ? "复合目标组成" : "Composite objective components"],
    [".segmented-control", zh ? "市场状态指标" : "Regime metric"],
  ];
  ariaLabels.forEach(([selector, value]) => document.querySelector(selector)?.setAttribute("aria-label", value));

  el("factorBars")?.setAttribute("aria-label", zh ? "因子家族日度秩信息系数均值" : "Factor family mean daily Rank IC");
  el("attributionBars")?.setAttribute("aria-label", zh ? "M1 相对初始权益的损益归因" : "M1 PnL attribution as return on initial equity");
  el("regimeHeatmap")?.setAttribute("aria-label", zh ? "波动率与流动性市场状态热力图" : "Volatility by liquidity regime heatmap");
}

function renderHero() {
  const d = state.data;
  const h = d.prediction.headline;
  const mm = d.marketMaking;
  const b = d.factors.benchmark;
  const a = mm.assumptions;
  const zh = state.lang === "zh";

  text(
    "scopePeriod",
    zh
      ? `时间外 ${d.evidence.testStart} → ${d.evidence.testEnd}`
      : `OOS ${d.evidence.testStart} → ${d.evidence.testEnd}`,
  );
  text(
    "scopeLeverage",
    zh
      ? `${number(a.leverage, 0)} 倍杠杆 · 敞口 ${percent(a.exposure_min, 0)} 至 +${percent(a.exposure_max, 0)}`
      : `${number(a.leverage, 0)}× leverage · exposure ${percent(a.exposure_min, 0)} to +${percent(a.exposure_max, 0)}`,
  );
  text(
    "scopeOrders",
    zh ? "正常只挂单 · 紧急只减仓" : "post-only normal · reduce-only emergency",
  );

  text("metricAccuracy", percent(h.accuracy, 2));
  text(
    "metricAccuracyContext",
    zh
      ? `${d.evidence.predictionHorizonSeconds} 秒期限 · ${percent(h.requestedCoverage, 1)} 覆盖率 · 样本数 ${number(h.sampleCount)}`
      : `${d.evidence.predictionHorizonSeconds}s horizon · ${percent(h.requestedCoverage, 1)} coverage · N=${number(h.sampleCount)}`,
  );
  text("metricRankIc", number(h.rankIc, 4));
  text(
    "metricRankIcContext",
    zh
      ? `${number(h.rankIcDayCount)} 个 UTC 日 · 正值天数占比 ${percent(h.positiveDayShare, 1)}`
      : `${number(h.rankIcDayCount)} UTC days · ${percent(h.positiveDayShare, 1)} positive`,
  );
  text("metricThroughput", `${compact(b.hotRowsPerSecond)} ${zh ? "行/秒" : "rows/s"}`);
  text(
    "metricThroughputContext",
    zh
      ? `${number(b.inputRows)} 行输入 · ${number(b.factorCount)} 个因子 · ${number(b.repetitions)} 次热启动中位数`
      : `${number(b.inputRows)} input rows · ${number(b.factorCount)} factors · median of ${number(b.repetitions)} hot runs`,
  );
  text("metricNetReturn", percent(mm.m1.total_return, 2, true));
  text(
    "metricNetReturnContext",
    zh ? "时间外测试 · 冻结费率 · 一倍杠杆" : "chronological OOS · frozen fees · 1× leverage",
  );

  text(
    "heroBoundary",
    zh
      ? `历史做市仿真采用 Gate 机构费率情景：挂单费率 ${percent(a.maker_fee, 3, true)}，紧急吃单费率 ${percent(a.taker_fee, 3, true)}，邀请返佣 ${percent(a.affiliate_rebate, 3)}；不代表个人账户可获得该费率。`
      : `Historical maker simulation under the Gate institutional fee scenario: ${percent(a.maker_fee, 3, true)} maker, ${percent(a.taker_fee, 3, true)} emergency taker, ${percent(a.affiliate_rebate, 3)} affiliate rebate. This is not a personal-account entitlement.`,
  );
  text(
    "ribbonText",
    zh
      ? `预测证据稳健：三十秒极端方向准确率为 ${percent(h.accuracy, 2)}，日度秩信息系数（Rank IC，用于检验模型能否正确排序未来收益）均值为 ${number(h.rankIc, 4)}。执行结果依赖负挂单费率补偿；价格与价差贡献为 ${signedNumber(mm.attributionPct.priceAndSpread, 2)}%，且净收益与夏普比率低于同费率对称挂单基线。模型可辩护的执行增量是把三十秒逆向选择相对降低 ${percent(mm.comparison.relative_adverse_selection_reduction, 2)}。`
      : `Forecast evidence is stable: ${percent(h.accuracy, 2)} extreme direction accuracy at ${d.evidence.predictionHorizonSeconds} seconds and ${number(h.rankIc, 4)} mean daily Rank IC. Execution is fee-supported: price plus spread contributed ${signedNumber(mm.attributionPct.priceAndSpread, 2)}%, while net return and Sharpe trailed the identical-fee symmetric baseline. The defensible execution gain is a ${percent(mm.comparison.relative_adverse_selection_reduction, 2)} relative reduction in 30-second adverse selection.`,
  );
}

function makePath(values, xScale, yScale) {
  return values
    .map((value, index) => `${index === 0 ? "M" : "L"}${xScale(index).toFixed(2)},${yScale(value).toFixed(2)}`)
    .join(" ");
}

function renderTrace() {
  const trace = state.data.trace;
  const svg = el("traceChart");
  const width = 1000;
  const height = 360;
  const margin = { left: 50, right: 28, top: 28, bottom: 30 };
  const priceBottom = 235;
  const scoreTop = 264;
  const scoreBottom = 328;
  const prices = trace.flatMap((row) => [row.bidIndex, row.askIndex, row.midIndex]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const pricePad = Math.max((maxPrice - minPrice) * 0.09, 0.0001);
  const scoreAbs = Math.max(...trace.map((row) => Math.abs(row.scorePct)), 0.0001);
  const x = (index) => margin.left + (index / Math.max(trace.length - 1, 1)) * (width - margin.left - margin.right);
  const yPrice = (value) =>
    margin.top + ((maxPrice + pricePad - value) / (maxPrice - minPrice + 2 * pricePad)) * (priceBottom - margin.top);
  const yScore = (value) => scoreTop + ((scoreAbs - value) / (scoreAbs * 2)) * (scoreBottom - scoreTop);
  const rows = [0, 0.5, 1].map((fraction) => margin.top + fraction * (priceBottom - margin.top));
  const midPath = makePath(trace.map((row) => row.midIndex), x, yPrice);
  const bidPath = makePath(trace.map((row) => row.bidIndex), x, yPrice);
  const askPath = makePath(trace.map((row) => row.askIndex), x, yPrice);
  const scorePath = makePath(trace.map((row) => row.scorePct), x, yScore);
  const fillDots = trace
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.fill !== "none")
    .map(
      ({ row, index }) =>
        `<circle cx="${x(index).toFixed(2)}" cy="${yPrice(row.midIndex).toFixed(2)}" r="2.6" fill="#edf7f1" aria-hidden="true"></circle>`,
    )
    .join("");
  const selected = Math.min(state.traceIndex, trace.length - 1);
  const selectedX = x(selected);
  const zh = state.lang === "zh";

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = `
    <title id="trace-title">${zh ? "指数化买一、卖一、中间价与模型分数" : "Indexed bid, ask, mid-price, and model score"}</title>
    <desc id="trace-desc">${zh ? "带可交互游标的锁定历史决策窗口。" : "A locked historical decision window with an interactive cursor."}</desc>
    ${rows.map((row) => `<line class="grid-line" x1="${margin.left}" y1="${row}" x2="${width - margin.right}" y2="${row}"></line>`).join("")}
    <line class="grid-line" x1="${margin.left}" y1="${scoreTop}" x2="${width - margin.right}" y2="${scoreTop}"></line>
    <line class="grid-line" x1="${margin.left}" y1="${(scoreTop + scoreBottom) / 2}" x2="${width - margin.right}" y2="${(scoreTop + scoreBottom) / 2}"></line>
    <line class="axis-line" x1="${margin.left}" y1="${priceBottom}" x2="${width - margin.right}" y2="${priceBottom}"></line>
    <text x="${margin.left}" y="18">${zh ? "价格指数" : "PRICE INDEX"}</text>
    <text x="${margin.left}" y="255">${zh ? "模型分数（%）" : "MODEL SCORE (%)"}</text>
    <text x="${margin.left - 8}" y="${yPrice(maxPrice).toFixed(2)}" text-anchor="end">${number(maxPrice, 4)}</text>
    <text x="${margin.left - 8}" y="${yPrice(minPrice).toFixed(2)}" text-anchor="end">${number(minPrice, 4)}</text>
    <text x="${margin.left - 8}" y="${yScore(scoreAbs).toFixed(2)}" text-anchor="end">${signedNumber(scoreAbs, 3)}</text>
    <text x="${margin.left - 8}" y="${yScore(-scoreAbs).toFixed(2)}" text-anchor="end">${signedNumber(-scoreAbs, 3)}</text>
    <path d="${bidPath}" fill="none" stroke="#8abfff" stroke-width="1.15" opacity=".72"></path>
    <path d="${askPath}" fill="none" stroke="#8abfff" stroke-width="1.15" opacity=".72"></path>
    <path d="${midPath}" fill="none" stroke="#7fffc1" stroke-width="2.25"></path>
    <path d="${scorePath}" fill="none" stroke="#bea6ff" stroke-width="1.8"></path>
    ${fillDots}
    <line class="focus-line" x1="${selectedX}" y1="${margin.top}" x2="${selectedX}" y2="${scoreBottom}"></line>
    <circle cx="${selectedX}" cy="${yPrice(trace[selected].midIndex)}" r="4" fill="#07100c" stroke="#7fffc1" stroke-width="2"></circle>
  `;

  const slider = el("traceCursor");
  slider.max = String(trace.length - 1);
  slider.value = String(selected);
  updateTraceState(selected);
}

function updateTraceState(index) {
  const d = state.data;
  const row = d.trace[index];
  const zh = state.lang === "zh";
  const seconds = row.index * d.evidence.decisionIntervalSeconds;
  text("traceCursorOutput", zh ? `决策 + ${number(seconds)} 秒` : `decision + ${number(seconds)}s`);
  text("stateScore", `${signedNumber(row.scorePct, 5)}%`);
  text("stateQuote", languageName(row.quoteBias));
  text("stateFill", languageName(row.fill));
  text("stateInventory", `${languageName(row.inventory)} · ${signedNumber(row.exposurePct, 2)}%`);
  const [volatility, liquidity] = row.regime.split("|");
  text("stateRegime", `${languageName(volatility)} · ${languageName(liquidity)}`);
  text("stateOverride", row.emergency ? (zh ? "只减仓紧急退出" : "reduce-only emergency") : zh ? "只挂单正常报价" : "post-only normal");
}

function tableMarkup(headers, rows) {
  return `<thead><tr>${headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("")}</tr></thead><tbody>${rows
    .map((row) => `<tr>${row.map((cell, index) => `<${index === 0 ? "th scope=\"row\"" : "td"}>${escapeHtml(cell)}</${index === 0 ? "th" : "td"}>`).join("")}</tr>`)
    .join("")}</tbody>`;
}

function renderFactors() {
  const d = state.data;
  const families = d.factors.families;
  const maxAbs = Math.max(...families.map((row) => Math.abs(row.meanRankIc)));
  const zh = state.lang === "zh";

  el("factorBars").innerHTML = families
    .map((family) => {
      const width = (Math.abs(family.meanRankIc) / maxAbs) * 100;
      const direction = family.meanRankIc >= 0 ? "positive" : "negative";
      return `<div class="bar-row">
        <span class="bar-label">${escapeHtml(languageName(family.id))}</span>
        <span class="bar-track" aria-hidden="true"><span class="bar-fill ${direction}" style="--bar-width:${(width / 2).toFixed(3)}%"></span></span>
        <span class="bar-value">${signedNumber(family.meanRankIc, 4)}</span>
      </div>`;
    })
    .join("");

  el("factorTable").innerHTML = tableMarkup(
    zh ? ["因子家族", "特征数", "日度 Rank IC 均值", "正值天数占比"] : ["Factor family", "Features", "Mean daily Rank IC", "Positive-day share"],
    families.map((family) => [
      languageName(family.id),
      number(family.count),
      signedNumber(family.meanRankIc, 4),
      percent(family.positiveDayShare, 1),
    ]),
  );

  el("modelAblation").innerHTML = d.prediction.models
    .map(
      (model) => `<article class="model-card ${model.id === "m1" ? "current" : ""}">
        <h4>${model.id.toUpperCase()}</h4>
        <dl>
          <div><dt>${zh ? "极端准确率" : "Extreme accuracy"}</dt><dd>${percent(model.accuracy, 2)}</dd></div>
          <div><dt>${zh ? "日度 Rank IC" : "Daily Rank IC"}</dt><dd>${number(model.rankIc, 4)}</dd></div>
          <div><dt>${zh ? "经济效用" : "Economic utility"}</dt><dd>${scientific(model.economicUtility, 2)}</dd></div>
        </dl>
      </article>`,
    )
    .join("");

  text(
    "microstructureCallout",
    zh
      ? `B1 相对 B0 将三十秒极端方向准确率提高 ${percentPoint(d.prediction.microstructureAccuracyDeltaPp, 2)}，日度秩信息系数提高 ${signedNumber(d.prediction.microstructureRankIcDelta, 4)}；这一步隔离了逐笔成交与盘口微观因子的增量。`
      : `B1 versus B0 adds ${percentPoint(d.prediction.microstructureAccuracyDeltaPp, 2)} of ${d.evidence.predictionHorizonSeconds}-second extreme direction accuracy and ${signedNumber(d.prediction.microstructureRankIcDelta, 4)} of daily Rank IC, isolating the contribution of tick and order-book microstructure.`,
  );
}

function renderCoverage() {
  const points = state.data.prediction.coverageCurve;
  const svg = el("coverageChart");
  const width = 1000;
  const height = 340;
  const margin = { left: 62, right: 30, top: 30, bottom: 52 };
  const minX = Math.min(...points.map((row) => row.requestedCoverage));
  const maxX = Math.max(...points.map((row) => row.requestedCoverage));
  const minYRaw = Math.min(...points.map((row) => row.accuracy));
  const maxYRaw = Math.max(...points.map((row) => row.accuracy));
  const minY = Math.floor((minYRaw - 0.01) * 100) / 100;
  const maxY = Math.ceil((maxYRaw + 0.01) * 100) / 100;
  const x = (value) => margin.left + ((Math.log10(value) - Math.log10(minX)) / (Math.log10(maxX) - Math.log10(minX))) * (width - margin.left - margin.right);
  const y = (value) => margin.top + ((maxY - value) / (maxY - minY)) * (height - margin.top - margin.bottom);
  const path = points.map((row, index) => `${index === 0 ? "M" : "L"}${x(row.requestedCoverage).toFixed(2)},${y(row.accuracy).toFixed(2)}`).join(" ");
  const yTicks = Array.from({ length: 5 }, (_, index) => minY + (index / 4) * (maxY - minY));
  const zh = state.lang === "zh";

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = `
    <title id="coverage-title">${zh ? "不同预测覆盖率下的方向准确率" : "Direction accuracy by prediction coverage"}</title>
    <desc id="coverage-desc">${zh ? "包含六个点的时间外覆盖率曲线。" : "A six-point out-of-sample coverage curve."}</desc>
    ${yTicks.map((tick) => `<line class="grid-line" x1="${margin.left}" y1="${y(tick)}" x2="${width - margin.right}" y2="${y(tick)}"></line><text x="${margin.left - 10}" y="${y(tick) + 4}" text-anchor="end">${percent(tick, 1)}</text>`).join("")}
    <line class="axis-line" x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}"></line>
    <path d="${path}" fill="none" stroke="#7fffc1" stroke-width="2.5"></path>
    ${points
      .map(
        (row, index) => `<g><circle cx="${x(row.requestedCoverage)}" cy="${y(row.accuracy)}" r="${index === 0 ? 6 : 4}" fill="${index === 0 ? "#7fffc1" : "#07100c"}" stroke="#7fffc1" stroke-width="2"><title>${percent(row.requestedCoverage, 1)} · ${percent(row.accuracy, 2)} · N=${number(row.sampleCount)}</title></circle><text x="${x(row.requestedCoverage)}" y="${height - margin.bottom + 24}" text-anchor="middle">${percent(row.requestedCoverage, 1)}</text></g>`,
      )
      .join("")}
    <text x="${width / 2}" y="${height - 9}" text-anchor="middle">${zh ? "预测覆盖率（对数坐标）" : "PREDICTION COVERAGE (LOG SCALE)"}</text>
  `;

  const headline = points[0];
  const broad = points.at(-1);
  text(
    "coverageSummary",
    zh
      ? `${percent(headline.requestedCoverage, 1)} 覆盖率：${percent(headline.accuracy, 2)}；${percent(broad.requestedCoverage, 0)} 覆盖率：${percent(broad.accuracy, 2)}`
      : `${percent(headline.requestedCoverage, 1)} coverage: ${percent(headline.accuracy, 2)} · ${percent(broad.requestedCoverage, 0)} coverage: ${percent(broad.accuracy, 2)}`,
  );
  el("coverageTable").innerHTML = tableMarkup(
    zh ? ["目标覆盖率", "实际覆盖率", "方向准确率", "样本数"] : ["Requested coverage", "Actual coverage", "Direction accuracy", "Sample count"],
    points.map((row) => [percent(row.requestedCoverage, 1), percent(row.actualCoverage, 3), percent(row.accuracy, 2), number(row.sampleCount)]),
  );
}

function renderObjective() {
  const p = state.data.prediction;
  const validationAccuracyDelta = (p.validation.m1Accuracy - p.validation.b1Accuracy) * 100;
  const zh = state.lang === "zh";
  el("objectiveEvidence").innerHTML = `
    <article><span>${zh ? "验证期极端准确率增量" : "Validation extreme-accuracy delta"}</span><strong>${percentPoint(validationAccuracyDelta, 2)}</strong></article>
    <article><span>${zh ? "验证期经济效用增量" : "Validation economic-utility delta"}</span><strong>${signedNumber(p.validation.utilityDeltaPct, 1)}%</strong></article>
    <article><span>${zh ? "测试期经济效用增量" : "Test economic-utility delta"}</span><strong>${signedNumber(p.m1VsB1UtilityDeltaPct, 1)}%</strong></article>
  `;
  el("objectiveEvidence").setAttribute(
    "aria-label",
    zh
      ? `M1 相对 B1：验证期准确率提高 ${percentPoint(validationAccuracyDelta, 2)}，验证期效用提高 ${signedNumber(p.validation.utilityDeltaPct, 1)}%，测试期效用提高 ${signedNumber(p.m1VsB1UtilityDeltaPct, 1)}%；测试期准确率变化 ${percentPoint(p.m1VsB1AccuracyDeltaPp, 2)}。`
      : `M1 versus B1: validation accuracy ${percentPoint(validationAccuracyDelta, 2)}, validation utility ${signedNumber(p.validation.utilityDeltaPct, 1)}%, test utility ${signedNumber(p.m1VsB1UtilityDeltaPct, 1)}%, and test accuracy ${percentPoint(p.m1VsB1AccuracyDeltaPp, 2)}.`,
  );
}

function renderMarketStats() {
  const d = state.data;
  const mm = d.marketMaking;
  const m1 = mm.m1;
  const a = mm.assumptions;
  const zh = state.lang === "zh";
  text(
    "marketBoundary",
    zh
      ? `按时间顺序划分的时间外历史仿真，采用 ${number(a.leverage, 0)} 倍杠杆、正常只挂单（post-only，避免正常订单主动吃单）、紧急只减仓（reduce-only，只降低已有风险敞口）、挂单费率 ${percent(a.maker_fee, 3, true)} 与吃单费率 ${percent(a.taker_fee, 3, true)}。成交规则是历史执行代理，不是实盘队列模型。`
      : `Chronological out-of-sample historical simulation at ${number(a.leverage, 0)}× leverage, with post-only normal quotes, reduce-only emergency exits, ${percent(a.maker_fee, 3, true)} maker fees, and ${percent(a.taker_fee, 3, true)} taker fees. Fills use a historical execution proxy, not a live queue model.`,
  );
  text("marketReturn", percent(m1.total_return, 2, true));
  text("marketSharpe", number(m1.sharpe, 2));
  text("marketDrawdown", percent(m1.maximum_drawdown, 2));
  text("marketAdverse", percent(mm.comparison.relative_adverse_selection_reduction, 2, true));
}

function renderEquity() {
  const d = state.data;
  const m1 = d.marketMaking.equity.m1;
  const symmetric = d.marketMaking.equity.symmetric;
  const svg = el("equityChart");
  const width = 1000;
  const height = 420;
  const margin = { left: 66, right: 32, top: 26, bottom: 48 };
  const equityBottom = 300;
  const drawdownTop = 330;
  const drawdownBottom = 382;
  const values = [...m1, ...symmetric].map((row) => row.equityIndex);
  const minEquity = Math.min(100, ...values);
  const maxEquity = Math.max(...values);
  const equityPad = (maxEquity - minEquity) * 0.05;
  const minDrawdown = Math.min(...m1.map((row) => row.drawdownPct), -0.01);
  const x = (index) => margin.left + (index / Math.max(m1.length - 1, 1)) * (width - margin.left - margin.right);
  const yEquity = (value) => margin.top + ((maxEquity + equityPad - value) / (maxEquity + equityPad - minEquity)) * (equityBottom - margin.top);
  const yDrawdown = (value) => drawdownTop + ((0 - value) / (0 - minDrawdown)) * (drawdownBottom - drawdownTop);
  const m1Path = makePath(m1.map((row) => row.equityIndex), x, yEquity);
  const symmetricPath = makePath(symmetric.map((row) => row.equityIndex), x, yEquity);
  const ddPath = makePath(m1.map((row) => row.drawdownPct), x, yDrawdown);
  const ddArea = `${ddPath} L${x(m1.length - 1)},${drawdownTop} L${x(0)},${drawdownTop} Z`;
  const equityTicks = Array.from({ length: 5 }, (_, index) => minEquity + (index / 4) * (maxEquity - minEquity));
  const dateTicks = [0, Math.floor((m1.length - 1) / 2), m1.length - 1];
  const zh = state.lang === "zh";

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = `
    <title id="equity-title">${zh ? "M1 与对称做市权益曲线及 M1 回撤" : "M1 and symmetric maker equity with M1 drawdown"}</title>
    <desc id="equity-desc">${zh ? "相同费率和杠杆下按时间顺序进行的历史仿真。" : "Chronological historical simulation under identical fees and leverage."}</desc>
    ${equityTicks.map((tick) => `<line class="grid-line" x1="${margin.left}" y1="${yEquity(tick)}" x2="${width - margin.right}" y2="${yEquity(tick)}"></line><text x="${margin.left - 10}" y="${yEquity(tick) + 4}" text-anchor="end">${number(tick, 0)}</text>`).join("")}
    <text x="${margin.left}" y="16">${zh ? "权益指数（初始值 100）" : "EQUITY INDEX (INITIAL 100)"}</text>
    <path d="${symmetricPath}" fill="none" stroke="#f4c56a" stroke-width="1.8" opacity=".88"></path>
    <path d="${m1Path}" fill="none" stroke="#7fffc1" stroke-width="2.4"></path>
    <line class="grid-line" x1="${margin.left}" y1="${drawdownTop}" x2="${width - margin.right}" y2="${drawdownTop}"></line>
    <path d="${ddArea}" fill="rgba(255,146,134,.12)"></path>
    <path d="${ddPath}" fill="none" stroke="#ff9286" stroke-width="1.35"></path>
    <text x="${margin.left}" y="${drawdownTop - 8}">${zh ? "M1 日度回撤" : "M1 DAILY DRAWDOWN"}</text>
    <text x="${margin.left - 10}" y="${drawdownBottom}" text-anchor="end">${number(minDrawdown, 2)}%</text>
    ${dateTicks.map((index) => `<text x="${x(index)}" y="${height - 12}" text-anchor="${index === 0 ? "start" : index === m1.length - 1 ? "end" : "middle"}">${escapeHtml(m1[index].date)}</text>`).join("")}
  `;

  text(
    "equityCaption",
    zh
      ? `同费率、同杠杆的对称挂单基线净收益为 ${percent(d.marketMaking.symmetric.total_return, 2, true)}、夏普比率为 ${number(d.marketMaking.symmetric.sharpe, 2)}；M1 分别为 ${percent(d.marketMaking.m1.total_return, 2, true)} 与 ${number(d.marketMaking.m1.sharpe, 2)}，因此不主张模型在净账户指标上击败该基线。`
      : `The identical-fee, identical-leverage symmetric baseline returned ${percent(d.marketMaking.symmetric.total_return, 2, true)} with a ${number(d.marketMaking.symmetric.sharpe, 2)} Sharpe; M1 returned ${percent(d.marketMaking.m1.total_return, 2, true)} with a ${number(d.marketMaking.m1.sharpe, 2)} Sharpe. The model therefore does not claim superior net account performance.`,
  );
}

function renderAttribution() {
  const d = state.data;
  const a = d.marketMaking.attributionPct;
  const zh = state.lang === "zh";
  const rows = [
    ["spreadCapture", zh ? "价差捕获" : "Spread capture", a.spreadCapture],
    ["inventoryMarkout", zh ? "库存价格变化" : "Inventory markout", a.inventoryMarkout],
    ["makerCredit", zh ? "挂单费率补偿" : "Maker fee credit", a.makerCredit],
    ["takerCost", zh ? "紧急吃单成本" : "Emergency taker cost", a.takerCost],
  ];
  const maxAbs = Math.max(...rows.map((row) => Math.abs(row[2])));
  el("attributionBars").innerHTML = rows
    .map(
      ([id, label, value]) => `<div class="attribution-row">
        <div class="attribution-label"><span>${escapeHtml(label)}</span><strong>${signedNumber(value, 2)}%</strong></div>
        <div class="attribution-track" aria-hidden="true"><span class="${value < 0 ? "negative" : ""}" style="--width:${((Math.abs(value) / maxAbs) * 100).toFixed(3)}%"></span></div>
      </div>`,
    )
    .join("");
  text(
    "attributionTotal",
    zh
      ? `价格与价差合计 ${signedNumber(a.priceAndSpread, 2)}%；加入挂单费率补偿并扣除紧急吃单成本后，账户净收益为 ${percent(d.marketMaking.m1.total_return, 2, true)}。`
      : `Price plus spread totaled ${signedNumber(a.priceAndSpread, 2)}%. After maker fee credit and emergency taker cost, the account returned ${percent(d.marketMaking.m1.total_return, 2, true)}.`,
  );
  el("attributionTable").innerHTML = tableMarkup(
    zh ? ["损益组成", "相对初始权益"] : ["PnL component", "Return on initial equity"],
    rows.map(([, label, value]) => [label, `${signedNumber(value, 2)}%`]),
  );
}

function renderExecutionFacts() {
  const m1 = state.data.marketMaking.m1;
  const zh = state.lang === "zh";
  const facts = [
    [zh ? "完整库存回合" : "Completed episodes", number(m1.episode_count)],
    [zh ? "回合胜率" : "Episode win rate", percent(m1.episode_win_rate, 2)],
    [zh ? "报价成交机会率" : "Fill-opportunity rate", percent(m1.maker_fill_opportunity_rate, 2)],
    [zh ? "紧急吃单率" : "Emergency taker rate", percent(m1.emergency_taker_rate, 2)],
    [zh ? "平均持有时间" : "Average holding time", `${number(m1.average_holding_seconds, 2)}${zh ? " 秒" : "s"}`],
    [zh ? "最大绝对敞口" : "Maximum absolute exposure", percent(m1.maximum_absolute_exposure, 2)],
    [zh ? "三十秒成交后价格变化" : "30-second post-fill markout", percent(m1.markout_30s, 4, true)],
    [zh ? "利润因子" : "Profit factor", number(m1.profit_factor, 2)],
  ];
  el("executionFacts").innerHTML = facts
    .map(([label, value]) => `<article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`)
    .join("");
}

function heatColor(value, min, max) {
  const range = Math.max(max - min, 1e-12);
  const normalized = (value - min) / range;
  if (value < 0) {
    const alpha = 0.11 + (1 - normalized) * 0.18;
    return { bg: `rgba(255,146,134,${alpha.toFixed(3)})`, border: "rgba(255,146,134,.42)", text: "#ffd2cc" };
  }
  const alpha = 0.07 + normalized * 0.23;
  return { bg: `rgba(127,255,193,${alpha.toFixed(3)})`, border: "rgba(127,255,193,.38)", text: "#d9ffeb" };
}

function renderRegimes() {
  const d = state.data;
  const prediction = new Map(d.prediction.regimes.map((row) => [`${row.volatility}|${row.liquidity}`, row]));
  const execution = new Map(d.marketMaking.regimes.map((row) => [`${row.volatility}|${row.liquidity}`, row]));
  const volatilities = ["low", "medium", "high"];
  const liquidities = ["ample", "normal", "tight"];
  const values = volatilities.flatMap((volatility) =>
    liquidities.map((liquidity) =>
      state.regimeView === "prediction"
        ? prediction.get(`${volatility}|${liquidity}`).rankIc
        : execution.get(`${volatility}|${liquidity}`).return,
    ),
  );
  const min = Math.min(...values);
  const max = Math.max(...values);
  const zh = state.lang === "zh";
  const cells = [
    `<div class="heatmap-label column"></div>`,
    ...liquidities.map((liquidity) => `<div class="heatmap-label column">${escapeHtml(languageName(liquidity))}</div>`),
  ];
  volatilities.forEach((volatility) => {
    cells.push(`<div class="heatmap-label">${escapeHtml(languageName(volatility))}</div>`);
    liquidities.forEach((liquidity) => {
      const key = `${volatility}|${liquidity}`;
      const pred = prediction.get(key);
      const exec = execution.get(key);
      const value = state.regimeView === "prediction" ? pred.rankIc : exec.return;
      const style = heatColor(value, min, max);
      const primary = state.regimeView === "prediction" ? number(value, 4) : percent(value, 2, true);
      const secondary =
        state.regimeView === "prediction"
          ? zh
            ? `样本数 ${number(pred.sampleCount)}`
            : `N=${number(pred.sampleCount)}`
          : zh
            ? `三十秒价格变化 ${percent(exec.markout30s, 4, true)}`
            : `30s markout ${percent(exec.markout30s, 4, true)}`;
      cells.push(
        `<div class="heatmap-cell" style="--heat-bg:${style.bg};--heat-border:${style.border};--heat-text:${style.text}"><strong>${primary}</strong><small>${secondary}</small></div>`,
      );
    });
  });
  el("regimeHeatmap").innerHTML = cells.join("");
  text(
    "regimeLegend",
    state.regimeView === "prediction"
      ? zh
        ? `秩信息系数范围 ${number(min, 4)} 至 ${number(max, 4)}；九种状态全部为正。`
        : `Rank IC range ${number(min, 4)} to ${number(max, 4)}; all nine regimes are positive.`
      : zh
        ? `仿真收益范围 ${percent(min, 2, true)} 至 ${percent(max, 2, true)}；高波动状态为负。`
        : `Simulated-return range ${percent(min, 2, true)} to ${percent(max, 2, true)}; high-volatility regimes are negative.`,
  );

  el("regimeTable").innerHTML = tableMarkup(
    zh
      ? ["波动率", "流动性", "预测 Rank IC", "仿真收益", "三十秒成交后价格变化"]
      : ["Volatility", "Liquidity", "Prediction Rank IC", "Simulated return", "30s post-fill markout"],
    volatilities.flatMap((volatility) =>
      liquidities.map((liquidity) => {
        const pred = prediction.get(`${volatility}|${liquidity}`);
        const exec = execution.get(`${volatility}|${liquidity}`);
        return [languageName(volatility), languageName(liquidity), number(pred.rankIc, 4), percent(exec.return, 2, true), percent(exec.markout30s, 4, true)];
      }),
    ),
  );
}

function renderSystemStats() {
  const d = state.data;
  const b = d.factors.benchmark;
  const inference = d.factors.inference;
  const zh = state.lang === "zh";
  const stats = [
    [zh ? "逐笔成交" : "Tick trades", compact(d.data.sourceRows.trades)],
    [zh ? "L1 快照" : "L1 snapshots", compact(d.data.sourceRows.l1_quotes)],
    [zh ? "L10 快照" : "L10 snapshots", compact(d.data.sourceRows.orderbook_l10)],
    [zh ? "测试面板行数" : "Test-panel rows", compact(d.data.testPanelRows)],
    [zh ? "测试决策数" : "Test decisions", compact(d.data.testDecisionRows)],
    [zh ? "冻结因子" : "Frozen factors", number(d.data.factorCount)],
    [zh ? "热启动加速" : "Hot-path speedup", `${number(b.hotSpeedup, 2)}×`],
    [zh ? "批量推理吞吐" : "Batch inference", `${compact(inference.rowsPerSecond)} ${zh ? "行/秒" : "rows/s"}`],
    [zh ? "批量中位延迟" : "Median batch latency", `${number(inference.medianLatencySeconds * 1000, 2)} ms`],
    [zh ? "抽样平均绝对误差" : "Sample mean absolute error", scientific(b.meanAbsoluteError, 2)],
  ];
  el("systemStats").innerHTML = stats
    .map(([label, value]) => `<article><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></article>`)
    .join("");
}

function renderMethods() {
  const d = state.data;
  const a = d.marketMaking.assumptions;
  const zh = state.lang === "zh";
  text(
    "methodData",
    zh
      ? `逐笔成交只读取决策时刻之前的记录；L1/L10 盘口采用向后时间连接。测试期包含 ${number(d.data.eligibleSamples)} 个可评价样本。`
      : `Tick trades are capped at the decision timestamp; L1/L10 states use backward as-of joins. The test contains ${number(d.data.eligibleSamples)} eligible samples.`,
  );
  text(
    "methodModel",
    zh
      ? `B0 使用 ${number(d.data.selectedB0Features)} 个低频背景特征；B1 与 M1 使用相同的 ${number(d.data.selectedB1Features)} 维冻结信息集、样本和树容量。`
      : `B0 uses ${number(d.data.selectedB0Features)} low-frequency context features; B1 and M1 share the same ${number(d.data.selectedB1Features)}-feature frozen information set, samples, and tree capacity.`,
  );
  text(
    "methodOrder",
    zh
      ? `正常订单仅使用 post-only，紧急退出仅使用 reduce-only；绝对敞口上限 ${percent(a.exposure_max, 0)}，单次报价不超过可见 L1 深度的 ${percent(a.visible_l1_depth_cap, 0)}。`
      : `Normal orders are post-only and emergency exits are reduce-only; absolute exposure is capped at ${percent(a.exposure_max, 0)}, and each quote is capped at ${percent(a.visible_l1_depth_cap, 0)} of visible L1 depth.`,
  );
  text(
    "methodEvidence",
    zh
      ? `测试集只运行 ${number(d.evidence.testRunCount)} 次。结果是按时间顺序划分的历史时间外仿真，不是实盘交易；网页全部数值由同一冻结公开指标文件载入。`
      : `The test ran ${number(d.evidence.testRunCount)} time. Results are a chronological historical out-of-sample simulation, not live trading; every page metric loads from one frozen public metric file.`,
  );

  const rows = zh
    ? [
        ["三十秒收益排序在全部九种冻结市场状态中为正。", "真实订单队列位置、部分成交或网络延迟分布。"],
        ["微观结构信息相对低频背景具有独立预测增量。", "具体因子公式或对其他资产、交易所与期限的泛化。"],
        ["执行感知目标在同信息集与同容量下提高经济效用。", "自定义目标在测试期提高方向准确率或 Rank IC。"],
        ["模型偏斜相对对称挂单减少三十秒逆向选择。", "模型获得更高净收益或更高净夏普比率。"],
        ["账户在冻结机构做市费率与一倍杠杆情景下盈利。", "个人账户费率资格、实盘收益或生产就绪系统。"],
      ]
    : [
        ["Positive 30-second return ordering in all nine frozen market regimes.", "Real queue position, partial fills, or network-latency distributions."],
        ["Independent predictive lift from microstructure over low-frequency context.", "Factor formulas or generalization to other assets, venues, or horizons."],
        ["Higher economic utility from the execution-aware objective at equal information and capacity.", "Higher test direction accuracy or Rank IC from the custom objective."],
        ["Lower 30-second adverse selection from model skew versus symmetric quoting.", "Higher net return or higher net Sharpe than symmetric quoting."],
        ["A profitable account under the frozen institutional fee scenario and 1× leverage.", "Personal fee eligibility, live profits, or production readiness."],
      ];
  el("boundaryRows").innerHTML = rows.map((row) => `<tr><td>${escapeHtml(row[0])}</td><td>${escapeHtml(row[1])}</td></tr>`).join("");
}

function renderAll() {
  renderHero();
  renderTrace();
  renderFactors();
  renderCoverage();
  renderObjective();
  renderMarketStats();
  renderEquity();
  renderAttribution();
  renderExecutionFacts();
  renderRegimes();
  renderSystemStats();
  renderMethods();
}

function bindEvents() {
  el("languageToggle").addEventListener("click", () => setLanguage(state.lang === "en" ? "zh" : "en"));
  el("traceCursor").addEventListener("input", (event) => {
    state.traceIndex = Number(event.target.value);
    renderTrace();
  });
  document.querySelectorAll("[data-regime-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.regimeView = button.dataset.regimeView;
      document.querySelectorAll("[data-regime-view]").forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      renderRegimes();
    });
  });
}

async function load() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.schemaVersion !== "1.0") {
      throw new Error("Unexpected public metric schema");
    }
    state.data = data;
    state.traceIndex = Math.min(state.traceIndex, data.trace.length - 1);
    renderAll();
    if (window.location.hash) {
      await document.fonts?.ready;
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          const target = document.getElementById(window.location.hash.slice(1));
          target?.scrollIntoView({ block: "start" });
        }),
      );
    }
  } catch (error) {
    const warning = document.createElement("div");
    warning.className = "load-error";
    warning.setAttribute("role", "alert");
    warning.textContent =
      state.lang === "zh"
        ? "无法载入已验证的公开指标。请通过本地或托管网页服务器打开本页面。"
        : "Verified public metrics could not be loaded. Open this page through a local or hosted web server.";
    document.body.append(warning);
    console.error("Public metric load failed", error);
  }
}

bindEvents();
setLanguage("en");
load();
