# What is Prompt Caching?

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

Large language models (LLMs) are incredibly powerful, but they come with two major challenges cost and latency. Every token processed incurs a charge, and when users repeatedly query the same context, like a large document, they drive up costs by triggering redundant computations.

Also, the latency associated with processing these requests can degrade the responsiveness of your application, leading to a subpar user experience[[1]](#f01). Prompt caching emerges as a key solution to address these challenges.

In this article, we will explore what exactly is prompt caching , how it is different from conventional caching, how it can be applied in AI applications, various use cases. We will also look at the benefits and caveats to consider with prompt caching.

## What is Prompt Caching?

Prompt caching is a straightforward method to improve the speed and cost-efficiency of LLMs. It accomplishes these improvements by storing frequently unchanged parts of a prompt such as instructional content or reference material considerations so the model doesn’t have to reprocess those tokens repeatedly.

For example, when you send a request to an LLM (such as “ex*plain what is artificial intelligence?”*), the model reads the entire prompt to understand and respond. If you send the same prompt again, it repeats the same processing increasing time and cost.

With prompt caching, the model saves repeated parts of a prompt after the first request. When you resend the same prompt, it retrieves the stored response instead of reprocessing it. This process makes responses faster, more efficient and cost-effective, because the model doesn’t have to redo the same computation for identical prompts.[[2]](#f02)

## How is prompt caching different from conventional caching?

**Goal and scope:**

- Prompt caching saves repeated LLM prompts to avoid recomputation and reduce latency.
- Conventional caching stores frequently accessed data or resources (for example, HTML pages, database queries, API responses, images) to make future access faster.

**Output reliability:**

- Prompt cachingworks only when the prompt and all parameters (like temperature, top-p and others) remain exactly the same for every request.
- Conventional caching is deterministic, meaning that the same input always produces the same output (like identical query results or images).

**Performance:**

- Prompt cachingreduces token usage, API cost and end-to-end latency for repeated or similar LLM requests.
- Conventional caching improves application performance, lowers backend or database load and decreases network latency.

**Expiration and invalidation:**

- Prompt caching is often linked to model version updates or retraining cycles.
- Conventional caching manages by using TTL (time-to-live), versioning or manual invalidation when underlying data changes.[[3]](#f03)

## How prompt caching works?

In prompt caching, the repeated sections of a prompt are stored, so that they can be reused in future requests, avoiding the need to resend and reprocess them.
_Here’s the step by step guide to how it operates:_

1. **Key generation:** When a prompt is submitted, the system creates a cache key.
   _Exact‑match caching_ uses the prompt text (or a hashed or normalized form) and can include parameters such as model name, temperature or system prompt. It works only when the prompt and all settings are identical.
   _Semantic caching_, alternatively, generates an embedding of the prompt and searches for semantically similar entries. This type of caching allows reuse even if the wording changes. These two caching methods are separate approaches with different strengths.
2. **Cache lookup:** The key or embedding is then checked against the cache store typically a key-value store for a more traditional cache, or a vector database for semantic matches.
3. **Cache hit and miss:**  A cache hit returns a stored result immediately, avoiding reprocessing. A cache mis-sends the prompt to the model, then it saves the output for next time.
4. **Store the result:** While there is a cache miss, once the LLM returns a response the output generated (and sometimes embedding or other metadata) will be saved under that key for use in the future.
5. **Invalidation:** Cache entries can expire based on server-defined time-to-live (TTL), model updating or content drift to keep answers accurate and timely.

## Implementing prompt caching in LLMs

LangChain provides a flexible framework for adding prompt caching into LLM applications. In contrast to stand-alone caching systems, LangChain is an integrated framework for building LLM applications. It brings caching together with other necessary components into one solution such as chaining, memory, retrieval-augmented generation (RAG) and tool integration.

To learn more about how to implement prompt caching by using lang chain, click the following link.

[Implement prompt caching by using LangChain](https://www.ibm.com/think/tutorials/implement-prompt-caching-langchain)

## Use cases

- **Interactive documentation portal**s: Prompt caching is highly effective in internal knowledge management systems by storing responses to frequently asked queries about organizational policies, procedures or technical documentation. When employees repeatedly search for similar information, cached responses provide instant answers without repeatedly querying the LLM.
- **Marketing campaigns**: Prompt caching streamlines chatbot and automation systems by precomputing and saving answers to commonly asked questions. For instance, queries about discounts, product specifications or stock availability, are streamed to ensure that users are provided with quick responses to commonly asked questions. During times of high user traffic, cached responses help avoid unnecessary LLM calls, through reducing unnecessary API costs and easing latency.
- **Customer support systems**: On support channels that allow customers to submit questions, answers to the common inquiries for troubleshooting, account management concerns or billing concerns can be cached prompts. It would lead to faster responses, consistency with responses provided and reduced dependency on the LLM processing for the same types of inquiries. These improvements can lead to efficiency gains and improved customer satisfaction.[[4]](#f04)

## Advantages

- **Cost reduction:** Save on API costs by reusing prompt-response pairs instead of calling the LLM multiple times.
- **Speed:** Delivering a cached response provides an immediate answer. It saves the total processing time for the query and increases the response time.
- **Intelligent resource usage:** Do not waste compute unnecessarily, and reserve resources for executing other, varying, complex queries.
- **Infinite capacity:** Reasonably manage high traffic and repeat queries and keep the application moving smoothly as it scales.
- **Consistent responses:** All identical or similar queries produce the same response, time after time, through a cue, building trustworthy and reliable experiences for the user.
- **User experience:** Being able to provide faster, predictable responses yields more fluid engagements for happier users in a customer-facing application.
- **Reduced server workload:** Reduce server workload and allow your system to operate with more efficiency by offloading queries that can be answered with a cached response. [[5]](#f05)

Prominent platforms use prompt caching stores through cache writes and retention management, while using ttl and cache control to manage their outputs and respect rates, ensuring data privacy and use pricing or costs in relation to the cache. Embedding schemas and system instructions can be cached for use with real-time interactions to improve tool useability across multiple multiturn conversations.

## Points to consider in prompt caching

Though prompt caching can have worthwhile benefits, it is important to remain mindful of limitations as it relates to optimization and performance. Some key considerations include:

- **Management of dynamic queries or queries that are context-sensitive:** While prompt caching often has limited utility for queries that are dynamic (in time or from prior user input) or queries that are context-sensitive, such as queries that might incorporate real-time updates of data or a repeated multiturn conversation, those queries must produce a response that is responsive to new information.
- **Stale responses:** Cached responses can become stale fairly quickly if data or context has changed, which would provide incorrect or irrelevant information in response to a query.
- **Complexity for edge cases:** Modifying cache to support partial prompt reuse, or for specific mitigations, might cause more issues since the modifications increase complexity to the system design and implementation effort.
- **Challenges in cache maintenance:** Effective management of the cache (for example, expiration settings or storage constraints) can come with operational overhead.[[6]](#f06)[[7]](#f07)

## Summary

Prompt caching is an intelligent caching strategy that enhances the performance of AI-driven systems such as chatbots, coding assistants and RAG pipelines to improve both performance and efficiency. Instead of making multiple requests to the API with same request for the full prompt or system prompt, the system takes advantage of cached content (for example, prompt prefixes, cache prefixes, static content) to represent that data saving on both input tokens and output tokens.

The result is a reduction in the number of API calls, reduced cache misses and an overall significant increase in response latency and user experience.

Prompt caching works best for intrinsic to AI-powered systems like chatbots, enhances performance by leveraging user messages, reducing API requests and dramatically increasing cache hit rates through concise cache read.

For running a function, or responding to subsequent requests or queries in your application; prompt caching saves prompt tokens, total tokens and token counts, plus improves the ease of tracking metrics. With prompt caching, teams can track prompt tokens and total tokens in real time and continue to scale large language models at well-timed cost, speed and reliability across a global scale for generative AI use cases.

##### References

[1] Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., Gray, S., Radford, A., Wu, J., & Amodei, D. (2020). Scaling Laws for Neural Language Models. arXiv

[2] Gim, I., Chen, G., Lee, S., Sarda, N., Khandelwal, A., & Zhong, L. (2024). Prompt Cache: Modular Attention Reuse for Low-Latency Inference. Proceedings of the 7th Annual Conference on Machine Learning and Systems (MLSys 2024). Santa Clara, CA.

[3] OpenAI. “Prompt Caching.” OpenAI Platform Documentation, OpenAI, accessible at [https://platform.openai.com/docs/guides/prompt-caching](https://platform.openai.com/docs/guides/prompt-caching?utm_source=chatgpt.com)

[4] Gu, C., Li, X. L., Kuditipudi, R., Liang, P., & Hashimoto, T. (2025). Auditing Prompt Caching in Language Model APIs. arXiv. [https://arxiv.org/abs/2502.07776](https://arxiv.org/abs/2502.07776?utm_source=chatgpt.com)

[5] Kelly, Conor. Prompt Caching: Reducing latency and cost over long prompts. Humanloop Blog, 2 October 2024, [https://humanloop.com/blog/prompt-caching](https://humanloop.com/blog/prompt-caching?utm_source=chatgpt.com)

[6] Chakraborty, S., Zhang, X., Bansal, C., Gupta, I., & Nath, S. (2025). Generative Caching for Structurally Similar Prompts and Responses.

[7] Wu, G., Zhang, Z., Zhang, Y., Wang, W., Niu, J., Wu, Y., & Zhang, Y. (2025). I Know What You Asked: Prompt Leakage via KV-Cache Sharing in Multi-Tenant LLM Serving. Proceedings of the Network and Distributed System Security Symposium (NDSS)

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
