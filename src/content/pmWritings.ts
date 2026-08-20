export type PMWritingSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  numberedPoints?: {
    title: string;
    body: string;
  }[];
};

export type PMWriting = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  readTime: string;
  introduction: string[];
  sections: PMWritingSection[];
};

export const pmWritings: PMWriting[] = [
  {
    slug: "clarity-is-a-product-decision",
    title: "Clarity Is a Product Decision",
    description:
      "Why clarity is not a final communication step, but a product decision that has to survive contact with a real spec.",
    topic: "Product Leadership",
    readTime: "5 min read",
    introduction: [
      "People talk about clarity like it's a writing skill, something you apply at the end, when it's time to turn the messy internal version of a plan into a clean external one. I used to think that too. I don't anymore.",
      "Clarity isn't a communication step. It's a product decision, made early, that either survives contact with a real spec or doesn't.",
    ],
    sections: [
      {
        heading: "The KR that wasn't actually a KR",
        paragraphs: [
          "I recently reworked a set of Key Results for an internal documentation and workflow effort. The original KRs were percentage-based: reduce failed states by X%, improve completion rate by Y%. They looked rigorous. They had numbers in them. Nobody could tell you what they actually meant.",
          "A percentage needs a stable denominator to mean anything, and the denominator here, the total number of relevant events, moved constantly depending on team activity, seasonality, and which parts of the system were even being exercised that week. So \"reduce failed states by 20%\" was quietly unfalsifiable. You could hit the number because the underlying activity dropped, or miss it while genuinely fixing the problem. Nobody would know which had happened.",
          "I rewrote them as counts: number of dead ends encountered, number of stuck states, number of PR build loops. Auditable. A specific number, tied to a specific log, that a specific person could go pull and check. No interpretation required.",
          "That's a small example, but it's the whole argument in miniature. The percentage version felt more precise because it had more decimal places. The count version was more precise because it was actually checkable. Clarity isn't about sounding rigorous. It's about whether someone else can verify you were right without asking you what you meant.",
        ],
      },
      {
        heading: "Why this gets skipped",
        paragraphs: [
          "Ambiguity is comfortable for the person writing the spec because it defers every hard tradeoff to whoever implements it. \"Improve reliability\" doesn't require you to decide what reliability means, who's accountable when it's ambiguous, or what happens when two reasonable people disagree about whether it improved. A precise definition requires you to make those calls now, in front of stakeholders, where you might be wrong.",
          "This is why vague specs survive review so easily. Nobody can object to something that hasn't actually claimed anything yet. The cost shows up three weeks later, in a standup, when two engineers have built against two different interpretations of the same sentence and neither is wrong according to what was written.",
          "A PM's real job in that moment isn't to write more words. It's to have already made the decision that the words were hiding.",
        ],
      },
      {
        heading: "What clarity actually costs you",
        paragraphs: [
          "Being precise is riskier than being vague, and that's exactly why it's a product decision and not a writing exercise. A precise spec can be wrong in a way a vague one can't. You've committed to a definition, a threshold, an owner, and if you got any of those wrong, it's visible and attributable to you. Vagueness protects the author. Clarity exposes them.",
          "That tradeoff is the actual job. Choosing to be specific about what \"done\" means, who's accountable when a metric is ambiguous, and what happens in the edge case nobody wants to think about is a decision you make on purpose. You know it costs you the safety of being impossible to pin down later.",
          "The best specs I've written weren't the ones with the most detail. They were the ones where I'd already had the uncomfortable conversation, with myself or with a skeptical engineer, about what would happen if the easy interpretation and the hard interpretation diverged. Then I picked one, in writing, before anyone could quietly default to whichever was more convenient.",
          "Clarity, in that sense, isn't downstream of the decision. It is the decision, just written down where people can hold you to it.",
        ],
      },
    ],
  },
  {
    slug: "the-pm-work-between-the-milestones",
    title: "The PM Work Between the Milestones",
    description:
      "The invisible product management work that happens between roadmap milestones and determines whether those milestones mean anything.",
    topic: "Ways of Working",
    readTime: "6 min read",
    introduction: [
      "Every roadmap has the same shape: a row of diamonds, each one a milestone, connected by a thin line that implies the space between them is just... time passing. Design review. Beta. GA. The line between the diamonds looks empty on the slide.",
      "It isn't. That line is most of the job.",
    ],
    sections: [
      {
        heading: "What actually happens in the gap",
        paragraphs: [
          "Between \"spec approved\" and \"design review,\" someone has to notice that two teams read the same requirement differently and are quietly building incompatible things. Between \"beta\" and \"GA,\" someone has to decide whether a bug that only shows up under a specific account type is a blocker or a known issue, with real consequences either way and no clean rule to apply. Between \"approved\" and \"shipped,\" someone has to keep going back to an engineering lead who's now three sprints deep and doesn't want to hear that the requirement shifted, and make the case for why it has to shift anyway.",
          "None of that is on the roadmap. None of it produces a diamond. All of it determines whether the next diamond happens on time, happens at all, or happens as something quietly different from what was promised.",
          "I've noticed the PMs who look the most in control aren't the ones with the cleanest roadmap slides. They're the ones who've done this invisible work so consistently that the milestones just... land, on schedule, matching spec, without anyone downstream having to absorb the cost of decisions that didn't get made. From the outside that looks like nothing happened. From the inside, that's the whole job.",
        ],
      },
      {
        heading: "Why it is invisible by design",
        paragraphs: [
          "The work between milestones resists being logged because most of it doesn't resolve into an artifact. You don't ship the Slack thread where you talked an engineer out of a scope-creep \"quick fix\" that would've broken the permission model three months later. You don't put \"had the uncomfortable conversation about why the metric everyone liked was actually unmeasurable\" on a slide. It just becomes the reason the next milestone was clean.",
          "This creates a real incentive problem. If you're rewarded on milestones, and the milestone work is visible while the gap work isn't, the rational move is to under-invest in the gap and over-invest in milestone theater: polished reviews, clean-looking dashboards, and decks that make progress legible even when the underlying work is shaky. I've watched teams get very good at producing the appearance of the diamond without doing the work that makes the diamond durable. It always shows up later, usually right when it's most expensive to fix.",
        ],
      },
      {
        heading: "What the gap work actually looks like",
        paragraphs: ["It is rarely dramatic. It is:"],
        bullets: [
          "Catching a misalignment in interpretation before it becomes two incompatible implementations, which means reading specs closely enough to notice ambiguity other people glossed over.",
          "Making a judgment call on an edge case with no clean precedent, and being willing to own that call instead of escalating it to make it someone else's problem.",
          "Going back to a stakeholder with bad news early, when it is still cheap, instead of waiting until it is undeniable and expensive.",
          "Saying no to a scope addition that would look fine on this milestone and cause real damage two milestones from now, and having the technical grounding to know the difference.",
        ],
      },
      {
        heading: "The actual measure of the job",
        paragraphs: [
          "That last point is why the gap work is so tied to actually understanding the system you're building on. You can't make a good call about whether a shortcut is safe if you don't understand what it's a shortcut around. The PMs who do the gap work well are usually the ones who went and learned enough about the token flow, the data model, and the failure modes to know which corners are load-bearing and which aren't. That knowledge doesn't come from the roadmap either.",
          "If you want to know whether a PM is good, don't look at whether the milestones happened. Milestones mostly happen regardless. Someone will always ship something by the deadline. Look at what the thing looks like when it ships, whether the team that built it is still functional afterward, and whether the next milestone is easier or harder because of choices made in the gap before it.",
          "The roadmap is the record of what got decided. The work between the milestones is where it actually got decided. One of those is visible. Only one of them is the job.",
        ],
      },
    ],
  },
  {
    slug: "why-most-companies-get-agent-permissioning-wrong",
    title: "Why Most Companies Get Agent-to-Agent Permissioning Wrong",
    description:
      "Why static human access models break in agentic workflows, and what task-scoped, intent-aware permissioning needs to look like.",
    topic: "AI & Security",
    readTime: "6 min read",
    introduction: [
      "Every enterprise I've watched race toward \"agentic\" workflows in the last year has made some version of the same mistake. They've bolted agent permissioning onto systems designed for a completely different threat model. RBAC, OAuth scopes, and API keys were built to answer one question: does this human, sitting at this session, have the right to do this thing right now?",
      "That question doesn't hold up when the actor isn't a human anymore.",
    ],
    sections: [
      {
        heading: "The assumption that breaks",
        paragraphs: [
          "Traditional access control assumes a permission grant is a snapshot of intent. A user logs in, requests are made under their identity, and the system trusts that every action in that session reflects something the user actually meant to do. The human is the checkpoint. Even in delegated systems, such as a script running under a service account or a webhook triggered on someone's behalf, there is still a single, traceable point where a person decided this should happen.",
          "Agents don't work that way. An agent is given a goal, not a request. It then makes a sequence of its own decisions about which tools to call, which data to touch, and which other agents to hand work off to. The original human never explicitly authorized those decisions and often couldn't have anticipated them. The permission boundary a company thinks it has, the agent's API key or its RBAC role, ends up authorizing the goal. The actual risk lives in the path the agent takes to get there.",
          "Most companies don't notice this gap until an agent does something technically inside its scope but clearly outside its intent. It reads a dataset it was permissioned for but never should have touched for that task, or hands a sensitive tool call to a second agent that inherits access nobody meant to extend.",
        ],
      },
      {
        heading: "Three places the current model fails",
        numberedPoints: [
          {
            title: "Permission is granted at the identity level, not the interaction level.",
            body: "A single \"agent has access to Salesforce\" grant collapses hundreds of distinct actions into one binary yes: read a contact, export a list, modify a deal stage, or delete a record. Humans get away with this because social and procedural friction fills the gap. A person could delete every record, but doesn't, because they understand consequence. Agents have no equivalent friction. If the scope allows it, an agent will eventually do it because nothing internal to the agent says \"technically allowed\" and \"actually intended\" are different things.",
          },
          {
            title: "Delegation is treated as inheritance, not negotiation.",
            body: "When Agent A calls Agent B, most current implementations just pass the token forward. B now effectively has A's permissions. This is the equivalent of giving your house keys to whoever your assistant happens to call on your behalf. What should happen instead is scoped, purpose-bound delegation. B gets exactly the narrow slice of access required for the specific sub-task, time-boxed, and revocable independent of A's own token. This is precisely the kind of interoperability problem protocols like A2A are trying to solve. It is also where most early implementations quietly punt because narrow delegation is genuinely hard to design and even harder to make performant.",
          },
          {
            title: "Audit trails answer \"was this allowed\" instead of \"was this intended.\"",
            body: "Every enterprise I have seen can tell you, after the fact, whether an agent's action fell within its granted scope. Almost none can tell you whether that action matched what the human who kicked off the workflow actually wanted. Those are different questions, and only the second one is useful when something goes wrong.",
          },
        ],
      },
      {
        heading: "What better looks like",
        paragraphs: [
          "The systems that will hold up aren't the ones with tighter RBAC roles. They're the ones that stop treating permission as a static grant and start treating it as a live negotiation, scoped to task, propagated with intent attached, and re-evaluated at each hop rather than inherited wholesale. Concretely, that means:",
        ],
        bullets: [
          "Task-scoped tokens, not identity-scoped ones. A permission should expire with the task it was issued for, not with the session.",
          "Explicit, narrow delegation contracts between agents. A downstream agent's access should be a subset defined by the task, not a copy of the upstream agent's full grant.",
          "Intent as a first-class object in the authorization decision, not just a comment in a log. The system should be able to ask \"does this action serve the stated goal\" as a real check, not a retrospective one.",
          "Revocation that cascades. If you pull the plug on Agent A mid-workflow, every permission it delegated downstream needs to die with it immediately, not at the next token refresh.",
        ],
      },
      {
        heading: "The real advantage",
        paragraphs: [
          "None of this is exotic. It is the same principle behind least-privilege access that security teams have preached for a decade. It just has to be re-implemented for a world where the \"user\" making the request is a probabilistic system taking a sequence of self-directed actions rather than a person clicking a button once.",
          "Companies that get this right won't be the ones with the most sophisticated agents. They'll be the ones whose permission model assumes the agent will eventually do something no one explicitly told it to do, and has already decided what happens next.",
        ],
      },
    ],
  },
];

export function getPMWriting(slug: string) {
  return pmWritings.find((writing) => writing.slug === slug);
}
