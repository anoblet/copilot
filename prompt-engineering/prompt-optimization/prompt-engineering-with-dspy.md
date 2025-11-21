# Prompt Engineering with DSPy

**Author:** [Joshua Noble](https://www.ibm.com/think/author/joshua-noble), Data Scientist

[DSPy](https://www.ibm.com/think/topics/dspy) is an open source Python framework for building [large language model](https://www.ibm.com/think/topics/large-language-models) (LLM) applications and fine-tuning their performance through code rather than one-off techniques for prompt optimization. A DSPy program provides a modular way to configure and fine tune LLM applications by optimizing prompts to get accurate outputs. The main advantage of DSPy is that it allows you to do [prompt engineering](https://www.ibm.com/think/topics/prompt-engineering) and tracking through Python code rather than needing to track model performance yourself.

The power of DSPy is that it uses generative AI to generate natural language and then test the results to create the most effective prompts. This allows you to build a self-improving AI system. It supports a wide variety of interfaces to retrieval models and language models. You can run models locally through systems like ollama or huggingface or you can run them using an API if you’re using OpenAI’s ChatGPT or GPT-4. DSPy supports a wide variety of use cases like [chain of thought](https://www.ibm.com/think/topics/chain-of-thoughts) (CoT), retrieval augmented generation (RAG) as well as summarization.

In this tutorial, you’ll walk through the workflow to create a [RAG](https://www.ibm.com/think/topics/retrieval-augmented-generation) question answering application with DSPy on IBM watsonx. You’ll use Llama 3 as the language model and ColBERT as the retrieval model. You’ll have DSPy fine-tune prompts for and help structure several different approaches to question answering to see how to get better answers generated, even with highly complex questions.

## Set up your environment

While you can choose from several tools, this tutorial walks you through how to set up an IBM account to use a Jupyter Notebook.

Log in to [watsonx.ai](https://dataplatform.cloud.ibm.com/registration/stepone?context=wx&apps=all) with your IBM Cloud account.

Create a [watsonx.ai project](https://dataplatform.cloud.ibm.com/registration/stepone?context=wx&apps=all).

You can get your project ID from within your project.

Then click the 'Manage' tab and copy the project ID from the 'Details' section of the 'General' page. You need this ID for this tutorial.

Next, create a Jupyter Notebook in the environment of your choosing. You'll copy the code from this tutorial into the new notebook. Alternatively, you can download this notebook from GitHub to your local system and upload it to your watsonx.ai project as an asset.

## Set up a Watson Machine Learning (WML) service instance and API key

Create a [watsonx.ai Runtime](https://www.ibm.com/docs/en/watsonx/saas?topic=cloud-watsonxai-runtime-plans) service instance (select your appropriate region and choose the [Lite plan](https://www.ibm.com/docs/en/watsonx/saas?topic=runtime-watsonxai-plans), which is a free instance).

Generate an [API Key in watsonx.ai Runtime](https://www.ibm.com/docs/en/watsonxdata/standard/2.0.x?topic=started-generating-api-keys).

Associate the watsonx.ai Runtime service to the project that you created in [watsonx.ai](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/assoc-services.html).

## Install the DSPy library and set up your credentials

To use DSPy, you perform a simple pip installation. You’ll also install dotenv to manage your environment variables:

```python
!pip install dspy-ai python-dotenv;
```

Next, you’ll import the libraries that are needed for the rest of this tutorial:

```python
import dspy
from dspy import LM
from dspy.datasets import HotPotQA
from dspy.teleprompt import BootstrapFewShot
import json
import os

from dotenv import load_dotenv
load_dotenv(os.getcwd()+'/.env', override=True)
```

To set your credentials, you need the WATSONX_APIKEY and PROJECT_ID you generated in Step 1. You can either store them in an .env file in your directory or replace the placeholder text. You also set the URL serving as the API endpoint.

```python
os.environ['WX_URL'] = "https://us-south.ml.cloud.ibm.com"
os.environ['WX_APIKEY'] = os.getenv("WATSONX_APIKEY", "")

WATSONX_APIKEY= os.getenv("WATSONX_APIKEY", "")
PROJECT_ID = os.getenv("PROJECT_ID","")
```

## Using watsonx with DSPy

Now, you’ll configure DSPy to work with watsonx models with the DSPy LM class. This class allows you to call the watsonx APIs to both generate new prompts and to generate reponses to those prompts that you can test. Underneath DSPy uses another library that is called [LiteLLM](https://docs.litellm.ai/docs/providers/watsonx) to access the watsonx services. LiteLLM provides a simple wrapper to call a very wide range of LLM APIs by using the OpenAI format include Hugging face, Azure and watsonx.

Before you can access your watsonx account, you need to store a token from the watsonx service with your API key that you generated in the first step. Call the os library to access “https://iam.cloud.ibm.com/identity/token” and retrieve your token and store it for use later.

```python
token = os.popen('curl -k -X POST \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "Accept: application/json" \
    --data-urlencode "grant_type=urn:ibm:params:oauth:grant-type:apikey" \
    --data-urlencode "apikey=' + WATSONX_APIKEY + '" \
    "https://iam.cloud.ibm.com/identity/token"').read()
```

Now you can create a LanguageModel instance that uses watsonx . Use the token that you retrieved earlier as the API key and we’ll use the ‘llama-3-8b-instruct’ model from Meta as your language model. You pass the path to that model to DSPy to use as your language model along with the temperature that you want the language model to use. More information on configuring LiteLLM to use watsonx is available in their [GitHub docs](https://docs.litellm.ai/docs/providers/watsonx). In this case 0.7 gives you some creativity without excess hallucination.

```python
lm = dspy.LM('watsonx/meta-llama/llama-3-8b-instruct', api_key=WATSONX_APIKEY, api_base="https://us-south.ml.cloud.ibm.com")

dspy.configure(lm=lm, trace=[], temperature=0.7, experimental=True)
```

## Adding a retrieval model

Now, you load the retrieval model for the R of your RAG. Use ColBERTv2 to load the extracts from the Wikipedia 2017 dataset. ColBERT is a fast and accurate retrieval model, enabling scalable BERT-based search over large text collections in tens of milliseconds. ColBERT is simply one of the many options that can be used to retrieve information from a vector database. It’s comparable to other vector databases like [Qdrant](https://qdrant.tech/), [Milvus](https://milvus.io/), [Pinecone](https://www.pinecone.io/learn/retrieval-augmented-generation/), [Chroma](https://www.trychroma.com/), or [Weaviate](https://weaviate.io/).

Vector databases will have a specific set of information that the language model can quickly access. In this case, you’re going to use a set of abstracts from Wikipedia 2017 to provide a wide range of facts for your language model to use in generation. This combination of ColBERT and the Wiki 17 dataset is also especially useful because a version of this is hosted for free by the DSPy team for use by anyone. It provides access to a wide range of information without requiring you to ingest data or set up your own vector database system. One downside this dataset presents is it doesn’t contain anything about events post 2017, but for the purposes of demonstration it’s very useful.

If you’re interested in running your own version of ColBERT with your own data or an updated dataset, the tutorials [here](https://github.com/stanford-futuredata/ColBERT) are helpful.

After that, load the [HotPotQA](https://hotpotqa.github.io/) dataset and split it into train and test sets which you can use to test your retrieval chain. HotpotQA is a question answering dataset that contains natural, multi-hop questions, with strong supervision for supporting facts to enable more explainable question answering systems.

```python
colbertv2_wiki17_abstracts = dspy.ColBERTv2(url='http://20.102.90.50:2017/wiki17_abstracts')
dspy.configure(rm=colbertv2_wiki17_abstracts)
```

## Testing basic QA

Now you’ll create a signature that will be used for your initial example. A Signature is a class that defines the input and output types of a module, which ensures compatibility between different modules in a DSPy program. A signature combines multiple tasks like ingesting a question and outputting an answer and the models reasoning. The signature you’ll use here only takes in a question and provides a response:

```python
class BasicQA(dspy.Signature):
    """Answer questions with short factoid answers."""

    question = dspy.InputField()
    answer = dspy.OutputField(desc="often between 1 and 5 words")
```

You now have a predictor that you can test simply by calling thePredict method of DSPy. This method takes the newBasicQA class you defined earlier and uses that class when you pass a question to DSPy.

```python
# Define the predictor.
generate_answer = dspy.Predict(BasicQA)
```

Now you’ll create a question that requires multiple pieces of information to answer correctly and test it with an architecture that uses a langauge model only. You’ll use thegenerate_answer function that you just created in order to answer the question.

```python
# Call the predictor on a particular input.
test_question = "What country was the winner of the Nobel Prize in Literature in 2006 from and what was their name?"

pred = generate_answer(question=test_question)

if pred == None:
    print(" no answer ")
else:
    # Print the input and the prediction.
    print(f"Answer: Turkey, Orhan Pamuk")
    print(f"Predicted Answer: {pred.answer}")
```

The code returns the following (your answer may be different):

```
Answer: Turkey, Orhan Pamuk
Predicted Answer: The winner was France and the author was Orhan Pamuk.
```

Orhan Pamuk was the winner of the 2006 Nobel Prize in Literature but he’s not from France and the framing of the answer isn’t right. You’ll now augment the model with retrieval using Retrieval Augmented Generation and have DSPy engineer better prompts to improve performance.

## Retrieval augmented generation (RAG)

Retrieval-augmented generation (RAG) is an architecture that optimizes the output of a large language model using references from an authoritative knowledge base. This augments the training data with verified sources before the language model generates a response. LLMs are trained on large corpuses and use billions of parameters to generate output, but they may not be able to access up to date or accurate information from their training corpuses. RAG extends the already powerful capabilities of LLMs to a specific domain without requiring that the model be retrained. It’s a powerful and potentially cost-effective way to improve the outputs of LLMs so they remain relevant, accurate and useful in various contexts.

In DSPy, you use a RAG architecture by adding a context step in the Signature. This step gathers context from the retrieval model and adds it into the prompt to the language model to hopefully prompt a better response.

```python
class GenerateAnswer(dspy.Signature):
    """Answer questions with short factoid answers."""

    context = dspy.InputField(desc="may contain relevant facts")
    question = dspy.InputField()
    answer = dspy.OutputField(desc="often between 1 and 5 words")
```

That newGenerateAnswer signature can be used with your RAG model. You pass theGenerateAnswer to the `ChainOfThought` module so that the context retrieved and the question and answer use a Chain of Thought approach.

You also update theforward method in order to generate context passages from the RAG and use those contextual passages to generate answers. DSPy will call this `forward` method each time it generates a new answer in response to a question, gathering both context from the ColBERT Wiki 17 abstracts dataset and then passing that context to the language model, in this case, Llama 3.1. As each answer is generated, DSPy will compare the output to the desired output to ensure that the prompts are helping the model generate the correct responses.

```python
class RAG(dspy.Module):
    def __init__(self, num_passages=3):
        super().__init__()

        self.retrieve = dspy.Retrieve(k=num_passages)
        self.generate_answer = dspy.ChainOfThought(GenerateAnswer)

    def forward(self, question):
        context = self.retrieve(question).passages
        prediction = self.generate_answer(context=context, question=question)
        return dspy.Prediction(context=context, answer=prediction.answer)
```

In order to help DSPy engineer the best prompts for us, you need a test dataset that it can use to test prompts and then evaluate them.

To give DSPy test questions, you’ll load the HotPotQA dataset. HotpotQA is a question answering dataset featuring natural multi-hop questions that require multiple retrievals and inferences in order to arrive at the correct answer. It’s a great tool for testing how well models generate supporting facts to train and test more explainable question answering systems.

For instance, one question from the dataset is: “Who did President Franklin Roosevelt appoint that was responsible to transmit votes of the Electoral College to Congress?” You can see that this question requires several pieces of information to answer correctly.

The answer is: “Robert Digges Wimberly Connor”.

The supporting context comes from Wikipedia pages about Robert Digges Wimberly Connor and about the National Archives and Records Administration.

HotPotQA is collected and published by a team of NLP researchers at Carnegie Mellon University, Stanford University and Universite de Montreal. More information about HotPotQA is available at their [GitHub site](https://hotpotqa.github.io/).

After you load the dataset, split it into train and test sets. This enables you to test the retrieval chain and help DSPy locate the best prompts for the language model.

```python
# Load the dataset.
dataset = HotPotQA(train_seed=1, train_size=20, eval_seed=2023, dev_size=50, test_size=0)

# Tell DSPy that the ‘question’ field is the input. Any other fields are labels and/or metadata.
trainset = [x.with_inputs('question') for x in dataset.train]
devset = [x.with_inputs('question') for x in dataset.dev]
```

Next, you’ll bootstrap more examples in order to give DSPy more opportunities to generate prompts and evaluate them. Callingcompile is what uses all the architecture that you’ve configured as well as the HotPotQA dataset to generate and test prompts and get the best performance from your language model.

```python
from dspy.teleprompt import BootstrapFewShot

# Validation logic: check that the predicted answer is correct.
# Also check that the retrieved context does actually contain that answer.
def validate_context_and_answer(example, pred, trace=None):
    answer_EM = dspy.evaluate.answer_exact_match(example, pred)
    answer_PM = dspy.evaluate.answer_passage_match(example, pred)
    return answer_EM and answer_PM

# Set up a basic DSPy optimizer, which will compile your RAG program.
bfs_optimizer = BootstrapFewShot(metric=validate_context_and_answer)

# Compile!
compiled_rag = bfs_optimizer.compile(RAG(), trainset=trainset)
```

Now that DSPy has done prompt engineering for you, you’ll test it with the custom question about the 2006 Nobel Prize that you used before. Because the retrieval model is using Wikipedia extracts from 2017, it will perform the best with knowledge that might be present in that corpus:

```python
# Get the prediction. This contains `pred.context` and `pred.answer`.
pred = compiled_rag(test_question)

# Print the contexts and the answer.
print(f"Question: {test_question}")
print(f"Predicted Answer: {pred.answer}")
```

Now you get back the correct answer.

```
    Question: What country was the winner of the Nobel Prize in Literature in 2006 from and what was their name?
    Predicted Answer: Turkey, Orhan Pamuk
```

Orhan Pamuk is from Turkey so this answer is correct. The compiled version of DSPy not only got the answer correct but also framed it correctly, replying with a short and clear response. Let’s see the context for this predicted response to see how the model arrived at the correct answer:

```python
pred.context
```

This returns:

```
    ["Orhan Pamuk | Ferit Orhan Pamuk (generally known simply as Orhan Pamuk; born 7 June 1952) is a Turkish novelist, screenwriter, academic and recipient of the 2006 Nobel Prize in Literature. One of Turkey's most prominent novelists, his work has sold over thirteen million books in sixty-three languages, making him the country's best-selling writer.",
     '2006 Palanca Awards | The Carlos Palanca Memorial Awards for Literature winners in the year 2006 (rank, title of winning entry, name of author).',
     "Miguel Donoso Pareja | Miguel Donoso Pareja (July 13, 1931 – March 16, 2015) was an Ecuadorian writer and 2006 Premio Eugenio Espejo Award-winner (Ecuador's National Prize in literature, given by the President of Ecuador)."]
```

The answer is in the first chunk of context returned. You can see how DSPy engineered optimal prompts by looking at the history of the language model using theinspect_history() method of the language model.

```python
lm.inspect_history()
```

This history is very long since it includes all of the examples from the compiling process where DSPy tested its generated prompts. The last part of the history shows how the model arrived at the right answer and in the correct format:

```
    [[ ## context ## ]]
    [1] «Orhan Pamuk | Ferit Orhan Pamuk (generally known simply as Orhan Pamuk; born 7 June 1952) is a Turkish novelist, screenwriter, academic and recipient of the 2006 Nobel Prize in Literature. One of Turkey's most prominent novelists, his work has sold over thirteen million books in sixty-three languages, making him the country's best-selling writer.»
    [2] «2006 Palanca Awards | The Carlos Palanca Memorial Awards for Literature winners in the year 2006 (rank, title of winning entry, name of author).»
    [3] «Miguel Donoso Pareja | Miguel Donoso Pareja (July 13, 1931 – March 16, 2015) was an Ecuadorian writer and 2006 Premio Eugenio Espejo Award-winner (Ecuador's National Prize in literature, given by the President of Ecuador).»

    [[ ## question ## ]]
    What country was the winner of the Nobel Prize in Literature in 2006 from and what was their name?

    Respond with the corresponding output fields, starting with the field `[[ ## reasoning ## ]]`, then `[[ ## answer ## ]]`, and then ending with the marker for `[[ ## completed ## ]]`.

    [31mResponse:[0m

    [32m[[ ## reasoning ## ]]
    The text mentions the 2006 Nobel Prize in Literature and states that Orhan Pamuk, a Turkish novelist, was the winner.

    [[ ## answer ## ]]
    Turkey, Orhan Pamuk

    [[ ## completed ## ]][0m

```

You can see that DSPy used the model to generate the prompt:

Respond with the corresponding output fields, starting with the field [[## reasoning ##]]
, then [[## answer ##]]
, and then ending with the marker for [[## completed ##]]
.

This leads to the correct answer and framing.

## Summary

In this tutorial, you used DSPy to help fine tune a RAG agent using the watsonx platform. Your RAG agent consisted of a language model, Llama 3 and a retrieval model, ColBERT. You then used DSPy to do prompt engineering for a question answering task by compiling your model and having an optimized prompt generated.

You can learn more about DSPy at their [GitHub repository](https://github.com/stanfordnlp/dspy) where they host tutorials, demos and their docs.
