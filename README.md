# IBM ACP Architecture PoC: Agentic Finance Workflow

## 🚀 Overview
This Proof of Concept (PoC) demonstrates the implementation of a **Multi-Agent System (MAS)** orchestrated through the **IBM Agent Communication Protocol (ACP)**. 

The project simulates a corporate financial expense approval process where specialized AI agents collaborate to extract data, verify compliance, check budgets, and trigger governance workflows.

## 🏗️ Architectural Vision
As an AI Solution Architect, this PoC focuses on the following core principles:
- **System Decomposition**: Breaking down a complex business problem into specialized, autonomous cognitive agents.
- **Interoperability (ACP)**: Utilizing a standardized communication protocol to ensure seamless data exchange and task negotiation.
- **Trust & Governance**: Implementing a real-time Audit Trail and "Human-in-the-loop" triggers for high-risk decisions.
- **Scalability**: A modular design that allows adding new agents (e.g., Legal or Tax agents) without disrupting the existing ecosystem.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🤖 Agent Workflow
1. **Extractor Agent**: Converts unstructured receipt data into structured JSON (mimicking IBM Granite LLM capabilities).
2. **Policy Agent**: Validates data against corporate compliance rules.
3. **Budget Agent**: Integrates with ERP-simulated logic to check department funds.
4. **Governance Layer**: Provides final oversight, audit logging, and manual intervention triggers.

## 📈 Key Insights for Interviewers
- **Observability**: The "ACP Message Log" provides a real-time view of how agents negotiate and pass metadata.
- **Stochastic Management**: The system is designed to handle the probabilistic nature of AI by implementing deterministic guardrails at the protocol level.
- **Enterprise Ready**: Concepts align with **IBM watsonx.governance** and **watsonx.ai** orchestration patterns.

---
*Developed by Luca Lazzaro - AI Solution Architect Candidate*
