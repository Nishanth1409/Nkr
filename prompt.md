You are writing a concise portfolio entry for this repository. First, scan the codebase to extract facts; then combine them with the overrides I provide from my resume and prior descriptions.

Rules:

- Tone: clear, concrete, recruiter-friendly. Avoid fluff.
- Tense: present continuous (“being built”, “is implementing”).
- Use repo facts as the base truth; only include features/metrics present in code/docs OR in my overrides.
- Prefer outcomes and capabilities over stack dumps.

Repository scan (read-only guide):

- Read high-signal files: README, docs/**, public/docs/**, package.json, src/pages/**, src/components/**, server/**, supabase/**/\*.sql, infra/\*\*.
- Identify: purpose, user flows, standout capabilities (automation, realtime, access control, scheduling, reporting/analytics), UX traits (responsive, accessible, design system), security/controls (RBAC, RLS), integrations, any true metrics.

Overrides (use as authoritative if present; otherwise rely on repo):

- Resume bullets (verbatim or summarized):
  [PASTE_RELEVANT_RESUME_BULLETS_HERE]
- Previous portfolio descriptions (short paragraphs or one-liners):
  [PASTE_PREVIOUS_DESCRIPTIONS_HERE]
- Must-include items (single words/phrases; only if true): [ITEM_1], [ITEM_2], [ITEM_3]
- Words/phrases to avoid: [WORDS_TO_AVOID]

Output exactly:

1. Summary (25–35 words, present continuous): Describe what the platform is doing for users; highlight 2–3 concrete repo-backed or override-backed capabilities. Do not list the tech stack unless it’s essential to understanding a capability (e.g., “RBAC with RLS”).
2. Bullets (2–3 items, one sentence each; mixed weight allowed):
   - Bullet A: strongest real-world outcome/capability (include one true metric if provided).
   - Bullet B: another concrete capability (UX, automation, collaboration, reporting, RBAC/RLS, scheduling).
   - Bullet C (optional): a differentiator grounded in code or overrides.

Constraints:

- No invented features/metrics.
- Prefer simple nouns/verbs over adjectives.
- Keep it skimmable; no more than 3 bullets.

Now, perform:

1. Scan the repo per the guide and list 5–8 factual highlights (no prose, just bullets).
2. Cross-check with my overrides; if conflicts, prefer overrides and note which items were overridden.
3. Produce the final summary and bullets per the Output spec.
