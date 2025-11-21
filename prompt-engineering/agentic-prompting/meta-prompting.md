# What is meta prompting?

Prompt Engineering Guide

- [Welcome](https://www.ibm.com/think/prompt-engineering#605511093)
- Caret right
  Introduction
  - [Overview](https://www.ibm.com/think/topics/prompt-engineering#7281535)
  - [Prompt Engineering Techniques](https://www.ibm.com/think/topics/prompt-engineering-techniques#7281536)
  - [RAG vs. fine-tuning vs. prompt engineering](https://www.ibm.com/think/topics/rag-vs-fine-tuning-vs-prompt-engineering#7281537)
- Caret right
  Agentic prompting
  - Caret right
    Prompt chaining
    - [Overview](https://www.ibm.com/think/topics/prompt-chaining#227181075)
    - [Tutorial: Prompt Chaining with Langchain](https://www.ibm.com/think/tutorials/prompt-chaining-langchain#227181074)
  - [Tree of Thoughts (ToT)](https://www.ibm.com/think/topics/tree-of-thoughts#498277089)
  - [Meta prompting](https://www.ibm.com/think/topics/meta-prompting#498277088)
  - [Iterative prompting](https://www.ibm.com/think/topics/iterative-prompting#498277087)
- Caret right
  Example-based prompting
  - Caret right
    Zero Shot Prompting
    - [Overview](https://www.ibm.com/think/topics/zero-shot-prompting#734432942)
  - [One Shot Prompting](https://www.ibm.com/think/topics/one-shot-prompting#1003835714)
  - [Few Shot Prompting](https://www.ibm.com/think/topics/few-shot-prompting#1003835713)
- Caret right
  Prompt hacking and security
  - Caret right
    Prompt injection
    - [Overview](https://www.ibm.com/think/topics/prompt-injection#1696046959)
    - [Prompt Injection Prevention](https://www.ibm.com/think/insights/prevent-prompt-injection#1696046960)
    - [How AI can be hacked with prompt injection](https://www.ibm.com/think/insights/ai-prompt-injection-nist-report#1696046961)
  - [AI jailbreak](https://www.ibm.com/think/insights/ai-jailbreak#1509394339)
  - [When AI chatbots break bad](https://www.ibm.com/think/insights/llm-skeleton-key#1509394338)
- Caret right
  Prompt Optimization
  - [Overview](https://www.ibm.com/think/topics/prompt-optimization#2014952965)
  - Caret right
    DSPy
    - [Overview](https://www.ibm.com/think/topics/dspy#2142864945)
    - [Prompt Engineering with DSPy](https://www.ibm.com/think/tutorials/prompt-engineering-with-dspy#2142864944)
  - Caret right
    Prompt caching
    - [Overview](https://www.ibm.com/think/topics/prompt-caching#1646543726)
    - [Tutorial: Implementation of prompt caching](https://www.ibm.com/think/tutorials/implement-prompt-caching-langchain#1646543727)
- Caret right
  Prompt Reasoning Enhancement
  - [Chain of thoughts](https://www.ibm.com/think/topics/chain-of-thoughts#1774455706)
  - [Directional stimulus prompting](https://www.ibm.com/think/topics/directional-stimulus-prompting#1774455707)
  - [Tutorial: Role prompting](https://www.ibm.com/think/tutorials/using-role-prompting-with-watsonx-and-granite#1774455708)
  - [In-context learning](https://www.ibm.com/think/topics/in-context-learning#1774455709)
- Caret right
  Prompt tuning
  - [Overview](https://www.ibm.com/think/topics/prompt-tuning#1268897081)
  - [Tutorial: Prompt tune a Granite model](https://www.ibm.com/think/tutorials/prompt-tune-a-granite-model-using-watsonx#1268897082)

## Author

[Jobit Varughese](https://www.ibm.com/think/author/jobit-varughese.html)

Technical Content Writer

IBM

## What is meta prompting?

Consider a scenario. You ask an [AI model](https://www.ibm.com/think/topics/ai-model) one question, it gives you one answer, and that’s the end of it. Instead, give it a tested template showing exactly how to think through a complex problem and suddenly it’s solving an entire category, faster, smarter and with more consistency. That’s what meta prompting provides.

While [large language models](https://www.ibm.com/think/topics/large-language-models) (LLMs) like OpenAI’s [ChatGPT](https://www.ibm.com/think/topics/chatgpt), Google’s Gemini and Anthropic’s [open source](https://www.ibm.com/think/topics/open-source) models can handle many tasks, they often stumble on complex reasoning. Current methods like [chain‑of‑thought](https://www.ibm.com/think/topics/chain-of-thoughts) and tree‑of‑thought help, but they can’t match human‑like reasoning. Meta prompting changes that by giving LLMs structured frameworks for more advanced performance.

Meta prompting is an advanced [prompt engineering technique](https://www.ibm.com/think/topics/prompt-engineering-techniques) that gives LLMs a reusable, step‑by‑step prompt template in natural language. This method allows the model to solve for an entire category of complex tasks, rather than a single original prompt for a single problem. Meta prompting teaches an AI model how to think about solving the problem by focusing on the structure, syntax and reasoning pattern needed to reach the final answer. That is, it uses [prompt engineering](https://www.ibm.com/think/topics/prompt-engineering) to define how the model should think through the problem, step‑by‑step, before producing the final answer.

For instance, a user asks an AI to solve a system of two linear equations, **x − y = 4 and 2x + 3y = 12**. The AI can be instructed by using a meta prompt to:

- Determine each equation's coefficients.
- Choose a solving method.
- Solve the problem step by step to derive each variable.
- Enter the values into both equations and check the result.

This architecture offers adaptability, provides high-quality outputs, and allows [AI agents](https://www.ibm.com/think/topics/ai-agents) to handle complex problems in almost any domain with little reprompting.

## How does meta prompting work?

The meta prompting technique is based on the mathematical concepts, **type theory** and **category theory** that offer an organized method of mapping problems to solutions.[1](#f01)

This approach is important because it maintains a clear structure between tasks and their prompts, making it easy for AI to follow a standard template and resolve a wide range of problems. The basic idea behind category theory is to map relationships. A category is a "world" of objects and their relationships. In meta prompting, we can consider:

- One category (T) to be a set of tasks (for example, "solve a system of equations").
- Another category (P) to be the set of structured prompts for those tasks.
- The meta prompting functor (M) translates each task in T to its matching structured prompt in P while maintaining the logical structure.

If you change the task (for example, the numbers in a math problem), the reasoning framework stays the same and the prompt adjusts accordingly.

This scenario is enhanced by type theory, which ensures the prompt design matches the problem type. In meta prompting, a type might be a “math problem,” or a “summarization request.” It ensures that a math task gets a math-specific reasoning structure, while a summarization task gets a summarization-oriented template maintaining accuracy, adaptability and preventing irrelevant reasoning on complex tasks.

To put these concepts into practice, meta prompting involves three steps:

**1. Determine the task (T):** Specify the category of the problem, not just the particular instance.

**2. Map the task to a structured prompt (P):** Create an organized, sequential template for reasoning by using the meta prompting functor (M). This prompt generation can be done automatically by AI agents or manually.

**3. Execute and output:** The LLM ensures consistent and comprehensible problem-solving by applying the structured and specific prompt to the particular input.

### Example: Meta prompting for linear equations

In the previous example of solving a set of two linear equations: **[ 2x + 3y = 12 and x - y = 4 ]**, the task (T) is “solve any system of two linear equations.” The mapping produces a new prompt (P) that might look like this:

_“Act as a math tutor and explain how to solve the given set of linear equations step-by-step.
2x + 3y = 12 and x - y = 4_

_Use this structured template:_

_1: Identify the coefficients a1, b1, c1 from the first equation and a2, b2, c2 from the second._

_2: Choose a method to solve (substitution or elimination)._

_3: If elimination method is used, multiply one or both equations until the coefficients of x or y match the absolute value._

_4: Add or subtract the equations to remove one variable._

_5: Solve for the remaining variable._

_6: To find the other variable, enter the solved value into one of the initial equations._

_7: Verify by substituting x and y into both original equations._

_8: Summarize the final answer as (x, y).”_

If the equations change, the LLM can still solve them and continue reasoning because the functor provides the same structure with new numbers. The result is a thoughtful prompt template that makes it possible for generative [AI workflows](https://www.ibm.com/think/topics/ai-workflow) to solve problems in a reliable, adaptable and scalable manner.

## Applications of meta prompting

Meta prompting has been tested on various reasoning, programming and creative tasks, often outperforming standard prompting and even fine‑tuned models. For instance, on the MATH [dataset](https://www.ibm.com/think/topics/dataset) containing 5,000 competition‑level math word problems, researchers used a zero‑shot meta prompt with the Qwen‑72B LLM. It achieved 46.3% accuracy surpassing the initial GPT‑4 score of 42.5% and beating [fine‑tuned](https://www.ibm.com/think/topics/fine-tuning) models. The meta prompt provided a step‑by‑step reasoning framework, allowing it to handle unseen problems without using memorized examples.

Meta prompting can manage the software development workflow from planning to code review, enabling LLMs to function as architects, developers and testers. For example, adding a Python specialist to the meta prompting architecture for code generation and execution increased the success percentage of the Python Programming Puzzle from 32.7% to 45.8%.[2](#f02) It can define tone and structure in content development and iterate material to get rich results. For instance, in a Shakespearean sonnet writing task requiring strict poetic structure, meta prompting boosted accuracy from 62% with standard prompting. With a Python interpreter, accuracy increased to 79.6%, and without it, to 77.6%, showing its strength in refining tone and structure.

Considering these use cases, meta prompting converts complicated instructions into manageable steps that provide outcomes that are more in line with the domain.

## Meta prompting vs. other prompting techniques

Meta prompting differs from prompting techniques such as zero‑shot and few shot prompting in both focus and execution.

In [zeroshot prompting](https://www.ibm.com/think/topics/zero-shot-prompting), an LLM gets a task with no examples, relying only on pretraining. While fine for simple tasks, it often yields inconsistent reasoning on complex ones. Meta prompting improves this issue with a reusable, organized prompt template that guides problem solving and ensures consistent, explainable results.

[Few shot prompting](https://www.ibm.com/think/topics/few-shot-prompting) gives a model a few examples to imitate, such as showing three solved math problems before asking for a fourth. This “teaches by example,” but it still ties the model’s reasoning to those examples. Meta prompting instead abstracts the problem-solving process itself into a generalized, step-by-step template that is independent of specific examples that are flexible and reusable across entire classes of problems.

Compared to chain‑of‑thought prompting that instructs the model to think step‑by‑step, meta prompting defines what those steps should be for a specific task type, making the reasoning process more adaptable.

This capability makes meta prompting especially valuable for generative AI, AI agents and complex workflows where reliability and adaptability are critical.

## Types of meta prompting

Meta prompting can be applied in different ways depending on who creates the meta prompt, how it is generated and how it is used within an AI workflow.

### User‑provided meta prompting

This type is the most straightforward type of meta prompting. A human such as a domain expert or prompt engineer writes a clear, step‑by‑step template for the task. The LLM then follows this structure to get to the answer. This approach works well when you know exactly how a problem should be solved and want consistent, high‑quality outputs. Therefore, it takes time and expertise to create these prompts for many different tasks.

### Recursive meta prompting (RMP)

Here, the LLM or an AI agent creates the meta prompt for itself before solving the problem. This type happens in two stages: the first pass takes the task description and generates a structured, step‑by‑step prompt; the second pass uses that prompt to produce the final answer. It lets the AI adapt its problem‑solving process, making it useful for zero‑shot and few‑shot scenarios without ready examples. The drawback is that the output quality depends on how good the AI prompt.

### Conductor‑model meta prompting

This type is used in complex AI workflows where multiple LLMs or AI agents work together. A conductor model plans the process and creates different meta prompts for each specialist model. The conductor breaks down the major task into subtasks, then uses prompt templates to assign each part to the right specialist. For example, one model handles the arithmetic operations, another writes Python code and another verifies the results. This teamwork improves accuracy and adaptability but needs more computing power.

Meta prompting isn't just a method for improving AI responses, it is a way for people to interact with LLMs. Instead of giving direct instructions to the AI models, we're influencing their thinking process by teaching them to generate their own effective prompts. Meta prompting enables a form of AI self-optimization where reasoning and adaptability evolve with each iteration that helps the development of more intelligent, self-governing AI systems.

Link copied

[Upcoming Webinar | November 20

Fact or Fiction? Top Misconceptions About AI Agents

Join experts from IBM and MINT.ai as they break down the most common misconceptions about AI agents and share the truth behind the technology.

Register now](https://ibm.webcasts.com/starthere.jsp?ei=1739608&tp_key=ee9e5fa391&sti=inbound)

## Resources

[Upcoming Webinar | November 20

Fact or Fiction? Top Misconceptions About AI Agents

Join experts from IBM and MINT.ai as they break down the most common misconceptions about AI agents and share the truth behind the technology.

Register now](https://ibm.webcasts.com/starthere.jsp?ei=1739608&tp_key=ee9e5fa391&sti=inbound)

[Workshop

Prompt Engineering with watsonx.ai

Gain a comprehensive understanding of prompt engineering, learn techniques to achieve the best results with LLMs, and apply learnings through completion of a diverse set of prompt engineering exercises.

Start learning](https://ibm.github.io/watsonx-prompt-lab/)

[Publication

Locally differentially private document generation using zero shot prompting

See how this publication demonstrates that pretrained large language models can effectively contribute to privacy preservation.

Read the publication](https://research.ibm.com/publications/locally-differentially-private-document-generation-using-zero-shot-prompting)

[Tutorial

Adversarial prompting - Testing and strengthening the security and safety of LLMs

Explore various techniques involved in adversarial prompting, focusing on how these tactics can be used to test and strengthen the security and safety of large language models.

Start learning](https://developer.ibm.com/tutorials/awb-adversarial-prompting-security-llms/)

[IBM Developer

watsonx Developer Hub

Get hands-on with prompt engineering on the watsonx Developer Hub.

Explore the Developer Hub](https://www.ibm.com/watsonx/developer/)

[Article

Prompt engineering fundamentals

Go from zero to hero with prompt templates for different types of prompts.

Read the article](https://developer.ibm.com/articles/awb-prompt-engineering-fundamentals/)

[Free course

Prompt engineering for everyone

Master the language of AI and unleash its full potential with our free prompt engineering course.

Start learning](https://developer.ibm.com/articles/awb-prompt-engineering-fundamentals/)

[IBM Developer

Get started with generative AI

Get started with generative AI using curated tools, frameworks, tutorials, labs and community support.

Explore developer resources](https://developer.ibm.com/get-started/generative-ai/)

Related solutions

xml version="1.0" encoding="UTF-16"?

IBM® watsonx Orchestrate™

Easily design scalable AI assistants and agents, automate repetitive tasks and simplify complex processes with IBM® watsonx Orchestrate™.

[Explore watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate)

AI for developers

Move your applications from prototype to production with the help of our AI development solutions.

[Explore AI development tools](https://www.ibm.com/solutions/ai-for-developers)

AI consulting and services

Reinvent critical workflows and operations by adding AI to maximize experiences, real-time decision-making and business value.

[Explore AI services](https://www.ibm.com/consulting/artificial-intelligence)

Take the next step

Whether you choose to customize pre-built apps and skills or build and deploy custom agentic services using an AI studio, the IBM watsonx platform has you covered.

[Explore watsonx Orchestrate](https://www.ibm.com/products/watsonx-orchestrate)

[Explore AI development tools](https://www.ibm.com/solutions/ai-for-developers)

##### Footnotes

1. Zhang, Y., Yuan, Y., & Yao, A. C. C. (2023). Meta prompting for ai systems._arXiv preprint arXiv:2311.11482._

2. Suzgun, M., & Kalai, A. T. (2024). Meta-prompting: Enhancing language models with task-agnostic scaffolding. *arXiv preprint arXiv:2401.12954.*
