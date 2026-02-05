# Claims Journey Discovery — Product Discovery Document

> **Purpose:** Map the complete, granular claims journey across Motor, Health, and Home/Property to identify where pain lives, where Mysa fits, and where the moat is.
> **Approach:** Build the journey step by step, challenging assumptions, flagging EU vs US differences, and noting where lines of business overlap vs diverge. We are building this collaboratively — not mapping everything at once, but going phase by phase, jamming on each step.
> **Focus:** Motor claims first. Health and Home/Property will be mapped later.
> **Status:** In Progress — Phases 0-3 mapped, Phase 4 (First Contact) next.

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
| **Clean EAS** — both signed, matches convention scenario | **NO** — EAS is legally sufficient | Handler reviews form, matches to fault table, processes. Nobody picks up the phone. | ~60-70% |
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

**Summary: The overlap is concentrated in the first ~30-40% of the journey** — intake, documentation, communication. The back 60-70% (investigation, decision, payment, recovery) is insurer-only. Advocacy and multi-insurer management are broker-only.

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
- This is already happening — direct digital claims filing is growing, and for the ~60-70% of EU motor claims that follow the clean EAS path, broker involvement in claims is increasingly unnecessary.

### Where the Thesis Is WRONG ❌ — And Why It Matters Strategically

#### a) Brokers Are Consolidating and Getting MORE Powerful, Not Less

- PE money is flooding into broker M&A — **60-70% of all insurance M&A activity in Europe** is broker consolidation
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

## Phases 5-11: TO BE MAPPED

| Phase | Name | Key Questions |
|---|---|---|
| 5 | FNOL (First Notice of Loss) | What information is captured? What systems? How long does this take? |
| 6 | Triage | How are claims categorized? What determines fast-track vs. investigation? |
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
| F4 | 🇪🇺 EAS Quality | 3 - Reconciliation | Is the EAS complete and does it match a convention scenario? | 3 |
| F5 | 🇺🇸 Claim Filing Type | 3 - Reconciliation | First-party, third-party, or both? | 3 |
| F6 | 🇺🇸 Fault System | 3 - Reconciliation | No-fault state or at-fault state? | 2 |

### Fork Chain (How Decisions Connect):
```
F1 (Injured?) 
├── YES → Bodily injury path (police take over)
└── NO → F2 (Cooperative?)
         ├── YES → F3 (EU vs US?)
         │         ├── 🇪🇺 EU → EAS filled → F4 (EAS Quality?)
         │         │                           ├── Clean → Convention auto-resolves
         │         │                           ├── Unclear → Clarification needed
         │         │                           └── Disputed → Full investigation
         │         └── 🇺🇸 US → F5 (Filing type?) → F6 (Fault system?)
         ├── NO (Disputes) → Police called, no EAS
         └── FLED (Hit & run) → Police, guarantee fund path
```

---

## Assumptions Log

| # | Assumption | Status | Notes |
|---|---|---|---|
| A1 | ~50% of EAS forms are still filled out on paper | ✅ Validated | Confirmed by Tiago |
| A2 | US police involvement threshold is ~$500-$1,000 in most states | ⚠️ Approximate | Varies significantly by state |
| A3 | Health pre-authorization is the dominant pattern in European private health insurance | ⚠️ Needs validation | May vary by market and product type |
| A4 | EU convention systems handle ~70-80% of motor claims automatically | ⚠️ Needs validation | Based on industry knowledge, not confirmed data |
| A5 | Clean EAS path (no insurer call to driver) represents ~60-70% of EU motor claims | ⚠️ Needs validation | Related to A4 |
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
---

## Key Strategic Insights (Running List)

1. **Europe produces structurally cleaner data at origin** than the US (EAS = single agreed document vs. competing narratives). This supports the Europe-first strategy beyond just the licensing advantage.

2. **Convention systems are "pre-computed liability"** — essentially lookup tables for fault. 70-80% of EU motor claims can be auto-resolved. The 20-30% that can't are where the expensive, slow investigation happens. This is where AI/automation adds the most value.

3. **The US system is incredibly labor-intensive even for simple claims** — up to 4 recorded statements for a fender bender. Different automation opportunity: extracting structured data from voice/text vs. processing structured forms.

4. **Health insurance claims are fundamentally different** — they're request-approval workflows, not event-response workflows. This reinforces the motor-first bet.

5. **The EAS is a brilliant concept with terrible execution** — a standardized, agreed-upon, structured document that's still 50% paper and filled out by stressed people with shaking hands. There's a clear digitization opportunity, but it may already be partially addressed by insurer apps.
