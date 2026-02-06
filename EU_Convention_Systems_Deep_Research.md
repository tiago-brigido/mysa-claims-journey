# EU Motor Insurance Convention Systems: Deep Research Report

## Why Europe Is Fundamentally Different from the US

In the United States, liability determination is an **adversarial, case-by-case process** -- adjusters investigate, negotiate, and sometimes litigate each claim. In the EU, most major markets have **inter-insurer conventions** that pre-compute liability splits using standardized lookup tables tied to the European Accident Statement (EAS / constat amiable). The insured deals with **their own insurer** (direct compensation), and inter-insurer settlement happens behind the scenes via forfait (flat-rate) or actual-cost recourse mechanisms.

This is not "AI" or "automation" in the modern sense -- it is **rules-based decisioning codified into industry agreements decades ago**, which creates the structural foundation for straight-through processing (STP) that US markets lack.

---

## 1. IDA/IRSA Convention (France)

### History and Governance

- **Created**: 1968 as IDA (Convention d'Indemnisation Directe des Assures)
- **Expanded**: 1977 as CGIRSA, renamed IRSA in 2003
- **Full name**: Convention d'Indemnisation directe de l'assure et de Recours entre Societes d'assurance Automobile
- **Governed by**: GCA (Gestion des Conventions d'Assurance), formerly GPSA
- **Scope**: Traffic accidents in metropolitan France, overseas departments, and the Principality of Monaco
- **Participation**: Signed by the vast majority of French insurers (essentially all market participants)

### The Bareme (Fault Lookup Table)

The IRSA bareme is a **deterministic fault allocation grid** containing **13 numbered accident cases** organized into four classes:

#### Class 1: Vehicles Traveling in the Same Direction
| Case | Scenario | Fault Split |
|------|----------|-------------|
| **10** | Same lane, same direction -- rear vehicle hits front vehicle | **100% rear vehicle** |
| **13** | Two different lanes, same direction -- lateral contact, neither changing lanes | **50/50** |
| **15** | Two different lanes -- one vehicle changes lane toward the other | **100% lane-changer** |
| **17** | One vehicle overtakes another at an intersection | Variable based on sub-scenario |

#### Class 2: Vehicles Traveling in Opposite Directions
| Case | Scenario | Fault Split |
|------|----------|-------------|
| **20** | Vehicle Y encroaches on the median/center line, collides with X in their lane | **100% Y (encroacher)** |
| **21** | Both X and Y encroach on the median/center line | **50/50** |

#### Class 3: Vehicles from Different Roadways
| Case | Scenario | Fault Split |
|------|----------|-------------|
| **30** | Collision at intersection from different roads | Variable -- priority rules apply |
| **31** | Collision at intersection, one vehicle turning | Variable based on position |

#### Class 4: Stationary/Parking Situations
| Case | Scenario | Fault Split |
|------|----------|-------------|
| **40** | Vehicle legally parked/stationary hit by moving vehicle | **100% moving vehicle** |
| **43** | Vehicle illegally parked hit by moving vehicle | **Shared responsibility** |
| **51** | Vehicle exiting a parking space or car park | **100% exiting vehicle** (typically) |

> **NOTE**: The case numbering is NOT sequential 1-13 but uses the codes above (10, 13, 15, 17, 20, 21, 30, 31, 40, 43, 51, plus 2 additional sub-cases). There are 13 primary scenarios total.

### Critical Design Principles of the Bareme

1. **Only objective elements matter**: Vehicle position on the road, direction of travel, points of impact
2. **Deliberately excludes**: Speed, intoxication, lighting conditions, tire wear, traffic violations, signaling
3. **Outputs only**: 0%, 50%, or 100% fault (there are no 30/70 or 20/80 splits -- it is binary or equal)
4. **Not legally binding on the insured**: The bareme governs ONLY the inter-insurer recourse; it cannot be used against a policyholder in court

### Inputs Required

The bareme lookup requires the following from the European Accident Statement (constat amiable):
- **Checkboxes ticked** (the 17 circumstance boxes on the EAS)
- **Sketch/diagram** of the accident
- **Points of impact** on each vehicle (marked on vehicle diagrams)
- **Direction of travel** for each vehicle
- **Road type** (intersection, straight road, parking area)

### What Percentage of French Claims Does IRSA Resolve?

- The IRSA convention handles approximately **80% of material-damage motor claims** in France
- The companion **IRCA convention** (for bodily injury) covers approximately **90% of bodily injury accidents** (limited to permanent disability <= 5%)
- Combined, the convention system touches the vast majority of French motor claims

### The Forfait (Flat-Rate) Inter-Insurer Settlement

| Damage Amount | Settlement Method | Amount |
|---------------|-------------------|--------|
| **< EUR 6,500** | Forfait (flat-rate) recourse | Up to **EUR 2,030** (2025-2026 rate) |
| **< EUR 6,500 with shared liability** | Reduced forfait | **EUR 850** |
| **> EUR 6,500** | Actual damages (recours reel) | Full verified amount |

**2026 update**: The mandatory expert appraisal threshold was raised to EUR 1,000 (from EUR 850 HT in 2025).

**What this means economically**: For small claims (the majority), the insurer that pays out does NOT recover the actual amount from the at-fault insurer. They recover a flat EUR 2,030 maximum. If the repair cost was EUR 4,000 and the other driver was 100% at fault, the victim's insurer still only recovers EUR 2,030. The difference is absorbed. This creates a **strong economic incentive for efficient claims handling** and is the mechanism that makes direct compensation financially viable.

### Can the Outcome Be Disputed?

- **By the insured**: YES. The bareme is NOT opposable to the policyholder. If the insured disagrees with the liability split, they can pursue their claim under **common law (droit commun)**. The convention only governs insurer-to-insurer relationships.
- **By the insurer**: Disputes between insurers go through the GCA's arbitration process.
- **Seuil d'incontestabilite (threshold of incontestability)**: There is a damage threshold below which the opposing insurer cannot contest the recourse.

### When the Convention Does NOT Apply

- More than 2 motorized vehicles involved
- Non-motorized vehicles (pedestrians, cyclists -- though e-constat now includes some)
- Bodily injury exceeding IRCA thresholds (permanent disability > 5%)
- Foreign-plated vehicles (in some circumstances)
- Hit-and-run with unidentified vehicle
- Scenario does not fit any of the 13 cases

### Is the Bareme Lookup Automated?

- **The e-constat auto app** (official app by France Assureurs) digitizes the accident statement, pre-fills policyholder data, includes geolocation, and transmits directly to the insurer's claims system
- The checkbox data from the EAS maps to the bareme cases, enabling **automated or semi-automated liability assignment** in insurer back-office systems
- Major French insurers (MAIF, Matmut, Groupama, AXA) integrate e-constat data into their claims management platforms
- ⚠️ The degree of full automation (zero-touch liability decision) varies by insurer. The bareme lookup itself is simple enough to fully automate; the challenge is edge cases and ambiguous sketches

### The IRCA Convention (Bodily Injury Companion)

- **Full name**: Convention d'Indemnisation et de Recours Corporel Automobile
- Succeeded ICA on April 1, 2002
- Applies to **light bodily injury claims** (permanent disability rate <= 5%)
- The victim's OWN insurer manages and pays the claim
- Applies to approximately **90% of bodily injury road accidents**
- Based on the Loi Badinter (1985) framework

---

## 2. CID / CARD Convention (Italy)

### History

- **CID** (Convenzione Indennizzo Diretto): Active from 1978, voluntarily adopted
- **CARD** (Convenzione tra Assicuratori per il Risarcimento Diretto): Replaced CID in February 2007, became **mandatory** under DPR 254/2006
- As of January 1, 2023: Extended to **EU insurance companies** operating in Italy (previously Italy-only)

### How Direct Compensation (Risarcimento Diretto) Works

1. Accident occurs between two vehicles
2. The **non-at-fault (or partially at-fault) driver** contacts their OWN insurer
3. Their insurer assesses and pays the claim
4. Behind the scenes, the victim's insurer is reimbursed by the at-fault driver's insurer through the CARD clearing mechanism
5. **CONSAP** manages the clearing house (Stanza di Compensazione) for inter-insurer payments

### Eligibility Criteria for CARD

All of the following must be met:
- **Maximum 2 vehicles** involved
- Vehicles with **Italian, Vatican City, or San Marino plates** (extended to EU plates from 2023)
- Both vehicles have **valid RC Auto coverage**
- Both insurers are **CARD signatories** (now mandatory for all)
- Bodily injury does NOT result in **permanent disability exceeding 9%** (the "micropermanenti" threshold)
- The accident occurred in Italy

### The Forfait (Compenso Forfettario) Problem

- The at-fault insurer reimburses the victim's insurer a **flat-rate amount of approximately EUR 1,700** (⚠️ exact amount varies by year and claim category)
- This amount is **independent of actual damages paid**
- This creates a perverse incentive: if actual damages exceed the forfait, the victim's insurer absorbs the loss; if actual damages are below the forfait, the victim's insurer profits
- **Critics argue** this incentivizes insurers to minimize payouts to victims, since their recovery is capped at the forfait regardless
- IVASS (the Italian insurance supervisor) monitors this dynamic

### CONSAP's Role

- **Full name**: Concessionaria Servizi Assicurativi Pubblici
- Operates the **Stanza di Compensazione** (clearing house) for CARD
- Manages data flows for the CARD claims system
- Also serves as Italy's **Compensation Body** and **Information Centre** under EU Motor Insurance Directives
- Supervised by **IVASS** (Istituto per la Vigilanza sulle Assicurazioni)

### What Is Automated vs Manual?

- **Automated**: Eligibility check (2 vehicles, plate type, valid coverage, injury threshold), CARD clearing/settlement between insurers, forfait calculation
- **Semi-automated**: Liability determination (the CID/CAI form -- Italy's version of the EAS -- provides circumstance data, but Italian law does not have a formal bareme like France's IRSA)
- **Manual**: Complex liability disputes, injury assessment above 9% threshold, claims falling outside CARD scope
- ⚠️ Italy does NOT have a codified fault lookup table equivalent to France's IRSA bareme. Liability determination relies more on civil code principles, though the CAI (Constatazione Amichevole di Incidente) form provides structured data

---

## 3. CIMPAS and IDS (Portugal)

### IDS - Indemnizacao Directa ao Segurado

**The core convention system**:

- **What it is**: A protocol between Portuguese insurers for direct compensation on material-damage motor claims
- **Participation**: Approximately **100% of the market** (23 insurers operating the auto branch)
- **Scope**: Traffic accidents in Portugal involving exactly 2 vehicles

#### Eligibility Criteria
- Accident occurred in **Portugal** less than **1 year ago**
- Exactly **2 vehicles** involved
- Damages assessed and repaired in **Portuguese territory**
- **No bodily injuries**
- Both insurers have **adhered to the convention**
- Damage to the injured party's vehicle does NOT exceed **EUR 15,000**

#### Performance Statistics (2024)
| Metric | Value |
|--------|-------|
| IDS claims opened | **209,775** |
| Total amount paid | **EUR 267,210,294** |
| Average cost per claim | **EUR 1,448** |
| Claims reaching agreement | **190,346** (out of 209,054) |
| Average time to decision | **1.94 days** |
| Agreement rate | ~**91%** |

These are remarkable numbers: 91% agreement rate with an average decision time under 2 days.

#### CIDS (Complementary Convention)
- An additional agreement between several Portuguese insurers
- Applies within IDS protocol but does NOT require a friendly agreement (constat amiable equivalent) as the basis
- Covers cases where the accident statement is disputed or unavailable

### CIMPAS - Arbitration Centre

- **Full name**: Centro de Informacao, Mediacao, Provedoria e Arbitragem de Seguros
- Authorized by the **Portuguese Ministry of Justice**
- Handles disputes arising from insurance contracts including motor vehicle insurance

#### How CIMPAS Works
1. **Mediation phase** (mandatory first step)
2. **Arbitration** if mediation fails
3. **Typical timeline**: 3-6 months to final decision
4. **Cost**: 3% of the claim amount as arbitration fee
5. **Limitations**: Does NOT handle events outside Portugal, or cases involving death or permanent disability

#### CIMPAS and IDS Interaction
- CIMPAS serves as the **dispute resolution backstop** for claims that cannot be resolved through IDS
- When IDS agreement cannot be reached (the ~9% of cases), CIMPAS mediation/arbitration is a faster alternative to court litigation

---

## 4. Other EU Convention Systems

### Spain: CIDE / ASCIDE / CICOS

Spain has one of the most developed convention systems in Europe:

- **CIDE** (Convenio de Indemnizacion Directa Espanol): Launched January 1, 1988
  - Covers direct collision between 2 vehicles
  - Requires a signed friendly accident report (Declaracion Amistosa de Accidente - DAA)
  - Both insurers must be CIDE members
  - Material damage only

- **ASCIDE** (Acuerdo Suplementario al CIDE): Launched May 1, 1990
  - Supplementary agreement for cases NOT covered by CIDE
  - Used when the friendly accident report is not signed or liability is disputed
  - Still requires 2 vehicles, valid insurance, direct collision
  - Claim cost cannot exceed the legal limit for material damages under mandatory liability

- **CICOS** (Centro Informatico de Compensacion de Seguros): The electronic processing platform
  - All participating insurers are connected to CICOS
  - Functions as a "Claim Compensation Computer Centre"
  - **Resolves approximately 70-83% of all motor claims in Spain** (sources vary)
  - Processes over **2.5 million claims per year**
  - Includes a **Tabla de Culpabilidad** (culpability/liability table) used to determine fault

- Managed by **TIREA** (Tecnologias de la Informacion y Redes para las Entidades Aseguradoras) and coordinated by **UNESPA** (the Spanish insurers' association)

### Germany: No Formal Convention System

Germany is notable for **NOT** having a formal inter-insurer convention like France, Italy, Spain, or Portugal:

- Liability determination follows **civil law principles** (BGB -- Burgerliches Gesetzbuch)
- The concept of **Haftungsquote** (liability quota) is determined on a case-by-case basis
- **Betriebsgefahr** (operational hazard): German law recognizes that operating a motor vehicle is inherently dangerous, creating a form of strict liability
- Fault splits can be any percentage (not just 0/50/100 as in France)
- The at-fault party's insurer (Kfz-Haftpflichtversicherung) pays the victim directly
- There is no direct compensation mechanism -- the victim must claim against the OTHER driver's insurer
- **Teilungsabkommen** (division agreements) exist as bilateral agreements between specific insurers, but these are not industry-wide standardized conventions
- ⚠️ Germany's lack of a convention system means liability decisions are slower and more adversarial than in convention countries, though the legal framework is highly codified

### Netherlands: Bedrijfsregeling Directe Schadeafhandeling (DSA)

The Netherlands has been building toward a convention system:

- **Bedrijfsregeling 7** ("Schuldloze Derde" / Innocent Third Party): Long-standing regulation governing treatment of clearly non-at-fault parties
- **Bedrijfsregeling 15**: Covers personal injury claims in traffic -- behavioral rules for damage settlement
- **DSA (Directe Schadeafhandeling)**: Direct Claims Settlement regulation
  - Launched with first full year evaluated in 2022
  - Expanded to campers and motorcycles (material damage) from April 1, 2023
  - Under DSA, the own insurer reimburses motor vehicle damage and property damage that the injured party could have claimed from the WAM (Wet aansprakelijkheidsverzekering motorrijtuigen) insurer of the responsible party
  - Governed by **Verbond van Verzekeraars** (Dutch Association of Insurers), representing >95% of the market
- ⚠️ The Dutch system is **newer and less mature** than France/Italy/Spain, still expanding its scope

### United Kingdom (Pre/Post Brexit)

**Pre-Brexit (and historically)**:
- **Knock-for-knock agreements**: Historically, UK insurers had informal agreements where each insurer paid its own policyholder's losses regardless of fault
- These were **voluntary bilateral agreements**, not a centralized convention
- **Criticized**: Because policyholders lost their no-claims bonus even when not at fault
- Knock-for-knock agreements have been **largely abandoned**
- **GTA (General Terms Agreement)**: Launched 1999, governs credit hire (replacement vehicle) costs between insurers and credit hire companies
- **MIB (Motor Insurers' Bureau)**: Handles uninsured/untraced driver claims
- **No formal convention system** equivalent to France/Spain/Italy -- liability is determined through adversarial negotiation between insurers

**Post-Brexit**:
- UK left the EU Motor Insurance Directive framework
- MIB no longer acts as EU Compensation Body
- Green Card requirements were temporarily reinstated (later relaxed)
- The underlying liability determination process (adversarial, no convention) was unchanged by Brexit

---

## 5. The Automation Question

### Current State of Convention Automation

| Market | Convention | Automation Level | Notes |
|--------|-----------|-----------------|-------|
| **France** | IRSA/IRCA | **High** | e-constat digitizes input; bareme is a simple lookup; major insurers have integrated this into claims platforms |
| **Italy** | CARD | **Medium-High** | Eligibility check is fully automatable; liability determination less codified than France |
| **Spain** | CIDE/ASCIDE/CICOS | **High** | CICOS is already a centralized computer system connecting all participating insurers |
| **Portugal** | IDS/CIDS | **High** | 1.94-day average decision time and 91% agreement rate suggest significant automation |
| **Netherlands** | DSA | **Medium** | Newer system, still expanding |
| **Germany** | None | **Low** | Case-by-case liability; some bilateral agreements |
| **UK** | None | **Low** | Adversarial; no standardized lookup |

### Data Inputs Needed for Convention Lookup

From the European Accident Statement (EAS / Constat Amiable), which has a **standardized format across all EU countries**:

#### The 17 Circumstance Checkboxes
| Box | Circumstance |
|-----|-------------|
| 1 | Was parked / stopped |
| 2 | Leaving a parking place / opening a door |
| 3 | Entering a parking place |
| 4 | Emerging from a car park, private ground, or track |
| 5 | Entering a car park, private ground, or track |
| 6 | Entering a roundabout |
| 7 | Circulating in a roundabout |
| 8 | Striking the rear of another vehicle, same direction, same lane |
| 9 | Going in the same direction, different lane |
| 10 | Changing lanes |
| 11 | Overtaking |
| 12 | Turning right |
| 13 | Turning left |
| 14 | Reversing |
| 15 | Encroaching on a lane reserved for traffic in the opposite direction |
| 16 | Coming from the right (at an intersection) |
| 17 | Had not observed a traffic sign or red light |

#### Additional Required Inputs
- Points of impact (marked on vehicle silhouette diagrams)
- Sketch/diagram of the accident scene
- Road layout (intersection, straight road, parking area)
- Number of vehicles involved
- Presence/absence of bodily injury
- Vehicle registration details (plate country, valid insurance)

### Mapping EAS Checkboxes to Convention Outcomes

For the French IRSA bareme:
- The 17 checkboxes for Vehicle A and Vehicle B create a **theoretical matrix of 2^17 x 2^17 combinations** per side
- In practice, only certain combinations are meaningful
- The 13 IRSA cases map to **specific checkbox patterns** combined with impact point data
- ⚠️ Estimate: approximately **60-70% of EAS checkbox combinations** map cleanly to one of the 13 IRSA cases with a deterministic fault outcome
- The remaining 30-40% require human interpretation (ambiguous sketches, contradictory checkboxes, scenarios not fitting the 13 cases)

### Percentage of Cases Falling Outside Conventions

| Market | Convention Coverage | Cases Outside Convention |
|--------|-------------------|------------------------|
| France (material) | ~80% | ~20% (3+ vehicles, foreign plates, uninsured, non-standard) |
| France (bodily) | ~90% via IRCA | ~10% (permanent disability > 5%) |
| Italy | CARD eligible: majority of 2-vehicle claims | Cases with >9% permanent disability, 3+ vehicles, foreign (non-EU) plates |
| Spain | 70-83% via CICOS | 17-30% |
| Portugal | ~91% agreement rate within IDS | ~9% go to dispute/CIMPAS |

### Could a Third Party Build a Universal Convention Lookup Engine?

**Technical feasibility**: YES, with significant caveats.

**What would be needed**:
1. Licensed access to the full convention texts (IRSA, CARD, CIDE/ASCIDE, IDS) -- some are proprietary to insurer associations
2. The EAS form data in structured format (e-constat already does this for France)
3. Country-specific eligibility rules (vehicle count, injury threshold, plate type, damage cap)
4. The bareme/fault tables for each country
5. Inter-insurer forfait amounts (updated annually)

**Key challenges**:
- Convention texts are **proprietary** to national insurer associations (GCA in France, ANIA/CONSAP in Italy, UNESPA/TIREA in Spain, APS in Portugal)
- Each convention has **different fault allocation logic** (France = 0/50/100; Germany = any percentage; Spain = culpability table)
- Convention rules are **updated periodically** (IRSA forfait changes, eligibility thresholds change)
- The **sketch/diagram** is the hardest input to automate -- it is freeform and critical for edge cases
- Cross-border scenarios add complexity (which convention applies?)

**What already exists**:
- **CICOS** in Spain is effectively a centralized convention engine connecting all insurers
- **e-constat auto** in France digitizes the input side
- **CONSAP** clearing house in Italy handles the settlement side
- ⚠️ No single platform currently spans ALL EU markets as a universal lookup engine

---

## 6. Convention Economics

### How Inter-Insurer Payments Work

The fundamental economic model across all convention systems:

```
[Victim] --> claims from --> [Own Insurer (Insurer A)]
                                    |
                                    | pays victim
                                    |
                            [Insurer A] --> recovers from --> [At-fault Insurer (Insurer B)]
                                                via forfait or actual cost
```

### Forfait (Flat-Rate) Amounts by Country

| Country | Forfait Amount | Threshold | Above Threshold |
|---------|---------------|-----------|-----------------|
| **France (IRSA)** | EUR 2,030 (max, 2025-2026) | EUR 6,500 damage | Actual cost recovery |
| **France (shared liability)** | EUR 850 | EUR 6,500 damage | Actual cost at liability % |
| **Italy (CARD)** | ~EUR 1,700 (⚠️ approximate) | N/A (flat for all eligible) | N/A |
| **Spain** | Module-based exchange system | Varies by agreement | Settled at period end |
| **Portugal** | ⚠️ Not publicly documented as a fixed forfait | EUR 15,000 damage cap for IDS | Claims exit IDS protocol |

### How the Forfait Affects Claims Decisions

The forfait creates several important economic dynamics:

1. **For small claims (majority)**: The insurer paying the victim recovers LESS than actual cost. This means:
   - Insurers are incentivized to control repair costs
   - There is no incentive to inflate claims (you can't recover more than the forfait anyway)
   - Efficient claims handling is rewarded

2. **For large claims (above threshold)**: Actual cost recovery applies, so normal adversarial dynamics return

3. **Portfolio-level economics**: Insurers with better (less at-fault) drivers receive more forfait income than they pay out. Insurers with worse drivers are net payers. This creates a **secondary risk-transfer mechanism** within the convention.

4. **Italy-specific concern**: Because the CARD forfait is fixed regardless of actual payout, victim's insurers have been criticized for minimizing settlements to keep the gap between the forfait received and actual payout as profit margin.

---

## Summary: What Makes EU Convention Systems Structurally Different

| Dimension | EU Convention Countries | US / Non-Convention |
|-----------|----------------------|---------------------|
| **Who the victim deals with** | Own insurer (direct compensation) | Other driver's insurer (third-party claim) |
| **Liability determination** | Standardized lookup table / bareme | Case-by-case adversarial investigation |
| **Fault granularity** | Often binary (0/50/100%) | Any percentage |
| **Inter-insurer settlement** | Forfait (flat-rate) for small claims | Actual cost subrogation |
| **Speed** | Days (Portugal: 1.94 days average) | Weeks to months |
| **Dispute mechanism** | Convention arbitration, then courts | Negotiation, then litigation |
| **Automation potential** | Very high (structured inputs, deterministic rules) | Lower (unstructured, judgment-dependent) |
| **Data standard** | European Accident Statement (EAS) -- universal form | No universal form |

The conventions are the reason European motor insurance is structurally more automatable than American motor insurance. The EAS provides standardized input. The bareme provides deterministic rules. The forfait simplifies inter-insurer economics. Together, they create a **pre-built decision engine** that has been operating for decades -- long before anyone called it "AI" or "automation."

---

*Report compiled: February 2026*
*⚠️ flags indicate estimates, approximations, or details that could not be independently verified to the exact figure*
