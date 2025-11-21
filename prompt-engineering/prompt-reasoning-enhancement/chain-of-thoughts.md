# What is chain of thought (CoT) prompting?

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

[Vanna Winland](https://www.ibm.com/think/author/vanna-winland)

AI Advocate & Technology Writer

##

Chain of thought (CoT) is a [prompt engineering](https://www.ibm.com/think/topics/prompt-engineering) technique that enhances the output of large language models ([LLMs](https://www.ibm.com/think/topics/large-language-models)), particularly for complex tasks involving multistep reasoning. It facilitates problem-solving by guiding the model through a step-by-step reasoning process by using a coherent series of logical steps.

Prompt engineering is used in [artificial intelligence](https://www.ibm.com/think/topics/artificial-intelligence) to refine inputs (prompts) to get the most accurate model outputs. In this study, the concept of chain of thought prompting is introduced which elicits reasoning in LLMs.[1](#f1) The paper argues that prompting models to generate intermediate reasoning steps significantly boosts their ability to accurately solve multistep problems like arithmetic, common sense and symbolic reasoning.

Researchers were inspired by the LLMs’ ability to “think out loud” in natural language, noting that as parameter size increased, so did reasoning ability and accuracy. For this reason, CoT prompting is considered an emergent ability, or an ability that appears as model size or complexity scales up. Large LLMs tend to perform better because they’ve learned more nuanced reasoning patterns from training on massive datasets.

However, increasing model size is not the only way to improve problem-solving accuracy across a variety of benchmarks. Advances in [instruction tuning](https://www.ibm.com/think/topics/instruction-tuning) have enabled smaller models to perform CoT reasoning. The IBM® Granite® Instruct models, for instance, are fine-tuned by using specialized training datasets composed of instructional prompts and exemplars for CoT tasks. An exemplar is a prompt example that the model uses as the ideal way to respond.

## Why is CoT prompting effective?

Chain of thought prompting simulates human-like reasoning processes by breaking down elaborate problems into manageable, intermediate steps that sequentially lead to a conclusive answer.[2](#f2) This step-by-step problem-solving structure aims to help ensure that the reasoning process is clear, logical and effective.

In standard prompt formats, the model output is typically a direct response to the provided input. For example, one might provide an input prompt asking, “What color is the sky?", the AI would generate a simple and direct response, such as "The sky is blue."

However, if asked to explain why the sky is blue using CoT prompting, the AI would first define what "blue" means (a primary color). The AI would then deduce that the sky appears blue due to the absorption of other colors by the atmosphere. This response demonstrates the AI's ability to construct a logical argument.

To construct a prompt, a user typically appends an instruction to the end of their prompt. Users commonly add an instruction to their prompt such as “describe your reasoning steps” or “explain your answer step-by-step." In essence, this prompting technique asks the LLM to not only generate a result but also detail the series of intermediate steps that led to that answer.[3](#f3)

[Prompt chaining](https://www.ibm.com/think/topics/prompt-chaining) is another popular method used in gen AI applications to improve reliability by using multiple prompts that build on each other sequentially to break down complex tasks. Techniques such as prompt chaining and CoT guide the model to reason through a problem step-by-step rather than jumping to an answer that merely sounds correct. This method can also be helpful for observability and debugging, as it encourages the model to be more transparent in its reasoning. The main difference between these methods is that prompt chaining sequences multiple prompts to break down tasks step-by-step, while CoT prompting elicits the model’s reasoning process within a single prompt.

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## How does chain of thought prompting work?

Chain of thought prompting leverages [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) to articulate a succession of reasoning steps, guiding the model toward generating analogous reasoning chains for novel tasks. This is achieved through exemplar-based prompts that illustrate the reasoning process, thus enhancing the model’s capacity for addressing complex reasoning challenges.[4](#f4) Let’s understand the flow of this prompting technique by addressing the classic math word problem—solving a polynomial equation.

### Example: How does chain of thought prompting work for solving polynomial equations?

Chain of thought (CoT) prompting can significantly aid in solving polynomial equations by guiding an LLM to follow a series of logical steps, breaking down the problem-solving process.[5](#f5) Let's examine how CoT prompting can tackle a polynomial equation.

Consider the example of solving a quadratic equation.

**Input prompt:** Solve the quadratic equation: **x2 - 5x + 6 = 0**

When we give this prompt to [IBM watsonx.ai®](https://www.ibm.com/products/watsonx-ai) chat, we can see the following conversation between human question and AI assistance’s reply.

To generate this type of output, the CoT fundamentals work as illustrated in the following image. The final answer of the chain of thought will be "The solutions to the equation **x2 − 5x + 6 = 0** are **x = 3** and **x = 2**"

## Chain of thought variants

Chain of thought (CoT) prompting has evolved into various innovative variants, each tailored to address specific challenges and enhance the model's reasoning capabilities in unique ways. These adaptations not only extend the applicability of CoT across different domains but also refine the model's problem-solving process.[6](#f6)

### Zero-shot chain of thought

The [zero-shot](https://www.ibm.com/think/topics/zero-shot-learning) chain of thought variant leverages the inherent knowledge within models to tackle problems without prior specific examples or [fine-tuning](https://www.ibm.com/think/topics/fine-tuning) for the task at hand. This approach is particularly valuable when dealing with novel or diverse problem types where tailored training data might not be available.[7](#f7) This approach can leverage the properties of standard prompting and [few-shot](https://www.ibm.com/think/topics/few-shot-learning) prompting.

For example, when addressing the question “What is the capital of a country that borders France and has a red and white flag?”, a model that uses zero-shot CoT would draw on its embedded geographic and flag knowledge to deduce steps leading to Switzerland as the answer, despite not being explicitly trained on such queries.

### Automatic chain of thought

Automatic chain of thought (auto-CoT) aims to minimize the manual effort in crafting prompts by automating the generation and selection of effective reasoning paths. This variant enhances the scalability and accessibility of CoT prompting for a broader range of tasks and users.[8](#f8), [9](#f9)

For example, to solve a math problem like "If you buy 5 apples and already have 3, how many do you have in total?", an auto-CoT system could automatically generate intermediate steps. Those steps might include "Start with 3 apples" and "Add 5 apples to the existing 3," culminating in "Total apples = 8," streamlining the reasoning process without human intervention.

### Multimodal chain of thought

Multimodal chain of thought extends the CoT framework to incorporate inputs from various modalities, such as text and images, enabling the model to process and integrate diverse types of information for complex reasoning tasks.[10](#f10)

For example, when presented with a picture of a crowded beach scene and asked, "Is this beach likely to be popular in summer?", a model employing multimodal CoT can analyze visual cues. Cues such as beach occupancy, weather conditions and more along with its textual understanding of seasonal popularity help the model reason out a detailed response. A potential response might be, "The beach is crowded, indicating high popularity, likely increasing further in summer."

These variants of chain of thought prompting not only showcase the flexibility and adaptability of the CoT approach but also hint at the vast potential for future developments in AI reasoning and problem-solving capabilities.

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## Advantages and limitations

CoT prompting is a powerful technique for enhancing the performance of [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) on complex reasoning tasks, offering significant benefits in various domains such as improved accuracy, transparency and multistep reasoning abilities. However, it is essential to consider its limitations, including the need for high-quality prompts, increased computational cost, susceptibility to adversarial attacks and challenges in evaluating qualitative improvements in reasoning or understanding. By addressing these limitations, researchers and practitioners can ensure responsible and effective deployment of CoT prompting in diverse applications.[11](#f11)

### Advantages of chain of thought prompting

Users can benefit from several advantages within chain of thought prompting. Some of them include:

- **Improved prompt outputs:** CoT prompting improves LLMs' performance on complex reasoning tasks by breaking them down into simpler, logical steps.
- **Transparency and understanding:** The generation of intermediate reasoning steps offers transparency into how the model arrives at its conclusions, making the decision-making process more understandable for users.
- **Multistep reasoning:** By systematically tackling each component of a problem, CoT prompting often leads to more accurate and reliable answers, particularly in tasks requiring multistep reasoning. Multistep reasoning refers to the ability to perform complex logical operations by breaking them down into smaller, sequential steps. This cognitive skill is essential for solving intricate problems, making decisions and understanding cause-and-effect relationships.
- **Attention to detail:** The step-by-step explanation model is akin to teaching methods that encourage understanding through detailed breakdowns, making CoT prompting useful in educational contexts.
- **Diversity:** CoT can be applied across a broad range of tasks, including but not limited to, arithmetic reasoning, common sense reasoning and complex problem-solving, demonstrating its flexible utility.

### Limitations of chain of thought prompting

Here are some limitations that you might come across during the adoption of chain of thoughts.

- **Quality control:** The effectiveness of CoT prompting is highly reliant on the quality of the prompts provided, requiring carefully crafted examples to guide the model accurately.
- **High computational power:** Generating and processing multiple reasoning steps requires more computational power and time compared to standard single-step prompting. Thus this technique is more costly to be adopted by any organization.
- **Mislead in concept:** There is a risk of generating reasoning paths that are plausible yet incorrect, leading to misleading or false conclusions.
- **Expensive and labor-intensive:** Designing effective CoT prompts can be more complex and labor-intensive, requiring a deep understanding of the problem domain and the model's capabilities.
- **Models overfitting:** There is a potential risk of models overfitting to the style or pattern of reasoning in the prompts, which can reduce their generalization capabilities on varied tasks.
- **Evaluation and validation:** While CoT can enhance interpretability and accuracy, measuring the qualitative improvements in reasoning or understanding can be challenging. It is due to the inherent complexity of human cognition and the subjective nature of evaluating linguistic expressions. However, several approaches can be employed to assess the effectiveness of CoT prompting. For instance, comparing the model's responses to those of a baseline model or human experts can provide insights into the relative performance gains. Additionally, analyzing the intermediate reasoning steps generated by the LLM can offer valuable insights into the decision-making process, even if it is difficult to directly measure the improvements in reasoning or understanding.

## Advances in chain of thought

The evolution of chain of thought (CoT) is a testament to the synergistic advancements across several domains, notably in [natural language processing (NLP)](https://www.ibm.com/think/topics/natural-language-processing), [machine learning](https://www.ibm.com/think/topics/machine-learning) and the burgeoning field of [generative AI](https://research.ibm.com/blog/what-is-generative-AI). These strides have not only propelled CoT into the forefront of complex problem-solving but also underscored its utility across a spectrum of applications. Here, we delve into the key developments, integrating the specified terms to paint a comprehensive picture of CoT’s progress.

### Prompt engineering and the original prompt

Innovations in [prompt engineering](https://www.ibm.com/think/prompt-engineering) have significantly enhanced models’ comprehension and interaction with the original prompt, leading to more nuanced and contextually aligned reasoning paths. This development has been critical in refining CoT’s effectiveness.[12](#f12)

### Symbolic reasoning and logical reasoning

The integration into symbolic reasoning tasks and logical reasoning tasks has improved models’ capacity for abstract thinking and deduction, marking a significant leap in tackling logic-based challenges with CoT.[13](#f13)

For example, symbolic reasoning is solving mathematical equations, such as 2 + 3 = 5. In this case, the problem is broken down into its constituent parts (addition and numbers), and the model deduces the correct answer based on its learned knowledge and inference rules. Logical reasoning, on the other hand, involves drawing conclusions from premises or assumptions, such as “All birds can fly, and a penguin is a bird.” The model would then determine that a penguin can fly based on the provided information. The integration of CoT prompting into symbolic reasoning and logical reasoning tasks has allowed LLMs to demonstrate improved abstract thinking and deduction capabilities, enabling them to tackle more complex and diverse problems.

### Enhanced creativity

The application of [generative AI](https://research.ibm.com/blog/what-is-generative-AI) and [transformer architectures](https://www.ibm.com/think/topics/transformer-model) has revolutionized CoT, enabling the generation of sophisticated reasoning paths that exhibit creativity and depth. This synergy has broadened CoT’s applicability, influencing both academic and practical domains.[14](#f14)

### Smaller models and self-consistency

Advances enabling smaller models to effectively engage in CoT reasoning have democratized access to sophisticated reasoning capabilities. The focus on self-consistency within CoT helps ensure the logical soundness of generated paths, enhancing the reliability of conclusions drawn by models.[15](#f15)

## Use cases for chain of thought

The chain of thought (CoT) methodology, with its ability to decompose complex problems into understandable reasoning steps, has found applications across a wide array of fields. These use cases not only demonstrate CoT's versatility but also its potential to transform how systems approach problem-solving and decision-making tasks. In the following section we explore several prominent use cases where CoT has been effectively applied.

### AI Assistants

Integrating CoT within chatbots and leveraging state-of-the-art [NLP](https://www.ibm.com/think/topics/natural-language-processing) techniques has transformed conversational AI, enabling chatbots to conduct more complex interactions that require a deeper level of understanding and problem-solving proficiency.

These advancements collectively signify a leap forward in the capabilities of CoT and the significance of the integration of chatbots and CoT models, highlighting their potential to revolutionize AI-driven decision-making and problem-solving processes. By combining the conversational abilities of chatbots with the advanced reasoning capabilities of CoT models, we can create more sophisticated and effective AI systems capable of handling a broader range of tasks and applications.

Furthermore, the integration of various applications and CoT models can enhance the overall user experience by enabling AI systems to better understand and respond to user needs and preferences. By integrating [natural language processing (NLP)](https://www.ibm.com/think/topics/natural-language-processing) techniques into CoT models, we can enable chatbots to understand and respond to user inputs in a more human-like manner, creating more engaging, intuitive and effective conversational experiences.

### Customer service chatbots

Advanced chatbots use CoT to better understand and address customer queries. By breaking down a customer's problem into smaller, manageable parts, chatbots can provide more accurate and helpful responses, improving customer satisfaction and reducing the need for human intervention.

### Research and innovation

Researchers employ CoT to structure their thought process in solving complex scientific problems, facilitating innovation. This structured approach can accelerate the discovery process and enable the formulation of novel hypotheses.

### Content creation and summarization

In content creation, CoT aids in generating structured outlines or summaries by logically organizing thoughts and information, enhancing the coherence and quality of written content.

### Education and learning

CoT is instrumental in educational technology platforms, aiding in the generation of step-by-step explanations for complex problems. This ability is particularly valuable in subjects such as mathematics and science, where understanding the process is as crucial as the final answer. CoT-based systems can guide students through problem-solving procedures, enhancing their comprehension and retention.

### AI ethics and decision making

CoT is crucial for elucidating the reasoning behind AI-driven decisions, especially in scenarios requiring ethical considerations. By providing a transparent reasoning path, CoT helps ensure that AI decisions align with ethical standards and societal norms.

These use cases underscore the transformative potential of CoT across diverse sectors, offering a glimpse into its capacity to redefine problem-solving and decision-making processes. As CoT continues to evolve, its applications are expected to expand, further embedding this methodology in the fabric of technological and societal advancements.

Chain of thought prompting signifies a leap forward in AI's capability to undertake complex reasoning tasks, emulating human cognitive processes. By elucidating intermediate reasoning steps, CoT not only amplifies LLMs' problem-solving acumen but also enhances transparency and interpretability. Despite inherent limitations, ongoing explorations into CoT variants and applications continue to extend AI models' reasoning capacities, heralding future enhancements in AI's cognitive functionalities.

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
