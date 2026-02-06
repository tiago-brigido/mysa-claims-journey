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
| F10 | Investigation Type | 7 - Investigation | Single adjuster or multi-adjuster scenario? | 4 |

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
| A67 | 77% of insurers have adopted AI in some form | ⚠️ BCG 2025 | High adoption but low scale |
| A68 | Only 7% of insurers have successfully scaled AI | ⚠️ BCG 2025 | 93% stuck in pilot purgatory |
| A69 | Only 4% have scaled GenAI specifically in claims | ⚠️ Bain/Risk & Insurance | Claims is behind other functions |
| A70 | 52% cite skills/resource constraints as primary barrier to AI scaling | ⚠️ BCG 2025 | Talent shortage is real |
| A71 | ~66% of insurers are still in AI pilot stage | ⚠️ BCG 2025 | Most haven't moved to production |
| A72 | Tractable has raised $185M at $1B+ valuation | ✅ Validated | Unicorn since 2021 |
| A73 | Shift Technology has raised $320M at $1B+ valuation | ✅ Validated | Unicorn since 2021 |
| A74 | Five Sigma is seed-stage, less funding than competitors | ⚠️ Based on Crunchbase | Earlier stage but attempting full workflow |
| A75 | Snapsheet has $162M raised, achieved profitability 2023 | ✅ Validated | 170+ customers, 15 of top 20 P&C |
| A76 | Sprout.ai has raised £5.4M, earlier stage | ⚠️ Based on 2023 data | MetLife partnership validates product |
| A77 | Davies Kuarterback uses per-claim pricing model | ⚠️ Based on website | Transactional not SaaS |
| A78 | Kuarterback handles 75-80% of claims automatically | ⚠️ Davies claims | 20-25% still need human input |
| A79 | Kuarterback saves ~25 min per claim that does need human | ⚠️ Davies claims | Significant efficiency gain |
| A80 | Davies sells technology externally, not just internal TPA use | ⚠️ Based on research | Dual model - TPA + tech licensing |
| A81 | Settlement workflow (62% of US time) has fewest dedicated solutions | ⚠️ Based on competitive analysis | Major white space |
| A82 | Tractable covers ~70% of claims automatically (rest need human) | ⚠️ Based on research | Photo quality dependent |
| A83 | Lemonade handles ~50% of claims via AI Jim | ⚠️ Based on company claims | 40% with zero human touch |
| A84 | EAS extraction for EU motor has no dedicated player | ⚠️ Based on competitive analysis | White space for Mysa |
| A85 | Pace raised $10M Series A from Sequoia (Jan 2026) | ✅ Validated | Prudential as customer |
| A86 | Pace targets $70B+ insurance BPO market replacement | ⚠️ Company positioning | Agentic AI vs offshore teams |
| A87 | ClaimSorted raised $13.3M seed (Atomico), $16.3M total | ✅ Validated | AI-native TPA model |
| A88 | ClaimSorted claims 3x faster cycle times than traditional TPAs | ⚠️ Company claims | Needs validation |
| A89 | ClaimSorted claims <1.2% leakage, <1% reopen rate | ⚠️ Company claims | Strong if true |
| A90 | Solva raised $6M (First Round, YC, Paul Graham angel) | ✅ Validated | Sweden-based |
| A91 | Solva reached $245K ARR 10 weeks after launch | ⚠️ Company claims | Fast early traction |
| A92 | Solva focuses on leakage prevention vs speed | ⚠️ Positioning | Different angle than most |
| A93 | Avallon raised $4.6M seed (Frontline, YC) | ✅ Validated | Multi-modal AI agents |
| A94 | Avallon claims 90% reduction in processing time | ⚠️ Company claims | Needs validation |
| A95 | Avallon targets 42,000 TPAs across US/Europe | ⚠️ Market sizing | Large addressable market |
| A96 | Back-office automation (Pace, Avallon) is emerging competitive space | ⚠️ Based on analysis | Multiple well-funded entrants |

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

### Competitive Landscape Insights

21. **93-96% of insurers are stuck in "pilot purgatory"** — 77% have adopted AI somewhere, but only 4-7% have scaled it. This is the market: insurers who've been trying for 3+ years and can't execute.

22. **The claims automation market is fragmented** — Tractable does photos, Shift does fraud, Sprout does docs, Hi Marley does comms. No one owns the workflow. Integration is the pain point.

23. **Settlement workflow (62% of US handling time) is the most underserved phase** — Most vendors focus on intake or assessment. The post-decision bureaucracy is wide open.

24. **EU motor is underserved** — Most competitors are US/UK focused. EAS extraction and convention matching have no dedicated player.

25. **Davies proves the dual model works** — TPA operations + technology licensing can coexist. Kuarterback gives Davies competitive advantage AND generates revenue from external insurers.

26. **TPAs without AI (Crawford, Sedgwick) need help** — Davies has Kuarterback. Other major TPAs don't have equivalent tools. Selling to TPAs is a viable path.

27. **Point solutions dominate but integration is the pain** — Insurers use Tractable + Shift + Sprout + Hi Marley + Snapsheet. Making them work together is the problem. Full workflow platforms (Five Sigma) are attempting this but are earlier stage.

28. **Insurers can't build because of skills (52%), data (40%), and regulatory (36%) barriers** — Not lack of will, lack of capability. The window for vendors is open.

---

## Strategic Wedge Analysis: Where Does Mysa Start?

### The Long-Term Vision

**"Who has the best data wins."** The market will commoditize and whoever has the best data will build the best models and win. This is the north star.

But "data" is not one thing. The strategic question is: **which data, from where, for what purpose?**

### The Two Paths

| | **Path A: More STP** | **Path B: Faster Investigation** |
|---|---|---|
| **Problem solved** | Poor data quality prevents claims from auto-processing | When humans ARE involved, they're slow and inefficient |
| **Target metric** | STP rate (from ~10% to 40%?) | Adjuster productivity, cycle time |
| **Where value created** | Upstream — better data capture at intake | Downstream — augment investigation workflow |
| **Product** | Document extraction, EAS digitization, structured intake, convention matching | Investigation workspace, statement analysis, report generation, collaboration tools |
| **Data accumulated** | EAS/FNOL structured data, intake patterns | Investigation data, adjuster notes, outcome patterns |
| **Buyer conversation** | "Process 40% of claims without human touch" | "Your adjusters handle 50% more claims" |

### Different Data Types = Different Moats

| Data Type | Where It Lives | What It Enables | Path |
|-----------|----------------|-----------------|------|
| **EAS/FNOL structured data** | Intake | Convention matching, STP | A |
| **Investigation data** | Adjuster notes, statements, photos | Liability determination, pattern recognition | B |
| **Claims outcome data** | Settlement amounts, cycle times | Predictive models, benchmarking | Both |
| **Repair/cost data** | Repair networks, Xactimate | Damage valuation | B |
| **Fraud pattern data** | SIU, cross-claim analysis | Fraud detection | Both |

**Key insight:** The data you accumulate from being an EAS extraction tool is VERY different from the data you accumulate from being an adjuster productivity tool. The wedge shapes the moat.

### The Moat Question

Data without lock-in is just a commodity. If Mysa builds great document extraction and an insurer can switch to another vendor next year, there's no moat. The data sits in the insurer's system, not Mysa's.

**The moat comes from one of two places:**

1. **Workflow lock-in:** Become so embedded in their process that switching is painful (like Salesforce or Workday). This requires being in the critical path, not a point solution.

2. **Network effects:** The more claims flow through Mysa, the better the models get, AND that improvement benefits all customers (like a shared fraud detection model or benchmarking data).

**Strategic question:** Which one is Mysa building toward? Does the current work (document processing) actually lead there?

### EU vs US: Different Wedges?

| Market | Primary Opportunity | Why |
|--------|---------------------|-----|
| **EU (Motor)** | Path A — unlock STP | EAS provides structured data at origin. Convention systems exist but are starved of clean data. The 50+ point gap between theoretical (~70%) and actual (~10%) STP is the prize. |
| **US (Motor)** | Path B — augment adjusters | No agreed document. Every claim requires investigation. 4 recorded statements for a fender bender. Labor-intensive even for simple claims. |
| **Home (Both)** | Path B — adjuster productivity | No EAS equivalent anywhere. No convention system. Almost 100% of claims need human inspection. The opportunity is 3x adjuster productivity, not STP. |

**Implication:** The wedge may differ by market. EU motor = upstream data quality. US motor and all home = downstream productivity. This affects go-to-market and product priorities.

### The Buyer Difference

| | Path A: More STP | Path B: Faster Investigation |
|---|---|---|
| **Primary buyer** | Claims Operations Director | Claims Ops Director or Adjuster Manager |
| **What they measure** | STP rate, cost per claim, processing time | Adjuster caseload, cycle time, productivity |
| **Budget source** | Ops efficiency / automation budget | Workforce productivity budget |
| **Competitor set** | omni:us, Tractable (photos), RPA vendors | Guidewire ecosystem, existing workflow tools |
| **Sales cycle** | Likely similar | Likely similar |

**Open question:** Is it the SAME buyer who cares equally about both? Or does choosing a path determine who you sell to?

### What the Wedge Decision Shapes

The first wedge isn't just "what to build first." It determines:

1. **First 5 customers** — Who you sell to, what problems you solve for them
2. **Brand positioning** — Are you "the STP company" or "the adjuster productivity company"?
3. **Data accumulated** — Which data moat you're building
4. **Next product** — What naturally follows from the wedge
5. **Competitive positioning** — Who you're compared against

### Research Still Needed

Before deciding on wedge:

| Question | Why It Matters |
|----------|----------------|
| What % of claims actually enter investigation (Phase 7+) in EU vs US? | Sizes the opportunity for each path |
| What does Phase 7 (Investigation) actually look like? What do adjusters DO? | Validates Path B opportunity |
| How much time/cost is spent in investigation vs intake? | Where is the bigger $ prize? |
| Who are the actual buyers at target insurers? Same person or different? | Determines if "both" is viable |
| What's the switching cost for document extraction tools? | Validates moat potential for Path A |

---

### 🔴 CRITICAL NEW INSIGHT: The 62.3% Finding

**Five Sigma research reveals where US claims handling time actually goes:**

| Stage | US | UK |
|-------|----|----|
| Claim creation (FNOL) | <25% | <25% |
| Damage assessment | 17.4% | 45.9% |
| **Assessment to payment** | **62.3%** | 45.0% |

**This is surprising.** The bottleneck in US claims is NOT the investigation or assessment itself — it's what happens AFTER assessment: negotiations, documentation, approvals, payment processing.

**What this means for the wedge decision:**

| If we focus on... | We're targeting... | % of time addressed |
|-------------------|-------------------|---------------------|
| **EAS extraction / FNOL** | Claim creation | <25% |
| **Investigation automation** | Some of assessment | ~17% |
| **Assessment-to-payment workflow** | Post-assessment process | **62%** |

**Strategic Question:** Is the biggest opportunity actually in the back-end (settlement workflow) rather than front-end (data extraction) or middle (investigation)?

### Path C: Settlement Workflow Optimization (New Option)

| | **Path C: Faster Settlement** |
|---|---|
| **Problem solved** | After investigation is done, claims still take weeks to settle |
| **Target metric** | Cycle time, settlement efficiency, payment speed |
| **Where value created** | Downstream — after liability/damage determined |
| **Product** | Settlement calculation, approval workflows, payment automation, document generation |
| **Data accumulated** | Settlement patterns, negotiation outcomes, cycle time benchmarks |
| **Buyer conversation** | "Cut your settlement cycle time by 50%" |

**This may explain why the EU vs US difference matters less than expected:**
- EU advantage is in FNOL/triage (EAS enables STP)
- But if 62% of US time is post-assessment, fixing FNOL doesn't touch the biggest bucket
- Settlement workflow opportunity may be similar across markets

### Updated Wedge Framework

| Wedge | Target Problem | % of Handling Time | EU Advantage? |
|-------|---------------|-------------------|---------------|
| **A: Data Quality (FNOL)** | Poor data prevents STP | <25% | YES (EAS) |
| **B: Investigation** | Slow liability/damage determination | ~17-45% | YES (EAS) |
| **C: Settlement** | Post-decision bureaucracy | ~45-62% | NO (similar both markets) |

**The "where to start" question now has three dimensions, not two.**

---

## The Build vs Buy Reality: Why Insurers Can't Execute

### The Strategic Tension

Insurers SHOULD want to build claims automation in-house. The logic is compelling:
- AI lowers the barrier to insourcing administrative functions
- Claims data is core to their business — why outsource?
- TPAs charge $100-1,500 per claim; automation should reduce that

**But they can't execute.** The data is stark:

| Metric | Value | Source |
|--------|-------|--------|
| Insurers with ANY AI adoption | 77% | BCG 2025 |
| Insurers with AI **at scale** | **Only 7%** | BCG 2025 |
| Insurers with GenAI scaled **in claims** | **Only 4%** | Bain via Risk & Insurance |
| Still in pilot stage | ~66% | BCG 2025 |
| Full AI adoption jump YoY | 8% → 34% | BCG 2025 |

**The implementation gap:** 77% have adopted AI in some form, but only 4-7% have scaled it. That's **93-96% of insurers stuck in pilot purgatory.**

### Why Insurers Can't Scale

The barriers are real and structural:

| Barrier | % Citing | Details |
|---------|----------|---------|
| **Skills/resource constraints** | 52% | Lack of in-house ML/AI talent |
| **Data challenges** | 40% | Data quality, accessibility, integration |
| **Regulatory hurdles** | 36% | Compliance uncertainty, audit requirements |
| **Security/privacy risks** | High | Claims data is sensitive, AI raises concerns |
| **Accuracy concerns** | High | Need >95% accuracy for high-stakes decisions |
| **Legacy systems** | High | 30-year-old claims platforms, hard to integrate |
| **Change management** | Critical | Cultural resistance, governance gaps |

### The "Pilot Purgatory" Problem

Insurers run 15 AI pilots, none reach production. The pattern:

```
Year 1: "Let's pilot AI for claims"
     ↓
Run 3-5 pilots with different vendors
     ↓
Each pilot works in isolation
     ↓
No clear path to production
     ↓
Year 2: "Let's try new pilots"
     ↓
Repeat indefinitely
```

**Why this happens:**
- No unified data strategy
- Different teams running different pilots
- IT can't support production deployment
- Success criteria unclear
- Vendor lock-in fears prevent commitment

### What Scaled Implementation Actually Requires

Those who've succeeded (the 4-7%) did this:

1. **Full workflow redesign** — Not point solutions, entire claims process rebuilt around AI
2. **Executive sponsorship** — C-level commitment, not mid-manager experiments
3. **Data foundation** — Structured, accessible, quality data (most don't have this)
4. **Change management** — Training, incentives, culture shift for claims handlers
5. **Compliance framework** — Audit trails, explainability, regulatory buy-in

**Result for those who do it:** 35% productivity boost, 50% reduction in cycle time, claims processed in 24-48 hours vs 7-10 days.

### Strategic Implication for Mysa

The window is open but closing. The opportunity:

| Play | Target | Value Prop |
|------|--------|------------|
| **Sell to insurers** | The 93% who can't scale | "We do what you've been trying to do for 3 years" |
| **Sell to TPAs** | Crawford, Sedgwick (who don't have Kuarterback) | "Compete with Davies on unit economics" |
| **Compete with TPAs** | Insurers wanting to insource | "Like a TPA but you keep control" |

**The question:** Does Mysa want to be:
- A **vendor** (sell tech to insurers/TPAs)
- A **TPA** (own the claims, use AI as competitive advantage like Davies)
- A **tech-enabled wedge** (start with one piece, expand)

### Kuarterback Case Study: Davies' Dual Strategy

Davies runs **two parallel businesses**:
1. **TPA services** — Uses Kuarterback internally for competitive advantage
2. **Technology licensing** — Sells Kuarterback to insurers directly

Key details:
- **Per-claim pricing** — Not SaaS subscription, transactional model
- **UK motor focus** — Specifically MOJ/non-MOJ claims
- **Rapid deployment** — "Up and working in a week"
- **Handles 75-80% automatically** — 20-25% still need human input
- **25 min saved per claim** — On the claims that DO need humans

**The dual strategy works because:**
- TPAs use AI → lower cost per claim → competitive pricing → more volume
- Sell tech to insurers → additional revenue stream → validates the product

**The question for Mysa:** Follow the Davies model? Or pick one lane?

---

## Competitive Landscape

### Overview: The Fragmented Market

The claims automation market is fragmented. No single vendor owns the full workflow. Each player has carved out a piece:

| Phase | Key Players | What They Do |
|-------|-------------|--------------|
| **FNOL / Intake** | Sprout.ai, Hi Marley, Snapsheet | Document processing, customer comms |
| **Damage Assessment** | Tractable, Claim Genius | Photo-based damage estimation |
| **Fraud Detection** | Shift Technology | Pattern detection, claim scoring |
| **Claims Management** | Five Sigma, Snapsheet, Guidewire | End-to-end workflow platform |
| **Settlement** | Limited vendors | Most underserved phase |
| **TPA + Tech** | Davies (Kuarterback) | Integrated services + technology |

**Key insight:** The "assessment to payment" phase (62% of US handling time) has the FEWEST dedicated solutions. Most vendors focus on intake or investigation.

---

### Competitor Deep Dives

---

### 1. Tractable

**What they do:** AI-powered vehicle damage assessment from photos

**Funding:** $185M total raised, $1B+ valuation (unicorn since 2021)

**Customers:** 20+ of top 100 global insurers including GEICO, Tokio Marine, Admiral, Aviva, Covéa, Ageas

**How it works:**
```
Customer uploads damage photos
     ↓
Tractable AI analyzes images (pixel-level)
     ↓
AI generates damage assessment + repair estimate
     ↓
"Certainty score" indicates confidence level
     ↓
Low certainty → route to human
High certainty → auto-process
```

**Part of the flow:**

```
[FNOL] → [Triage] → [TRACTABLE: Damage Assessment] → [Decision] → [Settlement]
                              ↑
                     Phase 8 — Assessment
```

**What they do well:**
- Computer vision accuracy — "pixel-level" damage detection
- Speed — estimates generated in seconds vs days
- Scale — processed billions of claims
- Customer list — major insurers already integrated
- Auto + Property — expanded beyond just motor

**Gaps / Limitations:**
- **Photos only** — Can't process documents, statements, or EAS
- **Assessment only** — Doesn't touch FNOL, investigation, or settlement
- **Dependent on photo quality** — Poor photos = low certainty = human needed
- **No liability determination** — Only tells you WHAT damage exists, not WHO caused it
- **No end-to-end workflow** — Point solution, requires integration
- **Post-assessment untouched** — The 62% of US time after assessment isn't addressed

**Strategic position:** Best-in-class for visual damage assessment, but just one piece of the puzzle.

---

### 2. Sprout.ai

**What they do:** AI-powered document extraction and claims automation

**Funding:** £5.4M raised (October 2023), earlier-stage than competitors

**Customers:** MetLife (global partnership), AXA, AdvanceCare (Generali), Scottish Widows

**How it works:**
```
Claims documents arrive (reports, invoices, notes, photos)
     ↓
Sprout.ai extracts + structures unstructured data
     ↓
AI validates against policy terms
     ↓
Fraud patterns detected in real-time
     ↓
Simple claims → auto-decision
Complex claims → handler with AI context
```

**Part of the flow:**

```
[SPROUT: FNOL + Document Processing] → [Triage] → [Investigation] → [Decision]
              ↑                              ↑
        Phases 5-6                     Fraud Detection
```

**What they do well:**
- **Document extraction** — Handles messy inputs (handwritten, PDFs, photos)
- **Policy validation** — Automatically checks coverage
- **Fraud detection** — Real-time pattern recognition
- **Multi-LOB** — Health, life, motor, home, commercial
- **MetLife partnership** — Tier 1 validation, global scale
- **Speed claims** — Claims reduced from days to seconds

**Gaps / Limitations:**
- **Earlier stage** — Less capital than Tractable/Shift
- **Less visual assessment** — Not photo-based damage estimation
- **Limited settlement workflow** — Focuses on intake/triage, not post-decision
- **Integration complexity** — "Seamless integration" claimed but legacy systems vary
- **Accuracy rates not published** — Unlike Tractable, no public metrics

**Strategic position:** Strong on document processing and intake automation, potentially overlaps with Mysa's EAS extraction opportunity.

---

### 3. Shift Technology

**What they do:** AI-powered fraud detection and claims decision support

**Funding:** $320M total raised, $1B+ valuation (unicorn since 2021)

**Customers:** 6 of top 10 US P&C insurers, 5 of top 10 global insurers, 115+ total across 25 countries

**How it works:**
```
Claim enters system
     ↓
Shift analyzes claim against patterns
├── Cross-claim analysis
├── Historical fraud patterns
├── Document forensics
├── Behavioral indicators
     ↓
Risk score assigned
     ↓
High risk → SIU queue
Normal → continue processing
```

**Part of the flow:**

```
[FNOL] → [SHIFT: Fraud Detection] → [Triage] → [Investigation] → [Decision]
              ↑                           ↑               ↑
         Every claim              Throughout process  Subrogation
```

**What they do well:**
- **Fraud detection accuracy** — 3x higher detection rates than manual/rules
- **Explainability** — 100% explainable decisions (regulatory compliance)
- **Scale** — Analyzed billions of claims
- **Breadth** — Underwriting fraud, claims fraud, subrogation, AML/KYC
- **Deep insurance expertise** — 200+ data scientists, insurance-native
- **Enterprise customers** — Largest insurers globally

**Gaps / Limitations:**
- **Fraud-focused** — Doesn't process claims, just scores them
- **No damage assessment** — Different from Tractable
- **No document extraction** — Different from Sprout.ai
- **Requires existing workflow** — Adds to claims systems, doesn't replace them
- **SIU-heavy positioning** — Primary users are fraud teams, not claims handlers

**Strategic position:** Best-in-class fraud detection, but complementary to claims automation, not a replacement.

---

### 4. Five Sigma (Clive)

**What they do:** AI-native claims management platform with multi-agent AI

**Funding:** Seed stage (founded 2017)

**Customers:** INSHUR, Upland Capital Group, Resorts World Las Vegas, various TPAs/MGAs

**How it works:**
```
CLIVE = Suite of AI agents for different tasks

Agent: Intake & Triage
├── FNOL processing
├── Severity assessment

Agent: Coverage & Liability
├── Policy validation
├── Liability determination

Agent: Document Processing
├── Email handling
├── Attachment extraction

Agent: Fraud Detection
├── Risk scoring
├── Anomaly detection

Agent: Communications
├── Email drafting
├── Response generation

Agent: Compliance
├── Quality audits
├── Regulation adherence
```

**Part of the flow:**

```
[FIVE SIGMA: Full Claims Workflow]
FNOL → Triage → Investigation → Assessment → Decision → Settlement → Close
  ↑        ↑          ↑              ↑           ↑           ↑         ↑
Clive agents operate across entire journey
```

**What they do well:**
- **Full workflow** — Only vendor covering entire claims journey
- **Modular** — Pick which AI agents to deploy
- **Works on existing CMS** — Overlays Guidewire, Duck Creek, etc.
- **Multi-agent architecture** — Modern AI approach
- **TPA-friendly** — Explicitly targets TPAs and MGAs
- **35% cost reduction** — Customer-reported results

**Gaps / Limitations:**
- **Earlier stage** — Less funding, fewer enterprise customers
- **Less specialized** — Jack of all trades vs best-in-class at one thing
- **Unclear accuracy** — "Abilities depend on agent mix" — no published metrics
- **Integration complexity** — "Different integrations required" per module
- **Competitive with Mysa** — If Mysa goes full-workflow, Five Sigma is direct competitor

**Strategic position:** Most direct competitor to a full-workflow Mysa. Watch closely.

---

### 5. Snapsheet

**What they do:** Digital claims management and virtual appraisal platform

**Funding:** $162M total raised, achieved profitability in 2023

**Customers:** 170+ including 15 of top 20 US P&C carriers

**How it works:**
```
FNOL submitted digitally
     ↓
Photos/videos uploaded by customer
     ↓
Virtual appraisal (desk adjuster reviews)
     ↓
OR AI-assisted damage assessment
     ↓
Estimate generated
     ↓
Repair shop integration (if applicable)
     ↓
Payment processed
```

**Part of the flow:**

```
[SNAPSHEET: Intake through Settlement]
FNOL → [Virtual Appraisal] → [Estimation] → [Repair Network] → [Payment]
                ↑                   ↑
          Photo-based         AI-assisted
```

**What they do well:**
- **Market penetration** — 15 of top 20 US P&C carriers
- **Profitable** — Rare for insurtech
- **Volume** — 4.3M claims, $15.3B indemnity processed (2023)
- **Total loss specialty** — Launched Snapsheet Total (2024)
- **Virtual claims** — Pioneered desk adjuster / photo-based model
- **Repair network integration** — Connected to body shops

**Gaps / Limitations:**
- **US-focused** — Less EU presence
- **Less AI-native** — Started as virtual appraisal, adding AI later
- **Motor-heavy** — Property is newer
- **No fraud specialty** — Unlike Shift
- **No document extraction** — Unlike Sprout.ai

**Strategic position:** Incumbent with scale and profitability. More workflow platform than AI-native.

---

### 6. Lemonade (AI Jim)

**What they do:** AI-native direct insurer (not vendor — they ARE the insurer)

**Funding:** Public company (NYSE: LMND), $480M+ raised pre-IPO

**Customers:** N/A — they are B2C, direct to consumers

**How it works:**
```
Customer records video explaining claim
     ↓
AI Jim analyzes video (NLP + ML)
├── Reads claim nature and severity
├── Runs fraud detection algorithms
├── Checks policy conditions
     ↓
Simple claim → Auto-approve + pay (2 seconds)
Complex claim → Route to human
```

**Part of the flow (internal):**

```
[LEMONADE: Full stack — they own everything]
Customer → AI Jim → [Auto-decision or Human] → Payment
            ↑
     Handles ~50% of claims
     40% with ZERO human touch
```

**What they do well:**
- **Speed** — World record: 2-second claim settlement
- **Customer experience** — Video FNOL, instant decisions
- **Full stack** — Own the entire workflow end-to-end
- **Data advantage** — All their claims, all their data, continuous learning
- **Fraud detection** — AI analyzes video for deception indicators
- **Cost reduction** — 30% reduction in claims processing costs

**Gaps / Limitations:**
- **They are an insurer, not a vendor** — Can't buy AI Jim
- **Limited LOBs** — Renters, home, pet, term life — no commercial
- **Controversial accuracy** — CNN investigation questioned AI claims
- **B2C only** — No enterprise/broker channels
- **Not a model for Mysa** — Unless Mysa becomes an insurer

**Strategic position:** Proves what's possible with AI-native claims. Not a competitor, but a benchmark.

---

### 7. Davies / Kuarterback

**What they do:** TPA + Technology — both operate claims AND sell the software

**Funding:** Private equity backed (BC Partners), major acquisitions ongoing

**Customers:** UK insurers (TPA clients), plus technology licensing to external insurers

**How it works:**
```
Stage 2 pack received (UK motor MOJ claims)
     ↓
Kuarterback reads documents
├── Medical reports
├── Physio invoices
├── All stage 2 docs
     ↓
Content converted to structured data fields
     ↓
Auto-matched against valuation rules/matrices
     ↓
Claim value generated in <1 minute
     ↓
75-80% handled automatically
20-25% → human handler (saves 25 min)
```

**Part of the flow:**

```
[KUARTERBACK: Assessment + Valuation]
FNOL → Triage → Investigation → [KUARTERBACK: Assessment] → Decision → Settlement
                                          ↑
                                   UK motor specific
                                   MOJ/non-MOJ claims
```

**What they do well:**
- **Dual model** — Competitive advantage as TPA + revenue from licensing
- **UK motor deep** — Very specialized, very good at one thing
- **Speed** — <1 minute valuations
- **Cost model** — Per-claim pricing, instant ROI
- **Rapid deployment** — "Up and working in a week"
- **TPAs can use too** — ClaimPilot acquisition targets TPA market

**Gaps / Limitations:**
- **UK motor only** — Not property, not US, not EU continental
- **MOJ-specific** — Very narrow use case
- **Assessment only** — Doesn't touch FNOL or earlier phases
- **Not open** — Unclear if available to all or select relationships
- **Requires structured input** — Stage 2 packs, not messy EAS

**Strategic position:** Proves the TPA + tech dual model works. Direct inspiration for Mysa strategy.

---

### 8. Hi Marley

**What they do:** AI-powered conversational platform for claims communication

**Funding:** $65M+ raised

**Customers:** Major P&C carriers

**How it works:**
```
Claim filed
     ↓
Customer receives SMS from insurer (via Hi Marley)
     ↓
Two-way conversation
├── Status updates
├── Document requests
├── Photo submission
├── Appointment scheduling
     ↓
AI automates follow-ups
     ↓
Handler gets unified communication thread
```

**Part of the flow:**

```
[HI MARLEY: Communication layer throughout]
FNOL ←→ [HI MARLEY] ←→ Investigation ←→ [HI MARLEY] ←→ Settlement
              ↑                                ↑
      Customer communication          Handler communication
```

**What they do well:**
- **Customer experience** — SMS preferred over phone/email
- **Engagement** — Real-time, conversational
- **Automation** — Reduces handler communication burden
- **Integration** — Works alongside existing claims systems
- **Simple value prop** — Easy to understand, easy to buy

**Gaps / Limitations:**
- **Communication only** — Doesn't process claims, assess damage, or detect fraud
- **Thin wedge** — Feature, not platform
- **Commoditizable** — Any CMS could add SMS capability
- **No differentiation in claims logic** — Just the messaging layer

**Strategic position:** Nice-to-have, not must-have. Could be feature of broader platform.

---

### 9. Pace (withpace.com)

**What they do:** AI-native BPO replacement — agentic AI for insurance back-office operations

**Funding:** $10M Series A (Sequoia Capital, Jan 2026)

**Customers:** Prudential Financial (ILI business), The Mutual Group, Newfront

**How it works:**
```
Insurance documents arrive (emails, PDFs, submissions)
     ↓
Pace AI agents read and extract data
     ↓
Agents navigate internal apps (web automation)
     ↓
Apply business rules specific to insurer
     ↓
Take actions via web or APIs
     ↓
Human review for exceptions
     ↓
Output: Completed tasks (data entry, file prep, QA)
```

**Part of the flow — What they do at each phase:**

| Phase | Pace Activity |
|-------|--------------|
| **FNOL / Intake** | Read incoming emails, extract claim data from documents, populate claims systems |
| **Submission Processing** | Process broker submissions, intake data, route to appropriate queues |
| **Data Entry** | Auto-populate fields across multiple systems, eliminate manual rekeying |
| **Policy Servicing** | Handle endorsements, audits, renewals (Prudential use case) |
| **Claims File Prep** | Prepare full claims files, attach documents, ensure completeness |
| **Quality Assurance** | Check adjusting guidelines, flag exceptions, ensure compliance |

```
[PACE: Back-office automation layer]
Submission → [PACE: Intake] → FNOL → [PACE: Data Entry] → Triage → Investigation → [PACE: File Prep]
                   ↑                         ↑                                            ↑
           Document processing        System population                           QA & compliance
```

**What they do well:**
- **BPO replacement** — Directly targets $70B+ insurance BPO market
- **Agentic AI** — Agents navigate apps, make calls, reason across documents
- **Hybrid model** — AI + human review for quality control
- **Fast deployment** — "Thousands of hours of work" live at Prudential
- **Blue-chip customer** — Prudential validates enterprise readiness
- **Sequoia backing** — Top-tier VC signals quality

**Gaps / Limitations:**
- **Back-office focus** — Not claims decision-making, damage assessment, or settlement
- **Data entry heavy** — Doesn't replace adjusters, just administrative tasks
- **No fraud detection** — Different from Shift Technology
- **No damage assessment** — Different from Tractable
- **New entrant** — Founded 2024, early revenue stage

**Strategic position:** Competing with BPOs (Genpact, WNS, Cognizant) not insurtech. Different angle than claims automation — more "replace the offshore team" than "automate the adjuster."

---

### 10. ClaimSorted

**What they do:** AI-native TPA — full claims handling with embedded AI

**Funding:** $13.3M Seed (Atomico, Eurazeo, Y Combinator), $16.3M total

**Customers:** Insurers and MGAs (names not disclosed), Y Combinator S24

**How it works:**
```
Insurer outsources claims to ClaimSorted
     ↓
ClaimSorted handles FULL claims lifecycle
├── White-label FNOL portal (eNOL)
├── White-label Claims Portal for policyholders
├── AI triage and routing
├── Automated fraud detection (pattern matching, document tampering)
├── Claims handlers for complex cases
├── Payment processing
     ↓
Output: Settled claims, data fed back to underwriting
```

**Part of the flow — What they do at each phase:**

| Phase | ClaimSorted Activity |
|-------|---------------------|
| **FNOL** | White-label eNOL (electronic Notice of Loss), intake via portal/email/phone |
| **Triage** | AI auto-triage, complexity scoring, route to auto-process or handler |
| **Investigation** | Handler investigation for complex claims, AI-assisted document review |
| **Fraud Detection** | Proprietary algorithms flag tampering, unusual patterns, excessive costs |
| **Assessment** | Damage validation, coverage checks, liability determination |
| **Decision** | Auto-decision for simple claims, handler decision for complex |
| **Settlement** | Payment processing, payout in minutes for approved claims |
| **Recoveries** | Subrogation identification, recovery opportunities flagged |

```
[CLAIMSORTED: Full TPA — End-to-End]
FNOL → Triage → Investigation → Assessment → Decision → Settlement → Close
  ↑        ↑           ↑             ↑           ↑          ↑          ↑
eNOL   AI triage   Handlers    Fraud check   Auto/human  Payout    Recoveries
```

**What they do well:**
- **Full TPA model** — Not a point solution, handles everything
- **Speed** — 3x faster cycle times than traditional TPAs
- **Quality** — <1.2% leakage, <1% reopen rate
- **Multi-LOB** — Property, Auto, Liability, A&H, Travel, Warranty
- **White-label** — Insurer brand preserved
- **Data feedback loop** — Insights back to underwriting

**Gaps / Limitations:**
- **TPA model requires trust** — Insurer gives up control of claims
- **Early stage** — Seed funding, building customer base
- **UK/EU focus** — Less US presence currently
- **Competes with Davies** — Similar TPA + tech model
- **Generalist** — Not specialized in one LOB like Kuarterback (UK motor)

**Strategic position:** Direct competitor to Davies model. AI-native TPA for insurers who want to outsource but get better tech than legacy TPAs. Watch closely — same strategic territory Mysa might enter.

---

### 11. Solva

**What they do:** AI claims co-pilot — overlays existing CMS to detect leakage, fraud, and automate triage

**Funding:** $6M (First Round, Y Combinator, SV Angel, Paul Graham as angel)

**Customers:** Carriers and MGAs (early stage, names not disclosed), Sweden-based

**How it works:**
```
Claim enters insurer's existing CMS
     ↓
Solva AI runs on top (no system replacement)
     ↓
AI agents analyze claim
├── Auto-triage FNOL
├── Extract policy violations
├── Flag missing information
├── Detect fraud patterns
├── Identify coverage breaches
├── Find recovery opportunities
     ↓
Output: Recommendations with full audit trail
     ↓
Handler acts on AI recommendations
```

**Part of the flow — What they do at each phase:**

| Phase | Solva Activity |
|-------|---------------|
| **FNOL** | Auto-triage incoming claims, flag incomplete submissions, route appropriately |
| **Triage** | Severity scoring, complexity assessment, priority queue assignment |
| **Investigation** | Detect policy violations, identify coverage breaches, flag negligence/misconduct |
| **Fraud Detection** | Pattern recognition, document validation, recurring loss driver identification |
| **Assessment** | Validate claim against policy terms, identify leakage risks |
| **Decision Support** | Source-cited recommendations, full audit trail, explainable AI |
| **Recoveries** | Subrogation opportunity identification, recovery flags |

```
[SOLVA: AI overlay on existing CMS]
         ┌─────────────────────────────────────────────────────────────┐
         │                    SOLVA AI LAYER                           │
         │  Triage → Fraud → Leakage → Coverage → Recommendations      │
         └─────────────────────────────────────────────────────────────┘
                                    ↓
[Existing CMS: FNOL → Triage → Investigation → Assessment → Decision → Settlement]
```

**What they do well:**
- **No rip-and-replace** — Works on top of existing systems
- **Leakage focus** — Stops wrongful payouts (different angle than speed)
- **Audit trail** — Source-cited answers, full explainability (regulatory friendly)
- **Security certified** — ISO 27001, ISO 42001, SOC 2 Type 2, GDPR
- **Paul Graham backed** — Strong signal from YC founder personally investing
- **Fast traction** — $245K ARR just 10 weeks after launch

**Gaps / Limitations:**
- **Overlay only** — Doesn't process claims, just advises handlers
- **Decision support, not decision making** — Human still decides
- **Very early** — Founded 2025, just launched
- **Swedish base** — May face go-to-market challenges in US
- **No damage assessment** — Different from Tractable
- **No communication** — Different from Hi Marley

**Strategic position:** Complementary to claims systems rather than replacement. "AI second opinion" on every claim. Could be acquired by CMS vendors (Guidewire, Duck Creek) or compete with them.

---

### 12. Avallon

**What they do:** AI agents for claims back-office — calls, documents, data entry

**Funding:** $4.6M Seed (Frontline Ventures, Y Combinator)

**Customers:** Athens Administrators (CA-based TPA), nationwide partner with 400+ adjusters

**How it works:**
```
Claims operations task arrives
├── Phone call (intake, status, billing)
├── Email (inquiry, document request)
├── Document (PDF, invoice, medical report)
     ↓
Avallon AI agent handles task
├── Voice AI for calls (gathers info, updates parties)
├── Email AI for written communication
├── Document AI for extraction and summarization
     ↓
Structured data output
     ↓
Auto-populates claims management system
     ↓
Adjuster gets clean, organized information
```

**Part of the flow — What they do at each phase:**

| Phase | Avallon Activity |
|-------|-----------------|
| **FNOL / Intake** | Answer intake calls, gather claim information, extract from documents |
| **Communication** | Handle status calls, billing questions, eliminate phone tag, keep parties updated |
| **Coordination** | Contact employers, providers, repair shops, injured workers |
| **Document Processing** | Summarize medical reports, extract from PDFs/invoices, validate coverage |
| **Data Entry** | Convert unstructured data to structured, populate CMS, eliminate manual entry |
| **Throughout** | Generate operational insights, identify bottlenecks |

```
[AVALLON: Multi-modal back-office automation]
     ┌──────────────────────────────────────────────────────────┐
     │  CALLS ─────► AVALLON ◄───── EMAILS ◄───── DOCUMENTS    │
     │                  │                                       │
     │          Structured Data                                 │
     │                  ↓                                       │
     │         Claims Management System                         │
     └──────────────────────────────────────────────────────────┘
                              ↓
[Adjuster focuses on: Investigation → Assessment → Decision]
```

**What they do well:**
- **Multi-modal** — Same AI handles calls, emails, and documents
- **Voice AI** — Actually makes and receives phone calls (rare capability)
- **TPA-focused** — Explicitly targets the 42,000 TPAs in US/Europe
- **Speed** — 90% reduction in processing time claimed
- **Integration** — Works with existing CMS, IVR, data warehouses
- **Workers' comp expertise** — Strong in this complex LOB

**Gaps / Limitations:**
- **Back-office only** — Doesn't make claims decisions
- **Early stage** — $4.6M seed, building customer base
- **No damage assessment** — Different from Tractable
- **No fraud detection** — Different from Shift
- **Operational, not strategic** — Efficiency tool, not transformation tool

**Strategic position:** Similar territory to Pace but more TPA-focused. "Replace the back-office team" for adjusters. Could be powerful when combined with decision-making AI.

---

---

### 13. omni:us

**What they do:** EAS extraction + claims automation — the most direct competitor for EU motor STP

**Funding:** $52.7M total (Anthemis, Baloise, Talis Capital, EU Horizon 2020)

**Customers:** EU insurers (names not disclosed), Google Cloud partner

**How it works:**
```
Paper/scanned EAS arrives
     ↓
omni:us AI processes document
├── Computer vision (CNNs) aligns to template
├── Handwriting recognition (in-house model)
├── NLP extracts text + context
├── ~100 fields digitized
     ↓
Structured data output
     ↓
Convention matching
     ↓
STP decision or handler routing
```

**Part of the flow — What they do at each phase:**

| Phase | omni:us Activity |
|-------|-----------------|
| **Documentation** | NOT at scene — processes documents AFTER they arrive |
| **FNOL** | Extract data from EAS, structure for processing |
| **Triage** | Convention matching, STP routing, complexity scoring |
| **Investigation** | Minimal — focused on STP path |
| **Assessment** | Damage data extraction from reports |
| **Decision** | STP automation for clean claims |
| **Close** | Subrogation detection (Express Subrogation product) |

```
[OMNI:US: EAS Extraction + STP Automation]
[Paper EAS] → [OMNI:US: Extraction] → [Convention Match] → [STP Decision]
                      ↑                        ↑                 ↑
              Handwriting OCR          Fault tables       Auto-process
```

**What they do well:**
- **EAS-specific** — Built specifically for European Accident Statement
- **Handwriting recognition** — In-house model for messy crisis handwriting
- **Convention matching** — Connects extraction to fault tables
- **Well-funded** — $52.7M, EU grants, established since 2018
- **Subrogation** — Also detects recovery opportunities
- **Multi-LOB** — Motor, property, liability

**Gaps / Limitations:**
- **EU-focused** — Less relevant for US market
- **STP still at ~10%** — Despite omni:us existing, adoption/integration barriers remain
- **Not full workflow** — Focuses on intake/STP, less on investigation or settlement
- **Integration complexity** — Still needs to connect to each insurer's legacy CMS
- **Doesn't fix capture** — Extracts from messy EAS, doesn't prevent messy EAS

**Strategic position:** The most direct competitor for EU motor STP opportunity. If Mysa goes after EAS extraction, omni:us is the incumbent with 7+ years head start and $52M. Mysa would need differentiation (better integration? settlement workflow? different wedge?).

---

### Why Is STP Still Only ~10% If omni:us Exists?

This is a critical strategic question. omni:us has been working on EAS extraction since 2018 with $52.7M in funding. Yet STP remains at ~10% vs 60-70% theoretical. Why?

| Barrier | Explanation |
|---------|-------------|
| **Enterprise adoption lag** | 12-24 month sales cycles. Insurers are slow to adopt new tech. |
| **Integration complexity** | Each insurer has different CMS (Guidewire, Duck Creek, legacy). Integration takes months per customer. |
| **Not just extraction** | Clean data is step 1. But STP requires: convention matching → reserve setting → payment triggers → exception handling → audit trail. Full pipeline needed. |
| **Change management** | Claims handlers resist automation. Culture and job security concerns. |
| **Edge case volume** | 30-40% of claims can't be STP (disputed, BI, unclear). These dominate handler time and attention. |
| **omni:us isn't everywhere** | One vendor, primarily EU, not universal adoption. |

**Implication for Mysa:** The opportunity may NOT be "do what omni:us does" — they have 7-year head start. The opportunity may be:
1. **Full STP pipeline** — Not just extraction, but the complete automation stack
2. **Better integration** — Universal connector to any CMS
3. **Settlement workflow** — The 62% of time AFTER extraction that omni:us doesn't touch
4. **Different geography** — US market has different problems entirely

---

### Competitive Landscape Summary

| Vendor | Primary Strength | Flow Phase | Funding | Key Gap |
|--------|-----------------|------------|---------|---------|
| **Tractable** | Photo damage assessment | Assessment | $185M | No documents, no workflow |
| **Sprout.ai** | Document extraction | FNOL/Triage | £5.4M | Less visual, earlier stage |
| **Shift Technology** | Fraud detection | Throughout | $320M | Detection only, no processing |
| **Five Sigma** | Full workflow AI | End-to-end | Seed | Earlier stage, less specialized |
| **Snapsheet** | Virtual appraisal + platform | FNOL-Settlement | $162M | Less AI-native |
| **Davies/Kuarterback** | UK motor assessment + TPA | Assessment | PE-backed | UK only, narrow use case |
| **Hi Marley** | Communication | Throughout | $65M | Communication only |
| **Lemonade** | Full stack insurer | End-to-end | Public | Not a vendor, B2C only |
| **Pace** | BPO replacement (agentic AI) | Intake/Data Entry/QA | $10M | Back-office only, no decisions |
| **ClaimSorted** | AI-native TPA | End-to-end | $16.3M | Early stage, competes with Davies |
| **Solva** | Leakage/fraud overlay | Triage-Decision | $6M | Overlay only, no processing |
| **Avallon** | Multi-modal back-office | Intake/Comms/Docs | $4.6M | Back-office only, early stage |
| **omni:us** | EAS extraction + STP | FNOL/Triage/Decision | $52.7M | EU only, STP still low, integration hard |

### White Space Analysis: Where Are the Gaps?

| Gap | Description | Current Players | Opportunity |
|-----|-------------|-----------------|-------------|
| **EAS extraction (EU)** | Digitize paper EAS, structure for convention matching | Sprout.ai (generic), nobody specific | **HIGH** — Direct path to STP unlock |
| **Settlement workflow** | Post-assessment bureaucracy (62% of US time) | Almost nobody (ClaimSorted touches it as TPA) | **VERY HIGH** — Underserved, high time % |
| **Cross-phase orchestration** | Connect FNOL → Assessment → Settlement | Five Sigma, ClaimSorted attempting | **MEDIUM** — Harder to sell, bigger build |
| **TPA productivity** | AI for Crawford/Sedgwick (non-Davies TPAs) | Davies has Kuarterback, Avallon targeting TPAs | **HIGH** — Large market, proven need |
| **EU continental motor** | CIMPAS/IRSA integration, convention matching | Nobody focused | **HIGH** — Structural advantage (EAS) |
| **Multi-adjuster handoffs** | Reduce 3x time penalty for collaboration | Nobody focused | **MEDIUM** — Workflow improvement |
| **Back-office automation** | Replace BPO for data entry, comms, file prep | Pace, Avallon emerging | **MEDIUM** — Competitive, lower value per task |
| **Leakage prevention** | Detect wrongful payouts before they happen | Solva (new), Shift (fraud-focused) | **MEDIUM** — Requires claims data access |

### Implications for Mysa

1. **The market is fragmented** — No one owns the workflow. This is opportunity.

2. **Point solutions dominate** — Tractable does photos, Shift does fraud, Sprout does docs. Integration is the pain.

3. **Settlement is underserved** — 62% of US time, almost no dedicated solutions.

4. **EU is underserved** — Most competitors are US/UK focused. EU motor (EAS, conventions) is open.

5. **Full workflow is hard** — Five Sigma is trying, but earlier stage. Snapsheet has scale but less AI-native.

6. **Davies proves dual model** — TPA + tech licensing can coexist.

7. **TPAs need help** — Crawford, Sedgwick don't have Kuarterback. Selling to TPAs is viable path.

---

## STP Pipeline Analysis: Who Does Intake → Docs → Images → Decision Well?

### The Full STP Pipeline

To achieve true straight-through processing, you need the complete chain:

```
INTAKE → FNOL → DOC PROCESSING → IMAGE PROCESSING → DECISION → SETTLEMENT
   ↑        ↑          ↑               ↑               ↑           ↑
 Receive   Log      Extract        Assess          Approve      Pay
 claim    claim    from docs     from photos     coverage     claim
```

**The question:** Who covers this full pipeline for Motor AND Property?

---

### Competitor Capability Matrix: STP Pipeline

| Vendor | Intake | FNOL | Doc Processing | Image/Damage | Decision | Settlement | Motor | Property |
|--------|--------|------|----------------|--------------|----------|------------|-------|----------|
| **Sprout.ai** | ✅ | ✅ | ✅ Best | ⚠️ Fraud only | ✅ | ⚠️ | ✅ | ✅ |
| **omni:us** | ✅ | ✅ | ✅ EAS best | ❌ | ✅ | ⚠️ | ✅ Best | ✅ |
| **Tractable** | ❌ | ❌ | ❌ | ✅ Best | ⚠️ | ❌ | ✅ | ✅ |
| **ClaimSorted** | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| **Five Sigma** | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| **Snapsheet** | ✅ | ✅ | ⚠️ | ✅ Virtual | ⚠️ | ✅ | ✅ | ✅ |
| **Shift** | ❌ | ❌ | ⚠️ | ❌ | ⚠️ Fraud | ❌ | ✅ | ✅ |
| **Davies** | ⚠️ | ⚠️ | ✅ | ❌ | ✅ | ✅ | ✅ UK | ❌ |

**Legend:** ✅ Strong | ⚠️ Partial/Limited | ❌ Not covered

---

### Deep Dive: Best at Each Stage

#### 1. Sprout.ai — Best for Document Processing (Multi-LOB)

**STP Claim:** 67%+ instant settlement

| Stage | What They Do |
|-------|--------------|
| **Intake** | Ingest from any channel (email, portal, app, API) |
| **FNOL** | Auto-classify claim type, extract policy details |
| **Doc Processing** | AI-OCR any language, handwritten, 100% field extraction |
| **Image Processing** | Fraud detection (tampering, AI-generated) — NOT damage assessment |
| **Decision** | Policy validation, coverage checking, auto-approve simple |
| **Settlement** | ⚠️ Less focus here |

**Sectors:** Motor ✅ Property ✅ Health ✅ Life ✅ Commercial ✅

**Gap:** No photo-based damage assessment — detects fraud in images, doesn't estimate repair costs

---

#### 2. omni:us — Best for EU Motor EAS Extraction

**STP Claim:** 70% no-touch claims

| Stage | What They Do |
|-------|--------------|
| **Intake** | Receive scanned/photographed EAS, emails, docs |
| **FNOL** | Extract from EAS (~100 fields), handwriting recognition |
| **Doc Processing** | Best-in-class for EAS specifically, CNN-based alignment |
| **Image Processing** | Document images only — NOT damage photos |
| **Decision** | Convention matching, auto-process clean claims |
| **Settlement** | ⚠️ Less focus, more on intake/triage |

**Sectors:** Motor ✅ (EU focus) Property ✅ Liability ✅

**Gap:** EU-focused, no photo damage assessment, integration complexity

---

#### 3. Tractable — Best for Photo Damage Assessment

**STP Claim:** ~70% auto-processed (for photo-assessable claims)

| Stage | What They Do |
|-------|--------------|
| **Intake** | ❌ Not their focus |
| **FNOL** | ❌ Not their focus |
| **Doc Processing** | ❌ Not their focus |
| **Image Processing** | ✅ BEST — pixel-level damage detection, repair estimates, total loss |
| **Decision** | Certainty scores for routing |
| **Settlement** | ❌ Not their focus |

**Sectors:** Motor ✅ Property ✅ (expanded 2022, Verisk/Xactimate integration)

**Gap:** Downstream only — needs to be combined with intake/doc processing solutions

---

#### 4. ClaimSorted — Closest to Full Pipeline (TPA Model)

**STP Claim:** 3x faster than traditional TPAs

| Stage | What They Do |
|-------|--------------|
| **Intake** | ✅ White-label eNOL portal, API/SFTP integration |
| **FNOL** | ✅ Full intake, customizable workflows |
| **Doc Processing** | ✅ AI reads uploaded photos and scanned documents |
| **Image Processing** | ⚠️ Fraud detection — unclear on damage estimation depth |
| **Decision** | ✅ AI triage, auto-decision for simple, handlers for complex |
| **Settlement** | ✅ Payment processing, payout in minutes |

**Sectors:** Motor ✅ Property ✅ Liability ✅ A&H ✅ Travel ✅ Warranty ✅

**The Catch:** ClaimSorted is a **TPA, not a tech vendor**. They HANDLE your claims — you give up control. This is different from Sprout/Tractable which are point solutions you integrate.

| Model | You Control Claims? | Integration Effort | Trust Required |
|-------|--------------------|--------------------|----------------|
| **Point Solution** (Sprout, Tractable) | YES | Medium | Low |
| **TPA** (ClaimSorted, Davies) | NO | Low | High |

---

### The Integration Problem

Nobody does the full pipeline as a **single integrated vendor**:

```
Best Stack Today (requires integration):

INTAKE/FNOL     DOC PROCESSING     IMAGE ASSESSMENT     DECISION     SETTLEMENT
     ↓                ↓                   ↓                 ↓             ↓
 Sprout.ai  →    Sprout.ai    →     Tractable      →   Shift    →    ???
    or              or                                (fraud)
 omni:us        omni:us
```

**The pain:** Insurers must integrate 3-4 vendors, each with different APIs, data formats, and contracts.

**ClaimSorted's advantage:** They bundle it all — but you give up control.

---

### Strategic Insight: The Real White Space

| White Space | Why It's Open |
|-------------|---------------|
| **Integrated STP stack** | Point solutions don't talk to each other. Orchestration layer needed. |
| **Photo damage + doc processing** | Sprout does docs, Tractable does photos. No one does both. |
| **Settlement automation** | Everyone focuses on intake/assessment. 62% of US time is post-decision. |
| **TPA tech licensing** | Davies does it. ClaimSorted could. Others (Crawford, Sedgwick) don't have it. |

**For Mysa:**
- If you want to be a **tech vendor**: Build the integration layer that connects Sprout + Tractable + Shift into one pipeline
- If you want to be a **TPA**: Compete with ClaimSorted/Davies with better tech
- If you want a **wedge**: Pick one underserved piece (settlement? EU convention matching?) and own it

---

## Phase 7: Investigation (IN PROGRESS)

*This phase covers what happens when a claim CANNOT be straight-through processed and requires human investigation.*

### What Triggers Investigation?

Based on research, claims enter investigation when:

1. **EAS is unclear, incomplete, or disputed** — Missing fields, illegible handwriting, unclear diagram
2. **No EAS exists** — Hit and run, uncooperative party, parties forgot to fill it
3. **Bodily injury is involved** — Different workflow, longer lifecycle, lawyers
4. **Fraud indicators are flagged** — Goes to SIU (Special Investigation Unit)
5. **Complex scenario** — Multi-vehicle, doesn't fit convention tables
6. **High-value claim** — Above certain thresholds, requires more scrutiny
7. **Liability is disputed** — Parties disagree on fault after the fact

**For US:** Almost EVERY claim goes through some investigation because there's no agreed document. The adjuster must reconstruct what happened from competing accounts.

### Investigation Triggers by Market

| Trigger | EU | US |
|---------|----|----|
| Incomplete/unclear documentation | ~30-40% of claims | ~90%+ (no agreed doc) |
| Disputed liability | ~10-15% | ~30-40% |
| Bodily injury | ~10-15% | ~15-20% |
| Fraud indicators | ~5% | ~5% |
| High value / complex | ~5-10% | ~10-15% |

**Note:** These percentages are estimates (⚠️) based on research. They overlap (a claim can have multiple triggers).

### Key Research: Adjuster Time Allocation

From [Five Sigma Labs](https://fivesigmalabs.com/blog/exclusive-data-claims-adjusters-day-to-day-workloads/) research on claims adjuster workloads:

**Time spent by claim stage (US vs UK):**

| Stage | US | UK |
|-------|----|----|
| Claim creation | <25% | <25% |
| Damage assessment | 17.4% | 45.9% |
| Assessment to payment | 62.3% | 45.0% |

**Key finding:** In US, 62.3% of handling time is AFTER damage assessment — the investigation and settlement phases. In UK, it's more evenly split with damage assessment taking nearly half the time.

**Multiple adjuster involvement:**
- First-party medical claims: 57% require multiple adjusters
- Bodily injury claims: 51% require multiple adjusters
- Physical/accidental damage: 38% require multiple adjusters

**Critical insight:** When a claim requires more than one adjuster, handling time nearly TRIPLES (2.75-2.85x average). Whether it needs 2, 3, or 4 adjusters makes little difference — the collaboration overhead is the killer.

**Implication for Mysa:** Reducing the need for multiple adjusters (through better initial data, clearer documentation, or smarter routing) could dramatically cut handling time.

### What Happens During Investigation? — Deep Dive

Based on research from [Progressive](https://www.progressive.com/answers/what-is-an-insurance-adjuster/), [Nolo](https://www.nolo.com/legal-encyclopedia/how-will-the-insurance-company-investigate-my-car-accident.html), [Morgan Clark](https://www.morganclark.co.uk/about-us/blog/how-do-insurance-companies-investigate-claims/), [Five Sigma](https://fivesigmalabs.com/blog/exclusive-data-claims-adjusters-day-to-day-workloads/), and [Crawford](https://www.crawco.co.uk/services/motor).

---

## Investigation: Motor Claims vs Home/Property Claims

### 🚗 Motor Claims Investigation

**Primary question being answered:** WHO caused the accident and WHAT percentage of fault belongs to each party?

**Investigation Activities:**

| Activity | What Happens | Time Impact |
|----------|--------------|-------------|
| **Recorded statement collection** | Adjuster calls each party (15-30 min each), walks through incident step-by-step, records for legal purposes | HIGH — US: 4 statements per claim possible. EU: Only if EAS unclear |
| **Evidence gathering** | Collect police report, photos, dashcam footage, witness statements | MEDIUM |
| **Vehicle inspection** | Inspect damage to determine how accident occurred (damage location reveals impact direction) | MEDIUM — Often done by separate appraiser |
| **Liability analysis** | Cross-reference all evidence, identify contradictions, determine fault % | HIGH — Core adjuster skill |
| **Documentation** | Write investigation report, update claim file, set reserves | MEDIUM |

**Key Insight — Motor Investigation is About Reconstruction:**
The adjuster is essentially a detective reconstructing what happened from incomplete/conflicting evidence. In EU with clean EAS, this is largely skipped (convention lookup). In US, this is the CORE of the job.

**Documents Created (Motor):**
- Recorded statement transcripts
- Liability determination memo
- Vehicle damage assessment report
- Investigation summary/adjuster notes
- Reserve calculation worksheet

---

### 🏠 Home/Property Claims Investigation

**Primary question being answered:** WHAT happened, WAS it a covered peril, and HOW MUCH damage was caused?

**Investigation Activities:**

| Activity | What Happens | Time Impact |
|----------|--------------|-------------|
| **Policyholder interview** | Understand what happened, when discovered, timeline of events | MEDIUM |
| **Property inspection** | Physical inspection of damage — often on-site | HIGH — Field adjusters spend 25-30% on travel |
| **Cause & origin determination** | Was this sudden (covered) or gradual (not covered)? Fire origin? Water source? | HIGH — Often needs expert |
| **Damage documentation** | Photos, measurements, scope of damage | MEDIUM |
| **Estimate generation** | Calculate repair/replacement cost (usually in Xactimate) | MEDIUM-HIGH |
| **Coverage analysis** | Does policy cover this peril? Exclusions? Limits? Deductibles? | MEDIUM |

**Key Insight — Home Investigation is About Causation & Coverage:**
Unlike motor (who's at fault?), home claims ask: Was this a covered event? The adjuster must determine CAUSE (sudden burst vs gradual leak — completely different coverage outcomes) and SCOPE (visible damage + hidden damage).

**Documents Created (Home/Property):**
- Field inspection report with photos
- Cause & origin determination report
- Xactimate repair estimate
- Scope of loss documentation
- Coverage analysis memo
- Expert reports (if engineer/specialist engaged)

---

## Investigation: EU vs US Differences

### 🇪🇺 EU Motor Investigation

**When it happens:** Only ~30-40% of claims (when EAS path fails) — ⚠️ estimate

**Process:**
```
Claim doesn't qualify for STP
     ↓
Claims handler reviews EAS
     ↓
Gaps identified → Contact driver for clarification (phone/email)
     ↓
If still unclear → Assign to adjuster/loss adjuster
     ↓
Loss adjuster investigates:
├── Review all documentation
├── May request additional photos
├── May conduct phone interview
├── Rarely: on-site inspection for motor
     ↓
Produces loss adjuster report
     ↓
Liability determined (may use convention as guide even for unclear cases)
     ↓
Back to handler for settlement
```

**Key EU Differences:**
- **Loss Adjuster vs Claims Adjuster terminology** — UK uses "Loss Adjuster" (represents insurer) vs "Loss Assessor" (represents policyholder). Continental EU varies.
- **Convention as fallback** — Even when EAS is unclear, adjusters often try to fit the scenario to a convention case for efficiency
- **Less adversarial** — Single agreed document (EAS) means less "your word vs their word"
- **Shorter cycle** — Investigation less intensive because EAS provides foundation

**Typical EU Motor Investigation Timeline:** 2-4 weeks for complex cases (⚠️ estimate)

---

### 🇺🇸 US Motor Investigation

**When it happens:** ~90%+ of claims (no agreed document = investigation is default)

**Process:**
```
FNOL received
     ↓
Claim assigned to adjuster
     ↓
Adjuster calls YOUR driver (15-30 min recorded statement)
├── Walk me through what happened
├── What were you doing before?
├── What did you observe?
├── Where exactly did impact occur?
├── Any witnesses?
├── Any injuries?
     ↓
Adjuster calls OTHER driver (15-30 min recorded statement)
     ↓
If injuries: Medical records requested
     ↓
Vehicle inspection scheduled (separate appraiser usually)
     ↓
Police report obtained
     ↓
Adjuster reconstructs accident from all sources
├── Compare statements for contradictions
├── Match damage patterns to accounts
├── Review any dashcam/telematics
     ↓
Liability determination (fault %)
├── Could be 100/0, 80/20, 50/50, etc.
├── Varies by state (comparative vs contributory negligence)
     ↓
If insurers disagree → Arbitration Forums, Inc.
     ↓
Settlement negotiation
```

**Key US Differences:**
- **Every claim gets adjuster time** — No STP path for disputed liability
- **Recorded statements are standard** — Up to 4 per claim (both parties × both insurers)
- **Fault is NOT binary** — Comparative negligence means 70/30, 60/40 splits common
- **More adversarial** — Two competing narratives, no joint document
- **Longer, more expensive** — More human hours per claim

**Typical US Motor Investigation Timeline:** 30-60 days standard, months for complex/BI (⚠️ based on research)

**State Regulations:** Most states require insurers to acknowledge claims within 15 days and complete investigation within 30-90 days depending on complexity.

---

### 🏠 Home/Property Investigation (EU vs US)

**Key Finding: EU has NO structural advantage for home claims.**

Unlike motor (where EAS gives EU a data quality advantage), home claims are investigated similarly in both markets:

| Factor | EU | US |
|--------|----|----|
| Standardized incident document? | NO | NO |
| Convention system for causation? | NO | NO |
| Adjuster inspection required? | Yes, usually | Yes, usually |
| Cause & origin determination? | Same process | Same process |
| Coverage interpretation? | Varies by policy | Varies by policy |

**Implication:** Home claims automation opportunity is the SAME in EU and US — make adjusters more productive, not eliminate them.

---

## Investigation: TPA vs Internal Teams

### Staff Adjusters (Insurer Employees)

**Profile:**
- W-2 employees of the insurance company
- ~70% of US adjusters are staff (⚠️ based on research)
- Handle claims exclusively for their employer
- Have authority limits (may need supervisor approval above thresholds)

**Characteristics:**
| Factor | Staff Adjuster |
|--------|----------------|
| **Loyalty** | To employer insurer |
| **Systems access** | Full access to insurer's claims system |
| **Training** | Insurer-specific processes and guidelines |
| **Caseload** | Managed by insurer, typically steady |
| **Quality control** | Direct supervision |
| **Cost to insurer** | Fixed (salary + benefits) |

**When Used:**
- Standard claims volume
- Core lines of business
- Geographic areas with sufficient staff

---

### TPA Adjusters (Third Party Administrators)

**Major TPAs:** Crawford, Sedgwick, Engle Martin, Gallagher Bassett

**Profile:**
- Employed by TPA, not the insurer
- Handle claims on behalf of MULTIPLE insurers
- ~23% of US adjusters work for TPAs (⚠️ based on research)
- TPA bears no financial risk — they process, insurer pays

**Characteristics:**
| Factor | TPA Adjuster |
|--------|--------------|
| **Loyalty** | To TPA employer (serves multiple insurers) |
| **Systems access** | May use TPA's system OR insurer's system depending on setup |
| **Training** | TPA processes, must adapt to each insurer's guidelines |
| **Caseload** | Variable — TPAs handle overflow and spikes |
| **Quality control** | TPA supervision + insurer oversight |
| **Cost to insurer** | Variable (per-claim or per-hour) |

**When Used:**
- **CAT events** — Hurricane, wildfire, flood creates volume spike
- **Geographic gaps** — Insurer has no staff in that region
- **Specialty claims** — Marine, aviation, complex property
- **Run-off books** — Insurer exiting a line but has legacy claims
- **Cost optimization** — Variable cost vs fixed staff

**TPA Investigation Process (Crawford example):**
From [Crawford UK Motor](https://www.crawco.co.uk/services/motor):
- Centralized FNOL intake (24/7/365)
- Desktop claims handling
- Field adjusting when needed
- Healthcare and rehabilitation management (for BI)
- Litigation gatekeeping
- External supplier instruction and monitoring
- All managed through unified IT platform with analytics

**Key TPA Insight:**
> TPAs often have MORE sophisticated processes than mid-size insurers because claims handling IS their core business. They invest in technology and efficiency because their margins depend on it.

---

### Independent Adjusters (IAs)

**Profile:**
- Self-employed or small firm contractors
- ~7% of US adjusters (⚠️ based on research)
- Hired per-claim by insurers or TPAs
- Often specialists (marine, aviation, large loss)

**When Used:**
- One-off complex claims
- CAT surge (even TPAs hire IAs for overflow)
- Specialized expertise needed
- Remote locations

---

### TPA vs Staff: Key Differences for Investigation

| Factor | Staff Adjuster | TPA Adjuster |
|--------|----------------|--------------|
| **Investigation depth** | Follows insurer guidelines strictly | May have standardized TPA approach across clients |
| **Authority** | Clear authority limits within insurer | Authority delegated by insurer, may vary by client |
| **System integration** | Native to insurer systems | May require data handoffs between systems |
| **Handoff friction** | Low (same organization) | HIGHER — Data moves between TPA and insurer systems |
| **Consistency** | Consistent with insurer culture | May vary if TPA handles many insurers |
| **Scalability** | Limited by headcount | Highly scalable (surge capacity) |

**Mysa Implication:**
If Mysa sells to insurers, the product must work for BOTH staff adjusters AND TPA adjusters working on their behalf. Data handoffs between TPA systems and insurer systems are a friction point — a data normalization layer could help here too.

---

## TPA Deep Dive: Operating Model, Pricing, and Journey

### TPA vs Public Adjuster/Loss Assessor — Critical Distinction

| | **TPA** | **Public Adjuster (US) / Loss Assessor (UK)** |
|---|---|---|
| **Works for** | The INSURER | The POLICYHOLDER |
| **Goal** | Process claims efficiently for insurer | Maximize settlement for policyholder |
| **Who pays them** | Insurer (contract fee) | Policyholder (10-15% of settlement) |
| **Authority** | Delegated from insurer | None — advocates/negotiates |
| **Relationship** | Extension of insurer's operations | Adversarial to insurer |
| **When engaged** | Insurer outsources claims handling | Policyholder feels underpaid/denied |
| **Claims they touch** | Whatever insurer assigns | Typically large/disputed only |

**Key point:** A TPA adjuster IS working for the insurer, just employed by a different company. A public adjuster/loss assessor is working AGAINST the insurer on behalf of the claimant.

---

### TPA Pricing Models

Based on research from [Crawford](https://www.crawco.com/blog/what-does-this-fee-cover-unpacking-what-goes-into-tpa-administrative-costs-and-fees), [IRMI](https://www.irmi.com/articles/expert-commentary/third-party-administrators-quality-versus-price):

| Model | How It Works | Typical Range | Used For |
|-------|-------------|---------------|----------|
| **Per-claim fee** | Fixed fee per claim handled | $100-$1,500 per claim | Most common for P&C |
| **Tiered per-claim** | Fee varies by claim complexity | Lower for simple, higher for complex | Sophisticated contracts |
| **% of paid claims** | Percentage of indemnity paid | 1-7% of claim value | Some specialty lines |
| **Monthly retainer** | Fixed monthly fee for capacity | Varies by volume | Large accounts |
| **Hybrid** | Base retainer + per-claim above threshold | Negotiated | Large insurers |

**What's Included in TPA Fees:**
- FNOL intake (24/7)
- Adjuster assignment and management
- Investigation activities
- Coverage analysis (within authority)
- Settlement processing (within limits)
- Reporting and compliance
- Vendor management (repair networks, experts)

**What's Usually Extra:**
- Expert fees (engineers, forensics)
- Legal costs
- Actual indemnity payments (insurer pays these)
- SIU investigations (sometimes)

**Key Insight:** TPA fees have remained relatively flat for a decade despite inflation — competitive pressure keeps pricing tight. This means TPAs are under margin pressure, which makes productivity tools attractive to them.

---

### Do Insurers Have Incentive to Reduce TPA Usage?

**Yes — the math is clear:**

| Processing Method | Cost per Claim | Notes |
|------------------|----------------|-------|
| **STP (automated)** | ~$15 | Minimal human oversight |
| **Staff adjuster** | ~$75 | Salary, benefits, overhead |
| **TPA** | ~$100-1,500+ | Per-claim fee + loss adjustment expense |

**Every claim moved from TPA → STP saves $85-1,485 per claim.**

**But there's a nuance:** Insurers can only STP claims with clean data. The ~90% that can't STP still need humans. So the real strategy is:
1. **Maximize STP** (automate the simple)
2. **Use staff for strategic/high-value claims** (control, relationships)
3. **Use TPA for surge, specialty, and cost optimization** (variable cost)

**Mysa Opportunity:** If you help insurers move claims from TPA/staff → STP, you're directly reducing their biggest variable cost. The ROI is measurable and immediate.

---

### Does the TPA Handle FNOL Intake?

**Yes — FNOL intake is often a core TPA service.**

| TPA | FNOL Capability |
|-----|-----------------|
| **Crawford** | "Centralised FNOL hub with omnichannel access available 24/7/365" |
| **Sedgwick** | "24/7/365 intake" with centralized hubs |
| **Davies** | "90% of customers contacted within 5 minutes following FNOL" |
| **McLarens** | "Technical handling starts from the moment a claim happens" |

**How it works:**

```
Policyholder has incident
        ↓
Calls insurer's claims line (branded as insurer)
        ↓
Actually answered by TPA's call center
├── Insurer routes calls to TPA
├── White-label experience (policyholder doesn't know it's TPA)
├── TPA agent uses insurer's scripts/systems
        ↓
TPA logs FNOL into insurer's claims system (or TPA system with data sync)
        ↓
TPA handles claim through settlement (or escalates to insurer)
```

**Important nuance:** Not all TPA arrangements include FNOL. Scope is defined in the **delegated authority agreement**.

---

### TPA Journey by Phase — What They Do When

| Phase | TPA Role | Activities | Authority |
|-------|----------|------------|-----------|
| **0-2: Incident/Scene/Docs** | ❌ None | Policyholder documents incident | — |
| **3: Reconciliation** | ❌ None | Parties/police reconcile facts | — |
| **4: First Contact** | ⚠️ Sometimes | If TPA handles FNOL, they receive first call | Defined in contract |
| **5: FNOL** | ✅ Often | 24/7 intake, policy verification, claim opened | Delegated |
| **6: Triage** | ✅ Yes | Complexity assessment, adjuster assignment | Within guidelines |
| **7: Investigation** | ✅ Yes | Full investigation (statements, evidence, liability) | Delegated |
| **8: Assessment** | ✅ Yes | Damage valuation, repair estimates | Within limits |
| **9: Decision** | ⚠️ Limited | Coverage determination, settlement calculation | Up to authority limit |
| **10: Settlement** | ⚠️ Limited | Payment processing, negotiation | Up to authority limit |
| **11: Close** | ✅ Yes | File closure, reporting, subrogation handoff | Per guidelines |

**Escalation to Insurer:**
- Claims above authority limit (e.g., >$50K)
- Complex coverage interpretation
- Litigation decisions
- Fraud investigation conclusions
- High-profile/reputational claims

---

### Major TPAs and Their Specializations

| TPA | Headquarters | Specialization | Notable Stats |
|-----|--------------|----------------|---------------|
| **Sedgwick** | US/UK | Full-service, property, casualty | 200K+ TPA claims/year (UK) |
| **Crawford** | US | Motor, property, global reach | 70+ countries |
| **Davies** | UK | Largest UK TPA, motor specialty | 500K+ claims/year |
| **McLarens** | UK | Global TPA, specialty lines | Single global platform |
| **Gallagher Bassett** | US | Workers comp, liability | Large employer programs |
| **Engle Martin** | US | Complex claims, specialty | High-value focus |

---

### EU vs US TPA Differences

| Factor | 🇺🇸 US | 🇪🇺 EU/UK |
|--------|--------|----------|
| **Market size** | 34% of global TPA market | Smaller but growing |
| **TPA penetration** | Very high (91% outsource some) | Growing, UK leads |
| **Motor TPA usage** | High for fleet/commercial | UK: high. Continental: growing |
| **Property TPA usage** | Very high, especially CAT | High in UK, growing elsewhere |
| **Regulation** | State-by-state | GDPR, national regulators |
| **Cross-border** | Mostly domestic | Passported licenses, multilingual |

**Key EU difference:** Continental Europe (Germany, France) historically kept claims in-house. UK adopted TPA model earlier. Trend is toward more outsourcing everywhere due to cost pressure and talent shortages.

---

### Case Study: Kuarterback AI (Davies)

**What it is:** Automated claims processing system for UK motor claims

**What it does:**

| Function | How It Works |
|----------|--------------|
| **Document processing** | Reads Stage 2 packs from RTA portal (medical reports, physio invoices) |
| **Data extraction** | Converts unstructured documents into structured data fields |
| **Valuation** | Applies rules and valuation matrices to generate claim value |
| **Speed** | Reviews pack and generates valuation in **<1 minute** |
| **Scope** | Handles 75-80% of claims that are "routine, standardised, formulaic" |

**Results:**

| Metric | Result |
|--------|--------|
| **Time saved per claim** | ~25 minutes |
| **Claims auto-processed** | 75-80% |
| **Human review needed** | 20-25% of claims |
| **Error reduction** | Eliminates inputting errors in valuations |

**Before/After Workflow:**

```
BEFORE KUARTERBACK:
├── Handler manually reads medical reports (10-15 min)
├── Handler manually reads invoices (5-10 min)
├── Handler manually inputs data (5-10 min)
├── Handler calculates valuation (5 min)
└── Total: ~25-40 minutes per claim

AFTER KUARTERBACK:
├── Kuarterback AI reads all documents (<1 min)
├── Kuarterback extracts data fields (<1 min)
├── Kuarterback applies valuation rules (<1 min)
├── 75-80%: Auto-processed, handler reviews output only
├── 20-25%: Flagged for handler attention
└── Handler saves ~25 minutes on EVERY claim
```

**Strategic Parallel for Mysa:** Kuarterback is doing for UK motor PI claims what Mysa could do for EAS processing:
- Both take unstructured documents (Stage 2 pack / EAS)
- Both extract structured data
- Both apply rules (valuation matrix / convention fault table)
- Both auto-process routine cases, flag exceptions
- Both save ~25 minutes per claim

---

### TPA as Potential Mysa Buyer

| TPA Characteristic | Why Mysa Matters to Them |
|-------------------|--------------------------|
| **Margin pressure** | Productivity tools = better unit economics |
| **Volume-based model** | Handle more claims with same headcount |
| **Multi-client** | One tool works across all insurer clients |
| **Tech investment** | Already investing in AI/automation |
| **CAT surge** | Need tools that scale instantly |
| **Competitive positioning** | Differentiate with better/faster processing |

**Selling to TPA vs Insurer:**

| Factor | Selling to Insurer | Selling to TPA |
|--------|-------------------|----------------|
| **Decision maker** | Claims ops director | TPA operations/tech leadership |
| **Sales cycle** | Longer | May be faster (operational buyer) |
| **Deployment scope** | One insurer, staff + TPA | Many insurer clients at once |
| **Data access** | Single insurer's data | Cross-client data (richer patterns) |
| **Integration** | Insurer's claims system | TPA platform |

---

## Broker Role During Investigation

### The Short Answer: MINIMAL for routine claims, SIGNIFICANT for disputes

**Based on research from [Schwartz Conroy & Hack](https://schlawpc.com/the-role-of-the-insurance-broker-in-disputes-between-insureds-and-insurance-companies/) and [Terra Insurance](https://terra.insure/blog/difference-between-brokers-and-adjusters/).**

### What Brokers DO During Investigation

| Activity | When It Happens | Broker Value |
|----------|-----------------|--------------|
| **Status updates** | Throughout | Broker checks on claim progress, relays to client. Redundant communication layer. |
| **Document relay** | When insurer requests more docs | Broker collects from client, forwards to insurer. Could be direct. |
| **Clarification support** | When insurer has questions | Broker helps client understand what's being asked. Useful but not essential. |
| **Coverage interpretation** | When coverage is unclear | Broker reviews policy language, advises client on what SHOULD be covered. **Valuable.** |
| **Dispute advocacy** | When claim is underpaid/denied | Broker pushes back on insurer, negotiates better outcome. **Most valuable.** |

### When Brokers Add Real Value in Investigation

**Scenario 1: Coverage Dispute**
> Insurer says "gradual leak — not covered." Broker reviews policy, finds ambiguous language, argues for coverage. This is where brokers EARN their commission.

**Scenario 2: Lowball Settlement**
> Adjuster estimates €5,000 repair. Broker knows market rates, argues for €7,500. Broker has leverage — places premium with insurer, relationship matters.

**Scenario 3: Complex Claim Navigation**
> Bodily injury claim, lawyers involved, multi-party. Broker helps client understand process, coordinates between parties, manages expectations.

### When Brokers Add Little Value in Investigation

**Scenario: Routine Motor Claim**
> Clean EAS, clear liability, straightforward damage. Broker is a relay node — receives update from insurer, forwards to client. Adds delay without adding insight.

### Broker vs Public Adjuster

| | Broker | Public Adjuster |
|---|---|---|
| **Works for** | Policyholder (in theory, but also has insurer relationships) | Policyholder exclusively |
| **When engaged** | From policy purchase through claims | Only during claims, usually disputes |
| **Fee** | Commission from insurer (built into premium) | 10-15% of settlement (paid by policyholder) |
| **Investigation role** | Advisory, advocacy | Can actively investigate, document, negotiate |
| **Common for** | All claims (if broker-sold policy) | Large/disputed property claims |
| **Motor claims** | Rarely use public adjusters | Public adjusters rare for motor |

### Key Insight: Broker Investigation Role

> **Brokers are NOT investigators.** They don't gather evidence, inspect vehicles, or determine liability. Their role during investigation is **communication, interpretation, and advocacy** — valuable for complex/disputed claims, overhead for simple ones.

**Mysa Implication:**
If Mysa improves investigation efficiency, brokers benefit indirectly (faster resolution for their clients) but aren't the primary user. The adjuster (staff or TPA) is the user during investigation phase.

---

## Expert Involvement in Investigation

### When Experts Are Brought In

Based on research from [ClaimsMate](https://claimsmate.com/engineers-and-insurance-claims-how-an-engineer-inspection-could-influence-your-claim/) and [McLarens](https://www.mclarens.com/expertise/claims-management/expert-witness/).

| Expert Type | When Used | What They Do |
|-------------|-----------|--------------|
| **Independent Motor Engineer** | Vehicle damage unclear, total loss dispute, mechanical failure claim | Inspect vehicle, determine how damage occurred, assess if repairable |
| **Forensic Engineer** | Fire origin, structural failure, complex causation | Scientific analysis of cause & origin |
| **Accident Reconstructionist** | Disputed liability, serious injury, litigation likely | Recreate accident from physical evidence |
| **Medical Expert** | Bodily injury claims, disability disputes | Assess injury severity, causation, prognosis |
| **Building/Property Expert** | Large property losses, coverage disputes | Assess damage scope, repair methodology |
| **Fraud Investigator (SIU)** | Red flags detected | Deep investigation, surveillance, background checks |

### Expert Investigation Timeline

- Expert inspection: 1-2 hours on-site
- Expert report: 4-6 weeks typical (⚠️ can be faster or slower)
- This ADDS to claim cycle time significantly

### Expert Trigger Thresholds (⚠️ Estimates)

| Claim Type | Expert Likely If... |
|------------|---------------------|
| Motor (material) | Damage > €10-15K, total loss disputed, liability unclear |
| Motor (BI) | Injury claimed, surgery involved, liability disputed |
| Property | Damage > €20-50K, cause unclear, coverage disputed |
| Any | Fraud indicators, litigation expected |

---

## SIU (Special Investigation Unit) — Fraud Investigation

### What Triggers SIU Referral

Based on research from [GEICO SIU](https://www.geico.com/claims/claimsprocess/special-investigations-unit/), [Sentry Insurance](https://www.sentry.com/what-we-offer/resources/articles/special-investigation-unit-siu), and [Insurance Training Center](https://insurancetrainingcenter.com/resource/special-investigative-unit-siu/).

| Red Flag | Example |
|----------|---------|
| **Timing suspicious** | Claim filed shortly after policy purchase or coverage increase |
| **Inconsistent statements** | Story changes between calls, contradicts physical evidence |
| **Prior claims history** | Multiple similar claims across different insurers |
| **Financial stress indicators** | Recent bankruptcy, job loss, business failure |
| **Staged accident patterns** | Known fraud ring patterns, professional claimants |
| **Documentation issues** | Receipts look altered, photos metadata suspicious |
| **Over-documentation** | TOO perfect documentation (pre-planned) |

### SIU Investigation Process

```
Adjuster flags claim with red flags
     ↓
SIU analyst conducts preliminary review
├── Claims history search (industry databases)
├── Social media review
├── Background check
     ↓
Decision: Investigate or return to normal handling
     ↓
If investigate:
├── Detailed recorded statement
├── Document forensics (photo metadata, receipt analysis)
├── Surveillance (in serious cases)
├── Coordination with law enforcement
├── Expert fraud analysis
     ↓
SIU report with recommendation:
├── Legitimate → Return to adjuster
├── Fraud confirmed → Deny claim, potentially refer to law enforcement
├── Inconclusive → Additional investigation or settle with conditions
```

### SIU Structure

| Model | Description |
|-------|-------------|
| **In-house SIU** | Dedicated team within insurer. Required by regulation in many US states. |
| **Outsourced SIU** | Third-party firm (e.g., investigation agencies). Common for smaller insurers. |
| **Hybrid** | In-house for triage, outsource complex investigations |

### SIU Key Insight

> SIUs are SEPARATE from claims adjusters. Adjusters handle claims; SIU handles suspected fraud. Claims adjusters identify red flags and refer — they don't investigate fraud themselves.

**AI Fraud Note:** From earlier research, AI-generated fraud (fake photos, fabricated receipts, deepfakes) is a GROWING threat. SIUs increasingly need tools to detect AI-generated evidence.

---

## Investigation Pain Points (Opportunities for Mysa)

### Pain Point 1: Information Gathering is Manual and Slow

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Recorded statements | Adjuster manually takes notes or transcribes | AI transcription + automatic fact extraction |
| Document collection | Emails, phone calls, portals — scattered | Unified intake that extracts and structures |
| Evidence organization | Adjuster manually organizes claim file | Auto-organize by evidence type, flag gaps |

### Pain Point 2: Collaboration Kills Cycle Time

From Five Sigma research: When multiple adjusters touch a claim, handling time nearly TRIPLES.

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Handoff friction | Adjuster A's notes unclear to Adjuster B | Structured claim summaries, standardized formats |
| Context loss | New adjuster must re-read entire file | AI-generated claim summary at handoff |
| Specialist referral | Emailing experts, waiting for reports | Integrated expert network with structured requests |

### Pain Point 3: Liability Determination is Judgement-Heavy

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Reconstructing accident | Adjuster reads statements, compares, infers | AI-assisted contradiction detection |
| Matching to precedent | Adjuster relies on experience | Pattern matching to similar resolved claims |
| Documentation | Adjuster writes narrative report | AI-drafted liability memo from structured data |

### Pain Point 4: Expert Engagement Adds Weeks

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Deciding if expert needed | Adjuster judgment | Rules/AI to flag when expert likely needed |
| Finding/assigning expert | Manual process, relationship-based | Expert network marketplace |
| Waiting for report | 4-6 weeks typical | Faster turnaround through digital workflows |

### Pain Point 5: Fraud Detection is Reactive

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Red flag identification | Adjuster intuition + basic rules | ML-based fraud scoring at intake |
| SIU referral | Manual, subjective | Automated flagging with explainable reasons |
| Evidence verification | Manual review | AI detection of synthetic/altered media |

---

## Investigation: Key Assumptions Logged

| # | Assumption | Status | Notes |
|---|------------|--------|-------|
| A47 | ~30-40% of EU motor claims require investigation (EAS path fails) | ⚠️ Estimate | Based on STP gap research |
| A48 | ~90%+ of US motor claims require some investigation | ⚠️ Estimate | No agreed document = investigation default |
| A49 | US motor investigation takes 30-60 days standard | ⚠️ Based on research | Complex/BI can take months |
| A50 | EU motor investigation takes 2-4 weeks for complex cases | ⚠️ Estimate | Less intensive than US |
| A51 | Expert reports add 4-6 weeks to claim cycle | ⚠️ Based on research | Significant delay factor |
| A52 | ~70% of US adjusters are staff, ~23% TPA, ~7% independent | ⚠️ Based on research | May vary by line of business |
| A53 | Brokers have minimal role during investigation (advisory only) | ⚠️ Based on research | Significant for disputes only |
| A54 | Home claims investigation is similar EU vs US (no structural EU advantage) | ⚠️ Based on research | Unlike motor where EAS helps EU |
| A55 | SIU is typically separate from claims adjusting team | ✅ Based on research | Required by regulation in many states |
| A56 | Multi-adjuster claims take ~3x longer than single-adjuster | ✅ Based on Five Sigma data | Collaboration overhead is major inefficiency |
| A57 | US "assessment to payment" consumes 62.3% of handling time | ✅ Based on Five Sigma data | Bigger than FNOL + investigation combined |
| A58 | UK "assessment to payment" consumes 45% of handling time | ✅ Based on Five Sigma data | More balanced than US |
| A59 | EAS captures ~100 fields, 17 structured circumstance checkboxes | ✅ Based on research | Checkboxes are convention input |
| A60 | ACORD 2 uses free-text narrative for accident description | ✅ Based on research | No structured circumstances like EAS |
| A61 | ACORD 2 has no diagram field | ✅ Based on research | Unlike EAS which includes joint sketch |
| A62 | US recorded statements are 15-30 min each, up to 4 per claim | ⚠️ Based on research | Both parties × both insurers for disputed claims |
| A63 | Xactimate used by 75-80% of property adjusters | ✅ Based on research | Industry standard for estimates |
| A64 | Home claims data capture process similar EU vs US | ⚠️ Based on research | No EAS equivalent for property anywhere |
| A65 | BI + PD claims commonly require two separate specialists | ⚠️ Based on research | Different training, different timelines |
| A66 | SIU referral creates handoff that may not integrate well | ⚠️ Based on research | SIU often uses different systems |

---

## 🟢 OPEN QUESTIONS — Resolved

**Resolved before continuing to Phase 8:**

### Q1: The 3x collaboration penalty — Is this Mysa's problem?

**Answer: Not directly, but it's a symptom of the problem Mysa DOES solve.**

The 3x penalty comes from **context loss at handoff** — when Adjuster A passes to Adjuster B, B must re-read the entire file to understand what happened. The root cause is poor data structure. If the claim file had clean, structured data from intake (not narrative notes and scattered documents), handoff friction drops dramatically.

**Mysa's play:** Don't build a collaboration tool (that's Slack/Teams territory). Build the **structured claim data foundation** that makes collaboration unnecessary for simple claims and faster for complex ones. The 3x penalty is a *selling point* for why structured data matters, not a feature to build directly.

### Q2: Home vs Motor — Different products?

**Answer: Different investigation, same data problem.**

- **Motor investigation** = WHO caused it? → Fault reconstruction from competing narratives
- **Home investigation** = WAS it covered? → Cause & origin determination + damage scoping

These are different investigation workflows. But the UPSTREAM problem (data extraction, document processing, intake structuring) is identical. A scanned EAS and a scanned property damage report both need OCR, extraction, and normalization.

**Mysa's play:** Start with motor (cleaner data via EAS, convention systems enable STP, smaller scope). The extraction + inference engine transfers to home. Investigation-specific features come later and may diverge by line, but the data layer is shared.

### Q3: TPA data handoffs — Is this a wedge?

**Answer: Yes — potentially a strong one.**

~25% of claims flow through TPAs (higher during CAT events). Data moves between TPA systems and insurer systems with friction:
- Different data formats
- Manual exports/imports
- Context loss at boundaries
- Audit/compliance gaps

"Mysa normalizes claim data regardless of source — staff adjuster, TPA, or broker" is a clean positioning. It makes Mysa the **interoperability layer** between fragmented claims ecosystems.

**But the timing matters:** TPAs are a secondary buyer. Start by selling to insurers (who have the budget and the pain), then naturally extend to the TPA-insurer handoff as a value-add.

### Q4: Broker irrelevance during investigation — Impact on buyer?

**Answer: Confirms the "sell to insurer, design broker-friendly" strategy from Scenario A.**

Brokers are valuable at intake (Phases 4-5) and disputes (Phases 9-11), but absent during investigation (Phases 7-8). This means:
- **If Mysa focuses on Phases 7-8+:** The buyer is the insurer/TPA, not the broker
- **If Mysa starts at intake (Phases 4-6):** Both brokers and insurers benefit
- **The data normalization wedge spans both:** Intake data quality → faster investigation → faster settlement

**No change to strategy:** Sell to insurers. Make brokers happy as a side effect. Don't build broker-specific features until there's demand.

### Hanging Strategic Question: US Augment vs EU Eliminate

**Resolution: Both — but sequentially.**

| Market | Phase 1 (Year 1-2) | Phase 2 (Year 3+) |
|---|---|---|
| **EU** | Extraction + inference → push STP from ~10% to ~25% (ELIMINATE adjuster for routine claims) | Add triage + recommendations → push STP to ~40% |
| **US** | Same extraction + inference → structure recorded statements, normalize competing narratives (AUGMENT adjuster) | Add investigation assistance → reduce adjuster time per claim |

The underlying technology is the same: **document/data understanding and normalization**. The EU application eliminates human steps; the US application makes human steps faster. Same engine, different outcomes.

**This is actually Mysa's moat story:** "We understand insurance documents and data better than anyone — EU or US, motor or home, paper or digital. That understanding powers different workflows depending on the market."

---

## Phase 8: Assessment — Damage Valuation & Repair Estimates

*How damage is valued, repair costs are estimated, and total loss decisions are made. This is where the claim gets a price tag.*

### What is Assessment?

Assessment is the phase where the insurer answers: **"How much will this cost?"**

After investigation establishes WHAT happened and WHO is at fault (Phase 7), assessment determines:
1. **Damage extent** — What is damaged and how severely?
2. **Repair cost** — What will it cost to fix?
3. **Total loss decision** — Is it cheaper to replace than repair?
4. **Reserve adjustment** — Update the financial reserve based on actual costs

### Assessment ≠ Investigation (Critical Distinction)

| | **Investigation (Phase 7)** | **Assessment (Phase 8)** |
|---|---|---|
| **Question** | What happened? Who's at fault? | How much damage? What will it cost? |
| **Actor** | Claims adjuster | Appraiser / damage assessor / expert |
| **Output** | Liability determination (fault %) | Repair estimate or total loss valuation |
| **Skills** | Narrative analysis, interviewing, law | Vehicle/property knowledge, estimation tools |
| **Can happen in parallel?** | Often yes — damage assessment can start while liability is still being determined |

**Key insight:** In the US, these are often done by different people. The **adjuster** handles investigation and the full claim; the **appraiser** focuses specifically on damage valuation. In the EU, the same person ("loss adjuster" or "expert") may do both.

---

### 🚗 Motor Assessment: The Damage Valuation Process

#### Step 1: Inspection — How Is the Vehicle Examined?

##### FORK: Desk vs Field Assessment

| | **Desk Assessment** | **Field Assessment** |
|---|---|---|
| **How** | Review photos submitted by policyholder/body shop | Physical on-site inspection of vehicle |
| **When used** | Minor visible damage, clear liability, low-value claims | Severe damage, hidden damage suspected, total loss candidate, fraud indicators |
| **Who** | Desk appraiser (remote) | Field appraiser (travels to vehicle) |
| **Trend** | **Growing fast** — AI photo assessment accelerating this | Still required for complex cases |
| **Time** | Minutes to hours | 1-3 hours + travel time (25-30% of field adjuster time is travel) |
| **% of claims** | ~40-50% and growing ⚠️ | ~50-60% but declining ⚠️ |

**Photo-based assessment is the biggest shift in this phase.** Tractable (GEICO customer) reports:
- Admiral Seguros: **90% of auto estimates run touchless**
- **98% of assessments completed in <15 minutes**
- Beesafe (Vienna Insurance Group): damage assessment in seconds, immediate payment offers

**But photo assessment has limits:**
- Cannot detect hidden damage (frame damage behind bumper)
- Cannot detect pre-existing damage with certainty
- ADAS recalibration needs aren't visible in photos
- Supplemental estimates still frequent (~30-40% of initially photo-assessed claims need supplements ⚠️)

#### Step 2: Estimate Generation — The Estimation Tools Ecosystem

##### 🇺🇸 US: The Big Three

The US motor damage estimation market is dominated by three platforms, all containing vehicle-specific repair databases:

| Platform | Market Share ⚠️ | Owner | Notes |
|----------|----------------|-------|-------|
| **CCC Intelligent Solutions** | ~55-60% (shops: ~80% have CCC) | Public (CCCS) | Dominant. 26 of top 30 US insurers. 300M+ transactions processed. MOTOR database. |
| **Audatex** | ~25% | Solera (Vista Equity) | Global presence. Part of Solera ecosystem. |
| **Mitchell** | ~20% | Enlyte (parent) | Strong in some regional insurers. GM requires certified shops use Mitchell. |

**How they work:**
1. Appraiser identifies damaged parts and repair operations
2. System generates estimate using:
   - OEM-specific parts catalogs (manufacturer pricing for each part)
   - Labor time guides (standardized hours per operation)
   - Paint material calculations
   - Local labor rates
3. Output: **line-item repair estimate** (every part, every operation, every hour)

**What the estimate includes:**
```
MOTOR DAMAGE ESTIMATE (typical structure)
├── Part 1: Front bumper cover — Replace
│   ├── Part cost: $487.00 (OEM)
│   ├── Labor: 2.5 hrs × $55/hr = $137.50
│   └── Paint: included in refinish
├── Part 2: Hood — Repair
│   ├── Labor: 3.0 hrs × $55/hr = $165.00
│   ├── Paint: 2.5 hrs × $55/hr = $137.50
│   └── Materials: $87.50
├── Part 3: Headlight assembly — Replace
│   ├── Part cost: $892.00 (OEM)
│   └── Labor: 0.5 hrs × $55/hr = $27.50
├── ...
├── Subtotal parts: $X
├── Subtotal labor: $Y
├── Subtotal paint/materials: $Z
├── Tax: $T
└── TOTAL ESTIMATE: $X+Y+Z+T
```

**OEM vs Aftermarket vs Used parts:** A key friction point. Insurers often estimate using aftermarket or used (LKQ — Like Kind and Quality) parts to reduce costs. Policyholders and body shops want OEM parts. Some states require OEM parts on newer vehicles. This is a constant negotiation.

##### 🇪🇺 EU: Different Players, Same Concept

| Platform | Primary Markets | Owner | Notes |
|----------|----------------|-------|-------|
| **Audatex** | Pan-European, dominant | Solera | Same parent as US Audatex. Strong in Spain, Italy, Nordics |
| **DAT** | Germany (dominant), Central Europe | Independent | Standard valuation tool in Germany. Used for both repair estimates AND vehicle valuations |
| **GT Motive** | Spain, Portugal, Latin America | Solera (acquired) | Strong in Iberian market. Repair time databases. |
| **Eurotax** | Europe-wide | Solera | Vehicle valuation (market value, residual value). Complementary to Audatex. |
| **Cap HPI** | UK | Solera | UK vehicle data and valuation |

**Key EU difference:** The estimation tools are similar in concept but the **market is more fragmented** by country. A Spanish insurer uses GT Motive; a German insurer uses DAT; a UK insurer might use Audatex. No single tool dominates across all of Europe like CCC does in the US.

**Product opportunity:** A normalization layer that works regardless of which estimation tool is used. Mysa doesn't replace CCC or Audatex — it connects TO them.

#### Step 3: Total Loss Determination — Repair or Replace?

##### 🇺🇸 US: Threshold-Based

A vehicle is declared a **total loss** when repair costs exceed a percentage of the vehicle's **Actual Cash Value (ACV)**.

**Two methods exist:**

| Method | How It Works | States |
|--------|-------------|--------|
| **Total Loss Threshold (TLT)** | Repair cost > X% of ACV = total loss | ~25 states. Threshold typically **70-75%**, ranges 60-100% |
| **Total Loss Formula (TLF)** | Repair cost + salvage value > ACV = total loss | ~25 states |

**Examples:**
- Vehicle ACV: $20,000
- TLT state (75%): If repair > $15,000 → total loss
- TLF state: If repair ($12,000) + salvage ($5,000) > $20,000 → total loss

**Vehicle valuation for ACV:** Determined using comparable vehicle databases:
- CCC's **Market Valuation** tool
- JD Power/NADA guides
- Local comparable sales analysis

##### 🇪🇺 EU: Less Standardized

EU total loss thresholds are **not harmonized** — each country and often each insurer sets their own:

| Country | Approach | Notes ⚠️ |
|---------|----------|----------|
| **UK** | Economic total loss when repair > market value - salvage | No fixed percentage; case-by-case |
| **Germany** | "Wirtschaftlicher Totalschaden" — economic total loss | DAT provides benchmark valuations. Often ~60-70% threshold ⚠️ |
| **France** | "Véhicule économiquement irréparable" | Insurer-specific thresholds |
| **Portugal** | Market value comparison | No mandatory threshold |

**Key EU difference:** More insurer discretion in total loss decisions. Less regulatory prescription than US state-by-state thresholds.

**ADAS impact on total loss rates:** Advanced Driver Assistance Systems (cameras, sensors behind bumpers) are dramatically increasing repair costs. A minor bumper impact that previously cost €500 now costs €2,000-3,000 with ADAS recalibration. Result: **more vehicles being totaled** for what looks like minor damage. This trend is accelerating.

---

### 🏠 Home/Property Assessment (Comparison)

Home/property assessment differs fundamentally from motor:

| Factor | Motor | Home/Property |
|--------|-------|---------------|
| **Primary tool** | CCC/Audatex/Mitchell | **Xactimate** (~50%+ of US property claims, ~80% of adjusters use) |
| **Scope challenge** | Usually visible | **Hidden damage** is the norm (water behind walls, mold, structural) |
| **Assessment method** | Photos + database lookup | **On-site measurement** + line-item pricing |
| **Supplements** | Common (~30-40%) | **Very common** (~50%+ of initial estimates get supplemented) |
| **Standardization** | High (OEM parts catalogs) | Lower (labor varies wildly by region, custom homes) |

**Xactimate dominance:** Verisk (owner) has built the de facto standard for property damage estimation:
- ~50% of US property claims use Xactimate
- ~80% of adjusters and contractors reference Xactimate pricing
- Contains local pricing data (labor rates, material costs by ZIP code)
- Generates detailed line-item estimates like motor tools

**The Supplement Problem (Home-specific):**
```
INITIAL ESTIMATE: $15,000 (visible damage only)
     ↓
Contractor opens wall → finds mold, water damage, structural compromise
     ↓
SUPPLEMENT #1: +$8,000 (hidden water damage)
     ↓
Further tear-out reveals additional damage
     ↓
SUPPLEMENT #2: +$4,000 (structural remediation)
     ↓
FINAL COST: $27,000 (80% over initial estimate)
```

This supplement cycle adds weeks/months and is a major source of policyholder frustration and insurer cost overruns.

---

### Assessment: EU vs US Key Differences

| Factor | 🇪🇺 EU | 🇺🇸 US |
|--------|---------|---------|
| **Who assesses?** | Often the same "expert" who investigates (loss adjuster) | Separate roles: adjuster (investigation) + appraiser (damage) |
| **Estimation tools** | Fragmented by country (Audatex, DAT, GT Motive) | Concentrated (CCC dominates ~55-60%) |
| **Photo assessment adoption** | Growing but varies — Tractable active in EU | Growing fast — GEICO, Admiral Seguros adopting |
| **Total loss thresholds** | Country/insurer-specific, less standardized | State-regulated, 70-75% typical |
| **ADAS impact** | Growing — EU has higher ADAS penetration | Growing — rising repair costs, more total losses |
| **OEM vs aftermarket debate** | Less contentious in some markets | Major friction point, state-regulated |
| **DRP networks** | Less formalized in some EU markets | Highly developed (insurer-approved repair networks) |

### Adjuster vs Appraiser (US-Specific Distinction)

| | **Claims Adjuster** | **Auto Damage Appraiser** |
|---|---|---|
| **Scope** | Entire claim — investigation, liability, coverage, settlement | **Damage valuation only** — what's broken, what it costs |
| **Employer** | Insurer (staff) or independent | Insurer, independent, or body shop |
| **Key skill** | Policy knowledge, interviewing, liability analysis | Vehicle knowledge, estimation software, parts/repair expertise |
| **Licensing** | Required in most states | Required in fewer states (~15 states require separate license) |
| **When involved** | From FNOL to settlement | After investigation → generates estimate → returns to adjuster |
| **Decision authority** | Can approve/deny claims | Can only value damage — no coverage decisions |

**Why this matters for Mysa:** In the US, the appraiser is a distinct user persona from the adjuster. If Mysa targets assessment, the user is the appraiser. If Mysa targets end-to-end, both must be served.

---

### Subrogation Identification During Assessment

**When subrogation is identified:** During assessment, when the insurer determines:
1. The other party is at fault (from investigation)
2. The insurer has paid a first-party claim to their policyholder
3. Recovery from the at-fault party's insurer is possible

**How it happens in assessment:**
- Adjuster/appraiser documents damage → estimates repair cost
- If first-party claim is being paid, the settlement amount becomes the **subrogation demand**
- Insurer's subrogation department files demand against at-fault insurer
- In EU: Convention systems (CIMPAS, IDA, CID) handle this automatically for clear-fault cases
- In US: **Arbitration Forums, Inc.** handles inter-company disputes

**Key data points:**
- US subrogation recovery: **$41.4 billion** recovered annually across all P&C lines
- Average subrogation timeline: **~200 days** from identification to recovery
- **Missed subrogation** (leakage): Industry estimates **10-20% of recoverable dollars are never pursued** ⚠️
- AI-based subrogation identification is a growing space (Shift Technology covers this)

**Mysa opportunity:** If you have structured claim data from intake (who's at fault, what was paid), flagging subrogation opportunities automatically is a high-ROI feature. Every recovered dollar goes straight to the bottom line.

---

### Repair Network Management (DRP)

**DRP = Direct Repair Program** — a network of pre-approved body shops that have agreements with the insurer.

| | With DRP | Without DRP |
|---|---|---|
| **Who chooses the shop?** | Insurer steers to DRP shop | Policyholder chooses their own |
| **Estimate process** | DRP shop writes estimate in insurer's system | Shop writes estimate → insurer reviews → negotiation |
| **Parts** | DRP agreement may specify aftermarket/OEM mix | Shop may quote all OEM → higher cost |
| **Quality** | Insurer monitors repair quality | Less insurer oversight |
| **Speed** | Faster — pre-approved, integrated workflows | Slower — more back-and-forth |

**US DRP adoption:** Most major insurers (State Farm, GEICO, Progressive, Allstate) have DRP networks. ~60-70% of repairable claims go through DRP shops ⚠️.

**EU equivalent:** Varies. UK has repair networks through insurers and TPAs. Continental Europe has insurer-approved repair networks but they're less formalized in some markets.

---

### Assessment Pain Points (Opportunities for Mysa)

#### Pain Point 1: Photo Assessment Accuracy vs Hidden Damage

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Photos miss hidden damage | Initial estimate often underestimates by 20-40% | AI that flags high-probability hidden damage areas based on visible damage patterns |
| Supplement cycle expensive | Each supplement requires re-inspection, re-estimation, re-approval | Predict likely supplements at initial estimate → set better reserves upfront |
| ADAS not visible in photos | Bumper damage may hide $2,000+ of sensor recalibration | AI that identifies ADAS-equipped vehicles and auto-adds recalibration to estimate |

#### Pain Point 2: Estimation Tool Fragmentation

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Different tools per market | CCC in US, DAT in Germany, GT Motive in Spain | Normalization layer that accepts estimate data from ANY tool |
| Insurer ↔ shop tool mismatch | Shop uses Mitchell, insurer uses CCC → translation needed | Bidirectional estimate translation |
| EU cross-border claims | German tourist crashes in Portugal — which estimation tool? | Multi-market estimation handling |

#### Pain Point 3: Total Loss Decision Complexity

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| ACV disputes | Policyholder disagrees with vehicle valuation | Better comp data, transparent valuation methodology |
| ADAS-driven total losses increasing | Minor damage + expensive sensors = total loss | Early total loss prediction from photos before full estimate |
| Salvage value uncertainty | Hard to predict salvage value accurately | Market data integration for real-time salvage pricing |

#### Pain Point 4: OEM vs Aftermarket Parts Negotiation

| Problem | Current State | Opportunity |
|---------|---------------|-------------|
| Policyholder wants OEM | Insurer estimates aftermarket to reduce cost | Transparent parts pricing, automated state-specific compliance |
| State regulations vary | 15+ US states have OEM parts requirements | Automated regulatory compliance per state/country |
| Parts availability delays | OEM parts back-ordered → delays repair | Real-time parts availability checking integrated with estimate |

---

### Assessment: Key Assumptions Logged

| # | Assumption | Status | Notes |
|---|------------|--------|-------|
| A67 | CCC has ~55-60% US motor estimation market share | ⚠️ Based on research | Historical data shows ~56%, current share may differ |
| A68 | ~40-50% of motor claims now assessed via desk/photo review | ⚠️ Estimate | Trending up rapidly due to AI |
| A69 | ~30-40% of photo-assessed claims need supplements for hidden damage | ⚠️ Estimate | Major accuracy limitation |
| A70 | US total loss thresholds typically 70-75% of ACV | ✅ Based on research | Varies by state (60-100% range) |
| A71 | EU total loss thresholds are country/insurer-specific, not harmonized | ⚠️ Based on research | Limited public data on EU thresholds |
| A72 | Xactimate used in ~50%+ of US property claims | ✅ Based on research | Verisk/ISO dominant |
| A73 | ADAS recalibration adding $2,000-3,000+ to minor collision repairs | ⚠️ Based on industry reports | Varies significantly by vehicle/system |
| A74 | Missed subrogation leakage estimated at 10-20% of recoverable dollars | ⚠️ Industry estimate | Hard to measure precisely |
| A75 | DRP shops handle ~60-70% of repairable US motor claims | ⚠️ Estimate | Insurer-steered but not mandatory |
| A76 | Tractable achieving 90% touchless estimates at Admiral Seguros | ✅ Per Tractable/Admiral | Specific to their implementation |
| A77 | ~200 days average subrogation timeline | ⚠️ Based on research | Varies widely by complexity |

---

### Documents/Data Generated During Assessment

| Document | Motor | Home/Property |
|----------|-------|---------------|
| **Primary estimate** | CCC/Audatex/Mitchell line-item estimate | Xactimate line-item estimate |
| **Supplement estimates** | Additional damage found during repair | Additional damage found during remediation |
| **Total loss valuation** | ACV report (comps, mileage, condition) | Replacement cost value (RCV) report |
| **Vehicle inspection report** | Photos + damage notes (appraiser) | Field inspection report + photos (adjuster) |
| **Repair authorization** | Approval to proceed with repairs | Approval to proceed with remediation |
| **Subrogation demand** | If first-party claim with at-fault third party | If neighbor/third party caused damage |
| **Reserve adjustment** | Updated financial reserve based on actual estimate | Updated reserve (often significantly higher than initial) |

---

### Assessment: Actors and Their Roles

| Actor | Motor | Home/Property |
|-------|-------|---------------|
| **Policyholder** | Submits photos, takes vehicle to DRP/chosen shop | Provides access for inspection, gets estimates from contractors |
| **Claims Handler** | Reviews estimate, approves/negotiates, sets reserves | Reviews Xactimate estimate, manages supplements |
| **Appraiser** (US) | Inspects vehicle, generates repair estimate, determines total loss | Field/desk adjuster inspects property, scopes damage in Xactimate |
| **DRP Shop / Body Shop** | May generate or supplement estimate | N/A |
| **Contractor** | N/A | May generate competing estimate for policyholder |
| **TPA** | If delegated: manages assessment process end-to-end | If delegated: assigns adjuster, manages Xactimate workflow |
| **Broker** | **Minimal** — may challenge estimate on client's behalf for high-value claims | **More active** — may engage public adjuster or challenge insurer's scope |

---

### 🔑 Key Strategic Insights for Mysa

1. **Assessment is the most tool-dependent phase.** Unlike investigation (mostly human judgment), assessment relies on specific software (CCC, Audatex, Xactimate). Mysa doesn't compete with these tools — it **complements** them by ensuring the data going INTO them is clean and structured.

2. **Photo-based AI assessment is the fastest-moving area.** Tractable has proven the concept. But photo assessment has a ceiling — hidden damage, ADAS, pre-existing conditions. Mysa could add value by **predicting what photos miss** based on claim context (vehicle type, damage description, historical patterns).

3. **The supplement cycle is a massive cost driver.** Initial underestimates → supplements → delays → increased reserves → policyholder frustration. Better initial data (from Mysa's intake layer) could reduce supplements by flagging likely hidden damage upfront.

4. **Subrogation is low-hanging fruit.** If Mysa has structured data about fault and payment amounts, flagging subrogation opportunities automatically is high-ROI and aligns with the "data layer" positioning.

5. **Assessment and investigation often run in parallel.** Don't assume sequential flow — damage assessment can begin while liability is still being debated. This means Mysa's data layer needs to handle concurrent, evolving data streams.

---

## Phase 9: Decision — Coverage, Liability & Claims Disposition

*Where all prior data converges into actionable decisions. This is where claims get stuck, where money leaks, and where the true value sits. Decisions are where extraction takes minutes but resolution takes days/weeks/months.*

### What is the Decision Phase?

After investigation (Phase 7) establishes WHAT happened and WHO is at fault, and assessment (Phase 8) determines HOW MUCH the damage costs, the Decision phase answers: **"What do we do about it?"**

Seven distinct decisions happen here — often in parallel, not sequentially:

| # | Decision | Question | Who Decides | Automation Today |
|---|----------|----------|-------------|-----------------|
| 1 | **Coverage** | Is this covered under the policy? | Rules engine + handler | 80-90% for clean claims |
| 2 | **Liability** | Who's at fault and what %? | Convention (EU) / adjuster (US) | EU: high (bareme); US: mostly manual |
| 3 | **Reserve** | How much to set aside? | Adjuster + actuarial | PD: mostly automated; BI: mostly manual |
| 4 | **Total Loss vs Repair** | Fix or replace? | Appraiser/handler | Threshold math automated; edge cases manual |
| 5 | **Fraud Referral** | Send to SIU? | Fraud model + handler | Scoring automated; referral decision human |
| 6 | **Subrogation Pursuit** | Pursue recovery? | Handler + subro dept | Identification increasingly automated; pursuit manual |
| 7 | **BI Valuation** | What are injuries worth? | Colossus/ClaimIQ + adjuster | 50-60% (software range); negotiation manual |

---

### Decision 1: Coverage — "Is This Covered?"

#### The Coverage Decision Tree (6 Gates)

Every coverage check follows a cascading logic. Each gate can terminate or branch the claim:

**Gate 1: Policy Status Verification**
- Is the policy active (not lapsed, cancelled, or in grace period)? Premium paid at date of loss?
- **Automation: ~100%** at modern carriers. Guidewire/Duck Creek pulls policy data in real-time.

**Gate 2: Insured Vehicle/Driver Match**
- Is the vehicle on the policy? Is the driver named or covered under "permissive use"?
- **Automation: ~90%** for named insured. Drops to ~50% when permissive use is in question.

**Gate 3: Coverage Applicability**
- Does the policy include the relevant coverage type? (collision, comprehensive, liability, PIP)
- Many US drivers carry only state-minimum liability — if they file first-party and don't have collision, denied.
- **Automation: ~95%.** Straightforward policy lookup.

**Gate 4: Exclusion Screening** — **This is where complexity lives**

| Exclusion | How It Works | Dispute Frequency | Automatable? |
|---|---|---|---|
| **DUI/Drunk Driving** | State-dependent. CA mandates liability still applies even for DUI driver. Other states allow broader denial. | Moderate | Partially — state rules codifiable, proving DUI requires investigation |
| **Unlisted/Excluded Driver** | Specifically excluded by endorsement = denied. Merely unlisted = permissive use may apply. Major gray area. | **High — most common dispute** | Low — requires investigation of permission |
| **Commercial Use** | Personal auto excludes Uber/Lyft/delivery. Rideshare endorsements partially address. | **Growing fast** | Low — requires establishing use at time of accident |
| **Racing/Speed Contests** | Nearly universally excluded. | Low but clear-cut | High — if documented |
| **Intentional Acts** | Deliberately caused damage = denied. Hard to prove. | Low | Very low — judgment call |
| **Vehicle Modification** | Performance mods may void coverage. | Moderate in specialty segments | Low — requires inspection |
| **Lapsed Policy (procedural)** | Disputes about grace periods, payment timing, notification. | Moderate | Medium — procedural rules codifiable |

**Gate 5: Policy Conditions Compliance**
- Timely reporting? Cooperation with investigation? Most policies require "prompt" notice.
- **Automation: Mostly manual.** Assessing "reasonableness" of late reporting is judgment-based.

**Gate 6: Limits & Deductible Application**
- Mathematical. What are the applicable limits and deductible?
- **Automation: ~100%.** Pure math.

#### Net Coverage Automation Assessment

For a **clean, simple auto claim** (active policy, named insured, clear peril, no exclusion triggers): coverage verification is **80-90% automated** at a modern carrier on Guidewire/Duck Creek. For claims with **any ambiguity**, a human is in the loop.

#### Documents/Data Used for Coverage Decision

| Document/Data | Source | When Available | Critical For |
|---|---|---|---|
| Policy declarations page | Policy admin system | Immediately | Gates 1-3, 6 |
| Policy endorsements & exclusions | Policy admin system | Immediately | Gate 4 |
| FNOL report | Policyholder/agent | At intake | All gates |
| Police report | Law enforcement | Delayed (days) | Gate 4 (DUI, commercial use) |
| Driver's license / ID | Policyholder | At intake or delayed | Gate 2 |
| State regulatory requirements | Compliance database | Always available | Gate 4 (state-specific rules) |

#### Coverage Dispute Rates

- Overall auto claim denial rate: **5-15%** (full denial + partial denial + coverage limitation) ⚠️ synthesized, no single authoritative stat
- Most common reasons: lapsed policies, unlisted/excluded drivers, no applicable coverage type, late reporting
- Auto denial rate much lower than home (~42% denial rate) because auto is structurally simpler and often mandatory

#### Insurer-Specific Coverage Rules

**Yes — every insurer has their own coverage rules, and the variation is significant.**

What differs between insurers:
- How strictly they enforce exclusions
- How they interpret "permissive use" (broad vs restrictive vs explicit exclusion)
- Which state-specific endorsements they offer
- Grace period policies
- STP eligibility criteria

Real court cases showing variation in permissive use:
- **State Farm v. GEICO (Virginia, 1991):** Daughter given permission; parents barred lending. Second permittee in accident. Court found coverage existed under State Farm policy.
- **GEICO v. USAA (Virginia, 2011):** First permittee with "general use" has authority to extend permission.
- **Progressive permissive use exclusion:** Progressive's policy excludes permissive users insured through another carrier — unlike most competitors.

Where rules live:

| Platform | Market Share | Notes |
|---|---|---|
| **Guidewire ClaimCenter** | ~24% (dominant) | Rules in Gosu (proprietary) or new Rules Service (low-code). 293 customers, 2.5B+ claims/year |
| **Duck Creek Claims** | ~3.3% (growing) | Drag-and-drop Configuration Console. Non-technical. |
| **Custom/Legacy (COBOL)** | Large installed base | Still alive at many Tier 1 carriers |
| **Spreadsheets & tribal knowledge** | Widespread in small/mid | Rules literally in Excel and adjusters' heads |

#### Could We Automate Insurer-Specific Coverage Rules?

**Extremely hard at full fidelity. Achievable at "good enough" for specific use cases.**

Why hard: Rules are proprietary trade secrets, vary by state (50+ variations), change frequently, reference data from inaccessible systems, partially tribal knowledge.

Why achievable: **80/20 rule applies** — a small number of rules handle the vast majority of claims. Industry standards (ISO loss codes, NAIC regs, state minimums) provide a shared baseline. Carriers want help — they're frustrated by their own complexity.

---

### Decision 2: Liability — "Who's at Fault and What %?"

#### This is the decision that differs MOST between EU and US.

#### 🇪🇺 EU: Convention Systems (Pre-Computed Liability)

EU convention countries have **solved liability determination at an industry level** through standardized lookup tables. This is not AI — it's **50-year-old rules-based decisioning**.

##### France — IDA/IRSA Convention (est. 1968)

**The bareme (fault lookup table):** 13 numbered accident cases organized into 4 classes:

| Class | Cases | Examples |
|---|---|---|
| **1: Same direction** | 10, 13, 15, 17 | Rear-end (100% rear), lateral same lane (50/50), lane change (100% changer) |
| **2: Opposite direction** | 20, 21 | Encroachment (100% encroacher), mutual encroachment (50/50) |
| **3: Different roadways** | 30, 31 | Intersection collision (priority rules), turning collision |
| **4: Stationary** | 40, 43, 51 | Hit parked car (100% mover), illegally parked (shared), exiting parking (100% exiter) |

**Critical design rules:**
- Only outputs **0%, 50%, or 100%** fault. No 30/70 or 20/80 splits.
- Only uses **objective elements**: vehicle position, direction, impact points.
- **Deliberately excludes**: speed, intoxication, lighting, tire wear, traffic violations, signaling.
- Not legally binding on the insured — only governs inter-insurer recourse.

**Inputs needed (from the EAS):**
- 17 circumstance checkboxes (parked, leaving parking, entering roundabout, overtaking, turning, etc.)
- Points of impact on vehicle silhouette diagrams
- Sketch of accident scene
- Road type

**Coverage:** ~80% of French material-damage motor claims. Companion IRCA convention handles ~90% of bodily injury (permanent disability ≤ 5%).

**Inter-insurer economics (forfait):**

| Damage Amount | Settlement Method | Amount |
|---|---|---|
| < EUR 6,500 | Forfait (flat-rate) | Up to **EUR 2,030** (2025-2026) |
| < EUR 6,500 shared liability | Reduced forfait | **EUR 850** |
| > EUR 6,500 | Actual damages | Full verified amount |

**Automation level: HIGH.** e-constat auto app digitizes EAS input, feeds directly into insurer systems. Bareme lookup is trivially automatable. Challenge is edge cases and ambiguous sketches.

##### Italy — CARD Convention (mandatory since 2007)

- Victim deals with **own insurer** (direct compensation)
- CONSAP clearing house handles inter-insurer payments
- Forfait: ~EUR 1,700 flat (regardless of actual damages)
- Eligibility: max 2 vehicles, permanent disability ≤ 9%, valid Italian/EU plates
- **Italy does NOT have a codified fault lookup table like France** — liability is less deterministic
- Automation level: **MEDIUM-HIGH** for eligibility; **MEDIUM** for liability

##### Portugal — IDS (direct compensation protocol)

**Performance stats (2024):**

| Metric | Value |
|---|---|
| Claims opened | 209,775 |
| Total paid | EUR 267,210,294 |
| Average cost/claim | EUR 1,448 |
| Agreement rate | **91%** |
| Average time to decision | **1.94 days** |

Eligibility: max 2 vehicles, no bodily injury, damage ≤ EUR 15,000. CIMPAS arbitration as backstop for ~9% that can't agree.

##### Spain — CIDE/ASCIDE/CICOS

**CICOS is already a centralized computer system** connecting all participating insurers. Resolves **70-83% of all motor claims** (2.5M+ per year). Includes codified **Tabla de Culpabilidad** (culpability table). Arguably the most digitally integrated convention system in Europe.

##### Germany & UK — No Convention System

Both use adversarial, case-by-case liability determination (structurally similar to US). Germany's Haftungsquote allows any fault percentage. UK's historical knock-for-knock agreements largely abandoned.

##### Could We Build a Universal Convention Lookup Engine?

**Technically feasible with significant caveats.**

What's needed:
- Licensed access to convention texts (IRSA, CARD, CIDE/ASCIDE, IDS) — **proprietary to national insurer associations**
- EAS form data in structured format (e-constat exists for France)
- Country-specific eligibility rules
- Bareme/fault tables per country

Estimate: **~60-70% of EAS checkbox combinations** map cleanly to a deterministic fault outcome. The remaining 30-40% require human interpretation ⚠️.

**No single platform currently spans all EU markets as a universal lookup engine.** Spain's CICOS is the closest but Spain-only.

#### 🇺🇸 US: Adversarial, Case-by-Case

**Three negligence regimes:**

| Regime | States | Rule | Impact |
|---|---|---|---|
| **Pure Contributory** | AL, MD, NC, VA + DC | Any fault (even 1%) = zero recovery | 4 states + DC. Harsh. |
| **Pure Comparative** | 13 states (CA, NY, FL, etc.) | Recovery reduced by fault %. Even 99% at fault can recover 1%. | Most plaintiff-friendly |
| **Modified Comparative** | 33 states | Cannot recover if ≥50% or ≥51% at fault (varies) | Most common |

**How fault is determined (US):**
1. Police report (if available) — provides initial indication but not binding
2. Adjuster investigation — interviews, photos, scene evidence
3. Accident reconstruction (complex/disputed)
4. **No standardized lookup table** — adjuster judgment, informed by state law
5. If disputed: negotiation → Arbitration Forums, Inc. → litigation

**Automation level: LOW.** Liability determination in the US is mostly human judgment. Shift Technology now "evaluates" liability but no one auto-decides for multi-party claims.

#### Documents/Data for Liability Decision

| Document/Data | EU Convention | US |
|---|---|---|
| **European Accident Statement** | PRIMARY — checkboxes map to bareme | N/A (no US equivalent) |
| **Police report** | Secondary (not needed for convention) | Primary starting point |
| **Witness statements** | For edge cases | Critical for disputed liability |
| **Photos/video** | Supporting | Supporting |
| **Dash cam footage** | Growing | Growing |
| **Accident reconstruction** | Rarely needed | For complex/fatal |
| **State negligence law** | Country convention rules | 50+ state variations |

---

### Decision 3: Reserves — "How Much Should We Set Aside?"

#### Four Methods in Practice

| Method | How It Works | Automation | Accuracy | Used For |
|---|---|---|---|---|
| **Tabular/Average** | Lookup table by claim type, severity, geography. "Rear-end, moderate, Texas = $4,500" | **Fully automated** at modern carriers | Reasonable for PD | Auto Physical Damage |
| **Formula** | Computed from claim characteristics. PD: estimate + rental + depreciation. BI: multiplier of medical specials | **Partially automated** — needs input data | Moderate | PD + simple BI |
| **Individual Case Estimate (ICE)** | Adjuster reviews facts, sets reserve based on professional judgment | **Manual** | Varies wildly by adjuster | Complex BI, high-value |
| **AI/ML-Assisted** | GBM, XGBoost, neural nets predict ultimate cost. Random Forest achieving AUC 0.94 for high-cost claims | **Emerging** — used as suggestion, adjuster overrides | Better than traditional | Pilot programs |

**Key problem: "Stair-stepping"** — adjuster sets low initial reserve, raises incrementally as claim develops, rather than setting adequate reserve from day one. This pattern varies dramatically by insurer culture.

#### Data Inputs for Reserve Setting

| Input | Available at FNOL? | Impact |
|---|---|---|
| Claim type (collision, comp, liability, PIP) | Yes | Primary driver |
| Vehicle year/make/model | Yes | Repair vs total loss threshold |
| Damage severity description | Partially | High impact but low accuracy at FNOL |
| Photos | Sometimes | Increasingly used for AI estimation |
| Police report | Delayed (days) | Informs liability and severity |
| Injury reported? (Y/N) | Yes | **Massively increases reserve** |
| Medical records | Delayed (weeks/months) | Drives BI reserve |
| Attorney involvement | Delayed | **Increases reserve 2-5x** |
| Geographic jurisdiction | Yes | Some jurisdictions have much higher verdicts |
| Prior claim history | Yes | Flags fraud/over-claiming |

#### Reserve Accuracy

| Claim Type | Initial Reserve Accuracy | Notes |
|---|---|---|
| **Auto Physical Damage** | **±10-20%** variability | Short-tail, observable, CCC/Mitchell benchmarks |
| **Auto Bodily Injury** | **±30-50%+** variability | Long-tail, medical evolves, litigation changes everything |

#### Financial Impact

- **Claims leakage** (paying more than should be paid): estimated **$67 billion/year** in US (conservative: 5-10% of total claims; aggressive: 20-30%) ⚠️
- Under-reserving: understates liabilities, hits earnings, regulators may intervene, can threaten solvency
- Over-reserving: depresses earnings, ties up capital unnecessarily

#### Insurer Reserve Customization

Every insurer configures reserve rules differently in Guidewire/Duck Creek:
- **Default reserve amounts** per claim type are insurer-specific
- **Segmentation rules** that drive reserve defaults are entirely custom
- **Loss development factors** calculated from each insurer's own triangle data
- Two carriers on the same Guidewire version can have **completely different reserve rules**

A 2024 Guernsey GFSC thematic review found firms use a "range of approaches" to IBNR, from appointing actuaries to using simplified multiples.

**Variation score: VERY HIGH.** Reserve setting is one of the most customized decision areas across insurers.

---

### Decision 4: Total Loss vs Repair — "Fix or Replace?"

(Assessment phase valued the damage. Here the **decision** is finalized.)

#### The Decision Logic

```
IF repair_cost > threshold × ACV → TOTAL LOSS
ELSE → REPAIRABLE
```

**US:** State-regulated. Two methods:
- **Total Loss Threshold (TLT):** ~25 states. Repair cost > X% of ACV = total loss. Typically 70-75% (ranges 60-100%).
- **Total Loss Formula (TLF):** ~25 states. Repair cost + salvage value > ACV = total loss.

**EU:** Country/insurer-specific, not harmonized. More insurer discretion.

#### Do Insurers Set Their Own Thresholds?

**Yes, routinely.** Insurers can and do total vehicles below the state threshold:
- Internal thresholds range from **51% to 80%** regardless of state ceiling ⚠️
- Avoids diminished value liability
- Reduces cycle time
- Manages repair quality risk

#### The ACV Valuation Scandal (Alameda County, 2024)

The **Alameda County DA lawsuit** names USAA, Progressive, CCC, and Mitchell, alleging:
- CCC and Mitchell develop **"customized" valuation software for each insurer** — the methodology page literally changes per insurer
- Insurers spend **$500K-$600K/year** on software "unique to that customer"
- Custom versions use **exclusive matrices of comparable vehicles and condition adjustments** available only to that insurer
- Average alleged underpayment: **$3,000-$4,000 per total loss claim** in California
- Aggregate underpayment estimated in **billions of dollars** ⚠️ allegations, unproven

**This means:** Two people with identical totaled cars, insured by different companies, can receive materially different ACV payouts — not because the car is different, but because the valuation software is configured differently.

**Variation score: VERY HIGH for ACV valuation. MODERATE for total loss threshold itself** (state law constrains range).

---

### Decision 5: Fraud Referral — "Send to SIU?"

#### How Fraud Scoring Works

| Stage | What Happens | Technology |
|---|---|---|
| **Automated scoring** | Every claim scored against hundreds of fraud scenarios at FNOL/triage | Shift Technology (dominant), FRISS, SAS |
| **Flag threshold** | Claims above score threshold flagged for review | Configurable per insurer |
| **Handler review** | Claims handler reviews flags, decides whether to refer to SIU | **Human judgment** |
| **SIU investigation** | Special Investigations Unit conducts full investigation | Manual, specialized |
| **Decision** | Deny claim, refer to law enforcement, or clear | **Human** |

#### Key Numbers

| Metric | Value |
|---|---|
| Insurance fraud cost (US) | ~$80B+ annually across all lines ⚠️ |
| Shift Technology alert acceptance | **69% of alerts accepted** for investigation (high precision) |
| False positive rate | ⚠️ ~31% of AI flags dismissed after human review (69% accepted) |
| Impact on cycle time | Fraud-flagged claims take **2-3x longer**, even if legitimate |
| SIU referral rate | ~2-3% of all claims (weighted average) ⚠️ |

#### Fraud Threshold Variation Between Insurers

| SIU Posture | Characteristics | Referral Rate |
|---|---|---|
| **Aggressive** | Large dedicated SIU, low thresholds, Shift/FRISS analytics, pursue prosecution | >3% of claims |
| **Moderate** | SIU exists, investigates high-value referrals only | 1-3% |
| **Passive** | Compliance-only SIU, rarely investigates, writes off suspected fraud | <1% |

- **More than one-third of SIUs receive less than 1% of new claims as referrals**
- SIUs reject **25% of all referrals** on average
- **22% of SIUs accept less than half** of referrals; **39% accept more than 90%**
- ROI: **$10 recovered for every $1 spent** on SIU ⚠️ industry benchmark
- One insurer: **$21M fraud savings in 2 years** after deploying analytics, fraud savings per investigator up from $550K to $2M

#### Documents/Data for Fraud Decision

| Data Point | Source | Use |
|---|---|---|
| Claims history (frequency, pattern) | Internal + NICB databases | Red flag scoring |
| Claimant behavior (late reporting, evasive) | Adjuster notes | Pattern detection |
| Medical billing patterns | BI claims | Detect padding/upcoding |
| Photo metadata (timestamps, GPS) | Submitted photos | Detect staging/manipulation |
| Social media | Open source | Contradicts injury claims |
| Policy inception date vs claim date | Policy system | New policy + immediate claim = flag |

**Variation score: VERY HIGH.** Fraud detection approach driven by economic philosophy more than regulation. Regulatory floor is low — states require having SIU, not having an effective one.

---

### Decision 6: Subrogation Pursuit — "Go After Recovery?"

#### The Decision

When the insurer pays a first-party claim and a third party is at fault, the insurer can pursue **subrogation** — recovering what they paid.

#### Cost-Benefit Threshold

| Approach | Threshold | Who |
|---|---|---|
| **Pursue everything** | $0+ (including deductible reimbursement) | Large carriers with dedicated subro teams |
| **Cost-effective threshold** | ~$500-$2,000 | Mid-size carriers |
| **High-value only** | $2,500-$5,000+ | Small carriers |
| **Outsource entirely** | Varies by vendor | Carriers using ISG, Crawford (25-33% contingency fee) |

#### Key Numbers

| Metric | Value |
|---|---|
| US subrogation recovery | **$51.6B** annually (2021, up 144% from $12.8B in 1996) |
| Missed subrogation | **$15B+** annually — recoverable dollars never pursued ⚠️ |
| Average subrogation timeline | **~200 days** from identification to recovery |
| Proactive carriers | Recover **12-25% of paid losses** through subrogation |
| Recovery rate (straightforward) | 80-100% of recoverable costs |
| Recovery rate (contested) | 50-75% |
| EU convention advantage | Forfait eliminates pursuit decision for small claims — recovery automatic |

#### Subrogation Automation

- **Identification** increasingly automated (CCC Safekeep, Shift Technology) — CCC uses AI to score, prioritize, and auto-package evidence per **insurer-specific parameters**
- **Pursuit decision** still mostly manual — cost-benefit judgment
- **EU advantage**: Convention forfait eliminates pursuit decision entirely for small claims

**Variation score: HIGH.** Range between aggressive and passive subrogation programs is enormous.

---

### Decision 7: Bodily Injury Valuation — "What Are the Injuries Worth?"

*This is arguably the single highest-value decision in motor claims. BI is ~20-30% of claims by count but ~60-70% by cost.*

#### The Dominant Tool: Colossus (DXC Technology)

**Age:** ~37 years old (originated Australia 1988, commercialized in US by CSC mid-1990s).
**Architecture:** Rules-based expert system. NOT machine learning.
**Market share:** >70% of US insurers use Colossus or similar. Processes >50% of all US insurance claims. ⚠️ widely cited but source unclear
**Known users:** Allstate, Farmers, MetLife, USAA, Hartford, Erie, Nationwide, CNA, Travelers

**How it works:** 10,720 rules + ~750 injury codes → severity score → dollar range

##### Colossus Inputs (What the Adjuster Enters)

| Input Category | Specific Data Points |
|---|---|
| **Injury identification** | Body part(s), diagnosis, injury type (fracture, sprain, TBI), ICD codes |
| **Injury classification** | Demonstrable (visible on imaging — higher severity) vs non-demonstrable (soft tissue — lower severity) |
| **Treatment** | Type (ER, surgery, PT, chiropractic), duration (<90 or >90 days), frequency, intensity |
| **Hospitalization** | Whether hospitalized, duration |
| **Immobilization** | Casts, braces, traction, duration |
| **Complications** | Post-treatment complications, re-injuries |
| **Prognosis** | A-Undetermined; B-No treatment/no complaints; C-Complaints/no treatment; D-Complaints/treatment recommended; E-Guarded |
| **Permanency** | Permanent impairment rating (significant value driver) |
| **Pre-existing** | Prior injuries to same body part, degenerative conditions |
| **Age** | Claimant's age |
| **Medical costs** | Total medical specials (bills) |
| **Lost wages** | Documented income loss |
| **Jurisdiction** | Court jurisdiction (plaintiff-friendly venues get higher ranges) |
| **Attorney** | Whether represented; reportedly attorney's reputation/trial willingness |

##### Colossus Output: Range, Not Single Number

- Outputs **"Colossus Low"** and **"Colossus High"** — the acceptable settlement corridor
- Low end typically ~20% below central estimate
- **Inexperienced adjusters** restricted to low end or given zero deviation
- **Senior adjusters** get latitude across full range
- Settling above Colossus High requires **supervisor approval** — strictly enforced at most carriers
- CSC/DXC marketing reportedly boasted the system would **"immediately reduce BI claims by up to 20 percent"**

##### How Each Insurer Runs a DIFFERENT Colossus

**Two identical claims at two different insurers produce different settlement ranges.**

The "tuning" process:
1. Insurer selects a set of **previously settled claims** in a region
2. Those settlement/trial values become the **baseline**
3. Colossus derives ranges for similar claims based on this baseline

**What varies between insurers:**

| Configuration Lever | Example |
|---|---|
| **Baseline dollar values** | Severity-to-dollar conversion entirely insurer-specific |
| **Injury weights** | Erie scores radiating pain, nausea, vision impairment, neurosis, depression more severely than Farmers ⚠️ |
| **Geographic adjustments** | Plaintiff-friendly venues get higher ranges |
| **Flat percentage cuts** | Insurers can reduce ALL values by 5-20% across the board |
| **Override policies** | Allstate: nearly zero discretion. Travelers: significantly more adjuster weight. |

##### The Allstate/McKinsey Scandal

**1992:** Allstate hires McKinsey. McKinsey frames claims as a "zero-sum economic game."

**McKinsey's "Deny, Delay, Defend" strategy:**
- **"Good Hands"** for policyholders who accept low offers
- **"Boxing Gloves"** for those who fight — aggressively litigate
- **"Alligator approach"** — sit and wait on payments
- **MIST claims** (Minor Impact Soft Tissue) — treat with extreme skepticism

**1995:** Allstate implements Colossus with McKinsey strategy. Removes adjuster discretion.

**Financial results:** Income soared **thirtyfold** — from ~$82M/year to ~$2.5B/year. Amount paid per premium dollar: **69 cents → 43.5 cents.**

**2008-2010:** NAIC 18-month multistate market conduct examination. Found inconsistencies in Colossus oversight, non-uniform tuning across regions.

**2010 settlement:** Allstate pays **$10M to 45 states**. Required to: notify claimants Colossus may be used, enhance tuning oversight, strengthen auditing, consolidate BI claims handling manual.

McKinsey documents revealed in litigation, documented in David Berardinelli's 2008 book *"From Good Hands to Boxing Gloves."*

##### Insurer Reputation Spectrum (BI Claims)

| Insurer | Approach | Notes |
|---|---|---|
| **Progressive** | Most aggressive lowballer | "Holds the title for being the most aggressive" ⚠️ per legal practitioners |
| **Allstate** | Aggressive | Pioneer of McKinsey strategy; wedded to Colossus output |
| **GEICO** | Low initial offers | High adjuster caseloads; first offers reportedly <30% of eventual settlement |
| **State Farm** | Tough pre-suit | "Not getting a good offer before filing suit in 90% of cases" ⚠️ |
| **Farmers** | Moderate | Uses Colossus but less aggressive |
| **Nationwide** | Middle ground | Standard Colossus approach |
| **Erie** | Varies | Scores certain symptoms more severely than peers |
| **Travelers** | More adjuster discretion | Gives Colossus results less weight |
| **USAA** | Most reasonable | Better reputation; uses Colossus with more flexibility |

##### BI Valuation Competitors

| System | Approach | Key Difference | Market |
|---|---|---|---|
| **Colossus (DXC)** | Rules-based, 10,720 rules, ~750 codes | Dominant but 37 years old. Static rules, doesn't learn. | >50% US claims |
| **ClaimIQ (Mitchell/Enlyte)** | Workflow + evaluation. Liability + medical review + general damages. | Includes **comparative negligence assessment** (Colossus doesn't). 5% avg liability reduction = **$9.8M per 10K exposures**. 40% cycle time improvement. | Growing, strong #2 |
| **Claims Outcome Advisor (Verisk/ISO)** | Analytics/statistical. **18,000 medical conditions** (vs Colossus ~750). | Compares to insurer's own settled claims database. Insurers saved **9.8% per severity point**. "Know your opponent" attorney analytics. | Smaller share, modern |
| **ICE (Broadridge)** | Evaluation-based | Less documented | Niche |

##### Attorney Impact on BI Settlements

| Metric | With Attorney | Without Attorney |
|---|---|---|
| Average settlement | **$77,600** | **$17,600** |
| Settlement rate | **91%** received settlement | **51%** received settlement |
| Net after fees (33-40%) | ~$46,500-$52,000 | $17,600 |

Some plaintiff attorneys use tools like **Settlement Intelligence** that reverse-engineer Colossus inputs to craft demand letters triggering higher severity scores.

##### BI Multiplier Formulas

```
General Damages = Medical Specials × Multiplier
Total Claim Value = General Damages + Lost Wages + Out-of-Pocket
```

| Injury Severity | Typical Multiplier |
|---|---|
| Minor (soft tissue, full recovery) | 1.5 - 2x |
| Moderate (fractures, significant PT) | 2 - 3x |
| Serious (surgery, long recovery) | 3 - 4x |
| Severe (permanent impairment, TBI) | 4 - 5x |
| Catastrophic (paralysis, amputation, death) | 5 - 10x+ |

Multipliers are starting points for negotiation, not outcomes. Colossus doesn't use simple multipliers — its 10,720 rules are more complex.

##### BI Claim Cycle Times

| Scenario | Duration |
|---|---|
| Simple BI, no attorney | 3-6 months |
| Moderate BI, attorney, pre-suit | 7-12 months |
| Serious BI, litigation | 1-3 years |
| Catastrophic | 2-5+ years |
| **Average (all settled)** | **~7 months** |

##### Colossus Limitations (= Mysa Opportunities)

| Limitation | Detail | Opportunity |
|---|---|---|
| **Garbage in, garbage out** | Output only as good as what adjuster enters | NLP/AI that auto-extracts injuries from medical records |
| **Rules-based, not learning** | 10,720 static rules, doesn't learn from outcomes | ML model that calibrates to actual outcomes |
| **Undervalues soft tissue** | Built-in bias against non-demonstrable injuries | More nuanced severity modeling |
| **No unique circumstances** | Musician with hand injury = office worker | Context-aware valuation |
| **Tuning manipulation** | Insurers control baseline, can systematically lower values | Transparent, auditable valuation |
| **37 years old** | Legacy architecture | Modern, API-first |
| **No trial risk modeling** | Doesn't model jury verdict probability distribution | Predictive verdict analytics |

---

### Authority Levels & Escalation

#### Typical Authority Matrix (Mid-to-Large US Auto Insurer)

| Role | Settlement Authority | Reserve Authority |
|---|---|---|
| **Junior Adjuster** | Up to $5K-$10K | Up to $10K-$15K |
| **Experienced Staff Adjuster** | Up to $15K-$25K | Up to $25K-$50K |
| **Senior Adjuster / Team Lead** | Up to $25K-$50K | Up to $50K-$100K |
| **Claims Supervisor** | Up to $50K-$100K | Up to $100K-$250K |
| **Claims Director** | Up to $100K-$250K | Up to $250K-$500K |
| **VP of Claims** | Up to $250K-$500K | Up to $500K-$1M |
| **CCO / Reserve Committee** | Above $500K-$1M | Above $1M |

⚠️ Ranges synthesized. Actual thresholds vary enormously. One large US auto insurer reportedly cut higher-level authority from $100K to $10K.

#### Escalation Triggers (Beyond Dollar Thresholds)

- Bodily injury → always escalated
- Fatality → immediately to senior management + legal
- Fraud indicators → SIU
- Coverage dispute → coverage counsel
- Attorney involvement → litigation handler
- Regulatory/media sensitivity → executive
- Large loss (>$100K-$750K) → complex claims unit

#### Documents Required at Each Level

- **Junior adjuster:** Estimate, photos, police report, coverage confirmation
- **Senior/Supervisor:** + written reserve justification, investigation summary, medical records (if BI)
- **Director/VP:** + formal reserve memo, actuarial input, legal opinion (if coverage question)
- **Committee/Board:** Full file review, actuarial reserve opinion, legal brief, possible reinsurance notification

---

### Decision Support Technology Landscape

#### The Layer Cake

| Layer | What | Key Players |
|---|---|---|
| **Core CMS** (system of record) | Workflow, rules, tasks, financials | Guidewire ClaimCenter (~24%), Duck Creek (~3.3%), Majesco, COBOL legacy |
| **Damage Estimation** | Repair cost, total loss valuation | CCC (~55-60% US), Mitchell, Audatex, Tractable, Snapsheet |
| **BI Valuation** | Pain & suffering scoring | **Colossus** (10,720 rules, ~750 codes), Mitchell ClaimIQ, Verisk COA (18,000 conditions) |
| **Business Rules Engines** | Configurable decision logic | Guidewire Rules Service/Gosu, Duck Creek Config Console, IBM ODM, InRule, FICO Blaze |
| **Fraud Detection** | AI scoring, pattern detection | Shift Technology, FRISS, SAS, NICB database |
| **Manual/Judgment** | Still enormous | Adjusters, supervisors, coverage counsel, actuaries |

**McKinsey: 50%+ of claims activities automatable by 2030.** But as of 2025-2026, industry is early. "82% of insurers integrated AI" stat is misleading — most is narrow (photo assessment, fraud scoring), not end-to-end decisioning.

---

### Competitor Automation on the Decision Front

#### Summary Matrix: Who Can Decide What?

| Competitor | Coverage | Liability | Reserves | Total Loss | Fraud | Subrogation | BI Valuation | STP Claimed |
|---|---|---|---|---|---|---|---|---|
| **Five Sigma** | **YES (decides)** | No | **YES (calculates)** | No | No | No | No | Not disclosed |
| **Shift Technology** | Evaluates (new) | Evaluates (new) | No | No | **YES (core)** | **YES (detects)** | No | 60% (early adopters) |
| **Sprout.ai** | **YES (decides)** | No | No | No | Flags | No | No | **~70% STP** |
| **Tractable** | No | No | No | **YES (classifies)** | No | No | No | 90% (1 case) |
| **omni:us** | **YES (via catalog)** | Limited | Implied | No | Implied | No | No | 50-70% no-touch |
| **CCC** | No | No | No | **YES (valuates)** | No | **YES (Safekeep)** | No | Not disclosed |
| **Guidewire** | Via rules only | Predicts likelihood | Predicts severity | No | Via partners | Predicts likelihood | No | Not disclosed |
| **Duck Creek** | Via rules only | No | No | No | Via partners | No | No | Not disclosed |
| **Snapsheet** | No | No | No | **YES (valuates)** | Via partners | No | No | Not disclosed |
| **Colossus (DXC)** | No | No | No | No | No | No | **YES (dominant)** | N/A |
| **ClaimIQ (Mitchell)** | No | **Partial (comparative neg.)** | No | No | No | No | **YES** | N/A |
| **COA (Verisk)** | No | No | **YES (Reserve Manager)** | No | No | No | **YES** | N/A |

**Key competitive insights:**

1. **No one does it all.** Zero competitors automate all 7 decisions. Market is fragmented point solutions.
2. **Coverage decisioning is the least crowded high-value space.** Only Five Sigma, Sprout.ai, omni:us.
3. **Liability determination is nearly untouched.** Hardest problem, biggest gap. Mitchell ClaimIQ has partial comparative negligence — nobody else.
4. **BI valuation is dominated by a 37-year-old system** (Colossus) ripe for disruption.
5. **Damage estimation/total loss well-served.** Tractable, CCC, Snapsheet. Competitive, commoditizing.
6. **Fraud dominated by Shift Technology.** Deep moat.
7. **Platform vendors (Guidewire, Duck Creek) provide infrastructure, not intelligence.**
8. **STP claims require skepticism.** Always ask "STP of WHAT?" — Roots' 99% is mailroom letters. Sprout's 70% is most credible.
9. **Agentic AI wave (2025-2026)** — Shift, Five Sigma, Duck Creek, omni:us all launching. Moving from recommendations → autonomous decisions, but mostly pre-GA.

---

### STP: The North Star and Its Ceiling

#### Current STP Rates

| Segment | STP Rate | Notes |
|---|---|---|
| **Industry average (all auto)** | **7-10%** | Datos Insights 2023 |
| **Glass-only** | ~100% | Safelite handles end-to-end |
| **CCC Estimate-STP** | 15 insurers (~50% US volume) | Estimation STP, not full-claim STP |
| **Theoretically STP-eligible** | **25-35%** | Simple PD, glass, parking, single-vehicle |
| **Total US auto claims/year** | ~16-20 million | |

#### STP Eligibility Gates (All Must Pass)

1. Policy active, paid-up
2. Named insured or clearly permissive driver
3. Single vehicle or clear liability
4. No bodily injury
5. Damage below threshold ($5K-$10K)
6. No fraud indicators
7. No prior related claims
8. Photos/documentation sufficient
9. Within DRP network
10. No litigation/attorney
11. No subrogation complexity

#### STP Barriers

| Barrier | Detail |
|---|---|
| **BI complexity** | Unsuitable for STP. 20-30% of claims by count, 60-70% by cost. |
| **Liability ambiguity** | Multi-vehicle, conflicting accounts |
| **Legacy tech** | COBOL carriers can't do modern STP |
| **Regulatory requirements** | State-mandated procedures |
| **Fraud risk** | Even small fraud in STP stream is very costly |
| **Data quality at FNOL** | Incomplete, ambiguous, unstructured |
| **Organizational resistance** | Adjusters resist automation |
| **Trust in AI** | Carriers and regulators not comfortable yet |

#### STP Opportunity Sizing

- Currently STP'd: ~1.1-2.0M claims/year (7-10% of 16-20M)
- Theoretically eligible: ~4-7M claims/year (25-35%)
- Cost saving per claim (manual → STP): ~$40-60, plus 50-70% cycle time reduction
- **Gap: ~3-5M claims/year that COULD be automated but aren't**

---

### The Tribal Knowledge Crisis

#### How Much Decision-Making Is Undocumented?

| Decision Type | % In Systems | % Written Guidelines | % Tribal/Experiential |
|---|---|---|---|
| **Coverage determination** | 30-40% | 20-30% | **30-50%** |
| **Reserve setting** | 10-30% | 10-20% | **50-80%** |
| **Fraud referral** | 20-40% | 10-20% | **40-70%** |
| **Subrogation pursuit** | 30-50% | 20-30% | **20-50%** |
| **BI settlement negotiation** | 5-10% | 10-20% | **70-85%** |

⚠️ All percentages are estimates. **The most judgment-intensive decisions are the least documented.**

#### The Retirement Wave

- US insurance sector projected to **lose ~400,000 workers by 2026** (BLS)
- **25% of all claim adjusters predicted to retire within 5 years**
- **21,500 job vacancies/year** projected over next decade
- New hires cannot keep pace with departures
- Swiss Re SONAR 2025: workforce shortages identified as emerging risk

#### What Happens When Experienced Adjusters Leave

- Carriers lose institutional memory about unusual claim types
- Tribal knowledge about local shops, medical providers, legal environments walks out the door
- New adjusters: more errors, less accurate reserves, missed subrogation, longer cycle times
- **Most carriers have NOT systematically captured this knowledge**
- Some carriers invested in knowledge management (n2uitive, others) but most rely on organic mentoring

#### Time to Full Adjuster Productivity

| Claim Type | Time |
|---|---|
| Basic auto PD | 3-6 months |
| Complex auto BI | 12-18 months |
| Complex commercial/specialty | 2-3+ years |

---

### Insurer-Specific Decision Variation Heatmap

| Decision Type | Regulatory Constraint | System Config | Adjuster Discretion | **Overall Variation** |
|---|---|---|---|---|
| **Reserve setting** | Low (must be adequate) | HIGH | VERY HIGH | **VERY HIGH** |
| **BI settlement** | Low (good faith) | MODERATE (Colossus) | VERY HIGH | **VERY HIGH** |
| **Fraud detection** | Low (must have SIU) | HIGH | HIGH | **VERY HIGH** |
| **Total loss / ACV** | MODERATE (state ceiling) | HIGH (tools customized) | MODERATE | **HIGH** |
| **Subrogation pursuit** | Low (right, no duty) | HIGH | MODERATE | **HIGH** |
| **Coverage interpretation** | MODERATE (policy language) | LOW | HIGH | **HIGH** |

**Three layers of variation exist:**
1. **Policy layer:** Different policy language and endorsements
2. **System configuration layer:** Guidewire, Duck Creek, CCC, Mitchell, Colossus all configured differently per carrier
3. **Human judgment layer:** Adjuster discretion, tribal knowledge, insurer culture

**Layer 3 is the biggest and least documented.** This is both a challenge (hard to standardize) and an opportunity (whoever captures and systematizes this knowledge creates a moat).

---

### Automation Feasibility Assessment (Per Decision)

| Decision | Current | Feasible Near-Term | Ceiling | Key Barrier |
|---|---|---|---|---|
| **Coverage (clean)** | 80-90% | **95%+** | ~95% | Ambiguous exclusions |
| **Coverage (disputed)** | ~20% | 40-50% | ~50% | Requires investigation |
| **Liability (EU convention)** | 60-70% | **90%+** | ~90% | Sketches, edge cases |
| **Liability (US)** | ~10% | 30-40% | ~40% | No standardized framework |
| **Reserve (PD)** | 70-80% | **90%+** | ~95% | Already largely automated |
| **Reserve (BI)** | 20-30% | 50-60% | ~60% | Long-tail uncertainty |
| **Total loss math** | ~90% | **95%+** | ~98% | ACV disputes |
| **Fraud scoring** | 60-70% | 80-85% | ~85% | Precision/recall tradeoff |
| **Fraud referral** | ~10% | 30-40% | ~50% | Cost-benefit judgment |
| **Subro identification** | 40-50% | **80%+** | ~90% | Data quality |
| **Subro pursuit** | ~20% | 50-60% | ~70% | Cost-benefit judgment |
| **BI valuation** | 50-60% | 70-80% | ~80% | Catastrophic always needs humans |
| **BI negotiation** | ~5% | 20-30% | ~30% | Fundamentally human |

---

### EU vs US: The Structural Divide

| Dimension | 🇪🇺 EU Convention Countries | 🇺🇸 US |
|---|---|---|
| **Who victim deals with** | Own insurer (direct compensation) | Other driver's insurer (3rd-party claim) |
| **Liability determination** | Standardized lookup table / bareme | Case-by-case adversarial investigation |
| **Fault granularity** | Often binary (0/50/100%) | Any percentage |
| **Inter-insurer settlement** | Forfait (flat-rate) for small claims | Actual cost subrogation |
| **Speed** | Days (Portugal: 1.94 days avg) | Weeks to months |
| **Dispute mechanism** | Convention arbitration → courts | Negotiation → Arbitration Forums → litigation |
| **Automation potential** | **Very high** (structured inputs, deterministic rules) | **Lower** (unstructured, judgment-dependent) |
| **Data standard** | EAS — universal form | No universal form |
| **BI valuation** | Less Colossus-dependent, more expert-driven | Colossus-dominated |

**The conventions are 50-year-old pre-computed decision engines.** They're not "AI" — they're industry agreements that solved liability structurally. This is why EU motor claims can achieve STP rates that US markets cannot structurally match.

---

### Phase 9: Pain Points & Opportunities

| Pain Point | Impact | Opportunity |
|---|---|---|
| **Coverage ambiguity** (permissive use, exclusions) | Delays entire claim. 5-15% hit this. | Rules engine handling 80% of checks automatically |
| **Liability disputes (US)** | Multi-party claims take weeks-months | Convention-like structured approach for US ⚠️ |
| **Reserve inaccuracy (BI)** | $67B/year leakage. ±30-50% variance. | ML reserve prediction — even small improvement = massive ROI |
| **Authority bottlenecks** | Claims wait for supervisor approval | Auto-approve within authority thresholds |
| **Fraud false positives** | 31% of flags dismissed. Adds 2-3x cycle time. | Better precision in fraud scoring |
| **Missed subrogation** | $15B+ left on table (US) | Automated identification + pursuit recommendation |
| **Colossus is 37 years old** | Static rules, GIGO, no learning | Modern BI valuation with NLP medical record ingestion |
| **Tribal knowledge walking out the door** | 400K retirements, undocumented decisions | Knowledge capture platform |
| **ACV manipulation** | $3,000-$4,000 underpayment per total loss ⚠️ | Transparent, auditable valuation |

---

### Phase 9: Key Assumptions Logged

| # | Assumption | Status |
|---|---|---|
| A105 | Coverage verification is 80-90% automated for clean claims | ⚠️ Research synthesis |
| A106 | ~60-70% of EAS checkbox combinations map to deterministic convention outcomes | ⚠️ Estimate |
| A107 | Initial BI reserves have ±30-50% variance vs ultimate cost | ⚠️ Actuarial literature |
| A108 | Claims leakage costs US insurers ~$67B/year | ⚠️ VCA Software estimate |
| A109 | Industry average auto STP rate is 7-10% | ⚠️ Datos Insights 2023 |
| A110 | Theoretically STP-eligible: 25-35% of auto volume | ⚠️ Estimate |
| A111 | No competitor automates all 7 decision types | ✅ Competitive research |
| A112 | Liability determination is the least automated decision | ⚠️ Competitive research |
| A113 | >70% of US insurers use Colossus or similar BI valuation | ⚠️ Widely cited but source unclear |
| A114 | Colossus processes >50% of all US insurance claims | ⚠️ Legal practitioner sources |
| A115 | 400,000 insurance workers lost by 2026 (US) | ⚠️ BLS projection |
| A116 | 25% of adjusters retiring within 5 years | ⚠️ Industry estimates |
| A117 | Most carriers have NOT systematically captured tribal knowledge | ⚠️ Industry reporting |
| A118 | CCC/Mitchell create insurer-customized ACV tools ($500K-600K/year per insurer) | ⚠️ Alameda County DA allegations, unproven |
| A119 | Represented claimants receive 3.5x more than unrepresented | ⚠️ Insurance Research Council |

---

### Phase 9: Strategic Insights

- **Insight #37:** Decisions are where claims get stuck — extraction takes minutes, decisions take days/weeks/months
- **Insight #38:** The 7 decisions are NOT sequential — they happen in parallel, with dependencies
- **Insight #39:** EU convention systems are 50-year-old pre-computed decision engines — structurally superior to US adversarial approach for automatable claims
- **Insight #40:** No competitor automates all 7 decisions — the market is fragmented point solutions
- **Insight #41:** Liability determination is the biggest untouched gap — especially US where it's almost entirely manual
- **Insight #42:** Colossus (37 years old, 10,720 static rules) is ripe for disruption — but replacement must be explainable for regulators
- **Insight #43:** Each insurer runs effectively different software — Colossus configs, reserve formulas, fraud thresholds, ACV tools all customized per carrier
- **Insight #44:** The tribal knowledge crisis (400K retirements, 70-85% of BI negotiation undocumented) creates urgency AND opportunity — whoever captures adjuster decision patterns creates a moat
- **Insight #45:** Clean data at the decision boundary is the prerequisite — you can't automate decisions on garbage inputs (Colossus GIGO problem proves this)
- **Insight #46:** The decision that matters most for Mysa's wedge is the one where (a) data quality is the bottleneck, (b) insurer variation is high, and (c) no competitor owns it
- **Insight #47:** BI valuation is where the money is — ~20-30% of claims by count but ~60-70% by cost, dominated by a 37-year-old tool

---

### Phase 9 Deep Dive: Codifiable vs Judgment-Dependent Decisions

Every claims decision falls on a spectrum from pure rule-based (codifiable) to pure expert judgment. Understanding where each decision sits determines the automation ceiling.

#### Classification Matrix

| Decision | Classification | Automation Ceiling | Why |
|----------|---------------|-------------------|-----|
| **D1: Coverage Determination** | **Codifiable** | ~90% | Binary lookup: does the policy cover this event type? Policy wording is structured. Exclusions are enumerable. AI can parse the policy PDF and match event → coverage in seconds. Grey areas (10%) need underwriting consultation. |
| **D2: Liability Assignment** | **EU: Codifiable / US: Judgment** | EU: ~85% / US: ~40% | In the EU, convention baremes turn liability into a table lookup — 13 cases in France, you match the diagram, you get the fault %. In the US, there's no such system. The adjuster reads two conflicting stories, reviews photos/police reports, and decides based on experience + state negligence laws. |
| **D3: Reserve Setting** | **Mixed** | ~60% | Initial reserves use formulas (claim type × severity tier × geography = reserve amount). But adjusting reserves is judgment — as new information comes in, the adjuster uses experience to know "this is going to cost more than it looks." |
| **D4: Total Loss** | **Codifiable** | ~95% | Pure math: if repair cost > X% of vehicle value → total loss. Threshold varies (typically 70-80% depending on insurer/state), but it's a formula. Vehicle valuation uses databases (CCC, Mitchell, Audatex). |
| **D5: Fraud Referral** | **Mixed** | ~65% | Red flags are codifiable (claim <30 days after policy start, prior claim history, story inconsistencies). But the decision to formally refer to SIU involves judgment — false positives are expensive and damage customer relationships. |
| **D6: Subrogation** | **Codifiable** | ~85% | If fault% < 100% on your policyholder, you have a recovery opportunity. Rules are clear: fault%, recovery conventions (EU) or demand letters (US). Massively under-automated — billions left on the table. |
| **D7: BI Valuation** | **Judgment-heavy** | ~30% | Hardest decision. "What is this person's pain and suffering worth?" In the US, Colossus (37 years old, 10,720 rules) tries to codify it, but adjusters routinely override. In the EU, each country has different tables. 70-85% of BI negotiation knowledge is undocumented tribal knowledge. |

**Bottom line**: ~60-70% of decisions can be automated with rules + AI. The remaining 30-40% (mainly BI valuation and edge cases) need AI-augmented adjusters, not fully autonomous AI.

#### Terminology Deep Dive

**Bareme Lookup (EU Liability)**

A bareme (from French "barème" = scale/table) is a pre-computed fault allocation table used in EU convention systems.

How it works in practice (France/IRSA example):
1. Two cars collide
2. Both drivers fill out the EAS (European Accident Statement)
3. The EAS has checkboxes (17 of them) — "was changing lanes", "was turning left", "was reversing", etc.
4. Each combination of checked boxes maps to one of 13 standard accident cases (called "cas IDA")
5. Each case has a pre-determined fault split: 0/100, 50/50, 100/0, etc.
6. No human judgment needed — it's a lookup table

Example: Driver A checked "was turning left" + Driver B checked "was going straight" → Case 5 → Driver A is 100% at fault. Done. No argument.

Country-specific scales:
- **France (IRSA/IDA)**: 13 cases, simplest
- **Italy (CARD/CID)**: ~50 cases, most complex
- **Portugal (IDS/CIMPAS)**: ~20 cases
- **Spain (CIDE/ASCIDE/CICOS)**: ~30 cases

**Why this matters for Mysa**: In EU markets, liability determination is already a solved, codifiable problem IF you have clean EAS data. The bottleneck is not the decision — it's getting the data into structured form (50% of EAS are still paper, handwritten, often unclear).

**Reserve — The Insurer's Budget Estimate**

The reserve is the amount of money the insurer sets aside for a claim. It's NOT what they've paid — it's what they expect to pay. Reserves affect the insurer's financial statements immediately (they reduce reported profit).

**Reserve → Amount Paid Flow:**
1. FNOL: Initial reserve set (e.g., "rear-end collision, minor damage" → €3,000 reserve)
2. Investigation: May adjust up/down as facts emerge ("actually the frame is bent" → reserve goes to €8,000)
3. Assessment: Repair estimate comes in → reserve adjusted to match (€7,200)
4. Decision: Final reserve confirmed
5. Settlement: Actual payment issued (€7,200 paid to repair shop)
6. Close: Reserve = Amount paid. If reserve was €8,000 but you paid €7,200, the €800 "releases" back as profit.

The gap between reserve and payment is where insurers leak money: Over-reserving ties up capital unnecessarily. Under-reserving means surprises to the balance sheet. Getting reserves right is a $67B/year problem industry-wide.

**PD (Property Damage)**

Physical damage to things — the car, a fence, a guardrail. Relatively straightforward to value (get a repair estimate or market value). Typically handled by one adjuster. Average PD claim: ~€4,500.

**BI (Bodily Injury)**

Injuries to people — medical bills, lost wages, pain and suffering. This is where claims get expensive and complex. Average BI claim: ~€20,000-€50,000 (can reach millions). BI claims often involve lawyers, take 1-3 years to settle, and are where most of the "tribal knowledge" lives. ~20-30% of claims by count but ~60-70% by cost.

**SIU (Special Investigations Unit)**

The insurer's internal fraud team. When a claim looks suspicious (e.g., brand new policy + total loss, injuries inconsistent with damage, prior claim history), the claim gets "referred to SIU." SIU investigators are typically ex-law enforcement. They do surveillance, social media checks, statement analysis, etc. ~10-15% of all claims show some fraud indicators, but only ~1-3% are actually fraudulent.

---

### Phase 9 Deep Dive: EU Insurer Core Systems & Policy Loading

#### Do EU Insurers Use Guidewire/Duck Creek?

**Guidewire in EU:**
- Dominant in UK (Aviva, RSA, Direct Line, Admiral)
- Growing in continental Europe (Allianz Germany, AXA France experimenting)
- ~30-35% of top 50 EU insurers use Guidewire for claims (ClaimCenter)
- But many EU insurers run legacy in-house systems (especially in Southern/Eastern Europe)

**Duck Creek:**
- Smaller EU presence than Guidewire
- More common in Benelux and Nordic markets
- ~10-15% of EU top 50

**Other EU CMS (Claims Management Systems):**
- **Sapiens**: Strong in Israel, growing in EU (~10-15%)
- **In-house/legacy**: Still ~40-50% of EU insurers, especially in PT, ES, IT
- **EIS Group, Majesco**: Emerging alternatives

#### Can We Load Policies?

Yes, but it's complicated:
- Guidewire has PolicyCenter (policy admin) with APIs. If the insurer uses both PolicyCenter + ClaimCenter, the data link exists
- Duck Creek has similar integration capability
- The challenge: most EU insurers have policy data in a different system than claims data. Policy might be in SAP, claims in Guidewire, documents in SharePoint
- Each policy is NOT unique per user — it's a contract between the insurer and policyholder. The policy defines: what's covered, what's excluded, deductibles, limits, drivers covered, vehicle details. One policy = one contract, but the terms come from the insurer's product catalog

**For Mysa**: The key integration is reading the policy at decision time to check coverage. This requires either API access to PolicyCenter/Duck Creek or parsing the policy PDF. The bigger opportunity is that most adjusters today check coverage manually by opening the policy document and ctrl+F searching for exclusions — an AI can do this instantly.

#### EU CMS Market Share (Approximate)

| System | EU Market Share | Key Markets | Notes |
|--------|----------------|-------------|-------|
| Guidewire ClaimCenter | ~30-35% of top 50 | UK, DE, FR (growing) | Dominant vendor, expensive |
| In-house/Legacy | ~40-50% | PT, ES, IT, Eastern EU | Often 20-30 year old systems |
| Sapiens | ~10-15% | Nordics, IL-origin | Growing in EU |
| Duck Creek | ~10-15% | Benelux, Nordics | Cloud-native push |
| EIS/Majesco/Other | ~5% | Various | Emerging challengers |

---

### Phase 9 Deep Dive: The Adjuster — Complete Role Mapping

The adjuster is the most important role in claims and AI won't fully replace them but can make them dramatically more productive. Here's the complete mapping of everything they do.

#### Desk Adjuster (Handles claims from desk, no travel)

| Activity | Current State | Time Spent | AI Opportunity |
|----------|--------------|------------|----------------|
| Read FNOL & claim notes | Manual review of 5-20 pages | 15-30 min/claim | AI summarization → 30 seconds |
| Check policy coverage | Open policy doc, ctrl+F, read exclusions | 10-20 min | Instant AI policy parsing |
| Review photos/docs | Manual photo review, read estimates | 15-30 min | AI photo analysis (Tractable) |
| Call policyholder | Live call, take notes, build rapport | 15-30 min | AI pre-fills questions, auto-transcribes |
| Call counterparty (US) | Same as above, often hostile | 15-30 min | AI sentiment analysis, key point extraction |
| Set/adjust reserves | Calculate based on experience | 5-15 min | AI recommendation based on similar claims |
| Determine liability | Review evidence, apply rules/judgment | 15-45 min | EU: Auto (bareme). US: AI assist |
| Write coverage letter | Type out coverage determination | 10-20 min | AI draft from decision |
| Send payment/denial | Process in system, generate letter | 10-15 min | Workflow automation |
| Handle supplements | Review additional damage findings | 10-20 min | AI comparison of original vs supplement |
| Document everything | Write notes in claim file for audit | 15-30 min per touch | Auto-documentation from AI |
| Respond to claimant inquiries | Phone/email, "where's my claim?" | 10-15 min each | Chatbot for status, AI draft responses |
| Subrogation referral | Identify recovery opportunity, prepare | 10-20 min | AI auto-identifies, pre-fills demand |

**Desk adjuster total per claim**: 3-6 hours across multiple touches over days/weeks
**With AI augmentation**: Could drop to 1-2 hours (60-70% reduction)

#### Field Adjuster (Goes to scene/vehicle/property)

| Activity | Current State | Time Spent | AI Opportunity |
|----------|--------------|------------|----------------|
| Drive to inspection site | Physical travel | 30-90 min each way | Virtual inspections (video) for simple claims |
| Inspect vehicle/property | Walk around, look at damage, take photos | 30-60 min | AI guides inspection checklist, ensures nothing missed |
| Write damage estimate | Use CCC/Mitchell/Audatex, line-item | 45-90 min | AI pre-populates from photos, adjuster validates |
| Interview claimant at scene | In-person conversation | 15-30 min | AI records, transcribes, flags inconsistencies |
| Check for hidden damage | Lift panels, look underneath | 15-30 min | AI predicts hidden damage from visible damage patterns |
| Photograph everything | 20-50 photos per claim | 10-20 min | AI guides "take photo of X" based on damage type |
| ADAS recalibration check | Check if car has sensors that need recalibration | 5-10 min | AI auto-flags based on make/model/year |
| Upload to system | Back at desk, upload photos/estimate | 15-30 min | Real-time mobile upload with AI tagging |
| Total loss inspection | Same + verify VIN, mileage, options | Additional 15-30 min | Database lookup for valuation |

**Field adjuster total per claim**: 4-8 hours including travel
**With AI augmentation**: Travel still required, but estimate/documentation time drops ~50%

#### What's Already Automated Today (Industry-Wide)

| Activity | Automation Level | Who Does It |
|----------|-----------------|------------|
| Photo damage assessment | ~15-20% of claims | Tractable, CCC AI |
| FNOL intake | ~5-10% fully auto | Lemonade, some insurer chatbots |
| Reserve setting (initial) | ~20-30% use formulas | Built into CMS |
| Fraud scoring | ~60-70% get scored | Shift Technology, FICO |
| Coverage check | ~5% automated | Almost nobody |
| Liability (EU convention) | ~10% STP | omni:us, some insurer systems |
| BI valuation | ~30% use Colossus | DXC Colossus (US mainly) |
| Subrogation identification | ~10-15% auto-flagged | Shift, some CMS rules |
| Status communication | ~10-15% automated | Hi Marley, chatbots |

#### What's Still Fully Manual

- **Recorded statements (US)** — 100% human, 15-30 min per party
- **Complex coverage interpretation** — grey areas require UW consultation
- **BI negotiation with attorneys** — 100% human, tribal knowledge
- **Fraud investigation (post-referral)** — SIU investigators, surveillance
- **Multi-party liability disputes** — judgment calls on comparative negligence
- **Supplement negotiations** — back-and-forth with repair shops
- **Customer empathy/de-escalation** — the human touch that matters

#### The Adjuster Productivity Thesis

The adjuster is NOT going away. But today's adjuster is:
- 60% administrator (reading docs, writing notes, sending letters, keying data)
- 25% investigator (gathering facts, making calls, reviewing evidence)
- 15% decision-maker (applying judgment to complex situations)

AI can flip this to:
- 15% administrator (reviewing AI-generated summaries, approving drafts)
- 25% investigator (AI pre-gathers, human validates)
- 60% decision-maker (focused on the hard stuff that matters)

**This is the Mysa thesis for the adjuster**: Don't replace the adjuster. Make them 3-4x more productive by eliminating the 60% of administrative work and augmenting the 25% of investigation work. The adjuster then spends their time on the 15% where human judgment creates the most value.

---

### Phase 9 Deep Dive: Competitors Focused on Decision Automation

#### Who Owns Which Decisions?

| Competitor | Primary Focus | Decisions They Automate | Do They "Own the Decision"? |
|-----------|---------------|------------------------|-----------------------------|
| **Five Sigma (Clive)** | Multi-agent AI for adjusters | Claim summarization, coverage check, decision recommendations, documentation | Attempting to — AI recommends, human approves |
| **Shift Technology** | Fraud decisions | Fraud scoring, subrogation detection | Partially — they own the fraud/subro decision signal |
| **Davies/Kuarterback** | UK motor BI adjusters | Auto-read Stage 2 packs, valuate BI claims <1 min | Yes, for UK motor BI — 75-80% auto-processed |
| **Sprout.ai** | Coverage + simple decisions | Auto-approve simple claims, coverage checking | Partially — simple claims only |
| **Tractable** | Assessment decision | Total loss vs repair, damage valuation | Yes, for assessment — but not other decisions |
| **Colossus (DXC)** | BI valuation | 10,720 rules for BI injury valuation | Yes, for BI — 70%+ of US insurers, but 37 years old |
| **Lemonade (AI Jim)** | Full stack (not vendor) | All 7 decisions, but only for their own policies | Yes, but can't buy it — B2C only |
| **ClaimSorted** | Full claims TPA | Auto-decision for simple, handler for complex | Attempting to — TPA model gives them all decisions |
| **omni:us** | EU convention STP | Liability via convention lookup, STP routing | Partially — liability in EU convention markets |

**Key insight**: Nobody owns ALL 7 decisions across multiple markets. The closest are Five Sigma and ClaimSorted, but they're early-stage. Davies/Colossus own specific slices deeply. This is the white space Mysa targets — the intelligence layer that sits across all 7 decisions, learns from each insurer's patterns, and progressively automates from codifiable → judgment-dependent.

#### Assumptions Added

- **A120:** ~60-70% of claims decisions are codifiable or mixed; ~30-40% are judgment-heavy (mainly BI valuation)
- **A121:** Desk adjusters spend 3-6 hours per claim; AI can reduce to 1-2 hours (60-70% reduction)
- **A122:** Field adjusters spend 4-8 hours per claim including travel; AI can reduce non-travel time by ~50%
- **A123:** Today's adjuster is ~60% administrator, ~25% investigator, ~15% decision-maker; AI can invert this ratio
- **A124:** ~30-35% of top 50 EU insurers use Guidewire; ~40-50% still on in-house/legacy systems
- **A125:** No competitor automates all 7 decisions across multiple markets — the horizontal decision intelligence layer is white space

#### Strategic Insights Added

- **Insight #48:** The adjuster is 60% admin — this is the immediate AI opportunity. Don't replace the adjuster; eliminate their paperwork so they can focus on decisions.
- **Insight #49:** EU liability is already solved (bareme tables) — the bottleneck is data quality upstream, not the decision logic. Clean data IS the wedge for EU markets.
- **Insight #50:** Policy loading is the hidden blocker — most adjusters check coverage manually (ctrl+F in a PDF). Instant policy parsing at decision time could be Mysa's fastest-to-value feature.
- **Insight #51:** The reserve → payment gap is a $67B/year problem — whoever predicts reserves more accurately captures enormous value for insurers.
- **Insight #52:** Nobody owns the horizontal decision intelligence layer — competitors own narrow vertical slices. This is Mysa's target architecture.

---

# DATA SCHEMAS — EU vs US

> **Purpose:** Track what data is captured, when, by whom, and whether it's manual or automated. This informs where data quality issues originate and where automation opportunities exist.

---

## Motor Claims Data Schemas

### 🇪🇺 EU Motor: European Accident Statement (EAS)

**When captured:** At scene, immediately after accident (typically 15-30 min post-incident)
**Captured by:** Both drivers collaboratively
**Format:** Standardized carbon-copy form (same across all 27 EU countries)
**Key characteristic:** SINGLE AGREED DOCUMENT signed by both parties

```
EAS DATA SCHEMA (~100 fields)

SECTION A: ACCIDENT DETAILS
├── Date of accident                    [Manual - Handwritten]
├── Time of accident                    [Manual - Handwritten]
├── Location (address, city, country)  [Manual - Handwritten]
├── Injuries? (Yes/No checkbox)        [Manual - Checkbox]
├── Damage to other vehicles? (Y/N)    [Manual - Checkbox]
├── Damage to objects? (Y/N)           [Manual - Checkbox]
├── Police called? (Y/N)               [Manual - Checkbox]
├── Police report number               [Manual - Handwritten]
├── Witnesses (name, address, phone)   [Manual - Handwritten]

SECTION B: VEHICLE A DETAILS
├── Policyholder name                  [Manual - Handwritten]
├── Policyholder address               [Manual - Handwritten]
├── Policyholder phone                 [Manual - Handwritten]
├── Vehicle make                       [Manual - Handwritten]
├── Vehicle model                      [Manual - Handwritten]
├── Vehicle registration               [Manual - Handwritten]
├── Vehicle country                    [Manual - Handwritten]
├── Insurance company name             [Manual - Handwritten]
├── Insurance policy number            [Manual - Handwritten]
├── Green card number                  [Manual - Handwritten]
├── Green card validity dates          [Manual - Handwritten]
├── Driver name (if different)         [Manual - Handwritten]
├── Driver address                     [Manual - Handwritten]
├── Driver license number              [Manual - Handwritten]
├── Driver license validity date       [Manual - Handwritten]
├── Damage description (free text)     [Manual - Handwritten]
├── Damage diagram on vehicle outline  [Manual - Sketch]

SECTION C: VEHICLE B DETAILS
├── [Same structure as Vehicle A]

SECTION D: CIRCUMSTANCES (17 CHECKBOXES) — CONVENTION INPUT
├── □ 1. Parked/stopped               [Manual - Checkbox]
├── □ 2. Leaving parking space        [Manual - Checkbox]
├── □ 3. Entering parking space       [Manual - Checkbox]
├── □ 4. Emerging from car park       [Manual - Checkbox]
├── □ 5. Entering car park            [Manual - Checkbox]
├── □ 6. Entering roundabout          [Manual - Checkbox]
├── □ 7. Circulating in roundabout    [Manual - Checkbox]
├── □ 8. Rear collision (same dir)    [Manual - Checkbox]
├── □ 9. Same direction, diff lane    [Manual - Checkbox]
├── □ 10. Changing lanes              [Manual - Checkbox]
├── □ 11. Overtaking                  [Manual - Checkbox]
├── □ 12. Turning right               [Manual - Checkbox]
├── □ 13. Turning left                [Manual - Checkbox]
├── □ 14. Reversing                   [Manual - Checkbox]
├── □ 15. Encroaching opposite lane   [Manual - Checkbox]
├── □ 16. Coming from right (junction)[Manual - Checkbox]
├── □ 17. Not observing right of way  [Manual - Checkbox]
├── Number of boxes checked (total)    [Manual - Count]

SECTION E: ACCIDENT DIAGRAM
├── Sketch of accident scene          [Manual - Drawing]
├── Vehicle positions                 [Manual - Drawing]
├── Direction of travel arrows        [Manual - Drawing]
├── Road layout                       [Manual - Drawing]

SECTION F: OBSERVATIONS
├── Additional details (free text)    [Manual - Handwritten]

SECTION G: SIGNATURES
├── Driver A signature                [Manual - Signature]
├── Driver A signature date           [Manual - Date]
├── Driver B signature                [Manual - Signature]
├── Driver B signature date           [Manual - Date]
```

**Data Quality Issues:**
- ~50% still paper (scanned/photographed later)
- Handwriting often illegible
- Diagrams often unclear/messy
- Checkboxes sometimes ambiguous (partially checked, crossed out)
- Language barriers (tourists, cross-border)
- Form designed for 2 vehicles only (multi-vehicle requires workarounds)

**Convention Matching:** The 17 circumstance checkboxes are the INPUT to IRSA/IDA/CIMPAS fault tables. Given checkbox combination X → Fault split = Y%. This lookup is TRIVIAL once data is clean.

---

### 🇺🇸 US Motor: ACORD 2 Automobile Loss Notice

**When captured:** AFTER FNOL, during investigation
**Captured by:** Adjuster (from interviews and evidence)
**Format:** Standardized industry form (but not agreed by both parties)
**Key characteristic:** ONE PARTY'S ACCOUNT — no joint agreement

```
ACORD 2 — AUTOMOBILE LOSS NOTICE DATA SCHEMA

SECTION: ADMINISTRATIVE/POLICY
├── Report date (MM/DD/YY)            [System - Auto]
├── Producer code                      [System - Lookup]
├── Producer subcode                   [System - Lookup]
├── Agency name                        [System - Lookup]
├── Agency phone                       [System - Lookup]
├── Customer ID                        [System - Lookup]
├── Company name                       [System - Lookup]
├── Policy number                      [Manual - Entry]
├── Policy effective date              [System - Lookup]
├── Policy expiration date             [System - Lookup]
├── Reference number                   [System - Auto]
├── CAT number (if applicable)         [Manual - Entry]

SECTION: INSURED/OWNER
├── Owner name                         [Manual - Entry]
├── Owner address                      [Manual - Entry]
├── Residence phone                    [Manual - Entry]
├── Business phone                     [Manual - Entry]
├── Primary email                      [Manual - Entry]
├── Secondary email                    [Manual - Entry]

SECTION: VEHICLE INFORMATION
├── Vehicle number (if fleet)          [Manual - Entry]
├── Year                               [Manual - Entry]
├── Make                               [Manual - Entry]
├── Model                              [Manual - Entry]
├── Body type                          [Manual - Entry]
├── VIN                                [Manual - Entry]
├── Plate number                       [Manual - Entry]
├── State                              [Manual - Entry]
├── Other insurance on vehicle (Y/N)   [Manual - Checkbox]

SECTION: DRIVER INFORMATION
├── Driver name                        [Manual - Entry]
├── Driver address                     [Manual - Entry]
├── Relation to insured                [Manual - Dropdown]
│   ├── Employee
│   ├── Family member
│   ├── Other
├── Date of birth                      [Manual - Entry]
├── Driver license number              [Manual - Entry]
├── Driver license state               [Manual - Entry]
├── Purpose of use                     [Manual - Entry]
├── Used with permission (Y/N)         [Manual - Checkbox]

SECTION: LOSS DETAILS
├── Date of accident                   [Manual - Entry]
├── Time of accident                   [Manual - Entry]
├── Location of loss                   [Manual - Entry]
├── Description of accident            [Manual - FREE TEXT NARRATIVE] ⚠️
├── Describe damage to vehicle         [Manual - FREE TEXT]
├── Estimate amount                    [Manual - Entry]
├── When vehicle can be seen           [Manual - Entry]
├── Where vehicle can be seen          [Manual - Entry]

SECTION: OTHER PARTY (if applicable)
├── Other vehicle owner name           [Manual - Entry]
├── Other vehicle owner address        [Manual - Entry]
├── Other vehicle year/make/model      [Manual - Entry]
├── Other vehicle VIN                  [Manual - Entry]
├── Other driver name                  [Manual - Entry]
├── Other driver license               [Manual - Entry]
├── Other insurance company            [Manual - Entry]
├── Other policy number                [Manual - Entry]

SECTION: WITNESSES
├── Witness 1 name                     [Manual - Entry]
├── Witness 1 address                  [Manual - Entry]
├── Witness 1 phone                    [Manual - Entry]
├── [Additional witnesses as needed]

SECTION: INJURIES
├── Any injuries (Y/N)                 [Manual - Checkbox]
├── Injured party names                [Manual - Entry]
├── Nature of injuries                 [Manual - FREE TEXT]

SECTION: POLICE
├── Police report filed (Y/N)          [Manual - Checkbox]
├── Police department                  [Manual - Entry]
├── Report number                      [Manual - Entry]

SECTION: CHILD RESTRAINT
├── Child restraint used (Y/N)         [Manual - Checkbox]
```

**Critical Difference from EAS:**
| Aspect | EAS | ACORD 2 |
|--------|-----|---------|
| **Circumstances** | 17 structured checkboxes → convention lookup | FREE TEXT narrative requiring interpretation |
| **Diagram** | ✅ Joint sketch included | ❌ No diagram field |
| **Agreement** | ✅ Both parties sign | ❌ One party's account |
| **When captured** | At scene | After FNOL (days later) |
| **Counterparty data** | ✅ On same form | ❌ Separate forms per insurer |

**Data Quality Issues:**
- "Description of accident" is unstructured narrative
- Adjuster interpretation required
- Two ACORD forms (one per insurer) may conflict
- No joint agreement on facts
- Data collected AFTER the fact (memory fades)

---

### 🇺🇸 US Motor: Recorded Statement (Investigation Phase)

**When captured:** 1-3 days after FNOL
**Captured by:** Claims adjuster via phone interview
**Format:** Audio recording + transcript/notes
**Duration:** 15-30 minutes per party

```
RECORDED STATEMENT DATA SCHEMA

ADMINISTRATIVE
├── Date and time of statement         [System - Auto]
├── Claim number                       [System - Lookup]
├── Adjuster name                      [Manual - Entry]
├── Statement giver name               [Manual - Entry]
├── Statement giver role               [Manual - Entry]
│   ├── Insured driver
│   ├── Claimant driver
│   ├── Passenger
│   ├── Witness

NARRATIVE CAPTURED (UNSTRUCTURED)
├── What were you doing before the accident?
├── Where were you going?
├── Describe the road conditions
├── Describe the weather conditions
├── What lane were you in?
├── What speed were you traveling?
├── Did you see the other vehicle before impact?
├── Where was the other vehicle?
├── What was the other vehicle doing?
├── Where exactly did the impact occur on your vehicle?
├── Where exactly did the impact occur on the other vehicle?
├── What did you do after the accident?
├── Did you exchange information?
├── Were there any witnesses?
├── Did you speak to the other driver?
├── What did they say?
├── Any injuries?
├── Did you take photos?
├── Anything else to add?

OUTPUT
├── Audio file (.mp3/.wav)             [Automated recording]
├── Transcript                         [Manual or AI transcription]
├── Adjuster notes                     [Manual - Summary]
├── Key facts extracted                [Manual - Adjuster judgment]
├── Contradictions flagged             [Manual - Adjuster judgment]
```

**Data Quality Issues:**
- Unstructured audio requires interpretation
- Transcription varies in quality
- Facts must be manually extracted
- Contradictions between parties require judgment
- Memory degrades over time since accident

---

## Home/Property Claims Data Schemas

### Home Claims: FNOL Data (EU and US — Similar)

**No equivalent to EAS for property claims.** Both EU and US use similar FNOL structures.

```
HOME FNOL DATA SCHEMA

POLICY INFORMATION
├── Policy number                      [Manual - Entry or Lookup]
├── Policyholder name                  [System - Lookup]
├── Property address                   [System - Lookup]
├── Coverage type                      [System - Lookup]
├── Deductible                         [System - Lookup]

INCIDENT DETAILS
├── Date of loss                       [Manual - Entry]
├── Time of loss (if known)            [Manual - Entry]
├── Date discovered                    [Manual - Entry]
├── Type of loss                       [Manual - Dropdown]
│   ├── Water damage
│   ├── Fire
│   ├── Wind/hail
│   ├── Theft/burglary
│   ├── Vandalism
│   ├── Other
├── Description of what happened       [Manual - FREE TEXT]
├── Cause (if known)                   [Manual - FREE TEXT]

DAMAGE INFORMATION
├── Areas of property affected         [Manual - FREE TEXT]
├── Damage description                 [Manual - FREE TEXT]
├── Emergency services called (Y/N)    [Manual - Checkbox]
├── Mitigation taken                   [Manual - FREE TEXT]
│   ├── Water shut off?
│   ├── Property secured?
│   ├── Temporary repairs?

DOCUMENTATION
├── Photos taken (Y/N)                 [Manual - Checkbox]
├── Police report (if theft)           [Manual - Entry]
├── Fire department report (if fire)   [Manual - Entry]

CONTACT PREFERENCES
├── Preferred contact method           [Manual - Dropdown]
├── Best time to reach                 [Manual - Entry]
├── Property access instructions       [Manual - FREE TEXT]
```

---

### Home Claims: Field Inspection Report (Adjuster-Generated)

**When captured:** During on-site inspection (1-2 hours)
**Captured by:** Field adjuster
**Format:** Structured report + photos + Xactimate estimate

```
FIELD INSPECTION REPORT DATA SCHEMA

ADMINISTRATIVE
├── Claim number                       [System - Lookup]
├── Inspection date                    [Manual - Entry]
├── Adjuster name                      [System - Lookup]
├── Weather conditions at inspection   [Manual - Entry]

PROPERTY DETAILS
├── Property type                      [Manual - Dropdown]
│   ├── Single family
│   ├── Condo/apartment
│   ├── Townhouse
│   ├── Commercial
├── Year built                         [Manual - Entry]
├── Square footage                     [Manual - Entry or Measure]
├── Construction type                  [Manual - Dropdown]
├── Roof type                          [Manual - Dropdown]
├── Number of stories                  [Manual - Entry]

DAMAGE DOCUMENTATION
├── Damage location(s)                 [Manual - Entry]
├── Damage description per location    [Manual - FREE TEXT]
├── Measurements                       [Manual or Tool-Assisted]
├── Photos                             [Digital - Camera/Phone]
│   ├── Overview photos
│   ├── Detail photos of damage
│   ├── Pre-existing condition photos
│   ├── Serial number photos (contents)

CAUSE & ORIGIN DETERMINATION
├── Cause of loss                      [Manual - Adjuster Judgment]
├── Sudden or gradual?                 [Manual - Adjuster Judgment] ⚠️ Critical for coverage
├── Point of origin                    [Manual - Entry]
├── Contributing factors               [Manual - FREE TEXT]
├── Expert needed (Y/N)                [Manual - Checkbox]

COVERAGE ANALYSIS
├── Peril covered (Y/N)                [Manual - Judgment]
├── Exclusions that may apply          [Manual - Entry]
├── Sublimits that apply               [System - Lookup]
├── Deductible                         [System - Lookup]

ESTIMATE (XACTIMATE)
├── Scope of repairs                   [Manual + Software]
├── Line items                         [Software - Xactimate]
├── Material costs                     [Software - Xactimate]
├── Labor costs                        [Software - Xactimate]
├── Overhead & profit                  [Software - Xactimate]
├── Total estimate                     [Software - Calculated]
├── ACV (Actual Cash Value)            [Software - Calculated]
├── Depreciation                       [Software - Calculated]
├── RCV (Replacement Cost Value)       [Software - Calculated]

ADJUSTER NOTES
├── Policyholder statements            [Manual - FREE TEXT]
├── Observations                       [Manual - FREE TEXT]
├── Red flags (if any)                 [Manual - FREE TEXT]
├── Recommendations                    [Manual - FREE TEXT]
```

**Data Quality Notes:**
- Xactimate provides structured estimates (75-80% industry adoption)
- Cause & origin determination is JUDGMENT-HEAVY
- "Sudden vs gradual" distinction is critical for coverage and often disputed
- Hidden damage (behind walls) cannot be captured without destructive inspection

---

## Data Capture Summary: Manual vs Automated

### Motor Claims

| Data Element | EU (EAS) | US (ACORD + Statement) |
|-------------|----------|------------------------|
| Date/time/location | Manual (handwritten) | Manual (adjuster entry) |
| Party identification | Manual (handwritten) | Manual (adjuster entry) |
| Vehicle details | Manual (handwritten) | Manual (adjuster entry) |
| Circumstances/narrative | **Structured checkboxes** | **Unstructured narrative** |
| Diagram | Manual (sketch) | **Not captured** |
| Agreement | **Both parties sign** | **No agreement** |
| Fault determination | **Convention lookup** (trivial) | **Adjuster judgment** (complex) |

### Home/Property Claims

| Data Element | EU | US |
|-------------|----|----|
| Incident details | Manual (FNOL) | Manual (FNOL) |
| Damage documentation | Manual (photos) | Manual (photos) |
| Measurements | Manual or tool-assisted | Manual or tool-assisted |
| Cause determination | **Adjuster judgment** | **Adjuster judgment** |
| Repair estimates | **Xactimate** (75-80%) | **Xactimate** (75-80%) |
| Coverage analysis | Adjuster + policy | Adjuster + policy |

**Key Insight:** Home claims data capture is nearly identical EU vs US. Motor claims have fundamental structural difference (EAS checkboxes vs unstructured narrative).

---

# MULTIPLE ADJUSTER SCENARIOS

> **Why this matters:** Five Sigma research shows claims requiring multiple adjusters take **~3x longer** (2.75-2.85x average). Understanding when and why multiple adjusters get involved reveals collaboration friction and handoff opportunities.

---

## When Claims Require Multiple Adjusters

### Scenario 1: Property Damage + Bodily Injury (Most Common)

**Trigger:** Accident involves both vehicle damage AND injury claims

**What happens:**
```
Single accident
     ↓
FNOL opened
     ↓
Triage identifies both PD and BI
     ↓
PROPERTY DAMAGE ADJUSTER assigned
├── Handles vehicle damage
├── Arranges inspection/appraisal
├── Calculates PD settlement
     ↓
BODILY INJURY ADJUSTER assigned (different specialist)
├── Collects medical records
├── Evaluates injury severity
├── Calculates BI settlement
├── May involve legal review
     ↓
Both adjusters work same claim file
├── Different specializations
├── Different timelines (BI takes longer)
├── Coordination required
```

**Data tracked:** Both adjusters assigned in claims system, each with own notes/activities
**Handoff friction:** BI adjuster needs context from PD investigation

---

### Scenario 2: SIU Transfer (Fraud Suspected)

**Trigger:** Red flags detected during investigation

**What happens:**
```
Adjuster handling claim
     ↓
Red flags identified:
├── Inconsistent statements
├── Suspicious timing
├── Prior claims history
├── Documentation issues
     ↓
Claim flagged for SIU review
     ↓
SIU INVESTIGATOR takes over investigation portion
├── Deep background check
├── Detailed recorded statement
├── Document forensics
├── Potentially surveillance
     ↓
SIU returns findings to ORIGINAL ADJUSTER
├── Legitimate → Adjuster continues
├── Fraud confirmed → Denial
├── Inconclusive → Additional investigation
     ↓
Adjuster completes claim
```

**Data tracked:** SIU referral logged, SIU notes in separate system often
**Handoff friction:** SIU and claims systems may not integrate well

---

### Scenario 3: Complex/Catastrophic Claims

**Trigger:** Claim exceeds complexity or value thresholds

**What happens:**
```
Large or complex claim
├── High value (>$50K-$100K)
├── Multiple vehicles
├── Serious injuries
├── Coverage disputes
├── Litigation expected
     ↓
Standard adjuster begins
     ↓
Complexity identified → SENIOR/SPECIALIST ADJUSTER assigned
├── Takes over primary handling
├── Original adjuster may support
├── Supervisory oversight
     ↓
May also involve:
├── Legal team
├── Coverage counsel
├── Expert engineers
├── Medical specialists
```

**Data tracked:** Claim escalation logged, multiple assignees in system
**Handoff friction:** Context must be transferred, all prior work reviewed

---

### Scenario 4: Attorney Representation

**Trigger:** Claimant hires attorney

**What happens:**
```
Claimant represented by attorney
     ↓
Claim flagged as "represented"
     ↓
May transfer to LITIGATION ADJUSTER
├── Trained in legal procedures
├── Coordinates with insurer's counsel
├── Different settlement authority
├── Longer timeline expected
     ↓
Original adjuster's work becomes input
├── Investigation notes
├── Recorded statements
├── Liability determination
     ↓
Litigation adjuster manages through resolution
```

**Data tracked:** Representation status, attorney contact info, litigation adjuster assignment
**Handoff friction:** Full file review required, legal sensitivity

---

### Scenario 5: Multi-Insurer Claims

**Trigger:** Multiple insurance policies involved

**What happens:**
```
Accident involves:
├── Driver A (Insurer A)
├── Driver B (Insurer B)
├── Driver C (Insurer C) [if multi-vehicle]
     ↓
EACH insurer assigns own adjuster
     ↓
Insurer A Adjuster investigates Driver A
Insurer B Adjuster investigates Driver B
Insurer C Adjuster investigates Driver C
     ↓
Cross-insurer communication needed:
├── Share liability findings
├── Coordinate subrogation
├── Arbitration if disputed
     ↓
If insurers disagree → Arbitration Forums, Inc. (US)
```

**Data tracked:** Each insurer's system separately, subrogation tracking
**Handoff friction:** No shared system, data exchange via emails/portals

---

### Scenario 6: Geographic Coverage Gap

**Trigger:** Accident location far from staff adjusters

**What happens:**
```
Accident in remote location
     ↓
Staff adjuster assigned (desk handling)
     ↓
Field inspection needed
     ↓
INDEPENDENT ADJUSTER (IA) contracted
├── Local IA inspects vehicle
├── Takes photos, measurements
├── Writes inspection report
     ↓
IA report sent to staff adjuster
     ↓
Staff adjuster continues claim with IA input
```

**Data tracked:** IA assignment, IA report attached to file
**Handoff friction:** IA uses different tools/formats, report integration

---

### Scenario 7: CAT Events (Catastrophe Surge)

**Trigger:** Hurricane, wildfire, major storm creates volume spike

**What happens:**
```
CAT event declared
     ↓
Claims volume spikes 10-50x normal
     ↓
Staff adjusters overwhelmed
     ↓
TPA/IA SURGE deployed
├── Crawford, Sedgwick, etc.
├── Hundreds of additional adjusters
├── Often from other regions
     ↓
Claims assigned across:
├── Staff adjusters (capacity)
├── TPA adjusters (overflow)
├── Independent adjusters (overflow)
     ↓
All report into insurer's system
├── Or TPA system with data sync
```

**Data tracked:** CAT code on claims, adjuster source (staff/TPA/IA)
**Handoff friction:** Different adjusters, different training, data integration challenges

---

## Where Multiple Adjuster Data Is Tracked

### Primary Claims Management Systems

| System | Who Uses It | How Adjusters Tracked |
|--------|-------------|----------------------|
| **Guidewire ClaimCenter** | Large insurers (40%+ market) | Adjuster assignment field, activity log, handoff history |
| **Duck Creek Claims** | Mid-large insurers | Similar assignment tracking |
| **Majesco** | Various insurers | Assignee fields, workflow tracking |
| **Legacy/custom systems** | Many insurers | Varies widely |

### What Gets Logged

```
CLAIM FILE — ADJUSTER TRACKING

Assignment History:
├── Adjuster 1 assigned: [Date/Time]
├── Adjuster 1 activities: [List of actions]
├── Adjuster 2 assigned: [Date/Time] — Reason: [BI/SIU/Escalation]
├── Adjuster 2 activities: [List of actions]
├── Transfer notes: [Handoff context]

Current Assignees:
├── Primary adjuster: [Name]
├── Secondary adjuster: [Name] (if applicable)
├── Supervisor: [Name]
├── SIU investigator: [Name] (if flagged)

Activity Log:
├── Every call, note, document logged with adjuster ID
├── System actions timestamped
├── Handoff events flagged
```

### The 3x Time Penalty Source

The ~3x time penalty for multi-adjuster claims comes from:

1. **Context transfer** — New adjuster must read/understand entire file
2. **Duplicate work** — Some investigation repeated to verify
3. **Coordination overhead** — Adjusters must sync on findings
4. **Wait time** — Claim sits while waiting for handoff/availability
5. **System friction** — Data may not flow cleanly between assignees

**Mysa Opportunity:** If handoffs included AI-generated summaries, structured data packages, and clear "what's done / what's needed" flags, the 3x penalty could potentially be reduced significantly.



 ## Strategic Wedge Analysis                                                                                         
                                                                                                                      
  *Added: February 2025*                                                                                              
                                                                                                                      
  ### The Core Question                                                                                               
                                                                                                                      
  Mysa wants to **own the full claims journey** long-term across multiple sectors — become the AI-managed claims      
  solution for insurers. But we need a **narrow wedge** to start.                                                     
                                                                                                                      
  The challenge: Most wedges either don't expand (you get stuck as a point solution), aren't defensible (you get      
  squeezed or replicated), or don't match the actual bottleneck.                                                      
                                                                                                                      
  This section analyzes potential wedges, what we'd reject, and the recommended path.                                 
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### Wedges We'd Reject (And Why)                                                                                    
                                                                                                                      
  #### ❌ Wedge: Better EAS Capture at Scene (B2C)                                                                    
                                                                                                                      
  **The pitch:** Fix data quality at the source with a consumer app for accident documentation.                       
                                                                                                                      
  **Why reject:**                                                                                                     
  - Consumer distribution problem — getting drivers to use your app is B2C marketing, not B2B SaaS                    
  - Competing for mobile app installs against every insurer's own app                                                 
  - omni:us has $52.7M for EAS extraction and STP is still ~10% — the bottleneck isn't capture technology             
                                                                                                                      
  **Verdict:** The problem isn't technology at the scene. It's what happens after.                                    
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  #### ❌ Wedge: Integration / Orchestration Layer (Middleware)                                                       
                                                                                                                      
  **The pitch:** Be the glue that connects Sprout + Tractable + Shift + conventions. Insurers buy from you, you call  
  APIs behind the scenes.                                                                                             
                                                                                                                      
  **Why reject:**                                                                                                     
  - Middleware gets squeezed — component vendors can cut you out                                                      
  - No proprietary value — you're dependent on others' APIs                                                           
  - Low switching costs — once integrated, you're replaceable                                                         
  - This is what Accenture and Deloitte sell — they have relationships, we don't                                      
                                                                                                                      
  **Verdict:** Integration consulting doesn't compound. Not a venture-scale business.                                 
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  #### ❌ Wedge: Broker-to-Insurer Submission Layer                                                                   
                                                                                                                      
  **The pitch:** Be the neutral data layer between brokers and insurers. Network effects from both sides.             
                                                                                                                      
  **Why reject:**                                                                                                     
  - Two-sided marketplace dynamics are brutal — need critical mass on both sides simultaneously                       
  - Insurers don't want to share a platform with competitors                                                          
  - Low defensibility — once proven, incumbents can replicate                                                         
  - This is a feature, not a product                                                                                  
                                                                                                                      
  **Verdict:** You'd be building a commodity that gets absorbed.                                                      
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  #### ❌ Wedge: Adjuster Productivity for Property                                                                   
                                                                                                                      
  **The pitch:** 3x adjuster productivity via virtual inspection + AI assistance. TPAs are buyers.                    
                                                                                                                      
  **Why reject:**                                                                                                     
  - Competing directly with Tractable ($185M) and Snapsheet on photo AI                                               
  - Hidden damage limits automation — AI can't see water behind walls                                                 
  - Doesn't expand to motor — different problem, different solution                                                   
  - You're a tool for someone else's workflow, not a platform                                                         
                                                                                                                      
  **Verdict:** You'd be a feature in Tractable's roadmap.                                                             
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  #### ⚠️ Wedge: Claims Decisioning (Destination, Not Starting Point)                                                 
                                                                                                                      
  **The pitch:** Own the decision layer — "Given this claim, tell me: approve, deny, or escalate."                    
                                                                                                                      
  **Why it's compelling:**                                                                                            
  - Decisions are where claims get stuck (extraction takes minutes, decisions take days)                              
  - Defensible with domain expertise + training data + trust                                                          
  - Highest-value layer (this is what claims handlers are paid for)                                                   
  - Expands naturally to all claim types                                                                              
                                                                                                                      
  **Why it's not the starting wedge:**                                                                                
  - Requires data and ground truth to build models (chicken-and-egg)                                                  
  - Requires trust that takes time to build                                                                           
  - Can't walk in day one and say "let us make your decisions"                                                        
  - ClaimSorted is already positioning here                                                                           
                                                                                                                      
  **Verdict:** Decisioning is the DESTINATION, not the WEDGE. We need something that leads there.                     
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### The "Corti for Insurance" Thesis                                                                                
                                                                                                                      
  #### What Corti Does (Healthcare)                                                                                   
                                                                                                                      
  Corti is an API-first AI infrastructure platform for healthcare:                                                    
                                                                                                                      
  | Layer | What Corti Offers |                                                                                       
  |-------|-------------------|                                                                                       
  | Speech-to-Text | Clinical conversation → accurate medical transcript |                                            
  | Text Generation | Transcript → formatted medical documentation |                                                  
  | Agentic Framework | Autonomous agents for coding, prior auth, discharge notes |                                   
                                                                                                                      
  **Positioning:** "Build production-grade AI applications without the infrastructure burden."                        
                                                                                                                      
  **Buyers:** EHR vendors, telehealth platforms, hospital IT teams — developers who build for healthcare.             
                                                                                                                      
  #### The Insurance Equivalent                                                                                       
                                                                                                                      
  | Layer | Insurance Equivalent |                                                                                    
  |-------|---------------------|                                                                                     
  | Intake APIs | Document submission, FNOL capture, photo upload |                                                   
  | Processing APIs | OCR, extraction, inference, normalization |                                                     
  | Agentic Framework | Triage, fraud flagging, decision support, subrogation ID |                                    
                                                                                                                      
  **Positioning would be:** "Build insurance AI without the infrastructure burden."                                   
                                                                                                                      
  **Potential buyers:** InsurTechs, system integrators, insurer internal dev teams, TPAs wanting AI capabilities.     
                                                                                                                      
  #### What's Compelling                                                                                              
                                                                                                                      
  1. **Nobody is doing this for insurance** — Everyone builds products, not infrastructure                            
  2. **Addresses the 93% problem differently** — "We enable you to build your own AI" vs "We'll do your claims for    
  you"                                                                                                                
  3. **Higher switching costs** — Once you build on the APIs, switching is painful                                    
  4. **Network effects** — More developers → more use cases → more data → better models                               
  5. **Less direct competition** — Not competing with Tractable, potentially enabling alternatives                    
                                                                                                                      
  #### What's Risky                                                                                                   
                                                                                                                      
  1. **Corti didn't START as infrastructure** — They started with 911 dispatch AI (specific product), proved it, then 
  became infrastructure                                                                                               
  2. **Healthcare vs Insurance dynamics differ** — Healthcare has massive documentation burden and clear API use      
  cases; insurance is more fragmented                                                                                 
  3. **Developer buyer unclear** — Healthcare has EHR vendors; insurance has... InsurTechs (small, cash-strapped)?    
  4. **API economics require scale** — Corti processes 1M+ interactions/week; insurance volume is lower               
  5. **"Infrastructure" is abstract** — Hard to demo, hard to calculate ROI                                           
                                                                                                                      
  #### The Key Insight                                                                                                
                                                                                                                      
  **Corti's actual journey:**                                                                                         
  - 2016-2018: Specific product — AI for 911 dispatch, cardiac arrest detection                                       
  - 2019-2021: Proved accuracy, built trust, published research                                                       
  - 2022-2023: Expanded to documentation, coding, workflows                                                           
  - 2024+: Now positions as "APIs for healthcare AI"                                                                  
                                                                                                                      
  **They earned the right to be infrastructure by proving the technology on a specific, high-stakes use case first.** 
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### Recommended Path: The Corti-Like Journey for Mysa                                                               
                                                                                                                      
  | Phase | Corti's Journey | Mysa Equivalent |                                                                       
  |-------|-----------------|-----------------|                                                                       
  | **1. Beachhead** | 911 dispatch AI — real-time cardiac arrest detection | Document extraction + inference — EAS,  
  photos, police reports with measurable STP lift |                                                                   
  | **2. Prove** | Published research, NHS adoption, regulatory trust | 2-3 insurer deployments, documented STP       
  improvement (10% → 25%) |                                                                                           
  | **3. Expand** | Documentation, coding, clinical workflows | Triage recommendations, fraud flagging, subrogation   
  identification |                                                                                                    
  | **4. Platform** | APIs for healthcare developers | APIs for insurance developers |                                
  | **5. Infrastructure** | "Build healthcare AI on Corti" | "Build insurance AI on Mysa" |                           
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### The Recommended Wedge: Extraction + Inference (B2B)                                                             
                                                                                                                      
  **Not** consumer EAS capture. **B2B document understanding:**                                                       
                                                                                                                      
  - **Intake:** Accept whatever documents get submitted (paper EAS, photos, police reports, statements)               
  - **Extraction:** Pull structured data from unstructured mess                                                       
  - **Inference:** Fill in gaps, resolve ambiguity, normalize across formats                                          
  - **Output:** Clean, structured claim data that pushes STP up                                                       
                                                                                                                      
  #### Why This Wedge                                                                                                 
                                                                                                                      
  | Criteria | Assessment |                                                                                           
  |----------|------------|                                                                                           
  | Buildable from day zero? | ✅ Yes — document AI is tractable |                                                    
  | Sellable without deep trust? | ✅ Yes — it's data quality, not decisions |                                        
  | Works EU and US? | ✅ Yes — different docs, same extraction problem |                                             
  | Generates data advantage? | ✅ Yes — you see documents, you learn |                                               
  | Path to decisions? | ✅ Yes — extraction → inference → triage → decisions |                                       
  | Defensible? | ⚠️ Partially — insurance-native inference is the moat, not raw OCR |                                
                                                                                                                      
  #### What Makes This Different from omni:us                                                                         
                                                                                                                      
  | | omni:us | Mysa |                                                                                                
  |---|---------|------|                                                                                              
  | Scope | EAS only | All documents (EAS, photos, police reports, statements) |                                      
  | Geography | EU-focused | EU + US |                                                                                
  | Capability | Extraction | Extraction + Inference (resolve contradictions, fill gaps) |                            
  | End game | Document processing | Platform / Infrastructure |                                                      
                                                                                                                      
  #### What Makes This Different from Sprout.ai                                                                       
                                                                                                                      
  | | Sprout.ai | Mysa |                                                                                              
  |---|-----------|------|                                                                                            
  | Focus | General insurance back-office | Claims-specific |                                                         
  | Depth | Document processing | Extraction + inference + path to decisions |                                        
  | Positioning | Point solution | Platform play |                                                                    
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### What Would Need to Be Nailed                                                                                    
                                                                                                                      
  #### 1. Inference, Not Just Extraction                                                                              
                                                                                                                      
  Extraction is commoditizing (AWS Textract, Google Document AI). The moat is **insurance-native inference**:         
  - Resolve contradictions between fields                                                                             
  - Infer missing values from context                                                                                 
  - Normalize across document formats                                                                                 
  - Understand what checkboxes MEAN, not just what they say                                                           
                                                                                                                      
  #### 2. Measurable STP Lift                                                                                         
                                                                                                                      
  The sales pitch can't be "we extract accurately." It must be "we increased STP from 10% to 25%."                    
                                                                                                                      
  Need clear metrics:                                                                                                 
  - STP rate before/after                                                                                             
  - Cycle time reduction                                                                                              
  - Cost per claim impact                                                                                             
                                                                                                                      
  #### 3. US Document Diversity                                                                                       
                                                                                                                      
  If we can crack US documents (police reports vary by state, no standardized forms, recorded statements), that's a   
  genuine differentiator. But it's hard.                                                                              
                                                                                                                      
  #### 4. Integration with Legacy Systems                                                                             
                                                                                                                      
  Insurers run on Guidewire, Duck Creek, custom COBOL. Need to plug in without requiring them to change. Budget 40% of
   engineering for integrations.                                                                                      
                                                                                                                      
  #### 5. First Customer Win                                                                                          
                                                                                                                      
  Need a mid-tier EU insurer willing to:                                                                              
  - Share historical claims data (to validate accuracy)                                                               
  - Run in shadow mode (extract but human verifies)                                                                   
  - Be a case study when we scale                                                                                     
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### The Trajectory                                                                                                  
                                                                                                                      
  **Year 1: Prove extraction + inference**                                                                            
  - One market (Portugal? Netherlands?)                                                                               
  - EU motor, material damage                                                                                         
  - Target: 95%+ extraction accuracy, measurable STP lift                                                             
  - Exit criteria: Customer willing to expand scope                                                                   
                                                                                                                      
  **Year 2: Add triage + recommendations**                                                                            
  - "Given this extracted data, here's the recommended action"                                                        
  - Not decisions — recommendations (easier trust barrier)                                                            
  - Expand to 3-5 insurers                                                                                            
                                                                                                                      
  **Year 3: Add decisioning**                                                                                         
  - Auto-approve low-risk claims                                                                                      
  - Enter ClaimSorted territory but SaaS, not TPA                                                                     
  - First US customer                                                                                                 
                                                                                                                      
  **Year 4+: Platform / Infrastructure**                                                                              
  - Open APIs for insurance developers                                                                                
  - "Build insurance AI on Mysa"                                                                                      
  - Multiple sectors, multiple geographies                                                                            
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### Key Strategic Questions (Unresolved)                                                                            
                                                                                                                      
  1. **What specific inference would we do that omni:us doesn't?** Need concrete examples — resolving checkbox        
  contradictions? Inferring speed from damage? Normalizing diagram interpretations?                                   
                                                                                                                      
  2. **Can we actually crack US document diversity?** This would be a differentiator but it's hard. Police reports    
  vary by state, no standardized forms.                                                                               
                                                                                                                      
  3. **What's the measurable outcome we'd sell?** STP lift? Cycle time reduction? Cost per claim? Need a number.      
                                                                                                                      
  4. **Who's the first customer?** Mid-tier EU insurer? US regional? TPA?                                             
                                                                                                                      
  5. **What's the demo that makes them say "I need this"?** The "911 cardiac arrest detection" equivalent for         
  insurance.                                                                                                          
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### The One-Liner (Draft)                                                                                           
                                                                                                                      
  > "Mysa is the intelligence layer for insurance claims. We start by understanding your documents better than anyone 
  — any format, EU or US. That data advantage compounds into triage, recommendations, and eventually AI-powered       
  decisions. Long-term, we're the infrastructure that powers AI-native insurance."                                    
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### Assumptions Added                                                                                               
                                                                                                                      
  - **A97:** Extraction + inference is a more tractable starting wedge than decisioning ⚠️ Needs validation           
  - **A98:** Insurance-native inference (not just OCR) is defensible against commodity document AI ⚠️ Needs validation
  - **A99:** STP lift is achievable through better extraction/inference (not just better decisions) ⚠️ Needs          
  validation                                                                                                          
  - **A100:** The "Corti for Insurance" infrastructure play is achievable after proving extraction ⚠️ Needs validation
  - **A101:** US document diversity is crackable with enough investment ⚠️ Needs validation                           
                                                                                                                      
  ---                                                                                                                 
                                                                                                                      
  ### Strategic Insights Added                                                                                        
                                                                                                                      
  - **Insight #29:** The wedge must be something buildable and sellable from day zero — decisioning requires trust and
   data that takes time to build                                                                                      
  - **Insight #30:** Corti didn't start as infrastructure — they started with 911 dispatch AI and BECAME              
  infrastructure after proving the technology                                                                         
  - **Insight #31:** Extraction is commoditizing; the defensible moat is insurance-native INFERENCE (understanding    
  what documents mean, not just what they say)                                                                        
  - **Insight #32:** The path is: Extraction → Inference → Triage → Decisions → Infrastructure                        
  - **Insight #33:** "Corti for Insurance" is the right end state but wrong starting pitch — need a concrete product
  that leads there

---

### Wedge Sharpening: Clean Data → Own Decisions

*Added: February 2025 — Product Discovery JAM Session*

#### The Thesis

Mysa's long-term vision is to **own the decision layer** in claims — approve/deny, reserve amount, settlement amount, repair vs total loss, fraud referral, subrogation pursuit. This is where the real value sits (it's what claims handlers are paid for, and where cycle time and money leak).

To get there, we need **clean, structured data** — you can't make good decisions on garbage inputs.

#### The Problem with "Clean Data" as a Wedge

"We need clean data" is what **every claims insurtech says**:
- omni:us: "We extract and structure EAS data"
- Sprout.ai: "We automate document processing"
- Shift Technology: "We ingest claims data for fraud detection"
- Hi Marley: "We capture structured communication data"

If clean data is the wedge, we're entering a crowded lane with players that have years of training data ahead.

**The real question isn't WHETHER we need clean data. It's: clean data for what, where, and for whom?**

#### Two Paths

| | Path A: Horizontal Data Layer | Path B: Vertical Data Wedge |
|---|---|---|
| **What** | Clean all claims data across lifecycle | Own data quality for ONE specific handoff/decision |
| **Compete with** | Guidewire ecosystem, omni:us, dozens of others | Nobody (if chosen correctly) |
| **Capital needed** | Massive | Lean |
| **Precedent** | — | Plaid (bank verification → all finance), Stripe (online payments → all commerce), Veeva (pharma CRM → life sciences) |

**Path B is how companies win.** You solve one specific problem so well you become the system of record for that slice — then expand.

#### The Key Insight from Phase 0-8 Mapping

**The most broken data isn't INSIDE a single system — it's at the BOUNDARIES between parties.**

Every time a claim crosses a boundary, data degrades:
- Re-keyed manually
- Reformatted with loss
- Translated with ambiguity
- Or just lost entirely

If this is true, the wedge isn't "clean data" generically — it's being the **structured interchange layer at a specific boundary**.

#### Candidate Boundaries (From Phase Mapping)

| # | Boundary | Phases | Pain Level | Buyer | Path to Decisions |
|---|----------|--------|------------|-------|-------------------|
| 1 | **FNOL intake** (policyholder → insurer) | 1-2 | High but crowded | Insurer | Triage, coverage check |
| 2 | **TPA handoffs** (insurer → TPA) | 4+ | Very high, overlooked | TPA or insurer | Assignment, reserve, authority |
| 3 | **Repair estimate exchange** (shop/appraiser → insurer) | 8 | High, fragmented | Insurer | Total loss, settlement amount |
| 4 | **Convention/subrogation** (insurer A ↔ insurer B) | 7-8 | Very high, arcane | Insurer | Liability, recovery amount |

#### Unresolved: Which Boundary?

Each boundary has different characteristics:

**Boundary 1 (FNOL intake)** — Most obvious, most competed. omni:us is here. Tractable is here. But it's also the highest volume entry point.

**Boundary 2 (TPA handoffs)** — Overlooked by startups, massive pain. Every TPA handoff involves re-keying the entire claim. But TPA market is relationship-driven and slow to adopt.

**Boundary 3 (Repair estimates)** — CCC/Mitchell/Audatex dominate estimation, but the handoff BETWEEN systems is broken. Supplements especially. Direct path to total loss and settlement decisions.

**Boundary 4 (Convention/subrogation)** — Most arcane, least competed, highest $ impact ($15B+ left on the table in US alone). But requires deep regulatory knowledge per market.

**Decision deferred** — need to complete Phase 9 (Decision) and Phase 10 (Settlement) mapping to see where the biggest decision-value concentration actually sits before committing to a boundary.

#### Assumptions Added

- **A102:** The most broken data in claims is at inter-party boundaries, not within single systems ⚠️ Needs validation with real claims handlers
- **A103:** Being the structured interchange layer at one boundary creates expansion rights to adjacent boundaries ⚠️ Needs validation
- **A104:** Clean data at a specific boundary naturally leads to owning decisions at that boundary ⚠️ Needs validation

#### Strategic Insights Added

- **Insight #34:** "Clean data" is a means, not a product — the wedge must be specific about WHICH data, WHERE, for WHOM
- **Insight #35:** Data degrades most at inter-party boundaries (policyholder↔insurer, insurer↔TPA, insurer↔shop, insurer↔insurer) — this is where the data quality problem actually lives
- **Insight #36:** The boundary you choose determines your expansion path to decisions — choose the boundary closest to the highest-value decisions

---
