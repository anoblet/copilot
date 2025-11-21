# RAG vs. fine-tuning vs. prompt engineering

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

[Ivan Belcic](https://www.ibm.com/think/author/ivan-belcic)

Staff writer

[Cole Stryker](https://www.ibm.com/think/author/cole-stryker.html)

Staff Editor, AI Models

IBM Think

## RAG vs. fine-tuning vs. prompt engineering

[Prompt engineering](https://www.ibm.com/think/topics/prompt-engineering), [fine-tuning](https://www.ibm.com/think/topics/fine-tuning) and [retrieval augmented generation (RAG)](https://www.ibm.com/think/topics/retrieval-augmented-generation) are three optimization methods that enterprises can use to get more value out of [large language models (LLMs](https://www.ibm.com/think/topics/large-language-models)). All three optimize model behavior, but which one to use depends on the target use case and available resources.

[Generative AI](https://www.ibm.com/think/topics/generative-ai) models are trained on massive pools of data, much of which is gleaned from the internet. [Artificial intelligence](https://www.ibm.com/think/topics/artificial-intelligence) developers do not typically have access to niche data, such as an enterprise’s proprietary and internal data. When organizations want to apply [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) to for specific needs, they need to tweak the way that the gen [AI model](https://www.ibm.com/think/topics/ai-model) works to produce the desired outputs and behavior.

Prompt engineering, RAG and fine-tuning all help optimize an LLM’s outputs for target use cases. With them, data scientists can get better downstream performance, greater domain-specific accuracy and output that meets relevant formatting, language or regulatory requirements.

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## What’s the difference between RAG, fine-tuning and prompt engineering?

The difference between prompt engineering, RAG and fine-tuning covers four primary areas of distinction:

- Approach

- Goals

- Resource requirements

- Applications

### Approach

Prompt engineering optimizes input prompts to steer a model toward better outputs. Fine-tuning LLMs trains them with domain-specific datasets to increase performance in downstream tasks. RAG connects an LLM to a database and automates information retrieval to augment prompts with relevant data for greater accuracy.

### Goals

RAG, prompt engineering and fine-tuning have the same broad outcome: enhancing a model’s performance to maximize value for the enterprise that uses it. But more specifically, prompt engineering should lead a model to deliver the results the user wants. RAG aims to guide a model toward giving more relevant and accurate outputs.

Meanwhile, a fine-tuned model is retrained on a focused set of external data to improve performance in specific use cases. The three methods are not mutually exclusive and are often combined for optimal outcomes.

### Resource requirements

Prompt engineering is the least time-consuming and resource-intensive of the three optimization techniques. Basic prompt engineering can be done manually without any investment into extra compute.

RAG requires data science expertise to organize enterprise datasets and construct the data pipelines that connect LLMs to those data sources. Fine-tuning is arguably the most demanding because the data preparation and training processes are so compute-intensive and time-consuming.

### Applications

Prompt engineering is the most flexible and shines in open-ended situations with a potentially diverse array of outputs, such as when asking an LLM to generate content from scratch. Image, video and text generation success thrive on strong prompts.

Fine-tuning hones a model for highly focused work—when data scientists need a model to do one thing very well. RAG is an ideal solution where accurate, relevant, current information is paramount, such as with customer service [chatbots](https://www.ibm.com/think/topics/chatbots).

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## Why are prompt engineering, RAG and fine-tuning important?

Prompt engineering offers a range of methods for giving models explicit instructions on how to behave. With clear directives, model behavior can be more precisely sculpted without having to invest in resource-intensive retrieval systems or training.

RAG plugs an LLM into proprietary real-time data that would otherwise be inaccessible to it. RAG models can return more accurate answers with the added context of internal data than they otherwise would be able to without it.

A fine-tuned model typically outperforms its corresponding base model, such as those in the [GPT](https://www.ibm.com/think/topics/gpt) family, when applying its training with domain-specific data. With greater access to external knowledge, a fine-tuned LLM has a better understanding of the specific domain and its terminology.

## What is prompt engineering?

Prompt engineering is the process of creating effective prompts that guide a model toward desired outputs without expanding its knowledge base. The prompt engineering process does not significantly alter a pre-trained model’s parameters.

The goal of prompt engineering is to craft prompts that cause a model’s outputs to meet the specific requirements of the intended use case. Further training and greater data access cannot compensate for poor prompting.

### How does prompt engineering work?

Prompt engineering works by tweaking the structure and content of input prompts based on previous model outputs. With each iteration, the prompt engineer learns how the model responds to prior inputs, then uses those results to inform the next prompt. The goal is to modify model behavior through clear instructions.

Good prompt engineering is based on prompts that tell a [natural language processing (NLP)](https://www.ibm.com/think/topics/natural-language-processing) model exactly what to do. The prompt engineering process involves experimenting with the prompt’s content, structure and language to discover the optimal format that leads to the needed output from the model.

Compare a machine learning model to an aspiring home cook who wants to make a great dinner. Prompt engineering would be analogous to a more knowledgeable friend or relative who helps them plan their approach to the meal. With solid advice on what to make and how, the eager home cook is more likely to produce something delicious.

## What is retrieval augmented generation (RAG)?

RAG is a data architecture framework that connects an LLM to other data, such as an organization’s proprietary data, often stored in [data lakehouses](https://www.ibm.com/think/topics/data-lakehouse). RAG systems add relevant data to LLM prompts so the LLM can generate more accurate answers.

### How does RAG work?

Retrieval augmented generation works by locating data that is relevant to the user’s query, then using that data to create more informative prompts. An information retrieval mechanism is added to augment the prompts for the LLM and help it generate more relevant responses.

RAG models generate answers through a four-stage process:

1. Query: a user submits a query, which initializes the RAG system.
2. Information retrieval: complex algorithms or APIs comb internal and external knowledge bases in search of relevant information.
3. Integration: the retrieved data is combined with the user’s query and given to the RAG model to answer. Up to this point, the LLM has not processed the query.
4. Response: blending the retrieved data with its own training and stored knowledge, the LLM generates a contextually rich and accurate response.

When searching through documents, RAG systems use semantic search. Vector databases organize data by similarity, thus enabling searches by meaning, rather than by keyword. Semantic search techniques enable RAG algorithms to reach past keywords to the intent of a query and return the most relevant data.

RAG systems require extensive data architecture construction and maintenance. [Data engineers](https://www.ibm.com/think/topics/data-engineering) must build the data pipelines needed to connect their organization’s data lakehouses with the LLM and use RAG. RAG systems also need precise prompt engineering to locate the right data and make sure the LLM knows what to do with it.

Again, imagine a gen AI model as an amateur home cook. They know the basics of cooking but lack the latest information and expert knowledge of a chef trained in a particular cuisine. RAG is like giving the home cook a cookbook for that cuisine. By combining their general knowledge of cooking with the recipes in the cookbook, the home cook can create their favorite cuisine-specific dishes with ease.

## What is fine-tuning?

Fine-tuning is the process of retraining a pretrained model on a smaller, more focused set of training data to give it domain-specific knowledge. The model then adjusts its parameters—the guidelines governing its behavior—and its embeddings to better fit the specific data set.

### How does fine-tuning work?

Fine-tuning works by exposing a model to a data set of labeled examples. The model improves on its initial training as it updates its model weights based on the new data. Fine-tuning is a supervised learning method, which means the data used in training is organized and labeled. By contrast, most base models undergo unsupervised learning in which the data is unsorted—the model must categorize it on its own.

Once more imagining a gen AI model as a home cook, fine-tuning would be a cooking course in a specific cuisine. Before taking the course, the home cook would have a general understanding of cooking basics. But after undergoing culinary training and acquiring domain-specific knowledge, they’d be much more proficient in cooking that type of food.

### Full fine-tuning vs. parameter-efficient fine-tuning

Models can be either fully fine-tuned, which updates all their parameters or fine-tuned in a way that updates only the most relevant parameters. This latter process is known as [parameter-efficient fine-tuning (PEFT)](https://www.ibm.com/think/topics/parameter-efficient-fine-tuning) and is a cost-effective way to make models more effective in a certain domain.

Fine-tuning a model is compute-intensive and requires multiple powerful GPUs running in tandem—let alone the memory to store the LLM itself. PEFT enables LLM users to retrain their models on simpler hardware setups while returning comparable performance upgrades in the model’s intended use case, such as customer support or sentiment analysis. Fine-tuning especially excels at helping models overcome bias, which is a gap between the model’s predictions and actual real-world outcomes.

### Fine-tuning vs. continuous pretraining

Pretraining occurs at the very start of the training process. The model weights or parameters are randomly initialized and the model commences training on its initial data set. Continuous pretraining introduces a trained model to a new unlabeled data set in a practice known as transfer learning. The pretrained model "transfers" what it has learned so far to new external information.

By contrast, fine-tuning uses labeled data to hone a model’s performance in a selected use case. Fine-tuning excels at honing a model’s expertise at specific tasks, while continuous pretraining can deepen a model’s domain expertise.

#### Share

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
