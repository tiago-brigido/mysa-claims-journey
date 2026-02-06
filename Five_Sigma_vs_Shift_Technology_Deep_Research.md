# Five Sigma (Clive) vs Shift Technology: Deep Research Report
## Insurance Claims Automation — Phase-by-Phase Analysis

**Research Date:** February 6, 2026

---

# PART 1: FIVE SIGMA ("CLIVE" AI ASSISTANT)

## Company Overview

| Attribute | Detail |
|---|---|
| **Founded** | 2017, Israel (HQ: Rocky Hill, Connecticut) |
| **Total Funding** | ~$20M (Series A); NOTE: the user-stated $75M figure is NOT confirmed by public sources — Crunchbase/Tracxn show ~$20M total raised |
| **Revenue (2024)** | $10.1M (up from $3.6M prior year — ~180% growth) |
| **Team Size** | 53 people |
| **Key Investors** | Aquiline Capital Partners, 83North, F2 Venture Capital, Pipeline Capital Partners, Google Cloud |
| **Geographic Split** | ~70% US, ~30% Europe/UK/Australia |
| **Technology Stack** | Google Gemini LLM, Vertex AI, Google Cloud, LangChain, LangSmith |
| **Core Product** | Clive (Multi-Agent AI Claims Expert) + AI-Native Claims Management Platform |
| **Known Customers** | Qover, INSHUR, Xceedance, Indemnity National Insurance Company (INIC), L+M Development Partners |
| **Partnerships** | Sutherland (claims modernization), Liberate (voice AI for FNOL), Vitesse (payments) |

---

## Phase-by-Phase Analysis: Five Sigma / Clive

### 1. FIRST CONTACT / ASSIGNMENT

**What they do:**
Clive's Triage Agent analyzes incoming claims in real time and uses an AI-driven severity scoring model to automatically route each claim to the right adjuster or specialist. The system eliminates manual guesswork and reassignments by matching claims to the most appropriate resource from the outset.

**How they do it technically:**
- Clive uses a severity scoring model powered by Google Gemini
- Multi-agent architecture where a dedicated Triage Agent scores severity, complexity, and urgency
- Claims are routed based on configurable rules tied to the insurer's SOP
- Exposed via REST APIs — works on top of ANY existing CMS (Guidewire, Duck Creek, or proprietary)
- Partnership with Liberate provides 24/7 voice AI intake, so first contact can be fully automated with zero hold times, in any language

**Limitations/Gaps:**
- Routing quality depends entirely on the insurer's SOP configuration — Clive follows rules, it does not independently optimize assignment
- API dependency: When deployed on top of legacy CMS, Clive's capabilities are constrained by the limitations of that system's APIs
- No evidence of workload balancing or adjuster capacity optimization — it routes based on claim characteristics, not adjuster availability/expertise matching
- Small customer base means the severity scoring model has been trained on limited data compared to industry incumbents

---

### 2. FNOL INTAKE

**What they do:**
Clive transforms unstructured incident details from emails, voicemail, chat, text, portal, and WhatsApp into structured, actionable FNOL reports. A dedicated FNOL Agent collects and structures first-notice details and required documents to set up a claim in the system.

**How they do it technically:**
- Multi-modal input processing via Gemini's multi-modality: text, images, voice, and video
- LangChain integration enables natural language conversation interfaces
- Liberate partnership (July 2025) handles voice intake specifically — policyholders can file 24/7 in any language
- Data flows automatically into Clive or the CMS, triggering downstream automation
- Unstructured-to-structured data conversion using NLP

**Limitations/Gaps:**
- Voice AI for FNOL is via a PARTNERSHIP (Liberate), not native — adds integration complexity and a vendor dependency
- No evidence of real-time photo/video assessment at FNOL (e.g., damage estimation from uploaded photos)
- Multi-language support comes from Liberate, not Clive directly — unclear how well Clive handles non-English policy documents or claims details
- No mention of integration with telematics data or IoT sources at FNOL
- The quality of FNOL data extraction from handwritten documents or poor-quality images is not documented

---

### 3. TRIAGE / ROUTING

**What they do:**
Real-time analysis of incoming claims using AI-driven severity scoring to automatically triage and route. Claims are scored for complexity, and a determination is made whether the claim can go through STP or requires human handling.

**How they do it technically:**
- The Triage Agent evaluates multiple dimensions: severity, coverage type, policy terms, potential exposure
- April 2025 product update added "Claim Complexity Assessment" capabilities
- Configurable thresholds — insurers set which claims auto-process vs. require human review
- Claims that don't meet STP criteria or are flagged for exceptions/suspicion are documented with reasoning and passed to manual processing

**Limitations/Gaps:**
- No published triage accuracy rate — we know "99% accuracy" is Shift's claim, Five Sigma hasn't published an equivalent metric
- Complexity assessment is relatively new (April 2025) — maturity is questionable
- Triage is only as good as historical data feeding the model — with a 53-person company and limited customer base, training data volume is a concern
- No evidence of handling regulatory-specific triage requirements (e.g., EU convention systems like IRSA, CARD, IDS, CIDE)

---

### 4. INVESTIGATION / LIABILITY

**What they do:**
The Liability Agent determines liability using expert analysis and contextual reasoning, drawing from both structured and unstructured claim data. The Fraud Agent detects anomalies, discrepancies within documents and images, and authenticity issues. A digital bodily injury evaluation module itemizes, assesses, and aggregates damages.

**How they do it technically:**
- Liability determination through AI-driven analysis of incident descriptions, witness statements, police reports, and policy terms
- Coverage Agent reads specific policy terms, understands the incident, and matches them
- Fraud Agent uses document/image analysis for anomaly detection
- Multi-modal analysis (Gemini) can process photos, videos, and documents
- Clive trained on "a decade of adjuster best practices and insurance workflows"

**Limitations/Gaps:**
- **CRITICAL**: For complex situations, Clive "consults with its colleagues — human adjusters and claim managers." This confirms Clive is NOT truly autonomous for investigation — it is a COPILOT for complex claims
- Five Sigma's own CEO acknowledges: "You can't just throw ChatGPT at a 10-year-old bodily injury claim — you need proper workflows, controls, audit trails, and fail-safes"
- No evidence of independent external data gathering (e.g., medical records requests, police report retrieval, witness contact)
- Liability determination for multi-party incidents or complex comparative/contributory negligence scenarios is not documented
- Fraud detection appears basic compared to Shift's purpose-built fraud engine — no network fraud detection, no cross-carrier data analysis
- **No EU convention system support documented** (IRSA, CARD, IDS, CIDE) — a major gap for European markets

---

### 5. ASSESSMENT / RESERVES

**What they do:**
Clive automatically calculates reserves based on claim severity, policy coverage, and historical payout data. A Reserve Pre-fill capability streamlines payment workflows.

**How they do it technically:**
- Reserves calculation uses severity scoring, coverage limits, and historical data
- "Pre-fill sub-reserves/reserves amounts" button on the "Set Payment" screen auto-populates values
- Claims stages (intake, triage, coverage, reserves) are broken into discrete tasks executed by specialized agents
- Bodily injury evaluation module for damage itemization and aggregation

**Limitations/Gaps:**
- Reserve accuracy is critical for financial reporting — no published accuracy metrics for Clive's reserve recommendations
- "Historical payout data" as a basis is only as good as the data available — new customers won't have this history in Clive's system
- Bodily injury assessment is acknowledged as extremely complex — the "digital bodily injury evaluation module" lacks detail on how it handles:
  - Future medical costs
  - Pain and suffering valuation
  - Lost earnings calculations
  - Life care planning
- No evidence of integration with medical cost databases, legal fee schedules, or actuarial models
- Reserve recommendations likely still require human approval for regulatory compliance

---

### 6. DECISION / STP

**What they do:**
Clive enables Straight-Through Processing (STP) for eligible claims. Claims meeting STP criteria are processed automatically end-to-end. Claims not meeting criteria are documented with findings and reasoning, then passed for manual processing.

**How they do it technically:**
- STP pipeline evaluates claims against configurable criteria
- Decision agents access correspondence, emails, and internal notes
- Automation level is configurable per insurer's SOP
- "The majority of claims are handled automatically with no human intervention"

**Limitations/Gaps:**
- **No specific STP rate published for general lines** — the only concrete number is "90% reduction in handling time" for pet insurance (a very simple line of business)
- The phrase "majority of claims" is vague and unquantified
- STP in pet insurance (vet bill reimbursement) is FAR simpler than auto, property, or liability claims — extrapolating pet insurance success to other lines is misleading
- No evidence of STP capability for:
  - Multi-party claims
  - Bodily injury claims
  - Complex property damage
  - Claims involving litigation
- Decision transparency and audit trails for regulatory compliance: mentioned but not detailed
- **Regulatory risk**: Automated decisions must meet strict legal and consumer protection standards. The risk of bias in AI models is a real concern — "machine learning systems reflect the data they're trained on, and inherited biases can lead to inconsistent assessments"

---

### 7. SETTLEMENT / PAYMENT

**What they do:**
Clive recommends suitable vendors, analyzes invoices, and triggers automated payments. Partnership with Vitesse (March 2025) expedites payment processing and enhances customer experience.

**How they do it technically:**
- Invoice analysis and vendor recommendation AI
- Vitesse partnership handles actual payment execution/disbursement
- Reserve Pre-fill feature reduces manual data entry for payments
- Payment triggered based on settlement decisions from upstream agents

**Limitations/Gaps:**
- Actual payment processing is via PARTNERSHIP (Vitesse), not native — another vendor dependency
- No evidence of handling:
  - Multi-currency payments for international claims
  - Structured settlements
  - Annuity-based payments for long-term injury claims
  - Coordination of benefits with other insurers
- Negotiation capabilities: no evidence that Clive can negotiate settlements with claimants or their attorneys
- No mention of payment compliance checks (sanctions screening, anti-money laundering)

---

### 8. CLOSE / SUBROGATION

**What they do:**
Clive identifies opportunities for subrogation and flags relevant claims for investigation. A Recovery Dashboard tracks subrogation and salvage performance. Clive automates compliance audits on closed and in-flight files according to SOP and applicable regulation.

**How they do it technically:**
- Subrogation opportunity identification through claims analysis
- Dashboard visualization for recovery tracking vs. anticipated recovery
- Automated compliance and quality audits on closed files
- Cycle time tracking for recovery

**Limitations/Gaps:**
- Subrogation is identified and FLAGGED — not autonomously pursued. Recovery execution still requires human intervention
- No evidence of:
  - Automated demand letter generation for subrogation
  - Inter-carrier arbitration support
  - Salvage management capabilities
  - Integration with subrogation management platforms
- The Recovery Dashboard is a reporting tool, not an automation engine
- Claim closure automation appears limited to compliance checks, not actual closure decision-making

---

## KEY QUESTIONS ANSWERED: FIVE SIGMA / CLIVE

### Is Clive actually autonomous or just a copilot?

**VERDICT: Clive is a COPILOT with limited autonomous capabilities for simple claims.**

Evidence:
- "For situations that require judgment, exceptions, or when faced with complex issues, Clive consults its colleagues — human adjusters and claim managers"
- "Clive automates every step of the claim process, allowing for manual oversight as needed"
- "His automation depends on the insurer's permissions and SOP. He can autonomously handle many steps in the claim or make progress according to pre-determined configuration"
- The insurer controls how much autonomy Clive has — it is NOT self-directing

For SIMPLE claims (pet insurance vet bills, basic property claims below threshold), Clive can operate end-to-end with STP. For anything involving complexity, judgment, bodily injury, or high value, it is firmly a copilot that recommends and assists but does not decide.

### What % of claims can they truly auto-handle end-to-end?

**Not publicly disclosed.** The only concrete data point is pet insurance where they claim 90%+ reduction in handling time (not the same as 90% STP rate). The claim that "the majority of claims are handled automatically" is unquantified. Industry context: McKinsey estimates 50%+ of claims ACTIVITIES (not entire claims) have automation potential by 2030. Realistic estimate for Five Sigma across mixed lines: likely 20-40% full STP for simple, low-value, single-peril claims.

### Do they handle EU convention systems (IRSA, CARD, IDS, CIDE)?

**No evidence whatsoever.** No mention anywhere in their materials of European inter-company convention systems. With 70% of business in the US and limited European presence (INSHUR UK/Netherlands), this is a significant gap for European deployment. They would likely need custom development for convention-based claims flows.

### How do they handle bodily injury vs property damage?

They have a "digital bodily injury evaluation module" but acknowledge that complex BI claims require human adjusters. Property damage is better suited to their STP pipeline. The fundamental challenge is that BI claims involve subjective judgments (pain/suffering valuation, future medical costs) that AI cannot reliably make autonomously.

### What's their actual STP rate?

**Not disclosed for general lines.** Only pet insurance has a concrete case study. The STP rate will vary dramatically by line of business, claim complexity, and insurer configuration.

### Integration challenges with legacy core systems?

Clive is exposed as REST APIs and designed to work on top of any CMS. However:
- API dependency means Clive's capabilities are limited by the legacy system's API quality
- "Enterprise-wide adoption is not plug-and-play — it requires thoughtful process redesign, adjuster upskilling, and robust change management"
- Legacy systems with poor APIs will significantly limit Clive's effectiveness

### What do adjusters complain about?

Public feedback is overwhelmingly positive (likely self-selected), but the company acknowledges:
- AI bias risk from training data
- Regulatory compliance concerns with automated decisions
- Need for "robust change management" suggests organizational resistance
- One noted that "it takes only an hour or two to fully train a new adjuster" — while positioned as positive, this may reflect limited depth of the system

---

---

# PART 2: SHIFT TECHNOLOGY

## Company Overview

| Attribute | Detail |
|---|---|
| **Founded** | 2014, Paris, France |
| **Total Funding** | $320M across 6 rounds |
| **Valuation** | $1B+ (unicorn since May 2021) |
| **Key Investors** | Accel, Bessemer Venture Partners, General Catalyst, Iris Capital, Advent International, Guidewire (strategic) |
| **Customers** | ~100 insurers across 25+ countries |
| **Claims Analyzed** | Nearly 2 billion claims to date |
| **Technology Stack** | Azure OpenAI Service, Azure AI Vision, Azure AI Document Intelligence, Azure Kubernetes Service (AKS), proprietary ML models |
| **Core Products** | Shift Claims Fraud Detection, Shift Claims (launched Sept 2025), Shift Subrogation, Insurance Data Network (IDN) |
| **Notable Customers** | AXA (Switzerland, France via Direct Assurance), Generali France, Mitsui Sumitomo, Assurant, Shelter Insurance, Central Insurance, Singapore GIA members |
| **Key Partnership** | Guidewire (Strategic Partner since Nov 2024), Duck Creek |

---

## Phase-by-Phase Analysis: Shift Technology

### 1. FIRST CONTACT

**What they do:**
Shift's Claims product (launched September 2025) begins working at FNOL, assessing incoming claims immediately for complexity, fraud indicators, and routing priority.

**How they do it technically:**
- Agentic AI trained on the insurer's own processes ingests claim data at first notification
- Claims are assessed against hundreds of fraud scenarios in real-time
- The system can halt payment immediately if potential fraud is detected at first contact
- Real-time detection capabilities identify and automate alerts for potential fraud

**Limitations/Gaps:**
- Shift Claims (the full claims automation product) launched only in September 2025 — very new product, limited production track record
- First contact capabilities are primarily focused on FRAUD detection, not full claims management — reflects Shift's DNA as a fraud-first company
- No evidence of voice or chat-based FNOL intake — Shift appears to rely on the insurer's existing intake channels
- No partnership equivalent to Five Sigma's Liberate voice AI integration

---

### 2. FNOL INTAKE

**What they do:**
The system extracts, structures, and analyzes every claims event and document at FNOL. Document classification and information extraction are automated.

**How they do it technically:**
- Azure AI Vision with ML-based OCR for document scanning
- Azure AI Document Intelligence for layout detection and data extraction
- GPT-series models for unstructured text analysis
- Generative AI Service Architecture acts as a "service-based document processing pipe"
- Processes structured and unstructured data including scanned documents, images, and videos
- External data enrichment with location and weather information

**Limitations/Gaps:**
- FNOL intake is focused on DATA EXTRACTION and DOCUMENT PROCESSING, not conversational intake with policyholders
- Shift does not appear to offer a policyholder-facing intake interface — it processes what the insurer's existing systems capture
- This means Shift is a "back-end brain" for FNOL, not a front-end intake system
- The dependency on Azure infrastructure raises concerns about regional data sovereignty for non-EU/non-US markets

---

### 3. TRIAGE (they claim 60% STP)

**What they do:**
An AI agent classifies the claim, scores it for complexity, urgency/priority, and exposure level. It then decides whether the full claim or certain tasks can be automated (STP) or routed to the most appropriate handler.

**How they do it technically:**
- Classification across 7 forms of complexity: policy coverage, liability, fraud, damage assessment, personal injury, subrogation potential, and litigation exposure
- Priority scoring based on urgency, severity, and other configurable factors
- STP Agent designation for eligible claims
- Claims are assigned to the appropriate handler or automation pathway

**Reported Performance:**
- Early adopters report **60% overall automation rate**
- **30% faster claims handling**
- **>99% accuracy in claims assessment**
- **3% reduction in claims losses**

**Limitations/Gaps:**
- **The "60% automation rate" needs scrutiny**: This likely means 60% of TASKS across all claims are automated, NOT that 60% of claims are handled end-to-end without humans. There's a crucial difference
- The 99% accuracy claim is for "claims assessment" (classification/scoring), not for claims decisions or settlement accuracy
- "Early adopters" results come primarily from AXA Switzerland — a single customer in a specific market
- These are VENDOR-REPORTED figures, not independently audited
- The 60% rate may be inflated by counting simple task automations (document classification, data entry) alongside actual decision-making
- No breakdown of automation rates by line of business — motor property likely much higher than bodily injury

---

### 4. INVESTIGATION (Fraud Detection — Their Core)

**What they do:**
This is Shift's DNA and strongest capability. They detect both individual claims fraud and sophisticated network fraud schemes across carriers, with the Insurance Data Network (IDN) enabling cross-carrier data sharing.

**How they do it technically:**
- AI-native decision engine scores each claim against an evolving library of hundreds of fraud scenarios
- Network fraud detection: ML models identify correlations within the insurer's full dataset, build "social networks" of related entities, and detect suspicious sub-networks
- Insurance Data Network (IDN): Cross-carrier data exchange — 4 of top 5 US P&C insurers are contributing members. When cross-carrier data is analyzed, identified fraud networks have on average TRIPLED in size
- Image and document fraud detection using Azure AI Vision and OCR
- GenAI analyzes free-form unstructured text in claims notes
- Real-time detection can halt payment until investigation completes
- Integrated Case Management for fraud investigation workflow (launched January 2024)

**Reported Performance:**
- 3x hit rate vs. manual/rules-based detection
- 69% of all alerts raised in 2022 were accepted for investigation
- Identifies $5B+ in claims fraud annually across all customers
- AXA has analyzed 1M+ claims with Shift, stopped EUR 12M+ in fraud
- Generali France: 3,000 claims analyzed per day with fraud scenarios tuned to the Swiss/French market

**Limitations/Gaps:**
- **31% of alerts are NOT accepted for investigation** — this means roughly 1 in 3 fraud alerts is a false positive or non-actionable. For an SIU team processing hundreds of alerts, this is still significant workload
- The 69% acceptance rate, while "high" by industry standards, means adjusters/SIU staff spend substantial time reviewing false flags
- **What happens when Shift is wrong about fraud**: No public documentation of appeal processes, policyholder notification procedures, or remediation when legitimate claims are delayed due to false fraud flags
- Network fraud detection requires VOLUME — smaller insurers or new deployments won't benefit as much
- IDN is US-focused with auto/property claims. European cross-carrier sharing faces GDPR and data sovereignty challenges
- Fraud scenarios are tuned per market but require ongoing maintenance — "hundreds of scenarios" need continuous updating
- The system is fundamentally REACTIVE (detects fraud) not PREVENTIVE (prevents fraud from being submitted)

---

### 5. ASSESSMENT

**What they do:**
Agentic AI reviews all claim documentation to evaluate coverage exclusion, liability, damage, injury, subrogation potential, and litigation exposure. GenAI provides liability estimates and damage assessments.

**How they do it technically:**
- Extracts, structures, and analyzes every claims event and document
- Evaluates 7 dimensions of complexity simultaneously
- GenAI analyzes free-form, unstructured text in claims notes
- References external data sources: product recalls, comparative negligence laws, state-specific regulations
- Liability prediction with 90% accuracy and "near 100% prediction accuracy" on subrogation-related claims

**Limitations/Gaps:**
- **Assessment quality for bodily injury is acknowledged as problematic**: "In bodily injury claims, where pain, function, and future impact matter, the risk is that 'automation' becomes 'under-valuation by default' unless the file is built correctly"
- 90% liability prediction accuracy means 10% of claims get it wrong — for a high-volume insurer processing millions of claims, this is thousands of incorrect liability determinations
- Comparative negligence laws are maintained by Shift — accuracy and currency of this database is a single point of failure
- No evidence of integration with medical providers, repair shops, or independent assessment services
- Assessment recommendations still require handler validation for complex claims

---

### 6. DECISION / STP

**What they do:**
The STP Agent automates claims processing and individual tasks throughout the claim journey. Clearly eligible scenarios are handled end-to-end. Complex claims get handler assistance with context-aware guidance.

**How they do it technically:**
- STP Agent evaluates eligibility based on claim complexity scoring
- Handler Assistance Agent: When human involvement is required, dynamically guides document review, decision-making, communication, negotiation, and delivers best next steps
- AI agents and GenAI trained on the insurer's own processes
- Insurers retain full control of the process

**Limitations/Gaps:**
- Shift Claims launched in September 2025 — as a full decision-making product, it has LESS THAN 6 months of production history
- Prior to September 2025, Shift was primarily a fraud detection company, NOT a claims decision company. The "Claims Decisions" product is a PIVOT/EXPANSION, not their core competency
- The maturity gap between their fraud product (10+ years) and their claims decision product (months) is enormous
- No evidence of regulatory approval processes for automated decision-making in regulated insurance markets
- Handler Assistance (copilot mode) is likely where most complex claims land — true autonomous decision-making is limited to simple claims

---

### 7. SETTLEMENT / PAYMENT

**What they do:**
Automated settlement and payment processing for STP-eligible claims. Handler guidance for settlement negotiation on complex claims.

**How they do it technically:**
- STP pipeline processes payments for eligible claims
- GenAI assists handlers with communication and negotiation guidance
- Integration with existing claims and core systems for payment execution

**Limitations/Gaps:**
- No dedicated payment partnership equivalent to Five Sigma's Vitesse integration
- Settlement/payment relies on the insurer's existing payment infrastructure
- No evidence of:
  - Automated settlement negotiation capabilities
  - Structured settlement support
  - Multi-currency payment handling
  - Direct claimant payment portals
- Payment execution is NOT Shift's focus — they are a decision-support layer, not a payment system

---

### 8. CLOSE / SUBROGATION

**What they do:**
Shift Subrogation is a dedicated AI-based SaaS product that identifies recovery opportunities, estimates liability, and monitors claims as they develop for new recovery reasons. This is a mature, standalone product.

**How they do it technically:**
- AI analysis of vast quantities of claim-related data
- GenAI analyzes unstructured text in claims notes for subrogation indicators
- References product recalls, comparative negligence laws, local jurisdictions
- State-specific comparative negligence rules maintained by Shift and kept current
- Automatic monitoring of claims as they develop — detects new recovery reasons over time
- GenAI summary with complete rationale for each subrogation opportunity
- Guidewire integration for subrogation (as part of Guidewire Autopilot Workflow Service)

**Reported Performance:**
- Over 90% accuracy for liability determination in subrogation
- Average doubling of referral volume
- 30% increase in referral acceptance rate

**Limitations/Gaps:**
- Subrogation IDENTIFICATION and ASSESSMENT are strong, but recovery EXECUTION still requires human action
- No evidence of automated demand letter generation
- Inter-carrier arbitration support is not documented
- European subrogation recovery (which involves convention systems) is not specifically addressed
- Monitoring for new recovery reasons is valuable but creates a potential alert fatigue problem — continuous monitoring means continuous notification

---

## KEY QUESTIONS ANSWERED: SHIFT TECHNOLOGY

### Is their fraud detection actually good or does it generate too many false positives?

**VERDICT: It is genuinely good by industry standards, but false positives remain a significant issue.**

- 69% alert acceptance rate means 31% of alerts are non-actionable (false positives or low-priority)
- 3x hit rate vs. manual/rules-based systems is a meaningful improvement
- $5B+ in fraud identified annually demonstrates real value
- The Insurance Data Network (IDN) is a genuine competitive moat — network effects improve detection
- However, "too many false positives" is subjective: for an SIU team of 10 people processing 500 alerts/month, 155 false positives is a real burden

### What's their false positive rate on fraud flags?

**~31% of alerts are not accepted for investigation** (based on 69% acceptance rate in 2022). This is the closest publicly available metric. Note: "not accepted" doesn't necessarily mean "false positive" — it could also mean "true fraud but not worth investigating" or "insufficient evidence to proceed." The true false positive rate is likely lower than 31% but is not publicly disclosed.

### Do they actually automate claims or just flag things for humans?

**Historically: flagging only. Now: attempting full automation with Shift Claims (Sept 2025).**

- For 10+ years, Shift was a fraud detection + investigation support tool — it flagged and assisted, nothing more
- Shift Claims (September 2025) represents their first attempt at full claims automation with STP
- This product is VERY NEW — less than 6 months in production
- The 60% automation rate from early adopters needs years of validation across multiple markets and lines
- REALISTIC ASSESSMENT: Shift remains primarily a fraud detection and investigation support tool that is EXPANDING into claims automation, not a mature claims automation platform

### Their "Claims Decisions" product vs their fraud product — how mature?

**Fraud product: VERY MATURE (10+ years, 100+ customers, 2B claims analyzed)**
**Claims Decisions/Shift Claims: IMMATURE (launched Sept 2025, single-digit customers)**

This is the critical distinction. Shift's fraud detection is battle-tested with massive scale. Their claims automation product is essentially a startup product from a large company. Buyers should evaluate them primarily on fraud detection and treat claims automation as a roadmap bet.

### Do they handle EU conventions?

**No direct evidence, but better positioned than Five Sigma.** Shift is headquartered in Paris, has deep European roots, customers like AXA Switzerland and Generali France, and operates in 25+ countries. Their comparative negligence laws database and market-specific fraud scenario tuning suggest familiarity with European regulatory frameworks. However, IRSA, CARD, IDS, and CIDE convention system support is NOT explicitly documented anywhere.

### What happens when their AI is wrong about fraud?

**No public documentation of remediation processes.** The system provides "transparent findings with detailed rationale for all conclusions" which allows human investigators to override. But:
- There is no published appeal process for policyholders flagged as fraudulent
- Payment halting on false positives causes real harm to legitimate claimants
- The liability for wrongful fraud accusations based on AI recommendations is legally untested in most jurisdictions
- Shift's position is that humans make the final decision — the AI only recommends. This provides legal cover but doesn't solve the practical problem of delayed payments

### Integration complexity?

**Better than most.** Shift has a deep strategic partnership with Guidewire (since 2024) and a partnership with Duck Creek. They were "among the first to develop a cloud-based integration" with Guidewire. However:
- Cloud SaaS deployment helps but doesn't eliminate integration complexity
- Insurer data must be hosted within their regions (GDPR, data sovereignty)
- Legacy systems with poor APIs will still be challenging
- Full implementation still requires significant configuration and scenario tuning per market

---

---

# PART 3: COMPARATIVE ANALYSIS

## Head-to-Head Comparison

| Dimension | Five Sigma (Clive) | Shift Technology |
|---|---|---|
| **Core strength** | Full claims lifecycle management (FNOL to close) | Fraud detection + investigation support |
| **Maturity** | CMS since 2017, Clive AI since 2024 | Fraud since 2014, Claims automation since Sept 2025 |
| **Scale** | ~$10M revenue, 53 people, limited customers | $1B+ valuation, 100+ customers, 25+ countries |
| **Data advantage** | Limited — small customer base | Massive — 2B claims analyzed, IDN cross-carrier network |
| **STP rate** | Not disclosed (pet insurance case study only) | 60% claimed (early adopter, single customer) |
| **Fraud detection** | Basic anomaly detection | Industry-leading, purpose-built |
| **Subrogation** | Identification + dashboard only | Dedicated product with 90%+ accuracy |
| **EU readiness** | 30% Europe, no convention support | Paris HQ, European customers, no explicit convention support |
| **Bodily injury** | Module exists, defers to humans for complex | Assesses but acknowledges "under-valuation by default" risk |
| **Autonomous vs copilot** | Copilot with STP for simple claims | Copilot with STP for simple claims (very new) |
| **LLM foundation** | Google Gemini / Vertex AI | Azure OpenAI (GPT series) |
| **Payment capability** | Via Vitesse partnership | None — relies on insurer infrastructure |
| **Voice/chat intake** | Via Liberate partnership | None documented |
| **Core system integration** | REST APIs, any CMS | Guidewire strategic partner, Duck Creek partner |

## Critical Gaps Both Companies Share

1. **EU Convention Systems**: Neither company explicitly supports IRSA, CARD, IDS, CIDE, or other inter-company convention systems. This is a MAJOR gap for European motor claims where conventions govern 80%+ of claim-to-claim interactions between insurers.

2. **Bodily Injury Autonomy**: Both companies acknowledge that BI claims require human judgment. Neither can autonomously handle complex BI claims involving future medical costs, pain/suffering valuation, or litigation.

3. **True End-to-End Automation**: Neither company can truly auto-handle the majority of claims end-to-end without human intervention. Both achieve STP only on simple, low-value, single-peril claims.

4. **Regulatory Compliance for Automated Decisions**: Neither company has public documentation of regulatory approval for automated claims decisions in specific jurisdictions.

5. **Settlement Negotiation**: Neither can autonomously negotiate settlements with claimants or attorneys.

6. **Inter-Carrier Communication**: Neither handles automated inter-carrier communication for multi-party claims beyond Shift's IDN (which is fraud-focused, not claims-management focused).

---

## Sources

### Five Sigma Sources
- [Five Sigma - AI Claims Management Technology](https://fivesigmalabs.com/)
- [Clive: The Multi-Agent AI Claims Expert](https://fivesigmalabs.com/clive/)
- [Clive AI Agents and Use Cases](https://fivesigmalabs.com/clive/clive-ai-use-cases/)
- [How Clive AI Works](https://fivesigmalabs.com/clive/how-clive-ai-works/)
- [Five Sigma Clive STP for Pet Insurance](https://fivesigmalabs.com/blog/five-sigma-clive-ai-pet-insurance-claims-stp-90-percent-faster/)
- [Google Case Study: Five Sigma with LangChain and Vertex AI](https://fivesigmalabs.com/blog/google-issues-a-clive-ai-case-study-with-five-sigma-and-langchain/)
- [Five Sigma + Sutherland Partnership](https://fivesigmalabs.com/blog/five-sigma-and-sutherland-partner-to-deliver-ai-claims-modernization-for-insurers/)
- [Five Sigma + Liberate Voice AI Partnership](https://fivesigmalabs.com/blog/liberate-and-five-sigma-forge-a-strategic-partnership-in-insurance-claims-automation-with-voice-ai/)
- [Five Sigma + Vitesse Payment Partnership](https://www.globenewswire.com/news-release/2025/03/12/3041240/0/en/Vitesse-and-Five-Sigma-Partner-to-Expedite-Payments-and-Enhance-Customer-Experience-in-Insurance-Claims.html)
- [Clive Product Updates April 2025 - Complexity Assessment](https://fivesigmalabs.com/blog/product-updates-innovations-april-2025-clive-ai-assesses-claim-complexity/)
- [FNOL Automation with AI Agents - Five Sigma](https://fivesigmalabs.com/blog/fnol-automation-how-ai-agents-turn-first-notice-into-first-action/)
- [Five Sigma Delivers AI That Works](https://fivesigmalabs.com/blog/becoming-the-top-5-how-five-sigma-delivers-ai-that-works-in-insurance-claims/)
- [Five Sigma Measurable Results - Fintech Global](https://fintech.global/2025/11/03/how-five-sigmas-clive-ai-is-delivering-measurable-results-in-claims-handling/)
- [HFS Research: Five Sigma Disrupting Insurance](https://www.hfsresearch.com/research/five-sigma-ai-tech/)
- [Five Sigma Revenue and Team Data - Latka](https://getlatka.com/companies/five-sigma)
- [Five Sigma Crunchbase Profile](https://www.crunchbase.com/organization/five-sigma)

### Shift Technology Sources
- [Shift Technology - Main Site](https://www.shift-technology.com/)
- [Shift Claims Product Page](https://www.shift-technology.com/products/claims)
- [Shift Claims Fraud Detection](https://www.shift-technology.com/products/claims-fraud)
- [Shift Subrogation Product](https://www.shift-technology.com/products/subrogation)
- [Shift Claims Launch Announcement - PR Newswire](https://www.prnewswire.com/news-releases/shift-technology-launches-shift-claims-to-power-claims-transformation-with-agentic-ai-302557099.html)
- [Shift Technology + Azure OpenAI - Microsoft Case Study](https://www.microsoft.com/en/customers/story/23202-shift-technology-azure-ai-vision)
- [Guidewire + Shift Strategic Partnership](https://www.guidewire.com/about/press-center/press-releases/20241112/guidewire-names-shift-its-strategic-partner-to-help-mitigate-insurance-fraud)
- [AXA Switzerland Case Study](https://www.shift-technology.com/resources/case-studies/axa-switzerland-insurance-fraud-detection-success)
- [Generali France Case Study](https://www.shift-technology.com/resources/case-studies/customer-stories/generali-france-to-increase-detection-rate)
- [Insurance Data Network (IDN) Launch](https://www.prnewswire.com/news-releases/groundbreaking-new-standard-for-cross-carrier-data-sharing-introduced-by-shift-technology-302417710.html)
- [Shift Technology Unicorn Status - TechCrunch](https://techcrunch.com/2021/05/05/shift-technology-raises-220m-at-a-1b-valuation-to-fight-insurance-fraud-with-ai/)
- [Shift Claims Agentic AI Details](https://completeaitraining.com/news/shift-technology-launches-shift-claims-agentic-ai/)
- [Shift Technology GenAI Capabilities](https://www.shift-technology.com/resources/news/shift-technologys-generative-ai-capabilities-delivering-positive-impact-for-global-insurers)
- [Shift Subrogation Recovery Details](https://www.shift-technology.com/resources/research/recover-more-with-ai-powered-subrogation)
- [Duck Creek + Shift Partnership](https://www.duckcreek.com/partner/shift-technology/)

### Industry Context Sources
- [McKinsey: The Future of AI in Insurance](https://www.mckinsey.com/industries/financial-services/our-insights/the-future-of-ai-in-the-insurance-industry)
- [BCG: Insurance Leads in AI Adoption](https://www.bcg.com/publications/2025/insurance-leads-ai-adoption-now-time-to-scale)
- [Claims Industry Statistics 2025 - Talli AI](https://blog.talli.ai/claims-industry-statistics/)
- [Forrester Insurance Predictions 2025](https://www.forrester.com/blogs/predictions-2025-insurance/)
