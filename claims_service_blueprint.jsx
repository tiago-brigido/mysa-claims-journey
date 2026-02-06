import { useState } from "react";

const PHASES = [
  { id: "incident", label: "Phase 0\nIncident", color: "#DC2626" },
  { id: "scene", label: "Phase 1\nScene Mgmt", color: "#EA580C" },
  { id: "documentation", label: "Phase 2\nDocumentation", color: "#D97706" },
  { id: "reconciliation", label: "Phase 3\nReconciliation", color: "#CA8A04" },
  { id: "first_contact", label: "Phase 4\nFirst Contact", color: "#65A30D" },
  { id: "fnol", label: "Phase 5\nFNOL", color: "#16A34A" },
  { id: "triage", label: "Phase 6\nTriage", color: "#0D9488" },
  { id: "investigation", label: "Phase 7\nInvestigation", color: "#0284C7" },
  { id: "assessment", label: "Phase 8\nAssessment", color: "#4F46E5" },
  { id: "decision", label: "Phase 9\nDecision", color: "#7C3AED" },
  { id: "settlement", label: "Phase 10\nSettlement", color: "#9333EA" },
  { id: "close", label: "Phase 11\nClose", color: "#C026D3" },
];

const ACTORS = [
  { id: "policyholder", label: "Policyholder (Driver A)", color: "#3B82F6", group: "external" },
  { id: "counterparty", label: "Counter-party (Driver B)", color: "#6366F1", group: "external" },
  { id: "police", label: "Police / Emergency", color: "#EF4444", group: "external" },
  { id: "broker", label: "Broker / Agent", color: "#F59E0B", group: "intermediary" },
  { id: "insurer_fo", label: "Insurer A — Front Office", color: "#059669", group: "insurer_a" },
  { id: "insurer_handler", label: "Insurer A — Claims Handler", color: "#10B981", group: "insurer_a" },
  { id: "insurer_uw", label: "Insurer A — Underwriting", color: "#34D399", group: "insurer_a" },
  { id: "insurer_fin", label: "Insurer A — Finance", color: "#6EE7B7", group: "insurer_a" },
  { id: "siu", label: "SIU (Fraud)", color: "#F43F5E", group: "insurer_a" },
  { id: "insurer_b", label: "Insurer B (Driver B's)", color: "#14B8A6", group: "insurer_b" },
  { id: "convention", label: "Convention Body", color: "#8B5CF6", group: "system" },
  { id: "adjuster", label: "Adjuster / Expert", color: "#EC4899", group: "service" },
  { id: "tpa", label: "TPA (Crawford, Sedgwick, etc.)", color: "#7C3AED", group: "service" },
  { id: "repair", label: "Repair / Provider", color: "#78716C", group: "service" },
  { id: "documents", label: "📄 Documents / Data", color: "#1E293B", group: "data" },
];

const GL = { external: "External Parties", intermediary: "Intermediaries", insurer_a: "Insurer A (Policyholder's)", insurer_b: "Insurer B (Counter-party's)", system: "System / Convention", service: "External Services", data: "Data Layer" };

const TS = {
  action: { bg: "#F3F4F6", bd: "#D1D5DB", tx: "#374151" },
  fork: { bg: "#FEF3C7", bd: "#F59E0B", tx: "#92400E" },
  "path-a": { bg: "#D1FAE5", bd: "#10B981", tx: "#065F46" },
  "path-b": { bg: "#FEE2E2", bd: "#EF4444", tx: "#991B1B" },
  "path-c": { bg: "#E0E7FF", bd: "#6366F1", tx: "#3730A3" },
  eu: { bg: "#DBEAFE", bd: "#3B82F6", tx: "#1E40AF" },
  us: { bg: "#FCE7F3", bd: "#EC4899", tx: "#9D174D" },
  todo: { bg: "#F5F5F4", bd: "#A8A29E", tx: "#78716C" },
  doc: { bg: "#F1F5F9", bd: "#64748B", tx: "#334155" },
  friction: { bg: "#FEF2F2", bd: "#DC2626", tx: "#991B1B" },
  home: { bg: "#FDF4FF", bd: "#A855F7", tx: "#6B21A8" },
};

const C = {
  "policyholder-incident": [
    { t: "Shock / adrenaline", y: "action" },
    { t: "Am I hurt? Passengers?", y: "action" },
    { t: "Is car in danger?", y: "action" },
  ],
  "counterparty-incident": [
    { t: "Same shock state", y: "action" },
    { t: "Self-assessment", y: "action" },
  ],
  "documents-incident": [
    { t: "Dashcam footage (if exists)", y: "doc" },
    { t: "Telematics data (if connected)", y: "doc" },
  ],
  "policyholder-scene": [
    { t: "⚡ FORK 1: Anyone injured?", y: "fork", f: "fork1" },
    { t: "YES → Call 112/911", y: "path-a" },
    { t: "NO → Exit vehicle", y: "path-b" },
    { t: "⚡ FORK 2: Cooperative?", y: "fork", f: "fork2" },
    { t: "YES → Exchange info", y: "path-a" },
    { t: "NO → Call police", y: "path-b" },
    { t: "FLED → Hit & run", y: "path-c" },
  ],
  "counterparty-scene": [
    { t: "Cooperative → exchanges", y: "path-a" },
    { t: "Disputes → refuses", y: "path-b" },
    { t: "Flees scene", y: "path-c" },
  ],
  "police-scene": [
    { t: "If called: arrive", y: "action" },
    { t: "Secure scene", y: "action" },
    { t: "Coordinate ambulance", y: "action" },
    { t: "Take over docs", y: "action" },
  ],
  "documents-scene": [
    { t: "Scene photos", y: "doc" },
    { t: "Damage photos (each car)", y: "doc" },
    { t: "License plates", y: "doc" },
    { t: "Witness contacts", y: "doc" },
  ],
  "policyholder-documentation": [
    { t: "⚡ FORK 3: EU vs US", y: "fork", f: "fork3" },
    { t: "🇪🇺 Fill EAS (~50% paper)", y: "eu" },
    { t: "🇪🇺 Sign, keep copy", y: "eu" },
    { t: "🇺🇸 Exchange ins. cards", y: "us" },
    { t: "🇺🇸 Get police report #", y: "us" },
  ],
  "counterparty-documentation": [
    { t: "🇪🇺 Co-signs EAS", y: "eu" },
    { t: "🇪🇺 Keeps carbon copy", y: "eu" },
    { t: "🇺🇸 Provides ins. info", y: "us" },
  ],
  "police-documentation": [
    { t: "🇺🇸 Files crash report", y: "us" },
    { t: "🇺🇸 Required > $500-1K", y: "us" },
    { t: "🇪🇺 Only if called", y: "eu" },
  ],
  "documents-documentation": [
    { t: "🇪🇺 EAS (signed by both)", y: "eu" },
    { t: "🇺🇸 Police crash report", y: "us" },
    { t: "🇺🇸 Insurance card copies", y: "us" },
    { t: "Damage photos", y: "doc" },
    { t: "ID copies", y: "doc" },
  ],
  "policyholder-reconciliation": [
    { t: "🇪🇺 Clean EAS: no action", y: "eu" },
    { t: "🇪🇺 May get clarification call", y: "eu" },
    { t: "🇺🇸 MUST give recorded stmt", y: "us" },
    { t: "🇺🇸 15-30 min call", y: "us" },
  ],
  "insurer_fo-reconciliation": [
    { t: "🇺🇸 Schedules recorded stmts", y: "us" },
    { t: "🇪🇺 Receives EAS, logs claim", y: "eu" },
  ],
  "insurer_handler-reconciliation": [
    { t: "🇪🇺 Reviews EAS vs convention", y: "eu" },
    { t: "🇪🇺 Clean → auto-process", y: "eu" },
    { t: "🇪🇺 Unclear → contact driver", y: "eu" },
    { t: "🇺🇸 Conducts recorded stmt", y: "us" },
    { t: "🇺🇸 Reviews police report", y: "us" },
    { t: "🇺🇸 Assigns fault %", y: "us" },
  ],
  "insurer_b-reconciliation": [
    { t: "🇺🇸 Calls Driver B", y: "us" },
    { t: "🇺🇸 Own liability determination", y: "us" },
    { t: "🇪🇺 Receives EAS from B", y: "eu" },
  ],
  "convention-reconciliation": [
    { t: "🇪🇺 Fault lookup tables", y: "eu" },
    { t: "🇪🇺 Auto fault ~70-80% ⚠️", y: "eu" },
    { t: "🇺🇸 Arbitration Forums Inc.", y: "us" },
    { t: "🇺🇸 Only if insurers disagree", y: "us" },
  ],
  "siu-reconciliation": [
    { t: "If fraud flags triggered", y: "action" },
    { t: "Full investigation", y: "action" },
  ],
  "documents-reconciliation": [
    { t: "🇺🇸 Recorded stmts (audio)", y: "us" },
    { t: "🇺🇸 Police report (official)", y: "us" },
    { t: "🇪🇺 Verified EAS", y: "eu" },
    { t: "🇪🇺 Convention fault ruling", y: "eu" },
    { t: "Liability assessment", y: "doc" },
    { t: "Claim file opened", y: "doc" },
  ],
  "policyholder-first_contact": [
    { t: "⚡ FORK 4: Who to contact?", y: "fork", f: "fork4" },
    { t: "→ Broker", y: "path-a" },
    { t: "→ Agent", y: "path-b" },
    { t: "→ Insurer direct", y: "path-c" },
  ],
  "broker-first_contact": [
    { t: "Receive panic call", y: "action" },
    { t: "Calm, ask structured Qs", y: "action" },
    { t: "Triage: covered? exclusions?", y: "action" },
    { t: "Guide documentation gaps", y: "action" },
    { t: "⚡ FORK 5: Submit how?", y: "fork", f: "fork5" },
    { t: "⚠️ Rekey into portal", y: "friction" },
    { t: "⚠️ Email → insurer rekeys", y: "friction" },
    { t: "🇺🇸 Personal auto: minimal role", y: "us" },
    { t: "🇪🇺 UK/NL/BE: active role", y: "eu" },
  ],
  "insurer_fo-first_contact": [
    { t: "Receive direct call/app/web", y: "action" },
    { t: "Verify policy details", y: "action" },
    { t: "Collect incident info", y: "action" },
    { t: "Open claim file", y: "action" },
    { t: "Route to handler", y: "action" },
  ],
  "adjuster-first_contact": [
    { t: "🇺🇸 Staff/Independent adjuster", y: "us" },
    { t: "🇺🇸 Schedules recorded stmt", y: "us" },
    { t: "🇺🇸 ALWAYS insurer employee", y: "us" },
    { t: "🇪🇺 Only for complex claims", y: "eu" },
  ],
  "documents-first_contact": [
    { t: "FNOL record created", y: "doc" },
    { t: "Policy verification", y: "doc" },
    { t: "Incident summary logged", y: "doc" },
    { t: "Claim number assigned", y: "doc" },
  ],
  // Phase 5: FNOL
  "policyholder-fnol": [
    { t: "🇪🇺 'Here's my EAS'", y: "eu" },
    { t: "🇺🇸 Basic info to call center", y: "us" },
    { t: "🇺🇸 THEN recorded statement", y: "us" },
  ],
  "insurer_fo-fnol": [
    { t: "Verify policy active", y: "action" },
    { t: "Open claim file", y: "action" },
    { t: "Log FNOL data", y: "action" },
    { t: "🇺🇸 Schedule adjuster callback", y: "us" },
  ],
  "insurer_handler-fnol": [
    { t: "🇪🇺 Receive EAS", y: "eu" },
    { t: "🇪🇺 Match to convention", y: "eu" },
    { t: "🇺🇸 Conduct recorded stmt", y: "us" },
    { t: "🇺🇸 15-30 min call", y: "us" },
  ],
  "broker-fnol": [
    { t: "Submit to insurer portal", y: "action" },
    { t: "⚠️ Or email + wait", y: "friction" },
    { t: "Confirm claim # received", y: "action" },
  ],
  "adjuster-fnol": [
    { t: "🇺🇸 Calls policyholder", y: "us" },
    { t: "🇺🇸 Recorded statement", y: "us" },
    { t: "🇺🇸 Calls other driver too", y: "us" },
    { t: "🇪🇺 Only if complex/disputed", y: "eu" },
  ],
  "documents-fnol": [
    { t: "Claim file opened", y: "doc" },
    { t: "FNOL data logged", y: "doc" },
    { t: "🇪🇺 EAS attached", y: "eu" },
    { t: "🇺🇸 Statement transcript", y: "us" },
  ],
  // Phase 6: Triage
  "policyholder-triage": [
    { t: "Awaits decision", y: "action" },
    { t: "May get status update", y: "action" },
  ],
  "insurer_handler-triage": [
    { t: "⚡ FORK 6: Triage decision", y: "fork", f: "fork6" },
    { t: "🇪🇺 Clean EAS → auto-process (~10% STP)", y: "eu" },
    { t: "🇪🇺 Unclear → clarify", y: "eu" },
    { t: "🇺🇸 Assign to adjuster", y: "us" },
  ],
  "siu-triage": [
    { t: "Fraud indicators?", y: "action" },
    { t: "If yes → flag for SIU", y: "action" },
  ],
  "convention-triage": [
    { t: "🇪🇺 Receive claim data", y: "eu" },
    { t: "🇪🇺 Match to fault tables", y: "eu" },
    { t: "🇪🇺 Return fault %", y: "eu" },
  ],
  "documents-triage": [
    { t: "Severity assessment", y: "doc" },
    { t: "Complexity score", y: "doc" },
    { t: "Routing decision logged", y: "doc" },
    { t: "Reserves set", y: "doc" },
  ],
};

// Phase 7: Investigation
C["policyholder-investigation"] = [
  { t: "🇺🇸 Recorded statement (15-30 min)", y: "us" },
  { t: "🇺🇸 Answer adjuster questions", y: "us" },
  { t: "🇪🇺 Only if EAS unclear", y: "eu" },
  { t: "Provide additional photos/docs", y: "action" },
];
C["counterparty-investigation"] = [
  { t: "🇺🇸 Also gives statement", y: "us" },
  { t: "🇺🇸 To THEIR insurer", y: "us" },
  { t: "Stories may conflict", y: "friction" },
];
C["insurer_handler-investigation"] = [
  { t: "⚡ FORK 10: Investigation type", y: "fork", f: "fork10" },
  { t: "🇪🇺 Review EAS gaps", y: "eu" },
  { t: "🇪🇺 Clarification calls", y: "eu" },
  { t: "🇺🇸 Analyze recorded statements", y: "us" },
  { t: "🇺🇸 Compare narratives", y: "us" },
];
C["adjuster-investigation"] = [
  { t: "🇺🇸 Conduct statements (both parties)", y: "us" },
  { t: "Gather evidence (police report, photos)", y: "action" },
  { t: "Vehicle inspection if needed", y: "action" },
  { t: "Determine fault %", y: "action" },
  { t: "Write investigation report", y: "action" },
];
C["siu-investigation"] = [
  { t: "If fraud flagged:", y: "action" },
  { t: "Claims history search", y: "action" },
  { t: "Social media review", y: "action" },
  { t: "Document forensics", y: "action" },
  { t: "SIU recommendation", y: "action" },
];
C["insurer_b-investigation"] = [
  { t: "🇺🇸 Their adjuster investigates", y: "us" },
  { t: "🇺🇸 Takes their insured's statement", y: "us" },
  { t: "May reach different conclusion", y: "friction" },
];
C["documents-investigation"] = [
  { t: "🇺🇸 Recorded statement transcripts", y: "us" },
  { t: "Liability determination memo", y: "doc" },
  { t: "Investigation summary", y: "doc" },
  { t: "Expert reports (if engaged)", y: "doc" },
  { t: "Reserve updates", y: "doc" },
];

// TPA Journey - Phases where TPAs are active
C["tpa-first_contact"] = [
  { t: "🏠 White-label FNOL intake", y: "home" },
  { t: "24/7 call center (branded)", y: "action" },
  { t: "Policy verification", y: "action" },
  { t: "Open claim in insurer system", y: "action" },
];
C["tpa-fnol"] = [
  { t: "🏠 Full intake (if delegated)", y: "home" },
  { t: "First-party coverage check", y: "action" },
  { t: "Reserve setting (initial)", y: "action" },
  { t: "Policyholder guidance", y: "action" },
];
C["tpa-triage"] = [
  { t: "Complexity assessment", y: "action" },
  { t: "Within delegated authority?", y: "fork" },
  { t: "YES → Assign TPA adjuster", y: "path-a" },
  { t: "NO → Refer back to insurer", y: "path-b" },
  { t: "🏠 Adjuster selection (staff/IA)", y: "home" },
];
C["tpa-investigation"] = [
  { t: "🏠 Schedule field/virtual inspection", y: "home" },
  { t: "TPA adjuster conducts inspection", y: "action" },
  { t: "Document damage + causation", y: "action" },
  { t: "Take photos/video", y: "action" },
  { t: "Fraud screening", y: "action" },
];
C["tpa-assessment"] = [
  { t: "🏠 Xactimate estimate (~75-80%)", y: "home" },
  { t: "Scope of loss (visible damage)", y: "action" },
  { t: "Supplement for hidden damage", y: "action" },
  { t: "Contractor coordination", y: "action" },
  { t: "Reserve adjustment", y: "action" },
];
C["tpa-decision"] = [
  { t: "Coverage determination", y: "action" },
  { t: "Liability determination", y: "action" },
  { t: "Within authority → approve/deny", y: "action" },
  { t: "Exceeds authority → refer to insurer", y: "friction" },
  { t: "SIU referral if fraud suspected", y: "action" },
];
C["tpa-settlement"] = [
  { t: "Payment processing", y: "action" },
  { t: "Issue check/EFT", y: "action" },
  { t: "Policyholder communication", y: "action" },
  { t: "Supplement handling", y: "action" },
  { t: "Dispute resolution", y: "friction" },
];
C["tpa-close"] = [
  { t: "Final documentation", y: "action" },
  { t: "File closure checklist", y: "action" },
  { t: "Subrogation referral (if applicable)", y: "action" },
  { t: "Quality audit (sample)", y: "action" },
  { t: "Report to insurer", y: "doc" },
];

// Phase 8: Assessment
C["policyholder-assessment"] = [
  { t: "Submit damage photos", y: "action" },
  { t: "Take vehicle to DRP/shop", y: "action" },
  { t: "May get independent estimate", y: "action" },
  { t: "OEM vs aftermarket dispute?", y: "friction" },
];
C["insurer_handler-assessment"] = [
  { t: "Review estimate from appraiser", y: "action" },
  { t: "Approve/negotiate estimate", y: "action" },
  { t: "Total loss decision", y: "action" },
  { t: "Adjust reserves", y: "action" },
  { t: "Flag subrogation opportunity", y: "action" },
];
C["adjuster-assessment"] = [
  { t: "🇺🇸 Appraiser inspects vehicle", y: "us" },
  { t: "🇺🇸 CCC/Mitchell/Audatex estimate", y: "us" },
  { t: "🇪🇺 Expert inspection (if needed)", y: "eu" },
  { t: "🇪🇺 Audatex/DAT/GT Motive est.", y: "eu" },
  { t: "Photo AI assessment (Tractable)", y: "action" },
  { t: "Total loss vs repair decision", y: "fork" },
];
C["repair-assessment"] = [
  { t: "DRP shop writes estimate", y: "action" },
  { t: "May supplement if hidden damage", y: "friction" },
  { t: "Parts availability check", y: "action" },
  { t: "ADAS recalibration needed?", y: "action" },
];
C["insurer_b-assessment"] = [
  { t: "🇺🇸 Own appraiser if disputed", y: "us" },
  { t: "May disagree on repair cost", y: "friction" },
];
C["documents-assessment"] = [
  { t: "Line-item repair estimate", y: "doc" },
  { t: "Total loss valuation (if TL)", y: "doc" },
  { t: "Vehicle inspection photos", y: "doc" },
  { t: "Supplement estimates", y: "doc" },
  { t: "Reserve adjustment", y: "doc" },
  { t: "Subrogation demand (if applicable)", y: "doc" },
];

// Phase 9: Decision — The 7 Claims Decisions
C["policyholder-decision"] = [
  { t: "Awaits coverage confirmation", y: "action" },
  { t: "May dispute liability %", y: "friction" },
  { t: "Notified of total loss?", y: "action" },
  { t: "BI: Provides medical docs", y: "action" },
  { t: "May engage attorney (BI)", y: "friction" },
];
C["insurer_handler-decision"] = [
  { t: "⚡ FORK 11: Decision type", y: "fork", f: "fork11" },
  { t: "D1: Coverage determination", y: "action" },
  { t: "D2: Liability assignment", y: "action" },
  { t: "D3: Reserve setting/adjustment", y: "action" },
  { t: "D4: Total loss vs repair", y: "fork" },
  { t: "D5: Fraud referral to SIU", y: "action" },
  { t: "D6: Subrogation identification", y: "action" },
  { t: "D7: BI valuation (if injury)", y: "action" },
];
C["adjuster-decision"] = [
  { t: "🇺🇸 Recommends liability %", y: "us" },
  { t: "🇺🇸 Sets/adjusts reserves", y: "us" },
  { t: "🇺🇸 Total loss recommendation", y: "us" },
  { t: "🇺🇸 BI: Colossus/manual valuation", y: "us" },
  { t: "🇪🇺 Expert report → handler decides", y: "eu" },
  { t: "🇪🇺 Convention lookup = auto-liability", y: "eu" },
];
C["insurer_uw-decision"] = [
  { t: "Coverage interpretation (grey areas)", y: "action" },
  { t: "Policy exclusion review", y: "action" },
  { t: "Referral for complex coverage Qs", y: "friction" },
];
C["insurer_fin-decision"] = [
  { t: "Reserve adequacy review", y: "action" },
  { t: "Large loss escalation", y: "action" },
  { t: "Reinsurance notification", y: "action" },
];
C["siu-decision"] = [
  { t: "D5: Fraud referral decision", y: "action" },
  { t: "⚠️ Red flags → full investigation", y: "friction" },
  { t: "Clear → return to handler", y: "path-a" },
  { t: "Suspicious → deny/negotiate", y: "path-b" },
];
C["insurer_b-decision"] = [
  { t: "🇺🇸 Own liability determination", y: "us" },
  { t: "🇺🇸 May disagree on fault %", y: "friction" },
  { t: "🇺🇸 Inter-company arbitration?", y: "us" },
  { t: "🇪🇺 Convention determines", y: "eu" },
];
C["convention-decision"] = [
  { t: "🇪🇺 Bareme lookup → fault %", y: "eu" },
  { t: "🇪🇺 IRSA/CARD/IDS/CIDE tables", y: "eu" },
  { t: "🇪🇺 13 cases (FR) to 50+ (IT)", y: "eu" },
  { t: "🇺🇸 Arbitration Forums (if disputed)", y: "us" },
];
C["documents-decision"] = [
  { t: "Coverage determination memo", y: "doc" },
  { t: "Liability assignment (fault %)", y: "doc" },
  { t: "Reserve calculation worksheet", y: "doc" },
  { t: "Total loss valuation report", y: "doc" },
  { t: "SIU referral (if applicable)", y: "doc" },
  { t: "Subrogation demand letter", y: "doc" },
  { t: "BI valuation (Colossus/manual)", y: "doc" },
  { t: "🇪🇺 Convention fault ruling", y: "eu" },
];

// Phase 10: Settlement — Money Moves
C["policyholder-settlement"] = [
  { t: "Receives settlement offer", y: "action" },
  { t: "Reviews offer vs expectations", y: "action" },
  { t: "⚡ FORK 12: Settlement path", y: "fork", f: "fork12" },
  { t: "Accepts or disputes amount", y: "action" },
  { t: "Signs release of all claims", y: "action" },
  { t: "Provides bank details", y: "action" },
  { t: "🇪🇺 Minimal negotiation (convention)", y: "eu" },
  { t: "🇺🇸 May negotiate / hire attorney (BI)", y: "us" },
];
C["insurer_handler-settlement"] = [
  { t: "Calculates settlement (estimate − deductible)", y: "action" },
  { t: "Generates offer letter", y: "action" },
  { t: "Communicates offer to policyholder", y: "action" },
  { t: "Negotiates within authority level", y: "action" },
  { t: "Escalates if above authority", y: "friction" },
  { t: "Processes payment authorization", y: "action" },
  { t: "Manages supplement requests", y: "friction" },
  { t: "Initiates subrogation referral", y: "action" },
  { t: "Updates reserves → match payment", y: "action" },
  { t: "🇪🇺 Triggers convention reimbursement", y: "eu" },
  { t: "🇺🇸 Handles attorney demands (BI)", y: "us" },
];
C["adjuster-settlement"] = [
  { t: "Recommends settlement amount", y: "action" },
  { t: "ACV valuation (total loss)", y: "action" },
  { t: "Re-inspects for supplements", y: "friction" },
  { t: "BI: valuation (Colossus/manual)", y: "action" },
  { t: "Verifies repair completion (DRP)", y: "action" },
  { t: "🇪🇺 Expert report = basis for offer", y: "eu" },
  { t: "🇺🇸 May have direct settlement authority", y: "us" },
];
C["insurer_uw-settlement"] = [
  { t: "Reviews large loss impact on policy", y: "action" },
  { t: "Minimal involvement in routine claims", y: "info" },
];
C["insurer_fin-settlement"] = [
  { t: "Validates payment vs authority matrix", y: "action" },
  { t: "Processes payment (check/ACH/wire/SEPA)", y: "action" },
  { t: "Multi-payee checks (lienholder)", y: "friction" },
  { t: "🇪🇺 Convention clearing reconciliation", y: "eu" },
  { t: "🇺🇸 Issues 1099 for BI > $600", y: "us" },
  { t: "Reserve-to-payment variance", y: "action" },
  { t: "Reinsurance recovery (large losses)", y: "action" },
];
C["siu-settlement"] = [
  { t: "Final fraud check before payment", y: "action" },
  { t: "Flags suspicious settlement patterns", y: "action" },
  { t: "May block payment pending review", y: "friction" },
];
C["insurer_b-settlement"] = [
  { t: "Receives subrogation demand", y: "action" },
  { t: "Evaluates liability", y: "action" },
  { t: "🇪🇺 Passive: forfait via clearing house", y: "eu" },
  { t: "🇺🇸 Negotiates / Arbitration Forums", y: "us" },
];
C["convention-settlement"] = [
  { t: "Calculates forfait reimbursement", y: "action" },
  { t: "Monthly net settlement batch", y: "action" },
  { t: "Clearing house processing", y: "action" },
  { t: "Convention arbitration (if disputed)", y: "friction" },
];
C["documents-settlement"] = [
  { t: "Settlement offer letter", y: "doc" },
  { t: "Release of all claims", y: "doc" },
  { t: "Payment voucher / authorization", y: "doc" },
  { t: "Total loss valuation report", y: "doc" },
  { t: "Salvage title application", y: "doc" },
  { t: "Subrogation demand letter", y: "doc" },
  { t: "Supplement estimate", y: "doc" },
  { t: "🇪🇺 Convention reimbursement claim", y: "eu" },
  { t: "🇺🇸 1099 tax form (BI)", y: "us" },
];

// Phase 11: Close — File Closure & Recovery
C["policyholder-close"] = [
  { t: "Receives closure confirmation", y: "action" },
  { t: "NPS / satisfaction survey", y: "action" },
  { t: "Deductible reimbursement (if subro)", y: "action" },
  { t: "May reopen (new damage/injury)", y: "friction" },
];
C["insurer_handler-close"] = [
  { t: "Verifies all payments complete", y: "action" },
  { t: "Zeros out reserves", y: "action" },
  { t: "Closes vendor accounts (rental etc)", y: "action" },
  { t: "Files closure documentation", y: "action" },
  { t: "Initiates subrogation pursuit", y: "action" },
  { t: "Handles reopens (1-5+ hours each)", y: "friction" },
  { t: "Quality review / audit", y: "action" },
  { t: "🇪🇺 Convention auto-settlement", y: "eu" },
];
C["adjuster-close"] = [
  { t: "Salvage / title follow-up (TL)", y: "action" },
  { t: "Quality review if selected", y: "action" },
  { t: "May re-engage if reopened", y: "friction" },
];
C["insurer_uw-close"] = [
  { t: "Receives closed-claim data for pricing", y: "action" },
  { t: "Loss ratio impact analysis", y: "action" },
];
C["insurer_fin-close"] = [
  { t: "Financial reconciliation", y: "action" },
  { t: "Reserve zeroing", y: "action" },
  { t: "Reinsurance bordereaux", y: "action" },
  { t: "🇺🇸 Escheatment (uncashed checks)", y: "us" },
];
C["siu-close"] = [
  { t: "Post-close fraud analysis", y: "action" },
  { t: "Clear SIU referral flag", y: "action" },
];
C["insurer_b-close"] = [
  { t: "Subrogation settlement finalized", y: "action" },
  { t: "🇪🇺 Convention auto-settlement", y: "eu" },
  { t: "🇺🇸 Arbitration resolution", y: "us" },
];
C["convention-close"] = [
  { t: "Final convention settlement", y: "action" },
  { t: "Monthly batch reconciliation", y: "action" },
  { t: "Statistics & reporting", y: "action" },
];
C["documents-close"] = [
  { t: "Closure letter to policyholder", y: "doc" },
  { t: "Subrogation demand / recovery docs", y: "doc" },
  { t: "Quality audit checklist", y: "doc" },
  { t: "Reinsurance notification", y: "doc" },
  { t: "🇪🇺 Solvency II reporting data", y: "eu" },
  { t: "🇺🇸 State DOI regulatory reports", y: "us" },
];

const FORKS = {
  fork1: {
    title: "Fork 1: Is Anyone Injured?",
    phase: "Phase 1 — Scene Management",
    desc: "First and most consequential fork. Determines the entire claim trajectory.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 200, h: 36, text: "Accident occurs", tp: "start" },
      { id: "q", x: 300, y: 80, w: 200, h: 44, text: "Is anyone injured?", tp: "decision" },
      { id: "y1", x: 60, y: 160, w: 200, h: 36, text: "Call 112 (EU) / 911 (US)", tp: "action" },
      { id: "y2", x: 60, y: 220, w: 200, h: 36, text: "Police & ambulance arrive", tp: "action" },
      { id: "y3", x: 60, y: 280, w: 200, h: 36, text: "Injured → hospital", tp: "action" },
      { id: "y4", x: 60, y: 340, w: 200, h: 36, text: "Police take over docs", tp: "action" },
      { id: "yr", x: 40, y: 410, w: 240, h: 50, text: "BODILY INJURY CLAIM\nHigh value · Lawyers · Long", tp: "result-a" },
      { id: "n1", x: 540, y: 160, w: 200, h: 36, text: "Both exit vehicles", tp: "action" },
      { id: "n2", x: 540, y: 220, w: 200, h: 36, text: "Assess visible damage", tp: "action" },
      { id: "n3", x: 540, y: 280, w: 200, h: 36, text: "Approach other driver", tp: "action" },
      { id: "nr", x: 530, y: 350, w: 220, h: 44, text: "MATERIAL DAMAGE\n→ Fork 2", tp: "result-b" },
    ],
    edges: [
      ["s","q"],["q","y1","YES"],["q","n1","NO"],
      ["y1","y2"],["y2","y3"],["y3","y4"],["y4","yr"],
      ["n1","n2"],["n2","n3"],["n3","nr"],
    ],
  },
  fork2: {
    title: "Fork 2: Is the Other Party Cooperative?",
    phase: "Phase 1 — Scene Mgmt (Material Damage)",
    desc: "Determines documentation path and data quality downstream.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 200, h: 36, text: "Approach other driver", tp: "start" },
      { id: "q", x: 300, y: 80, w: 200, h: 44, text: "Cooperative?", tp: "decision" },
      { id: "c1", x: 40, y: 165, w: 190, h: 34, text: "Exchange insurance details", tp: "action" },
      { id: "c2", x: 40, y: 220, w: 190, h: 34, text: "🇪🇺 Fill EAS together", tp: "action" },
      { id: "c3", x: 40, y: 275, w: 190, h: 34, text: "Both sign EAS", tp: "action" },
      { id: "cr", x: 20, y: 340, w: 230, h: 46, text: "CLEAN PATH\nBest data · Fastest", tp: "result-a" },
      { id: "d1", x: 305, y: 165, w: 190, h: 34, text: "Dispute / aggression", tp: "action" },
      { id: "d2", x: 305, y: 220, w: 190, h: 34, text: "Call police", tp: "action" },
      { id: "d3", x: 305, y: 275, w: 190, h: 34, text: "Police document it", tp: "action" },
      { id: "dr", x: 290, y: 340, w: 220, h: 46, text: "DISPUTED\nNo EAS · Police only", tp: "result-b" },
      { id: "f1", x: 570, y: 165, w: 190, h: 34, text: "Other driver flees", tp: "action" },
      { id: "f2", x: 570, y: 220, w: 190, h: 34, text: "Call police", tp: "action" },
      { id: "f3", x: 570, y: 275, w: 190, h: 34, text: "Hit & run report", tp: "action" },
      { id: "fr", x: 555, y: 340, w: 220, h: 46, text: "HIT & RUN\nGuarantee fund", tp: "result-c" },
    ],
    edges: [
      ["s","q"],["q","c1","YES"],["q","d1","NO"],["q","f1","FLED"],
      ["c1","c2"],["c2","c3"],["c3","cr"],
      ["d1","d2"],["d2","d3"],["d3","dr"],
      ["f1","f2"],["f2","f3"],["f3","fr"],
    ],
  },
  fork3: {
    title: "Fork 3: EU vs US Documentation",
    phase: "Phase 2 — Documentation",
    desc: "Different processes create fundamentally different data quality downstream.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 200, h: 36, text: "Document the incident", tp: "start" },
      { id: "q", x: 300, y: 80, w: 200, h: 44, text: "Which market?", tp: "decision" },
      { id: "e1", x: 60, y: 165, w: 210, h: 34, text: "🇪🇺 Both fill EAS together", tp: "action" },
      { id: "e2", x: 60, y: 220, w: 210, h: 34, text: "~50% paper / ~50% digital", tp: "action" },
      { id: "e3", x: 60, y: 275, w: 210, h: 34, text: "Both sign · Carbon copy", tp: "action" },
      { id: "e4", x: 60, y: 330, w: 210, h: 34, text: "Each → own insurer", tp: "action" },
      { id: "er", x: 40, y: 395, w: 250, h: 50, text: "SINGLE SOURCE OF TRUTH\nAgreed · Convention-ready", tp: "result-a" },
      { id: "u1", x: 530, y: 165, w: 210, h: 34, text: "🇺🇸 Police crash report", tp: "action" },
      { id: "u2", x: 530, y: 220, w: 210, h: 34, text: "Exchange insurance cards", tp: "action" },
      { id: "u3", x: 530, y: 275, w: 210, h: 34, text: "Each takes own photos", tp: "action" },
      { id: "u4", x: 530, y: 330, w: 210, h: 34, text: "Each files separately", tp: "action" },
      { id: "uq", x: 530, y: 395, w: 210, h: 44, text: "1st or 3rd party claim?", tp: "decision" },
      { id: "u1p", x: 440, y: 470, w: 155, h: 44, text: "First-party\nOwn insurer", tp: "result-b" },
      { id: "u3p", x: 640, y: 470, w: 155, h: 44, text: "Third-party\nOther's insurer", tp: "result-c" },
    ],
    edges: [
      ["s","q"],["q","e1","EU"],["q","u1","US"],
      ["e1","e2"],["e2","e3"],["e3","e4"],["e4","er"],
      ["u1","u2"],["u2","u3"],["u3","u4"],["u4","uq"],
      ["uq","u1p","1st"],["uq","u3p","3rd"],
    ],
  },
  fork4: {
    title: "Fork 4: Who Does the Policyholder Contact?",
    phase: "Phase 4 — First Contact",
    desc: "Distribution channel determines first contact. Broker-heavy in UK/NL/BE, Agent-heavy in IT/DE/PT, Direct growing everywhere.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 200, h: 36, text: "Ready to file claim", tp: "start" },
      { id: "q", x: 300, y: 80, w: 220, h: 44, text: "Who to contact first?", tp: "decision" },
      { id: "b1", x: 40, y: 160, w: 180, h: 34, text: "Broker (UK/NL/BE)", tp: "action" },
      { id: "b2", x: 40, y: 215, w: 180, h: 34, text: "Calms, asks Qs", tp: "action" },
      { id: "b3", x: 40, y: 270, w: 180, h: 34, text: "Guides documentation", tp: "action" },
      { id: "b4", x: 40, y: 325, w: 180, h: 34, text: "Submits FNOL to insurer", tp: "action" },
      { id: "br", x: 20, y: 390, w: 220, h: 50, text: "BROKER PATH\n+1 hop · Advocacy · ~25-30%", tp: "result-a" },
      { id: "a1", x: 300, y: 160, w: 200, h: 34, text: "Agent (IT/DE/PT/ES/US)", tp: "action" },
      { id: "aq", x: 300, y: 220, w: 200, h: 44, text: "Captive or Independent?", tp: "decision" },
      { id: "ac", x: 240, y: 300, w: 140, h: 40, text: "Captive: direct\nsystem access", tp: "result-a" },
      { id: "ai", x: 420, y: 300, w: 140, h: 40, text: "Independent:\ndirects to insurer", tp: "result-b" },
      { id: "ar", x: 280, y: 380, w: 240, h: 50, text: "AGENT PATH\nCaptive ≈ insurer · ~55-58%", tp: "result-b" },
      { id: "d1", x: 580, y: 160, w: 180, h: 34, text: "Direct (app/phone/web)", tp: "action" },
      { id: "d2", x: 580, y: 215, w: 180, h: 34, text: "Policy lookup", tp: "action" },
      { id: "d3", x: 580, y: 270, w: 180, h: 34, text: "Guided FNOL form", tp: "action" },
      { id: "d4", x: 580, y: 325, w: 180, h: 34, text: "Instant claim #", tp: "action" },
      { id: "dr", x: 560, y: 390, w: 220, h: 50, text: "DIRECT PATH\nFastest · ~19% EU · Growing", tp: "result-c" },
    ],
    edges: [
      ["s","q"],["q","b1","Broker"],["q","a1","Agent"],["q","d1","Direct"],
      ["b1","b2"],["b2","b3"],["b3","b4"],["b4","br"],
      ["a1","aq"],["aq","ac","Captive"],["aq","ai","Indep."],["ac","ar"],["ai","ar"],
      ["d1","d2"],["d2","d3"],["d3","d4"],["d4","dr"],
    ],
  },
  fork5: {
    title: "Fork 5: How Does Broker Submit to Insurer?",
    phase: "Phase 4 — First Contact (Broker Path)",
    desc: "The broker submission bottleneck. Three paths, all with friction. This is where data quality degrades and delays accumulate.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 220, h: 36, text: "Broker ready to submit claim", tp: "start" },
      { id: "q", x: 300, y: 80, w: 220, h: 44, text: "Has portal access?", tp: "decision" },
      // Portal path
      { id: "p1", x: 40, y: 160, w: 180, h: 34, text: "Log into Insurer X portal", tp: "action" },
      { id: "p2", x: 40, y: 210, w: 180, h: 34, text: "⚠️ Manually key ALL data", tp: "friction" },
      { id: "p3", x: 40, y: 260, w: 180, h: 34, text: "Upload docs (size limits)", tp: "action" },
      { id: "p4", x: 40, y: 310, w: 180, h: 34, text: "Get claim reference", tp: "action" },
      { id: "pf", x: 40, y: 360, w: 180, h: 34, text: "⚠️ Repeat per insurer", tp: "friction" },
      { id: "pr", x: 20, y: 420, w: 220, h: 50, text: "PORTAL PATH\nData in system · Still manual", tp: "result-a" },
      // Email path
      { id: "e1", x: 300, y: 160, w: 200, h: 34, text: "Write email summary", tp: "action" },
      { id: "e2", x: 300, y: 210, w: 200, h: 34, text: "Attach EAS, photos as PDF", tp: "action" },
      { id: "e3", x: 300, y: 260, w: 200, h: 34, text: "Send to claims@insurer", tp: "action" },
      { id: "e4", x: 300, y: 310, w: 200, h: 34, text: "⚠️ Wait for acknowledgment", tp: "friction" },
      { id: "e5", x: 300, y: 360, w: 200, h: 34, text: "⚠️ Insurer re-keys data", tp: "friction" },
      { id: "er", x: 280, y: 420, w: 240, h: 50, text: "EMAIL PATH\nDouble entry · No tracking", tp: "result-b" },
      // Phone path
      { id: "t1", x: 560, y: 160, w: 180, h: 34, text: "Call insurer claims line", tp: "action" },
      { id: "t2", x: 560, y: 210, w: 180, h: 34, text: "Give info verbally", tp: "action" },
      { id: "t3", x: 560, y: 260, w: 180, h: 34, text: "Insurer keys in real-time", tp: "action" },
      { id: "t4", x: 560, y: 310, w: 180, h: 34, text: "⚠️ Docs sent separately", tp: "friction" },
      { id: "t5", x: 560, y: 360, w: 180, h: 34, text: "Claim open, docs pending", tp: "action" },
      { id: "tr", x: 540, y: 420, w: 220, h: 50, text: "PHONE PATH\nFastest open · Docs delayed", tp: "result-c" },
    ],
    edges: [
      ["s","q"],["q","p1","Yes"],["q","e1","No"],["q","t1","Phone"],
      ["p1","p2"],["p2","p3"],["p3","p4"],["p4","pf"],["pf","pr"],
      ["e1","e2"],["e2","e3"],["e3","e4"],["e4","e5"],["e5","er"],
      ["t1","t2"],["t2","t3"],["t3","t4"],["t4","t5"],["t5","tr"],
    ],
  },
  fork6: {
    title: "Fork 6: Triage — Skip Adjuster or Assign?",
    phase: "Phase 6 — Triage",
    desc: "EU goal: skip human investigation. US: every claim gets adjuster time. Convention systems COULD enable 60-70% STP but only ~10% actually achieve it due to data quality issues.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 200, h: 36, text: "FNOL received", tp: "start" },
      { id: "q", x: 300, y: 85, w: 220, h: 44, text: "Claim complexity?", tp: "decision" },
      // EU Clean path
      { id: "e1", x: 40, y: 165, w: 180, h: 34, text: "🇪🇺 Clean EAS", tp: "action" },
      { id: "e2", x: 40, y: 215, w: 180, h: 34, text: "Match to convention", tp: "action" },
      { id: "e3", x: 40, y: 265, w: 180, h: 34, text: "Auto fault determination", tp: "action" },
      { id: "er", x: 20, y: 330, w: 220, h: 50, text: "STRAIGHT-THROUGH\nNo adjuster · ~10% actual", tp: "result-a" },
      // EU Unclear path
      { id: "u1", x: 280, y: 165, w: 180, h: 34, text: "🇪🇺 Unclear EAS", tp: "action" },
      { id: "u2", x: 280, y: 215, w: 180, h: 34, text: "Handler reviews", tp: "action" },
      { id: "u3", x: 280, y: 265, w: 180, h: 34, text: "Contact for clarification", tp: "action" },
      { id: "ur", x: 260, y: 330, w: 220, h: 50, text: "CLARIFICATION\nMinimal adjuster · ~15-20%", tp: "result-b" },
      // Complex/US path
      { id: "c1", x: 520, y: 165, w: 180, h: 34, text: "Complex / Disputed / BI", tp: "action" },
      { id: "c2", x: 520, y: 215, w: 180, h: 34, text: "🇺🇸 ALL US claims", tp: "action" },
      { id: "c3", x: 520, y: 265, w: 180, h: 34, text: "Assign to adjuster", tp: "action" },
      { id: "cr", x: 500, y: 330, w: 220, h: 50, text: "INVESTIGATION\nFull adjuster · 🇺🇸100% 🇪🇺~15%", tp: "result-c" },
      // Fraud path
      { id: "f1", x: 300, y: 410, w: 200, h: 34, text: "Fraud indicators?", tp: "decision" },
      { id: "fr", x: 300, y: 470, w: 200, h: 44, text: "→ SIU Investigation", tp: "result-b" },
    ],
    edges: [
      ["s","q"],["q","e1","Clean"],["q","u1","Unclear"],["q","c1","Complex"],
      ["e1","e2"],["e2","e3"],["e3","er"],
      ["u1","u2"],["u2","u3"],["u3","ur"],
      ["c1","c2"],["c2","c3"],["c3","cr"],
      ["er","f1"],["ur","f1"],["cr","f1"],["f1","fr","Yes"],
    ],
  },
  fork7: {
    title: "Fork 7: Motor vs Home — Structural Differences",
    phase: "Cross-LOB Comparison",
    desc: "Home claims are structurally different from motor: no counterparty, no EAS, no convention. Almost 100% require adjuster inspection.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 200, h: 36, text: "Incident occurs", tp: "start" },
      { id: "q", x: 300, y: 85, w: 220, h: 44, text: "Line of business?", tp: "decision" },
      // Motor path
      { id: "m1", x: 40, y: 165, w: 180, h: 34, text: "🚗 MOTOR", tp: "action" },
      { id: "m2", x: 40, y: 215, w: 180, h: 34, text: "Counterparty exists", tp: "action" },
      { id: "m3", x: 40, y: 265, w: 180, h: 34, text: "🇪🇺 EAS = agreed doc", tp: "action" },
      { id: "m4", x: 40, y: 315, w: 180, h: 34, text: "🇪🇺 Convention lookup", tp: "action" },
      { id: "mr", x: 20, y: 380, w: 220, h: 50, text: "STP POSSIBLE\n~10% actual · 60-70% theoretical", tp: "result-a" },
      // Home path
      { id: "h1", x: 520, y: 165, w: 180, h: 34, text: "🏠 HOME", tp: "action" },
      { id: "h2", x: 520, y: 215, w: 180, h: 34, text: "Usually NO counterparty", tp: "action" },
      { id: "h3", x: 520, y: 265, w: 180, h: 34, text: "NO agreed document", tp: "friction" },
      { id: "h4", x: 520, y: 315, w: 180, h: 34, text: "NO convention system", tp: "friction" },
      { id: "hr", x: 500, y: 380, w: 220, h: 50, text: "ADJUSTER REQUIRED\n~100% need inspection", tp: "result-b" },
      // Key differences
      { id: "d1", x: 280, y: 460, w: 240, h: 34, text: "Motor: WHO caused it?", tp: "action" },
      { id: "d2", x: 280, y: 510, w: 240, h: 34, text: "Home: WAS it covered?", tp: "action" },
    ],
    edges: [
      ["s","q"],["q","m1","Motor"],["q","h1","Home"],
      ["m1","m2"],["m2","m3"],["m3","m4"],["m4","mr"],
      ["h1","h2"],["h2","h3"],["h3","h4"],["h4","hr"],
      ["mr","d1"],["hr","d1"],["d1","d2"],
    ],
  },
  fork8: {
    title: "Fork 8: Home — Desk vs Field Adjuster",
    phase: "Home Claims — Triage",
    desc: "Small/simple claims go to desk adjuster (virtual). Large/complex claims require field inspection. The shift is accelerating.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 200, h: 36, text: "Home FNOL received", tp: "start" },
      { id: "q", x: 300, y: 85, w: 220, h: 44, text: "Claim size/complexity?", tp: "decision" },
      // Desk path
      { id: "d1", x: 40, y: 165, w: 190, h: 34, text: "Small (<$3K) / Simple", tp: "action" },
      { id: "d2", x: 40, y: 215, w: 190, h: 34, text: "Obvious causation", tp: "action" },
      { id: "d3", x: 40, y: 265, w: 190, h: 34, text: "Desk adjuster assigned", tp: "action" },
      { id: "d4", x: 40, y: 315, w: 190, h: 34, text: "Virtual inspection (video)", tp: "action" },
      { id: "dr", x: 20, y: 380, w: 230, h: 50, text: "DESK PATH\nNo travel · ~40% trending up", tp: "result-a" },
      // Field path
      { id: "f1", x: 520, y: 165, w: 190, h: 34, text: "Large (>$3K) / Complex", tp: "action" },
      { id: "f2", x: 520, y: 215, w: 190, h: 34, text: "Hidden damage possible", tp: "action" },
      { id: "f3", x: 520, y: 265, w: 190, h: 34, text: "Field adjuster assigned", tp: "action" },
      { id: "f4", x: 520, y: 315, w: 190, h: 34, text: "On-site inspection (1-2 hrs)", tp: "action" },
      { id: "fr", x: 500, y: 380, w: 230, h: 50, text: "FIELD PATH\n~25-30% travel time · ~60%", tp: "result-b" },
      // Employer
      { id: "e1", x: 280, y: 460, w: 240, h: 44, text: "Who employs adjuster?", tp: "decision" },
      { id: "es", x: 120, y: 530, w: 140, h: 40, text: "Staff\n~40-50%", tp: "result-a" },
      { id: "et", x: 300, y: 530, w: 140, h: 40, text: "TPA\n~25-35%", tp: "result-b" },
      { id: "ei", x: 480, y: 530, w: 140, h: 40, text: "Independent\n~15-25%", tp: "result-c" },
    ],
    edges: [
      ["s","q"],["q","d1","Small"],["q","f1","Large"],
      ["d1","d2"],["d2","d3"],["d3","d4"],["d4","dr"],
      ["f1","f2"],["f2","f3"],["f3","f4"],["f4","fr"],
      ["dr","e1"],["fr","e1"],["e1","es","Staff"],["e1","et","TPA"],["e1","ei","IA"],
    ],
  },
  fork10: {
    title: "Fork 10: Investigation Type — Multi-Adjuster Scenarios",
    phase: "Phase 7 — Investigation",
    desc: "Claims requiring multiple adjusters take ~3x longer (Five Sigma data). Understanding when this happens reveals collaboration friction.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 220, h: 36, text: "Claim enters investigation", tp: "start" },
      { id: "q", x: 300, y: 85, w: 220, h: 44, text: "Claim characteristics?", tp: "decision" },
      // Single adjuster path
      { id: "s1", x: 40, y: 170, w: 180, h: 34, text: "Simple / Clear liability", tp: "action" },
      { id: "s2", x: 40, y: 220, w: 180, h: 34, text: "Single adjuster handles", tp: "action" },
      { id: "sr", x: 20, y: 285, w: 220, h: 50, text: "SINGLE ADJUSTER\nFastest path · Baseline time", tp: "result-a" },
      // PD + BI path
      { id: "b1", x: 280, y: 170, w: 180, h: 34, text: "Property + Bodily Injury", tp: "action" },
      { id: "b2", x: 280, y: 220, w: 180, h: 34, text: "PD adjuster + BI adjuster", tp: "friction" },
      { id: "br", x: 260, y: 285, w: 220, h: 50, text: "DUAL SPECIALIST\n~51-57% of BI claims · ~3x time", tp: "result-b" },
      // Complex path
      { id: "c1", x: 520, y: 170, w: 180, h: 34, text: "Complex / High value", tp: "action" },
      { id: "c2", x: 520, y: 220, w: 180, h: 34, text: "Escalate to senior", tp: "action" },
      { id: "c3", x: 520, y: 270, w: 180, h: 34, text: "+ Expert (engineer, etc.)", tp: "action" },
      { id: "cr", x: 500, y: 340, w: 220, h: 50, text: "MULTI-PARTY\nLongest path · Most handoffs", tp: "result-c" },
      // Fraud path
      { id: "f1", x: 280, y: 380, w: 180, h: 34, text: "Fraud indicators?", tp: "decision" },
      { id: "f2", x: 280, y: 430, w: 180, h: 34, text: "Transfer to SIU", tp: "action" },
      { id: "fr", x: 260, y: 495, w: 220, h: 50, text: "SIU TRANSFER\nDifferent system · Major handoff", tp: "result-b" },
      // Attorney path
      { id: "a1", x: 520, y: 430, w: 180, h: 34, text: "Attorney involved?", tp: "decision" },
      { id: "ar", x: 500, y: 495, w: 220, h: 50, text: "LITIGATION PATH\nSpecialist adjuster · Legal coord", tp: "result-c" },
    ],
    edges: [
      ["s","q"],["q","s1","Simple"],["q","b1","PD+BI"],["q","c1","Complex"],
      ["s1","s2"],["s2","sr"],
      ["b1","b2"],["b2","br"],
      ["c1","c2"],["c2","c3"],["c3","cr"],
      ["sr","f1"],["br","f1"],["cr","f1"],
      ["f1","f2","Yes"],["f2","fr"],
      ["f1","a1","No"],["a1","ar","Yes"],
    ],
  },
  fork11: {
    title: "Fork 11: The 7 Claims Decisions — Codifiable vs Judgment",
    phase: "Phase 9 — Decision",
    desc: "The decision phase contains 7 distinct decisions. Some are rule-based (codifiable), others require expert judgment. This is where the true value lies — and where AI can have the biggest impact.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 220, h: 36, text: "Investigation complete", tp: "start" },
      { id: "q", x: 300, y: 80, w: 220, h: 44, text: "Which decision?", tp: "decision" },
      // Coverage (codifiable)
      { id: "d1", x: 20, y: 160, w: 160, h: 34, text: "D1: Coverage", tp: "action" },
      { id: "d1r", x: 10, y: 210, w: 180, h: 44, text: "CODIFIABLE\nPolicy terms lookup", tp: "result-a" },
      // Liability (mixed)
      { id: "d2", x: 200, y: 160, w: 160, h: 34, text: "D2: Liability", tp: "action" },
      { id: "d2r", x: 190, y: 210, w: 180, h: 44, text: "EU: CODIFIABLE (bareme)\nUS: JUDGMENT", tp: "result-b" },
      // Reserves (mixed)
      { id: "d3", x: 380, y: 160, w: 160, h: 34, text: "D3: Reserves", tp: "action" },
      { id: "d3r", x: 370, y: 210, w: 180, h: 44, text: "MIXED\nFormula + experience", tp: "result-b" },
      // Total Loss (codifiable)
      { id: "d4", x: 560, y: 160, w: 160, h: 34, text: "D4: Total Loss", tp: "action" },
      { id: "d4r", x: 550, y: 210, w: 180, h: 44, text: "CODIFIABLE\nRepair > X% of value", tp: "result-a" },
      // Fraud (mixed)
      { id: "d5", x: 100, y: 300, w: 160, h: 34, text: "D5: Fraud Referral", tp: "action" },
      { id: "d5r", x: 90, y: 350, w: 180, h: 44, text: "MIXED\nRules + pattern matching", tp: "result-b" },
      // Subrogation (codifiable)
      { id: "d6", x: 300, y: 300, w: 160, h: 34, text: "D6: Subrogation", tp: "action" },
      { id: "d6r", x: 290, y: 350, w: 180, h: 44, text: "CODIFIABLE\nFault % + recovery rules", tp: "result-a" },
      // BI Valuation (judgment)
      { id: "d7", x: 500, y: 300, w: 160, h: 34, text: "D7: BI Valuation", tp: "action" },
      { id: "d7r", x: 490, y: 350, w: 180, h: 44, text: "JUDGMENT-HEAVY\nColossus/tribal knowledge", tp: "result-c" },
      // Summary
      { id: "sum", x: 220, y: 430, w: 360, h: 50, text: "3 codifiable · 3 mixed · 1 judgment-heavy\nAutomation ceiling: ~60-70% of decisions", tp: "result-a" },
    ],
    edges: [
      ["s","q"],
      ["q","d1","Coverage"],["q","d2","Liability"],["q","d3","Reserves"],["q","d4","Total Loss"],
      ["d1","d1r"],["d2","d2r"],["d3","d3r"],["d4","d4r"],
      ["d1r","d5"],["d2r","d5"],["d3r","d6"],["d4r","d6"],
      ["d5","d5r"],["d6","d6r"],["d6r","d7"],["d5r","d7"],
      ["d7","d7r"],["d7r","sum"],
    ],
  },
  fork12: {
    title: "Fork 12: Settlement Path — Cash vs DRP vs Total Loss vs BI",
    phase: "Phase 10 — Settlement",
    desc: "The settlement path determines how money moves. Cash settlements give policyholder control; DRP keeps insurer in control of cost and quality; total loss triggers title/salvage/lienholder complexity; BI settlements are adversarial, attorney-driven, and can take years.",
    nodes: [
      { id: "s", x: 300, y: 20, w: 220, h: 36, text: "Decision approved", tp: "start" },
      { id: "q", x: 300, y: 80, w: 220, h: 44, text: "Settlement type?", tp: "decision" },
      // Cash
      { id: "cash", x: 20, y: 170, w: 180, h: 34, text: "Cash Settlement", tp: "action" },
      { id: "cashr", x: 10, y: 220, w: 200, h: 50, text: "Lump sum to policyholder\nPH chooses repair/pocket\n5-30 days", tp: "result-a" },
      // DRP
      { id: "drp", x: 220, y: 170, w: 180, h: 34, text: "DRP / Managed Repair", tp: "action" },
      { id: "drpr", x: 210, y: 220, w: 200, h: 50, text: "Insurer → shop direct\n50-90% need supplements\n5-15 days repair", tp: "result-a" },
      // Total Loss
      { id: "tl", x: 420, y: 170, w: 180, h: 34, text: "Total Loss Payout", tp: "action" },
      { id: "tlr", x: 410, y: 220, w: 200, h: 50, text: "ACV − deductible − salvage\nTitle transfer + lienholder\n2-4 weeks", tp: "result-b" },
      // BI
      { id: "bi", x: 620, y: 170, w: 180, h: 34, text: "BI Settlement", tp: "action" },
      { id: "bir", x: 610, y: 220, w: 200, h: 50, text: "Wait for MMI → demand letter\n3-8 negotiation rounds\n12-18+ months", tp: "result-c" },
      // EU Convention
      { id: "euconv", x: 250, y: 320, w: 300, h: 44, text: "🇪🇺 Convention: forfait via clearing house\nMonthly batch, near-automatic", tp: "result-a" },
      // STP stat
      { id: "stp", x: 250, y: 400, w: 300, h: 44, text: "STP rate: <3% industry · 50% Lemonade\n$67B/year leakage opportunity", tp: "result-b" },
    ],
    edges: [
      ["s","q"],
      ["q","cash","Repairable (PH choice)"],["q","drp","Repairable (DRP)"],["q","tl","Total Loss"],["q","bi","Bodily Injury"],
      ["cash","cashr"],["drp","drpr"],["tl","tlr"],["bi","bir"],
      ["cashr","euconv"],["drpr","euconv"],["tlr","stp"],["bir","stp"],
    ],
  },
};

// Competitor Landscape - Which phases each competitor covers
const COMPETITORS = [
  {
    id: "tractable",
    name: "Tractable",
    funding: "$185M",
    color: "#059669",
    type: "Point Solution",
    what: "Photo-based damage assessment",
    sectors: { motor: true, property: true },
    phases: ["assessment"],
    activities: {
      assessment: ["AI analyzes damage photos", "Generates repair estimates", "Certainty scoring", "Total loss detection"],
    },
    gaps: ["No documents", "No FNOL", "No settlement workflow"],
    stpClaim: "~70% auto-processed",
  },
  {
    id: "sprout",
    name: "Sprout.ai",
    funding: "£5.4M",
    color: "#7C3AED",
    type: "Point Solution",
    what: "Document extraction & claims automation",
    sectors: { motor: true, property: true, health: true, life: true },
    phases: ["fnol", "triage", "decision"],
    activities: {
      fnol: ["Extract data from documents", "AI-OCR any language", "Structure unstructured inputs", "Policy validation"],
      triage: ["Fraud pattern detection", "Complexity scoring", "Auto-route simple claims"],
      decision: ["Coverage checking", "Auto-approve simple claims"],
    },
    gaps: ["No photo damage assessment", "Earlier stage funding"],
    stpClaim: "67%+ instant settlement",
  },
  {
    id: "shift",
    name: "Shift Technology",
    funding: "$320M",
    color: "#DC2626",
    type: "Point Solution",
    what: "Fraud detection & claims decision support",
    sectors: { motor: true, property: true },
    phases: ["triage", "investigation", "decision"],
    activities: {
      triage: ["Fraud scoring on every claim", "Risk indicators flagged"],
      investigation: ["Cross-claim pattern analysis", "Document forensics", "Behavioral indicators"],
      decision: ["Subrogation opportunity detection", "Recovery recommendations"],
    },
    gaps: ["Detection only", "No claims processing", "No damage assessment"],
    stpClaim: "3x fraud detection rate",
  },
  {
    id: "fivesigma",
    name: "Five Sigma (Clive)",
    funding: "Seed",
    color: "#0284C7",
    type: "Full Workflow",
    what: "Multi-agent AI claims platform",
    sectors: { motor: true, property: true },
    phases: ["fnol", "triage", "investigation", "assessment", "decision", "settlement", "close"],
    activities: {
      fnol: ["AI agent: Intake processing", "Document handling"],
      triage: ["AI agent: Severity assessment", "Routing decisions"],
      investigation: ["AI agent: Coverage validation", "Liability determination"],
      assessment: ["AI agent: Damage review support"],
      decision: ["AI agent: Decision recommendations"],
      settlement: ["AI agent: Payment coordination"],
      close: ["AI agent: Compliance audit", "File closure"],
    },
    gaps: ["Earlier stage", "Less specialized", "Attempting full workflow"],
    stpClaim: "35% cost reduction",
  },
  {
    id: "snapsheet",
    name: "Snapsheet",
    funding: "$162M",
    color: "#EA580C",
    type: "Platform",
    what: "Virtual appraisal & claims management",
    sectors: { motor: true, property: true },
    phases: ["fnol", "triage", "assessment", "settlement"],
    activities: {
      fnol: ["Digital FNOL intake", "Photo/video capture"],
      triage: ["Virtual appraisal routing", "Desk vs field decision"],
      assessment: ["AI-assisted damage estimates", "Total loss processing"],
      settlement: ["Repair network coordination", "Payment processing"],
    },
    gaps: ["Less AI-native", "US-focused", "Adding AI retroactively"],
    stpClaim: "4.3M claims processed",
  },
  {
    id: "davies",
    name: "Davies / Kuarterback",
    funding: "PE-backed",
    color: "#6366F1",
    type: "TPA + Tech",
    what: "UK motor claims automation + TPA services",
    sectors: { motor: true, property: false },
    phases: ["assessment", "decision"],
    activities: {
      assessment: ["Auto-read Stage 2 packs", "Extract to structured data", "Match to valuation matrices", "Generate claim value <1 min"],
      decision: ["75-80% auto-processed", "20-25% to handler (saves 25 min)"],
    },
    gaps: ["UK motor only", "MOJ-specific", "No property"],
    stpClaim: "75-80% auto-processed",
  },
  {
    id: "himarley",
    name: "Hi Marley",
    funding: "$65M",
    color: "#F59E0B",
    type: "Point Solution",
    what: "SMS-based claims communication",
    sectors: { motor: true, property: true },
    phases: ["fnol", "investigation", "settlement"],
    activities: {
      fnol: ["SMS intake channel", "Document requests via text"],
      investigation: ["Status updates to customer", "Photo submission via SMS"],
      settlement: ["Payment notifications", "Satisfaction follow-up"],
    },
    gaps: ["Communication only", "Thin wedge", "Commoditizable"],
  },
  {
    id: "pace",
    name: "Pace",
    funding: "$10M",
    color: "#10B981",
    type: "BPO Replacement",
    what: "Agentic AI for insurance back-office",
    sectors: { motor: true, property: true },
    phases: ["first_contact", "fnol", "triage", "investigation"],
    activities: {
      first_contact: ["Read broker emails", "Extract submission data"],
      fnol: ["Process FNOL documents", "Populate claims systems", "Data entry automation"],
      triage: ["Prepare claims files", "Quality assurance checks"],
      investigation: ["File preparation", "Document organization", "Compliance checks"],
    },
    gaps: ["Back-office only", "No claims decisions", "No damage assessment"],
  },
  {
    id: "claimsorted",
    name: "ClaimSorted",
    funding: "$16.3M",
    color: "#EC4899",
    type: "AI-Native TPA",
    what: "Full claims TPA with embedded AI",
    sectors: { motor: true, property: false },
    phases: ["fnol", "triage", "investigation", "assessment", "decision", "settlement", "close"],
    activities: {
      fnol: ["White-label eNOL portal", "24/7 intake"],
      triage: ["AI auto-triage", "Complexity scoring"],
      investigation: ["Handler investigation", "AI-assisted doc review"],
      assessment: ["Fraud detection algorithms", "Damage validation"],
      decision: ["Auto-decision (simple)", "Handler decision (complex)"],
      settlement: ["Payment in minutes", "Dispute handling"],
      close: ["Subrogation identification", "Data feedback to UW"],
    },
    gaps: ["Early stage", "Competes with Davies", "Trust required"],
  },
  {
    id: "solva",
    name: "Solva",
    funding: "$6M",
    color: "#8B5CF6",
    type: "AI Overlay",
    what: "Leakage & fraud detection overlay",
    sectors: { motor: true, property: true },
    phases: ["fnol", "triage", "investigation", "assessment", "decision"],
    activities: {
      fnol: ["Auto-triage FNOLs", "Flag missing info"],
      triage: ["Severity scoring", "Priority assignment"],
      investigation: ["Policy violation detection", "Coverage breach identification"],
      assessment: ["Leakage risk flagging", "Fraud pattern detection"],
      decision: ["Source-cited recommendations", "Audit trail for compliance"],
    },
    gaps: ["Overlay only", "No processing", "Very early stage"],
  },
  {
    id: "avallon",
    name: "Avallon",
    funding: "$4.6M",
    color: "#0D9488",
    type: "Back-Office AI",
    what: "Multi-modal AI agents (calls, docs, data)",
    sectors: { motor: true, property: true, workersComp: true },
    phases: ["fnol", "investigation", "assessment"],
    activities: {
      fnol: ["Answer intake calls", "Gather claim info", "Extract from documents"],
      investigation: ["Status calls handling", "Contact employers/providers", "Coordination calls"],
      assessment: ["Summarize medical reports", "Extract from PDFs/invoices", "Populate CMS"],
    },
    gaps: ["Back-office only", "No decisions", "Early stage"],
  },
  {
    id: "lemonade",
    name: "Lemonade (AI Jim)",
    funding: "Public",
    color: "#F43F5E",
    type: "Full Stack Insurer",
    what: "AI-native direct insurer (not a vendor)",
    sectors: { motor: false, property: true, pet: true },
    phases: ["fnol", "triage", "investigation", "assessment", "decision", "settlement"],
    activities: {
      fnol: ["Video FNOL submission", "NLP analysis of claim"],
      triage: ["Instant AI triage", "Fraud algorithm check"],
      investigation: ["AI reviews claim details", "Pattern matching"],
      assessment: ["Policy condition validation", "Coverage check"],
      decision: ["2-second auto-decisions", "40% zero-touch"],
      settlement: ["Instant payment processing"],
    },
    gaps: ["Not a vendor", "B2C only", "Can't buy AI Jim"],
  },
  {
    id: "omnius",
    name: "omni:us",
    funding: "$52.7M",
    color: "#1E40AF",
    type: "EAS Extraction",
    what: "EAS extraction + STP automation (EU motor)",
    sectors: { motor: true, property: false },
    phases: ["fnol", "triage", "decision", "close"],
    activities: {
      fnol: ["Extract data from paper EAS", "Handwriting recognition (in-house)", "~100 fields digitized"],
      triage: ["Convention matching", "Fault table lookup", "STP routing"],
      decision: ["Auto-process clean claims", "Route exceptions to handlers"],
      close: ["Subrogation detection", "Recovery opportunity identification"],
    },
    gaps: ["EU-focused only", "STP still ~10% despite solution", "Integration complexity", "Doesn't fix upstream capture"],
  },
];

const PHASE_ORDER = ["incident", "scene", "documentation", "reconciliation", "first_contact", "fnol", "triage", "investigation", "assessment", "decision", "settlement", "close"];

const NS = {
  start: { fill: "#1F2937", stroke: "#111827", text: "#FFF", r: 16 },
  decision: { fill: "#FEF3C7", stroke: "#F59E0B", text: "#92400E", r: 6, dash: true },
  action: { fill: "#F3F4F6", stroke: "#9CA3AF", text: "#374151", r: 6 },
  "result-a": { fill: "#D1FAE5", stroke: "#10B981", text: "#065F46", r: 8 },
  "result-b": { fill: "#FEE2E2", stroke: "#EF4444", text: "#991B1B", r: 8 },
  "result-c": { fill: "#E0E7FF", stroke: "#6366F1", text: "#3730A3", r: 8 },
  todo: { fill: "#F5F5F4", stroke: "#A8A29E", text: "#78716C", r: 6 },
  friction: { fill: "#FEF2F2", stroke: "#DC2626", text: "#991B1B", r: 6 },
};

function ForkView({ fork }) {
  const nm = {};
  fork.nodes.forEach(n => { nm[n.id] = n; });
  return (
    <div style={{ background: "#FFF", borderRadius: 8, border: "1px solid #E5E7EB", padding: 14 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>{fork.title}</h3>
      <p style={{ fontSize: 10, color: "#6B7280", margin: "0 0 2px" }}>{fork.phase}</p>
      <p style={{ fontSize: 11, color: "#374151", margin: "0 0 10px" }}>{fork.desc}</p>
      <div style={{ overflow: "auto", background: "#FAFAFA", borderRadius: 6, border: "1px solid #E5E7EB" }}>
        <svg width={820} height={540}>
          <defs><marker id="ah" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#9CA3AF"/></marker></defs>
          {fork.edges.map((e,i) => {
            const fn=nm[e[0]], tn=nm[e[1]], lb=e[2];
            if(!fn||!tn) return null;
            const fx=fn.x+fn.w/2, fy=fn.y+fn.h, tx=tn.x+tn.w/2, ty=tn.y, my=(fy+ty)/2;
            return <g key={i}><path d={`M${fx},${fy}C${fx},${my} ${tx},${my} ${tx},${ty}`} fill="none" stroke="#9CA3AF" strokeWidth={1.5} markerEnd="url(#ah)"/>{lb&&<text x={(fx+tx)/2+(fx===tx?14:0)} y={my-4} fontSize={9} fontWeight={600} fill="#6B7280" textAnchor="middle">{lb}</text>}</g>;
          })}
          {fork.nodes.map(n => {
            const s=NS[n.tp]||NS.action, lines=n.text.split("\n");
            return <g key={n.id}><rect x={n.x} y={n.y} width={n.w} height={n.h} rx={s.r||6} fill={s.fill} stroke={s.stroke} strokeWidth={s.dash?2:1.5} strokeDasharray={s.dash?"5,3":undefined}/>{lines.map((l,li)=><text key={li} x={n.x+n.w/2} y={n.y+n.h/2+(li-(lines.length-1)/2)*13} fontSize={10} fontWeight={n.tp==="decision"||n.tp==="start"?700:400} fill={s.text} textAnchor="middle" dominantBaseline="central">{l}</text>)}</g>;
          })}
        </svg>
      </div>
    </div>
  );
}

function CompetitorView() {
  const [selected, setSelected] = useState(null);
  const phaseLabels = {
    incident: "0: Incident", scene: "1: Scene", documentation: "2: Docs", reconciliation: "3: Recon",
    first_contact: "4: Contact", fnol: "5: FNOL", triage: "6: Triage", investigation: "7: Invest",
    assessment: "8: Assess", decision: "9: Decision", settlement: "10: Settle", close: "11: Close"
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <p style={{ fontSize: 10, color: "#6B7280", margin: "0 0 6px" }}>
          Click a competitor to see what they do at each phase. Colored cells = phases where competitor is active.
        </p>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
          {[["Point Solution", "#9CA3AF"], ["Platform", "#F59E0B"], ["Full Workflow", "#3B82F6"], ["TPA + Tech", "#8B5CF6"], ["AI-Native TPA", "#EC4899"], ["BPO Replacement", "#10B981"], ["AI Overlay", "#A855F7"], ["Back-Office AI", "#0D9488"], ["Full Stack Insurer", "#F43F5E"]].map(([t, c]) => (
            <span key={t} style={{ fontSize: 7, padding: "1px 4px", borderRadius: 3, background: c + "20", border: `1px solid ${c}`, color: c }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Phase Header */}
      <div style={{ overflow: "auto", border: "1px solid #D1D5DB", borderRadius: 6, background: "#FFF" }}>
        <div style={{ display: "grid", gridTemplateColumns: `180px repeat(${PHASE_ORDER.length}, 70px)`, minWidth: 180 + PHASE_ORDER.length * 70 }}>
          <div style={{ padding: 4, background: "#1F2937", color: "#FFF", fontSize: 8, fontWeight: 700, position: "sticky", left: 0, zIndex: 20, borderBottom: "2px solid #000" }}>
            COMPETITOR
          </div>
          {PHASE_ORDER.map(p => (
            <div key={p} style={{ padding: 2, background: PHASES.find(ph => ph.id === p)?.color || "#666", color: "#FFF", fontSize: 7, fontWeight: 600, textAlign: "center", borderBottom: "2px solid #000", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
              {phaseLabels[p]}
            </div>
          ))}

          {/* Competitor Rows */}
          {COMPETITORS.map(comp => (
            <div key={comp.id} style={{ display: "contents" }}>
              <div
                onClick={() => setSelected(selected === comp.id ? null : comp.id)}
                style={{
                  padding: 4, background: comp.color, color: "#FFF", fontSize: 8, fontWeight: 600,
                  position: "sticky", left: 0, zIndex: 10, borderBottom: "1px solid #E5E7EB",
                  cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center"
                }}
              >
                <div>{comp.name}</div>
                <div style={{ fontSize: 6.5, opacity: 0.85, fontWeight: 400 }}>{comp.funding} · {comp.type}</div>
                {comp.sectors && (
                  <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                    {comp.sectors.motor && <span style={{ fontSize: 6, padding: "1px 3px", background: "rgba(255,255,255,0.25)", borderRadius: 2 }}>🚗 Motor</span>}
                    {comp.sectors.property && <span style={{ fontSize: 6, padding: "1px 3px", background: "rgba(255,255,255,0.25)", borderRadius: 2 }}>🏠 Property</span>}
                    {comp.sectors.health && <span style={{ fontSize: 6, padding: "1px 3px", background: "rgba(255,255,255,0.25)", borderRadius: 2 }}>🏥 Health</span>}
                    {comp.sectors.workersComp && <span style={{ fontSize: 6, padding: "1px 3px", background: "rgba(255,255,255,0.25)", borderRadius: 2 }}>⚠️ WC</span>}
                    {comp.sectors.pet && <span style={{ fontSize: 6, padding: "1px 3px", background: "rgba(255,255,255,0.25)", borderRadius: 2 }}>🐾 Pet</span>}
                    {comp.sectors.life && <span style={{ fontSize: 6, padding: "1px 3px", background: "rgba(255,255,255,0.25)", borderRadius: 2 }}>💚 Life</span>}
                  </div>
                )}
              </div>
              {PHASE_ORDER.map(p => {
                const active = comp.phases.includes(p);
                return (
                  <div
                    key={p}
                    style={{
                      borderRight: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB",
                      background: active ? comp.color + "25" : "#FAFAFA",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      minHeight: 32
                    }}
                  >
                    {active && <div style={{ width: 14, height: 14, borderRadius: "50%", background: comp.color, opacity: 0.8 }} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Competitor Details */}
      {selected && (() => {
        const comp = COMPETITORS.find(c => c.id === selected);
        if (!comp) return null;
        return (
          <div style={{ marginTop: 10, padding: 10, background: "#FFF", borderRadius: 6, border: `2px solid ${comp.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: comp.color }}>{comp.name}</h3>
                <p style={{ fontSize: 10, color: "#6B7280", margin: "2px 0 0" }}>{comp.what}</p>
                {comp.sectors && (
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {comp.sectors.motor && <span style={{ fontSize: 9, padding: "2px 6px", background: "#DBEAFE", border: "1px solid #93C5FD", borderRadius: 3, color: "#1D4ED8" }}>🚗 Motor</span>}
                    {comp.sectors.property && <span style={{ fontSize: 9, padding: "2px 6px", background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 3, color: "#B45309" }}>🏠 Property</span>}
                    {comp.sectors.health && <span style={{ fontSize: 9, padding: "2px 6px", background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: 3, color: "#166534" }}>🏥 Health</span>}
                    {comp.sectors.workersComp && <span style={{ fontSize: 9, padding: "2px 6px", background: "#FEE2E2", border: "1px solid #FECACA", borderRadius: 3, color: "#991B1B" }}>⚠️ Workers Comp</span>}
                    {comp.sectors.pet && <span style={{ fontSize: 9, padding: "2px 6px", background: "#FCE7F3", border: "1px solid #F9A8D4", borderRadius: 3, color: "#9D174D" }}>🐾 Pet</span>}
                    {comp.sectors.life && <span style={{ fontSize: 9, padding: "2px 6px", background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 3, color: "#065F46" }}>💚 Life</span>}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{comp.funding}</div>
                <div style={{ fontSize: 9, color: "#6B7280" }}>{comp.type}</div>
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: "#374151", marginBottom: 4 }}>WHAT THEY DO AT EACH PHASE:</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
                {comp.phases.map(p => (
                  <div key={p} style={{ padding: 6, background: comp.color + "10", borderRadius: 4, border: `1px solid ${comp.color}40` }}>
                    <div style={{ fontSize: 8, fontWeight: 700, color: comp.color, marginBottom: 3 }}>
                      {phaseLabels[p]}
                    </div>
                    {comp.activities[p]?.map((act, i) => (
                      <div key={i} style={{ fontSize: 8, color: "#374151", marginBottom: 1 }}>• {act}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 9, fontWeight: 600, color: "#DC2626", marginBottom: 3 }}>GAPS / LIMITATIONS:</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {comp.gaps.map((gap, i) => (
                  <span key={i} style={{ fontSize: 8, padding: "2px 5px", background: "#FEE2E2", border: "1px solid #FECACA", borderRadius: 3, color: "#991B1B" }}>{gap}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* White Space Analysis */}
      <div style={{ marginTop: 10, padding: 8, background: "#F0FDF4", borderRadius: 6, border: "1px solid #86EFAC" }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#166534", marginBottom: 4 }}>WHITE SPACE OPPORTUNITIES:</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 4 }}>
          {[
            { phase: "documentation", note: "EAS extraction (EU) — No dedicated player" },
            { phase: "reconciliation", note: "Convention matching — Nobody focused" },
            { phase: "settlement", note: "62% of US time — Most underserved" },
            { phase: "close", note: "Subrogation automation — Limited focus" },
          ].map((ws, i) => (
            <div key={i} style={{ fontSize: 8, padding: 4, background: "#FFF", borderRadius: 3, border: "1px solid #BBF7D0" }}>
              <span style={{ fontWeight: 600, color: "#166534" }}>{phaseLabels[ws.phase]}:</span> {ws.note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Adjuster Journey Grid — Same layout as main blueprint
const ADJ_PHASES = PHASES.filter(p =>
  ["first_contact","fnol","triage","investigation","assessment","decision","settlement","close"].includes(p.id)
);

const ADJ = {};

// What the adjuster does at each phase (activities + pain points)
ADJ["adjuster-first_contact"] = [
  { t: "Receives assignment", y: "action" },
  { t: "Reads FNOL + docs", y: "action" },
  { t: "First policyholder call", y: "action" },
  { t: "Confirms coverage", y: "action" },
  { t: "⚠ 70% calls → voicemail", y: "friction" },
  { t: "⚠ Manual CMS data entry", y: "friction" },
  { t: "🇪🇺 5-15 min", y: "eu" },
  { t: "🇺🇸 15-30 min", y: "us" },
];
ADJ["adjuster-fnol"] = [
  { t: "🇪🇺 Reads paper EAS → CMS", y: "eu" },
  { t: "🇺🇸 Recorded statement (15-30 min)", y: "us" },
  { t: "Verifies coverage + deductible", y: "action" },
  { t: "Sets initial reserves", y: "action" },
  { t: "Sends doc request list", y: "action" },
  { t: "⚠ Paper EAS = 20-40 min", y: "friction" },
  { t: "⚠ Only 10-15% use AI extraction", y: "friction" },
];
ADJ["adjuster-triage"] = [
  { t: "Classifies complexity", y: "action" },
  { t: "Convention check (🇪🇺) / path (🇺🇸)", y: "action" },
  { t: "Field vs desk decision", y: "action" },
  { t: "SIU flag check", y: "action" },
  { t: "Prioritizes 80-150 claims", y: "action" },
  { t: "⚠ Overrides 20-30% auto-triage", y: "friction" },
];
ADJ["adjuster-investigation"] = [
  { t: "Coordinates shop/appraiser/medical", y: "action" },
  { t: "Reviews photos + expert reports", y: "action" },
  { t: "Determines liability", y: "action" },
  { t: "Gathers police/witness reports", y: "action" },
  { t: "⚠ Longest: PD 1-3h, BI 20-100h", y: "friction" },
  { t: "⚠ 30-40% time chasing docs", y: "friction" },
];
ADJ["adjuster-assessment"] = [
  { t: "Reviews estimate (CCC/Mitchell)", y: "action" },
  { t: "Validates vs damage photos", y: "action" },
  { t: "Repair vs total loss decision", y: "action" },
  { t: "Adjusts reserves", y: "action" },
  { t: "⚠ Supplements: 50-90% of claims", y: "friction" },
  { t: "⚠ Each supplement +3-14 days", y: "friction" },
];
ADJ["adjuster-decision"] = [
  { t: "7 decisions (coverage → BI)", y: "action" },
  { t: "Checks authority limits", y: "action" },
  { t: "Documents rationale", y: "action" },
  { t: "Communicates to policyholder", y: "action" },
  { t: "⚠ 10-20% need escalation", y: "friction" },
];
ADJ["adjuster-settlement"] = [
  { t: "Calculates offer (est − deductible)", y: "action" },
  { t: "Generates + sends offer", y: "action" },
  { t: "Negotiates within authority", y: "action" },
  { t: "Processes payment auth", y: "action" },
  { t: "⚠ BI: 3-8 rounds, months", y: "friction" },
  { t: "⚠ Checks still 30-40%", y: "friction" },
];
ADJ["adjuster-close"] = [
  { t: "Verifies all payments", y: "action" },
  { t: "Zeros reserves", y: "action" },
  { t: "Initiates subrogation", y: "action" },
  { t: "Files closure docs", y: "action" },
  { t: "⚠ Reopens: 1-5h each (3-12%)", y: "friction" },
  { t: "⚠ 20-30% subro unpursued", y: "friction" },
];

// Competitors — how they help the adjuster at each phase
const ADJ_COMPETITORS = [
  { id: "fivesigma", label: "Five Sigma\n(Clive)", color: "#3B82F6", funding: "$75M", type: "Platform" },
  { id: "shift", label: "Shift\nTechnology", color: "#8B5CF6", funding: "$320M", type: "Platform" },
  { id: "tractable", label: "Tractable", color: "#059669", funding: "$185M", type: "Point Solution" },
  { id: "snapsheet", label: "Snapsheet", color: "#F59E0B", funding: "$100M+", type: "Full Workflow" },
  { id: "sproutai", label: "Sprout.ai", color: "#10B981", funding: "$40M", type: "Point Solution" },
  { id: "omnius", label: "omni:us", color: "#6366F1", funding: "$45M", type: "Full Workflow" },
  { id: "ccc", label: "CCC / Mitchell\nAudatex", color: "#374151", funding: "Public", type: "Data + Estimating" },
  { id: "colossus", label: "Colossus\n(DXC)", color: "#78716C", funding: "Legacy", type: "BI Valuation" },
  { id: "davies", label: "Davies\nKuarterback", color: "#DC2626", funding: "$0.8B rev", type: "TPA + Tech" },
  { id: "claimsorted", label: "ClaimSorted", color: "#EC4899", funding: "$16.3M", type: "AI-Native TPA" },
  { id: "avallon", label: "Avallon", color: "#0D9488", funding: "$4.6M", type: "Back-Office AI" },
  { id: "pace", label: "Pace", color: "#14B8A6", funding: "$10M", type: "BPO Replacement" },
];

// Five Sigma (Clive) — $75M, end-to-end AI claims platform
ADJ["fivesigma-first_contact"] = [{ t: "FNOL from email/voice/chat", y: "action" }, { t: "Auto-assigns by complexity", y: "action" }];
ADJ["fivesigma-fnol"] = [{ t: "Auto-FNOL + coverage check", y: "action" }];
ADJ["fivesigma-triage"] = [{ t: "Dynamic complexity rating", y: "action" }, { t: "Routes simple → STP", y: "action" }];
ADJ["fivesigma-investigation"] = [{ t: "AI liability determination", y: "action" }, { t: "Auto-generates summary", y: "action" }];
ADJ["fivesigma-assessment"] = [{ t: "Reserve setting + exposure calc", y: "action" }];
ADJ["fivesigma-decision"] = [{ t: "STP for qualifying claims", y: "action" }, { t: "AI settlement recommendations", y: "action" }];
ADJ["fivesigma-settlement"] = [{ t: "Automated settlement + comms", y: "action" }, { t: "$150K/mo savings", y: "action" }];
ADJ["fivesigma-close"] = [{ t: "Auto-close workflows", y: "action" }, { t: "AI monitors conditions", y: "action" }];

// Shift Technology — $320M, fraud + claims automation
ADJ["shift-first_contact"] = [{ t: "Complexity scoring at intake", y: "action" }];
ADJ["shift-fnol"] = [{ t: "Triage + STP routing", y: "action" }];
ADJ["shift-triage"] = [{ t: "Classify + prioritize", y: "action" }, { t: "60% → STP path", y: "action" }];
ADJ["shift-investigation"] = [{ t: "Fraud detection", y: "action" }, { t: "Visual intelligence", y: "action" }];
ADJ["shift-assessment"] = [{ t: "Image/document analysis", y: "action" }];
ADJ["shift-decision"] = [{ t: "Auto-approve/deny/route", y: "action" }];
ADJ["shift-settlement"] = [{ t: "STP payment", y: "action" }];
ADJ["shift-close"] = [{ t: "Subrogation detection", y: "action" }, { t: "Post-close fraud analysis", y: "action" }];

// Tractable — $185M, photo-based AI
ADJ["tractable-fnol"] = [{ t: "Instant photo assessment", y: "action" }];
ADJ["tractable-triage"] = [{ t: "Repair vs TL from photos", y: "action" }];
ADJ["tractable-investigation"] = [{ t: "Photo evidence analysis", y: "action" }];
ADJ["tractable-assessment"] = [{ t: "AI repair estimate", y: "action" }, { t: "90% touchless (Admiral)", y: "action" }];
ADJ["tractable-decision"] = [{ t: "Repair vs TL decision", y: "action" }];
ADJ["tractable-settlement"] = [{ t: "Settle in minutes (GEICO)", y: "action" }];

// Snapsheet — $100M+, virtual claims
ADJ["snapsheet-first_contact"] = [{ t: "Photo capture guidance", y: "action" }];
ADJ["snapsheet-fnol"] = [{ t: "Virtual appraisal at FNOL", y: "action" }];
ADJ["snapsheet-triage"] = [{ t: "Rules engine routing", y: "action" }];
ADJ["snapsheet-assessment"] = [{ t: "Virtual appraisal estimates", y: "action" }];
ADJ["snapsheet-decision"] = [{ t: "Rules auto-approval", y: "action" }];
ADJ["snapsheet-settlement"] = [{ t: "Digital payment + TL", y: "action" }, { t: "40% cost reduction", y: "action" }];
ADJ["snapsheet-close"] = [{ t: "Digital close workflow", y: "action" }];

// Sprout.ai — $40M, document AI
ADJ["sproutai-first_contact"] = [{ t: "Doc classification", y: "action" }];
ADJ["sproutai-fnol"] = [{ t: "500+ doc types extracted", y: "action" }];
ADJ["sproutai-triage"] = [{ t: "Coverage + fraud auto-check", y: "action" }];
ADJ["sproutai-investigation"] = [{ t: "Anomaly detection", y: "action" }, { t: "Authenticity checking", y: "action" }];
ADJ["sproutai-assessment"] = [{ t: "Policy cross-reference", y: "action" }];

// omni:us — $45M, end-to-end automation
ADJ["omnius-first_contact"] = [{ t: "FNOL intake automation", y: "action" }];
ADJ["omnius-fnol"] = [{ t: "E2E FNOL automation", y: "action" }];
ADJ["omnius-triage"] = [{ t: "Auto-routing", y: "action" }];
ADJ["omnius-investigation"] = [{ t: "Subrogation identification", y: "action" }];
ADJ["omnius-assessment"] = [{ t: "Cost analysis", y: "action" }];
ADJ["omnius-decision"] = [{ t: "50%+ touchless resolution", y: "action" }];
ADJ["omnius-settlement"] = [{ t: "Auto-payment", y: "action" }];
ADJ["omnius-close"] = [{ t: "€1B subrogation identified", y: "action" }];

// CCC/Mitchell/Audatex — Public, data + estimating
ADJ["ccc-fnol"] = [{ t: "AI estimate at FNOL", y: "action" }];
ADJ["ccc-triage"] = [{ t: "Subrogation detection", y: "action" }];
ADJ["ccc-investigation"] = [{ t: "Estimating + parts DB", y: "action" }];
ADJ["ccc-assessment"] = [{ t: "Line-level estimates", y: "action" }, { t: "Total loss ACV", y: "action" }];
ADJ["ccc-decision"] = [{ t: "Auto-approve within params", y: "action" }];
ADJ["ccc-settlement"] = [{ t: "Subrogation recovery", y: "action" }];
ADJ["ccc-close"] = [{ t: "Subro recovery workflow", y: "action" }];

// Colossus (DXC) — Legacy, BI valuation
ADJ["colossus-assessment"] = [{ t: "BI valuation (750 codes)", y: "action" }];
ADJ["colossus-decision"] = [{ t: "Settlement range output", y: "action" }];

// Davies/Kuarterback — $0.8B rev, TPA + tech
ADJ["davies-fnol"] = [{ t: "RTA pack reading", y: "action" }];
ADJ["davies-triage"] = [{ t: "Auto-classification", y: "action" }];
ADJ["davies-investigation"] = [{ t: "Medical evidence extraction", y: "action" }];
ADJ["davies-assessment"] = [{ t: "PI valuation in <1 min", y: "action" }];
ADJ["davies-decision"] = [{ t: "Auto-valuation", y: "action" }];
ADJ["davies-settlement"] = [{ t: "Settlement offer generation", y: "action" }];

// ClaimSorted — $16.3M, AI-native TPA
ADJ["claimsorted-first_contact"] = [{ t: "Doc ingestion", y: "action" }];
ADJ["claimsorted-fnol"] = [{ t: "Full FNOL automation", y: "action" }];
ADJ["claimsorted-triage"] = [{ t: "AI triage", y: "action" }];
ADJ["claimsorted-investigation"] = [{ t: "Investigation automation", y: "action" }];
ADJ["claimsorted-assessment"] = [{ t: "Leakage <1.2%", y: "action" }];
ADJ["claimsorted-decision"] = [{ t: "AI decision + human oversight", y: "action" }];
ADJ["claimsorted-settlement"] = [{ t: "3x faster cycle times", y: "action" }];
ADJ["claimsorted-close"] = [{ t: "<1% reopen rate", y: "action" }];

// Avallon — $4.6M, AI voice agents
ADJ["avallon-first_contact"] = [{ t: "AI voice intake 24/7", y: "action" }];
ADJ["avallon-fnol"] = [{ t: "Doc extraction from calls", y: "action" }];
ADJ["avallon-investigation"] = [{ t: "Voice agent follow-ups", y: "action" }];
ADJ["avallon-assessment"] = [{ t: "Doc summarization", y: "action" }];

// Pace — $10M, BPO replacement
ADJ["pace-first_contact"] = [{ t: "Portal data entry", y: "action" }];
ADJ["pace-fnol"] = [{ t: "FNOL data entry automation", y: "action" }];
ADJ["pace-settlement"] = [{ t: "Settlement doc processing", y: "action" }];
ADJ["pace-close"] = [{ t: "Close admin automation", y: "action" }];

// Competitor Deep-Dive data — detailed analysis per competitor per phase
// Keys: "${competitorId}-${phaseId}"
const COMP_DEEP = {
  // ═══════════════ FIVE SIGMA (CLIVE) ═══════════════
  "fivesigma-first_contact": {
    what: "Clive receives FNOL via email, voice, or chat and auto-assigns by complexity. Recent Liberate partnership adds AI voice intake 24/7.",
    how: "Multi-agent architecture on Google Vertex AI / LangChain. Specialized FNOL agent extracts structured data from unstructured inputs. REST APIs overlay any CMS (Guidewire, Duck Creek, Sapiens).",
    limits: [
      "Voice intake is via 3rd-party Liberate — not native capability",
      "Only ~53 employees / $10M revenue — tiny team for enterprise ambitions",
      "No published STP rate for general P&C (only pet insurance case study: 90%)",
      "70% US business — limited EU presence and zero convention system support",
    ],
    gap: "Clive is a copilot, not autonomous. For anything beyond simple claims, it 'consults human adjusters.' No EU convention support (IRSA/CARD/IDS) means it can't handle the 80%+ of EU motor claims governed by conventions."
  },
  "fivesigma-fnol": {
    what: "Auto-FNOL creation with coverage verification. Extracts data from documents, photos, and communications into structured claim records.",
    how: "Document AI agent classifies and extracts from 100+ document types. Coverage agent cross-references policy terms. Creates claim record in CMS automatically.",
    limits: [
      "Document extraction quality unproven at scale — no published accuracy metrics",
      "No handwritten form capability confirmed (critical for EU Amicable Statements)",
      "Cannot read paper EAS forms that are still 60-70% of EU motor FNOL",
      "Relies on insurer's existing intake channels for data — not a front-end system",
    ],
    gap: "No evidence of handling the European paper FNOL problem (EAS/Constat Amiable). In EU markets, FNOL still arrives as scanned handwritten forms — Clive can't process these without additional OCR capability."
  },
  "fivesigma-triage": {
    what: "Dynamic complexity scoring routes simple claims to STP and complex ones to specialized handlers. Configurable per insurer SOP.",
    how: "Complexity Assessment agent (launched April 2025) scores across multiple dimensions. Rules engine + ML model determines STP eligibility. Insurer configures autonomy thresholds.",
    limits: [
      "Complexity Assessment is brand new (April 2025) — limited production history",
      "No published triage accuracy or override rates",
      "Realistic STP across mixed P&C: estimated 20-40%, not the '60%' marketing suggests",
      "Small customer base means limited training data vs. Shift's 2B claims analyzed",
    ],
    gap: "Triage accuracy depends on training data volume — Five Sigma processes far fewer claims than CCC or Shift, limiting ML model quality. No EU convention triage (IDA/IDS routing) documented."
  },
  "fivesigma-investigation": {
    what: "AI liability determination and auto-generated claim summaries. Reviews documents and generates investigation reports.",
    how: "Liability agent analyzes accident descriptions, police reports, and witness statements. GenAI generates structured summaries. Fraud agent runs basic anomaly detection.",
    limits: [
      "Liability determination quality is unproven — no published accuracy rate",
      "Fraud detection is basic anomaly flagging, not Shift's deep network analysis",
      "No integration with repair shops, medical providers, or field assessment",
      "Cannot coordinate physical inspections or expert appointments",
    ],
    gap: "Investigation is where adjusters spend 30-40% of time chasing documents. Clive can summarize docs but can't proactively obtain missing evidence, coordinate with third parties, or handle the phone tag that consumes adjuster hours."
  },
  "fivesigma-assessment": {
    what: "Reserve setting and exposure calculation. AI reviews damage documentation and estimates claim value.",
    how: "Assessment agent reviews repair estimates, medical records, and policy limits. Sets initial reserves and calculates exposure. Adjusts as new information arrives.",
    limits: [
      "No native damage estimation — relies on CCC/Mitchell/Audatex integration",
      "No photo-based AI damage assessment (unlike Tractable)",
      "Reserve accuracy metrics not published",
      "Cannot handle supplement cycles — the single largest rework source in motor claims",
    ],
    gap: "Assessment without native damage estimation means Five Sigma depends on the same legacy estimating tools (CCC/Mitchell) that cause the 63% supplement rate problem. They orchestrate but don't solve the core assessment accuracy issue."
  },
  "fivesigma-decision": {
    what: "STP for qualifying simple claims. AI settlement recommendations with confidence scores for human review on complex claims.",
    how: "Decision agent evaluates claim against configurable rules and ML model. High-confidence simple claims auto-approved. Complex claims get recommendation + rationale for handler.",
    limits: [
      "STP only proven for pet insurance vet bills — P&C evidence is thin",
      "Decision authority must be pre-configured — can't adapt to novel situations",
      "No regulatory approval documentation for automated claims decisions",
      "Complex claims still require full human review — AI only recommends",
    ],
    gap: "The decision layer is where Mysa can differentiate most. Five Sigma's decisions are rule-based with ML assist. An intelligence layer that understands EU convention baremes, liability matrices, and jurisdiction-specific regulations would be transformative."
  },
  "fivesigma-settlement": {
    what: "Automated settlement calculation and communication. Payment via Vitesse partnership. Claims $150K/month savings per insurer.",
    how: "Settlement agent calculates offer (estimate minus deductible), generates offer letter, and manages policyholder communication. Vitesse handles actual payment processing.",
    limits: [
      "Payment is via 3rd-party Vitesse — not native",
      "$150K/month savings claim is unverified marketing metric",
      "Cannot handle BI negotiation (multi-round, attorney involvement)",
      "No structured settlement capability for complex BI",
      "No EU convention reimbursement processing (forfait amounts, IDA flows)",
    ],
    gap: "Settlement in EU convention claims is largely automated by formula (forfait amounts) but requires convention system integration that Five Sigma doesn't have. The biggest gap is BI settlement where negotiations take months."
  },
  "fivesigma-close": {
    what: "Auto-close workflows when all conditions met. AI monitors for reopen triggers and subrogation opportunities.",
    how: "Closure agent verifies payment completion, zero reserves, and no pending actions. Subrogation agent identifies recovery opportunities. Dashboard tracks recovery pipeline.",
    limits: [
      "Subrogation is identification only — recovery execution is manual",
      "No automated demand letter generation",
      "No inter-carrier arbitration support",
      "Monitoring for reopens may create alert fatigue",
    ],
    gap: "20-30% of subrogation goes unpursued because adjusters lack time. Five Sigma identifies opportunities but doesn't execute recovery — the hardest part. Convention-based auto-settlement (EU) is not supported."
  },

  // ═══════════════ SHIFT TECHNOLOGY ═══════════════
  "shift-first_contact": {
    what: "Complexity scoring at intake. AI classifies incoming claim across 7 dimensions simultaneously.",
    how: "Azure OpenAI (GPT series) + proprietary ML models. Scores coverage, liability, fraud risk, damage, injury, subrogation, and litigation exposure. Built on Azure Kubernetes Service.",
    limits: [
      "No policyholder-facing intake — Shift is purely back-end",
      "No voice/chat FNOL capability (unlike Five Sigma + Liberate)",
      "Complexity scoring is a classification task, not claim handling",
      "Shift Claims (full automation) launched Sept 2025 — less than 6 months old",
    ],
    gap: "Shift is a 'back-end brain' — it analyzes what the insurer's existing systems capture. It doesn't improve the intake experience for policyholders or reduce the 70% voicemail problem adjusters face."
  },
  "shift-fnol": {
    what: "Extracts, structures, and analyzes every document at FNOL. Automated document classification and data extraction.",
    how: "Azure AI Vision with ML-based OCR. Azure AI Document Intelligence for layout detection. GPT models for unstructured text. Processes scans, images, and videos.",
    limits: [
      "Document processing is strong but it's INPUT analysis, not claim creation",
      "Shift doesn't create the FNOL record — it enriches what the CMS captures",
      "Regional data hosting requirements (GDPR) limit deployment flexibility",
      "Handwritten document accuracy rate not published",
    ],
    gap: "Shift processes documents well but doesn't own the FNOL workflow. The insurer still needs a CMS to create and manage the claim. Shift is an intelligence layer, not a claims system."
  },
  "shift-triage": {
    what: "AI classifies, scores, and routes. Claims 60% overall automation rate and 30% faster handling at early adopters.",
    how: "Classification across 7 complexity dimensions. Priority scoring for urgency/severity. STP Agent designation for eligible claims. Configurable routing rules.",
    limits: [
      "60% likely means 60% of TASKS, not 60% of entire claims end-to-end",
      "Data from 'early adopters' = primarily AXA Switzerland — one customer",
      ">99% accuracy claim is for classification, not decisions",
      "No breakdown by line of business — motor PD likely much higher than BI",
      "These are vendor-reported figures, not independently audited",
    ],
    gap: "The 60% number is misleading — task automation is not claim automation. Automating document classification and data entry is different from automating coverage decisions and settlement negotiations."
  },
  "shift-investigation": {
    what: "Industry-leading fraud detection — their core DNA. Insurance Data Network (IDN) enables cross-carrier fraud intelligence with 4 of top 5 US P&C insurers.",
    how: "Proprietary ML scores against hundreds of fraud scenarios. Network analysis builds 'social networks' of entities. IDN: cross-carrier data triples identified fraud network size. Azure AI Vision for image fraud.",
    limits: [
      "31% of fraud alerts are NOT accepted for investigation (false positives)",
      "IDN is US-focused — European cross-carrier sharing faces GDPR barriers",
      "System is REACTIVE (detects fraud) not PREVENTIVE",
      "No documentation for what happens when legitimate claims are wrongly flagged",
      "Network fraud requires volume — smaller insurers benefit less",
    ],
    gap: "Fraud detection is genuinely strong but reactive. The 31% non-actionable alert rate means SIU teams waste significant time. No appeal process for wrongly flagged policyholders. IDN doesn't extend to EU markets."
  },
  "shift-assessment": {
    what: "GenAI evaluates coverage, liability, damage, injury, subrogation, and litigation exposure simultaneously. 90% accuracy on subrogation liability prediction.",
    how: "Analyzes every document + claims notes with GenAI. References product recalls, comparative negligence laws, state-specific regulations. External data enrichment.",
    limits: [
      "90% liability accuracy = 10% wrong — thousands of incorrect determinations at scale",
      "BI assessment acknowledged as problematic: 'automation becomes under-valuation by default'",
      "No integration with medical providers or repair shops",
      "Comparative negligence law database is a single point of failure — accuracy depends on Shift maintaining it",
    ],
    gap: "Shift's own team acknowledges BI claims are under-valued by automation. The 10% error rate on liability is unacceptable for complex claims. No connection to the physical assessment world (repair shops, medical providers)."
  },
  "shift-decision": {
    what: "STP Agent handles clearly eligible claims end-to-end. Handler Assistance Agent guides humans on complex claims with context-aware next-best-actions.",
    how: "STP Agent evaluates eligibility per complexity score. Handler Assistance dynamically guides document review, decision-making, communication. Trained on insurer's own processes.",
    limits: [
      "Shift Claims launched September 2025 — LESS THAN 6 MONTHS in production",
      "Prior to Sept 2025, Shift was ONLY a fraud company, not a claims decision company",
      "Maturity gap: fraud product is 10+ years old, claims product is months old",
      "No regulatory approval documentation for automated decisions",
      "Handler Assistance (copilot) is where most claims actually land",
    ],
    gap: "Shift's claims decision product is essentially a startup product from a $1B+ company. 10 years of fraud expertise doesn't automatically transfer to claims decision-making. The product is untested at scale."
  },
  "shift-settlement": {
    what: "Automated settlement processing for STP-eligible claims. GenAI assists handlers with negotiation guidance for complex claims.",
    how: "STP pipeline processes payments for eligible claims. Integration with insurer's existing payment systems. No dedicated payment partner.",
    limits: [
      "No dedicated payment partnership (unlike Five Sigma + Vitesse)",
      "Settlement relies entirely on insurer's existing payment infrastructure",
      "No automated settlement negotiation for BI claims",
      "No structured settlement or multi-currency support",
      "No direct claimant payment portal",
    ],
    gap: "Settlement is not Shift's focus — they are a decision-support layer. Actual payment execution, BI negotiation, and multi-party settlement are completely outside their capability."
  },
  "shift-close": {
    what: "Dedicated AI Subrogation product identifies recovery opportunities with 90%+ accuracy. Monitors claims over time for new recovery reasons.",
    how: "AI analyzes claim data for subrogation indicators. GenAI scans unstructured claims notes. References product recalls and comparative negligence laws. Continuous monitoring.",
    limits: [
      "Subrogation IDENTIFICATION is strong but recovery EXECUTION is manual",
      "No automated demand letter generation",
      "No inter-carrier arbitration support",
      "European convention-based recovery (IDA flows) not addressed",
      "Continuous monitoring may create alert fatigue for adjusters",
    ],
    gap: "Shift identifies subrogation well (90% accuracy, 2x referral volume) but the actual recovery — sending demands, negotiating, arbitrating — still requires human action. EU convention auto-recovery is unsupported."
  },

  // ═══════════════ TRACTABLE ═══════════════
  "tractable-fnol": {
    what: "Instant photo-based damage assessment at FNOL. Customer submits photos, AI returns repair cost estimate in 15 seconds to 3 minutes.",
    how: "Deep learning computer vision trained on millions of damage images. Integration with Mitchell (US) and GT Motive (EU) repair cost databases. Outputs line-level repair estimate.",
    limits: [
      "Only assesses VISIBLE exterior damage — cannot detect hidden/structural/frame damage",
      "63% of all repairs require supplements after teardown (CCC 2024 data)",
      "No CCC integration — hostile 5-year lawsuit settled January 2025",
      "Tractable's own leadership admits 'no AI tool has reduced supplement amounts'",
    ],
    gap: "Photo AI has a fundamental physics problem: you cannot see behind panels in a photograph. This means ALL photo estimates are 'best case scenario' starting points. The 63% supplement rate is structural to the model, not a bug to fix."
  },
  "tractable-triage": {
    what: "AI determines repair vs total loss probability from damage photos. Claims 95-98% accuracy on confident total loss calls.",
    how: "Computer vision model scores damage severity. Compares against make/model-specific total loss thresholds. Outputs probability score for repair vs TL.",
    limits: [
      "95-98% accuracy is on CONFIDENT calls only — model abstains on ambiguous cases",
      "Traditional insurer checklists miss 70% of eventual total losses — low bar",
      "Cannot factor in pre-existing damage, odometer, or vehicle history",
      "No liability assessment — only damage severity",
    ],
    gap: "Total loss triage from photos is useful for early routing, but the triage decision needs to integrate vehicle history, market value, and repair economics — Tractable only provides the damage side."
  },
  "tractable-investigation": {
    what: "Photo evidence analysis for damage assessment. AI Subro product reviews subrogation demand packets in 15 seconds (vs 30 minutes manually).",
    how: "Computer vision extracts damage evidence from photos. AI Subro uses NLP to analyze demand packets and assess liability/damages from documentation.",
    limits: [
      "Photo analysis is damage severity only — no liability determination",
      "Cannot reconstruct accident dynamics from damage patterns",
      "Interior, mechanical, and frame damage completely invisible to the AI",
      "AI Subro is a new product — limited production track record",
    ],
    gap: "Investigation requires understanding fault, not just damage. Tractable sees what the camera shows but can't determine who caused the accident, whether statements are consistent, or if fraud indicators exist."
  },
  "tractable-assessment": {
    what: "AI repair estimates from photos — core product. Admiral Seguros: 90% of estimates touchless, 98% in under 15 minutes. GEICO: cuts 8 days from cycle time.",
    how: "Computer vision → line-level repair estimate using Mitchell/GT Motive databases. Includes repair vs replace decisions per component. Outputs in estimating platform format.",
    limits: [
      "90% touchless measures THROUGHPUT, not ACCURACY",
      "No head-to-head accuracy comparison vs experienced human appraisers published",
      "Cannot assess structural/frame damage (requires 3D measurement: Car-O-Liner, Celette)",
      "Body shops are skeptical: 'AI is a waste of time vs educated collision repair professional'",
      "Does NOT perform total loss ACV valuation — only flags TL probability",
    ],
    gap: "The core problem with ALL photo-based assessment: no one can see behind panels. Tractable's estimates are starting points that will be revised 63% of the time. Body shop trust is mixed — supplements remain the industry's biggest pain point."
  },
  "tractable-decision": {
    what: "Automated repair vs total loss decision based on AI damage assessment. Routes claims to appropriate path (repair network, TL valuation, salvage).",
    how: "Damage severity score + vehicle value data → repair/TL decision. Outputs confidence score. High-confidence decisions auto-routed. Low-confidence flagged for human review.",
    limits: [
      "Decision is binary (repair vs TL) — no nuanced multi-path routing",
      "No coverage, liability, or fraud decision capability",
      "Cannot handle the 7+ decision types in a full motor claim",
      "Total loss decision without ACV capability is incomplete",
    ],
    gap: "Tractable makes ONE decision (repair vs TL) out of the 7+ decisions in a motor claim. Coverage, liability, subrogation, BI, fraud, and authority escalation are all untouched."
  },
  "tractable-settlement": {
    what: "Enables settlement in minutes for simple damage claims. GEICO partnership for accelerated auto claims. AI Subro for recovery.",
    how: "Photo assessment → instant estimate → auto-offer to policyholder. For GEICO: AI double-checks existing estimates to validate settlement amount.",
    limits: [
      "Only settles PROPERTY DAMAGE — no bodily injury capability at all",
      "Settlement amount accuracy limited by the 63% supplement problem",
      "Cannot negotiate — offers a take-it-or-leave-it number",
      "No payment processing — relies on insurer infrastructure",
      "EU-specific: no convention forfait calculation",
    ],
    gap: "Fast settlement of an inaccurate estimate doesn't help anyone. The speed is impressive but the accuracy problem means claimants often need to reopen or supplement — creating MORE work downstream."
  },

  // ═══════════════ SNAPSHEET ═══════════════
  "snapsheet-first_contact": {
    what: "Digitized photo capture guidance. Customer receives link (SMS/email/web), takes guided photos of damage. No app download needed.",
    how: "Intelligent Photo Acquisition recognizes vehicle make/model and adjusts photo overlay guidance. Omni-channel communication triggers. Web-based, mobile-friendly.",
    limits: [
      "Photo quality depends on distressed customer following instructions",
      "Cannot force specific angles or lighting conditions",
      "No video capture or walk-around guidance documented",
      "Same fundamental limitation as all photo-based systems",
    ],
    gap: "Photo capture guidance is table stakes — every insurer app does this now. The differentiation is what happens AFTER the photos are captured, and Snapsheet's accuracy there is questionable (documented BBB complaints of 40-55% underestimates)."
  },
  "snapsheet-fnol": {
    what: "Digitized FNOL with omni-channel intake. Cloud-native platform handles phone, web, mobile, chatbot. Auto-creates claim records.",
    how: "Cloud-native SaaS with API integrations. Configurable intake workflows. Photo capture integrated at FNOL stage. Auto-routing based on rules engine.",
    limits: [
      "Platform is workflow automation, not AI-powered assessment",
      "Initial triage depends on rules configuration, not deep learning",
      "Complex claims still need human judgment at FNOL",
      "Recent Liberate AI voice partnership (May 2025) adds voice, but it's third-party",
    ],
    gap: "Snapsheet digitizes the workflow but doesn't add intelligence to it. Their FNOL is a better form, not a smarter system. The AI is in the appraisal step, not the intake step."
  },
  "snapsheet-triage": {
    what: "Configurable business rules route claims to appropriate workflows. Skill-based assignment by licensing, geography, claim type, complexity.",
    how: "No-code configurable workflow engine. Rules-based routing (NOT AI/ML). Claims assigned to right expert based on multiple criteria.",
    limits: [
      "Rules-based, NOT AI-driven — accuracy depends entirely on rule configuration",
      "Cannot visually assess damage severity for triage (that's the appraiser's job)",
      "No total-loss-probability scoring from photos at triage (unlike Tractable)",
      "Rule maintenance burden falls on the insurer",
    ],
    gap: "In 2026, rules-based triage is legacy technology. ML-powered complexity scoring (like Shift's) is where the industry is heading. Snapsheet's triage is configuration, not intelligence."
  },
  "snapsheet-assessment": {
    what: "Core product: HUMAN appraisers write virtual estimates from customer photos. AI assists but humans do the work. 4.3M claims/year, $7B+ in appraisals.",
    how: "Customer submits photos → Snapsheet's in-house human estimators review → write estimates using CCC/Mitchell/Audatex → return to insurer. HYBRID model.",
    limits: [
      "BBB complaints: estimates at 40-55% of actual repair costs documented",
      "NOT BBB accredited; 7 unresponded complaints on file",
      "Glassdoor 3.1/5 — employees say quantity prioritized over quality",
      "'Cherry picking' of easy claims; difficult ones go to less experienced staff",
      "Supplement process: customers report 2+ weeks and 6+ follow-up calls",
      "Labor rates described as 'low-balled' by body shops",
    ],
    gap: "Snapsheet's 'virtual appraisal' is really a tech-enabled BPO — human estimators working from photos. The fundamental accuracy problem is well-documented through BBB complaints. This is the old model with a digital veneer."
  },
  "snapsheet-decision": {
    what: "Rules engine auto-approves claims within configurable thresholds. Complex claims (litigation, liability, large loss) always go to human review.",
    how: "Configurable auto-approval thresholds by amount, damage type, policy terms. Business rules trigger decision workflows.",
    limits: [
      "Auto-approval is rules-based, not AI-driven visual assessment",
      "If the underlying virtual appraisal is inaccurate (BBB evidence), auto-approval locks in a wrong decision",
      "No AI-driven repair-vs-TL scoring (unlike Tractable)",
      "No documented fraud screening capability in the decision process",
    ],
    gap: "Auto-approving a bad estimate faster doesn't help. The decision quality is only as good as the assessment that feeds it — and Snapsheet's assessments have documented accuracy problems."
  },
  "snapsheet-settlement": {
    what: "Digital payment (Push to Debit, ACH, check). Snapsheet Total (July 2024) adds end-to-end total loss management. Marketing claims 40% cost reduction.",
    how: "Integrated payment processing with instant payment options. Snapsheet Total: valuation + offer creation + customer engagement + negotiation with data-driven valuations.",
    limits: [
      "Snapsheet Total is very new (July 2024) — limited track record",
      "40% cost reduction claim is unverifiable (Sedgwick case study shows 15% cost, 38% cycle time)",
      "Customer complaints: settlement amounts inadequate, require renegotiation",
      "Payment speed is good but the RIGHT amount matters more",
      "Essentially US-only — minimal EU presence (Zurich Ireland planned 2018, no follow-up)",
    ],
    gap: "Fast payment of an inaccurate amount creates customer dissatisfaction. The EU market is completely unserved — Snapsheet has essentially zero European presence despite 2018 Zurich partnership announcement."
  },
  "snapsheet-close": {
    what: "Automated closure workflows, digital document management, basic subrogation management, and reporting dashboard.",
    how: "Workflow automation triggers closure steps. API integration with insurer systems. Standard reporting and analytics.",
    limits: [
      "Basic closure automation — nothing differentiated",
      "Subrogation management is basic, not AI-powered",
      "No reopening prevention intelligence",
      "No EU convention auto-settlement capability",
    ],
    gap: "Closure is workflow automation, not intelligence. The real value at close is preventing reopens (3-12% of claims) and maximizing subrogation recovery — neither is Snapsheet's strength."
  },

  // ═══════════════ SPROUT.AI ═══════════════
  "sproutai-first_contact": {
    what: "Instant classification of 500+ document types using multi-model AI. Claims 99% classification accuracy. 100+ language support.",
    how: "Multi-model stack: Computer Vision + NLP + LLMs + Tabular ML. Processes medical records, legal docs, receipts, damage reports, photos across 100+ languages including handwritten.",
    limits: [
      "Classification is the first step — it doesn't create or manage the claim",
      "Document AI layer only — doesn't handle communication or customer interaction",
      "No FNOL portal or policyholder-facing interface",
      "Processing layer, not a claims system",
    ],
    gap: "Sprout.ai does one thing very well (documents) but nothing else. It's a component, not a solution. An insurer still needs a CMS, communication tools, payment processing, and decision logic."
  },
  "sproutai-fnol": {
    what: "Extracts data from 500+ document types including handwritten forms. AdvanceCare (Portugal): 98% accuracy across medical, dental, pharma documents. Processes 1M+ claims/year.",
    how: "OCR with handwritten text capability. Multi-language (100+ including Japanese, Greek, Arabic). Automated validation against policy data. Fast: routine health claims in 60 seconds.",
    limits: [
      "No confirmed EAS/Constat Amiable specific processing (handwritten accident diagrams)",
      "Accuracy on critical fields (policy numbers, monetary amounts) not separately verified",
      "Not a claims platform — extracted data flows back to insurer's CMS",
      "Health insurance is their strongest vertical — motor claims less proven",
    ],
    gap: "Sprout.ai claims 'world leader in handwritten OCR' but hasn't confirmed ability to process the specific EAS form that drives 80%+ of EU motor FNOL. This is the single most important document in EU motor claims."
  },
  "sproutai-triage": {
    what: "Policy coverage checking (85% accuracy day one, ramps to 99%). Fraud screening detects document tampering, AI-generated images, and duplicates.",
    how: "Pre-trained models for coverage validation. Fine-tunes with customer-specific data. Fraud detection via metadata analysis, pattern recognition, and image authenticity checks.",
    limits: [
      "Coverage checking starts at 85% — meaning 15% error rate initially",
      "Fraud detection flags rather than auto-rejects (human must review every flag)",
      "False positive rate for fraud not published anywhere",
      "No complexity scoring or handler routing capability",
    ],
    gap: "85% day-one accuracy means 1 in 7 coverage decisions is wrong. The fine-tuning ramp to 99% requires time and data. Fraud flagging creates reviewer workload without quantified false positive rates."
  },
  "sproutai-investigation": {
    what: "Anomaly detection and document authenticity checking. Flags suspicious patterns, inconsistencies, and potential tampering.",
    how: "AI analyzes document metadata, pixel patterns for editing, cross-references across documents. Flags anomalies with evidence for human investigator.",
    limits: [
      "Flagging only — no automated investigation capability",
      "No interaction with third parties (repair shops, medical, witnesses)",
      "Cannot conduct interviews, coordinate inspections, or gather evidence",
      "False positive rate undisclosed",
    ],
    gap: "Document tampering detection is useful but investigation is much more than documents. The 30-40% of adjuster time spent chasing missing information requires coordination capability, not just analysis."
  },
  "sproutai-assessment": {
    what: "Auto-interprets policy documents, extracts clauses, cross-references with claim data. Validates coverage terms, exclusions, and limits.",
    how: "LLM-powered policy interpretation. Cross-references claim documents against policy wording. Auto-approve or auto-reject for qualifying claims.",
    limits: [
      "Policy interpretation, not damage assessment — doesn't estimate repair costs",
      "No integration with CCC/Mitchell/Audatex for cost estimation",
      "Complex policy language may exceed model capability",
      "Settlement calculation only confirmed for travel insurance",
    ],
    gap: "Sprout.ai checks IF the claim is covered but not WHAT it's worth. That's half the assessment problem. Damage valuation, repair cost estimation, and reserve accuracy are untouched."
  },

  // ═══════════════ OMNI:US ═══════════════
  "omnius-first_contact": {
    what: "Automates intake from email and multi-channel sources. Eliminates duplicates. Classifies line of business, loss type, cause, and parties.",
    how: "NLP + Computer Vision processes incoming communications. Auto-classification across pre-trained categories. Duplicate detection prevents redundant claims.",
    limits: [
      "Email-centric intake — limited voice/chat documented",
      "No policyholder-facing portal or self-service",
      "Classification is back-end processing, not customer experience improvement",
      "~65 employees — small team for 'end-to-end' platform ambitions",
    ],
    gap: "omni:us processes what arrives but doesn't improve how it arrives. The intake experience for policyholders is unchanged. No customer-facing interface means no improvement in first contact quality."
  },
  "omnius-fnol": {
    what: "Full FNOL automation through NLP + Computer Vision. Google Cloud case study revealed 7.25% handwritten character error rate.",
    how: "NLP processes free-text descriptions. OCR extracts from scanned documents. Structures data into claim fields automatically. Built on Google Cloud.",
    limits: [
      "7.25% handwritten character error rate is problematic for critical fields",
      "Policy numbers and monetary amounts need near-zero error tolerance",
      "Handwritten EAS accuracy likely worse than 7.25% given form complexity",
      "Google Cloud dependency limits deployment in some regulated environments",
    ],
    gap: "7.25% character error rate means roughly 1 in 14 characters is wrong. For a policy number like 'PT-2024-1234567', that could mean routing the claim to the wrong insurer or policy. This error rate is unacceptable for critical data."
  },
  "omnius-triage": {
    what: "Auto-routes claims using pre-built decision catalog for 7 P&C lines. Next-best-action recommendations for handlers.",
    how: "AI-powered claims decision catalog pre-trained for 7 lines. Severity scoring and complexity assessment. Routes simple claims to STP, complex to handlers.",
    limits: [
      "Pre-built catalog may not match insurer's specific processes",
      "Only 7 P&C lines — no health, life, or travel",
      "Conflicting automation claims: 50% vs 60% vs 70% in different materials",
      "UNIQA verified: 60% STP + 25% semi-auto — not as high as marketing suggests",
    ],
    gap: "The conflicting automation numbers (50-70%) across marketing materials suggest inconsistent real-world performance. The pre-built decision catalog is a strength for speed of deployment but limits customization."
  },
  "omnius-investigation": {
    what: "Major differentiator: AI-powered subrogation detection. Identifies 20+ subrogation reasons with supporting proof. Express Subrogation uses GenAI.",
    how: "AI scans all claim documents for recovery indicators. Identifies subrogation reasons with evidence. EUR 1B total identified across all clients cumulative.",
    limits: [
      "EUR 1B is cumulative across ~30 clients over several years — sounds bigger than it is",
      "Per-claim value: ~EUR 12 per claim scanned (EUR 3.8M from 320K claims for one insurer)",
      "Identification only — recovery execution is still manual",
      "Not a broad investigation tool — focused specifically on subrogation",
    ],
    gap: "EUR 1B sounds impressive but it's EUR 12 per claim across 30 clients over multiple years. The real gap: subrogation identification without recovery execution means someone still has to pursue the money."
  },
  "omnius-assessment": {
    what: "Automated cost assessment for claims under EUR 5,000. Algorithm trained on historical claims data.",
    how: "Tabular ML models trained on historical patterns. Cross-references against claims decision catalog. Severity-based cost estimation.",
    limits: [
      "Hard cap at EUR 5,000 — anything above requires human assessment",
      "Trained on historical data which may not reflect current costs (inflation, parts shortages)",
      "No integration with repair cost databases (CCC/Mitchell/Audatex)",
      "No photo-based damage assessment capability",
    ],
    gap: "EUR 5,000 cap means any motor claim with moderate damage (average US auto claim: $4,700 in 2024) might exceed the automation threshold. Complex, multi-part, or bodily injury claims are completely unaddressed."
  },
  "omnius-decision": {
    what: "50-70% touchless resolution claimed. UNIQA verified: 60% STP + 25% semi-automated = 85% with some AI involvement.",
    how: "STP for qualifying claims against decision catalog. Handler gets AI-powered next-best-action suggestions for non-STP claims. Configurable per client.",
    limits: [
      "70% is aspirational — UNIQA verified 60% STP, 25% semi-auto, 15% manual",
      "Semi-automated still requires human confirmation (not truly touchless)",
      "Only high-frequency, low-severity personal P&C claims qualify for STP",
      "Complex/high-value/BI claims always need experienced adjusters",
    ],
    gap: "60% STP is impressive for simple claims but that's the easy 60%. The remaining 40% — complex, multi-party, high-value, BI — is where adjusters spend most of their time and where the real value opportunity exists."
  },
  "omnius-settlement": {
    what: "Triggers payment within insurer's core CMS (Guidewire, Sapiens). No human approval needed for qualifying STP claims.",
    how: "System determines amount → validates against policy → triggers payment instruction in core CMS → CMS executes disbursement. NOT a payment processor.",
    limits: [
      "Does NOT process payments — triggers instructions in insurer's existing systems",
      "No direct policyholder payment capability",
      "No BI negotiation or structured settlement support",
      "No multi-currency or cross-border payment handling",
      "Speed depends on the insurer's payment infrastructure, not omni:us",
    ],
    gap: "omni:us is an automation layer, not a payment system. The actual settlement experience for policyholders depends entirely on the insurer's existing infrastructure. No innovation in how or how fast people get paid."
  },
  "omnius-close": {
    what: "Post-settlement recovery identification. Ongoing subrogation opportunity detection. Recovery claim filing enablement.",
    how: "Continuous monitoring of settled claims for new recovery indicators. AI flags previously missed subrogation opportunities.",
    limits: [
      "Recovery identification only — no execution capability",
      "No convention-based auto-settlement for EU claims",
      "No automated demand letter or arbitration support",
      "Monitoring creates ongoing notification burden",
    ],
    gap: "Same gap as investigation: finding subrogation opportunities is easy with AI, pursuing them is hard. The EUR 1B 'identified' includes significant uncollected amounts. The execution gap is where value is destroyed."
  },

  // ═══════════════ CCC / MITCHELL / AUDATEX ═══════════════
  "ccc-fnol": {
    what: "CCC First Look: AI predicts damage severity and repair vs TL from initial photos at FNOL. Enables early triage and reserve setting.",
    how: "Computer vision trained on hundreds of millions of damage images (largest training set in the industry). Point-of-impact and severity prediction. Runs on NVIDIA GPU infrastructure.",
    limits: [
      "Prediction only — does not create a full repair estimate at FNOL",
      "CCC is US-dominant — limited European presence (Audatex/GT Motive is separate)",
      "Insurers locked into CCC's ecosystem — parts databases, labor rates, repair procedures",
      "Photo-based: same hidden damage limitation as Tractable",
    ],
    gap: "CCC has the data moat (billions of claims) but is a legacy ecosystem, not an innovation platform. Insurers are locked in, not empowered. The same 63% supplement rate applies to CCC's own AI estimates."
  },
  "ccc-triage": {
    what: "AI-powered subrogation detection at early stages. Identifies recovery potential before investigation begins.",
    how: "ML models trained on CCC's massive claims database identify subrogation indicators. Flags claims with recovery potential for early intervention.",
    limits: [
      "Subrogation detection at triage is useful but narrow",
      "CCC's triage is damage-focused — no coverage or liability assessment",
      "Part of a massive legacy platform — not a standalone triage solution",
      "EU convention routing not supported (CCC is US-focused)",
    ],
    gap: "CCC catches subrogation early but doesn't address the broader triage challenge: complexity scoring, handler routing, STP eligibility, and EU convention classification."
  },
  "ccc-investigation": {
    what: "Core platform: industry-standard repair estimating with the largest parts database. CCC Estimate-STP delivers line-level estimates from photos in seconds.",
    how: "Computer vision → line-level repair estimate using CCC's proprietary parts/labor/procedure database. Intelligent Reinspection reviews body shop estimates against damage photos.",
    limits: [
      "CCC is an ESTIMATING tool, not an investigation platform",
      "Does not determine liability, coordinate with witnesses, or investigate fraud",
      "Parts database dominance creates vendor lock-in (insurers can't easily switch)",
      "5-year lawsuit with Tractable (settled 2025) shows competitive hostility",
      "Adjusters complain about slow system, rigid workflows, and expensive licensing",
    ],
    gap: "CCC dominates repair estimating but that's ONE part of investigation. Liability determination, evidence gathering, expert coordination, and fraud analysis are all outside CCC's scope."
  },
  "ccc-assessment": {
    what: "Industry gold standard for line-level repair estimates and total loss ACV valuation. CCC Impact Dynamics predicts injury severity from damage photos.",
    how: "Line-level estimates with CCC's parts/labor database. Total loss ACV from CCC Valuation. Impact Dynamics: Delta V prediction from damage photos → injury potential scoring.",
    limits: [
      "Repair estimates start the supplement cycle — 63% of CCC estimates need revision after teardown",
      "The average gap between initial estimate and final cost: $1,200-$1,800",
      "Body shops widely criticize CCC's labor rates as below-market",
      "ACV valuation uses comparable vehicle data — accuracy varies by market",
      "Impact Dynamics predicts injury POTENTIAL, not injury VALUE",
    ],
    gap: "CCC IS the assessment infrastructure but also the SOURCE of the supplement problem. Their estimates trigger the 63% supplement rate. They're optimizing within a broken paradigm rather than fixing it."
  },
  "ccc-decision": {
    what: "Auto-approve estimates within insurer-configured parameters. Intelligent Reinspection evaluates body shop supplements against damage evidence.",
    how: "Rules engine checks estimate against insurer's authority parameters. Reinspection AI compares supplement requests to original damage photos. Flags discrepancies.",
    limits: [
      "Rules-based auto-approval, not AI-driven decision making",
      "Reinspection is adversarial (catching shop overcharges) not collaborative",
      "No coverage, liability, or BI decision capability",
      "Decisions limited to 'approve/flag for review' on repair estimates",
    ],
    gap: "CCC makes ONE decision: is this repair estimate acceptable? It doesn't address coverage decisions, liability determination, BI valuation, or the broader claims decision tree."
  },
  "ccc-settlement": {
    what: "Subrogation recovery workflows. Manages the inter-carrier recovery process for property damage claims.",
    how: "Identifies subrogation potential from claim data. Facilitates demand creation and tracking. Integrates with inter-company arbitration forums.",
    limits: [
      "US-centric subrogation workflows — no EU convention integration",
      "Recovery management, not settlement calculation",
      "No policyholder-facing settlement or payment capability",
      "Part of the broader CCC ecosystem — not standalone",
    ],
    gap: "CCC's subrogation is solid in the US but irrelevant for EU convention-based claims where recovery follows IDA/IRSA/CARD flows. No policyholder settlement capability."
  },
  "ccc-close": {
    what: "Subrogation recovery tracking through to completion. Reporting and analytics on claims outcomes.",
    how: "Workflow tracks recovery demands, responses, and arbitration outcomes. Analytics dashboard for claims performance metrics.",
    limits: [
      "Administrative workflow, not intelligent automation",
      "Closure analytics are retrospective, not predictive",
      "No reopen prevention intelligence",
      "US-only recovery workflows",
    ],
    gap: "CCC tracks what happened but doesn't prevent problems (reopens, missed recovery, leakage). The analytics tell you what went wrong after it's too late."
  },

  // ═══════════════ COLOSSUS (DXC) ═══════════════
  "colossus-assessment": {
    what: "BI valuation system used by 70%+ of US auto insurers. Assigns 'severity points' to injuries using ~600 injury codes (some sources cite 750+). Generates settlement ranges.",
    how: "Adjuster enters injury data through guided consultation. System assigns numeric scores based on injury type, severity, age, location. Multipliers adjust for jurisdiction. Outputs dollar range.",
    limits: [
      "Born in 1980s Australia — architecture is 30+ years old",
      "Requires MANUAL DATA ENTRY by adjuster — not automated",
      "Accused of systematically undervaluing claims (lawsuits by injured parties)",
      "Only handles BI — no property damage capability",
      "Adjusters routinely override Colossus ranges (suggesting low trust)",
      "No evidence of updates for 'social inflation' trends (nuclear verdicts)",
    ],
    gap: "Colossus is the definition of legacy. It's a 1980s system that requires manual data entry and has been sued for systematic undervaluation. The industry needs AI-powered BI valuation that's transparent, accurate, and current."
  },
  "colossus-decision": {
    what: "Settlement range output provides floor and ceiling for BI negotiation. Adjusters use as negotiation anchor.",
    how: "After injury evaluation consultation, outputs a recommended settlement range. Adjusters negotiate within (or outside) this range.",
    limits: [
      "Range output, not a decision — adjuster still decides the actual offer",
      "Adjusters override ranges 'routinely' (per legal and industry commentary)",
      "System doesn't account for litigation risk, attorney involvement, or venue",
      "No integration with modern data sources (medical cost trends, verdict data)",
      "Plaintiffs' attorneys have learned to reverse-engineer Colossus inputs",
    ],
    gap: "Colossus provides a range that adjusters frequently ignore and attorneys game. A modern BI decision system needs to factor in litigation risk, venue history, attorney track record, and real-time medical cost data."
  },

  // ═══════════════ DAVIES / KUARTERBACK ═══════════════
  "davies-fnol": {
    what: "ClaimPilot's new Claim Opening Agent (H2 2025) automates claim opening and document reading using LLM-powered AI. Kuarterback traditionally enters at Stage 2 (post-FNOL).",
    how: "Claim Opening Agent uses GenAI to read/interpret documents, create claim records, and seek human assistance when needed. Self-learning, configurable per client.",
    limits: [
      "ClaimPilot agents launched H2 2025 — minimal production history",
      "Kuarterback doesn't do FNOL — it enters at UK RTA Portal Stage 2",
      "UK-specific: designed for the RTA Portal and OIC Portal systems",
      "Not portable to other jurisdictions without significant rework",
    ],
    gap: "Davies' AI automation is purpose-built for the UK motor PI pipeline (RTA/OIC Portal). It doesn't generalize to other countries' claim submission systems or property damage claims."
  },
  "davies-triage": {
    what: "ML-based document classification auto-routes claims by type and complexity. DTection fraud screening processes 15,000+ claims/day.",
    how: "Machine learning classifies document types. OCR extracts structured data. DTection (launched Feb 2022) screens for fraud indicators. Auto-routes to appropriate handler or automation path.",
    limits: [
      "Triage is UK motor PI-specific — not applicable to other lines or markets",
      "DTection is fraud SCREENING, not investigation",
      "Classification is limited to documents — no visual damage assessment",
      "Rules engine, not AI-driven complexity scoring",
    ],
    gap: "Strong in the narrow UK motor PI market but completely inapplicable to EU continental claims, US claims, or non-motor lines. The AI is trained on UK-specific data and regulations."
  },
  "davies-investigation": {
    what: "Kuarterback reads Stage 2 packs: OCR extracts medical reports, classifies document types, and converts to structured data. Know Your Opponent (KYO) intelligence.",
    how: "OCR → ML classification → structured data extraction → validation against rules. KYO analyzes opposing solicitor firm's historical behavior patterns to adjust strategy.",
    limits: [
      "Only reads medical evidence for PI valuation — not a broad investigation tool",
      "KYO is UK-specific (based on UK solicitor firms database)",
      "Cannot coordinate physical inspections, expert appointments, or evidence gathering",
      "Limited to documents in the RTA/OIC Portal pack format",
    ],
    gap: "KYO (Know Your Opponent) is clever but UK-only. The broader investigation problem — coordinating evidence gathering, managing expert appointments, chasing missing documents — is completely unaddressed."
  },
  "davies-assessment": {
    what: "PI valuation in under 1 minute. Kuarterback processes medical evidence through valuation matrices. Handles 85% of low-value UK motor PI claims automatically.",
    how: "Extracted medical data → insurer-specific valuation matrices → KYO opponent intelligence → settlement value. New ClaimPilot Agent 2 adds LLM-based valuation.",
    limits: [
      "Only low-value UK motor PI claims (RTA Portal threshold)",
      "No property damage assessment capability",
      "Valuation accuracy vs actual outcomes not independently verified",
      "Valuation matrices are insurer-configured — quality depends on the insurer",
      "No liability determination — only 'quantum-only' (amount) disputes",
    ],
    gap: "Fast PI valuation for UK low-value motor is a solved problem — but it's a tiny niche. No property damage, no complex BI, no multi-jurisdiction, no liability disputes. And no assessment for 95% of global claims."
  },
  "davies-decision": {
    what: "Auto-valuation for qualifying claims with human review for the remaining 15-20%. Stage 3 disputes handled by Legal AI (Lauri) for quantum defense.",
    how: "Rules engine + valuation output → auto-offer for qualifying claims. Legal AI handles quantum-only disputes using ML, NLP, and process automation. 15,000+ claims processed.",
    limits: [
      "Does NOT automate liability determination — only 'quantum' (amount)",
      "Legal AI handles defense only, not claimant communication",
      "15-20% of claims still need full human review",
      "UK RTA/OIC Portal-specific — not portable",
    ],
    gap: "The hardest decision in claims — 'who is at fault?' — is completely manual. Davies automates 'how much?' but not 'who pays?' This is the highest-value unsolved problem in the industry."
  },
  "davies-settlement": {
    what: "Settlement offer generation for UK portal claims. Credit hire claims handled via VeriRate rate validation.",
    how: "Auto-generated offers based on Kuarterback valuation. VeriRate validates credit hire rates against archived Basic Hire Rates. Integrates with UK portal payment flows.",
    limits: [
      "UK portal settlements only — specific to the RTA/OIC ecosystem",
      "No BI negotiation capability for complex cases",
      "No direct payment processing",
      "VeriRate is defensive (reducing credit hire costs) not proactive",
    ],
    gap: "UK portal claims are largely formulaic — the settlement process follows tariff tables. The complex settlement problem (BI negotiation, multi-party, cross-border) is completely unaddressed."
  },

  // ═══════════════ CLAIMSORTED ═══════════════
  "claimsorted-first_contact": {
    what: "White-label eNOL (electronic Notice of Loss) fully customizable to insurer brand. Policyholder self-service portal for tracking, questions, document uploads.",
    how: "Cloud-native platform with white-label configuration. Customer-facing portal and self-service tools. AI-powered document ingestion from day one.",
    limits: [
      "Founded 2024, ~20 employees — very early stage",
      "Total funding $16.3M (seed) — limited runway for enterprise ambitions",
      "20+ insurer partners but 'tens of thousands' of policyholders — small volumes",
      "Multi-line breadth (auto, property, warranty, travel, health, liability) with 20 people raises depth questions",
    ],
    gap: "ClaimSorted validates the 'AI-native TPA' thesis but is unproven at scale. Their breadth across 6 insurance lines with 20 employees means depth in any single line is questionable."
  },
  "claimsorted-fnol": {
    what: "Full FNOL automation including document ingestion and verification. Multi-market from inception (US, UK, EU).",
    how: "AI-powered document processing. Automated verification against policy data. Claim creation and initial triage in a single workflow.",
    limits: [
      "No published accuracy metrics for document extraction",
      "Pet insurance founders — motor/property expertise unproven",
      "Multi-market claim means navigating 3 different regulatory regimes at seed stage",
      "Document types and complexity vary enormously across US/UK/EU",
    ],
    gap: "Multi-market FNOL is ambitious but unproven. EU motor FNOL has specific requirements (EAS forms, convention classification) that US-trained AI may not handle."
  },
  "claimsorted-triage": {
    what: "AI-driven triage with eligibility checks. Routes based on complexity — simple claims toward STP, complex toward human adjusters.",
    how: "ML-based complexity scoring. Eligibility validation against policy terms. Auto-routing to appropriate handler or automation path.",
    limits: [
      "Triage quality depends on training data — limited volume at seed stage",
      "No published triage accuracy or override rates",
      "Competitive moat unclear — similar approach to Five Sigma and others",
      "Dependence on foundation models (LLM hallucination risk in regulated industry)",
    ],
    gap: "AI triage from a seed-stage company with limited data vs. Shift (2B claims analyzed) or CCC (billions of records) is a fundamentally different proposition. The data advantage matters enormously for ML accuracy."
  },
  "claimsorted-investigation": {
    what: "Automated document verification, eligibility checks, and fraud detection via proprietary algorithms.",
    how: "AI validates documents for authenticity. Flags unusual patterns, excessive costs, and tampering. Proprietary fraud detection algorithms.",
    limits: [
      "Fraud detection details are vague — 'proprietary algorithms' without specifics",
      "Cannot handle complex fraud investigations requiring human judgment",
      "No integration with external investigation services",
      "Limited claims volume means limited fraud pattern training data",
    ],
    gap: "At 'tens of thousands' of claims, ClaimSorted's fraud detection can't match Shift's network analysis built on billions of claims. Pattern recognition requires volume they don't yet have."
  },
  "claimsorted-assessment": {
    what: "Claims less than 1.2% leakage rate. Automated cost assessment against policy wording.",
    how: "AI validates claim amount against policy terms, exclusions, and limits. Benchmarks against historical claim costs. Flags outliers.",
    limits: [
      "<1.2% leakage is SELF-REPORTED, not independently audited",
      "Industry average is 5-10% (some claim 2-4%) — if real, this would be exceptional",
      "Small claims volume means limited statistical significance",
      "Leakage definition varies — measurement methodology not disclosed",
      "Likely handling simpler claims initially (selection bias)",
    ],
    gap: "The <1.2% leakage claim is marketing until independently verified at meaningful scale. With 'tens of thousands' of claims, the confidence interval on this metric is very wide."
  },
  "claimsorted-decision": {
    what: "AI makes decisions with human oversight. Humans retained for 'judgment and trust' moments. System decides when to escalate.",
    how: "AI decision engine with configurable human-in-the-loop triggers. Handles approval, rejection, and escalation. Human adjusters alongside AI agents.",
    limits: [
      "Human oversight requirement means it's a copilot, not autonomous",
      "No published decision accuracy or override rates",
      "Complex claims (BI, fraud, multi-party, litigation) likely all escalate to humans",
      "Team of ~20 means very limited human capacity for complex cases",
    ],
    gap: "AI + human oversight is the right approach but at 20 employees, how many complex claims can they handle when the AI escalates? Their human capacity is the bottleneck."
  },
  "claimsorted-settlement": {
    what: "3x faster cycle times than traditional TPAs. Payouts in minutes for straightforward claims.",
    how: "AI determines settlement amount. Automated payment processing for qualifying claims. Digital communication with policyholders.",
    limits: [
      "3x faster claim is unverified — no baseline or comparison methodology published",
      "'Minutes' likely applies only to simplest claims (low-value, clear liability)",
      "No BI settlement or negotiation capability",
      "Payment infrastructure details not disclosed",
    ],
    gap: "Speed on simple claims is table stakes in 2026. The differentiation is handling complex settlements — BI negotiation, multi-party, cross-border — where ClaimSorted has no demonstrated capability."
  },
  "claimsorted-close": {
    what: "Less than 1% reopen rate vs industry average of 3-5%. AI-powered quality assurance prevents premature closure.",
    how: "AI validates all closure conditions before finalizing. Quality checks ensure no outstanding payments, reserves, or pending actions.",
    limits: [
      "<1% reopen rate is self-reported — not independently verified",
      "Likely handling simpler, shorter-tail claims (naturally lower reopen rate)",
      "Claims mix matters enormously — BI claims reopen far more than PD",
      "Limited volume means limited statistical confidence",
    ],
    gap: "Low reopen rate is good but the metric is only meaningful at scale and with a representative claims mix. A seed-stage TPA handling simple claims naturally has fewer reopens."
  },

  // ═══════════════ AVALLON ═══════════════
  "avallon-first_contact": {
    what: "AI voice agents handle inbound FNOL calls 24/7. Automated policyholder intake without hold times.",
    how: "Conversational AI voice agents on phone. Extracts FNOL data from natural speech. Routes to claims system. Available around the clock.",
    limits: [
      "Only $4.6M funding — very early stage, viability uncertain",
      "Voice AI struggles with: accented speech, emotional callers, background noise",
      "Multi-language capability not confirmed (critical for EU markets)",
      "No evidence of how callers react to AI during stressful accident reporting",
      "Fallback to human agent not well documented",
    ],
    gap: "Voice AI for FNOL is a growing space (Liberate, Five Sigma partnership) but Avallon is tiny. The hard problem isn't the technology — it's handling distressed, emotional callers in a traumatic situation with empathy."
  },
  "avallon-fnol": {
    what: "Extracts structured FNOL data from voice conversations. Transcribes and classifies information from calls.",
    how: "Speech-to-text transcription. NLP extracts claim-relevant data points. Auto-populates FNOL form fields from conversation.",
    limits: [
      "Transcription accuracy in noisy/emotional conditions unknown",
      "Cannot verify information provided (no document cross-reference)",
      "No photo capture capability during voice intake",
      "Limited to what the caller can verbally describe",
    ],
    gap: "Voice-only FNOL misses the visual dimension. Modern FNOL should combine voice, photos, and documents simultaneously. Avallon captures the voice but not the evidence."
  },
  "avallon-investigation": {
    what: "AI voice agents make follow-up calls for missing information. Outbound capability for document requests and status updates.",
    how: "Automated outbound calls to claimants, witnesses, and third parties. Scripted conversations with AI flexibility. Updates claim file from responses.",
    limits: [
      "Outbound AI calls may face regulatory restrictions in some jurisdictions",
      "Recipient reaction to AI cold-calls for claim information unknown",
      "Cannot handle complex interview situations or evasive witnesses",
      "No coordination with physical inspection or expert services",
    ],
    gap: "AI follow-up calls could save adjusters the 20+ calls/day (2/3 going to voicemail), but regulatory and social acceptance of AI calling about insurance claims is untested at scale."
  },
  "avallon-assessment": {
    what: "Document summarization from voice inputs. Creates structured summaries from call transcripts for adjuster review.",
    how: "NLP processes call transcripts. Extracts key facts, dates, descriptions. Generates structured claim summaries.",
    limits: [
      "Summarization only — not assessment or valuation",
      "Voice-captured information is subjective (caller's perception)",
      "No damage assessment, cost estimation, or reserve setting",
      "Summary quality depends on caller's ability to describe events",
    ],
    gap: "Summarizing what a caller said is not the same as assessing a claim. Avallon provides input data, not analysis. The actual assessment still requires all the traditional tools and expertise."
  },

  // ═══════════════ PACE ═══════════════
  "pace-first_contact": {
    what: "Portal data entry automation. AI enters FNOL data into insurer's existing systems, replacing manual BPO staff.",
    how: "AI agents interact with insurer portals (screen automation). Enters data from documents into CMS fields. Replaces offshore data entry teams.",
    limits: [
      "Screen automation (RPA-like) — not intelligent processing",
      "Only as good as the data it's entering (garbage in, garbage out)",
      "No data validation or enrichment beyond what's in the source documents",
      "Differentiation vs. UiPath/Automation Anywhere RPA unclear",
    ],
    gap: "Pace replaces data entry staff, not claims expertise. In a world where document AI can extract directly into claims systems (Sprout.ai, omni:us), screen-level automation is becoming the legacy approach."
  },
  "pace-fnol": {
    what: "FNOL data entry automation. Reads FNOL documents and enters into insurer's CMS, replacing manual processing staff.",
    how: "Document reading + CMS portal automation. Mimics human data entry process but faster and available 24/7.",
    limits: [
      "Process automation, not intelligence — doesn't improve the process, just executes faster",
      "Cannot handle exceptions or ambiguous data",
      "No decision-making capability at FNOL stage",
      "Only $10M funding — limited R&D capacity",
    ],
    gap: "Automating a bad process faster doesn't fix the process. Modern claims needs end-to-end reimagining, not faster data entry. Pace is a bridge technology between BPO and true AI automation."
  },
  "pace-settlement": {
    what: "Settlement document processing. AI handles administrative document preparation for settlement execution.",
    how: "Automated document generation and processing. Handles settlement-related administrative tasks.",
    limits: [
      "Administrative automation only — no settlement calculation or negotiation",
      "Cannot determine settlement amounts or make offers",
      "Document preparation is low-value work in the settlement process",
      "No payment processing capability",
    ],
    gap: "Settlement document processing is the easiest part of settlement to automate. The hard parts — calculating the right amount, negotiating with claimants/attorneys, handling disputes — are untouched."
  },
  "pace-close": {
    what: "Closure administration automation. AI handles the administrative tasks of closing a claim file.",
    how: "Automated closure document processing, reserve zeroing in CMS, file completion verification.",
    limits: [
      "Administrative closure tasks only — no intelligent quality review",
      "No reopen prevention or subrogation identification",
      "No recovery pursuit capability",
      "Basic process automation, not claims intelligence",
    ],
    gap: "Closure admin is necessary but low-value. The high-value closure activities — subrogation pursuit, reopen prevention, quality review — require intelligence that Pace doesn't provide."
  },
};


const ADJUSTER_TIME_SPLIT = [
  { activity: "Admin / data entry", pct: "30-40%", color: "#EF4444" },
  { activity: "Communication", pct: "20-25%", color: "#F59E0B" },
  { activity: "Waiting / follow-up", pct: "15-20%", color: "#EF4444" },
  { activity: "Investigation", pct: "10-15%", color: "#F59E0B" },
  { activity: "Negotiation", pct: "5-10%", color: "#10B981" },
  { activity: "Documentation", pct: "10-15%", color: "#EF4444" },
];

function AdjusterView() {
  const [dd, setDd] = useState(null);
  return (
    <div>
      {/* Summary stats */}
      <div style={{ marginBottom: 8, padding: 8, background: "#FFF", borderRadius: 8, border: "2px solid #6366F1" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 4px", color: "#6366F1" }}>The Adjuster: Central Orchestrator of Every Claim</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {[
            { val: "80-150", label: "PD claims simultaneously", bg: "#EEF2FF", c: "#4F46E5" },
            { val: "60%", label: "time on admin (not decisions)", bg: "#FEF2F2", c: "#DC2626" },
            { val: "2-4h EU", label: "per simple PD claim", bg: "#F0FDF4", c: "#16A34A" },
            { val: "3-7h US", label: "per simple PD claim", bg: "#FEF3C7", c: "#D97706" },
          ].map((s, i) => (
            <div key={i} style={{ padding: 6, background: s.bg, borderRadius: 4, textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.val}</div>
              <div style={{ fontSize: 8, color: s.c }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time allocation bar */}
      <div style={{ marginBottom: 8, padding: 6, background: "#FFF", borderRadius: 6, border: "1px solid #E5E7EB" }}>
        <div style={{ display: "flex", height: 24, borderRadius: 4, overflow: "hidden", marginBottom: 3 }}>
          {ADJUSTER_TIME_SPLIT.map((s, i) => (
            <div key={i} style={{ flex: parseInt(s.pct), background: s.color, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #FFF" }}>
              <span style={{ fontSize: 7, color: "#FFF", fontWeight: 600, textAlign: "center", lineHeight: 1.1 }}>{s.activity}<br/>{s.pct}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, fontSize: 7.5 }}>
          <span style={{ color: "#EF4444", fontWeight: 600 }}>■ Fully automatable</span>
          <span style={{ color: "#F59E0B", fontWeight: 600 }}>■ Partially automatable</span>
          <span style={{ color: "#10B981", fontWeight: 600 }}>■ Human judgment needed</span>
        </div>
      </div>

      {/* Grid — same layout as main blueprint */}
      <div style={{ overflow: "auto", border: "1px solid #D1D5DB", borderRadius: 6, background: "#FFF" }}>
        <div style={{ display: "grid", gridTemplateColumns: `120px repeat(${ADJ_PHASES.length}, 150px)`, minWidth: 120 + ADJ_PHASES.length * 150 }}>
          {/* Phase headers */}
          <div style={{ padding: 3, background: "#1F2937", color: "#FFF", fontSize: 7, fontWeight: 700, position: "sticky", left: 0, zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #000" }}>
            ROLE ↓ PHASE →
          </div>
          {ADJ_PHASES.map(p => (
            <div key={p.id} style={{ padding: 2, background: p.color, color: "#FFF", fontSize: 7.5, fontWeight: 700, textAlign: "center", whiteSpace: "pre-line", borderBottom: "2px solid #000", borderRight: "1px solid rgba(255,255,255,0.2)" }}>{p.label}</div>
          ))}

          {/* Adjuster row */}
          <div style={{ padding: 3, background: "#6366F1", color: "#FFF", fontSize: 8, fontWeight: 700, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "sticky", left: 0, zIndex: 10, borderBottom: "2px solid #4F46E5", lineHeight: 1.1 }}>
            <div>🔧 Adjuster</div>
            <div style={{ fontSize: 6.5, fontWeight: 400, opacity: 0.85 }}>Activities + Pain Points</div>
          </div>
          {ADJ_PHASES.map(p => {
            const items = ADJ[`adjuster-${p.id}`];
            if (!items) return <div key={p.id} style={{ borderRight: "1px solid #E5E7EB", borderBottom: "2px solid #4F46E5", background: "#FAFAFA" }} />;
            return (
              <div key={p.id} style={{ padding: 2, borderRight: "1px solid #E5E7EB", borderBottom: "2px solid #4F46E5", background: "#FFF", display: "flex", flexDirection: "column", gap: 1 }}>
                {items.map((item, i) => {
                  const s = TS[item.y] || TS.action;
                  return <div key={i} style={{ padding: "1.5px 4px", borderRadius: 2, fontSize: 8, lineHeight: 1.2, background: s.bg, border: `1px solid ${s.bd}`, color: s.tx, fontWeight: item.y === "friction" ? 600 : 400 }}>{item.t}</div>;
                })}
              </div>
            );
          })}

          {/* Separator: competitors section */}
          <div style={{ gridColumn: `1 / span ${ADJ_PHASES.length + 1}`, padding: "2px 6px", background: "#F0FDF4", fontSize: 8, fontWeight: 700, color: "#166534", borderBottom: "1px solid #86EFAC", borderTop: "1px solid #86EFAC" }}>
            HOW COMPETITORS MAKE THE ADJUSTER 10x BETTER
          </div>

          {/* Competitor rows */}
          {ADJ_COMPETITORS.map(comp => (
            <div key={comp.id} style={{ display: "contents" }}>
              <div style={{ padding: 3, background: comp.color, color: "#FFF", fontSize: 7.5, fontWeight: 600, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "sticky", left: 0, zIndex: 10, borderBottom: "1px solid #E5E7EB", lineHeight: 1.1, minHeight: 40 }}>
                <div style={{ whiteSpace: "pre-line" }}>{comp.label}</div>
                <div style={{ fontSize: 6, opacity: 0.8, fontWeight: 400 }}>{comp.funding} · {comp.type}</div>
              </div>
              {ADJ_PHASES.map(p => {
                const items = ADJ[`${comp.id}-${p.id}`];
                if (!items) return <div key={p.id} style={{ borderRight: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 40 }}>
                  <span style={{ fontSize: 7, color: "#D1D5DB" }}>—</span>
                </div>;
                const dk = `${comp.id}-${p.id}`;
                const hasDeep = !!COMP_DEEP[dk];
                return (
                  <div key={p.id} onClick={hasDeep ? () => setDd(dd === dk ? null : dk) : undefined}
                    style={{ padding: 2, borderRight: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", background: dd === dk ? "#ECFDF5" : comp.color + "08", display: "flex", flexDirection: "column", gap: 1, minHeight: 40, cursor: hasDeep ? "pointer" : "default", outline: dd === dk ? "2px solid #10B981" : "none", transition: "all 0.15s" }}
                    onMouseEnter={hasDeep ? (e) => { e.currentTarget.style.background = "#F0FDF4"; } : undefined}
                    onMouseLeave={hasDeep ? (e) => { e.currentTarget.style.background = dd === dk ? "#ECFDF5" : comp.color + "08"; } : undefined}>
                    {items.map((item, i) => (
                      <div key={i} style={{ padding: "1.5px 4px", borderRadius: 2, fontSize: 8, lineHeight: 1.2, background: "#D1FAE5", border: "1px solid #86EFAC", color: "#065F46" }}>{item.t}</div>
                    ))}
                    {hasDeep && <div style={{ fontSize: 6.5, color: "#059669", fontWeight: 600, textAlign: "center", marginTop: 1 }}>🔍 click for deep-dive</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>


      {/* Deep-dive panel */}
      {dd && COMP_DEEP[dd] && (() => {
        const d = COMP_DEEP[dd];
        const parts = dd.split("-");
        const compId = parts[0];
        const phaseId = parts.slice(1).join("-");
        const comp = ADJ_COMPETITORS.find(c => c.id === compId);
        const phase = ADJ_PHASES.find(p => p.id === phaseId);
        if (!comp || !phase) return null;
        return (
          <div style={{ marginTop: 8, background: "#FFF", borderRadius: 8, border: "2px solid #10B981", padding: 12, position: "relative" }}>
            <button onClick={() => setDd(null)} style={{ position: "absolute", top: 6, right: 8, background: "none", border: "none", fontSize: 14, cursor: "pointer", color: "#6B7280" }}>✕</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ padding: "4px 8px", background: comp.color, color: "#FFF", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{comp.label.replace("\n", " ")}</div>
              <div style={{ padding: "4px 8px", background: phase.color, color: "#FFF", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{phase.label.replace("\n", " ")}</div>
              <span style={{ fontSize: 8, color: "#6B7280" }}>{comp.funding} · {comp.type}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#065F46", marginBottom: 3, padding: "2px 4px", background: "#D1FAE5", borderRadius: 3, display: "inline-block" }}>What They Do</div>
                <p style={{ fontSize: 9, color: "#374151", margin: "0 0 8px", lineHeight: 1.4 }}>{d.what}</p>

                <div style={{ fontSize: 9, fontWeight: 700, color: "#1E40AF", marginBottom: 3, padding: "2px 4px", background: "#DBEAFE", borderRadius: 3, display: "inline-block" }}>How (Technically)</div>
                <p style={{ fontSize: 9, color: "#374151", margin: "0 0 8px", lineHeight: 1.4 }}>{d.how}</p>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#991B1B", marginBottom: 3, padding: "2px 4px", background: "#FEE2E2", borderRadius: 3, display: "inline-block" }}>Limitations & Gaps</div>
                {d.limits.map((l, i) => (
                  <div key={i} style={{ fontSize: 8.5, color: "#991B1B", marginBottom: 2, paddingLeft: 8, position: "relative", lineHeight: 1.3 }}>
                    <span style={{ position: "absolute", left: 0 }}>✗</span> {l}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 8, padding: 6, background: "#EEF2FF", borderRadius: 4, border: "1px solid #C7D2FE" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#4F46E5", marginBottom: 2 }}>🎯 Gap for Mysa</div>
              <p style={{ fontSize: 9, color: "#3730A3", margin: 0, lineHeight: 1.4 }}>{d.gap}</p>
            </div>
          </div>
        );
      })()}

      {/* Adjuster of 2027 Vision */}
      <div style={{ marginTop: 8, padding: 10, background: "#EEF2FF", borderRadius: 8, border: "2px solid #6366F1" }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, margin: "0 0 6px", color: "#4F46E5" }}>The "Adjuster of 2027" — What Mysa Enables</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#DC2626", marginBottom: 4 }}>TODAY (100 PD claims)</div>
            {["30-40% time on data entry and admin","Manually reads paper EAS, types into CMS","20+ phone calls/day (2/3 → voicemail)","Context-switches between 5-7 systems","Misses subrogation opportunities","Manual diary = error-prone prioritization"].map((t,i) => (
              <div key={i} style={{ fontSize: 8.5, color: "#991B1B", marginBottom: 1 }}>✗ {t}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", marginBottom: 4 }}>MYSA-ENABLED (200+ PD claims)</div>
            {["AI extracts all docs → structured data in seconds","Convention matching automated for 70-80% EU claims","AI pre-drafts liability with evidence summary","Automated follow-ups reduce phone time by 50%","Single interface — no context-switching","Subrogation flagged from day 1, intelligent diary"].map((t,i) => (
              <div key={i} style={{ fontSize: 8.5, color: "#065F46", marginBottom: 1 }}>✓ {t}</div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 8, padding: 6, background: "#FFF", borderRadius: 4, textAlign: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#4F46E5" }}>The adjuster doesn't disappear. The adjuster becomes 2-3x more productive.</span>
        </div>
      </div>
    </div>
  );
}


function Cell({ aid, pid, onFork }) {
  const items = C[`${aid}-${pid}`];
  if (!items) return <div style={{ minHeight: 46, borderRight: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", background: "#FAFAFA" }}/>;
  return (
    <div style={{ padding: 2, borderRight: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", background: "#FFF", display: "flex", flexDirection: "column", gap: 1 }}>
      {items.map((item, i) => {
        const s = TS[item.y] || TS.action;
        return <div key={i} onClick={item.f ? () => onFork(item.f) : undefined}
          style={{ padding: "1.5px 4px", borderRadius: 2, fontSize: 8, lineHeight: 1.2, background: s.bg, border: `1px solid ${s.bd}`, color: s.tx, fontWeight: item.y==="fork"?700:400, cursor: item.f?"pointer":"default" }}
          onMouseEnter={item.f?(e)=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.15)";}:undefined}
          onMouseLeave={item.f?(e)=>{e.currentTarget.style.boxShadow="none";}:undefined}
        >{item.f?"🔍 ":""}{item.t}</div>;
      })}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("blueprint");
  const [af, setAf] = useState(null);
  let lg = null;

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#F9FAFB", minHeight: "100vh", padding: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Claims Journey — Service Blueprint</h1>
          <p style={{ fontSize: 9, color: "#6B7280", margin: 0 }}>Motor + Home · EU vs US · {ACTORS.length} Actors · {PHASES.length} Phases</p>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {[["blueprint","📋 Blueprint"],["adjuster","👤 Adjuster"],["forks","⚡ Forks"],["competitors","🏢 Competitors"]].map(([v,l])=>(
            <button key={v} onClick={()=>{setView(v);if(v==="blueprint")setAf(null);}}
              style={{ padding:"4px 9px", fontSize:9, fontWeight:600, borderRadius:4, border:"1px solid #D1D5DB", background:view===v?"#111827":"#FFF", color:view===v?"#FFF":"#374151", cursor:"pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      {view==="blueprint"&&(
        <>
          <div style={{ display:"flex", gap:2, flexWrap:"wrap", marginBottom:4 }}>
            {Object.entries({action:"Action",fork:"⚡Fork",friction:"⚠️Friction",eu:"🇪🇺EU",us:"🇺🇸US","path-a":"Yes","path-b":"No","path-c":"Alt",doc:"Doc",todo:"TBD"}).map(([t,l])=>(
              <span key={t} style={{fontSize:7,padding:"0.5px 3px",borderRadius:2,background:TS[t].bg,border:`1px solid ${TS[t].bd}`,color:TS[t].tx}}>{l}</span>
            ))}
          </div>
          <div style={{ overflow:"auto", border:"1px solid #D1D5DB", borderRadius:6, background:"#FFF" }}>
            <div style={{ display:"grid", gridTemplateColumns:`110px repeat(${PHASES.length},150px)`, minWidth:110+PHASES.length*150 }}>
              <div style={{ padding:3, background:"#1F2937", color:"#FFF", fontSize:7, fontWeight:700, position:"sticky", left:0, zIndex:20, display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"2px solid #000" }}>
                ACTORS↓ PHASES→
              </div>
              {PHASES.map(p=>(
                <div key={p.id} style={{ padding:2, background:p.color, color:"#FFF", fontSize:7.5, fontWeight:700, textAlign:"center", whiteSpace:"pre-line", borderBottom:"2px solid #000", borderRight:"1px solid rgba(255,255,255,0.2)" }}>{p.label}</div>
              ))}
              {ACTORS.map(actor=>{
                const sg=actor.group!==lg;
                lg=actor.group;
                return <div key={actor.id} style={{display:"contents"}}>
                  {sg&&<div style={{gridColumn:`1/span ${PHASES.length+1}`,padding:"1.5px 5px",background:"#E5E7EB",fontSize:7.5,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.03em",borderBottom:"1px solid #D1D5DB"}}>{GL[actor.group]}</div>}
                  <div style={{padding:2,background:actor.color,color:"#FFF",fontSize:7.5,fontWeight:600,textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",position:"sticky",left:0,zIndex:10,borderBottom:"1px solid #E5E7EB",minHeight:46,lineHeight:1.1}}>{actor.label}</div>
                  {PHASES.map(p=><Cell key={`${actor.id}-${p.id}`} aid={actor.id} pid={p.id} onFork={(fid)=>{setView("forks");setAf(fid);}}/>)}
                </div>;
              })}
            </div>
          </div>
        </>
      )}

      {view==="forks"&&(
        <div>
          <div style={{display:"flex",gap:3,marginBottom:8,flexWrap:"wrap"}}>
            {Object.entries(FORKS).map(([id,f])=>(
              <button key={id} onClick={()=>setAf(id)} style={{padding:"4px 7px",fontSize:8.5,fontWeight:600,borderRadius:4,border:"1px solid #D1D5DB",background:af===id?"#FEF3C7":"#FFF",color:af===id?"#92400E":"#374151",cursor:"pointer"}}>{f.title}</button>
            ))}
          </div>
          {af&&FORKS[af]?<ForkView fork={FORKS[af]}/>:<p style={{fontSize:11,color:"#6B7280"}}>Select a fork above.</p>}
        </div>
      )}

      {view==="adjuster"&&<AdjusterView />}

      {view==="competitors"&&<CompetitorView />}

      <div style={{marginTop:6,padding:5,background:"#FEF3C7",borderRadius:4,border:"1px solid #F59E0B"}}>
        <p style={{fontSize:8.5,color:"#92400E",margin:0}}><strong>Progress:</strong> Motor Phases 0-11 COMPLETE (all 12 phases mapped, 9 actors each). 12 competitors mapped. Forks 1-12 available. Settlement path (Fork 12): Cash vs DRP vs Total Loss vs BI.</p>
      </div>
    </div>
  );
}
