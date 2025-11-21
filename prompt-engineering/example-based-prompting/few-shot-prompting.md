# What is few shot prompting?

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

## What is few shot prompting?

Few-shot prompting refers to the process of providing an AI model with a few examples of a task to guide its performance. This method is particularly useful in scenarios where extensive training data is unavailable.

In other techniques like zero-shot prompting, which requires no examples, or one-shot prompting, which relies on a single example, few-shot prompting uses multiple examples to improve accuracy and adaptability. Apart from this, other advanced prompt engineering frameworks like [chain-of-thought](https://www.ibm.com/think/topics/chain-of-thoughts) prompting and [tree-of-thought](https://www.ibm.com/think/topics/tree-of-thoughts) prompting also consume examples to get desired output and optimize the model’s output.

Few-shot learning is essential in situations for generative AI where gathering large amounts of labelled data is challenging. Prompting methods convert text input into a structured format, allowing models like the IBM granite series, Meta’s Llama models, and OpenAI’s GPT-3 and GPT-4 to fill in the blanks with appropriate responses, effectively performing tasks without extensive labelled datasets.[1] This technique also supports getting the pre-defined output format by guiding the model through specific examples, ensuring consistency and accuracy in the desired structure.

In the rapidly evolving field of artificial intelligence (AI), machine learning (ML), and natural language processing (NLP), few-shot prompting has emerged as a powerful technique. This method allows models to perform tasks with limited examples, distinguishing it from other prompting methods like zero-shot and one-shot prompting. Understanding few-shot prompting is crucial for leveraging the full potential of advanced AI systems like OpenAI’s GPT-3/GPT-4 and other large language models (LLMs) like IBM Granite models or Meta’s Llama models.

Figure-1 illustrates a few-shot learning process for sentiment classification using a large language model. The prompt provides examples of text labeled as "positive" or "negative." The model, after seeing these labeled examples, is then tasked with classifying a new piece of text ("This product is very cost-effective") as "positive." This demonstrates how few-shot learning allows the model to generalize from a small number of examples to perform a specific task.

## How few shot prompting works?

Few-shot prompting operates by presenting the model with several examples of the desired task within the prompt. This technique leverages the pre-trained knowledge of large language models (LLMs) to perform specific tasks efficiently, even with limited data.

**User query:** The process begins with a user query, such as "This product is very cost effective".

**Vector store:** All examples are stored in a vector store, a database optimized for semantic search. When a user query is received, the system performs semantic matching to find the most relevant examples from the vector store.

**Retrieving relevant examples:** Only the most relevant examples are retrieved and used to form the prompt. In this example, Retrieval-Augmented Generation (RAG) is utilized to retrieve the examples from a vector store, which helps tailor the prompt to the specific query. While RAG is not universally required for few-shot prompting, it can significantly enhance the process by ensuring that the most contextually relevant examples are used, thereby improving the model's performance in certain scenarios.

**Prompt formation:** The prompt is constructed with the retrieved examples and the user query. For instance, the prompt might look like this:

**LLM Processing:** The constructed prompt is then fed into the LLM. The model processes the prompt and generates an output, in this case, classifying the sentiment of the user query.

**Output:** The LLM outputs the classification, such as "negative" for the given example.

Research has highlighted the effectiveness of a few-shot learning approach that reduces reliance on extensive prompt engineering. Unlike traditional fine-tuning, which involves adjusting model parameters using a large dataset before prompting, fine-tuning in the few-shot setting refers to the process of adapting pre-trained models with just a few examples provided directly within the prompt. This approach allows the model to leverage its pre-existing knowledge more effectively without the need for additional training on large datasets.[2] This study demonstrated that even when using "null prompts"—prompts that do not contain any task-specific templates or labeled examples—the model could still achieve competitive accuracy across various tasks. For example, a null prompt might simply ask a question like "What is the sentiment of the following text?" without giving any specific examples or instructions on how to classify the sentiment. Despite this lack of structure, the model can perform well, showcasing the robustness of few-shot learning.

Overall, the study suggests that few-shot learning is a highly effective strategy, particularly when structured prompts are used. While null prompts can yield good results, adding a few well-chosen examples can further enhance the model's performance, making it a versatile and efficient approach, especially in scenarios with limited labeled data. [1]

## Advantages and limitations of few shot prompting

Few-shot prompting is a powerful technique in natural language processing (NLP) that allows models to perform tasks with minimal examples. This approach has several advantages and limitations that influence its effectiveness and applicability.

**Advantages**

1. **Efficiency and Flexibility**: Few-shot prompting significantly reduces the amount of labelled data required for training, making it highly efficient and adaptable to new tasks. By leveraging large pre-trained language models, few-shot prompting can achieve competitive performance even with limited data. For example, in the following cited study, authors showed that fine-tuning language models in a few-shot setting reduces the need for extensive prompt engineering and can achieve high accuracy across a wide range of tasks.[2]
2. **Improved Performance in Diverse Applications**: Few-shot prompting has demonstrated significant improvements in various applications, from text classification to machine translation and beyond. For instance, authors in the following cited study proposed TransPrompt, a transferable prompting framework that captures cross-task knowledge, significantly improving performance on few-shot text classification tasks.[3]
3. **Robustness to Different Prompts**: The robustness of few-shot prompting to different prompt formulations is another key advantage. Unified Prompt Tuning (UPT), as described by Feihu Jin et al., enriches prompts with both task-specific and instance-dependent information, achieving significant improvements in performance across various NLP tasks.[4]
4. **Reduced Computational Overhead**: Recent advancements have made few-shot prompting more efficient. For example, Lewis Tunstall et al. introduced SetFit, an efficient framework for few-shot fine-tuning of Sentence Transformers, which achieves high accuracy with significantly fewer parameters and reduced training time compared to existing methods.[5]

**Limitations**

1. **Dependence on Prompt Quality**: The quality and design of prompts significantly impact the performance of few-shot prompting. Creating effective prompts often requires careful engineering and domain expertise. The authors Timo Schick and fellow researchers highlighted the variability in performance due to prompt quality, emphasizing the need for intelligent handling of multiple prompts to achieve reliable results.[6]
2. **Computational Complexity**: Large language models used in few-shot prompting require substantial computational resources. This can be a barrier for many organizations, limiting the accessibility of these models. Morteza Bahrami et al. noted that models with a massive number of parameters necessitate powerful hardware, which can be a constraint for widespread adoption.[1]
3. **Challenge of Generalization**: Generalizing prompts across diverse tasks and datasets remains a significant challenge. While few-shot prompting can perform well on specific tasks, ensuring consistent performance across varied applications requires advanced techniques. For example, the study done by Feihu Jin and fellow authors addressed this issue in numerical reasoning by leveraging large amounts of training data to improve generalization in prompt-based learning.[4]
4. **Limited Zero-Shot Capabilities**: While few-shot prompting excels with minimal examples, its performance in zero-shot settings can be less reliable. The study about advances in NER introduced QaNER, a prompt-based method for named entity recognition that addresses the limitations of zero-shot capabilities by enhancing prompt robustness.[7]

Thus, few-shot prompting offers substantial benefits in terms of efficiency, flexibility, and performance across various applications. However, its dependence on prompt quality, computational complexity, challenges in generalization, and limited zero-shot capabilities highlight the areas where further advancements are needed to maximize its potential.

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## Use cases

Few-shot prompting has proven to be a versatile and powerful tool with a number of examples across various applications, leveraging the strengths of large language models to perform complex tasks with limited examples. It is popular among the creative gen AI use cases like content creation or in-context learning. Here are some notable use cases explained in detail:

**Sentiment Analysis**
Few-shot prompting is particularly useful in sentiment analysis where models classify the sentiment of a text with limited labelled data. The integration of few-shot prompting with semantic matching, as shown in figure-2, is one example. It allows models to accurately classify sentiments based on relevant examples from a vector store.[1]

**Action Recognition in Videos**
Few-shot prompting has also been applied to action recognition in videos. Yuheng Shi et al. introduced knowledge prompting, which leverages commonsense knowledge from external resources to prompt vision-language models. This method effectively classifies actions in videos with minimal supervision, achieving state-of-the-art performance while significantly reducing training overhead.[8]

**Grounded Dialog Generation**
In grounded dialog generation or chatbots, few-shot prompting strengthens dialog models by integrating external information sources. This study demonstrated that few-shot prompting methods could significantly improve the performance of dialog models, making them more coherent and contextually relevant.[9]

**Named Entity Recognition (NER)**
Few-shot prompting can enhance named entity recognition tasks by providing examples that help the model recognize and classify entities within the text. The author of the following cited study developed an entity-aware prompt-based few-shot learning method for question-answering tasks, which can be adapted for NER tasks, improving model performance significantly.[10]

**Code generation Tasks**
Few-shot prompting is also applicable to code-related tasks such as test assertion generation and program repair. In their study, Noor Nashid et al. developed a technique that automatically retrieves code demonstrations to create effective prompts, showing substantial improvements in task accuracy.[11]

These use cases demonstrate the wide-ranging applicability and effectiveness of few-shot prompting across different fields and tasks, showcasing its potential to drive innovation and efficiency in AI and NLP applications.

Few-shot prompting represents a significant leap in AI and NLP, offering efficiency, flexibility, and enhanced performance with limited examples. As the technology evolves, it will play a crucial role in various applications, driving innovation and efficiency in multiple fields.

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

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

1. Morteza Bahrami, M. M. (14 Feb 2023). _Few-shot Learning with Prompting Methods._ 6th International Conference on Pattern Recognition and Image Analysis (IPRIA), 1-5. <https://ieeexplore.ieee.org/document/10147172>.
2. Robert L Logan IV, I. B. (24 Jun 2021). _Cutting Down on Prompts and Parameters: Simple Few-Shot Learning with Language Models._ 2824-2835. <https://aclanthology.org/2022.findings-acl.222/>.
3. Chengyu Wang, J. W. (2021). _TransPrompt: Towards an Automatic Transferable Prompting Framework for Few-shot Text Classification._ 2792-2802. <https://aclanthology.org/2021.emnlp-main.221/>.
4. Feihu Jin, J. L. (4 June 2023). _Unified Prompt Learning Makes Pre-Trained Language Models Better Few-Shot Learners._ ICASSP 2023 - 2023 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 1-5. <https://ieeexplore.ieee.org/document/10095738>.
5. Lewis Tunstall, N. R. (22 Sept 2022). *Efficient Few-Shot Learning Without Prompts.* <https://arxiv.org/abs/2209.11055>.
6. Timo Schick, H. S. (2021). _Exploiting Cloze-Questions for Few-Shot Text Classification and Natural Language Inference._ In Proceedings of the 16th Conference of the European Chapter of the Association for Computational Linguistics: Main Volume, pages 255–269, Online. Association for Computational Linguistics.
7. Andy T. Liu, W. X.-W. (3 Mar 2022). _QaNER: Prompting Question Answering Models for Few-shot Named Entity Recognition_. <https://arxiv.org/abs/2203.01543>.
8. Yuheng Shi, X. W. (22 Nov 2022). _Knowledge Prompting for Few-shot Action Recognition_. <https://doi.org/10.48550/arXiv.2211.12030>.
9. Chujie Zheng, M. H. (14 Sept 2021). *Exploring Prompt-based Few-shot Learning for Grounded Dialog Generation.* <https://arxiv.org/abs/2109.06513>.
10. Yi Chen, X. S. (26 May 2023). _Few-shot Question Answering with Entity-Aware Prompt._ Proceedings of the 2023 4th International Conference on Computing, Networks and Internet of Things. <https://dl.acm.org/doi/10.1145/3603781.3603812>.
11. Noor Nashid, M. S. (1 May 2023). _Retrieval-Based Prompt Selection for Code-Related Few-Shot Learning._ IEEE/ACM 45th International Conference on Software Engineering (ICSE), 2450-2462. <https://ieeexplore.ieee.org/document/10172590>.
