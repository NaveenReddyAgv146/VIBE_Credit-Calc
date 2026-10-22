# VIBE Credits Contribution Calculator

An interactive, executive-grade web application to measure and evaluate engineering contribution scores and **VIBE Credits** in a fair, structured, and quality-driven manner.

Built strictly according to the official **Contribution Score Model Specification Document**.

---

## 📐 Mathematical Model & Formula Reference

The model calculates contribution using 5 core dimensions: **Impact ($I$)**, **Complexity ($C$)**, **Feedback ($F$)**, **Time Invested ($H$)**, and **Band Multiplier ($M$)**.

### Canonical Formula

$$\text{Final Score} = \frac{(0.4 \cdot I + 0.3 \cdot C + 0.3 \cdot F)^{1.2} \times \frac{\ln(1 + \text{Hours})}{\ln(1 + 10)}}{\text{BandMultiplier}}$$

$$\textbf{Quality Gate:} \quad \text{If Feedback} = \text{'Does Not Meet'} \implies \mathbf{\text{Final Score} = 0}$$

---

### Step-by-Step Breakdown

1. **Step 1: Point Conversion**
   - **Impact:** High = 5 pts, Medium = 3 pts, Low = 1 pt
   - **Complexity:** High = 3 pts, Medium = 2 pts, Low = 1 pt
   - **Feedback:** Exceeds = 5 pts, Meets = 3 pts, Does Not Meet = 1 pt

2. **Step 2: Score Normalization**
   - $I = \text{Impact} / 5$
   - $C = \text{Complexity} / 3$
   - $F = \text{Feedback} / 5$

3. **Step 3: Value Calculation & Power Boost ($\alpha = 1.2$)**
   - $\text{Weighted Sum} = 0.4 \cdot I + 0.3 \cdot C + 0.3 \cdot F$
   - $\text{Value} = (\text{Weighted Sum})^{1.2}$
   - *Rationale:* The $1.2$ power boost exponentially rewards higher-quality deliverables over mediocre outputs.

4. **Step 4: Effort Calculation (Logarithmic Dampening)**
   - $\text{Effort} = \frac{\ln(1 + \text{Hours})}{\ln(1 + \text{MaxHours})}$ with $\text{MaxHours} = 10$.
   - *Rationale:* Ensures that dedicating adequate hours helps build the score, but diminishing returns prevent brute-force hours from dominating when value is low.

5. **Step 5: Base Contribution**
   - $\text{Base} = \text{Value} \times \text{Effort}$

6. **Step 6: Band Adjustment (Seniority Scaling)**
   - $\text{Adjusted Score} = \frac{\text{Base}}{\text{BandMultiplier}}$
   - **Multipliers:**
     - **A1 (Junior):** $0.8$
     - **A2 (Associate):** $0.9$
     - **A3 (Mid-Level benchmark):** $1.0$
     - **A4 (Senior):** $1.1$
     - **A5 (Staff / Lead):** $1.3$
     - **A6 (Principal / Director):** $1.5$
   - *Rationale:* Higher bands carry higher delivery expectations; identical tasks yield a lower relative score for senior engineers.

7. **Step 7: Quality Gate**
   - If Feedback is **Does Not Meet**, Final Score is strictly **$0.00$** regardless of time or impact.

---

## 🏆 Score Interpretation Tiers

| Score Range | Tier | Description |
| :--- | :--- | :--- |
| **$> 0.85$** | 🟣 **Outstanding** | Exceptional impact, craft, and efficiency exceeding expectations. |
| **$0.70 - 0.85$** | 🔵 **Strong** | Consistent high-quality delivery meeting top-standard objectives. |
| **$0.50 - 0.70$** | 🟡 **Solid** | Reliable standard contribution meeting sprint milestones. |
| **$< 0.50$** | 🔴 **Needs Improvement** | Sub-par output or quality gate failure; requires coaching or rework. |

---

## 💡 Document Scenarios Pre-loaded in Calculator

1. **Scenario 1: High impact, efficient work**
   - Impact: High, Complexity: Medium, Feedback: Exceeds, Hours: 6, Band: A3 $\rightarrow$ **Score: 0.72 (Strong)**
   - *Insight:* High impact + high quality + efficient time yields a strong, reliable score.

2. **Scenario 2: Low impact, high hours**
   - Impact: Low, Complexity: Low, Feedback: Meets, Hours: 10, Band: A3 $\rightarrow$ **Score: 0.40 (Needs Improvement)**
   - *Insight:* Even with maximum hours (10h), score stays low because value is low.

3. **Scenario 3: High complexity, moderate impact**
   - Impact: Medium, Complexity: High, Feedback: Meets, Hours: 8, Band: A4 $\rightarrow$ **Score: 0.60 (Solid)**
   - *Insight:* Complex work is rewarded, but higher band reduces relative score due to higher expectations.

4. **Scenario 4: Poor quality work (Quality Gate)**
   - Impact: High, Complexity: High, Feedback: Does Not Meet, Hours: 9, Band: A3 $\rightarrow$ **Score: 0.00 (Gate Fail)**
   - *Insight:* No matter the effort or impact, poor quality triggers strict zero score.

5. **Scenario 5: Same work, different bands**
   - Base = 0.70 $\rightarrow$ A1 (Junior): **0.88**, A3 (Mid): **0.70**, A5 (Senior): **0.54**
   - *Insight:* Same deliverable $\rightarrow$ different expectations $\rightarrow$ different scores.

6. **Scenario 6: High impact, low hours (high efficiency)**
   - Impact: High, Complexity: Medium, Feedback: Exceeds, Hours: 3, Band: A3 $\rightarrow$ **Score: 0.52 (Solid)**
   - *Insight:* Efficient work is good, but very low effort (3h) logarithmically caps the final score.

---

## 🚀 How to Run the Application

Simply open `index.html` in any web browser:

```bash
# In Windows PowerShell / Terminal:
Start-Process "index.html"
```
Or double-click `index.html` in File Explorer.

### Key Features Included:
- **Real-Time Interactive Calculator:** Instant recalculation as you toggle options or slide hours.
- **Dynamic Speedometer / SVG Gauge:** Animated needle indicating score and color-coded zones.
- **Logarithmic Effort Scaling Curve:** Interactive SVG curve displaying diminishing returns over time.
- **Cross-Band Projection Matrix:** Real-time table displaying scores across all bands (A1 to A6) simultaneously.
- **Step-by-Step Mathematical Derivation:** Live formula breakdown of each calculation step.
- **Contribution Log & Sprint Review:** Record tasks, track total VIBE credits and session average, and export to CSV or copy formatted markdown report.
- **Dark / Light Theme:** Seamless toggle with glowing modern aesthetics.
- **1-Click Official Scenario Presets:** Instantly load scenarios S1 through S6 with authoritative insights.
