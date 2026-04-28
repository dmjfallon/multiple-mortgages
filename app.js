const CURRENCIES = ["GBP", "USD", "EUR"];
const LANGUAGES = ["en", "es"];

let currentCurrency = "GBP";
let currentLanguage = "en";
let lastRenderPayload = null;

const PRESETS = {
  "lucas-olivia": {
    m1: { balance: "180000", rate: "4.7", years: "17", months: "5", extra: "500", name: { en: "Olivia", es: "Olivia" } },
    m2: { balance: "250000", rate: "5.1", years: "25", months: "0", extra: "100", name: { en: "Lucas", es: "Lucas" } },
    m3: null,
    rs: true,
    re: true
  },
  "different-rates": {
    m1: { balance: "250000", rate: "3.1", years: "13", months: "8", extra: "500", name: { en: "Lower rate", es: "Tipo más bajo" } },
    m2: { balance: "165000", rate: "5.9", years: "25", months: "0", extra: "0", name: { en: "Higher rate", es: "Tipo más alto" } },
    m3: null,
    rs: true,
    re: true
  },
  "rollover-only": {
    m1: { balance: "210000", rate: "4.9", years: "12", months: "0", extra: "0", name: { en: "Shorter mortgage", es: "Hipoteca más corta" } },
    m2: { balance: "198000", rate: "4.7", years: "25", months: "0", extra: "0", name: { en: "Longer mortgage", es: "Hipoteca más larga" } },
    m3: null,
    rs: true,
    re: true
  }
};

const TRANSLATIONS = {
  en: {
    metaTitle: "Multiple Mortgage Calculator – Model paying off multiple mortgages",
    metaDescription: "Free multiple mortgage calculator. Compare overpayments, redirect payments after payoff, and see how to become mortgage-free faster.",
    ogTitle: "Multiple Mortgage Payoff Calculator",
    ogDescription: "See how paying off multiple mortgages faster could save interest using overpayments and payment redirection.",
    languageLabel: "Language",
    currencyLabel: "Currency",
    heroTitle: "Calculator for paying off multiple mortgages",
    heroCopy: "See how different payment strategies affect multiple mortgages.",
    heroPointsTitle: "May be useful if you:",
    heroPoint1: "🏠 Own more than one property",
    heroPoint2: "🤝 Combine finances with a partner",
    heroPoint3: "📈 Are planning to buy or refinance",
    heroNoteLabel: "How it works:",
    heroNote: "The highest-interest mortgage is paid first. When one mortgage is cleared, its payments are redirected to the remaining balance.",
    mortgage: "Mortgage",
    labelOptional: "Label (optional)",
    balance: "Balance",
    interestRate: "Interest rate (%)",
    years: "Years",
    months: "Months",
    extraPerMonth: "Extra money per month",
    optional: "Optional",
    remove: "Remove",
    addMortgage3: "Add mortgage 3",
    optionsEyebrow: "Redirect options",
    optionsTitle: "After one mortgage is paid off",
    optionsCopy: "When a mortgage finishes, choose whether its usual payment should go towards the remaining debt.",
    redirectScheduled: "Redirect its standard payment",
    redirectExtra: "Redirect its extra payments",
    showResults: "📊 Show results",
    guideLink: "See full guide",
    feedbackLink: "Send feedback",
    moreInfo: "More info",
    aboutTitle: "🌊 About",
    aboutCopy: "Most mortgage calculators handle a single loan. This calculator models multiple mortgages, applies overpayments to the highest rate first, and compares that with keeping each mortgage separate.",
    notIncludedTitle: "🚫 What’s not included",
    notIncluded1: "Early repayment charges",
    notIncluded2: "Overpayment limits",
    notIncluded3: "Tax considerations",
    notIncluded4: "Rate changes or refinancing",
    notIncluded5: "Lender-specific rules",
    notIncluded6: "Comparing this with investing the money elsewhere",
    disclaimerTitle: "⚠️ Results are estimates",
    disclaimer1: "For illustration only, not financial advice.",
    disclaimer2: "Nothing is stored. Calculations run in your browser.",
    disclaimer3: "Anonymous usage analytics are used to improve the tool.",
    sourceLink: "View source code and documentation",
    allowedRange: "Allowed range: {range}",
    yearsShort: " years",
    monthsShort: " months",
    impactSaved: "⚡ {amount} saved",
    impactSavedCopy: "{time} earlier than keeping mortgages separate.",
    impactSameDate: "Same payoff date, lower interest.",
    impactMoreExpensive: "⚠ {amount} more expensive",
    impactSeparateCheaper: "Keeping mortgages separate is cheaper in this scenario.",
    impactNoDifference: "{amount} difference",
    impactSameResult: "Both strategies produce identical results.",
    standardMonthlyPayments: "Standard monthly payments",
    overallOutcome: "📊 Overall outcome",
    strategy: "Strategy",
    mortgageFreeDate: "📅 Mortgage-free date",
    totalInterestPaid: "💸 Total interest paid",
    interestSavedVsSeparate: "💰 Interest saved vs separate",
    highestInterestFirst: "🌊 Highest-rate mortgage first",
    keepSeparate: "🏠 Keep mortgages separate",
    noOverpayments: "⛔ No overpayments (standard payment only)",
    balanceOverTime: "Balance over time",
    balanceSubtitle: "Highest interest first vs keeping mortgages separate",
    totalSeparate: "Total – Separate",
    totalHighestInterest: "Total – Highest-rate first",
    effectiveRateTitle: "Rate saved on extra payments",
    effectiveRateCopy: "Think of this as the average mortgage rate your extra payments were reducing.",
    extraPaidInTitle: "Extra payments used",
    extraPaidInCopy: "Includes monthly overpayments and any redirected standard payment after a mortgage is cleared.",
    noExtraPaidIn: "No extra payments detected yet.",
    yearlyFlowTitle: "📊 Year-by-year payment flow (Highest Interest First)",
    yearlyFlowCopy: "“Extra paid in” includes overpayments and any redirected standard payments once a mortgage is finished.",
    year: "Year",
    totalInterest: "Total interest",
    extraPaidInColumn: "{name} extra paid in",
    sentToColumn: "Sent to {name}",
    balanceColumn: "{name} balance",
    total: "Total",
    shareButton: "🔗 Copy share link",
    copied: "✓ Copied",
    rateFallback: "No extra payments",
    monthSingular: "1 month",
    monthPlural: "{count} months",
    yearSingular: "1 year",
    yearPlural: "{count} years"
  },
  es: {
    metaTitle: "Calculadora de hipotecas múltiples – Simula cómo pagar varias hipotecas",
    metaDescription: "Calculadora gratis de hipotecas múltiples. Compara sobrepagos, redirige pagos al terminar una hipoteca y ve cómo quedar libre antes.",
    ogTitle: "Calculadora para pagar varias hipotecas",
    ogDescription: "Mira cuánto interés podrías ahorrar al pagar varias hipotecas más rápido con sobrepagos y redirección de pagos.",
    languageLabel: "Idioma",
    currencyLabel: "Divisa",
    heroTitle: "Calculadora para pagar varias hipotecas",
    heroCopy: "Mira cómo distintas estrategias de pago afectan a varias hipotecas.",
    heroPointsTitle: "Puede servirte si:",
    heroPoint1: "🏠 Tienes más de una propiedad",
    heroPoint2: "🤝 Compartes finanzas con tu pareja",
    heroPoint3: "📈 Estás pensando en comprar o refinanciar",
    heroNoteLabel: "Cómo funciona:",
    heroNote: "Primero se paga la hipoteca con el tipo más alto. Cuando una se termina, sus pagos se redirigen al saldo restante.",
    mortgage: "Hipoteca",
    labelOptional: "Etiqueta (opcional)",
    balance: "Saldo",
    interestRate: "Tipo de interés (%)",
    years: "Años",
    months: "Meses",
    extraPerMonth: "Dinero extra al mes",
    optional: "Opcional",
    remove: "Quitar",
    addMortgage3: "Añadir hipoteca 3",
    optionsEyebrow: "Opciones de redirección",
    optionsTitle: "Cuando una hipoteca se termina",
    optionsCopy: "Cuando una hipoteca termina, elige si su pago habitual debe ir hacia la deuda restante.",
    redirectScheduled: "Redirigir su pago estándar",
    redirectExtra: "Redirigir sus pagos extra",
    showResults: "📊 Ver resultados",
    guideLink: "Ver guía completa",
    feedbackLink: "Enviar feedback",
    moreInfo: "Más info",
    aboutTitle: "🌊 Sobre la herramienta",
    aboutCopy: "La mayoría de las calculadoras de hipoteca trabajan con un solo préstamo. Esta calculadora modela varias hipotecas, aplica los sobrepagos al tipo más alto y lo compara con mantener cada hipoteca por separado.",
    notIncludedTitle: "🚫 Qué no incluye",
    notIncluded1: "Comisiones por amortización anticipada",
    notIncluded2: "Límites de sobrepago",
    notIncluded3: "Impuestos",
    notIncluded4: "Cambios de tipo o refinanciación",
    notIncluded5: "Reglas específicas del banco",
    notIncluded6: "Compararlo con invertir el dinero en otro sitio",
    disclaimerTitle: "⚠️ Los resultados son estimaciones",
    disclaimer1: "Solo para orientarte, no es asesoramiento financiero.",
    disclaimer2: "No se guarda nada. Los cálculos se hacen en tu navegador.",
    disclaimer3: "Se usan analíticas anónimas para mejorar la herramienta.",
    sourceLink: "Ver código fuente y documentación",
    allowedRange: "Rango permitido: {range}",
    yearsShort: " años",
    monthsShort: " meses",
    impactSaved: "⚡ {amount} ahorrados",
    impactSavedCopy: "{time} antes que manteniendo las hipotecas separadas.",
    impactSameDate: "La misma fecha final, con menos interés.",
    impactMoreExpensive: "⚠ {amount} más caro",
    impactSeparateCheaper: "En este caso sale mejor mantener las hipotecas separadas.",
    impactNoDifference: "{amount} de diferencia",
    impactSameResult: "Las dos estrategias dan el mismo resultado.",
    standardMonthlyPayments: "Pagos mensuales estándar",
    overallOutcome: "📊 Resultado general",
    strategy: "Estrategia",
    mortgageFreeDate: "📅 Fecha sin hipoteca",
    totalInterestPaid: "💸 Interés total pagado",
    interestSavedVsSeparate: "💰 Interés ahorrado vs separado",
    highestInterestFirst: "🌊 Primero la hipoteca con el tipo más alto",
    keepSeparate: "🏠 Mantener hipotecas separadas",
    noOverpayments: "⛔ Sin sobrepagos (solo pago estándar)",
    balanceOverTime: "Saldo con el tiempo",
    balanceSubtitle: "Primero el tipo más alto vs mantener hipotecas separadas",
    totalSeparate: "Total – Separado",
    totalHighestInterest: "Total – Hipoteca con tipo más alto primero",
    effectiveRateTitle: "Tipo ahorrado con los pagos extra",
    effectiveRateCopy: "Piensa en esto como el tipo medio de hipoteca que tus pagos extra fueron reduciendo.",
    extraPaidInTitle: "Pagos extra usados",
    extraPaidInCopy: "Incluye sobrepagos mensuales y cualquier pago estándar redirigido después de cancelar una hipoteca.",
    noExtraPaidIn: "Todavía no hay pagos extra detectados.",
    yearlyFlowTitle: "📊 Flujo anual de pagos (tipo más alto primero)",
    yearlyFlowCopy: "“Extra pagado” incluye sobrepagos y cualquier pago estándar redirigido cuando una hipoteca ya ha terminado.",
    year: "Año",
    totalInterest: "Interés total",
    extraPaidInColumn: "Extra pagado en {name}",
    sentToColumn: "Enviado a {name}",
    balanceColumn: "Saldo de {name}",
    total: "Total",
    shareButton: "🔗 Copiar enlace",
    copied: "✓ Copiado",
    rateFallback: "Sin pagos extra",
    monthSingular: "1 mes",
    monthPlural: "{count} meses",
    yearSingular: "1 año",
    yearPlural: "{count} años"
  }
};

function t(key, vars = {}) {
  const table = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  let text = table[key] ?? TRANSLATIONS.en[key] ?? key;
  Object.entries(vars).forEach(([name, value]) => {
    text = text.replaceAll(`{${name}}`, value);
  });
  return text;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detectInitialLanguage() {
  const param = new URLSearchParams(window.location.search).get("lang");
  if (LANGUAGES.includes(param)) return param;

  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  return browser === "es" ? "es" : "en";
}

function syncLanguageInUrl() {
  const url = new URL(window.location.href);
  if (currentLanguage === "es") url.searchParams.set("lang", "es");
  else url.searchParams.delete("lang");
  history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function rerenderIfNeeded() {
  if (lastRenderPayload) {
    renderResults(
      lastRenderPayload.avalanche,
      lastRenderPayload.noOverpayResult,
      lastRenderPayload.hasM3
    );
  }
}

function setLanguage(language, options = {}) {
  const { syncUrl = true, rerender = true } = options;
  currentLanguage = LANGUAGES.includes(language) ? language : "en";
  document.documentElement.lang = currentLanguage;

  document.getElementById("lang-en-btn")?.classList.toggle("active", currentLanguage === "en");
  document.getElementById("lang-es-btn")?.classList.toggle("active", currentLanguage === "es");

  applyTranslations();
  syncPresetMortgageNames();

  if (syncUrl) syncLanguageInUrl();
  if (rerender) rerenderIfNeeded();

  if (typeof gtag === "function" && options.track !== false) {
    gtag("event", "language_change", { language: currentLanguage });
  }
}

function setCurrency(currency, options = {}) {
  const { rerender = true } = options;
  currentCurrency = CURRENCIES.includes(currency) ? currency : "GBP";
  window.__multipleMortgagesCurrency = currentCurrency;
  try {
    localStorage.setItem("multiple_mortgages_currency", currentCurrency);
  } catch {}
  const select = document.getElementById("currency-select");
  if (select) select.value = currentCurrency;
  updateCurrencyUI();
  if (rerender) rerenderIfNeeded();
}

function getCurrencySymbol() {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currentCurrency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0
  }).formatToParts(0).find((part) => part.type === "currency")?.value || "£";
}

function formatMoney(value, minimumFractionDigits = 0, maximumFractionDigits = 0) {
  return new Intl.NumberFormat(currentLanguage === "es" ? "es-ES" : undefined, {
    style: "currency",
    currency: currentCurrency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value || 0);
}

function formatPercent(value, digits = 1) {
  return new Intl.NumberFormat(currentLanguage === "es" ? "es-ES" : undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value || 0) + "%";
}

function formatMonths(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(years === 1 ? t("yearSingular") : t("yearPlural", { count: years }));
  }
  if (months > 0) {
    parts.push(months === 1 ? t("monthSingular") : t("monthPlural", { count: months }));
  }

  return parts.join(" ") || t("monthPlural", { count: 0 });
}

function mortgageFreeDateFromNow(months) {
  const now = new Date();
  const future = new Date(now.getFullYear(), now.getMonth() + months, 1);

  return future.toLocaleString(currentLanguage === "es" ? "es-ES" : undefined, {
    month: "long",
    year: "numeric"
  });
}

const FIELD_RULES = {
  "m1-balance": { min: 1, max: 100000000, money: true },
  "m2-balance": { min: 1, max: 100000000, money: true },
  "m3-balance": { min: 1, max: 100000000, money: true },
  "m1-rate": { min: 0, max: 25, suffix: "%" },
  "m2-rate": { min: 0, max: 25, suffix: "%" },
  "m3-rate": { min: 0, max: 25, suffix: "%" },
  "m1-years": { min: 0, max: 50, integer: true, suffixKey: "yearsShort" },
  "m2-years": { min: 0, max: 50, integer: true, suffixKey: "yearsShort" },
  "m3-years": { min: 0, max: 50, integer: true, suffixKey: "yearsShort" },
  "m1-months": { min: 0, max: 11, integer: true, suffixKey: "monthsShort" },
  "m2-months": { min: 0, max: 11, integer: true, suffixKey: "monthsShort" },
  "m3-months": { min: 0, max: 11, integer: true, suffixKey: "monthsShort" },
  "m1-extra": { min: 0, max: 100000, money: true },
  "m2-extra": { min: 0, max: 100000, money: true },
  "m3-extra": { min: 0, max: 100000, money: true }
};

function formatRange(rule) {
  if (rule.money) {
    return `${formatMoney(rule.min)} – ${formatMoney(rule.max)}`;
  }
  return `${rule.min} – ${rule.max}${rule.suffixKey ? t(rule.suffixKey) : (rule.suffix || "")}`;
}

function isMortgage3Enabled() {
  const card = document.getElementById("m3-card");
  return !!card && !card.classList.contains("hidden");
}

function getDefaultMortgageName(index) {
  return `${t("mortgage")} ${index}`;
}

function getDefaultMortgageNameForLanguage(index, language) {
  const table = TRANSLATIONS[language] || TRANSLATIONS.en;
  return `${table.mortgage || TRANSLATIONS.en.mortgage} ${index}`;
}

function syncDisplayedMortgageNames() {
  [1, 2, 3].forEach((index) => {
    const input = document.getElementById(`m${index}-name`);
    if (!input) return;

    const value = input.value.trim();
    const defaultNames = LANGUAGES.map((language) => getDefaultMortgageNameForLanguage(index, language));
    if (!value || defaultNames.includes(value)) {
      input.value = getDefaultMortgageName(index);
    }
  });
}

function getPresetKeyFromUrl() {
  return new URLSearchParams(window.location.search).get("preset");
}

function getPresetNameVariants(data, fallbackIndex) {
  const variants = new Set(LANGUAGES.map((language) => data?.name?.[language] || getDefaultMortgageNameForLanguage(fallbackIndex, language)));
  variants.add(getDefaultMortgageName(fallbackIndex));
  return variants;
}

function syncPresetMortgageNames() {
  const preset = PRESETS[getPresetKeyFromUrl()];
  if (!preset) return;

  [preset.m1, preset.m2, preset.m3].forEach((data, index) => {
    const input = document.getElementById(`m${index + 1}-name`);
    if (!input || !data) return;

    const currentValue = input.value.trim();
    if (!currentValue || getPresetNameVariants(data, index + 1).has(currentValue)) {
      input.value = data.name?.[currentLanguage] || getDefaultMortgageName(index + 1);
    }
  });
}

function clearMortgage3Fields() {
  ["name", "balance", "rate", "years", "months", "extra"].forEach((suffix) => {
    const input = document.getElementById(`m3-${suffix}`);
    if (input) input.value = "";
  });
}

function syncMortgage3UI() {
  const enabled = isMortgage3Enabled();
  document.getElementById("m3-add-card")?.classList.toggle("hidden", enabled);
}

function toggleMortgage3(forceOn = null) {
  const card = document.getElementById("m3-card");
  const shouldEnable = forceOn === null ? card.classList.contains("hidden") : !!forceOn;

  if (shouldEnable) {
    card.classList.remove("hidden");
    document.getElementById("m3-name").value = document.getElementById("m3-name").value || getDefaultMortgageName(3);
    document.getElementById("m3-balance").value = document.getElementById("m3-balance").value || "159000";
    document.getElementById("m3-rate").value = document.getElementById("m3-rate").value || "3.9";
    document.getElementById("m3-years").value = document.getElementById("m3-years").value || "15";
    document.getElementById("m3-months").value = document.getElementById("m3-months").value || "2";
    document.getElementById("m3-extra").value = document.getElementById("m3-extra").value || "0";
  } else {
    card.classList.add("hidden");
    clearMortgage3Fields();
  }

  syncMortgage3UI();
  applyTranslations();
  validateAll();
}

function addHelperText(input) {
  const rule = FIELD_RULES[input.id];
  if (!rule) return;

  const helper = document.createElement("div");
  helper.className = "helper-text";
  helper.dataset.fieldId = input.id;
  helper.innerText = t("allowedRange", { range: formatRange(rule) });
  input.parentNode.insertBefore(helper, input.nextSibling);
}

function updateCurrencyUI() {
  const symbol = getCurrencySymbol();
  document.querySelectorAll('[data-label-type="balance"]').forEach((label) => {
    label.textContent = `${t("balance")} (${symbol})`;
  });
  document.querySelectorAll('[data-label-type="extra"]').forEach((label) => {
    label.textContent = `${t("extraPerMonth")} (${symbol})`;
  });
  document.querySelectorAll(".helper-text[data-field-id]").forEach((helper) => {
    const fieldId = helper.dataset.fieldId;
    const rule = FIELD_RULES[fieldId];
    if (rule) helper.innerText = t("allowedRange", { range: formatRange(rule) });
  });
}

function applyTranslations() {
  const mappings = {
    "language-label": "languageLabel",
    "currency-label": "currencyLabel",
    "hero-title": "heroTitle",
    "hero-copy": "heroCopy",
    "hero-points-title": "heroPointsTitle",
    "hero-point-1": "heroPoint1",
    "hero-point-2": "heroPoint2",
    "hero-point-3": "heroPoint3",
    "hero-note-label": "heroNoteLabel",
    "hero-note": "heroNote",
    "m1-title": "mortgage",
    "m2-title": "mortgage",
    "m3-title": "mortgage",
    "m1-name-label": "labelOptional",
    "m2-name-label": "labelOptional",
    "m3-name-label": "labelOptional",
    "m1-rate-label": "interestRate",
    "m2-rate-label": "interestRate",
    "m3-rate-label": "interestRate",
    "m1-years-label": "years",
    "m2-years-label": "years",
    "m3-years-label": "years",
    "m1-months-label": "months",
    "m2-months-label": "months",
    "m3-months-label": "months",
    "m3-badge": "optional",
    "m3-remove-btn": "remove",
    "m3-add-title": "addMortgage3",
    "options-eyebrow": "optionsEyebrow",
    "options-title": "optionsTitle",
    "options-copy": "optionsCopy",
    "redirect-scheduled-label": "redirectScheduled",
    "redirect-extra-label": "redirectExtra",
    "calculate-btn": "showResults",
    "top-guide-link": "guideLink",
    "feedback-btn": "feedbackLink",
    "footer-summary": "moreInfo",
    "footer-about-title": "aboutTitle",
    "footer-about-copy": "aboutCopy",
    "footer-not-included-title": "notIncludedTitle",
    "footer-not-included-1": "notIncluded1",
    "footer-not-included-2": "notIncluded2",
    "footer-not-included-3": "notIncluded3",
    "footer-not-included-4": "notIncluded4",
    "footer-not-included-5": "notIncluded5",
    "footer-not-included-6": "notIncluded6",
    "footer-disclaimer-title": "disclaimerTitle",
    "footer-disclaimer-1": "disclaimer1",
    "footer-disclaimer-2": "disclaimer2",
    "footer-disclaimer-3": "disclaimer3",
    "footer-source-link": "sourceLink"
  };

  Object.entries(mappings).forEach(([id, key]) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (id === "m1-title") element.textContent = `${t(key)} 1`;
    else if (id === "m2-title") element.textContent = `${t(key)} 2`;
    else if (id === "m3-title") element.textContent = `${t(key)} 3`;
    else element.textContent = t(key);
  });

  document.getElementById("m1-name").placeholder = getDefaultMortgageName(1);
  document.getElementById("m2-name").placeholder = getDefaultMortgageName(2);
  document.getElementById("m3-name").placeholder = getDefaultMortgageName(3);
  syncDisplayedMortgageNames();

  document.title = t("metaTitle");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("metaDescription"));
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", t("ogTitle"));
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", t("ogDescription"));

  updateCurrencyUI();
  syncMortgage3UI();
}

function sanitizeAndClamp(input) {
  const rule = FIELD_RULES[input.id];
  if (!rule) return;

  let value = input.value.replace(/-/g, "").replace(/[^\d.]/g, "");

  const parts = value.split(".");
  if (parts.length > 2) {
    value = `${parts[0]}.${parts.slice(1).join("")}`;
  }

  if (!rule.integer && value.includes(".")) {
    const [whole, decimal] = value.split(".");
    value = `${whole}.${decimal.slice(0, 2)}`;
  }

  if (value !== "" && !value.endsWith(".")) {
    let num = parseFloat(value);
    if (!Number.isNaN(num)) {
      if (rule.integer) num = Math.floor(num);
      num = Math.min(Math.max(num, rule.min), rule.max);
      if (!rule.integer) num = Math.round(num * 100) / 100;
      input.value = String(num);
      return;
    }
  }

  input.value = value;
}

function validateAll() {
  const btn = document.getElementById("calculate-btn");
  let valid = true;
  const hasM3 = isMortgage3Enabled();

  Object.keys(FIELD_RULES).forEach((id) => {
    if (!hasM3 && id.startsWith("m3-")) return;
    const element = document.getElementById(id);
    if (!element) return;

    if (id.endsWith("-extra") && element.value === "") return;
    if (!element.value || !isFinite(parseFloat(element.value))) valid = false;
  });

  function hasZeroTerm(prefix) {
    const balance = parseFloat(document.getElementById(`${prefix}-balance`).value) || 0;
    const years = parseInt(document.getElementById(`${prefix}-years`).value, 10) || 0;
    const months = parseInt(document.getElementById(`${prefix}-months`).value, 10) || 0;
    return balance > 0 && (years * 12 + months) === 0;
  }

  if (hasZeroTerm("m1") || hasZeroTerm("m2")) valid = false;
  if (hasM3 && hasZeroTerm("m3")) valid = false;

  btn.disabled = !valid;
}

function setupValidation() {
  document.querySelectorAll("input").forEach((input) => {
    addHelperText(input);
    input.addEventListener("input", () => {
      sanitizeAndClamp(input);
      validateAll();

      if (typeof gtag === "function" && !window._editedTracked) {
        window._editedTracked = true;
        gtag("event", "input_edit");
      }
    });
  });

  validateAll();
}

function preloadDefaults() {
  setCurrency("GBP", { rerender: false });

  document.getElementById("m1-name").value = getDefaultMortgageName(1);
  document.getElementById("m1-balance").value = "180000";
  document.getElementById("m1-rate").value = "4.7";
  document.getElementById("m1-years").value = "17";
  document.getElementById("m1-months").value = "5";
  document.getElementById("m1-extra").value = "500";

  document.getElementById("m2-name").value = getDefaultMortgageName(2);
  document.getElementById("m2-balance").value = "250000";
  document.getElementById("m2-rate").value = "5.1";
  document.getElementById("m2-years").value = "25";
  document.getElementById("m2-months").value = "0";
  document.getElementById("m2-extra").value = "100";

  toggleMortgage3(false);
  document.getElementById("redirect-scheduled").checked = true;
  document.getElementById("redirect-extra").checked = true;
}

function syncPresetInUrl(presetKey) {
  const url = new URL(window.location.href);
  if (presetKey) url.searchParams.set("preset", presetKey);
  else url.searchParams.delete("preset");
  history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function applyPreset(name, options = {}) {
  const { syncUrl = true, autoCalculate = true } = options;
  const preset = PRESETS[name];
  if (!preset) return false;

  function fill(prefix, data, fallbackIndex) {
    document.getElementById(`${prefix}-name`).value = data.name?.[currentLanguage] || getDefaultMortgageName(fallbackIndex);
    document.getElementById(`${prefix}-balance`).value = data.balance;
    document.getElementById(`${prefix}-rate`).value = data.rate;
    document.getElementById(`${prefix}-years`).value = data.years;
    document.getElementById(`${prefix}-months`).value = data.months;
    document.getElementById(`${prefix}-extra`).value = data.extra;
  }

  fill("m1", preset.m1, 1);
  fill("m2", preset.m2, 2);

  if (preset.m3) {
    toggleMortgage3(true);
    fill("m3", preset.m3, 3);
  } else {
    toggleMortgage3(false);
  }

  document.getElementById("redirect-scheduled").checked = preset.rs;
  document.getElementById("redirect-extra").checked = preset.re;

  validateAll();
  if (syncUrl) syncPresetInUrl(name);
  if (autoCalculate) calculateFromUI();
  return true;
}

function getMortgage(prefix) {
  return {
    balance: parseFloat(document.getElementById(`${prefix}-balance`).value),
    rate: parseFloat(document.getElementById(`${prefix}-rate`).value),
    months:
      (parseInt(document.getElementById(`${prefix}-years`).value, 10) || 0) * 12 +
      (parseInt(document.getElementById(`${prefix}-months`).value, 10) || 0)
  };
}

function calculateFromUI() {
  const hasM3 = isMortgage3Enabled();
  const m1 = getMortgage("m1");
  const m2 = getMortgage("m2");
  const m3 = hasM3 ? getMortgage("m3") : null;

  const extra1 = parseFloat(document.getElementById("m1-extra").value) || 0;
  const extra2 = parseFloat(document.getElementById("m2-extra").value) || 0;
  const extra3 = parseFloat(document.getElementById("m3-extra").value) || 0;
  const redirectScheduled = document.getElementById("redirect-scheduled").checked;
  const redirectExtra = document.getElementById("redirect-extra").checked;

  const avalanche = calculateCascade(
    m1,
    m2,
    extra1,
    extra2,
    redirectScheduled,
    redirectExtra,
    "avalanche",
    m3,
    extra3
  );

  const noOverpayResult = calculateCascade(
    m1,
    m2,
    0,
    0,
    false,
    false,
    "avalanche",
    m3,
    0
  );

  if (typeof gtag === "function") {
    const totalBalance = m1.balance + m2.balance + (m3 ? m3.balance : 0);
    const totalExtra = extra1 + extra2 + (m3 ? extra3 : 0);
    const totalMonths = m1.months + m2.months + (m3 ? m3.months : 0);

    let realism = "realistic";
    if (totalBalance < 10000) realism = "very_low_balance";
    if (totalBalance > 2000000) realism = "very_high_balance";
    if (totalExtra > 5000) realism = "extreme_overpayment";
    if (totalMonths > 600) realism = "extreme_term";

    let balanceBand = "100k_300k";
    if (totalBalance < 100000) balanceBand = "under_100k";
    else if (totalBalance < 200000) balanceBand = "100k_200k";
    else if (totalBalance < 300000) balanceBand = "200k_300k";
    else if (totalBalance < 500000) balanceBand = "300k_500k";
    else if (totalBalance < 800000) balanceBand = "500k_800k";
    else balanceBand = "800k_plus";

    window._calcCount = (window._calcCount || 0) + 1;

    gtag("event", "calculate", {
      balance_band: balanceBand,
      realism,
      overpayments: totalExtra > 0 ? "yes" : "no",
      redirect_scheduled: redirectScheduled ? "yes" : "no",
      redirect_extra: redirectExtra ? "yes" : "no",
      calc_count: window._calcCount
    });
  }

  renderResults(avalanche, noOverpayResult, hasM3);
  document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function getMortgageNames(hasM3) {
  const names = [
    document.getElementById("m1-name")?.value?.trim() || getDefaultMortgageName(1),
    document.getElementById("m2-name")?.value?.trim() || getDefaultMortgageName(2)
  ];
  if (hasM3) names.push(document.getElementById("m3-name")?.value?.trim() || getDefaultMortgageName(3));
  return names;
}

function calculateEffectiveSavings(avalanche, mortgageNames) {
  const totalsTo = Array(mortgageNames.length).fill(0);
  const totalsFrom = Array(mortgageNames.length).fill(0);
  const rates = [
    parseFloat(document.getElementById("m1-rate").value) || 0,
    parseFloat(document.getElementById("m2-rate").value) || 0
  ];
  if (mortgageNames.length === 3) rates.push(parseFloat(document.getElementById("m3-rate").value) || 0);

  (avalanche.cascade.yearly || []).forEach((year) => {
    mortgageNames.forEach((_, index) => {
      totalsTo[index] += year.extraToByMortgage?.[index] || 0;
      totalsFrom[index] += year.fromByMortgage?.[index] || 0;
    });
  });

  const totalExtraPaidIn = totalsFrom.reduce((sum, value) => sum + value, 0);
  const weightedRateSum = totalsTo.reduce((sum, amount, index) => sum + amount * rates[index], 0);

  return {
    effectiveRate: totalExtraPaidIn > 0 ? weightedRateSum / totalExtraPaidIn : 0,
    totalExtraPaidIn
  };
}

function buildImpactBox(savedVsSeparate, monthsDiff) {
  const absInterest = Math.abs(savedVsSeparate);
  const absMonths = Math.abs(monthsDiff);

  let cssClass = "impact-neutral";
  let headline = "";
  let subline = "";

  if (savedVsSeparate > 0) {
    cssClass = "impact-positive";
    headline = t("impactSaved", { amount: formatMoney(absInterest, 2, 2) });
    subline = absMonths > 0
      ? t("impactSavedCopy", { time: formatMonths(absMonths) })
      : t("impactSameDate");
  } else if (savedVsSeparate < 0) {
    cssClass = "impact-negative";
    headline = t("impactMoreExpensive", { amount: formatMoney(absInterest, 2, 2) });
    subline = t("impactSeparateCheaper");
  } else {
    headline = t("impactNoDifference", { amount: formatMoney(0, 2, 2) });
    subline = t("impactSameResult");
  }

  return `
    <div class="impact-summary ${cssClass}">
      <strong>${headline}</strong>
      <div>${subline}</div>
    </div>
  `;
}

function buildInsightGrid(avalanche, mortgageNames) {
  const { effectiveRate, totalExtraPaidIn } = calculateEffectiveSavings(avalanche, mortgageNames);
  const rateValue = totalExtraPaidIn > 0 ? formatPercent(effectiveRate, 1) : t("rateFallback");
  const totalValue = totalExtraPaidIn > 0 ? formatMoney(Math.round(totalExtraPaidIn)) : "—";

  return `
    <div class="insight-grid">
      <div class="insight-card">
        <h3>${t("effectiveRateTitle")}</h3>
        <span class="insight-value">${rateValue}</span>
        <div class="insight-copy">${t("effectiveRateCopy")}</div>
      </div>
      <div class="insight-card">
        <h3>${t("extraPaidInTitle")}</h3>
        <span class="insight-value">${totalValue}</span>
        <div class="insight-copy">${totalExtraPaidIn > 0 ? t("extraPaidInCopy") : t("noExtraPaidIn")}</div>
      </div>
    </div>
  `;
}

function buildScenarioSummaryBox(avalanche, noOverpayResult, mortgageNames, isCascadeBetter, isCascadeWorse) {
  const cascade = avalanche.cascade;
  const baseline = avalanche.baseline;
  const noOverpay = noOverpayResult.baseline;

  const cascadeDate = mortgageFreeDateFromNow(cascade.months);
  const baselineDate = mortgageFreeDateFromNow(baseline.months);
  const noOverpayDate = mortgageFreeDateFromNow(noOverpay.months);

  const cascadeInterest = Math.round(cascade.interest);
  const baselineInterest = Math.round(baseline.interest);
  const noOverpayInterest = Math.round(noOverpay.interest);
  const savedVsSeparate = baselineInterest - cascadeInterest;

  const scheduled = [avalanche.scheduled1 || 0, avalanche.scheduled2 || 0, avalanche.scheduled3 || 0];
  const standardPaymentLines = mortgageNames
    .map((name, index) => `${escapeHtml(name)}: ${formatMoney(Math.round(scheduled[index] || 0))}`)
    .join("<br>");

  return `
    <div class="strategy-summary">
      <div class="standard-payments">
        <strong>${t("standardMonthlyPayments")}</strong><br>
        ${standardPaymentLines}
      </div>

      <h3>${t("overallOutcome")}</h3>

      <table class="strategy-table">
        <thead>
          <tr>
            <th>${t("strategy")}</th>
            <th>${t("mortgageFreeDate")}</th>
            <th>${t("totalInterestPaid")}</th>
            <th>${t("interestSavedVsSeparate")}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="${isCascadeBetter ? "row-highlight" : ""}">
            <td>${t("highestInterestFirst")}</td>
            <td>${cascadeDate}</td>
            <td>${formatMoney(cascadeInterest)}</td>
            <td>${savedVsSeparate > 0 ? formatMoney(savedVsSeparate) : savedVsSeparate < 0 ? `-${formatMoney(Math.abs(savedVsSeparate))}` : "—"}</td>
          </tr>
          <tr class="${isCascadeWorse ? "row-highlight" : ""}">
            <td>${t("keepSeparate")}</td>
            <td>${baselineDate}</td>
            <td>${formatMoney(baselineInterest)}</td>
            <td>—</td>
          </tr>
          <tr>
            <td>${t("noOverpayments")}</td>
            <td>${noOverpayDate}</td>
            <td>${formatMoney(noOverpayInterest)}</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function buildYearlyTable(result, mortgageNames) {
  const yearly = result.cascade.yearly || [];
  let rows = "";

  let totalInterest = 0;
  const totalFrom = Array(mortgageNames.length).fill(0);
  const totalTo = Array(mortgageNames.length).fill(0);

  yearly.forEach((year) => {
    totalInterest += year.interest;
    mortgageNames.forEach((_, index) => {
      totalFrom[index] += year.fromByMortgage?.[index] || 0;
      totalTo[index] += year.extraToByMortgage?.[index] || 0;
    });

    const fromCells = mortgageNames
      .map((_, index) => `<td>${formatMoney(Math.round(year.fromByMortgage?.[index] || 0))}</td>`)
      .join("");
    const toCells = mortgageNames
      .map((_, index) => `<td>${formatMoney(Math.round(year.extraToByMortgage?.[index] || 0))}</td>`)
      .join("");
    const balanceCells = mortgageNames
      .map((_, index) => `<td>${formatMoney(Math.round(year.endBalances?.[index] || 0))}</td>`)
      .join("");

    rows += `
      <tr>
        <td>${year.year}</td>
        ${balanceCells}
        <td>${formatMoney(Math.round(year.interest))}</td>
        ${fromCells}
        ${toCells}
      </tr>
    `;
  });

  const fromHeaders = mortgageNames
    .map((name) => `<th>${t("extraPaidInColumn", { name: escapeHtml(name) })}</th>`)
    .join("");
  const toHeaders = mortgageNames
    .map((name) => `<th>${t("sentToColumn", { name: escapeHtml(name) })}</th>`)
    .join("");
  const balanceHeaders = mortgageNames
    .map((name) => `<th>${t("balanceColumn", { name: escapeHtml(name) })}</th>`)
    .join("");
  const totalFromCells = totalFrom.map((value) => `<td>${formatMoney(Math.round(value))}</td>`).join("");
  const totalToCells = totalTo.map((value) => `<td>${formatMoney(Math.round(value))}</td>`).join("");
  const dashCells = mortgageNames.map(() => "<td>—</td>").join("");

  return `
    <details class="milestone-card">
      <summary style="cursor:pointer; font-weight:600;">${t("yearlyFlowTitle")}</summary>
      <div style="font-size:13px; opacity:0.7; margin:8px 0 14px 0;">
        ${t("yearlyFlowCopy")}
      </div>
      <div class="table-wrapper">
        <table class="milestone-table">
          <thead>
            <tr>
              <th>${t("year")}</th>
              ${balanceHeaders}
              <th>${t("totalInterest")}</th>
              ${fromHeaders}
              ${toHeaders}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr style="font-weight:600; border-top:2px solid rgba(255,255,255,0.18);">
              <td>${t("total")}</td>
              ${dashCells}
              <td>${formatMoney(Math.round(totalInterest))}</td>
              ${totalFromCells}
              ${totalToCells}
            </tr>
          </tfoot>
        </table>
      </div>
    </details>
  `;
}

function renderResults(avalanche, noOverpayResult, hasM3 = false) {
  lastRenderPayload = { avalanche, noOverpayResult, hasM3 };

  const mortgageNames = getMortgageNames(hasM3);
  const safeNames = mortgageNames.map(escapeHtml);
  const baseline = avalanche.baseline;
  const cascade = avalanche.cascade;
  const rawInterestDiff = baseline.interest - cascade.interest;
  const rawMonthsDiff = baseline.months - cascade.months;

  const totalDatasetStart = hasM3 ? 6 : 4;
  const legendM3 = hasM3 ? `
    <div class="legend-item" data-index="4"><span class="legend-line m3-sep"></span> ${safeNames[2]} (${t("keepSeparate").replace("🏠 ", "")})</div>
    <div class="legend-item" data-index="5"><span class="legend-line m3-cas"></span> ${safeNames[2]} (${t("highestInterestFirst").replace("🌊 ", "")})</div>
  ` : "";

  document.getElementById("results").innerHTML = `
    ${buildImpactBox(rawInterestDiff, rawMonthsDiff)}
    ${buildScenarioSummaryBox(avalanche, noOverpayResult, mortgageNames, rawInterestDiff > 0, rawInterestDiff < 0)}

    <div class="chart-card">
      <h3>${t("balanceOverTime")}</h3>
      <div style="font-size:13px; font-weight:400; opacity:0.7;">${t("balanceSubtitle")}</div>
      <canvas id="balanceChart"></canvas>
      <div class="manual-legend">
        <div class="legend-item" data-index="0"><span class="legend-line m1-sep"></span> ${safeNames[0]} (${t("keepSeparate").replace("🏠 ", "")})</div>
        <div class="legend-item" data-index="1"><span class="legend-line m1-cas"></span> ${safeNames[0]} (${t("highestInterestFirst").replace("🌊 ", "")})</div>
        <div class="legend-item" data-index="2"><span class="legend-line m2-sep"></span> ${safeNames[1]} (${t("keepSeparate").replace("🏠 ", "")})</div>
        <div class="legend-item" data-index="3"><span class="legend-line m2-cas"></span> ${safeNames[1]} (${t("highestInterestFirst").replace("🌊 ", "")})</div>
        ${legendM3}
        <div class="legend-item total-item active" data-index="${totalDatasetStart}"><span class="legend-line total-sep"></span> ${t("totalSeparate")}</div>
        <div class="legend-item total-item active" data-index="${totalDatasetStart + 1}"><span class="legend-line total-cas"></span> ${t("totalHighestInterest")}</div>
      </div>
    </div>

    ${buildInsightGrid(avalanche, mortgageNames)}
    ${buildYearlyTable(avalanche, mortgageNames)}

    <div class="share-actions">
      <button onclick="shareScenario()">${t("shareButton")}</button>
    </div>
  `;

  renderBalanceChart({
    baselineTotal: baseline.balances,
    cascadeTotal: cascade.balances,
    baselineM1: baseline.m1?.balances || [0],
    baselineM2: baseline.m2?.balances || [0],
    baselineM3: baseline.m3?.balances || [0],
    cascadeM1: cascade.m1Balances || [0],
    cascadeM2: cascade.m2Balances || [0],
    cascadeM3: cascade.m3Balances || [0],
    m1Name: mortgageNames[0],
    m2Name: mortgageNames[1],
    m3Name: mortgageNames[2] || getDefaultMortgageName(3),
    hasM3,
    separateLabel: t("keepSeparate").replace("🏠 ", ""),
    strategyLabel: t("highestInterestFirst").replace("🌊 ", ""),
    totalSeparateLabel: t("totalSeparate"),
    totalStrategyLabel: t("totalHighestInterest")
  });

  setTimeout(() => {
    const legendItems = document.querySelectorAll(".legend-item");
    const chart = window.balanceChartInstance;
    legendItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.dataset.index, 10);
        const visible = chart.isDatasetVisible(index);
        chart.setDatasetVisibility(index, !visible);
        chart.update();
        item.classList.toggle("active");
      });
    });
  }, 0);
}

function getCurrentState() {
  const includeM3 = isMortgage3Enabled();

  return {
    v: 4,
    lang: currentLanguage,
    ccy: currentCurrency,
    m1: {
      b: document.getElementById("m1-balance").value,
      r: document.getElementById("m1-rate").value,
      y: document.getElementById("m1-years").value,
      m: document.getElementById("m1-months").value,
      e: document.getElementById("m1-extra").value,
      n: document.getElementById("m1-name").value
    },
    m2: {
      b: document.getElementById("m2-balance").value,
      r: document.getElementById("m2-rate").value,
      y: document.getElementById("m2-years").value,
      m: document.getElementById("m2-months").value,
      e: document.getElementById("m2-extra").value,
      n: document.getElementById("m2-name").value
    },
    m3: includeM3 ? {
      b: document.getElementById("m3-balance").value,
      r: document.getElementById("m3-rate").value,
      y: document.getElementById("m3-years").value,
      m: document.getElementById("m3-months").value,
      e: document.getElementById("m3-extra").value,
      n: document.getElementById("m3-name").value
    } : null,
    rs: document.getElementById("redirect-scheduled").checked ? 1 : 0,
    re: document.getElementById("redirect-extra").checked ? 1 : 0
  };
}

function encodeState(state) {
  return LZString.compressToEncodedURIComponent(JSON.stringify(state));
}

function decodeState(encoded) {
  try {
    return JSON.parse(LZString.decompressFromEncodedURIComponent(encoded));
  } catch {
    return null;
  }
}

function applyState(state) {
  if (state.lang) setLanguage(state.lang, { syncUrl: true, rerender: false, track: false });
  if (state.ccy) setCurrency(state.ccy, { rerender: false });

  document.getElementById("m1-balance").value = state.m1?.b || "";
  document.getElementById("m1-rate").value = state.m1?.r || "";
  document.getElementById("m1-years").value = state.m1?.y || "";
  document.getElementById("m1-months").value = state.m1?.m || "";
  document.getElementById("m1-extra").value = state.m1?.e || "";
  document.getElementById("m1-name").value = state.m1?.n || getDefaultMortgageName(1);

  document.getElementById("m2-balance").value = state.m2?.b || "";
  document.getElementById("m2-rate").value = state.m2?.r || "";
  document.getElementById("m2-years").value = state.m2?.y || "";
  document.getElementById("m2-months").value = state.m2?.m || "";
  document.getElementById("m2-extra").value = state.m2?.e || "";
  document.getElementById("m2-name").value = state.m2?.n || getDefaultMortgageName(2);

  if (state.m3 && state.m3.b) {
    toggleMortgage3(true);
    document.getElementById("m3-balance").value = state.m3?.b || "";
    document.getElementById("m3-rate").value = state.m3?.r || "";
    document.getElementById("m3-years").value = state.m3?.y || "";
    document.getElementById("m3-months").value = state.m3?.m || "";
    document.getElementById("m3-extra").value = state.m3?.e || "";
    document.getElementById("m3-name").value = state.m3?.n || getDefaultMortgageName(3);
  } else {
    toggleMortgage3(false);
  }

  document.getElementById("redirect-scheduled").checked = !!state.rs;
  document.getElementById("redirect-extra").checked = !!state.re;
}

function loadScenarioFromHash() {
  if (!window.location.hash.startsWith("#c=")) return false;

  const state = decodeState(window.location.hash.substring(3));
  if (!state || ![1, 2, 3, 4].includes(state.v)) return false;

  applyState(state);
  validateAll();
  calculateFromUI();
  return true;
}

function shareScenario() {
  const encoded = encodeState(getCurrentState());
  const langQuery = currentLanguage === "es" ? "?lang=es" : "";
  const shareUrl = `${window.location.origin}${window.location.pathname}${langQuery}#c=${encoded}`;
  navigator.clipboard.writeText(shareUrl);

  if (typeof gtag === "function") {
    gtag("event", "share_scenario");
  }

  const btn = document.querySelector(".share-actions button");
  if (btn) {
    btn.innerText = t("copied");
    setTimeout(() => {
      btn.innerText = t("shareButton");
    }, 1500);
  }
}

window.calculateFromUI = calculateFromUI;
window.toggleMortgage3 = toggleMortgage3;
window.shareScenario = shareScenario;
window.setLanguage = setLanguage;
window.loadPreset = function(name) {
  applyPreset(name, { syncUrl: true, autoCalculate: true });
};
window.sendFeedback = function() {
  const address = ["david", "@", "dmjfallon.com"].join("");
  window.location.href = `mailto:${address}?subject=${encodeURIComponent("Multiple Mortgages feedback")}`;
};

document.addEventListener("DOMContentLoaded", () => {
  setLanguage(detectInitialLanguage(), { syncUrl: false, rerender: false, track: false });
  preloadDefaults();
  setupValidation();

  const currencySelect = document.getElementById("currency-select");
  currencySelect.addEventListener("change", function() {
    setCurrency(this.value);
  });

  if (!loadScenarioFromHash()) {
    const preset = new URLSearchParams(window.location.search).get("preset");
    if (preset && applyPreset(preset, { syncUrl: false, autoCalculate: true })) {
      return;
    }
    validateAll();
  }

  document.getElementById("redirect-scheduled").addEventListener("change", function() {
    if (typeof gtag === "function") {
      gtag("event", "toggle_redirect_scheduled", { value: this.checked ? "on" : "off" });
    }
  });

  document.getElementById("redirect-extra").addEventListener("change", function() {
    if (typeof gtag === "function") {
      gtag("event", "toggle_redirect_extra", { value: this.checked ? "on" : "off" });
    }
  });

  applyTranslations();
});

window.addEventListener("hashchange", () => {
  loadScenarioFromHash();
});
