
AI Product Builder is an intelligent orchestration system that takes a raw startup idea and transforms it into a fully-fledged product plan. The project leverages **CrewAI** to manage multiple AI agents, **Langchain**, and a **Chroma Vector Database** powered by Retrieval-Augmented Generation (RAG) to ground the agents' insights in real-world technical and startup data.

## Technical Overview & Architecture

### 1. Vector Database & RAG Pipeline (rag_setup.py)
At the core of the knowledge engine is a RAG pipeline designed to synthesize startup and text trends:
- Data Ingestion: Parses internal knowledge documents (`startups.pdf` and `tech_trends.pdf`) using Langchain's `PyPDFLoader`.
- Chunking Strategy: Employs `RecursiveCharacterTextSplitter` to break documents into 1000-character chunks with a 200-character overlap for high contextual retention.
- Embeddings Pipeline: Uses HuggingFace embeddings (`sentence-transformers/all-MiniLM-L6-v2`) locally to compute dense vector representations of the texts.
- Vector Database: Instantiates a local ChromaDB (`vector_db`) as the permanent storage layer for the embeddings, exposing a robust top-k similarity retriever (`k=3`) for downstream queries.

### 2. Multi-Agent System (agents.py & crew_setup.py)
The platform uses CrewAI to spin up highly specialized intelligent agents that collaboratively analyze the user's startup idea. Powered by Groq via `llama-3.1-8b-instant` (with a low `temperature=0.3` for precise reasoning), the system includes:
- StartupKnowledgeSearchTool: A custom CrewAI tool (`BaseTool`) connecting directly to the Chroma Vector DB retriever, allowing agents to factually back up their decisions.
- Market Oracle: Analyzes market demand, target audiences, and deep competitors.
- Feature Architect: Transforms the abstract idea into a concrete feature list.
- Tech Stack Architect: Dictates the front-end, back-end, database, and infrastructure needs by combining general LLM knowledge with the local vector search.
- Product Strategist: Computes a detailed development roadmap and launch plan.

### 3. Task Graph Engine (`tasks.py`)
Agent objectives are isolated into discrete `Task` objects that formulate a sequential execution graph. The system enforces highly structured outcomes natively expected by downstream agents.

### 4. Entrypoint Integration (`main.py`)
A streamlined interface to spark the execution cycle. 
`product_crew.kickoff()` injects the startup context across all agents, kicking off the synchronous generation pipelines and finally streaming a comprehensive strategic report to the user.

## 🛠️ Stack Summary
- **Orchestration**: CrewAI
- **LLM Engine**: Groq (`llama-3.1-8b-instant`)
- **Semantic Data Routing**: Langchain
- **Vector DB / Store**: Chroma
- **Embeddings**: HuggingFace (`sentence-transformers/all-MiniLM-L6-v2`)
- **Local Dev**: Python 3.x, `dotenv`

