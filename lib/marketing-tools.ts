export const toolsReviewed = "2026-10-29";

export const toolCategories = [
  {
    slug: "video-creation",
    name: "Video Creation",
    description: "Compare presenter-led generation, recorded-media editing and the work needed to publish a useful video.",
    article: "heygen-vs-synthesia-vs-descript",
    tools: [
      { name: "HeyGen", url: "https://www.heygen.com/pricing", summary: "Avatar-led video, translation and generated media.", check: "Check generation credits, output rights and the exact export allowance." },
      { name: "Synthesia", url: "https://www.synthesia.io/pricing", summary: "Script-led avatar video and team video workflows.", check: "Check credits, video allowances, reviewer access and branding limits." },
      { name: "Descript", url: "https://www.descript.com/pricing", summary: "Text-based audio/video editing, recording and AI assistance.", check: "Check media hours, AI credits and editor-seat requirements." },
    ],
    tips: ["Test one approved script across your shortlist.", "Review pronunciation, captions and the final export.", "Keep likeness permissions separate from software access."],
  },
  {
    slug: "social-media",
    name: "Social Media",
    description: "Choose a publishing, collaboration and reporting workflow your team can actually maintain.",
    article: "buffer-vs-hootsuite-vs-later",
    tools: [
      { name: "Buffer", url: "https://buffer.com/pricing", summary: "Social publishing, collaboration and channel-based planning.", check: "Count connected channels and verify each required post format." },
      { name: "Hootsuite", url: "https://www.hootsuite.com/plans", summary: "Publishing, inbox, analytics and listening capabilities.", check: "Confirm the plan, profiles, seats and depth of reporting required." },
      { name: "Later", url: "https://later.com/pricing/", summary: "Social scheduling, analytics and collaboration by plan.", check: "Check Social Sets, users, post allowances and reporting history." },
    ],
    tips: ["Separate a draft from an approved post.", "Test the actual networks and account types you use.", "Measure enquiries as well as publishing activity."],
  },
  {
    slug: "crm",
    name: "CRM & Lead Management",
    description: "Organise enquiries, ownership and follow-up before buying a more complicated sales stack.",
    article: "hubspot-vs-pipedrive-vs-zoho-crm",
    tools: [
      { name: "HubSpot", url: "https://www.hubspot.com/products/crm", summary: "Contact, deal and activity management within a wider platform.", check: "Separate free CRM needs from paid product and seat requirements." },
      { name: "Pipedrive", url: "https://www.pipedrive.com/en/pricing", summary: "Lead, deal, contact and sales-activity management.", check: "Check per-seat billing and plan-specific email or workflow functions." },
      { name: "Zoho CRM", url: "https://help.zoho.com/portal/en/kb/crm/getting-started/articles/choose-your-path-edition-and-role-guide", summary: "CRM editions with pipeline, workflow and customisation options.", check: "Choose the edition and roles against your real operating process." },
    ],
    tips: ["Give every enquiry a named owner and next action.", "Clean records before importing them.", "Test a complete handoff from website to follow-up."],
  },
  {
    slug: "email-campaigns",
    name: "Email & Campaigns",
    description: "Compare audience management, newsletters and campaign automation without ignoring consent or operating costs.",
    article: "mailchimp-vs-brevo-vs-kit",
    tools: [
      { name: "Mailchimp", url: "https://mailchimp.com/pricing/marketing/", summary: "Email campaigns, audience tools and marketing automation.", check: "Review contact counts, send allowances, plan features and overages." },
      { name: "Brevo", url: "https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans", summary: "Email and multichannel marketing options across plans.", check: "Check email volume, contact storage and any channel add-ons." },
      { name: "Kit", url: "https://kit.com/pricing", summary: "Creator email, forms, tagging and automation options.", check: "Check subscriber tiers, sequence access and commerce terms." },
    ],
    tips: ["Choose one useful audience promise before building a sequence.", "Test signup, suppression and unsubscribe behaviour.", "Separate message delivery from commercial outcomes."],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    description: "Connect marketing workflows with or without AI, while keeping approvals, failures and data access visible.",
    article: "zapier-vs-make-vs-n8n",
    tools: [
      { name: "Zapier", url: "https://zapier.com/pricing", summary: "Trigger-and-action workflows with AI-related capabilities.", check: "Model task consumption and verify the required app actions." },
      { name: "Make", url: "https://www.make.com/pricing", summary: "Scenario-based workflows between applications.", check: "Model credits, branches, error handling and external AI costs." },
      { name: "n8n", url: "https://n8n.io/pricing/", summary: "Workflow automation with execution-based plan allowances.", check: "Evaluate deployment ownership, executions and governance needs." },
    ],
    tips: ["Start with deterministic steps before adding AI judgement.", "Require review before an external message or account change.", "Test duplicates, failures and a safe stop procedure."],
  },
] as const;

export type ToolCategory = (typeof toolCategories)[number];
export type ToolCategorySlug = ToolCategory["slug"];
export const findToolCategory = (slug: string) => toolCategories.find((category) => category.slug === slug);
