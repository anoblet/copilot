# What is tree of thoughts prompting?

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

## Authors

[Vrunda Gadesha](https://www.ibm.com/think/author/vrunda-gadesha)

AI Advocate | Technical Content Author

## What is tree of thoughts?

Tree of thoughts (ToT) is a ground-breaking framework designed to enhance the reasoning capabilities of [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models). This approach simulates human cognitive strategies for problem-solving, enabling LLMs to explore multiple potential solutions in a structured manner, akin to a tree's branching paths.[1]

## How does tree of thoughts work?

ToT guides LLMs through a series of reasoning steps, where each step can branch into multiple paths, allowing the model to backtrack or explore alternative strategies as needed. For example, solving a sudoku puzzle might guide the model to explore different number placements in a trial-and-error fashion. It then backtracks when a number leads to a contradiction and it tries a different number until the puzzle is solved. This mimics the human approach to problem-solving, where multiple solutions are considered and discarded if found incorrect.[[1]](#f01)[[3]](#f03)

### Framework for tree of thoughts (ToT)

ToT is a sophisticated framework designed to enhance the problem-solving capabilities of LLMs by structuring their reasoning in a manner analogous to human cognitive processes. The framework is composed of four key components:

#### **Thought decomposition**

The ToT framework explicitly breaks a problem into smaller, manageable steps called thoughts, which are pieced together to form a solution. Each thought should be the right size—not too large to handle or too small to be useful. For example, if you’re planning a trip, a thought might involve deciding on a travel destination first, then choosing the best mode of transportation and finally picking a place to stay. In a mathematical problem, a thought might be a single equation line or a concise concept explanation. This way, the problem is broken down into key steps that are easy to tackle and evaluate individually. The decomposition depends on the nature of the problem, making sure that thoughts are both significant and feasible for evaluation.

#### **Thought generation**

After defining what constitutes a thought, the next step is to determine how these thoughts are generated. The framework proposes two primary techniques.[[4]](#f04)

- **Sampling:** This technique involves generating several thoughts independently by using the same prompt. It works best when the thought space is rich and diverse, as independently generated thoughts are less likely to be duplicated. For example, in creative writing, multiple independent plot ideas might be generated.
- **Proposing:** This technique sequentially generates thoughts using a "propose prompt." Each thought is built upon the previous one, which helps avoid duplication in more constrained thought spaces. For example, in logical problem-solving, each step builds on the previous one to help ensure consistency and progress.

#### **State evaluation**

Once thoughts are generated, they must be evaluated to help ensure progress toward a solution. The framework employs 2 strategies for this purpose:

- **Value:** This strategy involves assigning a scalar value (for example, a rating from 1-10) or a classification (for example, sure, likely or impossible) to each state. This helps indicate the value's quality or likelihood of leading to a solution. This method allows for a quantitative assessment of each thought's potential.
- **Vote:** This strategy compares different solutions and selects the most promising one. Voting is particularly useful for tasks where the quality of a solution is subjective or hard to quantify, such as in creative writing or strategic planning. Multiple evaluations combine to determine the best path forward.

#### **Search algorithm:**

The final component involves the search algorithm used to navigate through the solution space. The framework typically employs 2 fundamental algorithms:

- **Breadth-first search (BFS):** This algorithm explores all possible branches at each level before moving deeper into the tree. It makes sure that all potential solutions are considered equally, making it useful for problems where the shortest path or shallowest solution is preferred. For example, in a puzzle game, BFS would check all immediate moves before considering subsequent ones.
- **Depth-first search (DFS):** This algorithm explores one branch deeply before backtracking to explore other branches. It allows for a thorough examination of each potential solution path, making it useful for problems requiring detailed exploration of each option. For example, in solving a complex logic problem, DFS would follow a single hypothesis deeply, checking its validity before considering alternatives.

By integrating these components, the ToT framework mimics human problem-solving by systematically considering multiple solutions and discarding the ones that are found incorrect.

The operational dynamics of the ToT framework involve an iterative, tree-structured exploration of possible solutions. Starting with the initial prompt, the model generates a range of thoughts or answers, each leading to subsequent queries or expansions. These branches develop as the model explores different reasoning paths. It employs tracking progress and exploring this entire solution space through an LLM-powered self-evaluation helping ensure each step's validity. If a particular line of reasoning reaches a contradiction or dead end, the system can backtrack to a previous node to explore alternative possibilities.

This structured yet flexible approach allows LLMs to handle complex, multistep reasoning tasks more effectively. It resembles the human ability to navigate through a maze of thoughts and options, reassessing and adjusting strategies as needed.

In essence, the ToT framework equips LLMs with a more human-like ability to reason and solve problems, enhancing their effectiveness in tasks that require deep, strategic thinking and decision-making.

## Difference between chain of thoughts (CoT) and tree of thoughts (ToT)

The tree of thoughts (ToT) and [chain of thoughts (CoT)](https://www.ibm.com/think/topics/chain-of-thoughts) frameworks serve as conceptual algorithms for understanding the organization and progression of [text generation](https://www.ibm.com/think/topics/text-generation) in language models (LMs) such as generative pretrained [transformers](https://www.ibm.com/think/topics/transformer-model) (for example, GPT-3 and GPT-4). These prompting techniques are a part of [prompt engineering](https://www.ibm.com/topics/prompt-engineering), which involves crafting inputs (prompts) to effectively guide LMs in generating preferred outputs.

**Tree of thoughts prompting:** This framework operates on the model’s ability to generate text hierarchically, with a central topic or idea leading to branching subtopics and details. This approach mirrors how a model can expand on a specific prompt by generating increasingly specific and related text, similar to a tree structure. It allows for lookahead and tree search strategies, where the model can explore multiple branches before committing to a path, making it suitable for general problem-solving and scenarios requiring complex decision-making. This method incorporates common sense reasoning and heuristics to evaluate the quality of each branch. The self-consistency mechanism is employed to provide reliable evaluations by [prompting](https://www.ibm.com/think/topics/prompt-chaining) the model multiple times.

[Chain of thought prompting](https://www.ibm.com/think/topics/chain-of-thoughts): In contrast, this concept corresponds to the model's capacity to generate text in a linear, left-to-right fashion, where each subsequent token is directly influenced by the preceding tokens. This sequential progression reflects a simpler, more straightforward approach to text generation. CoT is effective for tasks that require a clear, step-by-step logical flow. Few-shot learning, where the model is provided with a few examples to learn from, can enhance this method by providing contextual understanding. CoT serves as a baseline technique in [prompt engineering](https://www.ibm.com/topics/prompt-engineering), offering a foundational method that is simpler to implement but might lack the depth and complexity of ToT.

**Comparison and applications:** While ToT prompting represents a more intricate and interconnected approach to text generation, by using tree search and lookahead strategies, CoT reflects a simpler, sequential progression. ToT's hierarchical nature makes it suitable for tasks requiring detailed exploration of multiple solutions, such as reinforcement learning scenarios, where backtracking and alternative strategies are crucial. However, CoT's linear progression is ideal for tasks that need a clear, logical sequence of thoughts.

In practical applications, APIs for LMs, including GPT-3 and GPT-4, use prompting techniques such as ToT and CoT to enhance their performance in diverse tasks, from creative writing to complex problem-solving.[2] Prompt engineering continues to evolve, providing powerful tools for harnessing the capabilities of advanced [transformers](https://www.ibm.com/think/topics/transformer-model) in language models.

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## Advantages and limitations of tree of thoughts

The ToT framework represents a significant advancement in the capabilities of LLMs for complex problem-solving. However, there are tradeoffs involving the added complexity inherent in the implementation of this framework.

### Advantages

The framework offers benefits to the field of [artificial intelligence](https://www.ibm.com/think/topics/artificial-intelligence) including:

#### Enhanced problem-solving abilities

ToT significantly improves the problem-solving skills of LLMs by enabling them to explore multiple reasoning paths simultaneously. This mirrors human cognitive processes where several potential solutions are considered and the most viable one is selected. For instance, in tasks requiring strategic thinking or planning, such as solving word puzzles or generating creative writing, ToT has demonstrated superior performance, achieving higher success rates compared to traditional methods. This increased capacity for complex reasoning by decomposing the intermediate steps is especially evident in challenging tasks where initial decisions greatly influence outcomes.[4]

#### Handling of uncertainty

Tree of uncertain thoughts (TouT), an extension of ToT, specifically addresses the inherent uncertainties present in the decision-making processes of LLMs. By quantifying and managing these uncertainties, TouT allows for more accurate and reliable outcomes. It uses techniques such as the Monte Carlo Dropout. This technique is used in machine learning, particularly in deep learning models, to estimate uncertainty in predictions. It involves randomly dropping out neurons during both training and inference, which creates multiple different "paths" through the network. By averaging the predictions from these different paths, the model can provide more reliable estimates of uncertainty. This technique is valuable in applications where precise and trustworthy predictions are essential, such as medical diagnosis or financial forecasting.[5]

### Limitations

Along with the benefits, there are some inherent limitations that must be considered.

#### Computational overhead

The ToT framework involves complex operations such as maintaining multiple decision paths, backtracking and exploring alternative solutions. These processes are computationally intensive, often requiring significant resources in terms of processing power and memory. The need for resources can limit the scalability of ToT, especially in environments where computational resources are constrained or in real-time applications where rapid response times are critical.

#### Implementation complexity

Setting up a tree of thoughts system involves integrating various components such as the prompter agent, checker module, memory module and tree of thoughts controller.[1] Each component must be finely tuned to work in harmony, which can be a complex and time-consuming process. Moreover, the system’s efficacy heavily depends on the quality of its implementation. Poor configuration of any component can reduce the effectiveness of the entire system, making it less reliable or leading to incorrect problem-solving pathways.

#### Search inefficiency

Recent research has raised concerns about the efficiency of ToT-style prompting. The study highlights that ToT can lead to redundant exploration of low-value reasoning paths, resulting in unnecessary computational overhead and slower task performance. Unlike more targeted planning strategies, ToT lacks mechanisms to prioritize promising branches, which can hinder its effectiveness in complex reasoning tasks.[[6]](#f06)

To address these issues, the researchers propose an alternative approach—**Thought of Search**—which incorporates planning heuristics and information gain to guide the reasoning process more efficiently. These findings suggest that while ToT remains a powerful conceptual framework, its practical application may benefit from integration with more efficient search strategies.[[6]](#f06)

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## Case studies

The ToT framework has demonstrated its efficacy across various applications, showcasing its robustness and adaptability. Here, we explore 4 compelling case studies where ToT has significantly enhanced problem-solving capabilities:

### Sudoku puzzle solving

ToT application in sudoku puzzle-solving exemplifies its capacity to navigate complex logical challenges. By guiding the model through various number placements and enabling it to backtrack upon encountering contradictions, ToT streamlines the path to correct solutions. This ability to dynamically reassess decisions dramatically improves problem-solving accuracy and efficiency, highlighting ToT's advantage over more static problem-solving approaches.[[1]](#f01)

### Game of 24

In the strategic arithmetic game of 24, ToT significantly improved success rates by enabling the model to explore multiple calculation paths. This adaptive reasoning process allowed the model to solve puzzles more creatively and effectively, demonstrating ToT's capacity for enhancing cognitive flexibility in numerical problem-solving.[[4]](#f04)

### Creative writing

ToT has also been applied to creative writing tasks, where it aids LLMs in generating more coherent and contextually appropriate narratives. By structuring the thought process into a branching tree, the model can explore different plot developments or stylistic choices and select or revise based on the most promising outcomes. This method has led to improvements in the quality and originality of text generated by LLMs, providing a more nuanced approach to automated storytelling.[[4]](#f04)

### 5x5 crossword solving

Another remarkable application of ToT is in solving 5x5 mini crossword puzzles. The framework enables the model to consider multiple word options for each crossword clue, evaluating them not just in isolation but also how they interact with already placed words. This iterative, holistic assessment approach helps ensure higher accuracy in puzzle completion and demonstrates ToT's ability to apply logical and contextual reasoning in linguistically complex tasks. The use of ToT in this context highlights its versatility and effectiveness in tasks that require the integration of multiple types of knowledge and reasoning strategies.[[4]](#f04)

These case studies illustrate the diverse capabilities of the tree of thoughts framework, from enhancing logical and numerical reasoning to boosting creativity and contextual understanding in language-based tasks. Each example underscores ToT's potential to revolutionize problem-solving across disciplines.

## Recent advancements

Recent advancements in ToT research have focused on expanding its capabilities and addressing inherent challenges in its application. Key developments include:

### Uncertainty quantification

The introduction of the tree of uncertain thoughts (TouT) marks a significant advancement in ToT research. TouT enhances ToT by integrating uncertainty quantification mechanisms that assess the reliability of each decision path. This development is crucial for applications where decisions must be made under conditions of uncertainty and where the cost of mistakes can be high.[[5]](#f04)

### Global decision-making

Further research has focused on enhancing the global decision-making abilities of LLMs when using ToT. Recent studies have introduced feedback loops into the framework, allowing models to learn from past decisions and adjust their reasoning processes in real-time. This iterative feedback mechanism helps refine the decision-making process, making it more dynamic and responsive to the evolving context of the problem. Such enhancements aim to bring the reasoning capabilities of LLMs closer to human cognitive processes, where learning from past experiences plays a crucial role in shaping future decisions.[[4]](#f05)

These recent developments underscore the ongoing efforts to refine and expand the tree of thoughts framework, helping ensure its applicability and effectiveness in increasingly complex problem-solving scenarios. These advancements not only enhance the capabilities of LLMs but also open up new avenues for research and application in artificial intelligence.

##### Footnotes

[1] Long, J. (May 2023). Large Language Model Guided Tree-of-Thought.

[2] Karthik Narasimhan, S. Y. (July 2023). Official Repository of Tree of Thoughts (ToT). <https://github.com/princeton-nlp/tree-of-thought-llm>

[3] Pengfei Liu, W. Y. (2021). *Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in Natural Language Processing.* ACM Computing Surveys.

[4] Shunyu Yao, D. Y. (2023). Tree of Thoughts: Deliberate Problem Solving with Large Language Models. *ArXiv, abs/2305.10601.*
<https://arxiv.org/abs/2305.10601>

[5] 5 Shentong Mo, M. X. (September 2023). Tree of Uncertain Thoughts Reasoning for Large Language Models. *ArXiv,*abs/2309.07694. <https://arxiv.org/abs/2309.07694>

[6] Katz, M., Kokel, H., Srinivas, K., & Sohrabi, S. (2024). _Thought of search: Planning with language models through the lens of efficiency_. In A. Globerson, L. Mackey, D. Belgrave, A. Fan, U. Paquet, J. Tomczak, & C. Zhang (Eds.), _Advances in Neural Information Processing Systems_ (Vol. 37, pp. 138491–138568).

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
