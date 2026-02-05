# Claims Journey Discovery — Product Discovery Document

> **Purpose:** Map the complete, granular claims journey across Motor, Health, and Home/Property to identify where pain lives, where Mysa fits, and where the moat is.
> **Approach:** Build the journey step by step, challenging assumptions, flagging EU vs US differences, and noting where lines of business overlap vs diverge. We are building this collaboratively — not mapping everything at once, but going phase by phase, jamming on each step.
> **Focus:** Motor claims first, Home/Property now added.
> **Status:** In Progress — Motor Phases 0-6 mapped, Home/Property FNOL & Adjuster workflow mapped. Motor Phases 7-11 (Investigation through Close) next.

---

## Key Structural Insight: The Skeleton vs The Guts

The **skeleton** of every insurance claim is the same:
> Incident → Report → Collect Info → Assess → Decide → Pay → Close

But the **middle** — where all the complexity, pain, and cost lives — diverges hard across lines of business.

### Where Lines Overlap vs Diverge
- **FNOL/Intake** and **Settlement** bookends = highest overlap across motor, health, home
- **Investigation/Assessment** middle = where they diverge significantly
- **Implication:** A horizontal platform makes most sense at the bookends; vertical specialization needed in the middle

### Cross-Line Comparison: How the Incident Differs

| | **Motor** | **Health** | **Home/Property** |
|---|---|---|---|
| **What happened** | Car crash, theft, vandalism, breakdown | Illness, injury, need for treatment | Water leak, fire, break-in, storm damage |
| **Urgency** | Often immediate — standing on the side of the road | Split: emergency (rush to hospital) vs. planned (need surgery next month) | Varies — fire is immediate, discovering mold is slow |
| **Who's involved** | Policyholder + usually a second party | Policyholder + sometimes a healthcare provider | Policyholder, sometimes alone |
| **Counter-party?** | Very often yes (the other driver) | Almost never | Sometimes (neighbor's pipe flooded your apartment) |

### 🔑 Key Insight: Health is the Odd One Out
- In **Motor** and **Home**, there's an *event* that triggers the claim
- In **Health**, the trigger can be a *decision* ("I need to go to the doctor")
- Health claims often start **before** anything bad happens (pre-authorization)
- This means health claims automation ≠ automating a reaction to an event; it's automating a **request-approval workflow** — a very different motion
- **Strategic implication:** This reinforces the motor-first bet. Motor is event-driven, which aligns better with a claims automation platform.

---

## Visualization Approach: Service Blueprint with Swimlanes

We are building the journey as a **service blueprint** because a claims journey isn't one user doing sequential steps — it's **multiple actors doing things in parallel, handing off to each other, with branching paths depending on decisions.**

### Structure:
- **Rows (swimlanes) = Actors**, grouped by type:
  - Customer: Policyholder (Driver A), Counter-party (Driver B)
  - External: Police/Emergency, Adjuster/Expert, Repair/Provider Network
  - Intermediary: Broker/Agent
  - Insurer A: Front Office, Claims Handler, Underwriting, Finance
  - Insurer B: Front Office, Claims Handler
  - System: Convention body (CIMPAS/IDA), SIU (Fraud)
  - Data Layer: 📄 Documents & Data (tracks what documents exist at each phase)
- **Columns = Phases of the journey:** Incident → Scene Mgmt → Documentation → Reconciliation → First Contact → FNOL → Triage → Investigation → Assessment → Decision → Settlement → Close
- **Forks visualized separately** as interactive decision trees showing branching paths, which actors are affected, and how forks chain to each other

---

# MOTOR CLAIMS JOURNEY (Focus)

---

## Phase 0: The Incident (Seconds 0-60)

### What Actually Happens: Pure Chaos, Not Paperwork

Nobody is filling out an accident report in the first minute. The real sequence:

**Seconds 0-60: Shock & Safety**
- The driver is in shock/adrenaline mode
- Am I hurt? Are my passengers hurt?
- Is the car in a dangerous position (middle of a highway vs. parking lot)?
- That's it. That's the first minute. No rational decision-making yet.

### Documents/Data at This Point:
- No documents yet
- Dashcam footage (if exists) — recording automatically
- Telematics ping (if connected car policy) — some insurers get automatic crash notification

---

## Phase 1: Scene Management (Minutes 1-30)

### FORK F1: Is Anyone Injured?

This is the first and most critical fork in the entire journey.

#### Path A: YES — Injuries Present
- Call 112 (Europe) / 911 (US)
- Police and ambulance respond
- Police take over scene documentation — the policyholder has almost zero agency from this point
- The claim that follows is likely a **bodily injury claim**, which is a completely different animal:
  - Higher value (often 10x+ material damage claims)
  - Much longer lifecycle (months to years vs. weeks)
  - Lawyers get involved (especially in the US)
  - Medical documentation required
  - In the US, this is where the big litigation happens

#### Path B: NO — Material Damage Only
- No emergency services needed for injuries
- Moves to driver interaction phase → **Fork F2**

### FORK F2: Is the Other Party Cooperative? (Material Damage Path)

This fork determines the quality of data that enters the system downstream.

#### Path B1: YES — Cooperative
- Both drivers exit vehicles
- Exchange information (insurance details, IDs, contact info)
- In **Europe:** Attempt to fill the **European Accident Statement** (typically 15-30 min post-incident, not 60 seconds)
  - Portugal: Declaração Amigável de Acidente Automóvel
  - France: Constat Amiable
  - Same standardized carbon-copy form across the entire EU
  - Both sign it, each takes a copy to their insurer
- In **US:** Exchange insurance cards, take photos, get each other's info

#### Path B2: NO — Uncooperative / Aggressive / Disputes
- Other driver refuses to cooperate, disputes everything, is aggressive
- Policyholder calls police anyway
- No joint statement possible — claim process becomes much more complicated
- Only the police report and individual accounts will be available

#### Path B3: HIT AND RUN — Other Party Flees
- Police called immediately
- No counter-party information available at all
- Completely different claims path: uninsured motorist coverage, guarantee funds
- Much harder to resolve — may never identify the other driver

### Documents/Data Generated at Scene:
- Photos taken at scene (damage to vehicles, road conditions, positions)
- Driver IDs exchanged
- Insurance card/policy info captured
- Witness contact info (if any witnesses present)

---

## Phase 2: Documentation — EU vs US (A Massive Difference)

### FORK F3: EU vs US Market

This is where the two markets fundamentally diverge, and it has huge implications for data quality downstream.

### 🇪🇺 Europe: The European Accident Statement (EAS)

**The concept is brilliant, the execution is terrible.**

The EAS is a single, standardized, carbon-copy paper form used across the entire EU. Two stressed, possibly injured people standing on the side of the road try to:
1. Draw a diagram of the accident on a tiny paper form
2. Check boxes about the circumstances (turning, overtaking, reversing, etc.)
3. Agree on who did what
4. Both sign it

Each driver takes a copy. They each submit their copy to their own insurer. The result: **a single source of truth, agreed and signed by both parties at the scene.**

**Current state:** ~50% of EAS forms are still filled out on paper (validated). Many insurers have digital EAS features in their mobile apps, but adoption is unclear. Open question: do people actually use the digital versions in the moment of crisis? You don't download your insurer's app until you need it, and by then you're panicking on the roadside.

**What makes the EAS powerful for data:**
- Standardized structure (same form across 27 EU countries)
- Both parties agree on the narrative
- Checkboxes create structured data (circumstances)
- Diagram shows positions and movement
- Signed = legally binding agreement

**What makes it painful:**
- Paper form filled by shaking hands
- Diagram is often unclear/messy
- Language barriers (tourists, cross-border accidents)
- Multi-vehicle accidents (form designed for 2 parties only)
- ~50% still paper → needs to be manually digitized by insurer

### 🇺🇸 United States: No Joint Form — Competing Narratives

In the US, there is **no standardized joint accident form.** The process is fundamentally different:

1. **Police involvement is much more frequent** — in many states it's legally required above a damage threshold (often $500-$1,000, varies by state ⚠️)
2. The **police officer** becomes the primary documenter, filing an official accident/crash report
3. Each driver separately exchanges insurance cards and takes photos
4. Each driver files with their own insurer **independently** — no moment where both parties sit down and agree on what happened
5. Result: **two separate, potentially conflicting accounts** plus a police report

### Comparison Table:

| | **Europe** | **United States** |
|---|---|---|
| **Standardized joint form?** | YES — EAS. Pan-EU standardized, both fill together, carbon copy | NO — No equivalent |
| **Police involvement** | Only if injuries, dispute, or driver requests | Much more frequent — legally required above $500-$1,000 threshold |
| **Who documents?** | The two drivers collaboratively | Police officer files crash report; each driver files separately |
| **Source of truth** | Single agreed document signed by both | Two separate (potentially conflicting) accounts + police report |
| **Data flow** | One form → each driver's insurer | Police report + Driver A's account → Insurer A; Driver B's account → Insurer B |
| **Structured data?** | Yes — checkboxes, standard fields | No — mostly narrative text in police reports |

### 🔑 Key Insight: Data Quality at Origin
- **Europe (EAS):** Single agreed narrative, signed by both parties = **structurally cleaner input data** for AI/automation
- **US (competing narratives):** Two separate accounts + police report = **more noise, more conflict resolution needed downstream**
- **Product implication:** The European model, despite being paper-based, produces structurally better data for a "data normalization layer" platform. The US model requires more AI interpretation/conflict resolution. This is another reason (beyond licensing) why Europe is the better starting market for Mysa.

### Documents/Data Generated:

| | **Europe** | **US** |
|---|---|---|
| **Primary document** | European Accident Statement (signed by both) | Police crash report |
| **Secondary** | Photos, police report (if police called) | Each driver's photos, insurance card copies |
| **Source of truth** | Single agreed document | Two separate accounts + police report |
| **Structured data?** | Yes — EAS has checkboxes and standard fields | No — police report is mostly narrative text |
| **Data quality** | High (agreed) but often poorly captured (paper, messy handwriting) | Variable (police quality varies, competing narratives) |

---

## Phase 3: Claim Triggering & Reconciliation

### 🇪🇺 Europe: EAS-Based Flow

Both drivers have a signed copy of the same form. Either driver can submit to their insurer — both copies are valid. If one driver doesn't submit their copy, the other driver's copy is still sufficient because **it's signed by both parties.**

Convention systems then handle the inter-insurer communication and money movement:
- **Portugal:** CIMPAS
- **France:** IDA / IRSA
- **Italy:** CID (Convenzione Indennizzo Diretto — direct indemnification, meaning your own insurer pays you first, then recovers from the at-fault insurer)

Fault is largely settled **at the scene** via the EAS checkboxes and diagram. The convention system uses pre-agreed fault tables to match the accident scenario to a fault percentage.

### 🇺🇸 United States: Who Triggers the Claim?

Either driver can trigger the claim, and they have **two choices** — this is critical:

**Option 1: First-Party Claim** — File with YOUR own insurer.
- You're saying: "I have coverage, pay me, and you figure out who's at fault later."
- **Faster** — you're their customer, they have incentive to serve you quickly
- **But:** Requires you to have collision coverage on your policy, and you **pay your deductible upfront** (you can recover it later through subrogation if the other driver is found at fault)

**Option 2: Third-Party Claim** — File directly with the OTHER driver's insurer.
- You're saying: "Your policyholder hit me, pay me."
- **No deductible** — you're claiming against their coverage
- **But:** Much slower — that insurer has **zero obligation to rush** because you're not their customer

**Option 3: Both Simultaneously** — Savvy drivers file BOTH a first-party claim AND a third-party claim at the same time. Most people don't know they can do this. This way they get fast service from their own insurer while also establishing the claim with the at-fault driver's insurer.

### 🇺🇸 What If One Driver Doesn't Submit Anything?

This is important — **it doesn't stop the process.** If Driver A files a third-party claim against Driver B's insurer, that insurer gets notified regardless of whether Driver B ever called them. The insurer will try to reach Driver B to get their version of events, but the claim moves forward. Driver B's silence actually **hurts Driver B** — the insurer may accept liability based on the police report and Driver A's account alone. Silence ≠ protection.

### 🇺🇸 Critical Fork F6: No-Fault vs At-Fault States

The US has a fundamental split in how the fault system works, which changes the entire claim flow:

**No-Fault States (~12 states: Michigan, Florida, New York, etc.):**
- Each driver files with their **OWN** insurer for medical/injury costs, regardless of who caused the accident
- This is through PIP (Personal Injury Protection) coverage
- Fault barely matters for the medical piece
- Property damage **still follows fault** though
- Litigation only happens for serious injuries above a defined threshold

**At-Fault States (the majority: Texas, California, Georgia, etc.):**
- The at-fault driver's insurer pays **everything**
- Fault determination is the entire game
- Litigation is much more common
- This is where the full liability investigation process kicks in

### 🇺🇸 US Data Reconciliation: How Insurers Handle Competing Narratives

When an insurer receives a claim with conflicting accounts (which is most claims in the US, since there's no joint agreed document), they enter what the industry calls **coverage and liability investigation:**

**Step 1: Gather all available data points**
The adjuster collects everything:
- Police crash report
- Driver A's recorded statement (a phone call — the insurer literally calls you and records your version, 15-30 minutes)
- Driver B's recorded statement (same process)
- Photos from both parties
- Dashcam footage (if available)
- Witness statements (if any)
- Telematics data (if the driver has a connected car policy)

**Step 2: Reconstruct what happened**
A human adjuster sits with all of this and tries to piece together the truth:
- Looking at physical evidence (where's the damage on each car? Does it match the accounts?)
- Comparing the police report narrative against both statements
- Identifying contradictions between accounts
- Cross-referencing timestamps, locations, weather conditions

**Step 3: Liability determination**
The adjuster assigns a **fault percentage** — and here's what most people don't realize: in most US states, it's NOT binary. It can be 80/20, 70/30, 50/50.

Two systems exist:
- **Comparative negligence** (most states): Both drivers can share fault, and the payout adjusts proportionally. If you're 30% at fault, you recover 70% of your damages.
- **Contributory negligence** (a few states — harsh): If you're found even 1% at fault, you recover NOTHING. Very rare but still exists in states like Maryland, Virginia, DC.

**Step 4: Inter-company arbitration (if insurers disagree)**
If Insurer A says "my driver was 20% at fault" and Insurer B says "no, your driver was 80% at fault," it goes to **Arbitration Forums, Inc.** — essentially the US equivalent of Europe's convention systems, but reactive and adversarial rather than pre-agreed. The decision is binding.

**Key Actors in US Reconciliation:**

| Actor | Role |
|---|---|
| Claims Adjuster | Gathers evidence, reconstructs incident, determines liability |
| Special Investigator (SIU) | If fraud is suspected — full investigation |
| Arbitration Forums, Inc. | Inter-company disputes when insurers disagree on fault |
| Attorneys | If claim escalates to litigation (common in at-fault states) |
| Independent Appraiser | Vehicle damage assessment when insurer needs external opinion |

### 🇪🇺 European Dispute Resolution: When the Clean Path Breaks Down

Even with the EAS, reconciliation is needed when:
- EAS is **incomplete or incorrectly filled** (messy diagram, missing fields)
- One party **refuses to sign**
- Parties **disagree** on the diagram or circumstances after the fact
- EAS **was not filled out at the scene** (forgot, too shaken, language barrier, tourist)
- **Multi-vehicle** accidents (EAS is designed for 2 parties only)

When this happens:
- Insurer falls back to the **police report** (if police were called)
- Insurer conducts own investigation (witness statements, photos, accident reconstruction)
- Convention systems handle inter-insurer settlement:
  - **Portugal (CIMPAS):** Pre-agreed fault tables based on accident types. If both insurers are CIMPAS members, the convention assigns fault automatically based on scenario matching. Fast but rigid — doesn't handle edge cases well.
  - **France (IDA/IRSA):** Similar convention system with a barème (fault grid) that maps accident scenarios to fault percentages
  - **Italy (CID):** Direct indemnification — your own insurer pays you first, then recovers from the at-fault insurer's company
- If the convention system doesn't resolve it → inter-company arbitration or litigation

### 🔑 Key Insight: Convention Systems as "Pre-Computed Liability"
- EU convention systems (CIMPAS, IDA, CID) are essentially **lookup tables for fault**
- Given accident type X → fault split = Y/Z — no investigation needed
- This works for ~70-80% of motor claims (assumption ⚠️)
- The remaining 20-30% that fall outside conventions = where the expensive, slow, human-intensive investigation happens
- **US has no equivalent** — every disputed claim requires human investigation from scratch

### Post-Incident Contact: Does the Insurer Call the Driver?

This is a critical difference that affects automation opportunity.

**Europe — depends on the claim path:**

| Claim Path | Insurer Contacts Driver? | Format | % of Claims ⚠️ |
|---|---|---|---|
| **Clean EAS** — both signed, matches convention scenario | **NO** — EAS is legally sufficient | Handler reviews form, matches to fault table, processes. Nobody picks up the phone. | ~60-70% theoretical, **~10% actual STP** ⚠️ |
| **Incomplete/Unclear EAS** — gaps, unclear diagram | **YES** — clarification only | Phone call, email, or app message. Gap-filling, not interrogation. "The diagram isn't clear, can you explain?" | ~15-20% |
| **No EAS / Disputed / BI / High Value** | **YES** — formal investigation | Written statement requested, expert inspection, lawyer involvement for bodily injury | ~10-15% |
| **Suspected Fraud** | **YES** — full SIU investigation | Recorded statements, cross-referencing, surveillance in extreme cases | ~5% |

**United States — almost universally yes:**

Because there's no joint agreed document, the insurer's first move is almost always "we need to get a statement from our insured." This is a phone call, often 15-30 minutes, where the adjuster walks through what happened step-by-step and records it.

And it happens for BOTH drivers, with BOTH insurers:

| Step | What Happens | Time |
|---|---|---|
| Insurer A calls Driver A | Formal recorded statement | 15-30 min |
| Insurer A attempts to reach Driver B | Get other party's version | 15-30 min (if cooperative) |
| Insurer B calls Driver B | Their own recorded statement | 15-30 min |
| Insurer B attempts to reach Driver A | Get other party's version | 15-30 min (if cooperative) |

**Result:** Up to **4 recorded statements** for a single fender bender. This is near-universal even for simple claims.

### Human Time Per Routine Claim: The Cost Gap

| | **Europe (clean EAS path)** | **US (standard path)** |
|---|---|---|
| Driver contacted post-incident? | Often **NO** | Almost always **YES** |
| Form of contact | Clarification call/email if needed | Formal recorded statement (15-30 min) |
| Adjuster time per claim | **Minutes** (review EAS, match to convention) | **30-60+ minutes** per driver per insurer |
| Human hours for routine claim | **Low** | **High** even for simple claims |

### 🔑 Key Insight: Different Automation Opportunities by Market
- **US opportunity:** Automating the intake of recorded statements, extracting structured data from voice/text, reducing adjuster phone time. The US system is incredibly labor-intensive even for simple claims.
- **EU opportunity:** Digitizing/processing the EAS faster (the 50% still on paper), and handling the 30-40% of claims that DON'T follow the clean EAS path — incomplete forms, disputes, bodily injury.
- **Shared opportunity:** The messy claims — disputes, incomplete data, bodily injury — are expensive everywhere and represent the biggest automation challenge.

### 🎯 Strategic Question for Mysa (Still Open):
> Are you the platform that helps the adjuster **reconcile conflicting data faster** (downstream fix)?
> Or are you the platform that **captures better data upstream** making reconciliation unnecessary (upstream prevention)?
> Or both, sequentially — start downstream where the pain and budgets exist today, move upstream over time?
> These are two very different product bets.

### Documents/Data Generated During Reconciliation:

| | **Europe** | **US** |
|---|---|---|
| **New documents** | Convention fault determination, possibly clarification notes | Recorded statements (audio files), transcriptions, police report (official copy) |
| **Data entered into systems** | EAS data manually keyed or OCR'd into claims system | Statement summaries, liability assessment, fault % determination |
| **Inter-company data** | Convention system communication (CIMPAS/IDA) | Arbitration filings (if disputed) |

---

---

## Step 3: First Contact — Who Does the Policyholder Contact?

### The Core Fork: Three Paths to Claim Initiation

After the incident is documented (EAS in Europe, police report + photos in US), the policyholder needs to notify someone. There are three primary paths, and which one dominates depends heavily on the market and how the policy was sold.

#### Path A: Direct to Insurer
- Policyholder calls the insurer's claims hotline, uses their app, or goes to a branch
- Most common when the policy was purchased direct (online, call center)
- Insurer's front office receives the FNOL directly — no intermediary in the data flow
- Growing fast thanks to digital/insurtech channels

#### Path B: Through a Broker
- Policyholder calls their broker first — the person they have a relationship with
- Broker guides them through the process, may file the FNOL on their behalf or connect them to the insurer's claims line
- Broker represents THE CLIENT, not the insurer
- Can work with multiple insurers — shops the market for policies
- Common in: UK, Belgium, Netherlands, commercial lines everywhere

#### Path C: Through an Agent
- **Captive/Tied Agent:** Works for ONE insurer. Can often open the claim directly in the insurer's system. Essentially an extension of the insurer.
- **Independent Agent:** Works with multiple insurers (like a broker), but legally represents the insurer, not the client. Their claims role is more limited — they'll direct you to the right insurer but typically can't process the claim themselves.
- Dominant in: Italy (80%+ of non-life), Germany (60%+), Portugal (50%+), US personal lines

#### Path D: Bancassurance (EU-specific)
- Policy was sold through a bank (very common for life insurance in France, Spain, Italy, Portugal)
- For non-life/motor, less relevant but still exists
- The policyholder may call the bank first, who redirects to the insurer
- Adds another intermediary layer

### Can You Go to an Agent to Submit a Claim? YES — But It Depends

| Agent Type | Can They File the Claim? | How? |
|---|---|---|
| **Captive/Tied Agent** | YES — directly | They have access to the insurer's systems and can open/register the claim on the policyholder's behalf. They ARE the insurer's front office in many cases. |
| **Independent Agent** | PARTIALLY | They can help with paperwork and documentation, but typically direct you to the insurer's claims department. They don't have direct system access for claims filing in most cases. |
| **Broker** | PARTIALLY | Same as independent agent — they help prepare and submit, but the insurer processes. Some large brokers (like Acrisure) have their own claims handling capabilities. |

### Why Would a Policyholder Go to a Broker/Agent vs Insurer Directly?

This comes down to the **relationship** and **trust** at the moment of stress:

| Reason | Broker/Agent | Direct to Insurer |
|---|---|---|
| **Who do I trust?** | "My broker knows me and my situation" — personal relationship, especially for older demographics and commercial clients | "I'll call the number on my insurance card" — transactional, common for younger/digital-native customers |
| **Who can help me navigate?** | Broker explains what's covered, what to expect, what to document. Acts as guide and advocate | Insurer's call center follows a script. Efficient but impersonal |
| **Who fights for me?** | Broker represents YOU — will push back on the insurer if a claim is underpaid or denied | Insurer represents themselves — conflict of interest (they're paying the claim) |
| **Speed** | Adds a step — broker receives info, then forwards to insurer | Faster initial FNOL — goes straight to the claims system |
| **Complexity** | For complex claims (commercial, high-value, disputed), brokers add massive value through expertise and negotiation | For simple claims (fender bender, clear fault), going direct is faster and the broker adds little |
| **Habit** | "I always call my mediador/broker for everything insurance" — culturally embedded in many EU markets | "I don't even know who my broker is" — common when policy was purchased online or through a comparison site |

**Key insight:** The broker/agent path is relationship-driven and adds most value during COMPLEX claims. For simple, clean claims, they're an extra step in the data flow that slows things down without adding much. This has implications for Mysa — if you're automating the simple claims, you may be making the broker less relevant. If you're tackling the complex ones, the broker is a key actor to map.

### Distribution Channel Breakdown: % by Market (Claims Submission Path)

#### 🇪🇺 Europe — Non-Life / Motor Insurance (2024)

| Channel | EU Average | Key Markets |
|---|---|---|
| **Agents (tied + independent)** | ~55-58% | Italy 80%+, Germany 60%+, Portugal 50%+, Spain ~45% |
| **Brokers** | ~25-30% | UK 54%, Netherlands 60%, Belgium 61% |
| **Direct (online + call center)** | ~19% | Growing at ~5% CAGR. Netherlands, Finland, Croatia historically higher. UK strong due to price comparison sites |
| **Bancassurance** | ~5-8% (non-life) | Minimal for motor. Huge for life insurance (France 53%, Portugal 70%+) |

**Important note:** These are POLICY SALE distribution numbers, not claims submission numbers. The distinction matters — a policy sold through an agent may still result in the claim being filed directly with the insurer's call center. However, data on the claims filing channel specifically is not publicly available in the same way. The sale channel is a strong proxy for first contact at claim time — assumption ⚠️.

**Trend:** Direct channels are growing at ~5-9% CAGR across Europe, eating into agent share. But agents still dominate in Southern Europe (Italy, Portugal, Spain) and Germany.

#### 🇺🇸 United States — Personal Auto (2024)

| Channel | Market Share (by premium) | Claims Behavior |
|---|---|---|
| **Independent Agents/Brokers** | ~33% of personal auto (39% of all personal lines) | May assist with claim filing but typically direct to insurer's claims line. Limited direct claims capability |
| **Captive/Exclusive Agents** | ~35% of personal auto | Often first point of contact for claims. Can open claims directly in insurer's system. Examples: State Farm, Allstate agents |
| **Direct (online + call center)** | ~25-30% of personal auto | GEICO, Progressive direct — customer calls insurer directly. Growing, especially among younger demographics |
| **Digital/Insurtech** | Growing at 9.2% CAGR | Lemonade, Root — fully digital claims filing through app |

**Key US trend:** 47% of auto insurance purchases are now completed online (2025 data). But for CLAIMS, even digitally-purchased policies often revert to phone calls — people want to talk to a human when they're stressed. The purchase channel ≠ claims channel — assumption ⚠️.

**Overall US P&C distribution (2024):** Independent agents 61.5%, captive agents ~21%, direct ~16% — but personal auto skews much more toward captive and direct than commercial lines.

### What Does the Broker/Agent Actually DO in the Claims Process?

This is critical for your journey map. Here's the broker's role broken down by PHASE:

#### Phase 4: First Contact / FNOL
| Action | Detail |
|---|---|
| **Receive the panic call** | Policyholder calls broker first. Broker calms them down, asks structured questions about what happened |
| **Triage the situation** | Is this actually a covered claim? Are there policy exclusions? Does the policyholder need a lawyer (bodily injury)? |
| **Guide documentation** | "Did you fill out the EAS? Did you take photos? Did you get the other driver's info?" — filling gaps in what the policyholder captured |
| **Prepare the FNOL** | Broker collects all information and either: (a) submits the FNOL to the insurer on behalf of the client, or (b) helps the client submit it directly with properly structured information |
| **Manage expectations** | Explains the process, timeline, what to expect next |

#### Phase 5-8: During the Claims Process
| Action | Detail |
|---|---|
| **Communication bridge** | Broker is the intermediary — receives updates from insurer, translates into plain language for client |
| **Document management** | Collects additional documents the insurer requests (repair estimates, medical reports), forwards them |
| **Status tracking** | Follows up with insurer if claim is delayed. Has leverage — "I place €X million in premium with you, move this along" |
| **Dispute advocacy** | If claim is underpaid or denied, broker pushes back on behalf of the client. This is where brokers add the MOST value — they know the policy language, they know what should be covered |
| **Settlement negotiation** | For complex claims, broker may negotiate the settlement amount with the insurer |

#### Phase 9-11: Settlement & Close
| Action | Detail |
|---|---|
| **Review settlement** | Broker reviews the insurer's offer and advises client whether it's fair |
| **Facilitate payment** | Ensures payment is processed correctly |
| **Post-claim review** | May review the client's policy to adjust coverage based on the claim experience |

### 🔑 Key Insights for Mysa

1. **The broker is primarily a COMMUNICATION and ADVOCACY layer**, not a processing layer. They don't adjudicate, assess, or pay — they manage the relationship and fight for the client.

2. **For simple claims (clean EAS, clear fault, low value):** The broker adds a step in the data flow without adding much processing value. They receive the info from the policyholder, then pass it to the insurer. This is where Mysa can compress the process by enabling direct digital FNOL with structured data capture — potentially making the broker's "prepare the FNOL" role redundant for simple cases.

3. **For complex claims (disputed fault, bodily injury, high value):** The broker is genuinely valuable as an advocate and negotiator. Mysa should NOT try to replace this — instead, give the broker better tools and data to do their job faster.

4. **Data flow implication:** When a broker is involved, the data passes through an extra node. Policyholder → Broker → Insurer instead of Policyholder → Insurer. This means:
   - Data may be re-keyed or reformatted by the broker (introducing errors)
   - There's a delay in the insurer receiving the FNOL
   - The broker may add context/commentary that enriches the data
   - The broker's system may be a separate tech stack from the insurer's

5. **Mysa positioning options:**
   - **Option A: Sell to insurers** — help them process claims faster regardless of which channel they arrive through (broker, agent, or direct)
   - **Option B: Sell to brokers** — give brokers tools to file better-structured FNOLs, track claims, and advocate more effectively. This is a different buyer, different sales cycle, different product.
   - **Option C: Be the data normalization layer between them** — regardless of whether the FNOL comes from a broker's email, an agent's system, or a direct app submission, Mysa normalizes it into structured data for the insurer. This aligns with your "data orchestration" thesis.

6. **Acrisure/Joaquim connection:** Acrisure is a broker group. Their ~4K claims/year flow THROUGH them to insurers. If Mysa can help them process those FNOLs faster and with better data, you're adding value at the broker layer AND making the insurer's job easier downstream. This is a natural fit for Option C.

---

## Step 3A-2: 🇺🇸 US Broker Role in Claim Submission — Deep Dive

### The Reality: "Almost Nothing" for Personal Auto

For **US personal auto claims**, the broker/independent agent's role in the actual claims process is **almost nothing**:

| What They Do | What They DON'T Do |
|---|---|
| Point you to the phone number to call | File the claim for you |
| Remind you of your deductible | Process anything |
| Offer emotional support | Have system access to open claims |
| Maybe follow up later to check on you | Talk to the adjuster on your behalf |

**Why?** US personal auto is dominated by:
- **Captive agents** (State Farm, Allstate) who ARE the insurer's front office
- **Direct channels** (GEICO, Progressive) with no intermediary at all
- **Independent agents** who sell policies from multiple insurers but have **no claims system access**

When you buy through an independent agent in the US and have a claim, the agent says: *"Here's the claims number, call them directly."* That's it.

### The Exception: Commercial Lines

For **commercial insurance** (fleet, trucking, business auto), brokers DO play an active role:
- Claims are complex (multiple vehicles, business interruption, cargo)
- Higher stakes = broker earns their advocacy role
- Broker may have a dedicated claims contact at the insurer
- Still don't have system access, but do manage communication actively

### Implication for Mysa's US Strategy

If targeting US personal auto: **go direct to insurers**. The broker layer barely exists for claims.

If targeting US commercial: brokers matter, but it's a different product and sales motion than personal motor.

---

## Step 3A-3: Who Handles Claim Validation Calls in the US?

### The Answer: The Claims Adjuster — Always an Insurer Employee (or Contracted by Insurer)

The **recorded statement** — that 15-30 minute phone call where your version of events is formally documented — is ALWAYS handled by someone working for or contracted by the insurer:

| Role | Description | Who Employs Them |
|---|---|---|
| **Staff Adjuster** | Full-time employee of the insurance company | Insurer directly |
| **Independent Adjuster** | Contractor hired by insurer for overflow or specialized claims | Contracted by insurer |
| **Public Adjuster** | Works for the POLICYHOLDER, not the insurer | Paid by policyholder (% of settlement) |

### Key Distinction: The Three Types of Adjusters

1. **Staff Adjuster** (most common for routine claims)
   - W-2 employee of State Farm, GEICO, Progressive, etc.
   - Handles claims soup-to-nuts: recorded statements, investigation, liability determination, settlement
   - Has authority limits (may need supervisor approval above certain amounts)

2. **Independent Adjuster** (IA)
   - 1099 contractor, often used for:
     - CAT events (hurricanes, wildfires) when volume spikes
     - Geographic coverage gaps
     - Specialized expertise (marine, aviation)
   - Still represents the insurer, not the claimant
   - Often paid per-claim or hourly

3. **Public Adjuster** (PA)
   - Works for the POLICYHOLDER against the insurer
   - Hired when policyholder feels they're being lowballed
   - Takes 10-15% of the settlement as fee
   - More common in property/homeowners than auto
   - Effectively an advocate/negotiator for the claimant

### The Recorded Statement: Adjuster's Domain

**The broker/agent NEVER does the recorded statement.** This is a core adjuster function because:
- It's creating the official record that determines liability
- It requires training in questioning techniques
- It's recorded for legal purposes
- The adjuster needs to probe for inconsistencies, details, fraud indicators

Even if you called your broker first and they helped you understand the process, once the claim is filed, the adjuster calls you directly. The broker is out of the loop.

---

## Step 3A-4: Strategic Implication — Different Automation Opportunities by Market

### The Core Insight: "Augment" vs "Eliminate"

| Market | Adjuster's Role | Automation Opportunity |
|---|---|---|
| **🇺🇸 US** | Central to EVERY claim — even simple fender-benders require recorded statements | **Augment the adjuster**: Tools that help them work faster, extract better data from statements, reduce their time per claim |
| **🇪🇺 EU (clean EAS path)** | Often NOT involved — convention systems auto-process | **Eliminate adjuster for routine claims**: The ~60-70% that *could* follow clean EAS path, but only ~10% actually achieve STP today due to data quality issues |
| **🇪🇺 EU (complex path)** | Involved for disputes, BI, high-value | **Augment the adjuster**: Similar to US, tools for faster investigation |

### What This Means for Mysa

**US product focus:** The adjuster IS the user. Help them:
- Transcribe and structure recorded statements automatically
- Extract key facts, contradictions, timeline from voice/text
- Pre-fill liability assessments based on statement analysis
- Reduce 30-minute calls to 15 minutes with better question routing

**EU product focus:** The claims handler reviewing EAS forms is the user. Help them:
- OCR and extract structured data from paper EAS
- Auto-match to convention fault tables
- Flag incomplete/unclear forms for human review
- The goal is STRAIGHT-THROUGH PROCESSING, not adjuster augmentation

### Two Different Products?

This raises a strategic question: **Is Mysa building one product or two?**

- **Option A:** Build for EU first (cleaner data, faster path to automation ROI), then adapt for US later
- **Option B:** Build a flexible "claims intelligence layer" that works for both but requires different configuration
- **Option C:** Pick one market and go deep

The previous conversation's thesis: **EU first makes sense** because:
1. Structurally cleaner data (EAS) = faster AI wins
2. Licensing advantage (Tiago knows EU insurance regulation)
3. Smaller market but faster path to demonstrating value
4. US can come later once the core is proven

---

## Step 3A-5: Broker Claims Submission — What Actually Happens (Research)

### The UK Reality (Better Documented)

**Broker Management Systems exist** — Acturis is the dominant platform in UK. But here's the critical finding:

**Aviva and Acturis launched a claims API in December 2024** — the fact that this is "ground-breaking" news tells us what the status quo was:

> **Before this API, brokers were manually keying claims data into Acturis after receiving it from the insurer, or manually requesting updates.**

Source: [Acturis Blog, Dec 2024](https://www.acturis.com/blog/2024/12/13/aviva-and-acturis-launch-ground-breaking-broker-api-to-simplify-claims-process/)

**RSA's broker portal** (launched April 2024) shows what's typical even for large insurers:
- Only Commercial Property and Motor claims can be submitted via portal
- Other claim types → still phone, email, or post
- Block policies don't work in the portal → requires manual handler verification

Source: [RSA Broker Portal FAQs](https://www.rsainsurance.co.uk/brokers-and-partners/faqs/broker-portal/)

### The Pain Points (Confirmed via Industry Sources)

From [Ivans Insurance Blog](https://blog.ivansinsurance.com/posts/2021/how-to-solve-4-pain-points-commercial-submissions):

1. **Rekeying hell:** "Agents must re-key all the same information into the systems over and over, increasing opportunities for errors"

2. **Two bad options for submission:**
   - Email information to insurer → insurer has to review, follow up, manually enter
   - Manually enter into each insurer's portal → different portal per insurer, different fields, different logins

3. **No visibility:** Brokers don't get proactive status updates, must chase insurers

4. **~70% of agencies report losing business** because they can't find insurers willing to quote specific risks

### Continental Europe (Portugal, Spain, Italy) — ⚠️ Less Documented

- No equivalent to Acturis dominance in UK
- MDS is the leading broker in Portugal — no public details on claims workflow
- Generic broker management systems exist (Sibro, BrokerEdge, Recorder) but adoption unclear

**Inference (⚠️ assumption):** Continental Europe is likely BEHIND the UK in broker-insurer digital integration. If UK brokers are still largely emailing and rekeying in 2024, Portugal/Spain/Italy are probably worse.

### The Broker Claims Submission Flow (Synthesized)

```
POLICYHOLDER has accident
        ↓
Calls broker (panic call)
        ↓
BROKER collects info verbally
├── What happened?
├── When/where?
├── Other party details?
└── Photos? EAS filled?
        ↓
BROKER receives documents
├── Scanned EAS (if EU)
├── Photos via WhatsApp/email
├── Police report number (if applicable)
        ↓
⚠️ HERE'S WHERE IT GETS MESSY — THREE PATHS
        ↓
┌─────────────────────────────────────────────────────────────────┐
│ OPTION A: Broker has portal access to this insurer              │
│ → Logs into Insurer X portal                                    │
│ → Manually enters ALL claim data into portal fields             │
│ → Uploads documents (size limits, format restrictions)          │
│ → Gets claim reference number                                   │
│ → Repeats for each insurer if multi-insurer placement           │
└─────────────────────────────────────────────────────────────────┘
        OR
┌─────────────────────────────────────────────────────────────────┐
│ OPTION B: No portal access — Email submission                   │
│ → Writes email summarizing claim details                        │
│ → Attaches scanned EAS, photos as PDF/JPG                       │
│ → Sends to claims@insurerX.com                                  │
│ → Waits for acknowledgment (hours to days)                      │
│ → INSURER side: someone reads email, manually enters into system│
└─────────────────────────────────────────────────────────────────┘
        OR
┌─────────────────────────────────────────────────────────────────┐
│ OPTION C: Phone + email follow-up                               │
│ → Calls insurer claims line                                     │
│ → Gives info verbally (insurer agent keys it in real-time)      │
│ → Follows up with email confirmation + document attachments     │
│ → Claim opened on call, docs arrive later                       │
└─────────────────────────────────────────────────────────────────┘
        ↓
INSURER receives claim
├── If via email: someone manually enters into claims system
├── If via portal: data is in, but may need verification
├── If via phone: data entered during call, docs pending
        ↓
Opens claim file, assigns handler
```

### Key Friction Points Identified

| Friction Point | Where It Happens | Impact |
|---|---|---|
| **Rekeying data** | Broker → Insurer portal | Errors, time waste, ~70% of agencies affected |
| **Multi-portal chaos** | Broker works with 10+ insurers | Different logins, formats, required fields per insurer |
| **Email black hole** | Broker → Insurer via email | No confirmation, no tracking, unknown delays |
| **Document format mess** | Policyholder → Broker | WhatsApp photos, scanned PDFs, handwritten EAS, mixed quality |
| **No status visibility** | Throughout process | Broker has to chase insurer for updates manually |
| **Policy verification delay** | Insurer receives claim | Manual check if policy exists, is active, covers this incident |
| **Double data entry** | Insurer receives email | Insurer staff re-keys what broker already typed in email |

### Open Questions (Need Validation)

| # | Question | Why It Matters |
|---|---|---|
| Q1 | What % of broker-to-insurer submissions are email vs portal vs phone in Portugal? | Determines where friction is highest |
| Q2 | When a broker emails a claim, what does the insurer literally do with it? | Validates the double-entry assumption |
| Q3 | Do captive agents in Portugal have better system integration than brokers? | Affects whether agent path has same friction |
| Q4 | What document formats do brokers receive from policyholders? | WhatsApp photos? Scanned PDFs? Original paper? |
| Q5 | How long from broker submission to claim acknowledgment, on average? | Quantifies the delay pain |

---

## Step 3B: Broker vs Insurer Overlap — Where Problems Are Shared and Where They Diverge

### The Overlap Map: What Both Brokers and Insurers Do During Claims

| Activity | Insurer | Broker | Overlap? |
|---|---|---|---|
| Receive first contact from policyholder | ✅ | ✅ | **YES** — both receive the "panic call" |
| Collect incident details (what, when, who, where) | ✅ | ✅ | **YES** — both gather the same info |
| Collect/organize documents (EAS, photos, police report) | ✅ | ✅ | **YES** — both handle documents |
| Submit/register FNOL into a system | ✅ | ✅ (into insurer's portal or via email) | **YES** — but broker submits INTO insurer's system |
| Triage claim (severity, complexity, fraud flags) | ✅ | ❌ (informal only — "is this covered?") | **Partial** |
| Communicate with policyholder about status | ✅ | ✅ | **YES** — both do status updates, often redundantly |
| Investigate (liability, evidence, recorded statements) | ✅ | ❌ | **NO** — insurer only |
| Determine liability / fault | ✅ | ❌ | **NO** — insurer only |
| Match to convention fault tables (CIMPAS, IDA) | ✅ | ❌ | **NO** — insurer only |
| Calculate settlement / set reserves | ✅ | ❌ | **NO** — insurer only |
| Negotiate settlement | ✅ (wants to pay less) | ✅ (wants client to get more) | **ADVERSARIAL overlap** — same activity, opposite incentives |
| Process payment | ✅ | ❌ | **NO** — insurer only |
| Subrogation / recovery from at-fault insurer | ✅ | ❌ | **NO** — insurer only |
| Advocate for policyholder | ❌ | ✅ | **NO** — broker only |
| Manage claims across multiple insurers | ❌ (single system) | ✅ | **NO** — broker only |

**Summary: The overlap is concentrated in the first ~30-40% of the journey** — intake, documentation, communication. The back portion (investigation, decision, payment, recovery) is insurer-only. Advocacy and multi-insurer management are broker-only.

### Does What Mysa Builds for Insurers Also Work for Brokers?

#### ✅ YES — These Transfer Directly

| Capability | Why It Works for Both |
|---|---|
| **Document extraction & structuring** (Mysa's current wedge) | A broker receiving a scanned EAS, photos, or a police report has the SAME problem as the insurer — they need to extract data and structure it. If Mysa can parse an EAS into structured fields, that's valuable whether a broker is preparing a FNOL submission or an insurer is receiving one. |
| **FNOL data capture** | Guiding a policyholder through structured incident data collection (what happened, when, where, who, what damage) is identical regardless of whether a broker or insurer is on the receiving end. |
| **Status tracking & communication** | Both need to track where a claim is and communicate updates to the policyholder. Both suffer from the same problem: information stuck in emails, phone calls, and disconnected systems. |
| **Data validation & completeness checking** | Both deal with incomplete submissions — missing photos, unclear diagrams, unsigned forms. An AI that flags "this EAS is missing the diagram" or "no photo of rear damage" helps both equally. |

#### ❌ NO — These Are Insurer-Specific

| Capability | Why It Doesn't Transfer |
|---|---|
| **Claims triage & routing** | Assigning severity scores, flagging fraud indicators, routing to the right handler/team. Brokers don't do this. |
| **Liability determination** | Convention matching (CIMPAS fault tables), comparative negligence calculations, fault assignment. Insurer-only domain. |
| **Settlement calculation** | Repair cost estimation, medical cost projection, reserve setting, total loss valuation. Insurer-only. |
| **Subrogation management** | Recovery from at-fault party's insurer. Inter-insurer financial flows. Insurer-only. |
| **Regulatory reporting** | Solvency II reporting, claims reserves, EIOPA compliance. Insurer-only. |

#### ❌ NO — These Are Broker-Specific

| Capability | Why It Doesn't Transfer |
|---|---|
| **Multi-insurer claims management** | A broker places business with 10+ insurers, each with different portals, submission formats, and requirements. Their pain is managing claims ACROSS systems. Insurers only manage their own single system. |
| **Client advocacy tooling** | Tracking claim outcomes vs policy terms, comparing settlement offers against what SHOULD be paid, building evidence to push back on underpayment. Insurers would never build this — it works against them. |
| **Cross-portfolio risk analysis** | Broker sees claims across all clients and all insurers — can spot patterns ("Insurer X always underpays windshield claims by 15%"). Insurer only sees their own book. |
| **Insurer performance benchmarking** | "Which of my 10 insurer partners settles fastest? Pays most fairly? Has the best digital submission?" Broker-only need. |

### 🔑 Bottom Line on Transferability

Mysa's **current wedge** (document extraction, FNOL structuring, data normalization) sits squarely in the **overlap zone** — the first 30-40% of the journey where both brokers and insurers share the same problems. This means the same core product DOES work for both.

However, as Mysa moves deeper into the claims journey (triage, investigation, settlement), the product becomes **insurer-specific** and diverges from broker needs entirely.

**Implication:** Mysa can serve both brokers and insurers with the intake/data layer — but needs to decide which direction to go deeper. Going deeper for insurers means claims processing features. Going deeper for brokers means multi-insurer management and advocacy tools. These are different product roadmaps.

---

## Step 3C: Will Brokers Disappear From Claims? — A Strategic Challenge

### The Thesis: "Brokers will disappear from the claims process"

**Verdict: Half right, half dangerously wrong.**

### Where the Thesis Is RIGHT ✅

For **simple, routine motor claims** — clean EAS, clear fault, low value, single vehicle or straightforward two-party:

- The broker adds almost nothing to the claims process. They're a **relay node**: receive info from policyholder, reformat it, forward to insurer.
- A good digital FNOL tool eliminates this step entirely. Policyholder opens insurer's app, files claim in 5 minutes, done.
- The broker never even hears about it until the renewal conversation.
- This is already happening — direct digital claims filing is growing, and for the EU motor claims that follow the clean EAS path (potentially ~60-70%, but only ~10% achieve true STP today), broker involvement in claims is increasingly unnecessary.

### Where the Thesis Is WRONG ❌ — And Why It Matters Strategically

#### a) Brokers Are Consolidating and Getting MORE Powerful, Not Less

- PE money is flooding into broker M&A — **a significant majority of insurance M&A activity in Europe** is broker consolidation
- Acrisure (Joaquim's group) is one of the biggest global acquirers
- In the US, independent agents held **61.5% of P&C premiums** in 2024 (Big "I" 2025 report)
- In Europe, intermediaries (agents + brokers) control **55%+ of non-life premiums**
- MGA premiums grew **14.5% in 2024** alone (AM Best) — MGAs are broker-adjacent
- These are NOT players that are fading. They're getting bigger, more sophisticated, and more leveraged.

#### b) Brokers Control Distribution — They Can Block Mysa's Adoption

This is the critical strategic point:

- If an insurer adopts Mysa and the new process makes the broker feel cut out or threatened, the **broker can move their book of business to a competitor insurer**
- Large brokers place hundreds of millions in premium. Insurers CANNOT afford to alienate them.
- Even if Mysa's tool makes the broker irrelevant for simple claims, the insurer may **not deploy it in a way that bypasses the broker** — because the relationship risk is too high.
- **Implication for Mysa:** If brokers perceive you as a threat, they become a powerful BLOCKER of adoption, regardless of how good your product is for the insurer.

#### c) Complex Claims Are Growing, Not Shrinking

- ADAS (Advanced Driver Assistance Systems) repair costs up **20-30%** — sensors behind bumpers require recalibration after minor collisions
- Bodily injury claims are rising in frequency and severity
- Litigation funding is expanding in Europe, driving more disputed claims
- Average claim values increasing due to inflation in parts, labor, and medical costs
- These complex claims are exactly where brokers add **genuine value** as advocates and negotiators
- Simple claims may get automated away, but the **high-value, complex claims** will keep brokers firmly in the loop

#### d) Regulatory Protection

- The EU **Insurance Distribution Directive (IDD)** specifically protects intermediary roles and requires disclosure obligations that keep brokers embedded in the process
- No regulatory movement in Europe or US to eliminate or reduce intermediary involvement
- If anything, consumer protection trends FAVOR having an independent advocate (broker) in the process

### 🇺🇸 US vs 🇪🇺 EU: Is the Broker Dynamic the Same?

**No — there are significant structural differences:**

| Factor | 🇪🇺 Europe | 🇺🇸 United States |
|---|---|---|
| **Dominant intermediary type** | Agents (tied) dominate Southern Europe. Brokers dominate UK, Benelux. Mixed in Germany/France | Captive agents dominate personal lines (State Farm, Allstate). Independent agents dominate commercial. Brokers are mostly large commercial players. |
| **Intermediary share of non-life** | ~55% agents + brokers combined | ~61.5% independent agents + ~21% captive agents + ~16% direct |
| **Broker role in personal motor claims** | Varies hugely by country. Strong in UK/NL. Weak in Italy (agents dominate). Growing in digital-first markets. | **Minimal.** Most personal auto is captive agent or direct. Brokers are almost absent from personal auto claims. Independent agents help but have limited claims capability. |
| **Captive agent claims capability** | Agents in Italy/Germany/Portugal can sometimes file claims directly in insurer systems, but it varies | **Strong.** State Farm, Allstate agents have direct system access. They ARE the insurer's front office for claims. |
| **Who controls the book?** | Mixed — some markets the agent "owns" the client relationship, others the insurer does | **Independent agents own the book** (policy renewals). Captive agents do NOT — the insurer owns it. This is a huge difference in power dynamics. |
| **Direct channel growth** | ~19% of non-life, growing at ~5% CAGR | ~25-30% of personal auto, growing fast. 47% of purchases now digital. |
| **Consolidation trend** | Massive PE-driven broker consolidation across Europe | Similar — massive M&A, 535 deals in first 3 quarters of 2024 |
| **Broker's claims role** | Active — especially in UK, NL, Belgium. Broker files claims, advocates, negotiates. | **Passive in personal lines** — independent agents mostly direct clients to insurer's claims line. Active in commercial lines where claims are complex. |
| **Regulatory protection** | IDD protects intermediaries explicitly | State-level regulation. No federal equivalent of IDD. Less explicit protection but strong lobby. |

#### Key US Differences That Matter for Mysa:

1. **The captive agent IS the insurer in the US.** A State Farm agent filing a claim is essentially using State Farm's system. There's no "broker → insurer" data handoff problem because the agent is already inside the insurer's tech stack. The intermediary friction that Mysa can solve in Europe **largely doesn't exist** for captive agent channels in the US.

2. **Brokers barely touch US personal auto claims.** The broker-as-claims-advocate model that's strong in the UK and Netherlands is almost non-existent for US personal motor. Brokers matter in US commercial lines, but that's a different market.

3. **The US has a stronger direct channel for claims.** GEICO and Progressive built their entire model on direct claims handling. The policyholder calls a 1-800 number or uses the app. No intermediary at all. This is the model that IS displacing intermediaries — but it's been doing so for 30+ years and agents still hold 60%+.

4. **Independent agents in the US have a weaker claims role than EU brokers.** US independent agents primarily sell policies. When a claim happens, they typically direct the client to the insurer's claims department. They may help with paperwork and follow up, but they don't actively manage or negotiate the claim the way a UK broker would. Their claims role is more **"customer support"** (your original instinct) than true advocacy.

5. **Power dynamics differ.** In the US, independent agents "own" the client relationship and renewal rights — giving them leverage over insurers on the sales side. But in claims, the insurer runs the show. In the UK/EU broker model, the broker maintains more involvement throughout the claims lifecycle.

#### Implication for Mysa's Market Strategy:

| Market | Broker/Agent Problem in Claims | Mysa Opportunity |
|---|---|---|
| **UK, Netherlands, Belgium** | Brokers actively manage claims but struggle with multi-insurer portals, manual document handling, slow communication | HIGH — Mysa's data normalization layer solves the broker-insurer handoff problem directly |
| **Italy, Germany, Portugal, Spain** | Tied agents file claims into insurer systems but deal with poor data quality, paper EAS forms, manual data entry | MEDIUM — agents benefit from document extraction but are already inside the insurer's system, so the handoff friction is lower |
| **US personal auto** | Captive agents use insurer systems directly. Independent agents have minimal claims role. | LOW for broker/agent play — go direct to insurer. The intermediary friction Mysa solves in EU doesn't really exist here |
| **US commercial lines** | Brokers manage complex claims across multiple insurers. Document-heavy, multi-party. | HIGH — similar to UK/NL broker dynamics but for commercial, not personal motor |

### Two Strategic Scenarios for Mysa

#### Scenario A: Mysa Makes Brokers MORE Efficient ✅ (Recommended)

- Broker uses Mysa's tools to file better-structured FNOLs, track claims faster, serve more clients with less staff
- Broker LOVES Mysa because it makes them look good and handle more volume
- Insurer loves Mysa because they receive cleaner data
- Brokers become a **distribution channel** for Mysa — they recommend you to the insurers they work with
- **Revenue model:** Sell to insurer, but design the product so brokers benefit from the workflow
- **Connects to Acrisure/Joaquim:** They're a broker with ~4K claims/year. Help them process FNOLs in half the time = they champion Mysa to every insurer they work with

#### Scenario B: Mysa Makes Brokers Irrelevant ❌ (Risky)

- Mysa enables direct policyholder-to-insurer claims filing so good nobody needs a broker
- Broker HATES Mysa — perceives it as threatening their business
- Brokers lobby insurers not to adopt the product
- Brokers move business to competitors who don't use Mysa
- Mysa has made an enemy of the players who control 55%+ of premium placement in EU

#### Recommendation:

**Scenario A for the first 3-5 years, minimum.** Position Mysa as broker-friendly infrastructure. The "data normalization layer" thesis naturally fits — Mysa sits between broker and insurer, normalizing data from whatever format the broker sends (email, PDF, phone call transcript, their own CRM export) into clean structured data for the insurer. You're not replacing anyone — you're making the handoff faster and cleaner.

As the market shifts and direct channels grow (they will), Mysa's position as the data layer means you naturally capture more direct-channel volume too. You win either way — whether claims come through brokers or direct, they flow through Mysa.

---

---

## Phase 5: FNOL (First Notice of Loss)

### What is FNOL?

**FNOL = First Notice of Loss** — the initial report a policyholder makes to their insurer that an incident occurred. It's NOT the full claim — it's the **trigger** that opens a claim file.

| | FNOL | Formal Claim / Proof of Loss |
|---|---|---|
| **When** | Immediately after incident | Later, once fully documented |
| **Purpose** | Alert insurer, open file | Formally request payment |
| **Detail level** | Basic — what happened, when, where | Detailed — full documentation, sworn statement |
| **Format** | Phone call, app, email, web form | Often a formal signed document |

Source: [Five Sigma](https://fivesigmalabs.com/blog/the-meaning-of-fnol-in-claims-management/), [Sentry Insurance](https://www.sentry.com/what-we-offer/resources/articles/what-is-fnol)

### FNOL vs First Contact

FNOL comes AFTER first contact because intermediaries may be involved:
- **Direct channel:** First contact IS FNOL (policyholder → insurer)
- **Broker channel:** First contact = broker; FNOL = when broker submits to insurer
- **Agent channel:** Depends on captive (FNOL immediate) vs independent (redirects to insurer)

### Core FNOL Data Fields

| Field | Description |
|---|---|
| **Policy number** | To verify coverage |
| **Policyholder contact** | Name, phone, email |
| **Date & time of incident** | When did it happen? |
| **Location** | Where did it happen? |
| **Description of incident** | What happened? (narrative) |
| **Police report number** | If applicable |
| **Third parties involved** | Other drivers, witnesses |
| **Initial damage description** | What's damaged, injuries? |

**For motor specifically:**
- Vehicle details (make, model, registration)
- Other vehicle details
- Driver info (was policyholder driving?)
- Circumstances (checkboxes in EU via EAS)

### Who Fills Out FNOL?

| Channel | Who Fills FNOL | How |
|---|---|---|
| **Direct (policyholder calls insurer)** | Insurer's **call center agent** | Agent asks questions, types into system |
| **Direct (policyholder uses app/web)** | **Policyholder** | Guided form |
| **Broker submits** | **Broker** | Fills form and submits to insurer |
| **Captive agent submits** | **Captive agent** | Direct system access, fills form in insurer's system |

**Note:** The call center agent is typically an insurer employee or outsourced call center — NOT a TPA. TPAs may handle FNOL but are more commonly used for claims handling, specialty claims, or overflow capacity.

### 🇺🇸 US: ACORD Forms

**ACORD (Association for Cooperative Operations Research and Development)** provides 800+ standardized forms used across the US insurance industry:
- **ACORD Automobile Loss Notice** — for motor claims
- **ACORD Property Loss Notice** — for property claims
- Different forms for different lines and scenarios

**Why 800+ forms?** Before ACORD (founded 1970), every insurer had their own forms. ACORD covers every scenario: different lines of business, transaction types, and claim scenarios.

**Key insight:** ACORD forms are often invisible to the end user. The insurer's claims system has fields that MAP to ACORD standards. When you call State Farm, the agent isn't thinking "I'm filling out ACORD form 123" — they're entering data into their system, which is ACORD-structured.

Source: [ACORD](https://www.acord.org/forms-pages/acord-forms), [NasaSoft](https://www.nasasoft.com/blog/everything-you-need-to-know-about-insurance-acord-forms)

### 🇪🇺 EU: No ACORD Equivalent for Claims

**Does every EU insurer have different forms?** Yes — essentially.

Each EU insurer has their own:
- FNOL intake forms (web, app, call center scripts)
- Claims management systems
- Data fields and formats

**Standardizing forces that DO exist:**
1. **The EAS (European Accident Statement)** — Pan-EU standard for scene documentation. The INPUTS to FNOL are somewhat standardized for motor.
2. **Convention systems (CIMPAS, IDA, CID)** — Require insurers to exchange data in specific formats for fault determination.

**But for FNOL itself?** No standard. Insurer A's web form has different fields than Insurer B's. This is why broker submission is messy.

**Product opportunity:** A data normalization layer that takes any input (EAS scan, email, phone transcript) and outputs structured data for ANY insurer's system.

### EU vs US: The Fundamental FNOL Difference

| | 🇪🇺 EU (Motor) | 🇺🇸 US (Motor) |
|---|---|---|
| **Data already captured before FNOL?** | YES — EAS captures most incident data at scene | NO — Data must be collected at FNOL |
| **FNOL primary function** | "Here's my EAS + policy number" — verification | "Let me tell you what happened" — data collection |
| **Structured data at FNOL?** | HIGH — EAS has checkboxes, diagram, signatures | LOW — mostly narrative/verbal |
| **Who collects incident details?** | Both drivers at scene (EAS) | Adjuster via recorded statement AFTER FNOL |
| **Call length for simple claim** | Short — "I had an accident, here's my EAS" | Long — 15-30 min recorded statement |
| **Adjuster involvement at FNOL?** | Often NONE for clean EAS | Almost ALWAYS |

### 🇪🇺 EU FNOL Flow (Clean EAS Path)

```
Policyholder calls insurer (or broker submits)
     ↓
"I had an accident. Policy number: X. I have my EAS."
     ↓
Front office / call center agent:
├── Verifies policy is active
├── Receives EAS (scan, photo, digital submission)
├── Opens claim file
├── Logs basic info
     ↓
NO CALL TO ADJUSTER for ~10% actual STP (60-70% theoretical)
     ↓
EAS goes to claims handler who:
├── Matches EAS to convention fault tables
├── If clean match → straight-through processing
├── If unclear → THEN contact driver for clarification
```

### 🇺🇸 US FNOL Flow

```
Policyholder calls insurer (or broker submits basic info)
     ↓
Call center agent collects:
├── Policy number
├── Basic incident info (date, time, location)
├── Other party info
├── Police report number
     ↓
Claim file opened
     ↓
THEN adjuster calls back (often same day or next)
     ↓
Adjuster conducts RECORDED STATEMENT (15-30 min):
├── Walk me through what happened
├── What were you doing before the accident?
├── What did you see?
├── Where exactly were you hit?
├── Who said what?
├── Any witnesses?
├── Any injuries?
     ↓
Adjuster ALSO calls OTHER driver for their statement
     ↓
Adjuster reconstructs incident from competing accounts
```

### The Claims File: FNOL is the Seed

The FNOL doesn't create a separate document — it creates the **claims file** that grows throughout the lifecycle:

```
FNOL Created → Claim file opened
     ↓
FNOL data = foundation of this file
     ↓
Triage → Assigned to handler/adjuster
     ↓
ADJUSTER/HANDLER adds to the SAME file:
├── Investigation notes
├── Recorded statement transcript (US)
├── Additional photos
├── Police report (retrieved)
├── Repair estimates
├── Medical records (if BI)
├── Liability determination
├── Reserve amounts
├── Settlement calculations
     ↓
Same file throughout lifecycle until closure
```

### Health Insurance: FNOL Doesn't Really Apply

Health claims follow a different model:
- **Pre-authorization:** "I need surgery, approve it" — happens BEFORE treatment
- **Claim submission:** "I had treatment, pay the provider" — happens AFTER

This is a **request-approval workflow**, not an event-response workflow. The equivalent form in US is the **CMS-1500** (for professional services) with 33 boxes of required fields including diagnosis codes (ICD-10) and procedure codes (CPT).

**Recommendation:** Don't try to map health claims on the same journey. It's a different product.

### FNOL Automation Opportunities

| Market | Opportunity |
|---|---|
| **🇪🇺 EU** | **Digitize EAS intake** — OCR, extract structured data, auto-match to convention. FNOL itself is simple; value is processing EAS faster. |
| **🇺🇸 US** | **Automate recorded statement** — voice-to-text, extract facts from narrative, identify contradictions, pre-fill liability assessment. FNOL is where ALL data collection happens. |

---

## Phase 6: Triage

### What is Triage?

Triage is the process of evaluating an incoming claim and deciding:
1. **Complexity:** Simple vs. requires investigation
2. **Severity:** Minor damage vs. total loss vs. bodily injury
3. **Routing:** Who should handle this? Or can it be auto-processed?
4. **Priority:** Urgent vs. standard

### Who Does Triage?

| Approach | How It Works | Where Used |
|---|---|---|
| **Manual (traditional)** | Supervisor reviews FNOL, assigns to adjuster based on workload, expertise, location | Smaller insurers, complex claims |
| **Rules-based automation** | System applies business rules: "If claim type = X and location = Y, assign to adjuster Z" | Most mid-large insurers |
| **AI/ML triage** | Predictive models assess complexity, severity, fraud indicators → route accordingly | Leading insurers, growing |

### EU vs US Triage Difference

| | 🇪🇺 EU (Clean EAS Path) | 🇺🇸 US |
|---|---|---|
| **Does claim GO to adjuster?** | Often NO — convention system *could* auto-process ~60-70%, but only ~10% achieve true STP due to data quality | Almost ALWAYS — adjuster does recorded statement |
| **Triage question** | "Does this need human review?" (yes/no) | "Which adjuster should handle this?" |
| **Who triages?** | Claims handler + convention system | Supervisor or automated rules engine |
| **Straight-through processing?** | YES — goal is to skip human investigation | RARE — even simple claims get adjuster time |

### EU Triage: Convention-Driven

In EU, the triage decision often maps to EAS quality:

| EAS Quality | Triage Decision | Path |
|---|---|---|
| **Clean EAS** — complete, signed, matches convention scenario | Auto-process | Convention fault tables → settlement calculation → payment |
| **Unclear EAS** — missing info, unclear diagram | Clarification | Claims handler contacts driver for gap-filling |
| **Disputed/No EAS** — parties disagree, no joint form | Investigation | Assigned to adjuster for full investigation |
| **Bodily injury** | Specialist | Assigned to BI handler, likely involves lawyers |
| **Fraud indicators** | SIU | Flagged for Special Investigation Unit |

### US Triage: Adjuster Assignment

In US, triage is about matching the claim to the right adjuster:

| Factor | Routing Decision |
|---|---|
| **Claim type** | Auto vs property vs liability vs BI |
| **Severity** | Minor damage (junior adjuster) vs total loss (senior) vs BI (specialist) |
| **Location** | Local adjuster vs remote handling |
| **Complexity** | Straightforward (standard queue) vs complex (specialist) |
| **Fraud score** | High score → SIU review |

### TPA vs In-House

**TPA (Third Party Administrator)** — independent company that can handle claims on behalf of an insurer.

| | In-House | TPA |
|---|---|---|
| **Call center agent** | Insurer employee | Could be TPA (outsourced FNOL) |
| **Claims handler** | Insurer employee | Could be TPA |
| **Adjuster** | Staff adjuster (insurer) | Could be independent adjuster or TPA |
| **When TPA used** | N/A | Overflow, specialty, run-off, cost savings |

**EU note:** German insurers have historically seen claims as core competency and resisted TPA outsourcing. But shortage of experts and GDPR concerns are slowly changing this.

Source: [Pro Global - TPA in Germany](https://pro-global.com/the-maturing-third-party-authority-tpa-market-in-germany/)

### Adjuster Employment Breakdown (US)

| Type | % of Adjusters | Description |
|---|---|---|
| **Staff adjusters** (insurer employees) | ~70% | W-2 employees handling claims for one insurer |
| **TPA adjusters** | ~23% | Employed by TPAs, handle claims on behalf of multiple insurers |
| **Regional IA firms** | ~7% | Independent adjusters contracted per-claim |

Source: [Association of Claims Professionals](https://claimsprofession.org/about-independent-claims-adjusters/)

**EU breakdown:** Not well documented. German insurers keep claims in-house. UK has more TPA usage. Southern Europe — no clear data.

---

## Deep Dive: EAS Data Schema & Convention Matching

### EAS Data Schema (~100 Fields)

The European Accident Statement has a standardized structure across all EU countries:

```
SECTION A: ACCIDENT DETAILS
├── Date of accident
├── Time of accident
├── Location (address, city, country)
├── Injuries? (Yes/No)
├── Damage to other vehicles? (Yes/No)
├── Damage to objects? (Yes/No)
├── Police called? (Yes/No) → Report number
├── Witnesses (name, address, phone)

SECTION B: VEHICLE A DETAILS
├── Policyholder (name, address, phone)
├── Vehicle (make, model, registration, country)
├── Insurance (company, policy number, green card)
├── Driver (name, address, license number, date)
├── Damage description

SECTION C: VEHICLE B DETAILS
├── [Same structure as Vehicle A]

SECTION D: CIRCUMSTANCES (17 CHECKBOXES)
├── □ 1. Parked/stopped
├── □ 2. Leaving parking space
├── □ 3. Entering parking space
├── □ 4. Emerging from car park/private ground
├── □ 5. Entering car park/private ground
├── □ 6. Entering roundabout
├── □ 7. Circulating in roundabout
├── □ 8. Striking rear of other vehicle (same direction)
├── □ 9. Same direction, different lane
├── □ 10. Changing lanes
├── □ 11. Overtaking
├── □ 12. Turning right
├── □ 13. Turning left
├── □ 14. Reversing
├── □ 15. Encroaching on opposite carriageway
├── □ 16. Coming from right (at junction)
├── □ 17. Not observing right of way / red light

SECTION E: DIAGRAM
├── Sketch showing positions, movements, road layout

SECTION F: OBSERVATIONS
├── Free text for additional details

SECTION G: SIGNATURES
├── Driver A signature + date
├── Driver B signature + date
```

### Convention Fault Tables (IRSA/IDA — France Example)

The convention defines **13 standard accident scenarios** that map to EAS checkboxes:

| Code | Scenario | Fault A | Fault B |
|---|---|---|---|
| 10 | Same direction, rear collision | 0% | 100% |
| 13 | Both changing lanes simultaneously | 50% | 50% |
| 15 | One vehicle changes lane | 0% | 100% (changer) |
| 17 | Lane change + left turn | 0% | 100% (changer) |
| 20 | Crosses center line | 0% | 100% (crosser) |
| 21 | Center position unclear | 50% | 50% |
| 30 | Priority from right applies | 0% (priority) | 100% |
| 31 | Priority + crosses axis | 0% (priority) | 100% |
| 40 | One vehicle legally parked | 0% (parked) | 100% |
| 43 | One vehicle illegally parked | 100% (illegal) | 0% |
| 50 | Runs red light | 0% | 100% (violator) |
| 51 | Ignores police barrier | 0% | 100% (violator) |
| 56 | Violates traffic bans | 0% | 100% (violator) |

Source: [Aide BTS Assurance - IRSA Barème](https://www.aidebtsassurance.com/en/bareme-of-the-irsa-ida-agreement-understanding-responsibilities-in-case-of-an-accident/)

### How EAS → Convention Matching Works

```
EAS CHECKBOXES → SCENARIO CODE → FAULT %

Example:
├── Vehicle A checks: □ 8 (Striking rear)
├── Vehicle B checks: □ 1 (Parked/stopped)
     ↓
└── Maps to Scenario 10 (rear collision)
     ↓
└── Fault: A = 100%, B = 0%
```

**The convention is a LOOKUP TABLE.** Given checkbox combinations, it outputs fault percentage. No human judgment needed for clear cases.

### Portugal: IDS (Direct Indemnification System)

Portugal uses IDS (Indemnização Direta ao Segurado):
- Your OWN insurer pays you first
- Then recovers from at-fault insurer via the convention
- Only applies to material damage < €15,000 and no injuries
- Similar to Italy's CID

**Note:** CIMPAS is NOT a convention — it's a dispute resolution/arbitration center for when conventions fail.

Source: [C1 Brokers - IDS Portugal](https://c1brokers.pt/en/total-loss-in-car-insurance-when-the-insurer-wrongly-applies-the-ids-agreement-real-case-in-portugal/)

---

## 🔑 Critical Insight: The STP Reality Gap

### The Theory vs Reality

**Theory:** EAS checkboxes → Convention lookup → Fault determined → Claim auto-processed

**Reality:** Only ~10% of claims achieve Straight-Through Processing (STP)

Source: [Insurance Thought Leadership](https://www.insurancethoughtleadership.com/claims/straight-through-processing-2021)

### Why STP Is Only ~10% Despite Conventions Existing

| Theoretical | Reality |
|---|---|
| Clean digital EAS | **50% still paper**, handwritten |
| All checkboxes ticked correctly | Often **incomplete, ambiguous** |
| Clear diagram | **Messy sketch**, unclear |
| Both parties signed | Sometimes **unsigned, disputed** |
| Matches a convention scenario | **Many don't fit** the 13 standard cases |

**The convention lookup is TRIVIAL.** The bottleneck is getting clean data INTO the lookup.

### Where Claims Handlers Actually Spend Time

| Activity | % of Time | What Happens |
|---|---|---|
| **Data Extraction** | ~30% | Reading paper EAS, interpreting handwriting, re-keying into system |
| **Exception Handling** | ~25% | Claims that don't match convention, disputes, complex scenarios |
| **Damage Assessment** | ~20% | Reviewing photos, getting repair estimates, total loss calculation |
| **Validation & Clarification** | ~15% | Calling drivers for missing info, incomplete forms |
| **Policy & Payment** | ~10% | Verifying coverage, processing payment |

### The Data Extraction Problem (Paper EAS)

```
Paper EAS arrives (scan, photo, fax)
     ↓
Handler must READ:
├── Handwritten text (often illegible)
├── Checkboxes (which are ticked?)
├── Diagram (what does it show?)
├── Signatures (present? valid?)
     ↓
Handler TYPES into claims system:
├── Re-keys every field manually
├── Interprets unclear handwriting
├── Guesses at ambiguous checkboxes
     ↓
ERROR INTRODUCTION POINT
```

### The Validation Problem (Incomplete EAS)

```
Is the EAS complete?
├── All required fields filled? → Often NO
├── Both parties signed? → Sometimes NO
├── Diagram clear? → Often NO
├── Checkboxes consistent with diagram? → Sometimes NO
     ↓
If incomplete → Contact driver:
├── Phone call (wait for answer)
├── Explain what's missing
├── Wait for response/updated form
├── Update claim file
     ↓
DELAY + HANDLER TIME
```

### The Exception Handling Problem

```
Does EAS match a convention scenario?
├── Clear match → Lookup (trivial, seconds)
├── UNCLEAR MATCH → Handler judgment needed
├── NO MATCH (complex) → Full investigation required
├── DISPUTED → Full investigation required
     ↓
~40% of claims need human judgment beyond the lookup
```

### Why Damage Assessment Is Separate From Fault

Even when fault is 100% determined (A caused it), you still need to know:
- What's the damage worth?
- Repair or total loss?
- What does the repair cost?
- Did the claimant mitigate damages?

**Fault ≠ Settlement amount.** They're different problems.

### The Claim Flow Reality

```
100 claims arrive
     ↓
~50 are paper EAS → Need manual data entry
     ↓
~20 are incomplete → Need clarification calls
     ↓
~15 don't match convention → Need investigation
     ↓
~5 are disputed → Need full adjuster
     ↓
~10 are CLEAN → STP possible ✓
```

### Cost Comparison: Manual vs STP

| Processing Type | Cost Per Claim |
|---|---|
| Manual processing | ~$75 (adjuster labor, overhead, rework) |
| STP (automated) | ~$15 (platform + minimal oversight) |
| **Savings per claim shifted to STP** | **$60** |

Source: [Nanonets - Claims Automation](https://nanonets.com/blog/claims-process-automation/)

### 🎯 The Real Product Opportunity

**Wrong framing:** "Automate the convention matching"
- Convention matching is already trivial — it's a lookup table

**Right framing:** "Get clean structured data TO the convention"

| Problem | Solution |
|---|---|
| Paper EAS (50%) | OCR + AI extraction |
| Incomplete EAS | AI flags gaps, prompts for missing data |
| Unclear checkboxes | AI interprets + confidence scoring |
| Messy diagrams | AI reconstructs scenario from diagram |
| Doesn't match convention | AI suggests closest match or flags for human |

**If you can turn a messy paper EAS into clean structured data that maps to convention scenarios, you move claims from the ~90% manual pile to the ~10% STP pile.**

---

## Phases 7-11: TO BE MAPPED

| Phase | Name | Key Questions |
|---|---|---|
| 7 | Investigation | Who investigates? What tools? How long? |
| 8 | Assessment | Vehicle inspection, damage valuation, repair vs. total loss |
| 9 | Decision | Who decides? What authority levels? Appeals? |
| 10 | Settlement | How does money move? How fast? Who gets paid? |
| 11 | Close | What triggers closure? Reopening? Subrogation? |

---

## Fork Registry

| Fork ID | Title | Phase | Key Question | # of Paths |
|---|---|---|---|---|
| F1 | Anyone Injured? | 1 - Scene | Are there injuries at the scene? | 2 |
| F2 | Other Party Cooperative? | 1 - Scene | Is the other driver willing to cooperate? | 3 |
| F3 | EU vs US Documentation | 2 - Documentation | Which market? | 2 |
| F4 | First Contact Channel | 4 - First Contact | Who does the policyholder contact first? | 3 |
| F5 | Broker Submission Method | 4 - First Contact | How does the broker submit the claim to insurer? | 3 |
| F6 | Triage Decision | 6 - Triage | Skip adjuster (straight-through) or assign to investigation? | 3 |
| F7 | 🇪🇺 EAS Quality | 3 - Reconciliation | Is the EAS complete and does it match a convention scenario? | 3 |
| F8 | 🇺🇸 Claim Filing Type | 3 - Reconciliation | First-party, third-party, or both? | 3 |
| F9 | 🇺🇸 Fault System | 3 - Reconciliation | No-fault state or at-fault state? | 2 |

### Fork Chain (How Decisions Connect):
```
F1 (Injured?)
├── YES → Bodily injury path (police take over)
└── NO → F2 (Cooperative?)
         ├── YES → F3 (EU vs US?)
         │         ├── 🇪🇺 EU → EAS filled → F7 (EAS Quality?)
         │         │                           ├── Clean → Convention auto-resolves
         │         │                           ├── Unclear → Clarification needed
         │         │                           └── Disputed → Full investigation
         │         └── 🇺🇸 US → F8 (Filing type?) → F9 (Fault system?)
         ├── NO (Disputes) → Police called, no EAS
         └── FLED (Hit & run) → Police, guarantee fund path

──────────────────────────────────────────────────────
AFTER RECONCILIATION → F4 (First Contact Channel)
├── BROKER → F5 (Broker Submission Method)
│             ├── Portal → Manual rekey into insurer system ⚠️
│             ├── Email → Insurer re-keys (double entry) ⚠️
│             └── Phone → Fastest open, docs delayed ⚠️
├── AGENT
│    ├── Captive → Direct system access (≈ insurer)
│    └── Independent → Directs to insurer
└── DIRECT → Fastest, no intermediary friction
         ↓
    FNOL CREATED
         ↓
    F6 (Triage Decision)
    ├── 🇪🇺 Clean EAS → STRAIGHT-THROUGH (no adjuster) ~10% actual / 60-70% theoretical
    ├── 🇪🇺 Unclear → Clarification → maybe adjuster ~15-20%
    ├── 🇪🇺 Complex/BI → Full investigation ~15%
    └── 🇺🇸 ALL claims → Assign adjuster (100%)
```

---

# HOME/PROPERTY CLAIMS JOURNEY

> **Status:** Initial mapping complete. Home claims are structurally different from motor — no counterparty, no EAS, no convention system, almost always requires adjuster inspection.

---

## Home vs Motor: The Fundamental Differences

### Why Home Claims Are Structurally Different

| | **Motor Insurance** | **Home/Property Insurance** |
|---|---|---|
| **Counterparty?** | YES — another driver, another insurer | Usually NO — it's you vs. the peril |
| **Agreed document?** | 🇪🇺 EAS — both parties sign | NONE — only your claim, your photos |
| **Fault question?** | WHO caused the accident? | WAS the peril covered? |
| **Convention/lookup system?** | 🇪🇺 Yes — IRSA/IDA fault tables | NONE — coverage is policy interpretation |
| **STP possible?** | 🇪🇺 ~10% actual, 60-70% theoretical | Very rare — almost always needs inspection |
| **Adjuster involvement** | 🇪🇺 Often NO for clean EAS path | Almost ALWAYS for non-trivial claims |

### Home Insurance Claim Types (US Data, 2019-2023)

| Peril | % of Claims | Avg Claim Amount | Notes |
|---|---|---|---|
| **Wind & hail** | 42.5% | Varies by severity | ~1 in 36 insured homes per year |
| **Water damage & freezing** | 29.4% | ~$15,400 | Second most common |
| **Fire & lightning** | ~5% | Highest (often total loss) | Most severe |
| **Theft** | 0.7% | ~$5,524 | Least common |
| **Other (liability, etc.)** | ~22% | Varies | Includes personal liability |

### Why Home Claims Almost ALWAYS Need an Adjuster

**Motor (EU clean path):**
- EAS says what happened (agreed document)
- Convention says who's at fault (lookup table)
- Damage is to a standardized asset (car make/model)
- Repair cost is estimable from photos + make/model

**Home:**
- NO agreed document of what happened
- Burden of proof is on YOU to show:
  1. Damage occurred
  2. It was caused by a COVERED peril (not excluded)
  3. The scope of loss matches your claim
- Every home is unique — can't estimate damage from "make/model"
- Contents are unknown — need inventory proof
- Hidden damage is common (water behind walls, mold, structural)

**Result:** ~100% of non-trivial home claims require adjuster inspection vs. ~10% STP for EU motor.

---

## Home Insurance FNOL Process

### FNOL Flow (Simplified)

```
INCIDENT (water leak, fire, theft, storm)
         ↓
IMMEDIATE ACTIONS
├── Mitigate further damage (turn off water, board up)
├── Document BEFORE cleanup (photos, video)
├── Police report (if theft/vandalism)
         ↓
FNOL to insurer
├── Phone / app / web portal
├── Policy number, date, description
├── NOT an agreed document — just your report
         ↓
CLAIM OPENED
         ↓
ADJUSTER ASSIGNED (almost always)
├── Inspection scheduled (usually within 1 week)
├── 1-2 hours on-site
├── Documents everything, estimates costs
         ↓
PROOF OF LOSS
├── Formal sworn statement
├── Inventory of damaged/stolen items
├── Supporting documentation (receipts, photos)
         ↓
COVERAGE DETERMINATION
├── Was this peril covered?
├── Any exclusions apply?
├── Policy limits?
         ↓
SETTLEMENT
├── May get partial payment upfront
├── Replacement cost = two payments (ACV now, depreciation later)
├── Complex claims (fire rebuild) can take MONTHS to YEARS
```

### Reporting Deadlines (Vary by Country/Insurer)

**France example:**
| Claim Type | Deadline |
|---|---|
| **Theft/burglary** | 2 working days |
| **Water damage, fire, other** | 5 working days |
| **Natural disaster (catastrophe naturelle)** | 10 days after official decree |

### Documentation Burden Is MUCH Higher Than Motor

**Motor:** EAS + photos + police report (if applicable)

**Home:**
- Photos/video of damage from multiple angles
- Inventory of damaged/stolen items with:
  - Brand names, model numbers
  - Original receipts (if you have them)
  - Age and condition
- Police report (mandatory for theft)
- Proof of ownership for valuable items
- "Proof of loss" form (formal sworn statement)

**The inventory problem is brutal.** After a fire or burglary, people have to remember and prove everything they owned.

---

## What Does a Home Insurance Adjuster Actually Do?

### The Job Has Two Parts

**1. INVESTIGATION — Establishing the Facts**
- Inspect the damage (what happened, how bad is it)
- Determine causation (what caused it — covered peril or not?)
- Document everything (photos, measurements, notes)
- Interview the policyholder and witnesses
- Review police reports (for theft/vandalism)
- Detect fraud indicators

**2. VALUATION — Estimating the Cost**
- Measure damaged areas
- Calculate repair/replacement costs using specialized software (Xactimate is industry standard, used by 75-80% of adjusters)
- Assess whether to repair or replace
- Account for depreciation (ACV vs replacement cost)
- Review contractor estimates
- Negotiate settlement amounts

### Desk Adjuster vs Field Adjuster

| | **Desk Adjuster** | **Field Adjuster** |
|---|---|---|
| **Location** | Office or remote (WFH) | On-site at the property |
| **Claim types** | Small (<$3K), simple, obvious causation | Large (>$3K), complex, unclear causation |
| **Examples** | Theft with police report, minor vandalism | Major fire, significant water damage, storm |
| **Tools** | Phone, video call, submitted photos/docs | Xactimate, measurement tools, cameras, drones |
| **Volume** | High — can handle many more claims | Lower — travel limits capacity |
| **Trend** | GROWING — virtual inspection enables more | Still needed but scope narrowing |

### The Shift Happening Now

```
PAST:         Field 80% ─────────────────── Desk 20%
TODAY:        Field 60% ─────────── Desk 40%
FUTURE (5yr): Field 40% ───── Desk/Virtual 60%
```

**COVID accelerated this** — insurers were forced to do virtual inspections and discovered it worked for many claims.

---

## Who Employs Home/Property Adjusters?

### Employment Breakdown (Estimates)

| Employer Type | Description | % of Adjusters |
|---|---|---|
| **Staff Adjusters** | Full-time employees of the insurer | ~40-50% |
| **TPA Adjusters** | Employed by TPAs (Crawford, Sedgwick, Engle Martin) | ~25-35% |
| **Independent Adjusters (IA)** | Freelance, contracted per claim | ~15-25% |
| **Public Adjusters** | Work for the POLICYHOLDER, not insurer | ~5% |

### Major TPAs in Property Claims

| TPA | Scale | Notes |
|---|---|---|
| **Crawford** | 10,000+ employees, 50,000+ field resources, 70 countries | Largest in the world |
| **Sedgwick** | Largest adjuster network globally, 25 yrs avg experience | End-to-end TPA |
| **Engle Martin** | Delegated authority specialist | Low-touch to CAT claims |
| **McLarens** | 100+ personnel in Europe | Strong EU presence |
| **Davies** | UK/Europe focus | Loss adjusting specialist |
| **Charles Taylor** | Global | Technical adjusting |

### When Do Insurers Use TPAs for Property Claims?

| Scenario | Why TPA? |
|---|---|
| **CAT events** (hurricane, wildfire, flood) | Need surge capacity — can't staff for 10x volume |
| **Geographic coverage** | Insurer doesn't have staff in every region |
| **Specialty claims** | Complex/large loss needs specialist expertise |
| **Cost optimization** | Variable cost vs fixed headcount |
| **Overflow** | Staff adjusters at capacity |

**Key insight:** TPAs are a huge potential customer segment. If you can make their adjusters more productive, you directly impact their unit economics.

---

## EU vs US Differences for Home/Property Adjusters

### Terminology Differences

| | **US** | **UK/Europe** |
|---|---|---|
| **Insurer's inspector** | Claims Adjuster | Loss Adjuster |
| **Policyholder's advocate** | Public Adjuster | Loss Assessor |
| **Regulation** | State-by-state licensing | CILA (Chartered Institute) in UK |

### Structural Differences

| Aspect | **US** | **EU** |
|---|---|---|
| **Licensing** | State-specific, complex, varies wildly | More standardized within countries |
| **TPA usage** | Very common, especially for CAT | Common in UK, growing in continental EU |
| **Field vs Desk split** | ~60/40 moving toward 50/50 | Similar trend, UK slightly ahead on virtual |
| **Public adjusters/assessors** | Common, regulated, 10-15% fee typical | UK has loss assessors, less common in continental EU |
| **CAT response** | Massive IA deployment (hurricane, wildfire) | Less frequent CAT, but similar model |
| **Major TPAs** | Crawford, Sedgwick, Engle Martin | Crawford, Sedgwick, McLarens, Davies, Charles Taylor |

### Key EU-Specific Factors

**UK:**
- Loss adjusters "supposed to be impartial" but work for insurer
- Loss assessors (policyholder advocates) are established profession
- CILA provides professional standards
- Strong TPA market

**Germany:**
- "Sachverständiger" (expert) role for property assessment
- Historically more insurer staff adjusters, less TPA outsourcing
- Changing due to talent shortage

**France:**
- "Expert d'assurance" handles property claims
- Strong regulatory framework
- Less TPA penetration than UK

### Unlike Motor, EU Has No Structural Advantage for Home Claims

- No EAS equivalent — no joint agreed document
- No convention system — no fault lookup tables
- The claim is between you and your insurer about whether a peril is covered
- **The 3x productivity opportunity applies equally to EU and US**

---

## Where Home Adjusters Spend Their Time

### Time Breakdown for Field Adjuster (Property Claims)

| Activity | % of Time | Automation Potential |
|---|---|---|
| **Travel to/from properties** | ~25-30% | HIGH — eliminate with virtual inspection |
| **Documentation & data entry** | ~20-25% | HIGH — auto-capture, voice-to-text, photo AI |
| **On-site inspection** | ~15-20% | MEDIUM — remote video, 3D scanning |
| **Report writing** | ~10-15% | HIGH — AI draft generation |
| **Xactimate/estimate creation** | ~10-15% | MEDIUM — AI-assisted, but review needed |
| **Communication (calls, emails)** | ~10-15% | MEDIUM — automated updates, chatbots |
| **Collaboration/escalation** | ~5-10% | LOW — human judgment needed |

**Key research finding:** "When a claim is assigned to an adjuster who needs help from a colleague, handling time nearly TRIPLES."

---

## The 3x Adjuster Productivity Opportunity

### Where the 3x Comes From

| Lever | How It Works | Productivity Gain |
|---|---|---|
| **1. Eliminate unnecessary field visits** | Virtual inspection for small/simple claims | ~25-30% time back |
| **2. Auto-generate documentation** | AI reads photos, drafts reports, pre-fills Xactimate | ~15-20% time back |
| **3. Reduce admin/data entry** | Voice-to-text, auto-capture measurements, photo AI | ~15-20% time back |
| **4. Triage before assignment** | AI pre-processes claim, adjuster gets structured package | ~10-15% time back |
| **5. Streamline collaboration** | Single source of truth, no re-explaining to colleagues | ~10% time back |

### Realistic Math

- Current: 1 adjuster handles ~100-150 claims/year (complex) or ~300-500 claims/year (simpler)
- If you eliminate 50% of field visits AND reduce admin by 50% → adjuster capacity increases ~2-3x

### What Would a "3x Productivity" Product Actually Do?

**BEFORE (Current State):**
```
FNOL received → Adjuster assigned → Adjuster schedules visit →
Adjuster drives to property → Adjuster inspects (1-2 hrs) →
Adjuster drives back → Adjuster enters data → Adjuster writes report →
Adjuster creates Xactimate estimate → Adjuster submits → Review/approval
```

**AFTER (Augmented State):**
```
FNOL received → AI pre-processes (photos, docs, coverage check) →
AI determines: Virtual or Field?
├── VIRTUAL (~40% of claims):
│   → Policyholder does video walkthrough with remote adjuster
│   → AI generates measurements from video
│   → AI drafts report + Xactimate estimate
│   → Adjuster reviews + approves (30 min vs 4 hrs)
│
├── FIELD (~60% of claims):
│   → Adjuster gets pre-processed package (coverage confirmed, AI damage assessment)
│   → Adjuster inspects (focused on what AI flagged)
│   → Mobile app captures measurements automatically
│   → AI generates report draft on-site
│   → Adjuster reviews + submits same day
```

---

## Can We Replace the Adjuster With AI?

### The Honest Assessment

| Capability | AI Can Do Today | AI Cannot Do Well |
|---|---|---|
| **Damage detection from photos** | ✅ Identify roof damage, water stains, fire | ❌ Hidden damage (behind walls, under floors) |
| **Measurement from photos/video** | ✅ 3D models from smartphone scans | ❌ Complex structures, custom finishes |
| **Repair cost estimation** | ✅ AI + Xactimate integration | ❌ Final approval, complex negotiations |
| **Document processing** | ✅ Extract data from receipts, reports | ❌ Verify authenticity, detect fraud |
| **Fraud pattern detection** | ✅ Flag suspicious claims | ❌ Investigate, prove fraud |
| **Coverage determination** | ⚠️ Flag potential exclusions | ❌ Complex policy interpretation |
| **Causation determination** | ⚠️ Suggest likely cause | ❌ "Was this sudden or gradual?" — expert judgment |

### The Accuracy Problem

> "Good AI model accuracy starts at about 70%, but to reliably automate high-risk processes such as insurance claim management, the accuracy needs to be above 95%."

**Current gap:** AI is at ~70%, needs >95% for full automation.

### The Fraud Problem Is Getting WORSE

> "Fraudsters can create fabricated property losses, complete with repair invoices, photos, estimates, and hotel bills using AI." — Gen Re, January 2026

If you automate claims processing with AI that trusts photos and documents, you're creating a target for AI-generated fraud.

### The Hidden Damage Problem

Water damage (29.4% of claims) is often INVISIBLE:
- Mold growing behind walls
- Structural damage to joists
- Electrical damage from water infiltration

**Photos don't show what's behind the drywall.**

### The Realistic Opportunity

| | **Can Automate** | **Can Augment** | **Still Needs Human** |
|---|---|---|---|
| **FNOL intake** | ✅ Yes | — | — |
| **Document processing** | ✅ Yes | — | — |
| **Photo damage detection** | ✅ For visible damage | — | Hidden damage |
| **Measurement/3D modeling** | ✅ Yes | — | — |
| **Repair cost estimation** | — | ✅ Draft for review | Final approval |
| **Coverage determination** | — | ✅ Flag exclusions | Complex interpretation |
| **Causation determination** | — | ✅ Suggest likely cause | Disputed/unclear |
| **Fraud detection** | — | ✅ Flag for review | Investigation |
| **Settlement negotiation** | — | — | ✅ Human required |
| **Large/complex claims** | — | ✅ Reduce adjuster time | ✅ Inspection needed |

**The opportunity isn't "replace the adjuster" — it's "make the adjuster 3x more productive" and "eliminate field visits for claims that don't need them."**

---

## Product Opportunity by Buyer Segment

| Segment | Current Pain | Opportunity |
|---|---|---|
| **Insurers (staff adjusters)** | Fixed cost, capacity-constrained | 3x productivity = handle 3x volume without hiring |
| **TPAs** | Variable cost, margin pressure | Productivity = better unit economics |
| **Independent adjusters** | Paid per claim, want throughput | Tools that let them handle more claims |
| **Desk adjusters** | Growing but tech-limited | Better virtual tools = handle more complex claims remotely |
| **Field adjusters** | Travel-heavy, admin-heavy | Reduce travel + automate admin = more inspections/day |

---

## Assumptions Log

| # | Assumption | Status | Notes |
|---|---|---|---|
| A1 | ~50% of EAS forms are still filled out on paper | ✅ Validated | Confirmed by Tiago |
| A2 | US police involvement threshold is ~$500-$1,000 in most states | ⚠️ Approximate | Varies significantly by state |
| A3 | Health pre-authorization is the dominant pattern in European private health insurance | ⚠️ Needs validation | May vary by market and product type |
| A4 | EU convention systems handle ~70-80% of motor claims automatically | ⚠️ Needs validation | Based on industry knowledge, not confirmed data |
| A5 | Clean EAS path (no insurer call to driver) represents ~60-70% potential, but only ~10% achieve actual STP | ⚠️ UPDATED | Reality vs theoretical — data quality is the bottleneck |
| A6 | ~12 US states are no-fault states | ⚠️ Approximate | Number varies depending on how "choice no-fault" states are counted |
| A7 | Some insurers have digital EAS in their apps but adoption in crisis moments is unclear | ⚠️ Needs research | Key product question — is this already being solved? |
| A8 | US first-party vs third-party filing split is roughly 60-65% first-party / 20-25% third-party / 10-15% both | ⚠️ Assumption — no clean source | Industry data shows 57% of insurer losses are liability (third-party) vs 43% physical damage (first-party), but this measures insurer payouts not policyholder filing behavior. The same accident generates claims on both sides. |
| A9 | Policy sale distribution channel ≈ claims first contact channel | ⚠️ Needs validation | People may purchase through a broker but call the insurer directly for claims, or vice versa |
| A10 | EU agent share for non-life motor is ~55-58% on average | ⚠️ Approximate | Based on Insurance Europe data (2014) and Mordor Intelligence (2024). Varies dramatically by country |
| A11 | US personal auto: ~33% independent agent, ~35% captive, ~25-30% direct | ⚠️ Based on 2022-2024 data | Big "I" 2025 report + Mordor Intelligence. Independent agents growing in personal lines |
| A12 | Brokers add most value in complex claims, less in simple/routine claims | ⚠️ Logical inference | Based on research into broker role, not validated with actual claims data |
| A13 | The overlap between broker and insurer claims problems is concentrated in the first 30-40% of the journey (intake/documentation) | ⚠️ Logical inference | Based on role mapping, not validated with actual workflow data |
| A14 | Brokers can block insurer adoption of tools that threaten their role | ⚠️ Strong assumption | Based on power dynamics and distribution leverage, but no specific cases documented |
| A15 | US captive agents have direct claims system access equivalent to insurer front office | ⚠️ Generally true | May vary by insurer — some captive agents still call a claims center |
| A16 | EU broker consolidation makes brokers MORE powerful, not less | ✅ Supported by data | PE-driven M&A trends, growing market share, MGA growth all point this direction |
| A17 | UK/NL/BE broker dynamics differ significantly from IT/DE/PT/ES agent dynamics in claims | ⚠️ Strong but approximate | The broker-dominant vs agent-dominant market distinction is well-established but the claims-specific behavior needs validation |
| A18 | ~70% of broker agencies report losing business due to submission inefficiencies | ⚠️ US-centric data | From Ivans Insurance 2021 — may not translate directly to EU |
| A19 | Broker-to-insurer claim submission is primarily via portal (manual rekey), email, or phone | ⚠️ Based on research | UK documented (RSA, Acturis), continental EU less clear |
| A20 | Email submissions result in double data entry (broker types, insurer re-keys) | ⚠️ Logical inference | No direct validation but strongly implied by industry pain point research |
| A21 | Continental EU (PT/ES/IT) is behind UK in broker-insurer digital integration | ⚠️ Inference | Based on lack of documented platforms like Acturis outside UK |
| A22 | Aviva-Acturis claims API (Dec 2024) being "ground-breaking" implies prior process was manual | ✅ Supported by source | Direct implication from Acturis blog announcement |
| A23 | EU has no ACORD equivalent for FNOL — each insurer has different forms/fields | ⚠️ Strong inference | Based on research showing ACORD is US-centric for retail claims |
| A24 | ACORD is used internationally but primarily for reinsurance and London market, not retail claims | ⚠️ Based on research | ACORD's international expansion focused on large commercial/reinsurance |
| A25 | EU FNOL is primarily "EAS submission + policy verification" vs US FNOL which is "data collection" | ⚠️ Logical inference | Based on EAS providing pre-captured data that US lacks |
| A26 | Only ~10% of EU motor claims actually achieve STP (60-70% is theoretical potential if data were clean) | ⚠️ UPDATED | Research shows data quality, not convention matching, is the bottleneck |
| A27 | German insurers have historically resisted TPA outsourcing (claims = core competency) | ⚠️ Based on Pro Global source | Trend is changing due to expert shortage |
| A28 | Health claims don't follow FNOL model — they're request-approval workflows | ⚠️ Logical inference | Pre-auth vs claim submission are fundamentally different |
| A29 | The convention lookup itself is trivial — a simple database query | ✅ Validated | The complexity is NOT in matching to fault tables |
| A30 | Only ~10% of EU motor claims achieve true straight-through processing | ⚠️ Based on research | Despite 60-70% being theoretically convention-matchable |
| A31 | The STP bottleneck is DATA QUALITY, not the convention system | ⚠️ Based on research | Handlers spend ~30% of time on data extraction/reconciliation |
| A32 | ~50% of EAS are still paper forms filled by stressed people | ⚠️ Needs validation | Poor data quality at origin prevents STP |
| A33 | Claims handlers spend ~30% on data extraction, ~25% on exception handling, ~20% on damage assessment | ⚠️ Based on research | This is where automation value lives |
| A34 | Home insurance has no EAS equivalent — no standardized joint document | ✅ Validated | Fundamental structural difference from motor |
| A35 | Home claims almost always require adjuster inspection (~100% for non-trivial) | ⚠️ Based on research | Unlike motor where ~10% achieve STP |
| A36 | Wind & hail = 42.5%, water damage = 29.4% of home claims (US 2019-2023) | ✅ Based on III data | Wind/hail most common, water second |
| A37 | Desk adjusters handle small claims (<$3K) with simple causation | ⚠️ Based on research | Threshold varies by insurer |
| A38 | Field adjusters spend ~25-30% of time on travel | ⚠️ Estimate | Primary target for virtual inspection |
| A39 | Xactimate is used by 75-80% of property adjusters | ✅ Based on research | Industry standard estimating software |
| A40 | TPAs employ ~25-35% of property adjusters (Crawford, Sedgwick, Engle Martin) | ⚠️ Estimate | Significant market segment |
| A41 | UK uses "loss adjuster" (insurer) / "loss assessor" (policyholder) terminology | ✅ Validated | US uses "claims adjuster" / "public adjuster" |
| A42 | Virtual claims processing reduces cycle time from 10-15 days to 2-3 days | ⚠️ Based on vendor claims | Needs validation with real data |
| A43 | AI accuracy for claims needs >95% but current models are ~70% | ⚠️ Based on research | Gap prevents full automation |
| A44 | AI-generated fraud (fake photos, receipts) is a growing threat to automated claims | ⚠️ Based on Gen Re 2026 report | Adversarial dynamic matters |
| A45 | Hidden damage (water behind walls) is common and invisible in photos | ✅ Logical | Limits pure photo-based assessment |
| A46 | When adjuster needs colleague help, handling time nearly TRIPLES | ⚠️ Based on Five Sigma data | Collaboration is major inefficiency |

---

## Key Strategic Insights (Running List)

1. **Europe produces structurally cleaner data at origin** than the US (EAS = single agreed document vs. competing narratives). This supports the Europe-first strategy beyond just the licensing advantage.

2. **Convention systems are "pre-computed liability"** — essentially lookup tables for fault. **In theory**, 60-70% of EU motor claims could be auto-resolved. **In reality**, only ~10% achieve true STP because the bottleneck is getting CLEAN DATA into the lookup, not the lookup itself. This is the real automation opportunity.

3. **The US system is incredibly labor-intensive even for simple claims** — up to 4 recorded statements for a fender bender. Different automation opportunity: extracting structured data from voice/text vs. processing structured forms.

4. **Health insurance claims are fundamentally different** — they're request-approval workflows, not event-response workflows. This reinforces the motor-first bet.

5. **The EAS is a brilliant concept with terrible execution** — a standardized, agreed-upon, structured document that's still 50% paper and filled out by stressed people with shaking hands. There's a clear digitization opportunity, but it may already be partially addressed by insurer apps.

6. **Broker-to-insurer submission is a data quality bottleneck** — Three paths (portal, email, phone), all with friction. Portal = manual rekeying. Email = double entry (broker types it, insurer re-keys). Phone = fast open but docs arrive separately. This is where data quality degrades and errors are introduced.

7. **The "data normalization layer" opportunity sits exactly at the broker-insurer handoff** — If Mysa can structure data BEFORE it hits the insurer's system (regardless of submission channel), you eliminate the rekeying problem for both parties. This is the wedge that works for both brokers AND insurers.

8. **EU and US FNOL are fundamentally different products** — EU FNOL = "here's my EAS, verify my policy" (verification). US FNOL = "let me tell you what happened" (data collection). Automation opportunities differ: EU = process EAS faster; US = extract structure from recorded statements.

9. **No ACORD equivalent in EU creates fragmentation AND opportunity** — Every EU insurer has different FNOL forms/fields. This is pain for brokers (adapt to each insurer) but opportunity for a data normalization layer that outputs to ANY format.

10. **EU triage question is "skip the adjuster?" vs US "which adjuster?"** — In EU, convention systems *could* enable straight-through processing for ~60-70% of claims, but only ~10% actually achieve STP due to data quality issues. The goal is to AVOID human investigation. In US, even simple claims get adjuster time. **The real opportunity is bridging the 50+ percentage point gap between theoretical and actual STP.**

11. **THE STP REALITY GAP IS THE PRODUCT OPPORTUNITY** — The gap between ~10% actual STP and ~60-70% theoretical potential represents a massive automation opportunity. The convention lookup is trivial (a database query). The bottleneck is data quality: messy handwriting, unclear diagrams, missing fields, poor photos, paper forms. **Whoever solves data quality upstream unlocks the 50+ percentage point STP gap.**

12. **Where handlers actually spend time points to where automation value lives:**
    - Data extraction & reconciliation: ~30% (reading forms, deciphering handwriting, matching to systems)
    - Exception handling: ~25% (missing info, unclear data, follow-up calls)
    - Damage assessment coordination: ~20% (scheduling inspections, reviewing estimates)
    - Validation & compliance: ~15% (coverage checks, fraud screening)
    - Policy lookup & payment: ~10% (mostly automated already)

    **The first 55% (data extraction + exception handling) is the prime automation target.**

### Home/Property Insurance Insights

13. **Home claims are structurally different from motor** — No counterparty, no EAS, no convention system. The question isn't "who's at fault?" but "was this peril covered?" Almost 100% of non-trivial home claims require adjuster inspection vs ~10% STP for motor.

14. **Unlike motor, EU has no structural advantage for home claims** — No EAS equivalent, no convention system, no fault tables. The claim is between policyholder and insurer about coverage interpretation. **The 3x productivity opportunity applies equally to EU and US.**

15. **Home adjuster productivity opportunity is different from motor** — For motor, the opportunity is "clean data upstream to unlock STP." For home, the opportunity is "make the adjuster 3x more productive" because you can't eliminate the adjuster for most claims.

16. **Field adjusters spend ~25-30% of time on TRAVEL** — This is the biggest single productivity lever. Virtual inspection for simple claims eliminates this entirely. For complex claims, pre-processing reduces what the adjuster needs to verify on-site.

17. **TPAs are a massive buyer segment for home claims** — Crawford, Sedgwick, Engle Martin employ 25-35% of property adjusters. They're essentially "adjusters as a service" — if you improve their unit economics, you have a direct value proposition.

18. **The "replace adjuster with AI" narrative is overhyped for home claims** — AI accuracy is ~70% but needs >95% for high-risk automation. Hidden damage (water behind walls) is invisible to photos. AI-generated fraud (fake photos, receipts) is a growing threat. **The realistic opportunity is augmentation, not replacement.**

19. **When an adjuster needs colleague help, handling time nearly TRIPLES** — Collaboration friction is a hidden productivity killer. Single source of truth + structured handoffs could recover significant time.

20. **The inventory/proof-of-loss problem is brutal and under-automated** — After a fire or burglary, policyholders must remember and prove everything they owned. This is a distinct pain point with potential for pre-loss documentation solutions.
