from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# Lazy load crew_setup to speed up FastAPI boot time
import os

app = FastAPI(title="LaunchPad AI API")

# Allow frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (good for dev, update in production if needed)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaRequest(BaseModel):
    idea: str

@app.get("/")
def root():
    return {"status": "Online", "message": "LaunchPad AI API is running!"}

@app.post("/generate")
def generate_plan(request: IdeaRequest):
    try:
        print(f"Received idea: {request.idea}")
        
        # Lazy import to prevent Render 60s timeout during boot
        from crew_setup import product_crew
        
        # Start the CrewAI process
        result = product_crew.kickoff(inputs={"idea": request.idea})
        
        # Extract individual task outputs
        agent_outputs = {}
        for task in product_crew.tasks:
            # Depending on CrewAI version, output might be a string or TaskOutput object
            agent_outputs[task.agent.role] = getattr(task.output, "raw", str(task.output))
        
        # Result might be a CrewOutput object depending on crewai version, 
        # converting to string ensures JSON serializability.
        return {"status": "success", "result": str(result), "agent_outputs": agent_outputs}
    except Exception as e:
        print(f"Error generating plan: {str(e)}")
        return {"status": "error", "message": str(e)}
