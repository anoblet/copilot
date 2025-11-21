# What is directional stimulus prompting (DSP)?

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

[Shalini Harkar](https://www.ibm.com/think/author/shalini-harkar)

Lead AI Advocate

## What is directional stimulus prompting (DSP)?

Directional stimulus prompting (DSP) is a new prompting methodology in natural language processing (NLP) wherein a model is presented with a directive or structured stimulus to generate wanted outputs.

Unlike standard prompting such as one-shot, zero-shot or few-shot prompting, this approach distinguishes itself by giving direct control over the model's output by establishing criteria or providing instruction. In this approach, a guiding stimulus acts as a control mechanism of the model's generative process along lines defined by a certain criterion.

Directive stimulus prompting (DSP) is useful when a task calls for a specific set of responses, very much context-sensitive, but still without labeled data.

For instance, in the case of summarization tasks, where retaining essential information is crucial, DSP provides a guiding stimulus that nudges the model to produce in a specific way. This leads to the overall generation of more accurate and contextually appropriate summaries.[1](#f01)

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## Need for directional stimulus prompting

Large language models (LLMs) such as GPT-3, 4 and PaLM are commonly referred to as "black box" models because users do not have access to their internals, such as parameters, tuning methods or decision-making processes.

Such interaction is essentially through text prompts that use application programming interface (API) calls as the major input and output mechanisms. While these models are quite excellent, their capability to produce precise task-specific outputs is often highly contingent on prompt quality.[2](#f02)[, 3](#f03)

With this, prompt engineering to design targeted prompts to steer model behavior is relevant. Both manual and automated approaches to prompt engineering have yielded notable success. However, they do not come without bitter pills, especially for those tasks that call for strong control or much instance-specific output.

For example, tasks such as summarization or dialogue generation require the model to follow target behaviors systematically, such as including key details or adhering to a strict reasoning pattern or prescribed stylistic guidelines. Conventional techniques are often not enough to guarantee consistent compliance with these nuanced requirements.

Directional stimulus prompting (DSP) comes to fill this gap. DSP is a small auxiliary policy model and generates instance-specific directional stimulus prompts that guide the LLM toward its decisions.

The prompts issued serve a specific context for each instance and are seen to coax the LLM to yield more aligned and desirable outputs. By plugging DSP into the process, users have a powerful tool to correct the behavior of black box LLMs to greater consistency, relevance and accuracy in work that needs precision.[1](#f01)

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## How DSP works

Training the policy model with supervised fine-tuning (SFT)

The process of training the policy model begins with supervised fine-tuning (SFT) on a pretrained model such as T5, GPT-2 or any other suitable LLM. The key idea is to fine-tune a smaller policy model on training data that generates directional stimuli rather than directly modifying the LLM.

This process is efficient because fine-tuning a smaller, task-specific policy model avoids the challenges and computational costs associated with training large, complex models directly.

To train this policy model, a small labeled dataset is created, where each input is paired with a pseudostimulus. These pseudo stimuli are designed to guide the LLM's responses in the wanted direction based on the task at hand.

For instance, in a summarization task, the pseudostimulus could consist of keywords or phrases drawn from a reference summary. Similarly, for dialogue generation tasks, dialogue acts such as requests, questions or statements can be used as pseudo stimuli.

These stimuli serve as signals that the policy model uses to generate task-specific inputs that effectively direct the LLM's output toward the target behavior.

The labeled dataset used for SFT might be relatively small, as the focus is on providing the policy language model with the necessary knowledge to generate stimuli, not training a massive LLM from scratch. This makes SFT a resource-efficient way to bootstrap the policy model with foundational knowledge about the task-specific requirements.[4](#f04)

Refinement through reinforcement learning (RL)

After the initial fine-tuning with SFT, the policy model is optimized through reinforcement learning (RL). RL enables the policy model to explore and refine its ability to generate stimuli that lead to higher-quality LLM outputs. The core idea in this phase is to use a reward function to evaluate the effectiveness of the generated stimuli.

For example, in summarization tasks, the reward function could be based on metrics such as ROUGE or BLEU scores, which measure the quality of the generated summary in comparison to refer to.

By focusing on training the policy model instead of the LLM directly, DSP overcomes the challenges associated with fine-tuning black box models, leading to a more efficient and scalable method.

Figure 1: Architecture of DSP framework

## Pros and cons of DSP

Directional stimulus prompting has notable advantages and some challenges, making it an intriguing yet intricate technique. Here’s a closer examination of its merits and demerits.[5](#f05)

Pros:

Targeted attention mechanism: The targeted attention mechanism in DSP emphasizes relevant tokens or information, enhancing accuracy and efficiency by concentrating processing on essential components.

Optimized resource usage: By concentrating on pertinent stimuli, directional stimulus prompting reduces dataset requirements, resulting in faster processing times and lower computational costs.

Enhanced precision: By isolating and emphasizing the most relevant input tokens, directional stimulus prompting boosts the accuracy of language model responses and interpretations.

Adaptability: This approach can be customized for various language tasks, ranging from text generation to sentiment analysis, offering versatility across different natural language processing applications.

Cons:

Reliance on accurate cues: The success of directional stimulus prompting heavily relies on precise stimuli, which can be challenging to achieve in complex or noisy environments. If the context or stimuli undergo significant changes, the method's effectiveness might diminish, resulting in reduced reliability.

Configuration complexity: Setting up directional stimuli needs careful design and calibration, which can make the initial configuration process more complicated.

Limited generalization: Its capacity to generalize across different signal types or unexpected input variations is limited, restricting its applicability in wider contexts.

## Use cases

Directive stimulus prompting (DSP) shows great potential across various NLP tasks, effectively guiding models to enhance their performance.

Summarization: DSP is used to create wanted summaries that align more closely with reference summaries. In an experimental result, using a small dataset of just 4,000 samples from the CNN/Daily Mail dataset, DSP improved benchmark performances such as ROUGE and BLEU or other measures including human preferences scores by 4–13%, surpassing some fully supervised models.[6](#f05)

Dialogue response generation: In task-oriented dialogue generation, DSP assisted ChatGPT in producing more accurate and relevant responses. For example, with only 80 dialogues from the MultiWOZ dataset, DSP achieved a performance boost of 41.4%, outpacing several state-of-the-art models (such as ChatGPT, Codex and InstructGPT) trained on larger datasets.[7](#f07)

Chain-of-thought reasoning: DSP also enhances chain-of-thought reasoning by generating instance-specific prompts that outperformed human-designed and automatically generated task-specific prompts, leading to improved reasoning accuracy. These examples illustrate how DSP can offer targeted guidance, enhancing model performance across a range of NLP applications.[8](#f08)

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

##### Footnotes

1 Zekun Li, Baolin Peng, Pengcheng He, Michel Galley, Xifeng Yan, jianfeng gao,(Microsoft, 22nd Feb 2023), Guiding Large Language Models via Directional Simulus Prompting, arXiv:2302.11520.
<https://github.com/Leezekun/Directional-Stimulus-Prompting>.

2 Sun, T., et.al, Black-box tuning for language-model as-a-service. In International Conference on Machine Learning, pp. 20841–20855. PMLR, 2022.

3 OpenAI. Gpt-4 technical report, 2023.

4 Wanwei He, et al., Galaxy: A generative pre-trained model for task-oriented dialog with semi-supervised learning and explicit policy injection. In Proceedings of the AAAI Conference on Artificial Intelligence, pp. 10749–10757, 2022.

5 Fei Liu (11th October 2024), A Systematic Survey on Large Language Models for Algorithm Design. arXiv: 2410.14716.

6 Goyal, T., Li, J. J., and Durrett, G. News summarization and evaluation in the era of GPT-3. arXiv preprint arXiv: 2209.12356, 2022.

7 Khattab, O., Santhanam, K., Li, X. L., Hall, D., Liang, P., Potts, C., and Zaharia, M. Demonstrate-search-predict: Composing retrieval and language models for knowledge-intensive nlp. arXiv preprint arXiv: 2212.14024, 2022.

8 Shi, W., Min, S., Yasunaga, M., Seo, M., James, R., Lewis, M., Zettlemoyer, L., and Yih, W.-t. Replug: Retrieval-augmented black-box language models. arXiv preprint arXiv: 2301.12652, 2023.
