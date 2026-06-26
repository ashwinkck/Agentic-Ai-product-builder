from crewai import Agent, LLM
from rag_setup import retriever
from crewai.tools import BaseTool
from dotenv import load_dotenv
import litellm
import os

load_dotenv()

# --- MONKEY PATCH LITELLM TO FIX GROQ ERROR ---
import random
import time
original_completion = litellm.completion

def patched_completion(*args, **kwargs):
    if "messages" in kwargs:
        for msg in kwargs["messages"]:
            if "cache_breakpoint" in msg:
                del msg["cache_breakpoint"]
    
    # Load all valid keys
    keys = []
    for i in range(1, 6):
        key = os.getenv(f"GROQ_API_KEY_{i}")
        if key and key.startswith("gsk_"):
            keys.append(key)
    
    if not keys:
        fallback = os.getenv("GROQ_API_KEY")
        if fallback and fallback.startswith("gsk_"):
            keys.append(fallback)
            
    if not keys:
        return original_completion(*args, **kwargs)
        
    # Shuffle keys to load balance, then try them sequentially on failure
    random.shuffle(keys)
    
    last_error = None
    for api_key in keys:
        try:
            kwargs["api_key"] = api_key
            return original_completion(*args, **kwargs)
        except Exception as e:
            err_str = str(e).lower()
            # If it's a rate limit error, catch it and loop to the next API key!
            if "rate limit" in err_str or "429" in err_str or "rate_limit_exceeded" in err_str:
                last_error = e
                time.sleep(0.5) # Quick pause before trying the next key
                continue
            else:
                # If it's a different error, fail normally
                raise e
                
    # If every single key is rate limited, raise the last error
    if last_error:
        raise last_error
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
    llm=llm,
    max_iter=3,
    verbose = True
)

feature_architect = Agent(
    role = "Feature Architect",
    goal = "Design product features for startup ideas",
    backstory = "A product designer who turns ideas into real product features",
    llm=llm,
    max_iter=3,
    verbose = True
)

tech_stack_architect = Agent(
    role = "Tech Stack Architect",
    goal = "Recommend technologies for building the product",
    backstory = "A senior software architect with deep knowledge of modern tech stacks",
    llm=llm,
    max_iter=3,
    verbose = True
)

product_strategist = Agent(
    role = "Product Strategist",
    goal = "Create a complete product roadmap",
    backstory = "An experienced startup founder who plans product launches",
    llm=llm,
    max_iter=3,
    verbose = True
)