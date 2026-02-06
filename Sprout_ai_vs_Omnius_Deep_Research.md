# Sprout.ai vs omni:us -- Deep Competitive Research
## Insurance Claims Automation Vendors

*Research date: 2026-02-06*

---

# PART 1: SPROUT.AI

## Company Overview

| Attribute | Detail |
|-----------|--------|
| **Founded** | 2018 (originally "BlockClaim") |
| **HQ** | London, UK |
| **Total Funding** | ~$38.3M over 5 rounds (often cited as ~$40M) |
| **Latest Round** | $6.55M (Oct 2023) |
| **Key Investors** | Amadeus Capital, others (34 total investors) |
| **CEO** | Roi Amir (former Tractable VP Engineering -- scaled Tractable to unicorn) |
| **Focus** | Document AI + Claims Intelligence for insurance |
| **Markets** | UK, Europe, Latin America |
| **Lines of Business** | Health, Motor, Property (personal lines + SME), Travel |
| **Language Support** | 100+ languages (including Japanese, Greek, Arabic) |
| **Recognition** | InsurTech100 (2023 + 2025), Insurance Post British Insurance Tech Awards 2025 |

---

## Phase-by-Phase Analysis

### Phase 1: First Contact (Document Classification)

**What they do:**
- Instantly classify, sort, and index 500+ document types at claim intake
- AI-OCR converts unstructured data from inbound claim documents into clean, structured data
- Uses Computer Vision for high-accuracy document processing

**How:**
- Multi-model AI stack: Computer Vision + NLP + LLMs + Tabular ML
- Pre-trained on thousands of policies and claims, enhanced with synthetic data
- Processes PDFs, images, handwritten notes, photos of documents

**Accuracy:** Up to 99% for document classification
**Speed:** Documents classified in seconds, not hours

**Gaps/Limitations:**
- Accuracy depends heavily on input quality (poor/blurry images reduce accuracy)
- 500+ doc types is impressive but still a finite list -- novel document types may require training
- Classification is strong for known formats; truly novel document structures may fall through

---

### Phase 2: FNOL (First Notice of Loss)

**What they do:**
- Extract structured data and key insights from unstructured documents
- Process medical records, legal submissions, receipts, damage reports, photos, repair estimates
- Cross-language extraction (100+ languages including handwritten text)

**How:**
- Computer Vision for OCR (including handwritten character recognition)
- NLP for entity extraction and context understanding
- LLMs for complex text analysis and agentic reasoning
- Synthetic data augmentation for training

**Performance:**
- 3 million documents processed with 94% accuracy (across all types)
- Handwritten text extraction confirmed (lorry driver statements, Greek handwritten receipts)
- Claims Sprout.ai is "world leader in handwritten OCR"

**Key Question: Can they read handwritten EAS (European Amicable Statement) forms?**

**FINDING: No explicit confirmation.** Sprout.ai does NOT specifically mention European Amicable Statements (Constat Amiable) anywhere in their public materials. However:
- They DO process handwritten motor claim documents
- They DO extract data from handwritten driver statements
- They DO handle 100+ languages including EU languages
- Their computer vision CAN process form-based handwritten documents

**Assessment:** Technically capable of reading EAS forms based on their OCR/CV stack, but there is no evidence they have specifically trained models for the EAS form structure (which has a very specific diagram + checkbox + handwritten fields layout). This would likely require custom model training.

---

### Phase 3: Triage (Coverage + Fraud Check)

**What they do:**
- Automatic policy coverage checking
- Cross-reference extracted claim data against policy terms, limits, exclusions
- Flag coverage gaps and exceptions
- Initial fraud screening with anomaly detection

**How:**
- Pre-trained model on 4,000+ claims starts at 85% accuracy for policy checking
- Improves to 99% accuracy with customer-specific training
- Policy clause references explain real-time recommendations
- AI-enabled workflows trigger auto-approval, rejection, or human review flags

**Performance:**
- 85% initial accuracy for new customers (day one, no prior training)
- Ramps to 99% with fine-tuning
- Policy terms, limits, and exclusions verified automatically

---

### Phase 4: Investigation (Anomaly Detection, Authenticity)

**What they do:**
- Detect document tampering and AI-generated images
- Identify duplicate claims and file metadata inconsistencies
- Flag suspicious activity by comparing claims against external data
- Predictive analytics for fraud patterns

**How:**
- ML models trained on fraud patterns
- Cross-reference with external data sources and web intelligence
- Metadata analysis (EXIF data, document creation dates, editing traces)
- Enrichment via external APIs, medical databases, web intelligence

**Key Question: How accurate is fraud detection vs false positives?**

**FINDING: No specific false positive rate is published.** Sprout.ai claims:
- 99% overall accuracy for document processing
- Fraud "flagging" rather than definitive fraud determination
- Human review triggered for flagged cases (suggesting they know false positives exist)

**Assessment:** The fact that they flag rather than auto-reject for fraud suggests they are aware of false positive risk. The system is designed as a triage tool for fraud, not a definitive fraud determiner. This is actually the right approach -- but it means adjusters still review every fraud flag.

---

### Phase 5: Assessment (Policy Cross-Reference)

**What they do:**
- Interpret policy documents and extract relevant clauses
- Cross-reference enriched claim data with policy terms
- Validate coverage terms, exclusions, and limits
- Generate recommendations for claim approval/rejection with rationale

**How:**
- LLMs for complex policy interpretation
- Tabular ML for data-driven decisioning
- Pre-trained policy checking models
- External API enrichment

**Performance:**
- One insurer: 60% of claims processed in real time at 96% accuracy
- Another: 89% of claims processed with 100% accuracy, enabling auto-approval/rejection
- Zurich UK: 45% of claims settled in real time

---

### Phase 6: Decision / Settlement / Close

**Key Question: Do they handle settlement, decision, or close phases?**

**FINDING: PARTIALLY.**

Sprout.ai DOES:
- Auto-adjudicate the majority of claims (approve/reject)
- Provide straight-through processing (STP) for clear-cut claims
- Calculate settlement amounts for travel claims automatically
- Generate decision recommendations with policy clause references

Sprout.ai does NOT:
- Process actual payments/disbursements
- Manage ongoing claim rehabilitation/reserve management
- Handle supplier/repair network management
- Manage litigation or complex negotiation
- Provide a full claims management system (CMS)

**Assessment:** Sprout.ai is primarily a **claims intelligence and decision acceleration layer**, NOT a full claims platform. After extraction and decision recommendation, data flows back into the insurer's existing CMS for payment execution, supplier management, and case closure.

---

## The "22 Seconds Per Claim" Claim -- What Exactly Happens?

**FINDING:** The "22 seconds" figure appears to be conflated/misunderstood. The actual metric is:
- **22 DAYS reduction** in average claim duration (not 22 seconds)
- **60 seconds** for simple claims at AdvanceCare (health insurance)
- **Seconds** for document extraction and classification
- **Real-time** settlement for 45-67% of claims (depending on insurer)

What happens "in seconds":
1. Document ingestion and classification
2. Data extraction from unstructured documents
3. Policy coverage validation
4. Fraud flag screening
5. Auto-decision recommendation (approve/reject/escalate)

What takes longer:
- Complex claims requiring human review
- Multi-document claims requiring aggregation
- Claims requiring external verification or investigation

---

## Customer Case Studies

### Zurich UK
- 45% of customer claims settled in real time (phone or online)
- Claims settled within 5 days increased by 10%
- Three-month pilot before full deployment
- Focus: Property claims

### AdvanceCare (Portugal, Health Insurance)
- Claims processing reduced to 60 seconds for routine claims
- 1 million+ claims processed in a year
- 98% accuracy across hospital, dental, pharmaceutical, optical categories
- 10%+ increase in automation levels

### General Metrics Across Customers
- +25% boost in tNPS (transactional Net Promoter Score)
- 60% increase in claims automation
- Up to 99% accuracy in document processing

---

## Critical Assessment: Strengths and Weaknesses

### STRENGTHS
1. **Document AI is genuinely strong** -- 500+ doc types, 100+ languages, handwritten support
2. **Multi-language capability** is a real differentiator for EU markets
3. **Speed of deployment** -- 85% accuracy on day one with pre-trained models
4. **Fraud detection** includes AI-generated document detection (forward-looking)
5. **Overlay architecture** -- does not require replacing existing CMS
6. **New CEO from Tractable** brings proven scaling experience

### WEAKNESSES / GAPS
1. **NOT a full claims platform** -- it is a document AI + decision intelligence layer
2. **No payment processing** -- decisions go back to insurer's CMS for payment
3. **No EAS-specific capability proven** -- general handwritten OCR exists but no EAS training confirmed
4. **False positive rates undisclosed** for fraud detection
5. **Complex claims still require humans** -- the platform augments, does not replace adjusters
6. **No supplier/repair network management**
7. **No litigation support or negotiation tools**
8. **Accuracy is data-dependent** -- poor input quality degrades results
9. **Settlement calculation** only confirmed for travel claims, unclear for complex property/motor
10. **Smaller funding base** (~$38M) compared to competitors like Tractable ($115M+) or Shift Technology ($320M+)

---
---

# PART 2: OMNI:US

## Company Overview

| Attribute | Detail |
|-----------|--------|
| **Founded** | 2015 |
| **HQ** | Berlin, Germany (Perlebergerstrasse 42C) |
| **Total Funding** | ~EUR 45M (Series A across three tranches since 2018) |
| **Team Size** | 51-200 employees (LinkedIn), ~65 (PitchBook) |
| **Team Diversity** | 19 nationalities |
| **Global Presence** | Germany (HQ), research partners in Barcelona, offices in UK, France, USA |
| **Focus** | End-to-end P&C claims automation |
| **Clients** | ~30 pilot/active clients across 6 European countries + USA |
| **Lines of Business** | 7 P&C lines (confirmed: Motor, Property/Household, Liability; 4 others unspecified) |
| **Tech Stack** | NLP, Computer Vision, OCR, Handwritten Text Recognition (built on Google Cloud) |
| **Recognition** | Insurance Insider Honours -- Insurance Innovation of the Year |

---

## Phase-by-Phase Analysis

### Phase 1: First Contact (FNOL Intake Automation)

**What they do:**
- Automate intake of unstructured data accompanying claim reports
- Process email-based initial communications from brokers and clients
- Eliminate duplicate claims at intake
- Correctly interpret line of business, type of loss, cause of loss, parties involved

**How:**
- NLP for natural language understanding of claim descriptions
- Computer Vision + OCR for document processing
- Integration with core systems (Guidewire, Sapiens, legacy apps)

---

### Phase 2: FNOL (End-to-End FNOL Processing)

**What they do:**
- Full FNOL automation from intake to indexed, structured claim record
- Classify claim type, severity, and routing requirements
- Extract all relevant entities and data points

**How:**
- Hybrid NLP + Computer Vision models
- Handwritten text recognition (Google Cloud case study: 7.25% character error rate for handwritten car claim)

**Key Finding on Handwritten Processing:**
The Google Cloud case study reveals a **7.25% handwritten character error rate** -- which means approximately 1 in 14 characters is wrong. This is decent for general handwriting but problematic for critical fields like policy numbers, dates, and monetary amounts where a single character error matters.

---

### Phase 3: Triage (Auto-Routing)

**What they do:**
- Auto-route claims based on complexity, type, and severity
- Low-complexity claims routed for straight-through processing
- Complex claims assigned to appropriate human handler automatically
- Next-best-action recommendations for handlers

**How:**
- AI-powered claims decision catalog (pre-trained)
- Integrated reference claims processes for 7 P&C lines
- Severity scoring and complexity assessment

---

### Phase 4: Investigation (Subrogation Identification)

**What they do:**
- AI-powered detection of missed subrogation opportunities
- Identify 20+ subrogation reasons with supporting proof points
- Enable teams to file recovery claims efficiently
- Express Subrogation product leveraging GenAI

**Performance:**
- EUR 1B in total subrogation identified (cumulative across all clients)
- Leading European insurer: EUR 3.8M annual savings identified from 320,000 P&C motor claims (EUR 2.5B GWP)

**Key Question: EUR 1B subrogation -- for how many insurers over what period?**

**FINDING:** The EUR 1B figure is cumulative across omni:us's entire client base (~30 clients) since the product's deployment. Context: if they process 1M+ claims annually across 30 clients, and the average subrogation recovery per claim is EUR 1,000, this is mathematically plausible but likely accumulated over several years. The UNIQA/insurer example of EUR 3.8M annually from 320K claims gives a per-claim subrogation identification value of about EUR 12 -- which is realistic for an AI scanning tool that catches missed opportunities.

---

### Phase 5: Assessment (Cost Analysis)

**What they do:**
- Automated cost assessment for claims under EUR 5,000
- Algorithm trained to indicate payment amounts for less complex claims
- Cross-reference against claims decision catalog

**How:**
- Tabular ML models trained on historical claims data
- Reference claims processes benchmarking
- Severity-based cost estimation

**Limitation:** Algorithm is trained for claims worth EUR 5,000 or less. Complex or high-value claims still require human assessment.

---

### Phase 6: Decision (50%+ Touchless Resolution)

**What they do:**
- Straight-through processing (STP) for qualifying claims
- Auto-approve, auto-reject, or escalate with recommendations
- Claims handlers receive AI-powered next-best-action suggestions

**Performance:**
- 50%+ claims resolved touchless (company claim)
- 70% of submitted claims settled end-to-end without manual intervention (separate claim)
- UNIQA: 70%+ automation for in-scope claims; 60% STP + 25% semi-automated

**Note on conflicting numbers:** omni:us variously claims 50%, 60%, and 70% touchless rates across different materials. The variation likely reflects different clients, lines of business, and scope definitions. The UNIQA case study (verified third-party) confirms 60% STP + 25% semi-automated = 85% total with some AI involvement.

---

### Phase 7: Settlement (Auto-Payment)

**Key Question: Do they actually process payments or just recommend?**

**FINDING:** omni:us triggers payments within the insurer's core system (Guidewire, Sapiens) rather than processing payments directly. Their system:
1. Determines the payment amount
2. Validates against policy terms
3. Triggers the payment instruction within the insurer's CMS/core system
4. The core system executes the actual disbursement

This is "auto-payment" in the sense that no human needs to approve or initiate it for qualifying claims, but the actual money movement happens through the insurer's existing payment infrastructure. This is a critical distinction -- omni:us is NOT a payment processor.

---

### Phase 8: Close (Subrogation + Recovery)

**What they do:**
- Post-settlement recovery identification
- Ongoing subrogation opportunity detection
- Recovery claim filing enablement

---

## Customer Case Studies

### UNIQA (Major European Insurer)
- **Scope:** High-volume, low-severity P&C claims
- **Results:** 70%+ claims automated within months
- **STP Rate:** 60% straight-through, 25% semi-automated
- **Cost Reduction:** Up to 35%
- **Processing Time:** Down 50-100%
- **Leakage Reduction:** Up to 3%

### MS Amlin (Specialty/Marine Insurance)
- **Scope:** Corporate marine insurance claims (hull + cargo)
- **Results:** Fully automated end-to-end for low-complexity marine claims
- **Target:** 85% FNOL automation for hull and cargo
- **Key Achievement:** First major deployment in specialty/marine (not just personal lines)
- **Method:** Initial broker/client communications via email processed directly

### General Metrics
- 1M+ claims processed annually
- EUR 1B subrogation identified (cumulative)
- 35% cost reduction for claim handling
- Operating in 6 European countries + USA
- ~30 active/pilot clients

---

## Critical Assessment: Strengths and Weaknesses

### STRENGTHS
1. **Genuinely end-to-end** -- covers FNOL through settlement and recovery
2. **Pre-built for 7 P&C lines** with reference processes and decision catalog
3. **Strong subrogation detection** -- EUR 1B cumulative is significant
4. **Integration-first architecture** -- standardized connectors for Guidewire, Sapiens, legacy systems
5. **Proven touchless rates** -- 60%+ STP verified by UNIQA case study
6. **EU-native** -- built in Berlin, operates across 6 EU countries
7. **Specialty claims capability** (MS Amlin marine) shows versatility beyond personal lines
8. **Google Cloud partnership** provides infrastructure credibility
9. **Agentic co-pilot approach** -- AI assists handlers rather than only automating

### WEAKNESSES / GAPS
1. **Handwritten OCR is mediocre** -- 7.25% character error rate is problematic for critical fields
2. **Limited to P&C** -- no health, life, or travel insurance coverage
3. **EUR 5,000 cost cap** for automated assessment -- anything above needs humans
4. **Conflicting automation claims** (50% vs 70%) suggest inconsistent performance across deployments
5. **Small team** (~65 employees) for ambitious scope
6. **No specific EU convention system support confirmed** (Green Card, IID, bilateral agreements)
7. **Only Series A funded** -- EUR 45M is modest for end-to-end claims platform ambitions
8. **MS Amlin targeting 85% FNOL automation** = they are NOT there yet for marine
9. **Complex, high-value, specialty claims still require experienced adjusters**
10. **Integration "seamless" claim** belied by the reality that any CMS integration is complex and time-consuming
11. **No confirmed multi-language breadth** like Sprout.ai's 100+ languages

---
---

# PART 3: HEAD-TO-HEAD COMPARISON

## Positioning Matrix

| Dimension | Sprout.ai | omni:us |
|-----------|-----------|---------|
| **Core DNA** | Document AI + Claims Intelligence | End-to-End Claims Automation |
| **Primary Strength** | Unstructured document processing | Full lifecycle automation |
| **Architecture** | Overlay/intelligence layer | Integrated automation platform |
| **Lines of Business** | Health, Motor, Property, Travel | 7 P&C lines (Motor, Property, Liability + 4) |
| **Language Support** | 100+ languages | Not specified (EU languages assumed) |
| **Handwritten OCR** | Strong (claims "world leader") | Moderate (7.25% error rate) |
| **Touchless Rate** | 45-67% (varies by insurer) | 50-70% (varies by insurer) |
| **Fraud Detection** | Yes (document tampering, AI-generated images) | Limited (leakage reduction focus) |
| **Subrogation** | Not a focus | Major differentiator (EUR 1B identified) |
| **Payment Trigger** | No (returns to CMS) | Yes (triggers within CMS) |
| **CMS Integration** | API overlay on existing CMS | Standardized connectors (Guidewire, Sapiens) |
| **Funding** | ~$38M | ~EUR 45M |
| **Team Size** | Not disclosed | ~65 employees |
| **EU Market Depth** | UK, Europe, LatAm | 6 EU countries + USA |
| **Convention Systems** | Not confirmed | Not confirmed |

---

## Claim Lifecycle Coverage Comparison

| Phase | Sprout.ai | omni:us |
|-------|-----------|---------|
| **First Contact** | STRONG -- 500+ doc types, instant classification | STRONG -- email/multi-channel intake |
| **FNOL** | STRONG -- extraction, 100+ languages, handwritten | STRONG -- end-to-end FNOL structuring |
| **Triage** | STRONG -- policy coverage + fraud flags | STRONG -- auto-routing + severity scoring |
| **Investigation** | MODERATE -- anomaly detection, document authenticity | MODERATE -- subrogation focus, not broad investigation |
| **Assessment** | MODERATE -- policy cross-reference, some settlement calc | MODERATE -- cost analysis capped at EUR 5K |
| **Decision** | MODERATE -- recommend approve/reject, human for complex | STRONG -- 60%+ STP, AI decision catalog |
| **Settlement** | WEAK -- no payment processing | MODERATE -- triggers payment in CMS |
| **Close** | WEAK -- not covered | MODERATE -- subrogation/recovery detection |

---

## Key Differentiators

### Choose Sprout.ai when:
- Document processing quality is the primary bottleneck
- Multi-language EU documents are common (especially non-Latin scripts)
- Handwritten document accuracy is critical
- Fraud detection from document tampering is a priority
- You need an overlay that works with ANY existing CMS
- Health and travel insurance lines are in scope
- You want fast deployment (85% accuracy day one)

### Choose omni:us when:
- Full lifecycle automation is the goal (FNOL to settlement)
- Subrogation recovery is a major revenue opportunity
- You use Guidewire or Sapiens as your core system
- P&C personal lines (motor, property, liability) are the focus
- Touchless straight-through processing rate is the KPI
- You want pre-built claims decision processes (7 lines of business)
- Reducing claims leakage is a priority

---

## What NEITHER Vendor Does Well

1. **European Convention Systems** (Green Card, IID, bilateral agreements) -- no confirmed support from either
2. **Complex/high-value claims** -- both defer to human adjusters
3. **Litigation management** -- not covered by either
4. **Supplier/repair network orchestration** -- neither provides this
5. **Customer-facing FNOL portal** -- both are backend/B2B tools
6. **Reserve management** -- not a core capability of either
7. **Regulatory reporting** -- not confirmed for either
8. **Bodily injury claims management** -- both weak here (requires medical expertise + negotiation)
9. **EAS/Constat Amiable specific processing** -- neither has confirmed capability

---

## Unanswered Questions Requiring Direct Vendor Engagement

### For Sprout.ai:
1. What is the actual false positive rate for fraud anomaly detection?
2. Can they specifically process EAS/Constat Amiable forms with the diagram section?
3. What is the accuracy on handwritten text in non-Latin scripts (Arabic, Cyrillic)?
4. Do they calculate settlement amounts for motor and property, or only travel?
5. What is the typical integration timeline with legacy CMS?
6. How do they handle multi-party claims with conflicting documents?
7. What is pricing model -- per claim, per document, SaaS license?

### For omni:us:
1. What are the specific 7 P&C lines of business (only 3 confirmed)?
2. Does the EUR 5,000 auto-assessment cap apply to all lines or just motor?
3. How does the system handle EU convention systems (Green Card, IID)?
4. What is the actual handwritten OCR accuracy for EAS forms specifically?
5. How long does a typical Guidewire/Sapiens integration take?
6. What languages are specifically supported beyond German/English?
7. What is pricing model -- per claim, platform license, success-based?
8. How does the "agentic co-pilot" differ from a simple recommendation engine?

---

## Comparison vs Five Sigma

| Dimension | omni:us | Five Sigma |
|-----------|---------|------------|
| **Type** | AI automation layer | Full cloud-native CMS |
| **Approach** | Overlays on existing CMS | Replaces existing CMS |
| **AI Focus** | Claims automation + subrogation | AI-assisted workflow automation |
| **Integration** | Works WITH Guidewire/Sapiens | Replaces legacy systems |
| **Target** | Insurers with existing CMS | Insurers/TPAs wanting new CMS |
| **Deployment** | Overlay -- faster but limited | Platform replacement -- slower but comprehensive |
| **Communication** | Not a focus | Full omnichannel hub (SMS, WhatsApp, email, voice, video) |

**Key Insight:** omni:us and Five Sigma are NOT directly comparable. omni:us is an AI automation layer that sits on top of existing systems. Five Sigma is a full claims management platform that replaces legacy systems. They could theoretically be complementary, though there would be significant overlap in decision automation.

---

## Sources

- [Sprout.ai Platform](https://sprout.ai/platform/)
- [Sprout.ai Solution](https://sprout.ai/solution/)
- [Sprout.ai AI Hub](https://sprout.ai/ai-hub/)
- [Sprout.ai Fraud Detection](https://sprout.ai/blog/how-sprout-ai-reduces-fraud-and-waste-in-insurance-claims/)
- [Sprout.ai Multi-Language Support](http://sprout.ai/blog/did-you-know-sprout-ai-can-process-claims-documents-in-over-100-languages-from-japanese-to-greek/)
- [Sprout.ai LLM Usage](https://sprout.ai/blog/how-does-sprout-ai-use-large-language-models-llms/)
- [Sprout.ai Complex Claims](https://sprout.ai/blog/how-sprout-ai-processes-complex-claims/)
- [Sprout.ai Zurich UK Case Study](https://sprout.ai/customer-stories/zurich-uk-can-now-settle-claims-in-real-time/)
- [Sprout.ai AdvanceCare Case Study](https://sprout.ai/customer-stories/advancecare-unlocks-end-to-end-claims-automation-and-real-time-processing-with-sprout-ai/)
- [Sprout.ai Crunchbase](https://www.crunchbase.com/organization/blockclaim)
- [Sprout.ai TechRadar Review](https://www.techradar.com/pro/what-is-sprout-ai-everything-we-know-about-ai-insurance-tool)
- [Sprout.ai Legacy Integration](https://sprout.ai/blog/just-how-difficult-is-it-to-integrate-ai-with-legacy-insurance-systems/)
- [omni:us Claim Automation](https://omnius.com/claim-automation/)
- [omni:us Homepage](https://omnius.com/)
- [omni:us Subrogation](https://omnius.com/subrogation/)
- [omni:us Recovery](https://omnius.com/recovery/)
- [omni:us InsTech Profile](https://www.instech.co/member-profiles/omnius/)
- [omni:us InsTech Deep Dive](https://www.instech.co/knowledge-centre/omnius-automating-the-claims-process/)
- [omni:us MS Amlin Case Study](https://omnius.com/blog/omnius-automates-end-2-end-marine-insurance-claims-for-msamlin/)
- [omni:us UNIQA Case Study](https://omnius.com/insights/uniqa/)
- [omni:us Google Cloud Case Study](https://cloud.google.com/customers/omni-us)
- [omni:us Series A Extension (BusinessWire)](https://www.businesswire.com/news/home/20221115005882/en/omnius-Closes-%E2%82%AC12m-Series-A-Extension-Financing-Round)
- [omni:us FNOL NLP Blog](https://omnius.com/blog/fnol-automation-in-claims-unleashing-the-power-of-natural-language-processing/)
- [Five Sigma vs omni:us Comparison](https://sourceforge.net/software/compare/Five-Sigma-vs-omnius/)
- [Sprout.ai Competitors (Craft.co)](https://craft.co/sprout-ai/competitors)
