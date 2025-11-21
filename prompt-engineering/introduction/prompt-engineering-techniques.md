# Prompt engineering techniques

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

## Author(s):

[Vrunda Gadesha](https://www.ibm.com/think/author/vrunda-gadesha)

AI Advocate | Technical Content Author

##

Prompt engineering techniques are strategies used to design and structure prompts, input queries or instructions, provided to AI models, particularly [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) such as openAI’s GPT-4, Google Gemini or [IBM® GraniteTM](https://www.ibm.com/granite). These techniques aim to guide [generative AI](https://www.ibm.com/think/topics/generative-ai) (gen AI) systems to produce accurate, relevant and contextually appropriate responses, enabling users to achieve desired outputs effectively.

Large language models, which are built on advanced [machine learning](https://www.ibm.com/think/topics/machine-learning) algorithms, are capable of understanding and generating human-like text. [Prompt engineering](https://www.ibm.com/think/topics/prompt-engineering-techniques) leverages this capability by crafting inputs that help the model perform complex tasks, such as summarization, translation, creative writing, or problem-solving, with greater precision. By experimenting with different prompt structures, users can influence the behavior of LLMs to optimize their performance across diverse applications.

As generative AI continues to play a key role in various domains, understanding prompt engineering techniques has become essential for unlocking its full potential and tailoring AI models to meet specific needs efficiently.

## Understanding prompts

A prompt is the input text or query provided to an AI model, such as a large language model to generate a response. It serves as the primary mechanism for guiding the model’s behavior, defining the task and setting the context for the interaction. The design of a prompt significantly impacts the quality and relevance of the output, making it essential to choose the right type of prompt for specific tasks.

To achieve the best results from AI models, it is essential to understand the various ways prompts can be structured to suit different tasks and objectives. There are three primary ways to structure the prompt: direct instructions, open-ended instructions and task-specific instructions.

**Direct instructions** are clear and specific commands that tell the AI exactly what to do. These prompts are ideal for straightforward tasks where the user has a clear expectation of the output. **Direct prompts** rely on the model’s ability to parse explicit instructions and generate responses that align closely with the command. The more detailed the instruction, the more likely the output will meet expectations.

Example:

Write a poem about nature.

In this case, the AI knows the exact format _[a poem]_ and topic _[nature]_ to generate the text.

**Open-ended instructions** are less restrictive and encourage the AI to explore broader ideas or provide creative and interpretive responses. These prompts are useful for brainstorming, storytelling or exploratory discussions where the user values variety and originality in the output. **Open-ended prompts** tap into the model’s generative capabilities without imposing constraints. The model relies on its training data to infer the best approach to the prompt, which can produce diverse or unexpected results.

Example:

Tell me about the universe.

Here, the AI has the freedom to decide what aspects of the universe to discuss, such as its _origin, structure or scientific theories_.

**Task-specific instructions** are designed for precise, goal-oriented tasks, such as translations, summarization or calculations. These prompts are often crafted with clarity and can include additional context or examples to help ensure accurate responses. **Task-specific prompts** leverage the model’s understanding of specialized tasks. They can incorporate advanced prompting techniques like few-shot prompting (providing examples) or zero-shot prompting (providing no examples but relying on the model’s pretrained knowledge).

Example:

Translate this text into French: ‘Hello.’

The model understands both the language translation task and the specific input text, enabling it to produce the desired output: “Bonjour.”

By understanding these types of prompts and the technical nuances behind them, users can craft prompts that guide AI models effectively, optimizing the quality and relevance of the responses.

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## Key techniques in prompt engineering

To maximize the effectiveness of AI models, prompt engineering employs a variety of techniques tailored to different tasks and objectives. The following are several key techniques, each explained with examples of prompts designed to achieve specific outcomes.

To demonstrate the effectiveness of various prompt engineering techniques, Let’s check a single task as the central use case: explaining climate change. The task is framed as follows:

Explain the concept of climate change, its causes, and its effects in a way that is accessible to a general audience.

Each technique approaches the task differently, offering varying levels of guidance, complexity, and methodology. Below, we explore how these techniques can be applied to this use case, with prompts tailored to highlight their unique capabilities.

#### Zero-shot prompting

[Zero-shot prompting](https://www.ibm.com/think/topics/zero-shot-prompting) involves asking the model to perform a task without providing any prior examples or guidance. It relies entirely on the AI’s pretrained knowledge to interpret and respond to the prompt.[1]

Example prompt:

Explain the concept of climate change, its causes, and its effects in simple terms.

The model is given no prior examples or additional context and must rely solely on its pretrained knowledge to generate the output.

#### Few-shot prompting

[Few-shot prompting](https://www.ibm.com/think/topics/few-shot-prompting) includes a small number of examples within the prompt to demonstrate the task to the model. This approach helps the model better understand the context and expected output.[[2]](#f02)

Example prompt:

Here are some examples of how to explain complex topics:

- Topic: Photosynthesis
- Explanation: Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into energy and oxygen.
- Topic: Gravity
- Explanation: Gravity is the force that pulls objects toward each other, like how the Earth pulls us to its surface.

Now explain: Climate Change.

By providing a few examples of how to explain other topics, the model is guided on the tone and level of simplicity expected for the climate change explanation.

#### Chain of thought (CoT) prompting

[CoT prompting](https://www.ibm.com/think/topics/chain-of-thoughts) encourages the model to reason through a problem step by step, breaking it into smaller components to arrive at a logical conclusion.[[3]](#f03)

Example prompt:

Step 1: Define what climate change is.
Step 2: Explain the causes of climate change.
Step 3: Describe its effects on the planet.

Now, follow these steps to explain climate change.

The model is encouraged to think step by step, breaking down the explanation into smaller, logical parts for clarity.

#### Meta prompting

Meta prompting involves asking the model to generate or refine its own prompts to better perform the task. This technique can improve output quality by leveraging the model’s ability to self-direct.[[4]](#f04)

Example prompt:

Create a prompt that will help you explain climate change, its causes, and its effects in simple terms

The model generates its own prompt before attempting to explain the topic, potentially improving the relevance and quality of the output.

#### Self-consistency

Self-consistency uses multiple independent generations from the model to identify the most coherent or accurate response. It’s particularly useful for tasks requiring reasoning or interpretation.[[5]](#f05)

Example prompt:

Provide three different explanations of climate change, its causes, and its effects. Then identify the most coherent and clear explanation

The model produces multiple independent responses and selects the most consistent or coherent one as the final output.

#### Generate knowledge prompting

This technique involves asking the model to generate background knowledge before addressing the main task, enhancing its ability to produce informed and accurate responses.[[6]](#f06)

Example prompt:

Before explaining climate change, first list the key scientific principles related to it. Once done, use these principles to explain the concept, its causes, and its effects.

The model generates background knowledge first (for example, greenhouse gases, global warming) to provide a more informed explanation.

#### Prompt chaining

[Prompt chaining](https://www.ibm.com/think/topics/prompt-chaining) involves linking multiple prompts together, where the output of one prompt serves as the input for the next. This technique is ideal for multistep processes.

Example prompt:

What is climate change? Provide a brief definition.

Next prompt based on the previous response:

What are the primary causes of climate change?

Next prompt based on the previous response:

What are the effects of climate change on the environment and human life?

The task is divided into a chain of smaller prompts, with the output of each step feeding into the next for a more structured explanation.

#### Tree of thoughts prompting

[Tree of thoughts prompting](https://www.ibm.com/think/topics/tree-of-thoughts) encourages the model to explore multiple branches of reasoning or ideas before arriving at a final output.[[7]](#f07)[[8]](#f08)

Example prompt:

List three possible ways to explain climate change to a general audience. For each method, describe its advantages and disadvantages. Then choose the best explanation and elaborate on it

The model explores multiple approaches to the explanation and selects the most effective one, providing a well-rounded output.

#### Retrieval augmented generation (RAG)

[Retrieval augmented generation (RAG)](https://www.ibm.com/think/topics/retrieval-augmented-generation) combines external information retrieval with generative AI to produce responses based on up-to-date or domain-specific knowledge.[[9]](#f09)

Example prompt:

Using the global temperature datasets from NASA GISS (GISTEMP) dataset on climate science, explain climate change, its causes, and its effects in simple terms.

The model combines its generative abilities with external knowledge to produce an informed explanation.

#### Automatic reasoning and tool-use

This technique integrates reasoning capabilities with external tools or application programming interfaces (APIs), allowing the model to use resources like calculators or search engines.[[10]](#f10)

Example prompt:

Use the provided climate data to calculate the global temperature rise over the last century, and then explain how this relates to climate change, its causes, and its effects.

The model integrates reasoning with external tools (for example, calculators or APIs) to analyze data and provide a data-driven explanation.

#### Automatic prompt engineer

This method involves using the AI itself to generate and optimize prompts for specific tasks, automating the process of crafting effective instructions.

Example prompt:

Generate a prompt that will help explain climate change, its causes, and effects. Then use the generated prompt to provide the explanation.

The model automates the creation of an optimized prompt to improve the quality of its response.

#### Active-prompt

Active-prompting dynamically adjusts the prompt based on intermediate outputs from the model, refining the input for better results.[[11]](#f11)

Initial prompt

Explain climate change, its causes, and its effects in simple terms.

Follow-up prompt

Add more detail about the causes of climate change, focusing on human activities.

The prompt dynamically evolves based on the intermediate output, refining the response over iterations.

#### Directional stimulus prompting

[Directional stimulus prompting (DSP)](https://www.ibm.com/think/topics/directional-stimulus-prompting) uses directional cues to nudge the model toward a specific type of response or perspective.[[12]](#f12)

Example prompt:

Explain the concept of climate change from an environmentalist’s perspective, focusing on the need for immediate action.

The model is nudged toward a specific perspective or tone, influencing the framing of its explanation.

#### Program-aided language models (PALM)

PALM integrates programming capabilities to augment the model’s reasoning and computational skills.[[13]](#f13)

Example prompt:

Write Python code to visualize the increase in global temperatures over time. Then explain how this data relates to climate change, its causes, and its effects.

The model combines programming with language generation to provide both a visualization and an explanation.

#### ReAct

[ReAct](https://www.ibm.com/think/topics/react-agent) combines reasoning and acting prompts, encouraging the model to think critically and act based on its reasoning.[[14]](#f14)

Example prompt:

Analyze the following climate data and identify key trends. Based on your analysis, explain the concept of climate change, its causes, and its effects.

This example illustrates how the model can combine analytical reasoning with actionable insights.

#### Reflexion

Reflexion allows the model to evaluate its previous outputs and refine them for improved accuracy or coherence.[[15]](#f15)

Example prompt:

Here is my first attempt at explaining climate change: [Insert initial output]. Review this explanation and improve it for clarity and accuracy.

The model reflects on its previous output and iteratively improves it.

#### Multimodal chain of thought (multimodal CoT)

This technique integrates chain of thought reasoning across multiple modalities, such as text, images or audio.[[16]](#f16)

Example prompt:

Analyze this infographic on global warming trends, then explain climate change, its causes, and its effects step by step

The model integrates reasoning across multiple modalities (text and images) to deliver a comprehensive explanation.

#### Graph prompting

Graph prompting leverages graph-based structures to organize and reason through complex relationships between concepts or data points.

Example prompt:

Using the provided graph of CO₂ emissions over time, explain how it relates to climate change, its causes, and its effects.

The model uses graph-based reasoning to connect data points and generate an insightful explanation.

Thus, we can see how different prompt engineering techniques can be applied to a single task. By using the same task across methods such as zero-shot, few-shot, chain of thought and tree of thoughts, we can see how each technique structures the task differently and guides the AI to produce unique responses. These examples showcase the flexibility and creativity of prompt engineering in solving a variety of challenges. Readers are encouraged to try these prompt examples with different AI models or applications, such as IBM Granite models, OpenAI’s ChatGPT, Google’s Bard, Anthropic’s Claude, Cohere or AI21 Labs’ Jurassic. Doing so allows users to see how outputs vary and find what works best for their needs.

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## Challenges with prompt engineering techniques

While prompt engineering techniques are powerful, they come with several challenges. Crafting effective prompts that consistently produce accurate outputs can be difficult, especially for tasks requiring complex reasoning, common sense understanding or nuanced responses. Hallucination is another common issue, where gen AI models generate information that is inaccurate or entirely fabricated. Relying on structured templates or fine-tuning the model can help mitigate some of these issues, but designing prompts that work across diverse scenarios remains a trial-and-error process. Additionally, balancing the general capabilities of artificial intelligence with task-specific objectives can be tricky, particularly for specialized or domain-specific tasks.

## Applications of prompt engineering techniques

Prompt engineering techniques have a wide range of applications across various fields. In chatbots, they help refine generated responses to enhance user interactions in real-time. For developers, prompts can assist in generating code snippets or creating step-by-step tutorials for programming concepts. In education, they can simplify explanations or solve a math problem with detailed reasoning. Businesses use prompt engineering for decision-making by generating insightful AI outputs tailored to specific scenarios. On a large scale, these techniques are employed in content creation, customer support and automated workflows, making AI systems more efficient and adaptable to diverse tasks.

## Future of prompt engineering techniques

The future of prompt engineering techniques lies in advancing natural language processing to help ensure more accurate and relevant responses across diverse applications. As AI models evolve, their reasoning ability will improve, enabling them to handle more complex tasks with minimal prompting. We can also expect the development of smarter tools and frameworks to automate and optimize prompt creation, making interactions with AI more intuitive, efficient and personalized for users across various domains.

## Summary

Prompt engineering techniques are essential for optimizing AI interactions and unlocking the full potential of large language models. By using structured approaches like zero-shot, few-shot, chain of thought and tree of thoughts, these techniques enable AI to tackle a wide range of tasks, from chatbots to decision-making and education. Despite challenges such as hallucinations and designing effective prompts, the applications of prompt engineering continue to expand across domains, providing smarter, more tailored AI outputs. As advancements in natural language processing and reasoning abilities progress, the future of prompt engineering promises even greater efficiency and adaptability. Readers are encouraged to experiment with these techniques across different AI models to explore their capabilities and refine their results.

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

[1] Wei, J., Bosma, M., Zhao, V.Y., Guu, K., Yu, A.W., Lester, B., Du, N., Dai, A.M. and Le, Q.V., 2021. Finetuned language models are zero-shot learners. arXiv preprint arXiv:2109.01652.

[2] Touvron, H., Lavril, T., Izacard, G., Martinet, X., Lachaux, M.A., Lacroix, T., Rozière, B., Goyal, N., Hambro, E., Azhar, F. and Rodriguez, A., 2023. Llama: Open and efficient foundation language models. arXiv preprint arXiv:2302.13971.

[3] Wei, J., Wang, X., Schuurmans, D., Bosma, M., Xia, F., Chi, E., Le, Q.V. and Zhou, D., 2022. Chain-of-thought prompting elicits reasoning in large language models. Advances in neural information processing systems, 35, pp.24824-24837.

[4] Zhang, Y., Yuan, Y. and Yao, A.C.C., 2023. Meta prompting for ai systems. arXiv preprint arXiv:2311.11482.

[5] Wang, X., Wei, J., Schuurmans, D., Le, Q., Chi, E., Narang, S., Chowdhery, A. and Zhou, D., 2022. Self-consistency improves chain of thought reasoning in language models. arXiv preprint arXiv:2203.11171.

[6] Liu, J., Liu, A., Lu, X., Welleck, S., West, P., Bras, R.L., Choi, Y. and Hajishirzi, H., 2021. Generated knowledge prompting for commonsense reasoning. arXiv preprint arXiv:2110.08387.

[7] Yao, S., Yu, D., Zhao, J., Shafran, I., Griffiths, T., Cao, Y. and Narasimhan, K., 2023. Tree of thoughts: Deliberate problem solving with large language models. Advances in neural information processing systems, 36, pp.11809-11822.

[8] Long, J., 2023. Large language model guided tree-of-thought. arXiv preprint arXiv:2305.08291.

[9] Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W.T., Rocktäschel, T. and Riedel, S., 2020. Retrieval-augmented generation for knowledge-intensive nlp tasks. Advances in neural information processing systems, 33, pp.9459-9474.

[10] Paranjape, B., Lundberg, S., Singh, S., Hajishirzi, H., Zettlemoyer, L. and Ribeiro, M.T., 2023. Art: Automatic multi-step reasoning and tool-use for large language models. arXiv preprint arXiv:2303.09014.

[11] Diao, S., Wang, P., Lin, Y., Pan, R., Liu, X. and Zhang, T., 2023. Active prompting with chain-of-thought for large language models. arXiv preprint arXiv:2302.12246.

[12] Li, Z., Peng, B., He, P., Galley, M., Gao, J. and Yan, X., 2023. Guiding large language models via directional stimulus prompting. Advances in Neural Information Processing Systems, 36, pp.62630-62656

[13] Gao, L., Madaan, A., Zhou, S., Alon, U., Liu, P., Yang, Y., Callan, J. and Neubig, G., 2022. Pal: program-aided language models. arXiv. arXiv preprint arXiv:2211.10435.

[14] Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K. and Cao, Y., 2023, January. React: Synergizing reasoning and acting in language models. In International Conference on Learning Representations (ICLR).

[15] Shinn, N., Cassano, F., Gopinath, A., Narasimhan, K. and Yao, S., 2023. Reflexion: Language agents with verbal reinforcement learning. Advances in Neural Information Processing Systems, 36, pp.8634-8652.

[16] Zhang, Z., Zhang, A., Li, M., Zhao, H., Karypis, G. and Smola, A., 2023. Multimodal chain-of-thought reasoning in language models. arXiv preprint arXiv:2302.00923.

[17] Liu, Z., Yu, X., Fang, Y. and Zhang, X., 2023, April. Graphprompt: Unifying pre-training and downstream tasks for graph neural networks. In Proceedings of the ACM web conference 2023 (pp. 417-428).
