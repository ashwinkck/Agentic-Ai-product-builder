from crewai import Agent, LLM
from rag_setup import retriever
from crewai.tools import BaseTool
from dotenv import load_dotenv
import litellm
import os

load_dotenv()

# --- MONKEY PATCH LITELLM TO FIX GROQ ERROR ---
import random
original_completion = litellm.completion

def patched_completion(*args, **kwargs):
    if "messages" in kwargs:
        for msg in kwargs["messages"]:
            if "cache_breakpoint" in msg:
                del msg["cache_breakpoint"]
    
    # --- API KEY ROTATION TO PREVENT RATE LIMITS ---
    # It will randomly pick one of your keys for each request
    keys = []
    for i in range(1, 6):
        key = os.getenv(f"GROQ_API_KEY_{i}")
        if key:
            keys.append(key)
    
    if not keys and os.getenv("GROQ_API_KEY"):
        keys.append(os.getenv("GROQ_API_KEY"))
        
    if keys:
        kwargs["api_key"] = random.choice(keys)
    # -----------------------------------------------

    return original_completion(*args, **kwargs)

litellm.completion = patched_completion
# ----------------------------------------------


#1 Creating the LLM

llm = LLM(
    model="groq/llama-3.3-70b-versatile",
    temperature=0.3,
    max_tokens=4000
)

#2 Creating a RAG tool
class StartupKnowledgeSearchTool(BaseTool):
    name:str = "startup_knowledge_search"
    description:str = "Search startup and technology knowledge base"

    def _run(self,query: str)-> str:
        docs = retriever.invoke(query)
        # Limit to 2 documents and max 1500 characters to prevent Groq Rate Limiting (TPM)
        context = "\n".join([doc.page_content for doc in docs[:2]])
        return context[:1500]


#3 Creating the Tool Instance
startup_tool = StartupKnowledgeSearchTool()

market_oracle = Agent(
    role = "Market Oracle",
    goal=  "Understand market demand for startup ideas",
    backstory = "A legendary venture analyst who understands startup market and trends",
    tools=[startup_tool],
    llm=llm,
    max_iter=3,
    verbose = True
)

feature_architect = Agent(
    role = "Feature Architect",
    goal = "Design product features for startup ideas",
    backstory = "A product designer who turns ideas into real product features",
    tools=[startup_tool],
    llm=llm,
    max_iter=3,
    verbose = True
)

tech_stack_architect = Agent(
    role = "Tech Stack Architect",
    goal = "Recommend technologies for building the product",
    backstory = "A senior software architect with deep knowledge of modern tech stacks",
    tools = [startup_tool],
    llm=llm,
    max_iter=3,
    verbose = True
)

product_strategist = Agent(
    role = "Product Strategist",
    goal = "Create a complete product roadmap",
    backstory = "An experienced startup founder who plans product launches",
    tools = [startup_tool],
    llm=llm,
    max_iter=3,
    verbose = True
)