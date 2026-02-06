# Claims Adjuster Technology Stack: Comprehensive Research (2025-2026)

## Focus: Motor / Auto Physical Damage (APD) & Auto Bodily Injury (BI) Adjusters

---

## 1. Core Claims Management Systems (CMS)

The CMS is the "system of record" -- the application where the claim lives, where reserves are set, payments issued, and notes documented. A motor claims adjuster spends the largest share of their day inside this system.

### Guidewire ClaimCenter -- Market Leader

- **Market share**: ~21% of the overall insurance software market; 500+ carriers across 38 countries. Analysts project Guidewire will capture 30-50% of the $15-30B global P&C software TAM. Among top-tier carriers, penetration is significantly higher -- most top-25 US P&C writers are on Guidewire or migrating to it.
- **What the adjuster sees**: An activity-centric web UI. The adjuster's home screen is a **workqueue** -- a prioritized list of activities (tasks) due today. Each activity is tied to a claim. Clicking into a claim opens a tabbed workspace: Summary, Loss Details, Parties Involved, Exposures, Financials (reserves/payments), Documents, Notes, and Service Requests. The system uses **activity patterns** (rule-driven templates) that automatically generate to-do items when a claim hits certain states -- e.g., "Contact claimant within 24 hours," "Review estimate," "Set reserves." Adjusters "plan their work" via the workplan tab and "work their plan" from the workqueue.
- **Daily interaction**: Open 20-40+ claims per day. Set/adjust reserves. Create notes. Issue payments. Review and approve estimates. Trigger subrogation referrals. Send letters/emails (often templated). Close claims.
- **Pain points**: Users report the UI can feel dated compared to modern SaaS. Heavy configuration means performance varies by carrier. ClaimCenter is powerful but complex -- new adjusters face a steep learning curve.

### Duck Creek Claims

- **Market share**: Trusted by 40 of the top 50 global insurers (across the full suite, not claims alone). Analyst rating of ~80/100. Gartner user rating of ~2.6/5 (lower satisfaction vs. competitors on usability).
- **Positioning**: Cloud-first, modular. Built on Microsoft Azure. Known for easier configuration than Guidewire but less functional depth for complex claims.
- **Adjuster experience**: Similar paradigm to Guidewire -- workqueues, activity management, tabbed claim views. Reviewers note better "ease of use" and "ease of setup" vs. Guidewire.

### Sapiens ClaimsPro

- **Market share**: Long-established in mid-market and European carriers. Analyst rating ~81/100. Strong in multi-line, multinational carriers.
- **Positioning**: End-to-end digital P&C suite (CoreSuite, IDITSuite, Stingray). Strong fraud detection and analytics integration.
- **Regional strength**: More prevalent in Europe, Israel, and Asia-Pacific than in the US top-10.

### Majesco (now Majesco L&A + P&C Intelligent Core Suite)

- **Market share**: 200+ insurers globally, from startups to Tier 1. Gartner user rating ~4.5/5 (higher satisfaction). Analyst rating ~77/100.
- **Positioning**: Cloud-native, newer entrant focused on speed-to-market for InsurTechs and MGAs.

### Legacy Mainframe / AS400 Systems

- **Still in use**: 74% of insurers still rely on legacy technology in some form. Many mid-tier and regional carriers still run claims on COBOL/RPG programs on IBM AS/400 (IBM i) or mainframe systems built 30+ years ago.
- **Adjuster experience**: Green-screen or thin terminal UI. Tab-delimited fields. No drag-and-drop. Limited search. Manual coding of claim types, injury codes, etc. Copy-paste from mainframe screens into other systems is routine.
- **The retirement problem**: The engineers who built these systems are retiring. COBOL/RPG skills are vanishing from the talent pool. Yet 80% of in-person financial transactions worldwide still run on COBOL.
- **Migration**: 77.1% of carriers plan to modernize claims systems (2025 survey), but migrations take 2-5 years and cost $50M-$500M+ for large carriers.

---

## 2. Estimating Platforms (Auto Physical Damage)

These are the systems used to write the actual repair estimate -- the line-by-line breakdown of parts, labor, and paint needed to fix the vehicle. In the US, there are exactly **three** databases, and every estimate in the country flows through one of them.

### CCC Intelligent Solutions (CCC ONE)

- **Market share**: Dominant in the US. Used by 7 of the top 10 carriers (by direct written premium). Approximately 50% of US auto claims volume flows through CCC. 35,000+ businesses connected to the CCC IX Cloud network.
- **Daily adjuster interaction**: The desk adjuster receives a **CCC assignment** (photo-based or field inspection). For photo estimates, the claimant/policyholder uploads photos via a link; CCC's AI (CCC Smart Estimate / Estimate-STP) pre-populates a line-level estimate in seconds. The adjuster reviews the AI-generated estimate, adjusts labor hours, parts choices (OEM vs. aftermarket vs. reconditioned), and approves. For field appraisals, a staff or independent appraiser uses the CCC ONE mobile app to capture photos, VIN, and damage, then writes the estimate on a tablet or laptop.
- **Key workflow**: Estimate creation > Supplement requests from body shops > Supplement review/approval > Total loss valuation (CCC Valuescope) > Payment authorization.
- **AI advancement (2025)**: CCC Estimate-STP can deliver a complete line-level estimate from photos alone, without human intervention, for qualifying claims. Multiple top-10 carriers have contracted for this.

### Mitchell (Enlyte)

- **Market share**: ~28% of the US estimating market (2019 data; likely slightly lower in 2025 as CCC has gained share). Owned by Enlyte (which also owns Coventry for workers' comp).
- **Adjuster interaction**: Similar workflow to CCC. Mitchell WorkCenter is the adjuster-facing platform. Estimates are written in Mitchell's estimating system with Mitchell's parts/labor database.
- **BI integration**: Mitchell's casualty suite (DecisionPoint, ClaimIQ/InjuryIQ) is tightly bundled, making Mitchell popular with carriers that want a single vendor for both APD and BI.

### Solera Qapter (formerly Audatex)

- **US market share**: ~24% (2019 data). Uses the MOTOR database for parts/labor data.
- **European market share**: Dominant. 95% of UK motor insurers use Solera/Audatex platforms. 2,400+ UK repairers on Audatex. Present across 16+ European countries. Used in 130+ countries globally.
- **Key differentiator**: Qapter is Solera's AI-powered photo estimating platform, trained on 4.5B+ images covering 88% of vehicles. In Europe, Qapter/Audatex is the default; CCC and Mitchell have minimal European presence.
- **Adjuster interaction (EU)**: European adjusters interact with Qapter/Audatex for damage assessment, often receiving AI-triaged estimates that classify claims as repairable vs. total loss within ~5 seconds from photos.

### GT Motive (European Alternative)

- **Used by 80+ insurance and leasing companies worldwide. Produces 5M+ estimates/year.
- **Key difference**: Transaction-based pricing (pay per estimate, not per seat). Growing as a challenger to Solera's European dominance.
- **Verisk integration**: GT Estimate integrates with Verisk's IVI (Intelligent Vehicle Imaging) for automated total-loss triage.

---

## 3. Bodily Injury (BI) Valuation Tools

These are the systems that help adjusters evaluate the dollar value of injury claims -- general damages, pain and suffering, future medical costs. They are controversial (plaintiff attorneys hate them) but ubiquitous.

### Colossus (CSC/DXC Technology)

- **Market share**: Used by 70%+ of US insurance companies for BI claim evaluation. Users include Allstate, Farmers, MetLife, USAA, and many others.
- **How the adjuster uses it**: The adjuster enters data from medical records, assigning "severity points" to injuries. Colossus recognizes ~750 injury types and ~10,720 rules/value drivers. The system outputs a **settlement range** (low-to-high). Most carriers prohibit adjusters from settling above the Colossus range without supervisor approval.
- **Criticism**: Colossus's own sales literature boasted it "will immediately reduce the size of bodily injury claims by up to 20%." The system often undervalues pain and suffering, emotional trauma, and long-term life impact. Plaintiff attorneys specifically train to "beat Colossus" by ensuring medical records use the exact terminology Colossus recognizes.
- **Daily workflow**: Adjuster receives BI claim > gathers medical records > enters diagnosis codes, treatment types, duration, pre-existing conditions into Colossus > system generates value range > adjuster negotiates within that range.

### Mitchell ClaimIQ / InjuryIQ (Enlyte)

- **Positioning**: One of the "big four" BI valuation systems. Originally developed by ClaimIQ, acquired by Mitchell International.
- **How it works**: InjuryIQ measures "quality of life" impact from injuries and converts it to a settlement value range. Works with DecisionPoint (Mitchell's medical bill review system) to cross-reference treatment costs.
- **Adjuster use**: Similar data entry to Colossus. Adjuster inputs injury details; system generates a recommended range. Tightly integrated with Mitchell's APD estimating, making it attractive for carriers using Mitchell across both APD and casualty.

### Claims Outcome Advisor (COA) -- Verisk/ISO

- **Positioning**: Industry's first "object-oriented" BI claims management solution. Acquired by ISO (now Verisk) from CSC and Mynd Corp.
- **Capability**: Contains information on ~13,000 medical conditions and ~14,000 occupations. Uses advanced analytics to compare claims to similar historical cases.
- **Integration**: Connects to ISO ClaimSearch (256M+ claims in the database, ~50M records added/year, contributed by 3,500+ insurance companies representing 90%+ of the P&C industry by premium).
- **Adjuster use**: Broader than just valuation -- COA helps manage the full BI lifecycle from FNOL to return-to-work plans, rehabilitation, and final settlement.

### Injury Claims Evaluation (ADP)

- **The fourth major system**: Mentioned alongside Colossus, InjuryIQ, and COA as the industry's primary BI valuation tools. Less publicly documented.

---

## 4. Document Management Systems (DMS)

Every claim generates a mountain of paper: police reports, medical records, repair invoices, photos, correspondence, demand letters, subrogation demands. The DMS stores, indexes, and routes all of it.

### ImageRight (Vertafore)

- **Built specifically for insurance**. Handles claims, underwriting, and distribution document workflows.
- **Key feature**: Workflow automation -- automatically recognizes incoming documents, generates activities, and assigns them to the appropriate adjuster. "Gets the right work to the right person at the right time."
- **Integration**: Has a direct integration with Guidewire ClaimCenter, providing adjusters a single web-based desktop to access all claim information, activities, reserves/payments, and documents without toggling between applications.
- **Market position**: The leading insurance-specific DMS for carriers and MGAs.

### Hyland OnBase

- **Broader ECM platform** used across industries but with strong insurance vertical capabilities.
- **Insurance use cases**: New business processing, claims processing, agency management, loss control, field solutions.
- **Adjuster experience**: Some carriers switching from ImageRight to OnBase for broader enterprise capabilities.

### IBM FileNet

- **Market share**: 31.52% of the document management system market overall; insurance is its #1 industry with 129+ identified customers.
- **Enterprise Content Management mindshare**: 10.1% (up from 9.5% year-over-year as of Dec 2024).
- **Usage**: Common at large legacy carriers who already have IBM infrastructure. Sophisticated automated workflows for claims management.

### Microsoft SharePoint

- **ECM mindshare**: 18.4% (down from 20.8% year-over-year).
- **Insurance use**: Some carriers use SharePoint for lighter document management, especially for internal collaboration. Less common as a primary claims DMS but ubiquitous as a secondary document store and intranet.

### Practical reality for the adjuster

The adjuster typically has the DMS either **embedded within** the CMS (via integration, as with ImageRight + Guidewire) or open as a **separate application** requiring alt-tab switching. Even with integration, adjusters often need to open the DMS separately to search for documents across claims, perform bulk document reviews, or handle documents that weren't auto-indexed correctly.

---

## 5. Communication Tools

Motor claims adjusters are in near-constant communication: with claimants, policyholders, body shops, medical providers, attorneys, other carriers (for subrogation), and internal colleagues.

### Hi Marley (SMS/Text Platform)

- **Purpose-built for P&C insurance**. Two-way SMS texting between adjusters and claimants/policyholders.
- **Why it matters**: Reduces phone tag dramatically. Library of insurance-specific templates. AI translates messages across 25 languages.
- **Adjuster experience**: Desktop interface shows all text conversations. Mobile app for field adjusters. Integrates with Guidewire ClaimCenter and Verisk XactAnalysis.
- **Coaching**: AI-driven performance insights and alerts help adjusters stay on top of follow-ups.
- **Adoption**: Growing rapidly. American Integrity Insurance (major Florida carrier) signed on in 2025.

### Email (Outlook)

- **Universal**: Every carrier uses Outlook or equivalent. Adjusters receive demand letters, medical records, attorney correspondence, body shop communications, and internal approvals via email.
- **Problem**: Email is unstructured. Critical claim information arrives in email but must be manually transferred (copy-pasted or attached) into the CMS and DMS.

### Phone / VOIP Systems

- **Still critical**: Despite texting growth, phone remains essential for BI negotiation, complex coverage discussions, and first-party claimant contact.
- **Typical systems**: Avaya, Cisco, Genesys, Five9, NICE CXone. Most carriers have moved to VOIP/cloud contact center platforms.
- **Call recording**: Mandatory for most carriers. Recorded calls stored in DMS or separate call recording system.

### Internal Collaboration

- **Microsoft Teams / Slack**: Increasingly used for adjuster-to-supervisor consultation, SIU referral discussions, and team communication.
- **CMS-native messaging**: Guidewire and other CMS platforms have internal notes/messaging, but adjusters often prefer Teams for real-time back-and-forth.

### Communication tool count for a typical adjuster

| Tool | Purpose |
|------|---------|
| CMS (notes/letters) | Official claim file communication |
| Hi Marley or equivalent | SMS with claimants |
| Outlook | Email (external and internal) |
| Phone/VOIP | Voice calls |
| Teams/Slack | Internal collaboration |
| **Total: 5 communication channels** | All running simultaneously |

---

## 6. Policy Administration Systems (PAS)

The PAS is **separate from the CMS**. It is where the policy lives -- coverage limits, deductibles, endorsements, named insureds, vehicles, effective dates. The adjuster must reference the PAS to determine what is covered.

### Guidewire PolicyCenter

- **Market share**: 3.88% of the insurance administration market (compared to Duck Creek Policy at 0.72%).
- **Integration with ClaimCenter**: For carriers on the full Guidewire InsuranceSuite, PolicyCenter and ClaimCenter share a common data model. The adjuster can see policy details within ClaimCenter without leaving the claims system.
- **For carriers NOT on full suite**: The adjuster must open a separate PAS (often a legacy mainframe system) in another window/tab to look up coverage. This is one of the most common sources of "swivel-chair" work.

### Duck Creek Policy

- **Cloud-native on Azure**. Known for intuitive interface and quick onboarding. Lower market share but growing.

### Legacy PAS

- **Reality**: Many carriers run ClaimCenter for claims but still have a 20-30+ year old mainframe PAS. The adjuster must log into the legacy PAS (green screen or terminal emulator) to verify coverage, then manually confirm coverage in the claims system. This is an extremely common workflow.

---

## 7. Fraud / SIU Tools

### ISO ClaimSearch (Verisk)

- **The industry's primary fraud detection database**. Contains 256M+ claims records. 50M new records added annually. 3,500+ contributing companies (90%+ of P&C industry by premium).
- **Adjuster use**: When a new claim comes in, ClaimSearch is queried (often automatically by the CMS) to flag claimants with prior claims history, potential duplicate claims, or suspicious patterns. SIU teams use it for deeper investigation.

### NICB (National Insurance Crime Bureau)

- **Industry trade association** focused on fraud prevention, detection, and prosecution. Not a software system per se, but a resource and investigative partner.
- **Adjuster interaction**: Adjusters refer suspected staged accidents, fraud rings, or complex cases to NICB via their carrier's SIU. NICB provides investigative assistance and liaison with law enforcement.
- **2025 concern**: NICB projects a 49% rise in insurance fraud linked to identity theft in 2025.

### NISS (National Independent Statistical Service)

- **Primarily a statistical reporting agent**, not a direct fraud detection tool for adjusters. Collects required data from member companies and compiles regulatory reports. Headquartered in Indianapolis, 50+ years in operation.

### SIU Workflow Tools

- **Embedded in CMS**: Guidewire ClaimCenter has built-in SIU referral workflows, fraud scoring, and investigation management.
- **Standalone**: Some carriers use specialized SIU case management systems (e.g., SAS Fraud Framework, FRISS, Shift Technology) that integrate with or sit alongside the CMS.
- **Adjuster role**: The adjuster is the "first line" of fraud detection. They flag suspicious claims in the CMS, which triggers an SIU referral workflow. The SIU team then takes over in their specialized tools.

---

## 8. Subrogation Tools

### Arbitration Forums (AF)

- **The dominant platform**: Handles 953,000+ arbitration disputes and 2M+ subrogation demands annually. Most US inter-company auto subrogation flows through AF.
- **Adjuster use**: The subrogation adjuster (or desk adjuster, depending on carrier structure) uses AF's platform to electronically send/receive subrogation demands, attach supporting documents, manage claims, and escalate to arbitration if the adverse carrier disputes the demand.
- **2025 updates**: AF launched Total Recovery Solution (TRS) v5 with new OAI coverages and an improved arbitrator onboarding process.

### CCC Safekeep (formerly Safekeep, acquired by CCC in 2022)

- **AI-powered subrogation management**. Monitors, scores, and prioritizes claims for subrogation potential using ML, NLP, rules, and predictive models.
- **Integration**: Available in the Guidewire Marketplace as a validated accelerator for ClaimCenter. Also partners with Duck Creek.
- **Value**: Removes manual touchpoints, auto-packages evidence and data for negotiations. Provides near-real-time detection of potentially recoverable dollars.

### Manual Tracking

- **Reality**: Many carriers, especially smaller ones, still track subrogation in Excel spreadsheets, Access databases, or CMS notes fields. The subrogation unit may maintain a separate tracking spreadsheet outside the CMS.

---

## 9. Financial / Payment Systems

### CMS-Native Payments

- Most claims payments (indemnity checks, medical payments) are initiated within the CMS. The adjuster sets a reserve, then creates a payment transaction in Guidewire/Duck Creek/etc., which flows to the carrier's finance/treasury system.

### One Inc (ClaimsPay)

- **The leading insurance-specific digital payments platform**. Named "Digital Insurance Payments Platform of the Year" in 2025.
- **How it works**: Sits on top of the CMS (which remains the system of record). Offers ACH, virtual ClaimsCard, physical ClaimsCard, Push-to-Debit, Venmo, PayPal, and paper check. 50+ pre-built integrations with leading core systems including Guidewire.
- **Adjuster experience**: The adjuster initiates payment in the CMS; One Inc handles the actual disbursement. Minimal additional login required due to integration. Handles PCI-DSS compliance, NACHA compliance, etc.

### Legacy Payment Processes

- **Check runs**: Many carriers still batch-process paper checks through legacy treasury systems on a nightly or weekly cycle.
- **Wire transfers**: For large payments (total losses, catastrophe claims), separate treasury/banking systems may be involved.
- **The adjuster's pain**: At some carriers, the adjuster creates the payment in the CMS but then must log into a separate financial system to verify it was processed, or manually trigger a check run.

---

## 10. The "Screen Count" Problem

### How many applications does a motor claims adjuster have open?

Based on research across industry sources, forums, and vendor documentation, a **typical US motor claims adjuster** has the following applications open simultaneously on any given day:

| # | Application | Purpose |
|---|-------------|---------|
| 1 | CMS (e.g., Guidewire ClaimCenter) | Primary claim file management |
| 2 | Estimating platform (e.g., CCC ONE) | View/review/approve auto damage estimates |
| 3 | BI valuation tool (e.g., Colossus) | For BI claims only: value injuries |
| 4 | Document management (e.g., ImageRight) | View/file documents, photos, medical records |
| 5 | Policy admin system (PAS) | Look up coverage, limits, deductibles |
| 6 | Email (Outlook) | Correspondence with all parties |
| 7 | Phone/VOIP softphone | Calls with claimants, attorneys, shops |
| 8 | Hi Marley or SMS platform | Text messaging with claimants |
| 9 | Teams/Slack | Internal communication |
| 10 | ISO ClaimSearch / fraud tools | Check claim histories, fraud flags |
| 11 | Arbitration Forums / subrogation tool | For subro-eligible claims |
| 12 | Web browser (misc) | State DMV lookups, Google Maps, medical provider lookups, rental car portals |

**Typical simultaneous screen count: 8-12 applications open at any time.**

Most adjusters work on **dual monitors** (some on triple). A common setup:
- **Left monitor**: CMS (primary work surface)
- **Right monitor**: Rotating between estimating platform, DMS, email, and PAS

### The context-switching burden

- **Average adjuster caseload**: 40-80 open claims simultaneously (varies by carrier and line). Some auto APD adjusters handle 80+ claims; BI adjusters typically have 40-60 due to complexity.
- **Daily new claim assignments**: 3-10 per day, depending on carrier and volume.
- **Context switches per day**: An adjuster handling 80 claims, receiving 5-10 new assignments, fielding 20-30 phone calls, and processing 50+ emails is switching between claims and systems **dozens to hundreds of times per day**.
- **The "swivel chair" effect**: Industry term for the inefficiency of manually re-entering data, toggling between disconnected systems, and reconciling different sources. This is identified as one of the biggest productivity killers and sources of adjuster burnout.

### Impact on adjuster well-being

- **Burnout drives turnover**: Burnout costs employers $4,000-$21,000 per employee per year in lost productivity and turnover. For a carrier with 1,000 claims employees, that is ~$5M annually.
- **The burnout-turnover cycle**: Burnout drives turnover > turnover increases workload on remaining staff > increased workload accelerates burnout.
- **The US insurance sector is projected to lose ~400,000 workers by 2026.**
- **Technology is both the problem and the proposed solution**: Investing in workflow-streamlining technology is critical, but poorly designed technology (or too many disconnected systems) exacerbates frustration rather than relieving it.

---

## 11. US vs. EU Differences

| Dimension | United States | Europe (UK, Germany, France, etc.) |
|-----------|---------------|-------------------------------------|
| **CMS** | Guidewire ClaimCenter dominates top-tier. Duck Creek, Sapiens, Majesco in mid-market. Many legacy mainframe systems. | Guidewire present but less dominant. Sapiens stronger (especially multi-country carriers). Many local/regional CMS platforms. |
| **Estimating** | Three systems only: CCC, Mitchell, Audatex/Qapter. CCC dominates (~50% of volume). | Solera/Audatex/Qapter dominates (95% of UK motor insurers). GT Motive growing as alternative. CCC and Mitchell have negligible European presence. |
| **BI valuation** | Colossus (70%+ of carriers), Mitchell InjuryIQ, Verisk COA. Highly systematized, software-driven negotiation. | Less standardized. UK uses Ogden tables for future loss calculation. Bodily injury assessment relies more on medical expert reports and judicial guidelines (e.g., JC Guidelines in UK, Duffy guidelines in Ireland). Software-driven BI valuation is less prevalent. |
| **Fraud databases** | ISO ClaimSearch (256M+ records, 90%+ industry coverage), NICB. | No single pan-European equivalent. UK has CUE (Claims and Underwriting Exchange) and MIAFTR (Motor Insurance Anti-Fraud and Theft Register). Each country may have its own database. |
| **Subrogation** | Arbitration Forums handles inter-company disputes systematically. | No direct equivalent. Subrogation handled through direct carrier-to-carrier negotiation or litigation. Varies significantly by jurisdiction. |
| **Regulation** | State-by-state regulation. NAIC guidelines. | EU AI Act (2025+) will regulate AI-driven claims decisions. GDPR imposes stricter data handling requirements on claims data. Solvency II for capital requirements. |
| **Payment** | One Inc, check, ACH, push-to-debit. | BACS (UK), SEPA (EU). Digital payment platforms less consolidated. |
| **Market structure** | Carriers own the claims process end-to-end. Independent adjusters (IAs) used for overflow/catastrophe. | UK has a strong **outsourced claims management** model. Third-party administrators (TPAs) and claims management companies (CMCs) handle claims for carriers. Adjusters may work for the TPA, not the carrier. |

### Key European-specific platforms

- **Solera/Audatex (AEG - Auda Enterprise Gold)**: The standard estimating platform in the UK.
- **GT Motive**: Growing European alternative for estimating. Transaction-based pricing model.
- **CAPS (Claims and Accident Prevention System)**: Used by some UK motor fleets.
- **CUE (Claims and Underwriting Exchange)**: UK equivalent of ISO ClaimSearch for prior claims history.

---

## 12. Integration Reality

### How well do these systems talk to each other?

**The short answer: Poorly, at most carriers.**

- **77.1% of carriers plan to modernize claims systems** (2025 survey) and **73.3% are upgrading policy administration tools**, highlighting the urgency of the integration problem.
- **Best case (fully integrated Guidewire suite)**: Carriers on the full Guidewire InsuranceSuite (PolicyCenter + ClaimCenter + BillingCenter) have a shared data model. Policy data flows into claims automatically. ImageRight integrates to provide documents within ClaimCenter. CCC/Mitchell estimates can be pulled in via APIs. This is the minority of carriers.
- **Typical case**: The CMS is partially integrated with some systems (e.g., estimating platform feeds estimates into the CMS automatically) but the adjuster still needs to:
  - Alt-tab to the PAS to verify coverage (especially if the PAS is legacy)
  - Open the DMS separately to search for documents
  - Copy-paste claimant contact info from email into the CMS
  - Manually enter BI valuation data from Colossus into claim notes
  - Log into Arbitration Forums separately for subrogation
  - Switch to Hi Marley for text messages
  - Check ISO ClaimSearch in a separate browser tab
- **Worst case (legacy-heavy carriers)**: The adjuster is doing substantial copy-paste between systems. Claim data lives in a mainframe. Documents are in a separate DMS. Estimates come via fax or email. BI valuations are done in a standalone desktop application. Subrogation is tracked in Excel. The adjuster manually re-enters data across 3-5+ systems for every claim action.

### The copy-paste reality

Industry research confirms that:
- Adjusters **"waste precious hours sorting files, keying claim numbers, and hunting for missing pages"**
- Three-day delays for simple policy changes remain common
- Manual data reconciliation between disconnected systems is the norm, not the exception
- Errors from manual re-entry are a significant source of claims leakage

### The emerging solution: AI overlay / "single pane of glass"

Companies like **Five Sigma** (with their AI agent "Clive") are building platforms that sit on top of existing CMS infrastructure, centralizing all communications (voice, text, email, WhatsApp) and claim data into a single interface. This approach aims to reduce the screen-switching problem without requiring carriers to replace their core systems. However, adoption is still early-stage -- the vast majority of adjusters in 2025 are still working across multiple disconnected systems.

---

## Summary: The Motor Claims Adjuster's Daily Technology Reality

A typical US motor claims adjuster in 2025-2026:

1. **Opens 8-12 applications** every morning across dual monitors
2. **Manages 40-80 open claims** simultaneously
3. **Processes 3-10 new claims** per day
4. **Handles 20-30+ phone calls**, 50+ emails, and an increasing volume of text messages daily
5. **Context-switches between claims and systems** dozens to hundreds of times per day
6. **Copy-pastes data** between at least 2-3 systems regularly (more at legacy carriers)
7. **Spends 60-70% of time in the CMS**, 10-15% in communication tools, 10-15% in estimating/valuation tools, and 5-10% in ancillary systems
8. **Experiences the "swivel chair" effect** as the single biggest source of daily friction
9. **Works in an industry projected to lose 400,000 workers by 2026**, with technology frustration identified as a key contributor to burnout and turnover

The technology exists to solve much of this fragmentation. The barriers are legacy infrastructure, migration cost, organizational inertia, and the sheer complexity of insurance operations.

---

## Sources

- [Guidewire ClaimCenter Product Page](https://www.guidewire.com/products/core-products/insurancesuite/claimcenter-claims-management-software)
- [Guidewire Market Share - Enlyft](https://enlyft.com/tech/products/guidewire)
- [Guidewire Market Capture Projection - Yahoo Finance](https://ca.finance.yahoo.com/news/guidewire-gwre-sets-capture-30-121243562.html)
- [Duck Creek vs Sapiens - SelectHub](https://www.selecthub.com/insurance-software/duck-creek-vs-sapiens-insurance/)
- [Duck Creek vs Majesco - SelectHub](https://www.selecthub.com/insurance-software/duck-creek-vs-majesco/)
- [Top 10 P&C Insurance Software Vendors 2026 - OpenKoda](https://openkoda.com/p-and-c-insurance-software-vendors/)
- [Auto Collision Estimating Software Market - GM Insights](https://www.gminsights.com/industry-analysis/auto-collision-estimating-software-market)
- [CCC Intelligent Solutions - About](https://www.cccis.com/about)
- [CCC Crash Course Q4 2025](https://www.cccis.com/reports/crash-course-2025/q4)
- [CCC AI-Powered Estimating - NVIDIA Blog](https://blogs.nvidia.com/blog/ccc-ai-insurance-claims/)
- [Colossus Personal Injury Calculator - Michigan Auto Law](https://www.michiganautolaw.com/blog/2025/05/15/colossus-personal-injury-calculator/)
- [Colossus Claims Software - Morgan & Morgan](https://www.forthepeople.com/blog/colossus-claims-software-how-it-can-unfairly-deny-valid-claims-and-how-morgan-morgan-can-help/)
- [Insurance Companies Using Colossus - Miller & Zois](https://www.millerandzois.com/car-accidents/insurance-claims-settlements/colossus/colossus-insurance-companies/)
- [Mitchell InjuryIQ / ClaimIQ - Blane Law](https://www.blanelaw.com/library/injury-iq-computer-program-colossus-accident-claims-software.cfm)
- [Verisk Claims Outcome Advisor](https://www.verisk.com/en-gb/products/claims-outcome-advisor/)
- [ISO ClaimSearch - Verisk](https://www.verisk.com/products/claimsearch/)
- [ImageRight - Vertafore](https://www.vertafore.com/products/insurance-document-management-system/imageright)
- [ImageRight + Guidewire Integration](https://ir.guidewire.com/news-releases/news-release-details/imageright-and-guidewire-announce-integrated-claims-and-document)
- [OnBase for Insurance - Hyland](https://www.hyland.com/-/media/Project/Hyland/Hyland/whitepaper/onbase-insurance-whitepaper-pc-claims-in-the-digital-era.pdf)
- [IBM FileNet Market Share - 6sense](https://6sense.com/tech/document-management-system/ibm-filenet-market-share)
- [Hi Marley Platform](https://www.himarley.com/platform-overview/)
- [Hi Marley + Guidewire Integration](https://www.himarley.com/guidewire-claimcenter-integration/)
- [Guidewire PolicyCenter vs Duck Creek - 6sense](https://6sense.com/tech/insurance-administration-and-management/guidewirepolicycenter-vs-duckcreekpolicy)
- [NICB - National Insurance Crime Bureau](https://www.nicb.org/)
- [NICB Identity Theft Fraud Projection 2025](https://www.nicb.org/news/news-releases/nicb-projects-49-rise-insurance-fraud-linked-identity-theft-2025)
- [Arbitration Forums](https://home.arbfile.org/)
- [CCC Safekeep Acquisition](https://www.cccis.com/news-and-insights/posts/ccc-acquires-insurtech-safekeep)
- [Safekeep + Guidewire Marketplace](https://www.guidewire.com/about/press-center/press-releases/20220726/automate-and-improve-claims-subrogation-management-with-ccc-app)
- [One Inc Digital Payments](https://www.oneinc.com)
- [Swivel Chair Effect - Aclaimant](https://www.aclaimant.com/blog/the-swivel-chair-effect-the-hidden-costs-of-disconnected-safety-and-claims-systems)
- [Adjuster Burnout and Turnover - Claims Journal](https://www.claimsjournal.com/news/national/2025/09/04/332713.htm)
- [US Insurance Sector Talent Loss - Insurance Business](https://www.insurancebusinessmag.com/us/news/breaking-news/us-insurance-sector-to-lose-around-400000-workers-by-2026-466593.aspx)
- [Five Sigma AI Claims Platform](https://fivesigmalabs.com/)
- [Legacy Technology in Insurance - Earnix](https://earnix.com/blog/overcoming-legacy-technology-the-future-of-insurance-innovation/)
- [Claims System Modernization - Whatfix](https://whatfix.com/blog/claims-system-modernization/)
- [Solera Vehicle Claims](https://www.solera.com/solutions/vehicle-claims/)
- [GT Motive + Verisk European Collaboration](https://www.verisk.com/company/newsroom/verisk-announces-european-collaboration-with-gt-motive-to-expedite-motor-damage-claims/)
- [Guidewire European Consumer Survey 2025](https://www.guidewire.com/about/press-center/european-insurance-consumer-survey)
- [Adjuster Caseload Discussions - Fishbowl](https://www.fishbowlapp.com/post/adjusters-what-is-your-current-caseload-does-your-company-assign-have-a-specific-claim-count-assigned-for-adjusters-based)
- [Five Sigma Adjuster Workload Data](https://fivesigmalabs.com/blog/exclusive-data-claims-adjusters-day-to-day-workloads/)
- [How Guidewire ClaimCenter Works - CloudFoundation](https://cloudfoundation.com/blog/how-does-guidewire-claim-center-work/)
- [Guidewire Claims Management Process - GuidewireMasters](https://guidewiremasters.in/guidewire-claims-management-process/)
