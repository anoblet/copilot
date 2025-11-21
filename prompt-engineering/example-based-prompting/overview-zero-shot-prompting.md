# What is zero-shot prompting?

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

[Meredith Syed](https://www.ibm.com/think/author/meredith-syed)

Technical Content, Editorial Lead

IBM

[Vrunda Gadesha](https://www.ibm.com/think/author/vrunda-gadesha)

AI Advocate | Technical Content Author

## What is zero-shot prompting?

Zero-shot prompting is a [prompt engineering](https://www.ibm.com/think/topics/prompt-engineering) method that relies on the pretraining of a [large language model (LLM)](https://www.ibm.com/think/topics/large-language-models) to infer an appropriate response. In contrast to other prompt engineering methods such as few-shot prompting, models aren’t provided examples of output when prompting with the zero-shot technique.[1](#f1)

### How zero-shot prompting works

One of the promises of [foundation models](https://research.ibm.com/blog/what-are-foundation-models) is that they can be adapted to many use cases without requiring additional training data. In zero-shot prompting, the model is prompted to generate a response without receiving an example of the desired output for the use case. Zero-shot prompting is an application of [zero-shot learning](https://www.ibm.com/think/topics/zero-shot-learning), a machine learning pattern that asks models to make predictions with zero training data.

In the example below, IBM’s granite-3-8b-instruct model from [IBM's Granite Series](https://www.ibm.com/granite) is prompted by using zero-shot prompting on a classification use case.[2](#f2) In this case, the model is asked to classify an IT issue as belonging to either the class *“High”* or the class *“Low,”*indicating theurgency of the issue. In this example, the model infers the classification label **“High”** for the prompt (as depicted by the **bold** output), an appropriate response in this context.

Note: The prompt was executed in IBM [watsonx.ai](https://www.ibm.com/products/watsonx-ai) Prompt Lab using the “Freeform” mode.

_Set the Class name for the issue described to either High, Medium or Low. Predict only the Class name for the last issue. Give a short description for why that Class name was chosen._

_Class name: High
Description: An issue that has a high business cost, impacts many users or both._

_Class name: Medium
Description: An issue that falls somewhere in between high and low._

_Class name: Low
Description: An issue that has an impact on a few users, does not have a high business cost or both._

_Issue: Users are reporting that they are unable to upload files._

**Class: High**

**Description: This issue is considered high because it impacts many users and has a high business cost. The inability to upload files can prevent users from completing their tasks, which can lead to delays and decreased productivity. Additionally, this issue may impact multiple departments or teams, further increasing the business cost.**

A zero-shot prompting strategy is often the default prompt engineering strategy when tasking a model with a new problem.[1](#f1) This example demonstrates how the model is expected to generate an appropriate inference without any explicit examples of responses. The zero-shot prompting scenario mimics human learning in applying prior knowledge to solve new problems.[3](#f3)

### Components of a prompt

While the model isn’t provided with example prompts, it is provided with details about how to complete the task:[1](#f1)

**Instruction:** First, the instructions provided to the model are to “_Set the Class name for the issue described...”_

**Context*:***Next, the context for the model includes a description of class names.

**Input data:** The model receives input data to run the classification task with the prompt of “_Issue: Users are reporting that they are unable to upload files.”_

**Output indicator:** Optionally, the model can receive an output indicator, in this case the text *"Class:"* which cues the model to respond with the class name of the issue. Output indicators indicate to the model what type of output to produce for a specific type of response.

The customized format of this prompt is for the classification problem at hand. Other use cases might require a different format for the prompt and they might not contain the same instruction, context, input data and output indicator components.[1](#f1) Different models can require different formats for a prompt. Be sure to follow any instructions given for how to format a prompt for a specific model. In this example, as a result of the pretraining of the model and this well-crafted prompt using the described components, the model responds with appropriate output for this task.

## Zero-shot prompting vs few-shot prompting

In contrast to zero-shot prompting, few-shot prompting provides the model with examples of expected input and output for the task.[1](#f1) The preceding image diagrams the difference between zero-shot prompting and few-shot prompting, with one-shot prompting also shown as a special case.

By using the same IBM granite-3-8b-instruct model, examples of *“Issues”* and their corresponding *“Classes”* for this task are provided.[2](#f2)The three examples of input and output that are provided illustrate the few-shot prompting strategy. In response to this prompt, the model makes a reasonable prediction of the class **“Medium”** (as highlighted in **bold**).

Note: The prompt was executed with IBM [watsonx.ai](https://www.ibm.com/products/watsonx-ai) Prompt Lab by using the “Freeform” mode.

_Set the Class name for the issue described to either High, Medium or Low. I've provided a few examples of issues and their corresponding Class names. Predict only the Class name for the last issue. Give a short description for why that Class name was chosen._

_Class name: High
Description: An issue that has a high business cost, impacts many users or both._

_Class name: Medium
Description: An issue that falls somewhere in between high and low._

_Class name: Low
Description: An issue that has an impact on a few users, does not have a high business cost or both._

_Issue: New users report that they cannot create accounts.
Class: High_

_Issue: A user reports that labels are rendering overlapping in the app's analytics function.
Class: Low_

_Issue: Users in the United States are reporting that the app is crashing when trying to make a purchase.
Class: High_

_Issue: Users report that images are not loading in the app._

Class: **Medium**

**Explanation: The issue of images not loading in the app impacts users' experience and might cause frustration, but it does not have a high business cost or impact many users. Therefore, it is classified as a medium-level issue.**

Few-shot prompting, which is a strategy derived from the [few-shot learning](https://www.ibm.com/think/topics/few-shot-learning) paradigm, is typically used to improve the performance of the model over zero-shot prompting on a task.[1](#f1)In this example, the AI model produces useful inferences in both the zero-shot and few-shot scenarios. In deciding whether to use zero-shot or few-shot prompting, one should consider the constraints of the problem and the demonstrated performance of both strategies. Reynolds and McDonell (2021) have found that with improvements in prompt structure, zero-shot prompting can outperform few-shot prompting in some scenarios.[4](#f4) Schulhoff et al. (2024) find different results comparing the performance of several prompting strategies.[5](#f5)

## Advantages and limitations of zero-shot prompting

Zero-shot prompting is a popular approach because of its advantages.[6](#f6) Researchers continue to develop techniques to address the limitations of this prompting technique.[8](#f8)

**Advantages**

1. **Simplicity:** Prompts are simple to construct and easy to understand. This approach allows for users to experiment with different prompts without deep prompt engineering knowledge.
2. **Ease of use:** Zero-shot prompting doesn't require any additional data, making it valuable in cases where relevant data is difficult to source or scarce.
3. **Flexibility:** Prompts are easy to adapt as needed. Improving a prompt or updating a prompt due to changing circumstances requires low effort.

**Limitations**

1. **Performance variability**: While zero-shot prompting can be effective, its performance can vary significantly depending on the complexity and specificity of the task. Models might struggle with tasks that require deep domain knowledge, nuanced understanding or highly specific outputs, leading to suboptimal results compared to task-specific fine-tuned models.
2. **Dependence on pretrained model quality:** The success of zero-shot prompting heavily depends on the quality and comprehensiveness of the pretrained language model. If the model lacks sufficient exposure to certain topics, languages or contexts during pretraining, its zero-shot performance on related tasks will likely be poor.

Advances in training methods for LLMs have improved model output for zero-shot prompting across various use cases.[7](#f7)

Think Newsletter

### Think beyond prompts and get the full context

Stay ahead of the latest in industry news, AI tools and emerging trends in prompt engineering with the Think Newsletter. Plus, get access to new explainers, tutorials and expert insights—delivered straight to your inbox. See the [IBM Privacy Statement](https://www.ibm.com/privacy).

### Thank you! You are subscribed.

Your subscription will be delivered in English. You will find an unsubscribe link in every newsletter. You can manage your subscriptions or unsubscribe [here](https://www.ibm.com/account/reg/signup?formid=news-urx-51525). Refer to our [IBM Privacy Statement](https://www.ibm.com/us-en/privacy) for more information.

https://www.ibm.com/us-en/privacy

## Improvements in zero-shot prompting performance

Zero-shot prompting relies on the foundation model’s pretrained knowledge and its flexibility to adapt to the requested prompt and to provide an appropriate response.[1](#f1)

Improving responses in the zero-shot scenario is a focus of researchers.[1](#f1)Zero-shot prompt response accuracy is often used to benchmark model performance while testing new model training methods.[7](#f7) Two improvements that have resulted in better zero-shot prompting performance are instruction tuning and [reinforcement learning with human feedback](https://www.ibm.com/think/topics/rlhf) (RLHF).[8](#f8), [9](#f9)

In instruction tuning, a model is fine-tuned by using supervised learning on a dataset that includes instructions for various tasks and outcomes for these tasks. The dataset includes tasks such as text summarization, conversion and reading comprehension. This strategy of fine-tuning with an instructional dataset has resulted in better zero-shot prompting performance on new tasks in these categories.[8](#f8)

Another example of using fine-tuning to improve zero-shot prompting outcomes is RLHF fine-tuning, in which [reinforcement learning](https://www.ibm.com/think/topics/reinforcement-learning) learns a policy that guides the model to better outputs. In this 3-step process, the model is first fine-tuned by using an instructional dataset in which humans have provided the target responses. Then, the model projects outputs to several prompts ranked by humans. Lastly, the ranked outputs are used to train a reinforcement learning model that learns a policy to select best outputs based on these human-provided rankings.[12](#f12)

The final step uses reinforcement learning’s ability to use the consequences (rewards or punishments) of actions (decision or path taken) to learn a strategy (or policy) for making good decisions. In this case, the problem space is all of the potential strategies that might be used in the model’s selection of a good output as its response.[9](#f9)

AI Academy

### Become an AI expert

Gain the knowledge to prioritize AI investments that drive business growth. Get started with our free AI Academy today and lead the future of AI in your organization.

[Watch the series](https://www.ibm.com/think/videos/ai-academy)

## Applications of zero-shot prompting

In comparison to traditional supervised machine learning for natural language processing (NLP), zero-shot prompting does not require labeled training data. Artificial intelligence practitioners and data scientists can use the generative AI technology of large language models in the zero-shot prompting scenario for various use cases including:[10](#f10)

**Text classification**

As shown in the prior example classifying the priority of IT issues with IBM’s granite-3-8b-instruct model, the model can achieve classification without prior examples belonging to the different classes. This capability is ideal for situations where limited or no labeled training data exists. This [zero-shot classification](https://www.ibm.com/think/tutorials/zero-shot-classification "https://www.ibm.com/think/tutorials/zero-shot-classification") tutorial shows an implementation of this use case.

**Information extraction**

Given a body of text and a question, an LLM can extract the requested information in accordance with a prompt.

**Question answering**

Using the pretrained knowledge of a model, a user can prompt for a response to a question.

**Text summarization**

Given text and an instruction for text summarization, large language models can run this task in the zero-shot prompt scenario without requiring example summaries of other texts.

**Generation**

LLMs generate data in the form of text, code, images and more for specified use cases.

**Conversation**

Typically using models tuned for chat (such as the well-known chat-GPT series), LLMs can interact with a user in chat mode, accomplishing many of the preceding use cases.

## Other prompt engineering methods

For complex use cases such as multistep reasoning tasks, both zero-shot prompting and few-shot prompting might fail to produce an appropriate response from the model. Advanced prompting techniques including chain-of-thoughts and tree-of-thoughts can be more successful in these cases.

[Chain-of-thoughts](https://www.ibm.com/think/topics/chain-of-thoughts): Chain-of-thought (CoT) prompting is a strategy that poses a task to the model by specifying the larger task as a series of discrete steps to solve. This exposition of intermediary steps improves the ability of the model to generate a correct response. CoT also allows better transparency into the problem-solving process because of the elucidation of the intermediate steps. This prompt engineering technique shows success in areas including improving customer service chatbot performance, helping organize the thoughts of researchers and writers and generating step-by-step descriptions for math and science educational problems.[11](#f11)

[Tree of thoughts](https://www.ibm.com/think/topics/tree-of-thoughts): Tree-of-thought (ToT) prompting generates a branching text tree of potential next steps and corresponding possible solutions to the problem. This tree structure allows the model to explore multiple paths and backtrack, if necessary, when a path doesn’t result in an acceptable solution. It is designed to approximate human reasoning strategies when comparing potential paths to a solution. Common strategies for exploring solutions are breadth-first-search (BFS) and depth-first-search (DFS) along with the heuristic search and reinforcement learning approaches. Researchers have used this application to solve puzzles such as sudoku and the Game of 24.[12](#f12), [13](#f13)

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

1. E. Saravia. "Prompt Engineering Guide." [https://github.com/dair-ai/Prompt-Engineering-Guide](https://arxiv.org/abs/2201.11903) (accessed Oct 2024).

2. "Granite 3.0 Language Models," IBM Research, Yorktown Heights, NY, Oct 2024. <https://github.com/ibm-granite/granite-3.0-language-models/blob/main/paper.pdf>

3. B. Romera-Paredes, P. Torr, "An embarrassingly simple approach to zero-shot learning," in ICML, 2015, pp. 2152–2161, <https://proceedings.mlr.press/v37/romera-paredes15.pdf>.

4. L. Reynolds, K. McDonell, "Prompt Programming for Large Language Models: Beyond the Few-Shot Paradigm", Feb 2021, [https://doi.org/10.48550/arXiv.2102.07350](https://arxiv.org/abs/2102.07350).

5. S. Schulhoff, M. Ilie, N. Balepur, K. Kahadze, A. Liu, C. Si, Y. Li, A. Gupta, H. Han, S. Schulhoff, P. S. Dulepet, S. Vidyadhara, D. Ki, S. Agrawal, C. Pham, G. Kroiz, F. Li, H. Tao, A. Srivastava et al. "The Prompt Report: A Systematic Survey of Prompting Techniques," Dec 2024, [https://doi.org/10.48550/arXiv.2406.06608](https://arxiv.org/abs/2406.06608).

6. Y. Li, Yinheng, "A Practical Survey on Zero-shot Prompt Design for In-context Learning," in RANLP, July 2023, pp. 641‑647, <https://acl-bg.org/proceedings/2023/RANLP%202023/pdf/2023.ranlp-1.69.pdf>.

7. H. Touvron, T. Lavril, G. Izacard, X. Martinet, M.-A. Lachaux, T. Lacroix, B. Rozi`ere, N. Goyal, E. Hambro, F. Azhar, A. Rodriguez, A. Joulin, E. Grave and G. Lample, “LLaMA: Open and efficient foundation language models,” Feb 2023, [https://doi.org/10.48550/arXiv.2302.13971](https://arxiv.org/abs/2302.13971).

8. J. Wei, M. Bosma, V. Y. Zhao, K. Guu, A. W. Yu, B. Lester, N. Du, A. M. Dai and Q. V. Le, "Finetuned Language Models are Zero-Shot Learners," in ICLR, 2022, [https://doi.org/10.48550/arXiv.2109.01652](https://arxiv.org/abs/2109.01652).

9. L. Ouyang, J. Wu, X. Jiang, D. Almeida, C. L. Wainwright, P. Mishkin, C. Zhang, S. Agarwal, K. Slama, A. Ray, J. Schulman, J. Hilton, F. Kelton, L. Miller, M. Simens, A. Askell, P. Welinder, P. Christiano, J. Leike, and R. Lowe, “Training language models to follow instructions with human feedback,” in NeurIPS, 2022, <https://proceedings.neurips.cc/paper_files/paper/2022/file/b1efde53be364a73914f58805a001731-Paper-Conference.pdf>.

10. P. Liu, W. Yuan, J. Fu, Z. Jiang, H. Hayashi, and G. Neubig, “Pre-train, prompt and predict: A systematic survey of prompting methods in Natural Language Processing,” ACM Computing Surveys, vol. 55, no. 9, pp. 1–35, Jan. 2023, <https://dl.acm.org/doi/pdf/10.1145/3560815>.

11. J. Wei, X. Wang, D. Schuurmans, M. Bosma, B. Ichter, F. Xia, E. Chi, Q. Le, and D. Zhou, “Chain-of-thought prompting elicits reasoning in large language models,” Jan 2023, [https://doi.org/10.48550/arXiv.2201.11903](https://arxiv.org/abs/2201.11903).

12. J. Long, "Large Language Model Guided Tree-of-Thought," May 2023, [https://doi.org/10.48550/arXiv.2305.08291](https://arxiv.org/abs/2305.08291).

13. S. Yao, D. Yu, J. Zhao, I. Shafran, T. L. Griffiths, Y. Cao, and K. Narasimhan, "Tree of Thoughts: Deliberate Problem Solving with Large Language Models," Dec 2023, [https://doi.org/10.48550/arXiv.2305.10601](https://arxiv.org/abs/2305.10601).
