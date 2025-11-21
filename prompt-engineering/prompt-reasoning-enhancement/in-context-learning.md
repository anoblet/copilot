# What is in-context learning?

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

## What is in-context learning?

Deploying [artificial intelligence](https://www.ibm.com/think/artificial-intelligence) (AI) models for complex tasks such as summarizing reports, answering queries or translating documents often comes with significant challenges. These models typically require extensive retraining with large, annotated [datasets](https://www.ibm.com/think/topics/dataset) and costly [fine-tuning](https://www.ibm.com/think/topics/fine-tuning) processes. Each new task adds complexity, slowing down innovation, increasing expenses and limiting the scalability of AI across diverse use cases.

Now, imagine a different approach. What if an AI model could adapt to new tasks instantly, without needing retraining or additional data? This is the promise of in-context learning (ICL) that enables AI models to learn tasks dynamically by simply giving examples in a prompt. It eliminates the bottlenecks of traditional [machine learning](https://www.ibm.com/think/topics/machine-learning) (ML) and offers faster, more adaptable and cost-effective solutions.

## The mechanism of in-context learning

In-context learning (ICL) is an advanced AI capability introduced in the seminal research paper “Language Models are Few-Shot Learners,” which unveiled GPT-3.[1](#f01) Unlike [supervised learning](https://www.ibm.com/think/topics/supervised-learning), where a model undergoes a training phase with backpropagation to alter its parameters, ICL relies entirely on pretrained language models and keeps their parameters unchanged.

The AI model uses the prompt as a temporary guide to infer the task and generate the expected output. ICL works by recognizing relationships between the examples in the prompt also known as input/output pairs and applying the same mapping to new inputs. This process mimics human reasoning, where we solve new problems by drawing analogies from previous experiences. It leverages patterns and knowledge learned during pretraining and dynamically adapts to new tasks, making it highly flexible and efficient.

At its core, in-context learning works by conditioning a [large language model](https://www.ibm.com/think/topics/large-language-models) (LLM) on a prompt that includes a set of examples (input/output pairs or in-context examples) typically written in natural language as part of the input sequence. These examples, often drawn from a dataset, are not used to retrain the model but are fed directly into its [context window](https://www.ibm.com/think/topics/context-window). This window shows the amount of text an LLM can process at once, acting as its temporary memory for generating coherent responses and is the part of the model that processes sequential input.

Formally, let the prompt consist of k examples in the form of input/output pairs:

```

C={(x1 ,y1 ),(x2 ,y2 ),...,(xk ,yk )}
```

Given a new input x and a candidate output space Y={y1,...,ym}, the model computes the probability of each possible output conditioned on the prompt:

```

P(yj ∣ x,C)
```

The prediction is determined by choosing the option with the highest probability:

```

 y^=argmaxyj∈YP(yj∣x,C)
```

The model does not update its weights during this process. Instead, leveraging its [deep learning](https://www.ibm.com/think/topics/deep-learning) transformer architecture, the model learns the pattern dynamically by using only the examples in the current prompt.

To see this method in practice, consider a sentiment classification task. The prompt might look like this:

Review: The movie was fantastic → Sentiment: Positive

Review: I hated the storyline → Sentiment: Negative

Review: The music was pleasant → Sentiment:

The model completes the last line by predicting “Positive,” continuing the structure observed in the earlier input-label mappings. This example showcases [few-shot learning](https://www.ibm.com/think/topics/few-shot-learning), where the model infers the task and generates appropriate responses based on a few number of examples.

## The role of prompt engineering in in-context learning

As the AI model’s success hinges on what is shown in the prompt, [prompt engineering](https://www.ibm.com/think/prompt-engineering) plays a critical role in ICL. Prompt engineering refers to crafting high-quality, informative and well-structured prompts that guide the model effectively. Prompts often use natural language templates, which are carefully chosen to match what the model has seen during pretraining data exposure. Variations in wording, label format, example order and even punctuation can affect model performance, especially in [smaller models](https://www.ibm.com/think/topics/small-language-models) or edge cases.

Importantly, prompt engineering is not a separate mechanism but a set of techniques operating within the broader concept of in-context learning. For example:

- [Zero-shot prompting](https://www.ibm.com/think/topics/zero-shot-prompting): the task is explained without providing any examples

- [One-shot prompting](https://www.ibm.com/think/topics/one-shot-prompting): only one example is included to illustrate the task

- [Few-shot prompting](https://www.ibm.com/think/topics/few-shot-prompting): multiple examples are provided

- [Chain-of-thought prompting](https://www.ibm.com/think/topics/chain-of-thoughts): each example includes intermediate reasoning steps to guide the model's logic

These prompting strategies are often combined with few-shot-prompt designs and are evaluated on [benchmarks](https://www.ibm.com/think/topics/llm-benchmarks) that test generalization. Even input/output pairs with random labels can improve performance, highlighting that the format and distribution of the prompt are as important as the labels themselves.

As we move beyond controlled ICL prompts into complex, real-world systems, the challenge shifts from crafting static inputs to practicing context engineering. It’s a newly emerging discipline focused on the systematic design of all inputs that an LLM needs to perform reliably in real-world scenarios.

Context engineering is the practice of designing dynamic systems that assemble and deliver the right information, tools and instructions to an LLM in the right format to enable it to reliably complete a task. Unlike static [prompt engineering](https://www.ibm.com/think/topics/prompt-engineering-guide), context engineering focuses on constructing complete, task-relevant inputs from multiple sources such as user input, previous interactions, tool outputs and external data at run time. It ensures that LLMs not only receive the necessary data but also in a structure they can interpret effectively. This approach is critical in complex, agentic systems where failures often stem from missing or poorly formatted context rather than model limitations. By integrating tools, retrieval mechanisms and memory into the prompt construction process, context engineering bridges the gap between a model's potential and its real-world performance.

## Understanding in-context learning through inference and optimization

While early explanations viewed ICL as surface-level pattern repetition or next-token prediction, newer research suggests deeper processes. One compelling explanation frames ICL as a form of Bayesian inference, a method of estimating probabilities by updating beliefs with evidence.[2](#f02) In this view, the model looks at few-shot or one-shot examples and infers a latent concept (an unseen task or structure, like “this is sentiment classification”) from the prompt. As more in-context examples are added, the model becomes more confident in what task it’s doing, improving its predictions without changing its [model parameters](https://www.ibm.com/think/topics/model-parameters).

Another explanation links ICL to [gradient descent](https://www.ibm.com/think/topics/gradient-descent), the core optimization method behind most machine learning systems to minimize errors. Recent studies have shown that [transformer models](https://www.ibm.com/think/topics/transformer-model) can internally simulate the process of learning especially for simple tasks like [linear regression](https://www.ibm.com/think/topics/linear-regression). Even though no actual parameter updates occur, the model behaves as if it’s adjusting to the prompt by using an inner loop of reasoning. This process happens entirely within the model’s context window.

These findings suggest that ICL involves internal learning-like behavior during inference, even in [zero-shot](https://www.ibm.com/think/topics/zero-shot-learning) or few-shot setups. Instead of being static predictors, LLMs adapt to task structure in real-time by using natural language prompts. This mix of inference and implicit learning makes ICL a powerful way to tackle new tasks without retraining.

## Challenges, limitations and potential of in-context learning

### Challenges and limitations of in-context learning

**1. Model scale and parameter sensitivity**
The effectiveness of ICL is heavily influenced by the scale and design of LLMs. Larger models demonstrate stronger emergent abilities in ICL. While smaller models often struggle to match the in-context learning capabilities as they lack the parameter capacity to model complex tasks effectively.

**2. Pretraining data quality and bias**
The effectiveness of in-context learning depends on the variety and quality of the pretraining data. Models trained on narrow or biased datasets can replicate those limitations during inference, leading to poor generalization and fairness issues.

**3. Domain transfer and generalization**
While LLMs show impressive adaptability, their performance can degrade in highly domain-specific tasks. For specialized fields such as law or medicine, domain-specific demonstrations or even traditional fine-tuning might still be necessary.

**4. Ethics and fairness**
ICL can unintentionally carry over and reinforce social biases present in the training data. Because prompts can influence model behavior, ensuring ethical and fair outputs in dynamic, real-time interactions remains a major challenge.

**5. Privacy and security concerns**
ICL-based systems operating in real-world applications can inadvertently memorize or reproduce sensitive information if such data was present in the pretraining corpus. This possibility raises critical privacy issues, especially in healthcare, legal and personalized assistant domains.

**6. Prompt sensitivity and stability**
ICL is sensitive to prompt design. Small changes in the number, order or formatting of in-context examples can lead to large shifts in output, making consistent performance difficult to guarantee.

### Research directions and optimization strategies

**1. Training models**

To make LLMs inherently better at in-context learning, researchers are exploring improvements during or immediately after model training.[3](#f03) One major direction is pretraining with structured data, where input/output pairs or task clusters are explicitly organized. This approach helps models become more sensitive to task patterns and relations, rather than just relying on broad language distributions.

Another effective approach is meta distillation, where the model is exposed to distilled, abstracted forms of knowledge; short, highly informative example pairs that convey the essence of a task (for example, “Strong plot → positive," “Weak acting → negative”). This method allows models to generalize rapidly during inference with minimal demonstration overhead.

Warmup training fine-tunes the model between pretraining and actual inference by using task-aligned examples in prompt form. For instance, seeing a few “Headline → Category” examples before testing boosts its ability to generalize to related content without retraining.

Instruction tuning is another critical strategy, where models are trained by using thousands of tasks written as natural language instructions (for example, “Classify the mood of the sentence”). This strategy improves few-shot and zero-shot generalization by aligning model behavior more closely with human guidance.

**2. Designing prompt**

Prompt design during inference plays a pivotal role in leveraging ICL. One of the most impactful techniques is demonstration selection; choosing the right examples by using similarity metrics, uncertainty scores or trained retrievers.

Demonstration reformatting modifies how examples are structured. Instead of plain (input/output pairs, some methods use reasoning chains (for example, “Premise → Reasoning → Conclusion”) to enhance alignment with the model’s internal representations.

Another subtle but important factor is demonstration ordering. Organizing examples from simple to complex such as starting with a basic programming print statement before progressing to loops helps the model gradually build context, improving comprehension and output quality.

Finally, instruction formatting and chain-of-thought prompting enhance reasoning-heavy tasks by explicitly guiding the model through intermediate steps. This approach is especially useful in domains like arithmetic or logical reasoning, where a breakdown such as “Step 1: Subtract 3 from 8 → Step 2: Answer is 5” improves accuracy compared to direct question-answer formats.

## Applications of in-context learning

**Anomaly detection:** By using in-context learning, LLMs can be provided with a few labeled examples of normal and anomalous network activity. The model can then accurately classify new traffic instances as either normal or suspicious, enabling flexible and efficient monitoring without extensive retraining. This approach can be applied broadly to various cybersecurity and network management tasks.

For example, a research paper presented an example of applying in-context learning with LLMs, specifically GPT-4, for automatic network intrusion detection in wireless environments.[4](#f04) Instead of traditional methods that require extensive labeled data and costly fine-tuning, they designed three in-context learning approaches: illustrative, heuristic and interactive. These methods guide GPT-4 to identify attack types by providing a few labeled examples within prompts and incorporating domain-specific questions to improve accuracy. Tested on a real dataset with 9 distributed denial of service (DDoS) attack types, the results showed performance improvements. These improvements showed accuracy and F1-Score increases by around 90%, with GPT-4 reaching over 95% with just 10 examples. This example demonstrates how in-context learning allows LLMs to adapt quickly and perform effectively in real-world cybersecurity scenarios with minimal training data.

**Domain specific natural language processing (NLP)**: ICL allows LLMs to perform well on specialized tasks by using relevant examples within the prompt. This approach solves the challenge of domain-specific [natural language processing](https://www.ibm.com/think/topics/natural-language-processing) (NLP) tasks where labeled data might be scarce or where fine-tuning is impractical. This route allows the model to adapt and generate accurate results based solely on contextual cues provided during inference.

A study demonstrates that LLMs can effectively analyze aviation safety reports through ICL, addressing challenges like semantic sparsity and the need for computationally expensive fine-tuning.[5](#f05) The study used BM25 (an information retrieval algorithm used to rank documents based on their relevance to a search query) to select the most relevant examples for prompts. The model significantly improved its classification accuracy by achieving up to 80.24% accuracy and 84.15% F1-score with eight examples. By providing high-quality, relevant examples within the prompt, the model can generalize its understanding to classify unseen reports accurately. Increasing the number of well-chosen examples typically improves performance, as the model gains more context and better captures the underlying patterns in the data. This approach shows that ICL with strategic example selection enables LLMs to understand and classify specialized aviation data effectively, providing a practical solution for domain-specific NLP tasks.

**Sentiment analysis:** ICL enables LLMs to analyze sentiment by providing a handful of labeled text samples (for example, “Great service → positive,” “Terrible product → negative”). When given a new, unlabeled sentence, the model can infer the sentiment with high accuracy. This approach streamlines tasks in customer experience analytics, opinion mining and brand monitoring.

In-context learning represents a fundamental shift in how we interact with and extract intelligence from large language models. This enables models to adapt to new tasks dynamically by using task descriptions and a few examples, ICL brings flexibility, efficiency and accessibility to AI systems. It bridges the gap between static, pretrained models and dynamic, real-world needs, allowing a single model to perform a wide range of tasks simply by observing a few examples. As research advances across learning algorithms, pretraining strategies, prompt design and demonstration optimization, ICL is poised to become the cornerstone of general-purpose AI, paving the way for more adaptive, interpretable and scalable systems across industries.

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

1. Brown, T., Mann, B., Ryder, N., Subbiah, M., Kaplan, J. D., Dhariwal, P., ... & Amodei, D. (2020). Language models are few-shot learners. Advances in neural information processing systems, 33, 1877-1901.

2. Xie, S. M., & Min, S. (2022). How does in-context learning work? A framework for understanding the differences from traditional supervised learning. A framework for understanding the differences from traditional supervised learning.

3. Dong, Q., Li, L., Dai, D., Zheng, C., Ma, J., Li, R., ... & Sui, Z. (2022). A survey on in-context learning. arXiv preprint arXiv:2301.00234.

4. Zhang, H., Sediq, A. B., Afana, A., & Erol-Kantarci, M. (2024). Large language models in wireless application design: In-context learning-enhanced automatic network intrusion detection. arXiv preprint arXiv:2405.11002.

5. Yang, Y., Shi, D., Zurada, J., & Guan, J. (2024, September). Application of Large Language Model and In-Context Learning for Aviation Safety Prediction. In 2024 17th International Conference on Advanced Computer Theory and Engineering (ICACTE) (pp. 361-365). IEEE.
