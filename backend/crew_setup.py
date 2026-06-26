from crewai import Crew

def get_crew():
    from agents import get_agents
    from tasks import get_tasks

    market_oracle, feature_architect, tech_stack_architect, product_strategist = get_agents()
    tasks = get_tasks(market_oracle, feature_architect, tech_stack_architect, product_strategist)

    return Crew(
        agents=[
            market_oracle,
            feature_architect,
            tech_stack_architect,
            product_strategist
        ],
        tasks=tasks,
        verbose=True,
        max_rpm=20 # Prevents rate limiting on Groq's free tier
    )