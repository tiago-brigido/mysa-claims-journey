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

// Remaining phases placeholder
["investigation","assessment","decision","settlement","close"].forEach(p => {
  ["policyholder","insurer_handler","documents"].forEach(a => {
    if (!C[`${a}-${p}`]) C[`${a}-${p}`] = [{ t: "TO BE MAPPED", y: "todo" }];
  });
});

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
};

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
          {[["blueprint","📋 Blueprint"],["forks","⚡ Forks"]].map(([v,l])=>(
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

      <div style={{marginTop:6,padding:5,background:"#FEF3C7",borderRadius:4,border:"1px solid #F59E0B"}}>
        <p style={{fontSize:8.5,color:"#92400E",margin:0}}><strong>Progress:</strong> Motor Phases 0-6 mapped. Home/Property FNOL & Adjuster workflow added (Fork 7-8). Click 🔍 forks for detail flows. Motor Phases 7-11 next.</p>
      </div>
    </div>
  );
}
