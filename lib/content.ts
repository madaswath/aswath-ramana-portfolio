export const person = {
  name: "Aswath Ramana",
  role: "Senior Generative AI Engineer",
  location: "Chennai, India",
  email: "aswath.ramana6@gmail.com",
  phone: "+91 8344022298",
  linkedin: "https://linkedin.com/in/aswath-ramana",
  github: "https://github.com/madaswath",
  summary:
    "Senior Generative AI Engineer with 7 years of experience delivering AI, ML, and enterprise automation for banking, insurance, and financial services. The work focuses on agentic AI systems and RAG applications, text-to-SQL and intelligent document processing, and ML and NLP for banking compliance. Delivery is on AWS and Azure, including Amazon S3, Azure OpenAI, Azure AI Foundry, Azure AI Search, Azure Speech Services, Azure Bot Service, Azure Functions, and Azure Logic Apps, using Python, LangGraph, and LangChain. Technical delivery runs from requirements and architecture through implementation, testing, deployment, and client handover.",
} as const;

export const metrics = [
  {
    figure: "55% → 10%",
    label: "False-positive rate",
    detail: "Sanctions screening on millions of banking transactions.",
  },
  {
    figure: "~3 days → ~3 hours",
    label: "Daily review time",
    detail: "Flagged-transaction batches, with 2% escalated for manual review.",
  },
  {
    figure: "1,000+",
    label: "Employees evaluated",
    detail: "Insurance voice simulator for product knowledge, customer handling, and empathy.",
  },
  {
    figure: "5–6",
    label: "Developers led",
    detail: "Mentored 2–3 junior engineers on RAG, microservices, and agent orchestration.",
  },
  {
    figure: "5–20 sec",
    label: "BI response time",
    detail: "Assistant over thousands of insurance documents, SharePoint files, charts, and database records.",
  },
  {
    figure: "4,000+",
    label: "Fastener products",
    detail: "Inventory catalogue for quotation pricing, stock validation, procurement, and delivery.",
  },
] as const;

export type Project = {
  name: string;
  context: string;
  type: string;
  challenge: string;
  approach: readonly string[];
  outcome: string;
  tools: readonly string[];
  placement: "featured" | "supporting" | "further";
};

export const projects: readonly Project[] = [
  {
    name: "Enterprise Finance & Operations Chatbot",
    context: "Qentelli — Big Four Client",
    type: "Finance chatbot",
    challenge:
      "Reporting data was distributed among departmental systems and teams. Leadership needed one conversational view of financial, workforce, infrastructure, operations, and marketing information.",
    approach: [
      "Built the platform from scratch and coordinated data access across Finance, HR, Infrastructure, Marketing, and Operations.",
      "Designed specialist agents for HR resource onboarding, infrastructure spend, finance budgets and P&L, and marketing digital-spend and reach analysis.",
      "Implemented LangGraph workflow orchestration to route questions, combine departmental findings, and supervise final responses.",
      "Added Azure AI Search retrieval, structured outputs, schema validation, guardrails, and human escalation for exception scenarios.",
    ],
    outcome:
      "Delivered event-driven integrations through Azure Bot Service, Azure Functions, and Azure Logic Apps.",
    tools: [
      "Python",
      "LangGraph",
      "LangChain",
      "Azure OpenAI",
      "Azure AI Foundry",
      "Azure AI Search",
      "Azure Bot Service",
      "Azure Functions",
      "Azure Logic Apps",
      "Groq API",
    ],
    placement: "featured",
  },
  {
    name: "AI for BI — Business Intelligence Assistant",
    context: "EY GDS",
    type: "Business intelligence assistant",
    challenge:
      "Users needed faster access to insights across insurance documents, SharePoint files, charts, dashboards, and transactional systems.",
    approach: [
      "Built LangGraph and LangChain RAG modules over thousands of insurance documents, SharePoint files, charts, and data sources.",
      "Implemented APScheduler-based ingestion to refresh indexed knowledge.",
      "Designed schema-validated text-to-SQL workflows against PostgreSQL.",
      "Led regression testing, AWS release delivery across two phases, and application handover to the client.",
    ],
    outcome: "Response times of 5–20 seconds based on query complexity and conversation length.",
    tools: [
      "Python",
      "LangGraph",
      "LangChain",
      "OpenAI GPT-4",
      "PostgreSQL",
      "SharePoint",
      "Amazon S3",
      "AWS",
      "APScheduler",
      "GitLab",
      "CloudBees CI/CD",
    ],
    placement: "supporting",
  },
  {
    name: "Mock Call Simulator — Insurance Employee Training",
    context: "EY GDS",
    type: "Insurance training simulator",
    challenge:
      "The training organization required scalable and consistent employee evaluations without relying only on live role-play sessions.",
    approach: [
      "Designed approximately 50 dynamic customer personas based on demographic attributes, backstory, tone, and voice characteristics.",
      "Built configurable call journeys across three topics per difficulty level, using LangGraph to maintain multi-turn conversation state.",
      "Integrated FastAPI, Azure Speech Services, RAG, and multi-step agent workflows; optimized prompts to reduce redundant LLM calls.",
    ],
    outcome: "Deployed two phases on AWS, supporting evaluations for more than 1,000 employees.",
    tools: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "OpenAI GPT models",
      "Azure Speech Services",
      "AWS",
      "GitLab",
      "CloudBees CI/CD",
    ],
    placement: "supporting",
  },
  {
    name: "Invoice Processing, Inventory & Quotation Intelligence",
    context: "Qentelli — Fastener Domain",
    type: "Invoice and inventory",
    challenge:
      "Invoices and quotations arrived in many formats. Sales, procurement, inventory, and logistics needed one workflow to standardize documents, check stock, and manage fulfilment.",
    approach: [
      "Built OCR and LLM extraction workflows to process multi-format invoices and quotations and refine them into standardized templates.",
      "Used Copilot Studio to convert catalogue books covering 4,000+ fastener products into an inventory master catalogue.",
      "Designed multi-agent workflows to extract document data, validate products, check stock, generate price quotations, and identify procurement requirements.",
      "Integrated CRM, inventory, procurement, and logistics workflows through Microsoft Dynamics 365 and Power Automate.",
    ],
    outcome:
      "Sales teams can access standardized quotations, availability, pricing, and delivery status through one automated pipeline.",
    tools: [
      "Python",
      "Tesseract OCR",
      "LLMs",
      "Copilot Studio",
      "NLP",
      "SQL",
      "Microsoft Dynamics 365",
      "Power Automate",
    ],
    placement: "supporting",
  },
  {
    name: "Health Analytics & Employee Wellness Intelligence",
    context: "Qentelli",
    type: "Employee wellness",
    challenge:
      "HR wellness teams needed a structured way to interpret medical reports, combine authorized employee profile data, and monitor wellness indicators.",
    approach: [
      "Built OCR, NLP, and LLM workflows to extract health information from medical reports, images, scans, and test documents.",
      "Integrated employee profiles from the HR database to create authorized health and wellness views.",
      "Designed health-scoring metrics and anomaly-detection workflows using medical-test values and extracted health indicators.",
    ],
    outcome:
      "Produced health insights and wellness suggestions, with dashboards and snapshot views for authorized trend monitoring.",
    tools: [
      "Python",
      "OpenAI GPT",
      "LangChain",
      "OCR",
      "NLP",
      "Scikit-learn",
      "Azure Bot Service",
      "Power BI",
      "Tableau",
    ],
    placement: "supporting",
  },
  {
    name: "AML Sanctions & Name Screening Engine",
    context: "EY India",
    type: "Sanctions screening",
    challenge:
      "Manual sanctions screening created a high volume of false-positive matches and required several days to process daily flagged transactions.",
    approach: [
      "Built hybrid fuzzy, semantic, and phonetic entity-matching pipelines with supervised ML and rules-based scoring.",
      "Integrated the screening engine with Fircosoft REST APIs and client-managed AWS automation pipelines.",
      "Supported screening across millions of banking transactions while routing high-risk and uncertain matches for compliance review.",
    ],
    outcome:
      "Reduced false positives from 55% to 10%, and daily flagged-transaction processing from about 3 days to 3 hours, with 2% of cases routed for manual review.",
    tools: ["Python", "SQL", "Scikit-learn", "spaCy", "Fircosoft REST APIs", "AWS", "Power BI"],
    placement: "supporting",
  },
];

export const experience = [
  {
    company: "EY GDS",
    role: "Senior GenAI Consultant",
    dates: "November 2025–Present",
    span: "11 mos",
    location: "Chennai, India",
    current: true,
    achievements: [
      "Lead a team of 5–6 developers and mentor 2–3 junior engineers on RAG microservices, LangGraph orchestration, and enterprise GenAI delivery.",
      "Own solution architecture, module development, testing, scheduled knowledge ingestion, and AWS release delivery through GitLab and CloudBees.",
      "Delivered a business-intelligence assistant through two implementation phases and client handover; deployed an insurance voice simulator used by 1,000+ employees for evaluations.",
    ],
  },
  {
    company: "Qentelli Solutions",
    role: "Senior Software Engineer",
    dates: "June 2024–October 2025",
    span: "1 yr 4 mos",
    location: "Hyderabad, India",
    current: false,
    achievements: [
      "Led cross-functional data science and engineering teams of 3–5, translating client requirements into technical architectures and coordinating enterprise data access.",
      "Built multi-agent finance assistants, RAG and text-to-SQL applications, and OCR-based document-processing workflows for invoices, inventory, and health analytics.",
      "Owned FastAPI backends, REST APIs, database schemas, cloud integrations, and LLM workflows for client-funded products and enterprise POCs.",
    ],
  },
  {
    company: "Ernst & Young LLP — EY India",
    role: "Senior Consultant",
    dates: "May 2021–May 2024",
    span: "3 yrs",
    location: "Bangalore, India",
    current: false,
    achievements: [
      "Developed ML/NLP solutions for sanctions screening, transaction monitoring, and conversational banking; integrated model inference into client automation pipelines.",
      "Built hybrid entity-matching, supervised scoring, and rules-based screening workflows integrated with Fircosoft REST APIs.",
      "Reduced sanctions-screening false positives from 55% to 10% across millions of transactions; reduced daily flagged-transaction processing from approximately 3 days to 3 hours, with 2% of screening cases routed for manual review.",
      "Partnered with compliance stakeholders on requirements, deployment, investigation workflows, and junior-engineer development.",
    ],
  },
  {
    company: "City Union Bank Ltd",
    role: "Associate",
    dates: "January 2018–August 2019",
    span: "1 yr 7 mos",
    location: "Chennai, India",
    current: false,
    achievements: [
      "Managed retail banking operations, customer verification, transaction reconciliation, and core banking validation.",
    ],
  },
] as const;

export const capabilities = [
  {
    category: "Generative AI and LLM platforms",
    skills: [
      "Azure OpenAI",
      "Azure AI Foundry",
      "Azure AI Search",
      "OpenAI GPT",
      "Google Gemini",
      "Groq API",
    ],
  },
  {
    category: "Agentic AI and retrieval",
    skills: [
      "LangGraph",
      "LangChain",
      "Multi-agent orchestration",
      "Workflow state management",
      "Tool integration",
      "RAG",
      "Embeddings",
      "Vector search",
      "FAISS",
      "Text-to-SQL",
      "Structured outputs",
      "Schema validation",
    ],
  },
  {
    category: "AI quality and governance",
    skills: [
      "Prompt engineering",
      "Guardrails",
      "Hallucination controls",
      "Human-in-the-loop escalation",
      "Exception handling",
      "LLM evaluation",
      "Benchmarking",
      "Regression testing",
    ],
  },
  {
    category: "ML, NLP, and document intelligence",
    skills: [
      "Scikit-learn",
      "spaCy",
      "NLTK",
      "Tesseract OCR",
      "Entity resolution",
      "Token classification",
      "Anomaly detection",
      "Fuzzy matching",
      "Phonetic matching",
    ],
  },
  {
    category: "Backend and data",
    skills: [
      "Python",
      "FastAPI",
      "Flask",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "SQL Server",
      "Supabase",
    ],
  },
  {
    category: "Cloud and enterprise integration",
    skills: [
      "AWS",
      "Amazon S3",
      "Azure Speech Services",
      "Azure Bot Service",
      "Azure Functions",
      "Azure Logic Apps",
      "SharePoint",
      "Microsoft Dynamics 365",
      "Power Automate",
      "Copilot Studio",
    ],
  },
  {
    category: "DevOps and reporting",
    skills: [
      "Git",
      "GitLab",
      "CloudBees CI/CD",
      "Azure DevOps",
      "Docker",
      "APScheduler",
      "Power BI",
      "Tableau",
    ],
  },
] as const;

export const certifications = [
  "Microsoft Certified: Azure AI Engineer Associate — AI-102",
  "Microsoft Certified: Azure Fundamentals — AZ-900",
  "GitHub Copilot Certification",
] as const;

export const education = [
  {
    school: "Great Lakes Institute of Management",
    credential: "PGPM — Data Science and Engineering",
    dates: "September 2019–March 2020",
  },
  {
    school: "SASTRA University",
    credential: "B.Tech — Biotechnology",
    dates: "June 2013–May 2017",
  },
] as const;

export const nav = [
  { href: "#work", label: "Key projects" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Highlights" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Certifications" },
] as const;
