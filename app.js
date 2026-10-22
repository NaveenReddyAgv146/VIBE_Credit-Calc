/**
 * Simple, Lightweight VIBE Credits Calculator
 * Formula: ((0.4·I + 0.3·C + 0.3·F)^1.2 * log(1+H)/log(11)) / BandMultiplier
 * Quality Gate: If Feedback = 'Does Not Meet', Final Score = 0
 */

const IMPACT_MAP = {
  high: 5 / 5,    // 1.0
  medium: 3 / 5,  // 0.6
  low: 1 / 5      // 0.2
};

const COMPLEXITY_MAP = {
  high: 3 / 3,    // 1.0
  medium: 2 / 3,  // 0.6667
  low: 1 / 3      // 0.3333
};

const FEEDBACK_MAP = {
  exceeds: 5 / 5,        // 1.0
  meets: 3 / 5,          // 0.6
  does_not_meet: 1 / 5   // 0.2 (Triggers Quality Gate = 0)
};

const BAND_MAP = {
  A1: 0.8,
  A2: 0.9,
  A3: 1.0,
  A4: 1.1,
  A5: 1.3,
  A6: 1.5
};

const PRESETS = {
  1: { impact: 'high', complexity: 'medium', feedback: 'exceeds', hours: 6, band: 'A3' },
  2: { impact: 'low', complexity: 'low', feedback: 'meets', hours: 10, band: 'A3' },
  4: { impact: 'high', complexity: 'high', feedback: 'does_not_meet', hours: 9, band: 'A3' },
  6: { impact: 'high', complexity: 'medium', feedback: 'exceeds', hours: 3, band: 'A3' }
};

// Elements
const impactSelect = document.getElementById('impact-select');
const complexitySelect = document.getElementById('complexity-select');
const feedbackSelect = document.getElementById('feedback-select');
const hoursInput = document.getElementById('hours-input');
const bandSelect = document.getElementById('band-select');

const finalScoreEl = document.getElementById('final-score');
const tierBadgeEl = document.getElementById('tier-badge');
const qualityGateMsgEl = document.getElementById('quality-gate-msg');

const valDisplay = document.getElementById('val-display');
const effortDisplay = document.getElementById('effort-display');
const baseDisplay = document.getElementById('base-display');
const bandDisplay = document.getElementById('band-display');

function calculate() {
  const impactVal = impactSelect.value;
  const complexityVal = complexitySelect.value;
  const feedbackVal = feedbackSelect.value;
  const hours = Math.max(0, parseFloat(hoursInput.value) || 0);
  const bandVal = bandSelect.value;

  const I = IMPACT_MAP[impactVal];
  const C = COMPLEXITY_MAP[complexityVal];
  const F = FEEDBACK_MAP[feedbackVal];
  const bandMultiplier = BAND_MAP[bandVal];

  // Step 3: Value calculation
  const weightedSum = (0.4 * I) + (0.3 * C) + (0.3 * F);
  const value = Math.pow(weightedSum, 1.2);

  // Step 4: Effort calculation (log base doesn't matter for ratio, natural log is standard)
  const effort = Math.log(1 + hours) / Math.log(1 + 10);

  // Step 5: Base Contribution
  const base = value * effort;

  // Step 6: Band Adjustment
  const adjustedScore = base / bandMultiplier;

  // Step 7: Quality Gate
  const isGateFail = (feedbackVal === 'does_not_meet');
  const finalScore = isGateFail ? 0.0 : adjustedScore;

  // Render Breakdown
  valDisplay.textContent = value.toFixed(2);
  effortDisplay.textContent = effort.toFixed(2);
  baseDisplay.textContent = base.toFixed(2);
  bandDisplay.textContent = bandMultiplier.toFixed(1);

  // Render Final Score
  finalScoreEl.textContent = finalScore.toFixed(2);

  // Quality Gate Alert
  if (isGateFail) {
    qualityGateMsgEl.classList.remove('hidden');
  } else {
    qualityGateMsgEl.classList.add('hidden');
  }

  // Render Tier Badge
  tierBadgeEl.className = 'badge';
  if (isGateFail) {
    tierBadgeEl.classList.add('badge-improve');
    tierBadgeEl.textContent = 'Gate Failed';
  } else if (finalScore > 0.85) {
    tierBadgeEl.classList.add('badge-outstanding');
    tierBadgeEl.textContent = 'Outstanding';
  } else if (finalScore >= 0.70) {
    tierBadgeEl.classList.add('badge-strong');
    tierBadgeEl.textContent = 'Strong';
  } else if (finalScore >= 0.50) {
    tierBadgeEl.classList.add('badge-solid');
    tierBadgeEl.textContent = 'Solid';
  } else {
    tierBadgeEl.classList.add('badge-improve');
    tierBadgeEl.textContent = 'Needs Improvement';
  }
}

// Preset Loader
document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const presetId = btn.dataset.preset;
    const p = PRESETS[presetId];
    if (!p) return;

    impactSelect.value = p.impact;
    complexitySelect.value = p.complexity;
    feedbackSelect.value = p.feedback;
    hoursInput.value = p.hours;
    bandSelect.value = p.band;

    calculate();
  });
});

// Event Listeners for Live Calculation
[impactSelect, complexitySelect, feedbackSelect, bandSelect].forEach(select => {
  select.addEventListener('change', calculate);
});

hoursInput.addEventListener('input', calculate);

// Initial Run
calculate();
