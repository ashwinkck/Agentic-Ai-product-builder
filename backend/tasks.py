from crewai import Task
def get_tasks(market_oracle, feature_architect, tech_stack_architect, product_strategist):
    market_task = Task(
        description="Analyse market demand for this startup idea:{idea}",
        expected_output="Market demand,Competitors, target audience ",
        agent=market_oracle,
        async_execution=True
    )

    feature_task = Task(
        description="Design the product features for this startup idea:{idea}",
        expected_output="Detailed feature list",
        agent=feature_architect,
        async_execution=True
    )

    tech_task = Task(
        description="Recommend the technology stack needed to build this {idea}product",
        expected_output="Frontend,backend, database, infrastructure",
        agent=tech_stack_architect,
        async_execution=True
    )

    strategy_task = Task(
        description="Create a development roadmap and launch plan",
        expected_output="product roadmap and milestones",
        agent=product_strategist
    )
    
    return [market_task, feature_task, tech_task, strategy_task]