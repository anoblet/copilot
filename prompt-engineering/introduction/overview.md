# What is prompt engineering?

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

[Vrunda Gadesha](https://www.ibm.com/think/author/vrunda-gadesha)

AI Advocate | Technical Content Author

##

[Generative AI](https://www.ibm.com/think/topics/generative-ai) systems are designed to generate specific outputs based on the quality of provided prompts. Prompt engineering helps generative AI models better comprehend and respond to a wide range of queries, from the simple to the highly technical.

The basic rule is that good prompts equal good results. Generative AI (gen AI) relies on the iterative refinement of different [prompt engineering techniques](https://www.ibm.com/think/topics/prompt-engineering-techniques) to effectively learn from diverse input data and adapt to minimize biases, confusion and produce more accurate responses.

Prompt engineers play a pivotal role in crafting queries that help generative AI models understand not just the language but also the nuance and intent behind the query. A high-quality, thorough and knowledgeable prompt, in turn, influences the quality of AI-generated content, whether it’s images, code, data summaries or text.

A thoughtful approach to creating prompts is necessary to bridge the gap between raw queries and meaningful AI-generated responses. By [fine-tuning](https://www.ibm.com/think/topics/fine-tuning) effective prompts, engineers can significantly optimize the quality and relevance of outputs to solve for both the specific and the general. This process reduces the need for manual review and postgeneration editing, ultimately saving time and effort in achieving the desired outcomes.

## Why is prompt engineering important?

Prompt engineering is critical because it directly influences the quality, relevance and accuracy of generative AI outputs. A well-crafted prompt helps ensure that the AI comprehends the user's intent and produces meaningful responses, minimizing the need for extensive postprocessing. As gen AI systems become more widely adopted across industries, a [prompt engineering guide](https://www.ibm.com/think/topics/prompt-engineering-guide) serves as the key to unlocking their full potential by bridging the gap between raw queries and actionable outputs.

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## How does prompt engineering work?

Generative AI models are built on [transformer](https://www.ibm.com/topics/transformer-model) architectures, which enable them to grasp the intricacies of language and process vast amounts of data through neural networks. AI prompt engineering helps mold the model’s output, helping ensure the [artificial intelligence](https://www.ibm.com/think/topics/artificial-intelligence) responds meaningfully and coherently. Several prompting techniques help ensure that AI models generate helpful responses, including tokenization, model parameter tuning and top-k sampling.

Prompt engineering is proving vital for unleashing the full potential of the foundation models that power generative AI. [Foundation models](https://research.ibm.com/topics/foundation-models) are large language models (LLMs) built on transformer architecture and packed with all the information the generative AI system needs.

Generative AI models operate based on [natural language processing](https://www.ibm.com/topics/natural-language-processing) (NLP) and use natural language inputs to produce complex results. The underlying data science preparations, transformer architectures and [machine learning](https://www.ibm.com/topics/machine-learning) algorithms enable these models to understand language and then use massive datasets to create text or image outputs.

Text-to-image generative AI like DALL-E and Midjourney uses an LLM in concert with stable diffusion, a model that excels at generating images from text descriptions. Effective prompt engineering combines technical knowledge with a deep understanding of natural language, vocabulary and context to produce optimal outputs with few revisions.

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## What are prompt engineering techniques?

Prompt engineering techniques involve strategies to guide generative AI models in producing desired outputs. These techniques include zero-shot prompting, where the model is given a task it hasn’t been explicitly trained on, and few-shot prompting, which provides the model with sample outputs to clarify expectations. Another key technique is chain-of-thought prompting, which breaks down complex tasks into step-by-step reasoning to improve the AI's understanding and accuracy. These approaches help ensure that the AI model generates more coherent and relevant responses.

## What are the benefits of prompt engineering?

The primary benefit of prompt engineering is the ability to achieve optimized outputs with minimal postgeneration effort. Generative AI outputs can be mixed in quality, often requiring skilled practitioners to review and revise. By crafting precise prompts, prompt engineers help ensure that AI-generated output aligns with the desired goals and criteria, reducing the need for extensive postprocessing.

It is also the purview of the prompt engineer to understand how to get the best results out of the variety of gen AI models on the market. For example, writing prompts for Open AI’s GPT-3 or GPT-4 differs from writing prompts for Google Bard. Bard can access information through Google Search, so it can be instructed to integrate more up-to-date information into its results. However, ChatGPT is the better tool for ingesting and summarizing text, as that was its primary design function. Well-crafted prompts guide AI models to create more relevant, accurate and personalized responses. Because AI systems evolve with use, highly engineered prompts make long-term interactions with AI more efficient and satisfying.

Clever prompt engineers working in open-source environments are pushing generative AI to do incredible things not necessarily a part of their initial design scope and are producing some surprising real-world results. For example, researchers developed a new AI system that can translate language without being trained on a parallel text. Engineers are embedding generative AI in games to engage human players in truly responsive storytelling and even to gain accurate new insights into the astronomical phenomena of black holes. Prompt engineering will become even more critical as generative AI systems grow in scope and complexity.

## What skills does a prompt engineer need?

Large technology organizations are hiring prompt engineers to develop new creative content, answer complex questions and improve machine translation and NLP tasks. Skills prompt engineers should have include:

- **Familiarity with large language models:** Understanding how [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) work, including their capabilities and limitations, is essential for crafting effective prompts and optimizing AI outputs.
- **Strong communication skills:** Clear and effective communication is vital for defining goals, providing precise instructions to AI models and collaborating with multidisciplinary teams.
- **The ability to explain technical concepts:** Prompt engineers must be able to translate complex technical concepts into understandable prompts and articulate AI system behavior to nontechnical stakeholders.
- **Programming expertise (particularly in Python):** Proficiency in programming languages like Python is valuable for interacting with APIs, customizing AI solutions and automating workflows.
- **A firm grasp of data structures and algorithms:** Knowledge of data structures and algorithms helps in optimizing prompts and understanding the underlying mechanisms of generative AI systems.
- **Creativity and a realistic assessment of the benefits and risks of new technologies:** Creativity is important for designing innovative and effective prompts, while a realistic understanding of risks helps ensure the responsible and ethical use of AI technologies.

In addition to these skills, prompt engineers can employ advanced techniques to improve the model’s understanding and output quality:

- **[Zero-shot prompting](https://www.ibm.com/think/topics/zero-shot-prompting):** This technique provides the machine learning model with a task that it hasn’t explicitly been trained on. It tests the model’s ability to produce relevant outputs without relying on prior examples.
- **[Few-shot prompting](https://www.ibm.com/think/topics/few-shot-prompting):** In this approach, the model is given a few sample outputs (shots) to help it learn what the requestor wants it to do. Having context to draw on helps the model better understand the desired output.
- **[Chain-of-thought prompting (CoT):](https://www.ibm.com/think/topics/chain-of-thoughts)** This advanced technique provides step-by-step reasoning for the model to follow. Breaking down a complex task into intermediate steps, or “chains of reasoning,” helps the model achieve better language understanding and create more accurate outputs.

While models are trained in multiple languages, English is often the primary language used to train generative AI. Prompt engineers will need a deep understanding of vocabulary, nuance, phrasing, context and linguistics because every word in a prompt can influence the outcome.

Prompt engineers should also know how to effectively convey the necessary context, instructions, content or data to the AI model.

If the goal is to generate code, a prompt engineer must understand coding principles and programming languages. Those working with image generators should know art history, photography and film terms. Those generating language context might need to know various narrative styles or literary theories.

In addition to a breadth of communication skills, prompt engineers need to understand generative AI tools and the [deep learning](https://www.ibm.com/think/topics/deep-learning) frameworks that guide their decision-making.

## What exactly does a prompt engineer do?

A prompt engineer designs, tests and refines prompts to optimize the performance of generative AI models. They work closely with AI systems to create queries that elicit accurate, relevant and creative responses. Their responsibilities include understanding the capabilities and limitations of different AI models, experimenting with advanced techniques such as zero-shot and few-shot prompting, and collaborating with teams to apply AI in real-world scenarios. Essentially, a prompt engineer bridges the gap between AI technology and practical applications.

## What are some prompt engineering best practices?

To get the best results from generative AI, prompt engineers should focus on crafting clear, concise and context-rich prompts. Using specific instructions and examples can help guide the AI to generate the desired output. Iteratively refining prompts based on the model’s responses allows engineers to improve results further. Additionally, understanding the limitations of the AI model and tailoring prompts accordingly can prevent errors or biased outputs. Finally, testing prompts across various scenarios helps ensure robustness and reliability.

## Prompt engineering use cases

As generative AI becomes more accessible, organizations are discovering new and innovative ways to use prompt engineering to solve real-world problems.

Chatbots

Prompt engineering is a powerful tool to help AI chatbots generate contextually relevant and coherent responses in real-time conversations. Chatbot developers can ensure the AI understands user queries and provides meaningful answers by crafting effective prompts.

Healthcare

In healthcare, prompt engineers instruct AI systems to summarize medical data and develop treatment recommendations. Effective prompts help AI models process patient data and provide accurate insights and recommendations.

Software development

Prompt engineering plays a role in software development by using AI models to generate code snippets or provide solutions to programming challenges. Using prompt engineering in software development can save time and assist developers in coding tasks.

Software engineering

Because generative AI systems are trained in various programming languages, prompt engineers can streamline the generation of code snippets and simplify complex tasks. By crafting specific prompts, developers can automate coding, debug errors, design API integrations to reduce manual labor and create API-based workflows to manage data pipelines and optimize resource allocation.

Cybersecurity and computer science

Prompt engineering is used to develop and test security mechanisms. Researchers and practitioners leverage generative AI to simulate cyberattacks and design better defense strategies. Additionally, crafting prompts for AI models can aid in discovering vulnerabilities in software.

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
