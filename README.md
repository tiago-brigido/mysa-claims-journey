# Mysa Claims Journey Discovery

> Product discovery for Mysa — an AI-native claims automation platform. Mapping the complete claims journey across Motor and Home/Property insurance to identify pain points, automation opportunities, and strategic positioning.

## What This Is

This repository contains collaborative product discovery work, built through research and debate ("jamming") rather than just documentation. The approach is:

1. **Research first, document second** — We explore topics through web research, discuss implications, then document conclusions
2. **Challenge assumptions** — Every assumption is flagged and tracked
3. **EU vs US differences** — Claims processes differ significantly between markets
4. **Visualize the journey** — Interactive service blueprint shows actors, phases, and decision forks

## Repository Contents

| File | Description |
|------|-------------|
| `claims_journey_discovery.md` | Main discovery document (~2000 lines) — journey mapping, research findings, assumptions, strategic insights |
| `claims_service_blueprint.jsx` | React component for interactive blueprint visualization |
| `app/` | Vite React app to run the blueprint locally |

## How to Run the Visualization

```bash
cd app
npm install
npm run dev
# Open http://localhost:5173
```

The blueprint shows:
- **Rows** = Actors (policyholder, insurer, broker, adjuster, etc.)
- **Columns** = Phases (Incident → Close)
- **Forks** = Decision points with branching paths (click to explore)

---

## What We've Completed

### Motor Claims (Primary Focus)

**Phases 0-6 fully mapped:**
- Phase 0: Incident
- Phase 1: Scene Management
- Phase 2: Documentation (EU EAS vs US process)
- Phase 3: Reconciliation
- Phase 4: First Contact (Broker/Agent/Direct paths)
- Phase 5: FNOL (First Notice of Loss)
- Phase 6: Triage

**Key Forks Documented:**
1. Fork 1: Anyone injured? (BI vs material damage)
2. Fork 2: Is counterparty cooperative?
3. Fork 3: EU vs US documentation
4. Fork 4: Who does policyholder contact?
5. Fork 5: How does broker submit to insurer?
6. Fork 6: Triage — skip adjuster or assign?

**Critical Discovery — The STP Reality Gap:**
- Convention systems (IRSA/IDA in EU) are trivial lookup tables
- **Theoretical STP:** 60-70% of claims could auto-resolve
- **Actual STP:** Only ~10% achieve straight-through processing
- **Bottleneck:** Data quality (messy EAS forms, paper, unclear diagrams)
- **Opportunity:** Whoever fixes data quality upstream unlocks the 50+ point gap

### Home/Property Claims (Added)

**Structural differences from motor:**
- No counterparty (usually)
- No EAS equivalent — no agreed document
- No convention system — coverage interpretation, not fault lookup
- Almost 100% of non-trivial claims require adjuster inspection

**What we documented:**
- FNOL process for home claims
- Claim types breakdown (wind/hail 42.5%, water 29.4%, fire ~5%, theft 0.7%)
- Desk adjuster vs Field adjuster roles
- Who employs adjusters (Staff ~40-50%, TPA ~25-35%, Independent ~15-25%)
- EU vs US terminology differences (Loss Adjuster vs Claims Adjuster)
- The 3x adjuster productivity opportunity
- Honest assessment of AI replacing adjusters (spoiler: augment, not replace)

**Forks Added:**
- Fork 7: Motor vs Home structural differences
- Fork 8: Home — Desk vs Field adjuster triage

---

## What's NOT Done Yet

### Motor Claims — Remaining Phases
- Phase 7: Investigation
- Phase 8: Assessment
- Phase 9: Decision
- Phase 10: Settlement
- Phase 11: Close

### Other Lines of Business
- **Health Insurance** — Noted as fundamentally different (request-approval workflow, not event-response). Deprioritized for now.

### Topics to Explore Further
- Investigation phase deep-dive (what does the adjuster actually DO?)
- Repair network / provider management
- Subrogation and recovery
- Fraud detection workflows
- Payment and settlement mechanics
- Cross-border claims in EU

---

## Key Strategic Insights (Summary)

1. **Europe produces structurally cleaner data** — EAS = single agreed document vs US competing narratives

2. **The STP gap is the product opportunity** — 10% actual vs 60-70% theoretical. Data quality is the bottleneck.

3. **Motor and Home require different automation strategies:**
   - Motor: Fix data quality upstream → unlock STP
   - Home: Make adjusters 3x more productive (can't eliminate inspection)

4. **TPAs are a massive buyer segment** — Crawford, Sedgwick, Engle Martin employ 25-35% of property adjusters

5. **AI replacing adjusters is overhyped for home claims** — Hidden damage, fraud risk, accuracy gaps mean augmentation not replacement

6. **Broker-insurer submission is a data quality bottleneck** — Portal (rekey), email (double entry), phone (docs delayed) all have friction

---

## Assumptions Log

All assumptions are tracked in the main document with status:
- ✅ Validated
- ⚠️ Needs validation
- ❌ Disproven

Currently 46 assumptions tracked (A1-A46).

---

## How to Continue This Work

### Starting a New Session

1. Share this README with Claude
2. Reference the main discovery doc: `claims_journey_discovery.md`
3. State where you want to pick up:
   - "Let's continue with Phase 7 (Investigation) for motor claims"
   - "Let's explore the repair network phase"
   - "Let's validate assumption A4 about convention systems"

### The Collaboration Style

- **Jam first, document second** — Research and discuss before writing
- **Challenge assumptions** — Push back, ask "is that actually true?"
- **EU vs US always** — Every topic should consider market differences
- **Update the blueprint** — Keep the visualization in sync with discoveries

### Key Questions Still Open

1. What exactly happens during Investigation phase? Who does what?
2. How do repair networks work? Direct repair programs?
3. How does subrogation/recovery work between insurers?
4. What are the actual STP rates by insurer/market?
5. Where does Mysa fit — upstream data quality or downstream adjuster tools?

---

## Commands Reference

```bash
# Run the visualization
cd app && npm run dev

# Sync blueprint to app after editing
cp claims_service_blueprint.jsx app/src/App.jsx

# View the discovery doc
cat claims_journey_discovery.md | less
```

---

## Session Context (For Claude)

**Last session ended:** After documenting home/property insurance FNOL, adjuster roles, TPA breakdown, and the 3x productivity opportunity. Created GitHub repo and pushed.

**User's working style:**
- Prefers to "jam" and debate before documenting
- Wants honest answers, not validation
- Asks clarifying questions — answer them thoroughly
- Focuses on product/strategic implications, not just process mapping

**Key files to read:**
- `claims_journey_discovery.md` — Full context (read relevant sections as needed)
- `claims_service_blueprint.jsx` — Current visualization state
