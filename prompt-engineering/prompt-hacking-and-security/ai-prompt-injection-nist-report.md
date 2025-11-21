# How AI can be hacked with prompt injection: NIST report

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

Ronda Swaney

Freelance Technology Writer

##

The National Institute of Standards and Technology (NIST) closely observes the AI lifecycle, and for good reason. As AI proliferates, so does the discovery and exploitation of AI cybersecurity vulnerabilities. Prompt injection is one such vulnerability that specifically attacks [generative AI](https://www.ibm.com/think/topics/generative-ai).

In [Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-2e2023.pdf), NIST defines various adversarial machine learning (AML) [tactics and cyberattacks](https://www.ibm.com/think/insights/mapping-attacks-generative-ai-business-impact), like prompt injection, and advises users on how to mitigate and manage them. AML tactics extract information about how [machine learning (ML)](https://www.ibm.com/think/topics/machine-learning) systems behave to discover how they can be manipulated. That information is used to attack [AI](https://www.ibm.com/think/topics/artificial-intelligence) and its [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) to circumvent security, bypass safeguards and open paths to exploit.

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## What is prompt injection?

NIST defines two [prompt injection attack](https://www.ibm.com/think/topics/prompt-injection) types: direct and indirect. With direct prompt injection, a user enters a text prompt that causes the LLM to perform unintended or unauthorized actions. An indirect prompt injection is when an attacker poisons or degrades the data that an LLM draws from.

One of the best-known direct prompt injection methods is DAN, Do Anything Now, a prompt injection used against ChatGPT. [DAN uses roleplay to circumvent moderation filters](https://www.vice.com/en/article/people-are-jailbreaking-chatgpt-to-make-it-endorse-racism-conspiracies/). In its first iteration, prompts instructed ChatGPT that it was now DAN. DAN could do anything it wanted and should pretend, for example, to help a nefarious person create and detonate explosives. This tactic evaded the filters that prevented it from providing criminal or harmful information by following a roleplay scenario. OpenAI, the developers of ChatGPT, track this tactic and update the model to prevent its use, but users keep circumventing filters to the point that the method has evolved to (at least) DAN 12.0.

Indirect prompt injection, as NIST notes, depends on an attacker being able to provide sources that a generative AI model would ingest, like a PDF, document, web page or even [audio files used to generate fake voices](https://www.ibm.com/think/insights/using-generative-ai-distort-live-audio-transactions). Indirect prompt injection is widely believed to be [generative AI’s greatest security flaw](https://www.wired.com/story/generative-ai-prompt-injection-hacking/), without simple ways to find and fix these attacks. Examples of this prompt type are wide and varied. They range from absurd (getting a chatbot to respond using “[pirate talk](https://greshake.github.io/)”) to damaging (using socially engineered chat to convince a user to reveal credit card and other personal data) to wide-ranging ([hijacking AI assistants](https://thehill.com/opinion/cybersecurity/3953399-hijacked-ai-assistants-can-now-hack-your-data/) to send scam emails to your entire contact list).

[Explore AI cybersecurity solutions](https://www.ibm.com/ai-cybersecurity)

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## How to stop prompt injection attacks

These attacks tend to be well hidden, which makes them both effective and hard to stop. How do you [protect against direct prompt injection](https://www.ibm.com/think/insights/prevent-prompt-injection)? As NIST notes, you can’t stop them completely, but defensive strategies add some measure of protection. For model creators, NIST suggests ensuring training datasets are carefully curated. They also suggest training the model on what types of inputs signal a prompt injection attempt and training on how to identify adversarial prompts.

For indirect prompt injection, NIST suggests human involvement to fine-tune models, known as reinforcement learning from human feedback (RLHF). RLHF helps models align better with human values that prevent unwanted behaviors. Another suggestion is to filter out instructions from retrieved inputs, which can prevent executing unwanted instructions from outside sources. NIST further suggests using LLM moderators to help detect attacks that don’t rely on retrieved sources to execute. Finally, NIST proposes interpretability-based solutions. That means that the prediction trajectory of the model that recognizes anomalous inputs can be used to detect and then stop anomalous inputs.

Generative AI and those who wish to exploit its vulnerabilities will continue to alter the cybersecurity landscape. But that same transformative power can also deliver solutions. Learn more about how [IBM Security](https://www.ibm.com/ai-cybersecurity) delivers AI cybersecurity solutions that strengthen security defenses.

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
