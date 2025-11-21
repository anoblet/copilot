# Prompt tune a Granite model in Python using watsonx

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

[Anna Gutowska](https://www.ibm.com/think/author/anna-gutowska)

AI Engineer, Developer Advocate

IBM

## What is prompt tuning?

In this tutorial, we will prompt tune an [IBM® Granite™ Model](https://www.ibm.com/granite) using a synthetic dataset containing customer reviews of a dog grooming business.

Prompt tuning is an efficient, low-cost way of adapting an [artificial intelligence (AI)](https://www.ibm.com/think/topics/artificial-intelligence) foundation model to new downstream tasks without retraining the entire model and updating its weights.

## Overview of LLM optimization

[Foundation models](https://research.ibm.com/blog/what-are-foundation-models) are built on large [language models (LLMs)](https://www.ibm.com/think/topics/large-language-models) and receive large amounts of training data. Common use cases of foundation models are [chatbots](https://www.ibm.com/think/topics/chatbots) and virtual assistants.

There are several ways of improving a foundation model's interpretation of input and its quality of responses. To better understand these nuances, let's compare some of the methods.

- [**Prompt engineering**](https://www.ibm.com/think/topics/prompt-engineering) is the optimization of a pretrained model's responses by providing a well-designed prompt. No new data is introduced using this technique and the model remains as-is. Using this method, the model receives an input prompt and an engineered prompt in front of it. For instance, you can use the prompt: "Translate English to Spanish," with the input: "good morning." This method requires more work from the user. However, this manual human effort to formulate effective prompts helps [generative AI](https://www.ibm.com/think/topics/generative-ai) models produce task-specific responses without retraining the entire foundation model.
- [**Fine-tuning**](https://www.ibm.com/think/topics/fine-tuning) large language models involves tuning the same model by providing large numbers of labeled datasets. Fine-tuning alters the model weights and becomes difficult to manage as tasks become diversified. This requires a significant amount of computational resources. In turn, this method tends to have the best accuracy since the model can be trained for very specific use cases.
- Unlike fine-tuning, [**prompt tuning**](https://research.ibm.com/blog/what-is-ai-prompt-tuning) does not alter the pretrained model weights. Instead, this technique is parameter-efficient by adjusting prompt parameters to guide the model’s responses in the preferred direction. The model is provided with an input and tunable soft prompts generated by the AI itself. This task-specific context guides the massive model to tailor its responses to a narrow task even with limited data.
- Similarly to prompt tuning, [**prefix-tuning**](https://arxiv.org/pdf/2101.00190)involves the model receiving several examples of preferred output. The difference here is that a prefix, a series of task-specific vectors, is also included. Prefix-tuning involves both soft prompts and prompts injected into layers of the deep learning model. These so-called "virtual tokens" allow the tuned model the flexibility to support a variety of new tasks at once. This method achieves similar performance to fine-tuning all layers and only trains about 0.1% of the parameters. Prefix-tuning even outperforms fine-tuning in low-data settings.

## Soft prompts versus hard prompts

Hard prompts are user-facing and require user action. A hard prompt can be thought of as a template or instructions for the LLM to generate responses. An example of a hard prompt is introduced next. We encourage you to check out the [IBM Documentation page](https://ibm.github.io/watson-machine-learning-sdk/tune_experiment.html) for more information on this prompt type and several others.

###For demonstration purposes only. It is not necessary to run this code block.
hard_prompt_template = """Generate a summary of the context that answers the question. Explain the answer in multiple steps if possible.
Answer style should match the context. Ideal Answer length is 2-3 sentences.\n\n{context}\nQuestion: {question}\nAnswer:
"""

Using this hard prompt template, an LLM can be provided with specific instructions on the preferred output structure and style. Through this explicit prompt, the LLM would be more likely to produce desirable responses of higher quality.

Soft prompts, unlike hard prompts, are not written in natural language. Instead, prompts are initialized as AI-generated, numerical vectors appended to the start of each input [embedding](https://www.ibm.com/think/topics/embedding) that distills knowledge from the larger model. This lack of interpretability extends to the AI that chooses prompts optimized for a given task. Often, the AI is unable to explain why it chose those embeddings. In comparison to other prompting methods, these virtual tokens are less computationally expensive than fine-tuning since the model itself remains frozen with fixed weights. Soft prompts also tend to outperform human-engineered hard prompts.

We will be working with soft prompts for prompt tuning in this tutorial.

## Prerequisites

You need an [IBM Cloud® account](https://cloud.ibm.com/registration?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&cm_sp=ibmdev-_-developer-_-trial) to create a [watsonx.ai™](https://www.ibm.com/products/watsonx-ai?utm_source=ibm_developer&utm_content=in_content_link&utm_id=tutorials_awb-create-langchain-rag-system-python-watsonx&cm_sp=ibmdev-_-developer-_-product) project.

## Steps

### Step 1. Set up your environment

While you can choose from several tools, this tutorial walks you through how to set up an IBM account to use a Jupyter Notebook.

1. Log in to [watsonx.ai](https://dataplatform.cloud.ibm.com/registration/stepone) using your IBM Cloud account.
2. Create a [watsonx.ai project](https://www.ibm.com/docs/en/watsonx/saas?topic=projects-creating-project).

   You can get your project ID from within your project. Click the Manage tab. Then, copy the project ID from the Details section of the General page. You need this ID for this tutorial.

3. Create a [Jupyter Notebook](https://www.ibm.com/docs/en/watsonx/saas?topic=editor-creating-managing-notebooks).

   This step will open a Notebook environment where you can copy the code from this tutorial to implement prompt tuning on your own. Alternatively, you can download this notebook to your local system and upload it to your watsonx.ai project as an asset. This Jupyter Notebook along with the datasets used can be found on [GitHub.](https://github.com/IBM/ibmdotcom-tutorials)

### Step 2. Set up a watsonx.ai Runtime instance and API key

1. Create a [watsonx.ai Runtime](https://cloud.ibm.com/catalog/services/watsonxai-runtime) service instance (select your appropriate region and choose the Lite plan, which is a free instance).
2. Generate an [API Key](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-authentication.html).
3. Associate the watsonx.ai Runtime service instance to the project that you created in [watsonx.ai](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/assoc-services.html).

### Step 3. Install and import relevant libraries and set up your credentials

We'll need a few libraries and modules for this tutorial. Make sure to import the following ones; if they're not installed, you can resolve this with a quick pip install.

#installations
%pip install ibm-watsonx-ai | tail -n 1
%pip install pandas | tail -n 1
%pip install wget | tail -n 1
%pip install scikit-learn | tail -n 1
%pip install matplotlib | tail -n 1 #imports
import wget
import pandas as pd

from ibm_watsonx_ai import APIClient
from ibm_watsonx_ai.foundation_models.utils.enums import ModelTypes
from ibm_watsonx_ai.experiment import TuneExperiment
from ibm_watsonx_ai.helpers import DataConnection
from ibm_watsonx_ai.foundation_models import ModelInference
from sklearn.metrics import accuracy_score, f1_score
from datetime import datetime

Set up your credentials. Input your API key and project ID.

credentials = {
    "url": "https://us-south.ml.cloud.ibm.com",
    "apikey": "YOUR_API_KEY_HERE"
}

project_id = "YOUR_PROJECT_ID_HERE"

### Step 4. Establish environment and import dataset

As the first step in establishing the environment, create an instance of APIClient with your authentication details and set your project_id .

client = APIClient(credentials)
client.set.default_project(project_id)

**Output**:

'SUCCESS'

For this tutorial, we will be using a synthetic dataset consisting of dog grooming business reviews. Using the appropriate URL, we can connect the dataset to the API client.

You are free to use any dataset of your choice. Several [open-source](https://www.ibm.com/think/topics/open-source) datasets are available on platforms such as HuggingFace.

train_filename = 'dog_grooming_reviews_train_data.json'

url = "https://raw.githubusercontent.com/AnnaGutowska/think/main/tutorials/prompt-tuning-tutorial/" + train_filename
wget.download(url)

asset_details = client.data_assets.create(name=train_filename, file_path=train_filename)
asset_id = client.data_assets.get_id(asset_details)

**Output**:

Creating data asset...

SUCCESS

print(asset_id)

**Output**:

3b1db894-8d9e-428d-8fee-d96f328c7726

To gain some insight into the formatting of these customer reviews, let's load the data into a Pandas dataframe and print a few rows that show both positive and negative reviews. An output of "1" denotes positive reviews and "0" is used for negative reviews.

pd.set_option('display.max_colwidth', None)
df = pd.read_json(train_filename)
df[5:10]

**Output**:

### Step 5. Tune the model.

The [TuneExperiment](https://ibm.github.io/watson-machine-learning-sdk/tune_experiment.html) class is used to create experiments and schedule tunings. Let's use it to initialize our experiment and set our base foundation model, training data and parameters. The goal of this prompt tuning exercise is for the LLM to tailor its responses in accordance with the extracted customer satisfaction ratings from our dataset. This is a classification task since the reviews can be classified as either positive ("1") or negative ("0").

For this tutorial, we suggest using an [IBM Granite Model](https://www.ibm.com/granite) as the large language model to achieve similar results.

experiment = TuneExperiment(credentials,
    project_id=project_id
)

prompt_tuner = experiment.prompt_tuner(name="prompt tuning tutorial",
    task_id=experiment.Tasks.CLASSIFICATION,
    base_model="ibm/granite-3-8b-instruct",
    accumulate_steps=16,
    batch_size=8,
    learning_rate=0.001,
    max_input_tokens=128,
    max_output_tokens=2,
    num_epochs=12,
    tuning_type=experiment.PromptTuningTypes.PT,
    init_text="Extract the satisfaction from the comment. Return simple '1' for satisfied customer or '0' for unsatisfied. Comment:",
    init_method="text",
    verbalizer="classify {0, 1} {{input}}",
    auto_update_model=True
)

Now that we have our tuning experiment set up, we need to connect it to our dataset. For this, let's use the [DataConnection](https://ibm.github.io/watsonx-ai-python-sdk/dataconnection_modules.html) class. This requires the asset_id  we produced earlier upon initiating the data asset with our API client.

data_conn = DataConnection(data_asset_id=asset_id)

You are free to use an AI model of your choice. The foundation models available to tune through watsonx can be found [here](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-tuning-model-choose.html?context=wx&audience=wdp) or by running the following command.

client.foundation_models.PromptTunableModels.show()

**Output**:

{'FLAN_T5_XL': 'google/flan-t5-xl', 'GRANITE_13B_INSTRUCT_V2': 'ibm/granite-13b-instruct-v2', 'LLAMA_2_13B_CHAT': 'meta-llama/llama-2-13b-chat'}

tuning_details = prompt_tuner.run(
    training_data_references=[data\_conn],
    background_mode=False)

**Output**:

##############################################

Running '20671f17-ff53-470b-9bfe-04318ecb91d9'

##############################################

pending......
running....................................................................................................................................
completed
Training of '20671f17-ff53-470b-9bfe-04318ecb91d9' finished successfully.

### Step 6. Evaluate tuning results.

To ensure our prompt tuning has concluded, we can check the status. If the status that prints is anything other than "completed," please wait for the tuning to finish before continuing.

status = prompt_tuner.get_run_status()
print(status)

**Output**:

completed

We can now retrieve the prompt tuning summary. In this summary, you will see a loss value. For each training run, the loss function measures the difference between the predicted and actual results. Hence, a lower loss value is preferred.

prompt_tuner.summary()

We can also plot the learning curve of our model tuning using the plot_learning_curve() function. A downward-sloping curve that levels off close to zero indicates that the model is improving its expected output generation. To learn more about interpreting loss function graphs, see the relevant [IBM watsonx documentation](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-tuning-methodology.html?context=wx&audience=wdp).

prompt_tuner.plot_learning_curve()

**Output**:

### Step 7. Deploy the tuned model.

This step of deploying the tuned model is critical for completing the next step of comparing the performance of the tuned model to the pretuned model.

Note: The SERVING_NAME is set to the current date and time since it must be a unique value.

model_id = prompt_tuner.get_model_id()

meta_props = {
    client.deployments.ConfigurationMetaNames.NAME: "PROMP TUNE DEPLOYMENT",
    client.deployments.ConfigurationMetaNames.ONLINE: {},
    client.deployments.ConfigurationMetaNames.SERVING_NAME : datetime.now().strftime('%Y\_%m\_%d\_%H%M%S')
}

deployment_details = client.deployments.create(model_id, meta_props)

**Output**:

######################################################################################

Synchronous deployment creation for id: '6aa5dd5c-0cc4-44e0-9730-18303e88e14a' started

######################################################################################

initializing.......................
ready

---

## Successfully finished deployment creation, deployment_id='24a97b84-47d0-4490-9f5f-21ed2376fdd6'

### Step 8. Test the tuned model.

Now, let's test the performance of both the tuned model and the original foundation model to see the impacts of our tuning process. First, let's load the testing dataset. This dataset should be a subset of data that was not present during tuning. Often, the test set is also smaller than the training set. Additionally, each input in the test dataset has the prompt as the prefix to the user's comment.

test_filename = 'dog_grooming_reviews_test_data.json'
url = "https://raw.githubusercontent.com/AnnaGutowska/think/main/tutorials/prompt-tuning-tutorial/" + test_filename
wget.download(url)
data = pd.read_json(test_filename)

Let's display a small portion of the dataset to better understand its structure.

data.head()

**Output**:

Upon loading the test dataset, let's extract the inputs and outputs.

prompts = list(data.input)
satisfaction = list(data.output)
prompts_batch = ["\n".join([prompt]) for prompt in prompts]

We can also print a sample test input and output to better understand how we have extracted the dataset's content.

prompts[0]

**Output**:

'Extract the satisfaction from the comment. Return simple 1 for satisfied customer or 0 for unsatisfied.\nComment: Long wait times.\nSatisfaction:\n'

In this example, the prompt is introduced, followed by the customer's review about long wait times and finally, the satisfaction is 0 to signify a negative review.

satisfaction[0]

**Output**:

0

Now that we have the test dataset, let's test the accuracy and F1 score of our tuned model. The F1 score is the mean of the model's precision and recall. We will need the deployment_id to do this. Note, the concurrency_limit is set to 2 to avoid hitting the API's rate limit. This is the number of requests that will be sent in parallel.

deployment_id = deployment_details['metadata']['id']

tuned_model = ModelInference(
    deployment_id=deployment_id,
    api_client=client
)

tuned_model_results = tuned_model.generate_text(prompt=prompts_batch, concurrency_limit=2)
print(f'accuracy_score: {accuracy_score(satisfaction, [int(float(x)) for x in tuned\_model\_results])}, f1_score: {f1_score(satisfaction, [int(float(x)) for x in tuned\_model\_results])}')

**Output**:

accuracy_score: 0.9827586206896551, f1_score: 0.9827586206896551

Given our model's high accuracy and F1 score, let's test the performance of the same Granite model without any tuning.

base_model = ModelInference(
    model_id="ibm/granite-3-8b-instruct",
    api_client=client
)

base_model_results = base_model.generate_text(prompt=prompts_batch, concurrency_limit=2)

print(f'base model accuracy_score: {accuracy_score(satisfaction, [int(x) for x in base\_model\_results])}, base model f1_score: {f1_score(satisfaction, [int(x) for x in base\_model\_results])}')

**Output**:

base model accuracy_score: 0.9310344827586207, base model f1_score: 0.9298245614035088

Our tuned model outperforms the pretuned foundation model. Since the tuned model specializes in extracting satisfaction scores, it can be used for other satisfaction-extraction tasks. Great work!

## Summary

In this tutorial, you performed prompt tuning on an IBM Granite model using the watsonx API. Your tuned and deployed model successfully outperformed the foundation model with about 5% greater accuracy.

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
