# Prompt chaining with LangChain: A comprehensive overview

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

Prompt chaining is a foundational concept in building advanced workflows using [large language models (LLMs)](https://www.ibm.com/think/topics/large-language-models). It involves linking multiple prompts in a logical sequence, where the output of one prompt serves as the input for the next. This modular approach is powerful for solving complex tasks like multistep text processing, summarization, question-answering and more.

**LangChain** is a versatile framework designed to simplify the creation of such workflows. It provides tools to manage LLMs such as [IBM® Granite™ models](https://www.ibm.com/products/watsonx-ai/foundation-models) or OpenAI’s GPT (generative pre-trained transformer) models, define custom prompts, and connect them into reusable chains. By abstracting the complexity of managing prompts, LangChain allows developers to focus on solving problems rather than orchestrating interactions with LLMs.

In this tutorial, we will:

1. Explore different types of prompt chaining (sequential, branching, iterative, and others).
2. Implement a generic chaining example combining sequential, branching, and iterative chaining types.
3. Leverage LangChain's built-in classes such as PromptTemplate, LLMChain and SequentialChain to define and manage the workflow.

## How LangChain manages prompt chaining

LangChain provides a powerful framework for building modular workflows in chatbot applications. By combining structured prompts, dynamic chaining, and advanced LLM integration, it allows developers to create scalable, adaptive pipelines that leverage RAG techniques and deliver structured outputs like JSON. Here's how LangChain handles prompt chaining effectively:

**Prompt abstraction:** LangChain leverages from_template to design structured input/output workflows for each step, making it easy to handle complex chatbot operations.

**LLM integration:** The framework seamlessly integrates with various LLMs, such as, IBM Granite, OpenAI and Hugging Face, enabling fine-tuning for customized tasks.

**Chain management:** LangChain's SequentialChain and SimpleSequentialChain enable modular workflows for chatbot pipelines, while stroutputparser ensures structured outputs such as JSON.

**Dynamic workflows:** Using tools such as ConditionalChain and systemmessage templates, LangChain supports adaptive workflows, aligning with the principles of RAG (retrieval-augmented generation) for dynamic content generation.

By the end of this tutorial, you’ll have a solid understanding of how to use LangChain to build modular and extensible workflows for a wide range of applications.

## Types of prompt chaining

Prompt chaining allows you to design workflows where outputs from one step are passed to the next. Different types of chaining support diverse workflows, ranging from simple sequential tasks to more complex, dynamic processes. Here’s a brief look at the types of prompt chaining:

- Sequential chaining: The most straightforward type of chaining, where the output of one prompt is directly passed as input to the next. This option is ideal for tasks with a linear progression.[[1]](#f01)

- Branching chaining: In branching chaining, a single output is split into multiple parallel workflows. Each branch processes the output independently. [[2]](#f02)

- Iterative chaining: Iterative chaining involves repeatedly running a prompt or chain until a specified condition is met. This option is useful for refining outputs.[[3]](#f03)

- Hierarchical chaining: This type breaks down a large task into smaller subtasks, which are executed hierarchically. Lower-level outputs feed higher-level tasks. [[4]](#f04)

- Conditional chaining: Conditional chaining dynamically chooses the next step based on the output of a prior prompt. It enables decision-making within workflows.

- Multimodal chaining: Multimodal chaining integrates prompts that handle different data types (for example, text, images or audio). It is suitable for applications combining multiple modalities. [[2]](#f02)

- Dynamic chaining: Dynamic chaining adapts the workflow based on real-time outputs or changing conditions. It adds flexibility to prompt chaining. [[5]](#f05)

- Recursive chaining: In recursive chaining, large inputs are divided into smaller chunks for individual processing, and the results are then combined. It is useful for handling lengthy documents or datasets. [[6]](#f06)

- Reverse chaining: Reverse chaining starts with an expected output and works backward to determine the necessary inputs or steps to achieve it. It is great for problem-solving and debugging. [[5]](#f05)

Each type of chaining caters to unique use cases, making it essential to choose the right one based on the task's complexity and requirements.

## Use case - multistep text processing

In this workflow, we process customer feedback with chat models and prompt engineering to build a scalable text-processing pipeline. The following stages of the tutorial demonstrate sequential, branching and iterative chaining techniques powered by generative AI.

**Extracting keywords (sequential chaining)**

- The input text or user input given in natural language is processed through a prompt template to identify significant keywords.
- This step uses sequential chaining to ensure the extracted keywords feed directly into subsequent tasks.

**Generating a sentiment summary (branching chaining)**

- Extracted keywords are passed into a chat model to generate a sentiment summary.
- Branching chaining allows parallel paths for summarization to adapt outputs based on the context.

**Refining the sentiment summary (iterative chaining)**

- If the sentiment summary doesn’t meet predefined quality criteria, it is passed through a refinement prompt.
- Iterative chaining enables reprocessing until the output meets the expected level of precision.

**Final output**

- The refined sentiment summary is delivered as the final output, providing polished insights to the user.
- This showcases the integration of prompt engineering, generative AI and advanced chaining techniques.

This approach combines sequential, branching, and iterative chaining in Python with chat models and prompt engineering. It ensures robust processing of customer feedback, leveraging generative AI for keyword extraction, sentiment analysis, and refinement.

## Prerequisites

You need an [IBM Cloud® account](https://cloud.ibm.com/registration?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-implement-xgboost-in-python&cm_sp=ibmdev-_-developer-_-trial) to create a [watsonx.ai™](https://www.ibm.com/products/watsonx-ai) project.

## Steps

#### Step 1. Set up your environment

While you can choose from several tools, this tutorial walks you through how to set up an IBM account to use a Jupyter Notebook.

1. Log in to [watsonx.ai](https://dataplatform.cloud.ibm.com/registration/stepone?context=wx&apps=all) using your IBM Cloud account.
2. Create a [watsonx.ai project](https://www.ibm.com/docs/en/watsonx/saas?topic=projects-creating-project). You can get your project ID from within your project. Click the **Manage** tab. Then, copy the project ID from the **Details** section of the **General** page. You need this ID for this tutorial.
3. Create a [Jupyter Notebook](https://www.ibm.com/docs/en/watsonx/saas?topic=editor-creating-managing-notebooks).

This step opens a notebook environment where you can copy the code from this tutorial. Alternatively, you can download this notebook to your local system and upload it to your watsonx.ai project as an asset. To view more Granite tutorials, check out the [IBM Granite™ Community](https://github.com/ibm-granite-community). This tutorial is also available on [GitHub](https://github.com/IBM/ibmdotcom-tutorials/blob/main/generative-ai/prompt-chaining-langchain.ipynb).

#### Step 2. Set up watsonx.ai Runtime service and API key

1. Create a [watsonx.ai Runtime](https://cloud.ibm.com/catalog/services/watsonxai-runtime) service instance (choose the Lite plan, which is a free instance).
2. Generate an [API Key](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html).
3. Associate the watsonx.ai Runtime service with the project that you created in [watsonx.ai](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/assoc-services.html?context=cpdaas).

#### Step 3. Installation of the packages

We need libraries to work with langchain framework and watsonxLLM. Let's first install the required packages.

_Note: If you are using an old version of `pip`, you can use the command pip install --upgrade pip` to upgrade it. This step helps you with easy installation of the latest packages, which might not be compatible with an older version. But if you are already using the latest version or recently upgraded your packages, then you can skip this command._

!pip install --upgrade pip
%pip install langchain
!pip install langchain-ibm

#### Step 4. Import required libraries

This code block imports essential Python libraries and tools to build and manage an LLM application by using LangChain and IBM Watson LLM.

The **os** module is used to access environment variables, such as project credentials or API keys.

**WatsonxLLM** is a module from langchain_ibm that integrates IBM Watson LLM for generating outputs from generative AI models.

**PromptTemplate** helps create reusable templates for prompts, ensuring input structure and flexibility in prompt engineering.

**LLMChain** builds individual task chains while

**SequencialChain** links multiple steps into a single workflow and `getpass` safely retrieves sensitive information (for example, API keys) without exposing it on the screen.

import os
from langchain_ibm import WatsonxLLM
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain
import getpass

#### Step 5. Set up credentials

This code sets up credentials for accessing the _IBM Watson Machine Learning (WML) API_ and ensures that the **PROJECT_ID** is correctly configured.

- A dictionary’s **credentials** are created with the _WML service URL and API key_. The API key is securely collected by using **gatepass.gatepass** to avoid exposing sensitive information.
- The code tries to fetch the **PROJECT_ID** from environment variables by using **os.environ** function. If the **PROJECT_ID** is not found, the user is prompted to manually enter it through input.

# Set up credentials

credentials = {
    "url": "https://us-south.ml.cloud.ibm.com", # Replace with the correct region if needed
    "apikey": getpass.getpass("Please enter your WML API key (hit enter): ")
}

# Set up project_id

try:
    project_id = os.environ["PROJECT\_ID"]
except KeyError:
    project_id = input("Please enter your project_id (hit enter): ")

#### Step 6. Initialize a large language model

This code initializes the **IBM Watson LLM** for use in the application:

1. This code creates an instance of **WatsonxLLM** using the **ibm/granite-3-8b-instruct model**, designed for instruction-based generative AI tasks.
2. The **url**, **apikey** and **project_id** values from the previously set up credentials are passed to authenticate and connect to the*IBM Watson LLM service*.
3. Configures the **max_new_tokens** parameter to limit the number of tokens generated by the model in each response (150 tokens in this case).

This step prepares the **Watson LLM** for generating responses in the workflow.

# Initialize the IBM LLM

llm = WatsonxLLM(
    model_id="ibm/granite-3-8b-instruct",
    url=credentials["url"],
    apikey=credentials["apikey"],
    project_id=project_id,
    params={
    "max_new_tokens": 150
    }
)

#### Step 7. Define prompt templates

This code defines prompt templates for three stages of the text-processing workflow:

1. **Keyword extraction:** _keyword_prompt_ is designed to extract the most significant keywords from the provided text. It uses the placeholder _{text}_ to dynamically insert the input.
2. **Sentiment summary generation:** s*entiment_prompt* takes the extracted _{keywords}_ as input and generates a sentiment summary of the feedback. The template ensures that the sentiment generation is focused on the provided keywords.
3. **Refinement of the summary:** _refine_prompt_ improves the sentiment summary by using _{sentiment_summary}_ as input. It focuses on making the output concise and precise.

These **PromptTemplate** instances enable reusable and structured prompt engineering for the **LLM application.**

# Define Prompt Templates

# Prompt for extracting keywords

keyword_prompt = PromptTemplate(
    input_variables=["text"],
    template="Extract the most important keywords from the following text:\n{text}\n\nKeywords:"
)

# Prompt for generating sentiment summary

sentiment_prompt = PromptTemplate(
    input_variables=["keywords"],
    template="Using the following keywords, summarize the sentiment of the feedback:\nKeywords: {keywords}\n\nSentiment Summary:"
)

# Prompt for refining the summary

refine_prompt = PromptTemplate(
    input_variables=["sentiment\_summary"],
    template="Refine the following sentiment summary to make it more concise and precise:\n{sentiment_summary}\n\nRefined Summary:"
)

#### Step 8. Create chains

This code defines LLM chains that connect the prompts with the initialized IBM Watson LLM, assigning unique output keys for each stage:

1. **Keyword chain:** _keyword_chain_ uses the _keyword_prompt_ to extract keywords from the input text. The result is stored under the unique key "keywords" for use in subsequent steps.
2. **Sentiment chain:** _sentiment_chain_ takes the extracted keywords and generates a sentiment summary by using the _sentiment_prompt_. The output is labeled as "sentiment_summary".
3. **Refinement chain:** _refine_chain_ processes the generated sentiment summary by using the _refine_prompt._ The final refined output is stored with the key "refined_summary".

These **LLMChain instances** enable modular task execution, facilitating a step-by-step LLM application workflow.

# Define Chains with Unique Keys

# Chain to extract keywords

keyword_chain = LLMChain(
    llm=llm,
    prompt=keyword_prompt,
    output_key="keywords" # Unique key for extracted keywords
)

# Chain to generate sentiment summary

sentiment_chain = LLMChain(
    llm=llm,
    prompt=sentiment_prompt,
    output_key="sentiment_summary" # Unique key for sentiment summary
)

# Chain to refine the sentiment summary

refine_chain = LLMChain(
    llm=llm,
    prompt=refine_prompt,
    output_key="refined_summary" # Final refined output
)

#### Step 9. Combine chains

This code combines the previously defined chains into a sequential workflow, enabling a step-by-step process for text input. The **SequentialChain** links the _keyword_chain_, _sentiment_chain_, and _refine_chain_ in a defined order, ensuring that the output of one chain serves as the input for the next. The workflow is configured to accept text as its initial input, with the final output, a refined sentiment summary, stored under the key **"refined_summary"**. This setup allows for streamlined and efficient execution of the LLM application, ensuring a coherent and modular processing pipeline.

# Combine Chains into a Sequential Workflow

workflow = SequentialChain(
    chains=[keyword\_chain, sentiment\_chain, refine\_chain],
    input_variables=["text"], # Initial input for the workflow
    output_variables=["refined\_summary"] # Final output of the workflow
)

#### Step 10. Run the workflow

In this code block, we will run the entire workflow. First, we have a multiline feedback string defined as **feedback_text**, containing both positive and negative user comments about an app. The **workflow.run** method processes the feedback through the sequential chains (keyword extraction, sentiment analysis, and refinement) by using the provided input. And the refined sentiment summary is printed directly as the final result.

# Example Input Text

feedback_text = """
    \*I really enjoy the features of this app, but it crashes frequently, making it hard to use.
    The customer support is helpful, but response times are slow.

I tried to reachout to the support team, but they never responded

For me, the customer support was very much helpful. Ihis is very helpful app. Thank you for grate services.\*
"""

# Run the Workflow

result = workflow.run({"text": feedback_text})

# Display the Output

print("Refined Sentiment Summary:")
print(result) # Directly print the result since it is a string

**OUTPUT**

Refined Sentiment Summary:

The user's sentiment is predominantly negative due to recurring app crashes and slow customer support response times, despite appreciation for the app's features and occasional helpful customer support. To enhance user satisfaction, the development team should focus on resolving app crashes and expediting customer support responses.

**_The refined sentiment summary is a concise and clear evaluation of the feedback. It highlights the user's appreciation for the app's features but expresses frustration over frequent crashes and slow customer support, reflecting the workflow's ability to distill critical insights effectively._**

## How to choose the correct chaining type

Selecting the appropriate chaining type for LLM application involves evaluating key factors to ensure efficiency and coherence:

**Task complexity:** Use runnable workflows for tasks with multiple steps. Few-shot examples or chatprompttemplate can help structure complex tasks requiring different prompts.

**Dependency:** If outputs from one step are placeholders for the next prompt, use sequential chaining. Output parsers ensure smooth transition of outputs into structured inputs.

**Adaptability:** For dynamic workflows, such as those involving langchain agents, iterative chaining allows real-time adjustments of parameters and next prompts.

**Data modality:** Choose workflows compatible with varied data types. Use embedding methods for text and vector data or LangChain Expression Language for flexible operations.

By considering these factors, you can build a robust and adaptable LLM application with coherent chaining workflows.

## Summary

Prompt chaining is a versatile technique for building sophisticated natural language processing (NLP) workflows. In this tutorial, we explored various chaining types and demonstrated a generic example integrating multiple chaining approaches. By experimenting with these methods, you can unlock the full potential of language models for real-world applications.

##### Footnotes

[1] Roegiest, A., & Chitta, R. (2024). Answering Questions in Stages: Prompt Chaining for Contract QA.

[2] Ge, J., Luo, H., Qian, S., Gan, Y., Fu, J., & Zhang, S. (2023). Chain of Thought Prompt Tuning in Vision Language Models.

[3] Sun, S., Yuan, R., Cao, Z., Li, W., & Liu, P. (2024). Prompt Chaining or Stepwise Prompt? Refinement in Text Summarization. , 7551-7558. <https://arxiv.org/abs/2406.00507>.

[4] Huang, Q., Zhu, J., Li, Z., Xing, Z., Wang, C., & Xu, X. (2023). PCR-Chain: Partial Code Reuse Assisted by Hierarchical Chaining of Prompts on Frozen Copilot. 2023 IEEE/ACM 45th International Conference on Software Engineering: Companion Proceedings (ICSE-Companion), 1-5. <https://ieeexplore.ieee.org/document/10172550>.

[5] Wu, T., Jiang, E., Donsbach, A., Gray, J., Molina, A., Terry, M., & Cai, C. (2022). PromptChainer: Chaining Large Language Model Prompts through Visual Programming. CHI Conference on Human Factors in Computing Systems Extended Abstracts. <https://dl.acm.org/doi/10.1145/3491101.3519729>.

[6] Trautmann, D. (2023). Large Language Model Prompt Chaining for Long Legal Document Classification. ArXiv, abs/2308.04138. <https://arxiv.org/abs/2308.04138>.
