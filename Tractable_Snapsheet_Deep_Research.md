# Tractable & Snapsheet: Deep Research Analysis
## Insurance Claims Automation Competitive Intelligence

---

# PART 1: TRACTABLE ($185M Funding, Photo-Based AI)

## Company Overview

- **Founded:** 2014, London (UK)
- **Total Funding:** ~$185M (Series E of $65M led by SoftBank Vision Fund 2 in 2023)
- **Valuation:** $1B+ (unicorn status since 2021 -- first computer vision unicorn in financial services)
- **Core Technology:** Deep learning computer vision for vehicle and property damage assessment
- **Training Data:** Tens of millions of annotated images from insurers, repair shops, and OEMs
- **Annualized Processing:** $7B+ in auto and home repairs/acquisitions
- **Key Clients:** 20+ of the global top 100 insurers including GEICO, Admiral, Covea, Ageas, Root Insurance
- **Geographic Presence:** US, UK, Spain, France, Japan, Italy, and broader Europe/Asia

---

## Phase-by-Phase Analysis

### Phase 1: FNOL (Instant Photo Assessment)

**What They Do:**
Tractable enables policyholders to submit smartphone photos of vehicle damage at the moment of FNOL. The AI processes these photos in real-time (30 seconds to 3 minutes) to produce an initial damage assessment and triage decision.

**How Technically:**
- Policyholder receives a link to Tractable's web-based app (no download required)
- App guides photo capture of the damaged vehicle
- Computer vision AI analyzes photos pixel-by-pixel using deep learning models
- AI identifies damaged parts, classifies damage type and severity
- Returns a damage severity score per part
- Covers damage to 80+ panels and parts in the US, regardless of vehicle make/model
- Uses VIN (Vehicle Identification Number) input combined with photos for vehicle-specific assessment

**Limitations/Gaps:**
- Photo quality dependency: consumer-taken photos may be poorly lit, angled, or incomplete
- Cannot assess hidden damage behind panels, under the hood, or beneath the vehicle
- Interior damage is invisible to exterior photo capture
- Mechanical/suspension damage not detectable from photos
- At FNOL, policyholders are often stressed and may not capture comprehensive photos
- Only assesses DAMAGE SEVERITY, not accident circumstances or fault

---

### Phase 2: Triage (Repair vs Total Loss from Photos)

**What They Do:**
Tractable's AI performs immediate repair-vs-total-loss triage from photos, which is one of their strongest use cases. They claim their AI is "far better" than traditional insurer checklists at identifying total losses early.

**How Technically:**
- AI assigns damage severity scores to each identified damaged part
- Compares aggregate damage severity against vehicle value thresholds
- Uses proprietary algorithms trained on millions of historical claims outcomes
- Factors in industry-standard visual rules developed in collaboration with body shops and insurers
- Returns a triage recommendation: repairable, likely total loss, or borderline (needs human review)

**Performance Claims:**
- Total loss calls are accurate 95-98% of the time according to Tractable
- Traditional insurer checklists miss 70% of vehicles that will eventually be flagged as total losses
- Tractable catches these earlier, reducing cycle time and rental costs

**Limitations/Gaps:**
- The 95-98% accuracy is for vehicles the AI confidently flags as total losses; uncertain cases still require human review
- Does not perform ACV (Actual Cash Value) calculations -- triage is based on damage severity relative to a threshold, not precise valuation
- Borderline cases (repair cost at 60-80% of ACV) remain difficult for photo-only assessment
- Hidden structural damage could push a "repairable" triage into total loss after teardown

---

### Phase 3: Investigation (Photo Evidence)

**What They Do:**
Tractable performs anti-fraud checks on submitted photos and can review estimate consistency. Their AI Subro product reviews subrogation demand packets from adverse carriers.

**How Technically:**
- AI checks photo metadata, consistency, and damage patterns for fraud indicators
- AI Subro reviews adverse insurer demand packets -- photos + estimate -- and verifies damage claims
- Generates pre-populated contention reports identifying disputes
- Customizable per-insurer to account for state regulations and company-specific standards
- Reduces subrogation review time from ~30 minutes to ~15 seconds per claim

**Limitations/Gaps:**
- CANNOT assess liability or fault from photos -- only damage severity
- Cannot reconstruct accident dynamics (angle of impact, speed, etc.)
- No capability for bodily injury investigation
- Photo-based fraud detection is limited to obvious inconsistencies; sophisticated fraud still needs human investigators
- Does not interview witnesses, review police reports, or analyze telematics data

---

### Phase 4: Assessment (AI Repair Estimate)

**What They Do:**
This is Tractable's core product. The AI generates line-by-line repair estimates from photos, and their "AI Review" product audits human-written estimates for accuracy and consistency. Admiral Seguros achieved 90% touchless estimates; GEICO uses AI Review to double-check estimates.

**How Technically:**
- **AI Estimating:** Computer vision identifies damaged parts and predicts repair operations (replace, repair, blend, refinish) per part. The AI's output is a list of part-level repair operations that is then combined with a repair cost database (Mitchell in North America, GT Motive in Europe) to produce a priced estimate.
- **AI Review (GEICO use case):** Appraiser or repairer uploads photos + their written estimate. AI cross-references the photos against the estimate to find inconsistencies (e.g., missing damage, incorrect labor hours, wrong operations). If inconsistencies are found, the claim is routed to a human adjuster.

**Performance Claims (Admiral Seguros Case Study):**
- 12,000 touchless claims processed in 2021
- 90% of estimates processed without human appraisers
- 98% of assessments completed in under 15 minutes
- 70-75% of customers complete the entire process in under 2 minutes
- GEICO: AI Review cuts 8 days out of cycle times; 50% of claims reviewed without human involvement

**Repair Database Integrations:**
- **US/North America:** Mitchell (primary partner since 2021, integrated via Mitchell Intelligent Open Platform). NO active CCC integration -- CCC and Tractable had a 5-year lawsuit (2018-2025) that recently settled. Tractable alleged CCC controls ~85% of the estimatics market and engages in anti-competitive behavior.
- **Europe:** GT Motive (Mitchell's European affiliate) for European repair cost data. This covers markets like Spain, France, UK, etc.
- **Audatex/Solera:** NO confirmed direct partnership. Audatex/Qapter is a competitor in the photo-estimating space, not a partner.

**Limitations/Gaps:**
- **Hidden damage is the fundamental limitation.** AI can only assess what is visible in photos. Industry data shows 63% of insurance estimates require supplements once body shops perform teardown and discover hidden damage (CCC Intelligent Solutions data).
- **Supplements:** Tractable's own head of automotive/property (Jimmy Spears) admitted: "I haven't seen an AI tool that has reduced supplement amounts because AI is only visually assessing the damage before teardown."
- **Complex repair procedures:** When repairs call for specific adhesives, techniques, or specialized procedures, the AI loses accuracy.
- **Average supplement gap:** Industry-wide, the gap between initial estimate and final approved repair cost is $1,200-$1,800 (CCC 2024 report).
- A repair shop case was documented where AI approved $1,200 for "minor" bumper damage that actually required $4,200 in structural repairs.
- Mitchell 2018 data: traditional photo estimates had supplement rates of 27-29%, with supplements averaging more than 50% of the initial appraisal value.

---

### Phase 5: Decision (Repair vs Total Loss)

**What They Do:**
Tractable automates the repair-vs-total-loss decision based on AI-estimated repair costs relative to the vehicle's value. This is used by insurers to route claims into the correct workflow immediately.

**How Technically:**
- AI-generated repair estimate is compared against configurable total loss thresholds (typically 70-80% of ACV depending on jurisdiction)
- Business rules layer applies insurer-specific and state-specific regulations
- Clear cases (well below or above threshold) are auto-decided
- Borderline cases are flagged for human review

**Limitations/Gaps:**
- Tractable does NOT perform ACV (Actual Cash Value) calculations itself. ACV is typically determined by separate valuation tools (e.g., CCC Valuescope, J.D. Power, Black Book, etc.)
- The decision depends on the accuracy of the underlying estimate, which has the hidden-damage limitations described above
- A vehicle initially triaged as "repairable" may flip to total loss after teardown reveals hidden damage, causing workflow disruption

---

### Phase 6: Settlement (GEICO Partnership)

**What They Do:**
For simple claims, Tractable enables straight-through processing (STP) where the AI estimate can be used directly to generate a settlement offer. In the GEICO partnership, AI Review checks estimates before payment authorization.

**How Technically:**
- AI-generated or AI-reviewed estimate feeds into the insurer's claims management system
- For simple/touchless claims: automated settlement offer generated and sent to policyholder
- Beesafe (Vienna Insurance Group) example: AI creates damage valuation, generates immediate payment offer, resolves claims in minutes
- For GEICO: AI Review validates body shop estimates before payment, reducing overpayment risk

**Limitations/Gaps:**
- Settlement is only as accurate as the underlying estimate -- hidden damage means supplements will follow
- Tractable does NOT handle the payment/disbursement itself
- Does not handle total loss settlement negotiations or ACV disputes
- Does not manage salvage, title processing, or lienholder payoff
- No bodily injury settlement capability whatsoever

---

## Critical Questions Answered

### Is their photo AI actually accurate for complex damage?

**No, not reliably.** For visible exterior damage (scratches, dents, panel damage), the AI performs well. But for structural damage, hidden damage behind panels, frame damage, suspension damage, and mechanical damage, the AI fundamentally cannot assess what it cannot see. The industry supplement rate of 63% (CCC data) applies to all photo-based estimates, including AI-generated ones. A documented case showed AI approving $1,200 for damage that required $4,200 in structural repairs.

### What happens with supplements after their initial estimate?

Tractable's own leadership acknowledges that **no AI tool has reduced supplement amounts** because AI assesses only visible damage before teardown. Their approach is to generate a more accurate initial estimate to reduce supplement frequency, but they have not published data showing they actually achieve lower supplement rates than traditional photo estimates. The fundamental problem remains: you cannot see behind panels in a photo.

### Do they work with European repair cost databases?

**Yes, through GT Motive** (Mitchell's European affiliate). This provides European labor rates, parts pricing, and repair procedures. They do NOT have a direct Audatex/Solera partnership -- Audatex's Qapter is a direct competitor.

### How do they handle total loss valuation (ACV)?

**They do not.** Tractable determines whether a vehicle is LIKELY a total loss based on damage severity, but the actual ACV calculation is handled by separate valuation tools. They are a damage assessment company, not a vehicle valuation company.

### Can they assess liability from photos?

**No.** Tractable assesses ONLY damage severity and repair costs. It cannot determine fault, reconstruct accidents, or assess liability. Photos of damage patterns could theoretically inform accident dynamics, but Tractable does not offer this capability.

### What about interior, mechanical, and frame damage?

**This is a hard limitation.** Tractable's AI is based on exterior photos. Interior damage (dashboard, airbag deployment details, electronics), mechanical damage (engine, transmission, suspension geometry), and frame damage (requiring 3D measurement systems like Car-O-Liner or Celette) are beyond its capability. These require physical inspection and specialized equipment.

### Do they handle bodily injury?

**No.** Tractable is exclusively a physical damage (vehicle/property) assessment tool. Bodily injury claims are served by different AI companies (e.g., EvenUp, DigitalOwl, Charlee.ai).

### Actual accuracy rate vs human appraisers?

**No published head-to-head comparison exists.** Tractable claims "human-like accuracy" but has not published controlled studies comparing AI estimate accuracy to experienced human field appraisers. The 90% touchless rate at Admiral Seguros measures throughput, not accuracy. The 95-98% figure applies specifically to total loss triage calls, not line-by-line estimate accuracy.

### Body shop acceptance of estimates?

**Mixed.** Some shops (like Regina Auto Body) partner with Tractable for customer convenience and faster quotes. However, many collision repairers view AI estimates skeptically: "AI is a waste of time because it isn't the same as an educated collision repair professional." Body shops know that photo-based estimates (AI or human) will almost always require supplements, and the industry frustration is with the supplement process, not the AI specifically. Tractable is positioning itself as a tool FOR body shops (customer acquisition, faster quotes) rather than just a tool used against them.

---

# PART 2: SNAPSHEET ($125.6M Funding, Virtual Claims Platform)

## Company Overview

- **Founded:** 2011, Chicago, IL (US)
- **Total Funding:** $125.6M from investors including Nationwide, Liberty Mutual, Intact Ventures
- **Revenue (2025):** ~$124.6M annually
- **Employees:** ~501 across 5 continents
- **Claims Managed:** 4.3M+ claims annually, $15.3B in indemnity processed
- **Key Clients:** 140+ partners including 16 of the top 20 P&C carriers; clients include Zurich, Sedgwick, Kin Insurance, Clearcover, State Farm (as vendor), USAA (as vendor)
- **Geographic Presence:** Primarily US; limited international via Zurich (Ireland, planned Europe/LatAm/APAC) and Generali (Serbia)
- **BBB Status:** NOT accredited; 7 unresponded complaints on file

---

## Phase-by-Phase Analysis

### Phase 1: First Contact (Photo Capture Guidance)

**What They Do:**
Snapsheet provides a fully digitized customer-facing platform for capturing photos of vehicle damage. The platform guides policyholders through taking the right photos with intuitive instructions.

**How Technically:**
- Web-based and mobile app-based photo capture interface
- Step-by-step guided instructions for photographing damage from required angles
- Omni-channel communication (SMS, email, web link)
- Photos are uploaded directly into the claims management system
- No app download required -- works via web link

**Limitations/Gaps:**
- Same fundamental limitation as all photo-based systems: consumer photo quality varies
- Customers in distress after accidents may not follow instructions carefully
- Cannot force specific angles or lighting conditions
- No video capture or walk-around capability documented

---

### Phase 2: FNOL (Virtual Appraisal at FNOL)

**What They Do:**
Snapsheet digitizes the entire FNOL process, from omni-channel intake to initial damage photo capture and preliminary assessment, all within a single platform.

**How Technically:**
- Cloud-native, API-enabled SaaS platform
- Omni-channel intake: phone, web, mobile, chatbot
- Automated data collection and claim creation
- Photo-based damage capture integrated at FNOL
- Instant claim routing based on configurable rules (skill set, licensing, geography, claim type, complexity, vendor involvement)
- Pre-engineered workflows trigger downstream processes automatically

**Limitations/Gaps:**
- Platform is a workflow/CMS tool, not primarily an AI damage assessment engine like Tractable
- Initial triage quality depends on rules engine configuration, not deep learning
- Complex claims still require human judgment at FNOL

---

### Phase 3: Triage (Rules Engine)

**What They Do:**
Snapsheet uses configurable business rules to triage claims into appropriate workflows -- simple vs complex, auto-approval candidates vs human review, repair vs potential total loss.

**How Technically:**
- No-code configurable workflows
- Smart assignment logic adapts to exposure type, policy type, and partner requirements
- Claims routed to right expert based on: skill set, licensing, geography, claim type, complexity, vendor involvement
- Automation balanced with human review for sensitive/high-risk scenarios (litigation, liability, large-loss)

**Limitations/Gaps:**
- Rules-based triage is not AI-driven computer vision like Tractable -- it's workflow automation
- Triage accuracy depends entirely on how well rules are configured
- Cannot visually assess damage severity from photos for triage purposes (that's the appraiser's job)
- No documented total-loss-probability scoring from photos at triage

---

### Phase 4: Assessment (Virtual Appraisals)

**What They Do:**
This is Snapsheet's core historic product. They employ human appraisers/estimators who write estimates based on customer-submitted photos, supplemented by AI tools. This is a HYBRID model: technology-enabled human appraisal, not pure AI.

**How Technically:**
- Customer submits photos via Snapsheet's platform
- Snapsheet's in-house appraisal team (human estimators) reviews photos
- Estimators write repair estimates using standard estimating platforms (CCC, Mitchell, Audatex)
- AI assists with photo analysis and pre-population of estimate data
- Estimates are returned to the insurer/policyholder
- Platform manages supplement workflow when body shops identify additional damage

**Performance Claims:**
- $7B+ in appraisals completed
- 90%+ virtual appraisal adoption rate
- Sedgwick case study: 38% reduction in cycle time
- 15% reduction in operational costs via process automation

**Limitations/Gaps:**
- **Accuracy issues are well-documented.** BBB complaints describe initial photo estimates for $4,800 that turned out to be $8,600 upon live inspection. Other complaints describe estimates at half the actual damage amount.
- Supplement process is a major pain point: customers report waiting weeks for supplement reviews, with 6+ follow-up calls needed
- Employee reviews (Glassdoor 3.1/5) indicate quantity is prioritized over quality -- high volume processing with little room for error
- "Cherry picking" of easy assignments means difficult claims are left to less experienced estimators
- Parts prices cited in estimates don't always include shipping
- Labor costs described as "low-balled" by customers and body shops

---

### Phase 5: Decision (Auto-Approval)

**What They Do:**
Snapsheet's rules engine can auto-approve claims that fall within configurable thresholds, routing simple claims to instant settlement while flagging complex claims for human review.

**How Technically:**
- Configurable auto-approval thresholds based on claim amount, damage type, policy terms
- Business rules trigger automatic decision workflows
- Complex claims (litigation, liability disputes, large losses) always routed to human review
- Automated reserving based on initial assessment

**Limitations/Gaps:**
- Auto-approval is rules-based, not AI-driven visual assessment
- If the underlying virtual appraisal is inaccurate (which complaints suggest happens frequently), auto-approval locks in a wrong decision
- No documented AI-driven repair-vs-total-loss scoring like Tractable offers

---

### Phase 6: Settlement (Digital Payment + Total Loss)

**What They Do:**
Snapsheet offers integrated digital payment processing and recently launched "Snapsheet Total" (July 2024) for end-to-end total loss claims management.

**How Technically:**
- **Payments:** Push to Debit (P2D), ACH, and check payment options. Instant payments at any step in the process. Automated payment workflows that eliminate adjuster touchpoints.
- **Snapsheet Total (launched July 2024):** End-to-end total loss solution covering valuation, offer creation, customer engagement, and resolution. Uses appraisal team for precise valuations. Pre-engineered workflows and integrated digital payments. Manages negotiations with data-driven valuations.

**Limitations/Gaps:**
- Snapsheet Total is very new (launched mid-2024) -- limited track record
- Total loss valuation relies on their appraisal team + third-party data, not proprietary valuation AI
- Customer complaints suggest settlement amounts are often inadequate and require renegotiation
- Payment speed is good, but the issue is getting to the RIGHT amount, not paying it quickly

---

### Phase 7: Close

**What They Do:**
Snapsheet manages claim closure including final payments, subrogation handoff, and reporting within their claims management platform.

**How Technically:**
- Automated closure workflows
- Digital document management
- Subrogation management capabilities
- Reporting and analytics dashboard
- Integration with insurer systems via API

---

## Critical Questions Answered

### Is Snapsheet an appraisal company or a tech company?

**Both -- and this is their identity tension.** Snapsheet has TWO distinct business lines:
1. **Technology-enabled appraisal services** (the original business): They employ human estimators who write virtual appraisals. This is fundamentally a managed services / BPO business powered by technology.
2. **SaaS claims management platform** (the newer growth business): Cloud-native software for claims workflow, payments, and automation that insurers can license.

The appraisal services side makes them a vendor that insurers can use INSTEAD of independent adjusters. The SaaS side makes them a technology platform. Investors value them as a tech company; the revenue mix likely still skews toward appraisal services.

### How does virtual appraisal accuracy compare to field inspections?

**Virtual appraisals are meaningfully less accurate than field inspections, particularly for moderate-to-heavy damage.** Industry data (Mitchell 2022) found over 70% of photo-based insurance estimates required supplements once shops uncovered additional damage. CCC's 2024 data shows 63% of all repairs involve supplemental claims. The average gap between initial estimate and final approved repair cost is $1,200-$1,800. Snapsheet's BBB complaints include cases where virtual estimates were 40-55% below actual repair costs.

### Do they handle the full claim or just appraisal?

**They now offer the full claim lifecycle.** Their platform covers FNOL intake through claims management, assessment, payment processing, total loss, and closure. However, their deepest capability and longest track record is in the appraisal/assessment portion. The full claims management platform is a more recent expansion and competes with established players like Guidewire and Duck Creek.

### Complex claims handling?

Snapsheet claims to handle multi-vehicle, commercial, trucking, fleet, and specialty vehicle claims. Their platform supports configurable workflows for complex scenarios. However, their documented strengths are in personal auto physical damage. Commercial and complex claims capability is marketed but less proven at scale. Their platform does balance automation with human review for litigation, liability, and large-loss events.

### The "40% cost reduction" claim -- is it real?

**Unverifiable from public sources.** Snapsheet markets various cost reduction figures:
- "Reduce costs by half" (marketing claim)
- "Up to 15% reduction in operational costs" (more modest, documented with Sedgwick)
- "38% reduction in cycle time" (Sedgwick case study -- cycle time, not cost)
- "70% cycle time reduction" (marketing claim)

The 40% figure likely conflates multiple savings: reduced IA (Independent Adjuster) costs, faster cycle times reducing rental/storage, and lower per-claim processing costs. Actual cost savings depend heavily on the insurer's baseline efficiency.

### Do they operate in Europe?

**Minimally.** International operations are limited:
- Zurich Insurance partnership (announced 2018) planned deployment in Ireland first, then Europe/LatAm/APAC -- but no public results or updates from this expansion have been published since
- Generali deployment in Serbia (announced 2020) for motor claims
- No evidence of significant ongoing European operations
- Core business remains overwhelmingly US-focused

### How do body shops react to virtual appraisals?

**Negatively, in general.** Body shops widely complain about virtual appraisals (from Snapsheet and all virtual providers):
- Estimates consistently miss hidden damage
- Parts prices don't reflect actual costs or include shipping
- Labor rates are below market in many regions
- Supplement process is slow and adversarial
- Shops feel virtual appraisals are designed to minimize payouts, not ensure proper repairs
- The "write for what you can see" philosophy systematically underestimates repair costs

### What happens when their virtual estimate is wrong?

**The supplement process kicks in -- and it's painful.** Based on customer and body shop complaints:
1. Body shop begins repairs and discovers additional damage
2. Shop writes a supplement (additional damage/operations)
3. Supplement is submitted to Snapsheet for review
4. Review takes days to weeks (customers report 2+ weeks and 6+ calls)
5. Supplement may be partially approved, requiring further negotiation
6. Customer's vehicle sits in the shop during the entire dispute

This is the fundamental weakness of all virtual/photo-based appraisal models and is not unique to Snapsheet.

---

# PART 3: HEAD-TO-HEAD COMPARISON

| Dimension | Tractable | Snapsheet |
|---|---|---|
| **Core Identity** | AI/computer vision company | Tech-enabled appraisal + SaaS claims platform |
| **Primary Technology** | Deep learning computer vision | Workflow automation + human appraisers |
| **Assessment Method** | AI-only (photos to estimate in seconds) | Human estimators reviewing photos |
| **Estimate Speed** | 15 seconds to 3 minutes | Minutes to hours (human-dependent) |
| **Claim Coverage** | Damage assessment only (one phase) | Full claim lifecycle (FNOL to close) |
| **Lines of Business** | Auto physical damage + property | Auto, property, commercial, trucking |
| **Bodily Injury** | No | No (claims platform could route BI, but no BI assessment) |
| **Liability Assessment** | No | No |
| **Total Loss Triage** | Yes (95-98% accuracy claimed) | Rules-based only |
| **Total Loss Valuation (ACV)** | No | Yes (via Snapsheet Total, launched 2024) |
| **Repair Cost Databases** | Mitchell (US), GT Motive (Europe) | CCC, Mitchell, Audatex (all major platforms) |
| **European Presence** | Strong (Covea FR, Admiral ES, Ageas UK, + others) | Minimal (Zurich Ireland planned, Generali Serbia) |
| **Payment Processing** | No | Yes (P2D, ACH, check) |
| **Supplement Handling** | Does not reduce supplements (per own admission) | Manages supplement workflow (slow, per complaints) |
| **Body Shop Relations** | Positioning as tool FOR shops (marketing, conversion) | Adversarial (per shop feedback) |
| **Subrogation** | Yes (AI Subro product) | Basic subrogation management |
| **Fraud Detection** | Photo-based fraud checks | Rules-based |
| **CCC Relationship** | Hostile (5-year lawsuit, settled 2025) | Compatible/integrated |
| **Funding** | $185M | $125.6M |
| **Revenue** | Not disclosed (processes $7B+ annually) | ~$124.6M (2025) |

---

# PART 4: KEY INSIGHTS AND GAPS

## What Neither Company Does

1. **Bodily injury assessment** -- completely outside both companies' scope
2. **Liability/fault determination** -- neither analyzes accident causation
3. **Hidden damage detection** -- both are fundamentally limited by photo-only assessment
4. **Mechanical/frame damage assessment** -- requires physical inspection and 3D measurement
5. **Interior damage assessment** -- not visible from exterior photos
6. **Accurate first-time estimates eliminating supplements** -- the industry supplement rate of 63% applies to both AI and human photo-based estimates

## The Fundamental Problem with Photo-Based Assessment

The entire category (Tractable, Snapsheet, Qapter/Solera, CCC Photo) shares one critical limitation: **you cannot see behind panels in a photograph.** This means:

- All photo-based estimates are inherently "best case scenario" estimates
- Supplements are structural to the model, not a bug to be fixed
- The 63% supplement rate (CCC 2024) and $1,200-$1,800 average gap (CCC 2024) are INDUSTRY-WIDE problems
- No AI advancement will solve this without fundamentally different sensing technology (e.g., 3D scanning, X-ray, or requiring teardown photos)

## European Market Considerations

- **Tractable has strong European presence** via Mitchell/GT Motive integration, with live deployments at Covea (France), Admiral Seguros (Spain), Ageas (UK), and Beesafe (Vienna Insurance Group)
- **Snapsheet is essentially US-only** with token international presence
- European repair databases: GT Motive and Audatex dominate. Tractable works with GT Motive. Snapsheet would need to integrate with these for meaningful European expansion.

---

## Sources

- [Tractable: AI in claims processing, what it does and doesn't do - Repairer Driven News](https://www.repairerdrivennews.com/2024/03/27/tractable-ai-in-claims-processing-what-it-does-and-doesnt-do/)
- [Tractable AI far better than insurer checklists at flagging total losses - Repairer Driven News](https://www.repairerdrivennews.com/2020/06/09/tractable-ai-much-better-than-humans-at-flagging-total-losses-immediately/)
- [GEICO to use Tractable AI Review to double-check estimates - Repairer Driven News](https://www.repairerdrivennews.com/2021/05/27/geico-to-use-tractable-ai-to-double-check-estimates/)
- [Admiral Seguros Case Study - Tractable](https://tractable.ai/case-studies/admiral-seguros/)
- [GEICO partners with Tractable - PR Newswire](https://www.prnewswire.com/news-releases/geico-partners-with-tractable-to-accelerate-accident-recovery-with-ai-301299295.html)
- [Tractable and Mitchell combined solution - PR Newswire](https://www.prnewswire.com/news-releases/tractable-and-mitchell-to-offer-combined-solution-for-ai-vehicle-repair-estimating-301215868.html)
- [Tractable partners with Covea - Tractable](https://tractable.ai/tractable-partners-with-covea-frances-leading-auto-insurer-to-deploy-ai/)
- [Tractable Series E funding - PR Newswire](https://www.prnewswire.com/news-releases/tractable-ai-raises-65m-in-series-e-funding-led-by-softbank-vision-fund-2--investment-to-power-next-generation-ai-for-instant-visual-assessments-within-the-automotive-and-property-ecosystems-301879017.html)
- [CCC, Tractable reach settlement in five-year court case - Repairer Driven News](https://www.repairerdrivennews.com/2025/01/23/ccc-tractable-reach-settlement-in-five-year-court-case/)
- [Tractable AI Subro - Tractable](https://tractable.ai/tractables-ai-subro-expedites-insurers-review-of-demand-packets/)
- [AI and Auto Body - BodyShop Business](https://www.bodyshopbusiness.com/ai-and-auto-body/)
- [Touchless line-by-line claims one year on - Tractable](https://tractable.ai/touchless-line-by-line-auto-insurance-claims-one-year-on/)
- [Tractable and Verisk for property - Verisk](https://www.verisk.com/company/newsroom/tractable-teams-up-with-verisk-to-offer-ai-powered-estimates-for-property-damage/)
- [Snapsheet Claims Management - Snapsheet](https://www.snapsheetclaims.com/solutions/claims/)
- [Snapsheet Appraisals - Snapsheet](https://www.snapsheetclaims.com/solutions/insurance-appraisals/)
- [Snapsheet Total launch - PR Newswire](https://www.prnewswire.com/news-releases/snapsheet-introduces-snapsheet-total-transforming-total-loss-claims-with-unmatched-accuracy-cost-effectiveness-and-efficiency-302252617.html)
- [Snapsheet 2023 Results - PR Newswire](https://www.prnewswire.com/news-releases/accelerating-success-snapsheets-2023-results-and-strategic-vision-for-innovative-claims-management-302060151.html)
- [Snapsheet BBB Profile - Better Business Bureau](https://www.bbb.org/us/il/chicago/profile/computer-software-developers/snapsheet-inc-0654-90008433/customer-reviews)
- [Snapsheet and Zurich - PR Newswire](https://www.prnewswire.com/news-releases/snapsheet-and-zurich-insurance-group-collaborate-bringing-innovative-claims-software-to-international-businesses-300755591.html)
- [Snapsheet Generali Serbia - GlobeNewswire](https://www.globenewswire.com/news-release/2020/11/11/2124702/0/en/Snapsheet-Appraisals-Software-Goes-International-with-Generali-in-Serbia.html)
- [Snapsheet Sedgwick Case Study - Snapsheet](https://www.snapsheetclaims.com/wp-content/uploads/2022/06/Snapsheet-Appraisals-Sedgwick-Case-Study.pdf)
- [Snapsheet G2 Reviews](https://www.g2.com/products/snapsheet-snapsheet/reviews)
- [Snapsheet Commercial Lines - Snapsheet](https://www.snapsheetclaims.com/solutions/commercial-lines)
- [Insurance Business America - Snapsheet Case Study](https://www.insurancebusinessmag.com/us/news/technology/case-study-snapsheets-virtual-claims-management-technology-406637.aspx)
- [Snapsheet Business Model - CanvasBusinessModel](https://canvasbusinessmodel.com/blogs/how-it-works/snapsheet-how-it-works)
