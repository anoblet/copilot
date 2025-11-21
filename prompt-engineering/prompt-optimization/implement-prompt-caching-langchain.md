# Implement prompt caching by using LangChain for building efficient LLM applications

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

## What is prompt caching?

Prompt caching is a way to store and then reuse the responses generated from executed prompts when working with language models such as [IBM Granite® models](https://www.ibm.com/granite). If the same input (prompt) is encountered again, rather than making a new API call, the application will retrieve the previously stored response in the prompt cache.

Think of prompt caching as a kind of "memory" for your application. The system keeps results from previous queries in order to save computation time by not having to make repeated requests against the same input.

## Why is it important?

Prompt caching is significant because it avoids repeated application programming interface (API) calls by reusing existing responses for identical repeated prompts. This ability results in faster response time, consistent output and lower usage of the API, which is helpful for staying within rate limits. It also helps to scale the flow and create resilience during outages. Prompt caching is a critical feature that adds value for any cost-effective, efficient and user friendly AI application.

## Prerequisites

1. You need an [IBM Cloud® account](https://cloud.ibm.com/registration?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-implement-xgboost-in-python&cm_sp=ibmdev-_-developer-_-trial) to create a [watsonx.ai®](https://www.ibm.com/products/watsonx-ai) project.
2. You also need Python version 3.12.7

## Steps

#### Step 1: Set up your environment

While you can choose from several tools, this tutorial walks you through how to set up an IBM account to use a Jupyter Notebook.

1. Log in to [watsonx.ai](https://dataplatform.cloud.ibm.com/registration/stepone?context=wx&apps=all) by using your IBM Cloud account.
2. Create a [watsonx.ai project](https://www.ibm.com/docs/en/watsonx/saas?topic=projects-creating-project). You can get your project ID from within your project. Click the Manage tab. Then, copy the project ID from the Details section of the General page. You need this ID for this tutorial.
3. Create a [Jupyter Notebook](https://www.ibm.com/docs/en/watsonx/saas?topic=editor-creating-managing-notebooks). This step opens a Jupyter Notebook environment where you can copy the code from this tutorial. Alternatively, you can download this notebook to your local system and upload it to your watsonx.ai project as an asset. To view more Granite tutorials, check out the [IBM Granite Community](https://github.com/ibm-granite-community).

#### Step 2: Set up a watsonx.ai Runtime instance and API key

1. Create a [watsonx.ai Runtime](https://cloud.ibm.com/catalog/services/watsonxai-runtime) service instance (choose the Lite plan, which is a free instance).
2. Generate an [API Key](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html).
3. Associate the watsonx.ai Runtime service to the project that you created in [watsonx.ai](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/assoc-services.html?context=cpdaas).

#### Step 3: Installation of the packages

We need libraries to work with langchain framework and WatsonxLLM. Let's first install the required packages. This tutorial is built using Python 3.12.7

*Note: If you are using older version of pip, you can use the command*pip install --upgrade pip*to easily install the latest packages that might not be compatible with older versions. But if you are already using the latest version or recently upgraded you packages, then you can skip this command*.

!pip install -q langchain langchain-ibm langchain_experimental langchain-text-splitters langchain_chroma transformers bs4 langchain_huggingface sentence-transformers

#### Step 4:  Import required libraries

**os module** is used to access environment variables, such as project credentials or API keys.

**WatsonxLLM** is a module from langchain_ibm that integrates IBM Watson LLM for generating outputs from generative AI models.

**ChatWatsonx** Enables chat-based interactions by using IBM watsonx through LangChain.

**SimpleDirectoryReader** is for loading and reading documents from a directory for indexing with LlamaIndex.

**GenParams** contains metadata keys for configuring Watsonx text generation parameters.

**SQLiteCache** enables setting up a local .cache.db SQLite database to avoid redundant API calls and speed up development and testing.

We need a few libraries and modules for this tutorial. Make sure to import the following ones and if they're not installed, a quick pip installation resolves the problem.

import os
import getpass
import requests
import random
import json
from typing import Dict, List
from langchain_ibm import WatsonxLLM
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from langchain_ibm import WatsonxLLM
from langchain_ibm import ChatWatsonx
from llama_index.core import SimpleDirectoryReader

#### Step 5: Read the text data

from llama_index.core import SimpleDirectoryReader

documents = SimpleDirectoryReader(
input_files=["~/Artificial Intelligence/Generative\_AI/files/FIle2.txt"],
).load_data()

document_text = documents[0].text
print(document_text[:200] + "...")

#### Step 6:  Set up credentials

This code sets up credentials for accessing the IBM Watson Machine Learning (WML) API and helps ensure that the project ID is correctly configured.

- A dictionary credentials is created with the *WML service URL* and *API key*. The API key is securely collected by using getpass.getpass to avoid exposing sensitive information.
- the code tries to fetch the PROJECT_ID from environment variables by using os.environ. If the PROJECT_ID is not found, the user is prompted to manually enter it via input.

credentials = {
"url": "https://us-south.ml.cloud.ibm.com", # Replace with the correct region if needed
"apikey": getpass.getpass("Please enter your WML API key (hit enter): ")
}

# Set up project_id

try:
project_id = os.environ["PROJECT\_ID"]
except KeyError:
project_id = input("Please enter your project_id (hit enter): ")

#### Step 7: Initialize large language model

This code initializes the IBM Watson LLM for use in the application:

1. This code creates an instance of WatsonxLLM by using the ibm/granite-3-8b-instruct model ([Granite-3.1-8B-Instruct](https://huggingface.co/ibm-granite/granite-3.1-8b-instruct)) designed for instruction-based generative AI tasks.
2. The url, apikey and project_id values from the previously set up credentials are passed to authenticate and connect to the IBM Watson LLM service.
3. Configures the max_new_tokens parameter to limit the number of tokens generated by the model in each response (2000 tokens in this case).

To learn more about model parameters such as the minimum and maximum token limits, refer to the [documentation](https://ibm.github.io/watsonx-ai-python-sdk/fm_model.html#metanames.GenTextParamsMetaNames).

llm = WatsonxLLM(
model_id= "ibm/granite-3-8b-instruct",
url=URL,
apikey=WATSONX_APIKEY,
project_id=WATSONX_PROJECT_ID,
params={
GenParams.DECODING_METHOD: "greedy",
GenParams.TEMPERATURE: 0,
GenParams.MIN_NEW_TOKENS: 5,
GenParams.MAX_NEW_TOKENS: 2000,
GenParams.REPETITION_PENALTY:1.2,
GenParams.STOP_SEQUENCES: ["\n\n"]
}
)

#### Step 8: Set up SQLite cache for faster LLM responses

**SQLiteCache** is a persistent caching tool offered by LangChain that stores responses from LLM calls in a SQLite database file. SQLiteCache smartly cuts down on CPU time by storing costly computations, which means it focuses on retrieving data instead of recalculating it. Rather than going through the whole process again, it simply pulls results from the disk—making it efficient, reliable and reusable.

**_Figure illustrates with prompt caching, how results load instantly from disk; without it, every query wastes time on redundant computation._**

from langchain.cache import SQLiteCache
from langchain.globals import set_llm_cache
set_llm_cache(SQLiteCache(database_path=".langchain.db"))

%%time
prompt = "System: You are a helpful assistant.\nUser: Why did Paul Graham start YC?\nAssistant:"
resp = llm.invoke(prompt)
print(resp)

In this case, CPU only worked for 22 ms, but the actual elapsed time was 1.43 seconds.

This example suggests most of the time was spent waiting, likely for I/O operations (for example, disk read and write, network access or API call)

**Now, let's run the model a second time with the prompt and see the response time.**

%%time
llm.predict(resp)

Clearly, using SQLiteCache, the CPU is used for just 7.26 ms, but wall time was 6.15 seconds.

This clearly points to blocking external dependencies (like waiting for a response from a server).

## Conclusion

Prompt caching accelerates and reduces the cost of API requests to large language models, such as GPT-4o. Prompts cache content such as input tokens, output tokens, embeddings and messages from user, a system prompt or the output of a function, which now uses a cached content as opposed to network requests for a new revision. This method provides lower pricing, improved response latency and improved key performance indicators (KPIs).

Prompt caching can be beneficial for chatbots, RAG systems, fine-tuning and code assistants. A robust caching strategy that includes functions such as cache read, cache write, system message, cache control and proper time to live (TTL) will improve cache hit rates and lower cache miss rates.

Consistent use of the same prompt tokens, prompt prefix and uses system instructions, helps with consistent prompt performance in multiturn conversations and subsequent requests. Regardless of using Python, an SDK or working with OpenAI or another provider, understanding how prompt caching works will better enable you to implement prompt caching for use in many use cases.

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
