# Use role prompting with IBM watsonx and Granite

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

[Vanna Winland](https://www.ibm.com/think/author/vanna-winland)

AI Advocate & Technology Writer

[Anna Gutowska](https://www.ibm.com/think/author/anna-gutowska)

AI Engineer, Developer Advocate

IBM

## What is role prompting?

In this tutorial, we will follow step-by-step instructions to perform a prompt engineering technique called role prompting. We will use an IBM® Granite™ Model to assign personas for nuanced model outputs.

Role prompting is a prompt engineering technique that instructs an artificial intelligence (AI) model to take on a specific role or persona when generating a response. This technique can be used to guide the model's tone, style and behavior, which can lead to more engaging outputs.

Prompt engineering is about optimizing the model input, so it responds with appropriate, meaningful answers. [Zero-shot](https://www.ibm.com/think/tutorials/zero-shot-classification) and [few-shot prompting](https://www.ibm.com/think/topics/few-shot-prompting) are two popular techniques used to converse with large language models (LLMs). LLMs have a natural ability to perform natural language processing (NLP) tasks due to their ability to process and interpret human language. The language capabilities of AI models are valuable for tasks ranging from chatbot conversations and [multiagent](https://www.ibm.com/think/topics/multiagent-system) interactions to open-ended creative writing.

Generative AI (gen AI) gets more personal when an [LLM](https://www.ibm.com/think/topics/large-language-models) is instructed to act as a specific persona to fulfill a role’s specific needs. The AI’s responses can be more accurate and relevant when first prompted with an assigned role. AI models leverage huge datasets so an assigned role can be anything from a teacher, historical figure, salesperson or others, bound only by what one’s imagination can think of. This ability is what makes role prompting, also referred to as persona prompting, such a powerful technique. An AI model’s adaptability makes it a master of disguise, able to generate responses tailored to a user or system’s specific needs.

## How role prompting is used

Role prompting can be used to give a chatbot a persona to better interact with users or an AI agent to better interact with other agents. If you’re familiar with prompt templates, you may have already seen role prompting in action. For example, many agentic frameworks use role-playing agents to complete tasks and collaborate effectively. [ChatDev](https://www.ibm.com/think/topics/chatdev) uses a role-prompting technique called a self-attention mechanism. This mechanism clearly defines the agent’s role that acts as a guideline for its generated outputs.

## Prerequisites

To follow this tutorial, you need an [IBM Cloud® account](https://cloud.ibm.com/registration?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&cm_sp=ibmdev-_-developer-_-trial) to create a [watsonx.ai](https://www.ibm.com/products/watsonx-ai?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&cm_sp=ibmdev-_-developer-_-product)™ project.

## Steps

### Step 1. Set up your environment

While you can choose from several tools, this tutorial walks you through how to set up an IBM account to use a Jupyter Notebook. Jupyter Notebooks are widely used within [data science](https://www.ibm.com/think/topics/data-science) to combine code, text, images and [data visualizations](https://www.ibm.com/think/topics/data-visualization) to formulate a well-formed analysis.

1. Log in to [watsonx.ai Runtime](https://dataplatform.cloud.ibm.com/registration/stepone?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&cm_sp=ibmdev-_-developer-_-trial) using your IBM Cloud account.
2. Create a [watsonx.ai project](https://www.ibm.com/docs/en/watsonx/saas?topic=projects-creating-project).

Take note of the project ID in project > Manage > General > Project ID.
                 You’ll need this ID for this tutorial.

3.  Create a [Jupyter Notebook](https://www.ibm.com/docs/en/watsonx/saas?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&topic=editor-creating-managing-notebooks&cm_sp=ibmdev-_-developer-tutorials-_-ibmcom).

This step opens a notebook environment where you can copy the code from this tutorial to perform zero-shot classification on your own. Alternatively, you can download this notebook to your local system and upload it to your watsonx.ai project as an asset. This Jupyter Notebook is available on [GitHub](https://github.com/IBM/ibmdotcom-tutorials/blob/main/generative-ai/role-prompting-tutorial.ipynb).

### Step 2. Set up watsonx.ai Runtime instance and API key

In this step, you associate your project with the watsonx.ai service.

1. Create a [watsonx.ai](https://dataplatform.cloud.ibm.com/registration/stepone?context=wx) Runtime instance (choose the Lite plan, which is a free instance).
2. Generate an [API Key in watsonx.ai](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&context=cpdaas).
3. Associate the watsonx.ai Runtime to the project that you created in [watsonx.ai](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/assoc-services.html?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&context=cpdaas).

### Step 3. Install and import relevant libraries and set up your credentials

We'll need some libraries and modules for this tutorial. Make sure to import the following, and if they're not installed, a quick pip installation will resolve the problem.

%pip install -q -U langchain_ibm
%pip install –q ibm_watsonx_ai

import getpass

from langchain_ibm import WatsonxLLM
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams

### Step 4. Set up your watsonx credentials

Run the following to input and save your watsonx.ai Runtime API key and project ID:

credentials = {
    "url": "https://us-south.ml.cloud.ibm.com",
    "apikey": getpass.getpass("Please enter your watsonx.ai Runtime API key (hit enter): "),
    "project_id": getpass.getpass("Please enter your project ID (hit enter): "),
}

### Step 5. Set up the model for role prompting

Next, we'll set up IBM's [Granite-3.1-8B-Instruct](https://huggingface.co/ibm-granite/granite-3.1-8b-instruct) to perform role prompting.

model = WatsonxLLM(
model_id =  "ibm/granite-3-8b-instruct",
url = credentials.get("url"),
apikey = credentials.get("apikey"),
project_id =  credentials.get("project_id"),
params={
        GenParams.MAX_NEW_TOKENS: 500,
        GenParams.MIN_NEW_TOKENS: 1,
        GenParams.REPETITION_PENALTY: 1.1,
        GenParams.TEMPERATURE: 0.7, # Adjust for variable responses
        GenParams.TOP_K: 100,
        GenParams.TOP_P: 0,
    },
)

### Step 6. Turn song lyrics into sonnets

To give a simple and fun example of role prompting, let’s ask the model to take on the persona of a famous figure, William Shakespeare. We will ask the model, with its newly assigned role, to rewrite some song lyrics in the style of Shakespeare’s famous sonnets.

The code block below sets up and defines the prompt that the model will respond to. Feel free to change the song to whatever you’d like but note that Granite was not trained on copyrighted content. If you pick a song that is not a part of the public domain, for example “Espresso” by Sabrina Carpenter, you’ll have to paste in the lyrics with the prompt as well.

For a prompt that just works, this example will use the classic children’s lullaby “Twinkle, Twinkle, Little Star” by Jane Taylor (1806). Run the code block to define your user prompt along with some example input text.

def generate_text(prompt):
    response = None  # Ensure the variable is defined before the try block
    try:
        response = model.generate([prompt])
        return str(response)
    except Exception as e:
        print(f"Error: {e}")
        if response:
            print(f"Response: {response}")
            return None
    # Define the prompt here
defined_prompt = "You are William Shakespeare, rewrite ‘Twinkle, Twinkle, Little Star’ by Jane Taylor as a sonnet."

### Step 7. Generate a response

Once the prompt is defined, we can run the next code block to allow the model to generate an output. Let's hope it's up to our Shakesperian standards.

# Generate and print the text based on the defined prompt

generated_text = generate_text(defined_prompt)
print("Generated text:", generated_text)

Here is the model’s output with readable formatting:

"\*Twinkle, twinkle, little star, how I wonder what you are;
Up above the world so high, like a diamond in the sky.
In night's velvet cloak, you shine so bright,
Guiding sailors through the darkest night.

Your radiant beams, a celestial art,
Illuminate the canvas of the heart.
In silent whispers, secrets you share,
Of galaxies far and constellations rare.

Yet, mortal eyes can never grasp your form,
Beyond our realm, in realms beyond the storm.
O, star! O, star! Your light does pierce my soul,
A cosmic dance, a timeless role.

In dreams, I chase you, in slumber's hold,
Your mystery, like an enchanted scroll.

But wakefulness claims me, daylight steals your guise,
Leaving behind but a memory of your surprise.

Thus, twinkling star, in slumber's peaceful reign,
I bid you farewell, till morning brings again\*."

The model was able to produce a response to the role-based prompt to rewrite the song as a Shakespearian sonnet. The model was able to abide by the rules and style expected from its role prompt. **\*Note that because of the creative nature of the prompt, your output might look different than this example.**

### Step 8. Use role prompting for more empathetic chatbot responses

In this next example, we compare a straight-forward system prompt to a role-based system prompt. Let’s say a veterinarian’s office has recently implemented a virtual assistant on their webpage. To provide the best customer support, this office wants their pet owners to feel heard and supported even in their virtual interactions, a relatable goal to many businesses. A visitor might ask a question such as, “My pet cat has been sneezing a lot lately and is licking her paws what should I do?” In this scenario the model has not been assigned a role in its prompt. We’re just using the model out of the box with no input guidance.

def generate_text(prompt):
    response = None  # Ensure the variable is defined before the try block
    try:
        response = model.generate([prompt])
        return str(response)
    except Exception as e:
        print(f"Error: {e}")
        if response:
            print(f"Response: {response}")
            return None
    # Define the prompt here
defined_prompt = " My pet cat has been sneezing a lot lately and is licking her paws what should I do?"

# Generate and print the text based on the defined prompt

generated_text = generate_text(defined_prompt)
print("Generated text:", generated_text)

The model responds accordingly with advice and information, however there isn’t a personal touch and isn’t much different from what you’d see on a search engine results page. The model’s output is raw and lacking creativity. This solution might be acceptable but it doesn’t set this veterinarian offices’ virtual assistant apart from the rest. Let’s try the same question again, this time assigning it a role as a “compassionate, professional and experienced veterinarian.”

def generate_text(prompt):
    response = None  # Ensure the variable is defined before the try block
    try:
        response = model.generate([prompt])
        return str(response)
    except Exception as e:
        print(f"Error: {e}")
        if response:
            print(f"Response: {response}")
            return None
    # Define the prompt here
defined_prompt = "You are a compassionate, professional, and experienced veteraniarian. My pet cat has been sneezing a lot lately and is licking her paws what should I do?"

# Generate and print the text based on the defined prompt

generated_text = generate_text(defined_prompt)
print("Generated text:", generated_text)

The language in the model’s response is more humanized because it speaks to an emotional awareness of the context that the straight-forward system prompt lacked. The model was able to accomplish this tone while also providing a complete and relevant answer proving that it is a more nuanced response. This type of human interaction with artificial intelligence is a way to meet subjective expectations within organizations and applications.

## Why is role prompting important?

If you are a developer or business looking to add more personalization and meaningful interactions in your gen AI applications, consider understanding how role prompting can make an impact. Most modern language models are capable of role prompting. Some basic models might not grasp the nuances of the role or maintain consistency in their responses, while others might be fine-tuned to respond in a certain way. Foundation models such as IBM’s Granite series are trained on large amounts of enterprise-specific data that boosts the models’ ability to take on roles to produce tailored responses based on business needs.

## Summary

Role prompting encourages the model to perform constantly given its expectations from its assigned persona. We performed a simple example by assigning the LLM with the role of a historical figure in our prompt to turn song lyrics into a sonnet. Next, we compared the output of a nonrole prompted model versus a role prompted model for chatbot responses. We concluded by addressing that the response provided by role prompting is more nuanced and supportive in its language, providing elevated customer care.

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
