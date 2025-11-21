# What is prompt chaining?

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

[Eda Kavlakoglu](https://www.ibm.com/think/author/eda-kavlakoglu.html)

Business Development + Partnerships

IBM Research

##

Prompt chaining is a [natural language processing (NLP)](https://www.ibm.com/think/topics/natural-language-processing) technique, which leverages [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) that involves generating a desired output by following a series of prompts. In this process, a sequence of prompts is provided to an NLP model, guiding it to produce the desired response. The model learns to understand the context and relationships between the prompts, enabling it to generate coherent, consistent, and contextually rich text[1].

The concept is advance implementation of [prompt engineering.](https://www.ibm.com/think/topics/prompt-engineering) It has gained significant attention in the field of [NLP](https://www.ibm.com/think/topics/natural-language-processing) due to its ability to improve the quality and controllability of [text generation](https://www.ibm.com/think/topics/text-generation). Effective prompt chain can be implemented as engineering technique over other approaches, such as [zero-shot](https://www.ibm.com/think/topics/zero-shot-learning), [few-shot](https://www.ibm.com/think/topics/few-shot-learning) or [fine-tuned](https://www.ibm.com/think/topics/fine-tuning) customized models[2]. By providing a clear direction and structure, prompt chaining helps the model to better understand the user’s intentions and produce more accurate and relevant responses.

Prompt chaining can enhance the effectiveness of [AI assistance](https://www.ibm.com/solutions/ai-assistants) in various domains. By breaking down complex tasks into smaller prompts and chaining them together, developers can create more personalized and accurate responses tailored to individual users’ needs. This approach not only improves the overall user experience but also allows for greater customization and adaptability in response to changing user requirements or application scenarios[3].

## Types of prompts

There are two main types of prompts that are generated when working with LLMs. These are:

### Simple prompts

These are basic prompts that contain a single instruction or question for the model to respond to. They are typically used to initiate a conversation or to request information. An example of a simple prompt would be: "What is the weather like today?"

### Complex prompts

These prompts contain multiple instructions or questions that require the model to perform a series of actions or provide a detailed response. They are often used to facilitate more advanced tasks or to engage in deeper conversations. An example of a complex prompt would be: "I'm looking for a restaurant that serves vegan food and is open until 10 pm. Can you recommend one?"

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## How to simplify complex prompts

Converting a complex prompt into a series of simple prompts can help break down a complex task into smaller sub-tasks. This approach can make it easier for users to understand the steps required to complete a request and reduce the risk of errors or misunderstandings.

### An example: language translation

Consider the scenario where we have information in Spanish language. We need to extract the information from it, but we do not understand Spanish. First, we need to translate the text from Spanish to English. Then, we need to ask a question to extract the information and then translate the extracted information from English to Spanish again. This is a complex task, and if we try to combine these steps into one prompt, it will be too complex, subsequently increasing the likelihood of more errors in the response. As a result, it's best to convert a complex prompt into a sequence of simple prompts. Some steps to do this include:

1. Identify the main goal or objective of the prompt.
2. Break down the main goal into sub-tasks, that is, more specific actions or tasks.
3. Create a prompt for each specific action or task.
4. Ensure that each prompt is clear, concise, and unambiguous.
5. Test the prompts to ensure that they are easy to understand and comprehensive.

Here our complex prompt is: "Consider the given text in Spanish. Translate it into English. Find all the statistics and facts used in this text and list them as bullet points. Translate them again into Spanish."

To convert this complex prompt into simple prompts, we can break down the main goal into smaller actions or tasks, and we can create a chain of prompts as below:

1. “Read the given Spanish text.”
2. “Translate the text into English language.”
3. “Fetch the statistics and facts from the text.”
4. “Create a bullet point list of all these facts.”
5. “Translate them in Spanish language.”

## How to build a prompt chain

A structured prompt chain is a pre-defined set of prompts or questions designed to guide a user through a specific conversation or series of actions, ensuring a consistent and controlled flow of information[4]. It is often used in customer support, tutoring, and other interactive systems to maintain clarity, accuracy, and efficiency in the interaction. The prompts in a chain are typically linked together, allowing the system to build upon previous responses and maintain context. This approach can help reduce ambiguity, improve user satisfaction, and enable more effective communication between humans and machines.

#### Build a reference library with different flavoured templates of prompts

Start by gathering a collection of pre-written prompts that can be customized for various scenarios. These templates should cover common tasks, requests, and questions that users might encounter.

#### Define the primary prompts

Identify the core questions or instructions that need to be conveyed in the prompt chain. These prompts should be simple, clear, and direct, and should be able to stand alone as individual prompts.

#### Identify the inputs and outputs for the sequence of prompts

Determine the specific pieces of information or actions that the user needs to provide in response to each prompt. These inputs should be clearly defined and easy to understand, and should be linked to the corresponding prompts in the prompt chain.

#### Implement the whole prompt chain

Use the reference library and primary prompts to build the complete prompt chain. Ensure that each prompt is logically linked to the next one, and that the user is prompted for the necessary inputs at the appropriate points in the sequence.

#### Test the prompt chain

Once the prompt chain has been built, test it thoroughly to ensure that it is easy to understand and complete. Ask a sample of users to complete the prompt chain and gather feedback on any areas for improvement.

#### Iterate and refine the prompt chain

Based on the feedback received during testing, make any necessary adjustments or improvements to the prompt chain. This might include rewriting certain prompts, adding or removing prompts, or changing the order in which the prompts are presented.

By following these steps, customer service representatives and programmers can build effective and efficient prompt chains that help guide users through a series of actions or tasks.

### Advantages of prompt chaining

Prompt chaining offers several advantages over traditional methods used in [prompt engineering](https://www.ibm.com/topics/prompt-engineering). By guiding the model through a series of prompts, prompt chaining enhances coherence and consistency in the [text generation](https://www.ibm.com/think/topics/text-generation) leading to more accurate and engaging outputs.

Consistency

By requiring the model to follow a series of prompts, prompt chaining helps maintain consistency in the [text generation](https://www.ibm.com/think/topics/text-generation). This is particularly important in applications where maintaining a consistent tone, style, or format is crucial, such as in customer support or editorial roles [5].

In customer support, prompt chaining can be used to ensure consistent communication with users. For example, the bot might be prompted to address the user using their preferred name or follow a specific tone of voice throughout the conversation.

[Build customer service AI assistants with watsonx assistant](https://www.ibm.com/products/watsonx-orchestrate/ai-agent-for-customer-service)

Enhanced control

Prompt chaining provides greater control over the [text generation](https://www.ibm.com/think/topics/text-generation), allowing users to specify the desired output with precision. This is especially useful in situations where the input data is noisy or ambiguous, as the model can be prompted to clarify or refine the input before generating a response[6].

In a text summarization system, prompt chaining allows users to control the level of detail and specificity in the generated summary. For instance, the user might first be prompted to provide the content that they're interested in summarizing, such as a research paper. A subsequent prompt could follow to format that summary in a specific format or template.

See how you can perform text summarization tasks with watsonx.ai (2:19)

Reduced Error Rate

Prompt chaining helps reduce error rates by providing the model with better context and more focused input. A structured prompt chaining is helpful to reduce the human efforts and validate the code and outputs more faster. By breaking down the input into smaller, manageable prompts, the model can better understand the user's intentions and generate more accurate and relevant responses[7].

In a machine translation system, before translating a sentence, the system might first prompt the user to specify the source language, target language, and any relevant context or terminology. This helps the model to better understand the source text and generate an accurate translation.

By leveraging these advantages, prompt chaining has the potential to significantly improve the performance and effectiveness of NLP models in various applications, from customer support to streamlined editorial and language translation.

## Use cases of prompt chaining

Prompt chaining is a versatile technique that can be applied to a wide range of use cases, primarily falling into two categories: question answering and multi-step tasks.

### Question answering

As its name suggests, question answering tasks provide answers to frequently asked questions posed by humans. The model automates the response based on context from documents typically found in a knowledge base. Common applications include:

- **Customer Service/Support:** Prompt chaining can help users query against a company's knowledge base to find the most relevant answer, improving user experience and efficiency[8].
- **Educational Platforms:** Instructors can create interactive learning experiences by prompting students with questions based on their progress, enabling personalized and adaptive learning [9].
- **Research Assistance:** Researchers can use prompt chaining to automate the process of searching and analyzing relevant literature, saving time and resources[3][10].

### Multi-step tasks

As one might expect, multi-step tasks are comprised of a sequence of steps to achieve a given goal. Some examples of this include:

- **Content Creation:** Prompt chaining can streamline various stages of the content creation process, such as researching a topic, creating an outline, writing an article, validating the content, editing, and more[11][12].
- **Programming Development:** Prompt chaining can guide developers through a series of steps, starting with basic logic, progressing to pseudo code, and finally implementing specific code in a given language, while also ensuring code validation[3][13].
- **Personalized Recommendations:** This use case is applicable across various industries, where prompt chaining can help tailor recommendations based on user preferences, behavior, and historical data[14].

Prompt chaining is a powerful technique that can be used in a variety of real-time applications to help guide users and professionals through a series of actions or tasks. By breaking down complex tasks into a series of simpler prompts, prompt chaining can help ensure that users and professionals understand the steps required to complete a request and provide a better overall experience. Whether it's used in customer service, programming, or education, prompt chaining can help simplify complex processes and improve efficiency and accuracy.

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
