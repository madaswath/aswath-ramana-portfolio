export const person = {
  name: "Aswath Ramana",
  role: "Senior GenAI Engineer",
  location: "Chennai, India",
  email: "aswath.ramana6@gmail.com",
  phone: "+91 8344022298",
  linkedin: "https://linkedin.com/in/aswath-ramana",
  github: "https://github.com/madaswath",
  summary:
    "Senior GenAI Engineer and Technical Lead with 7+ years of experience delivering scalable enterprise AI/ML solutions across banking, insurance, and financial services. Specialized in architecting production-grade RAG pipelines, multi-agent orchestration (LangGraph, LangChain), text-to-SQL systems, and intelligent document processing. Proven track record leading cross-functional engineering teams through full lifecycle delivery on AWS and Azure—notably driving sanctions-screening automation that reduced false positives from 55% to 10% and deploying enterprise voice simulators serving 1,000+ users.",
} as const;

export const profile = {
  currentRole: "Senior GenAI Consultant",
  currentCompany: "EY GDS",
  focus: [
    "Production-grade RAG pipelines",
    "Multi-agent orchestration (LangGraph, LangChain)",
    "Text-to-SQL and intelligent document processing",
    "Full lifecycle delivery on AWS and Azure",
  ],
  industries: ["Banking", "Insurance", "Financial services"],
  platforms: [
    "AWS",
    "Amazon S3",
    "Azure OpenAI",
    "Azure AI Foundry",
    "Azure AI Search",
    "Azure Speech Services",
    "Azure Bot Service",
    "Azure Functions",
    "Azure Logic Apps",
  ],
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
    label: "Production users",
    detail: "Insurance voice simulator deployed for employee evaluations.",
  },
  {
    figure: "5–6",
    label: "Developers led",
    detail: "RAG microservices and LangGraph orchestration, mentoring 2–3 junior engineers.",
  },
  {
    figure: "3–5",
    label: "Client teams led",
    detail: "Translated client requirements into architectures and coordinated data access with department heads.",
  },
  {
    figure: "2 phases",
    label: "Client handover",
    detail: "Live BI assistant delivered through client handover, with AWS releases on GitLab and CloudBees.",
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
    name: "AML Sanctions & Name Screening Engine",
    context: "EY India",
    type: "Sanctions screening",
    challenge:
      "Identify high-risk sanctions watchlist matches and automate daily screening while retaining human review for investigable cases.",
    approach: [
      "Built hybrid fuzzy, semantic, and phonetic matching with supervised ML; integrated Fircosoft REST APIs on client-managed AWS.",
      "Integrated scoring and alerts into client automation and compliance investigation workflows.",
      "Deployed screening components supporting millions of banking transactions.",
    ],
    outcome:
      "Reduced false-positive rate from 55% to 10%; cut flagged-transaction processing from ~3 days to ~3 hours per daily batch, with 2% escalated for manual review.",
    tools: [
      "Python",
      "SQL",
      "Scikit-learn",
      "spaCy",
      "Fircosoft REST APIs",
      "Power BI",
      "AWS",
    ],
    placement: "featured",
  },
  {
    name: "Mock Call Simulator — Insurance Employee Training",
    context: "EY GDS",
    type: "Insurance training simulator",
    challenge:
      "Evaluate insurance employees on product knowledge, customer handling, and empathy through realistic simulated calls.",
    approach: [
      "Built ~50 dynamic personas and difficulty levels (three topics each) with LangGraph call-state management.",
      "Integrated Azure Speech Services with RAG and multi-step agent workflows in FastAPI; optimized prompts to reduce redundant LLM calls.",
      "Deployed both phases on AWS through GitLab and CloudBees with exception handling for out-of-scenario turns.",
    ],
    outcome: "Supported production evaluations for 1,000+ employees.",
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
    name: "AI for BI — Business Intelligence Assistant",
    context: "EY GDS",
    type: "Business intelligence assistant",
    challenge:
      "Enable leadership and developer teams to query insurance documents, SharePoint files, charts, dashboards, and transactional data conversationally.",
    approach: [
      "Built LangGraph/LangChain RAG and agent modules over thousands of insurance documents, SharePoint files, and charts.",
      "Integrated APScheduler-based ingestion, real-time retrieval, and schema-checked SQL generation against PostgreSQL for structured questions.",
      "Regression-tested prompts and answers; owned AWS releases through GitLab and CloudBees across two delivery phases.",
    ],
    outcome:
      "Completed client handover of the live assistant with 5–20 second responses depending on query complexity and conversation length.",
    tools: [
      "Python",
      "LangGraph",
      "LangChain",
      "OpenAI GPT-4",
      "APScheduler",
      "AWS",
      "Amazon S3",
      "SharePoint",
      "PostgreSQL",
      "GitLab",
      "CloudBees CI/CD",
    ],
    placement: "supporting",
  },
  {
    name: "Enterprise Finance & Operations Chatbot",
    context: "Qentelli — Big Four Client",
    type: "Finance operations chatbot",
    challenge:
      "Provide leadership a single conversational interface for service-line reporting, budgets, forecasts, and P&L across the organization.",
    approach: [
      "Built the agentic platform from scratch and coordinated data access across Finance, Marketing, Operations, Infrastructure, and HR.",
      "Implemented LangGraph multi-agent delegation, workflow state, and tool integration on Azure OpenAI and Azure AI Foundry with Azure AI Search retrieval.",
      "Applied structured tool outputs, schema validation, guardrails, and human-in-the-loop escalation via Azure Bot Service, Functions, and Logic Apps.",
    ],
    outcome:
      "Delivered event-driven production deployment used by leadership for financial information and reporting.",
    tools: [
      "Python",
      "LangGraph",
      "LangChain",
      "Azure OpenAI",
      "Azure AI Foundry",
      "Azure AI Search",
      "Groq API",
      "Azure Bot Service",
      "Azure Functions",
      "Azure Logic Apps",
    ],
    placement: "supporting",
  },
  {
    name: "Health Analytics & Interpretation Dashboard",
    context: "Qentelli",
    type: "Health analytics",
    challenge:
      "Convert medical documents and readings into health scores, trends, and conversational insights.",
    approach: [
      "Built OCR, NLP, and LLM pipelines to extract and interpret structured and unstructured medical documents and readings.",
      "Integrated ML-based health scoring and anomaly detection with Power BI/Tableau dashboards.",
      "Deployed a conversational assistant on Azure Bot Service for personalized recommendations from processed health data.",
    ],
    outcome:
      "Delivered an end-to-end workflow from document ingestion through scored insights and chat-based guidance.",
    tools: [
      "Python",
      "OpenAI GPT",
      "LangChain",
      "OCR",
      "NLP",
      "Azure Bot Service",
      "Power BI",
      "Tableau",
    ],
    placement: "further",
  },
  {
    name: "Invoice Processing & Inventory Intelligence",
    context: "Qentelli — Fastener Domain",
    type: "Invoice and inventory processing",
    challenge:
      "Automate invoice extraction, product classification, and quotation-to-inventory matching in the client ERP environment.",
    approach: [
      "Built intelligent document processing using Tesseract OCR and NLP on multi-format invoices.",
      "Mapped extracted products to catalogue master data and matched quotations to inventory for availability and estimates.",
      "Automated ingestion and processing through Microsoft Dynamics 365 and Power Automate.",
    ],
    outcome:
      "Delivered document-to-decision automation integrated with the client’s enterprise systems.",
    tools: [
      "Python",
      "Tesseract OCR",
      "NLP",
      "Microsoft Dynamics 365",
      "Power Automate",
      "SQL",
    ],
    placement: "further",
  },
  {
    name: "Database Query Chatbot — Text-to-SQL & RAG",
    context: "Qentelli",
    type: "Text-to-SQL",
    challenge: "Enable users to query enterprise databases using natural language.",
    approach: [
      "Developed LLM-based SQL generation with FAISS contextual retrieval for relevant database information.",
      "Validated generated queries against the schema before execution and summarized the returned results.",
    ],
    outcome:
      "Built backend services and deployed them through CI/CD with monitoring.",
    tools: [
      "Python",
      "LangChain",
      "Azure OpenAI",
      "FAISS",
      "SQL Server",
      "Flask",
      "Azure DevOps",
    ],
    placement: "further",
  },
  {
    name: "PocketFi — AI-Assisted Personal Finance",
    context: "Qentelli",
    type: "Personal finance POC",
    challenge:
      "Build a client-funded personal finance POC with AI-generated insights.",
    approach: [
      "Owned end-to-end architecture and FastAPI backend development for the client product concept.",
      "Designed PostgreSQL/Supabase schemas and implemented LLM-based financial insight modules.",
    ],
    outcome: "Delivered the POC backend prepared for investor rollout.",
    tools: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "Groq API",
      "Google Gemini",
    ],
    placement: "further",
  },
  {
    name: "Job-hunt — AI-Assisted Job Search & CV Matching",
    context: "Qentelli",
    type: "Job search POC",
    challenge:
      "Support job discovery, CV matching, and application assistance through a client-funded POC.",
    approach: [
      "Owned Phase 1 application architecture, backend services, and the data model.",
      "Built the LLM matching workflow to compare candidate information with job requirements.",
    ],
    outcome: "Completed Phase 1; Phase 2 development remains pending.",
    tools: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "Groq API",
      "Google Gemini",
    ],
    placement: "further",
  },
  {
    name: "Banking Transaction Monitoring",
    context: "EY India",
    type: "Transaction monitoring",
    challenge:
      "Detect suspicious transaction patterns and support compliance investigations.",
    approach: [
      "Developed anomaly-detection models and features using transactional patterns and behavioral data.",
      "Integrated model outputs and alerts into client pipelines and compliance dashboards.",
    ],
    outcome:
      "Deployed components using Docker and CI/CD, collaborating with stakeholders on requirements.",
    tools: [
      "Python",
      "Scikit-learn",
      "SQL",
      "Docker",
      "Azure DevOps",
      "Tableau",
    ],
    placement: "further",
  },
  {
    name: "Banking NLP Chatbot",
    context: "EY India",
    type: "Banking chatbot",
    challenge:
      "Enable conversational queries about banking products and account information.",
    approach: [
      "Built NLP intent-classification and entity-extraction pipelines for banking queries.",
      "Worked with banking teams to map structured product information and integrate backend access through REST APIs.",
    ],
    outcome: "Delivered the application as an operational pilot.",
    tools: ["Python", "NLTK", "spaCy", "REST APIs"],
    placement: "further",
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
      "Lead 5–6 developers, mentoring 2–3 junior engineers on RAG microservices and LangGraph agent orchestration for business intelligence and insurance training applications.",
      "Own architecture, module development, regression testing, and AWS releases through GitLab and CloudBees; implement scheduled ingestion to refresh agent knowledge.",
      "Delivered a BI assistant across two phases through client handover and deployed an insurance voice simulator used by 1,000+ employees for evaluations.",
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
      "Led data science and engineering teams of 3–5, translating client requirements into architectures and coordinating enterprise data access with department heads.",
      "Built multi-agent finance assistants, RAG applications, and OCR-based invoice, inventory, and health analytics workflows for client environments.",
      "Owned backend architecture, APIs, database schemas, and LLM workflows for client-funded PocketFi and Job-hunt POCs.",
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
      "Developed ML/NLP solutions for sanctions screening, transaction monitoring, and conversational banking; integrated inference into client automation pipelines.",
      "Implemented hybrid entity matching, supervised scoring, and rule-based automation with Fircosoft integration.",
      "Reduced false positives from 55% to 10% on millions of transactions; daily flagged-transaction review from ~3 days to ~3 hours, with 2% escalated for manual review.",
      "Collaborated with compliance stakeholders on requirements, deployment, investigation workflows, and junior-developer guidance.",
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
      "Handled retail banking operations, customer verification, transaction reconciliation, and core banking validation.",
    ],
  },
] as const;

export const capabilities = [
  {
    category: "Models, agents, and retrieval",
    skills: [
      "Azure OpenAI",
      "OpenAI GPT",
      "Google Gemini",
      "Groq API",
      "LangGraph",
      "LangChain",
      "Multi-agent orchestration",
      "Workflow state",
      "Tool integration",
      "Structured outputs",
      "Schema validation",
      "Human-in-the-loop escalation",
      "Prompt engineering",
      "RAG",
      "Azure AI Search",
      "FAISS",
      "Embeddings",
      "Vector search",
      "Text-to-SQL",
      "Tesseract OCR",
      "Intelligent document processing",
    ],
  },
  {
    category: "Evaluation, ML, and NLP",
    skills: [
      "Guardrails",
      "Hallucination controls",
      "LLM evaluation",
      "Benchmarking",
      "Regression testing",
      "Exception handling",
      "Scikit-learn",
      "spaCy",
      "NLTK",
      "Entity resolution",
      "Token classification",
      "Anomaly detection",
      "Fuzzy and phonetic matching",
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
    category: "Cloud, delivery, and reporting",
    skills: [
      "AWS",
      "Amazon S3",
      "Azure AI Foundry",
      "Azure Speech Services",
      "Azure Bot Service",
      "Azure Functions",
      "Azure Logic Apps",
      "SharePoint",
      "Microsoft Dynamics 365",
      "Power Automate",
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
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Impact" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#contact", label: "Contact" },
] as const;
