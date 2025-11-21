# What is DSPy?

**Author:** [Joshua Noble](https://www.ibm.com/think/author/joshua-noble), Data Scientist

### What is DSPy?

[Large language models](https://www.ibm.com/think/topics/large-language-models) (LLMs), [agentic workflows](https://www.ibm.com/think/topics/agentic-workflows) and [vector stores](https://www.ibm.com/think/topics/retrieval-augmented-generation) have become steadily more powerful and frameworks to streamline the development of AI applications have grown in popularity. DSPy is a toolkit that provides general-purpose modules that replace [prompt engineering](https://www.ibm.com/think/topics/prompt-engineering) and direct input of natural language with configuration using Python code.

Generally, working with LLMs or [foundation models](https://www.ibm.com/think/topics/foundation-models) requires careful [prompt engineering](https://www.ibm.com/think/topics/prompt-engineering), where the user tweaks text prompts to get the right output. While this approach can be effective, it’s time-consuming and error-prone and creates fragile toolchains that need to be updated when new versions of a model are released. Popular frameworks like [LangChain](https://www.ibm.com/think/topics/langchain) chain language models for application building and [LlamaIndex](https://www.ibm.com/think/topics/llamaindex) focuses on improving search capabilities within texts. With these developers still need expertise in [fine-tuning](https://www.ibm.com/think/topics/fine-tuning) prompts and time to test each prompt to get the desired output. DSPy simplifies this prompt tuning process with a programmatic approach to guiding and bounding language model behavior.

DSPy focuses on automating the optimization of prompt construction. To replace prompt hacking and one-off synthetic data generators, DSPy provides general **optimizers**, which are algorithms that update parameters in your program. Whenever you modify your code, data, assertions or metrics, you can compile your program again and DSPy will do the prompt optimization to create new effective prompts that fit your changes.

Sometimes people imagine that automatic prompt optimization means creating a system where LLMs critique and improve user generated prompts. This isn’t the most effective way to use LLMs. DSPy harnesses the idea generation power of LLMs to generate their own prompts. Then, it tests those variations using an evaluation metric set to see whether they solve the problem better. If they don’t perform numerically better on a user assigned metric, then the novel prompts are thrown away. It’s similar to an evolutionary algorithm where the prompts are evaluated for their fitness and iteratively improved.

### DSPy use cases

DSPy can be helpful in several different types of workflows and scenarios. Some of the most commonly used ones are retrieval-augmented generation, multihop question answering, and [document summarization](https://www.ibm.com/think/topics/text-summarization).

- [Chain of thought](#cot1)
- [Retrieval-augmented generation](#rag1)
- [Multihop question answering](#mqa1)
- [Summarization](#sum1)

**Chain of thought**

[Chain of thought](https://www.ibm.com/think/topics/chain-of-thoughts) (CoT) prompting simulates human-like reasoning processes by asking the model to decompose complex tasks into a sequence of logical steps toward a final resolution. These reasoning steps are fed into the context window of the model providing it more grounding in the task at hand and often leading to better responses even in complex scenarios. DSPy helps by having the language model generate chain of thought prompts and strategies and testing those with the language model to generate the most effective CoT prompts for the given model.

**Retrieval-augmented generation**

[Retrieval-augmented generation](https://www.ibm.com/architectures/hybrid/genai-rag) (RAG) is an approach that allows LLMs to tap into a large corpus of knowledge from sources and query its knowledge store to find relevant passages or content and produce a well-refined response. RAG ensures LLMs can dynamically use real-time knowledge even if not originally trained on the subject and give correct answers. This additional power leads to greater complexity when setting up RAG pipelines. DSPy offers a seamless approach to setting up prompting pipelines and either generating effective prompts (prompt-tuning) or in the case of smaller models, fine-tuning the model weights themselves.

RAG pipelines can be optimized with DSPy in two ways: using labeled examples or by using bootstrap examples. Labeled examples are simply preexisting, manually labeled examples are used for training the student model directly. Bootstraps in the DSPy context means using a language mode in a teacher and student paradigm. The teacher generates new training examples based on a few user provided prompts. These bootstrapped examples are then used alongside or instead of the manually labeled examples to train the student module until it provides the correct answers. The prompts that generate the correct responses are then iteratively updated throughout the DSPy pipeline.

**Multihop question answering**

Many times, a single search query is not enough for a complex [question-answering](https://www.ibm.com/think/topics/question-answering) task. The popular [HotPot Question Answering](https://hotpotqa.github.io/) dataset consists of questions that require multiple question parsing and retrievals before they can be answered. For instance: “Bill Nelson flew as a Payload Specialist on a space shuttle launched for the first time in what year?” This answer requires knowing that Bill Nelson flew on the Space Shuttle Columbia and then being able to determine that the Columbia first flew in 1981.

The standard approach to this challenge in the retrieval augmented literature is building a multihop search system. These systems read the retrieved results and then generate additional queries to gather additional information when necessary before arriving to a final answer. Using DSPy you can create the same system in a few lines of code in a robust way that allows you to update models and simply re-run your pipeline.

**Summarization**

Summarization condenses a longer piece of text into a shorter version while still retaining the key information and main ideas. It’s a powerful skill for an LLM to do well, with applications ranging from creating article abstracts to generating concise reports from lengthy documents.

Evaluating the quality of summaries produced by language models presents significant challenges. Unlike tasks with clear right or wrong answers, summarization quality is often subjective and context dependent. The model needs to balance information retention with conciseness while preserving the original text’s tone and intent and ensure factual accuracy without introducing errors. Adapting to different types of source material and summary purposes presents an additional challenge. DSPy allows you to use labeled data to tune your summarization prompts to get the best responses possible.

### Concepts in DSPy

DSPy has its own vocabulary and terminology, learning some of those key terms will help shed some light on the general architecture.

- [Compiling](#comp1)
- [Signature](#sign1)
- [Optimizer](#opt1)
- [Pipeline](#pipe1)
- [Metrics](#metr1)

**Compiling**: this process is how DSPy translates a Python-based program into instructions that a language model can understand and execute efficiently.

**Signature**: these are a class that defines the input and output types of a module, ensuring compatibility between different modules in a DSPy program. Some examples of signatures are tasks such as inputting a question and outputting the reasoning and the answer or taking a document as input and outputting a summary.

**Optimizer**: This component of DSPy fine-tunes the compiled program for the specific language model that you’re using, for instance GPT3.5-Turbo or GPT-4.0 or Llama 3.1. Optimizers ensure that you maximize the performance and accuracy of your program. In older versions of DSPy, these were called teleprompters. DSPy programs consist of multiple calls to language models that are stacked together as DSPy modules. Each DSPy module has three kinds of internal parameters: the LM weights, the instructions it’s supposed to follow and stored demonstrations of the input/output behavior.

When given a metric DSPy creates optimized prompts using all weights, instructions and model behavior with multistage optimization algorithms. These can combine gradient descent (for language model weights) and discrete language model-driven optimization, that is, for crafting or updating instructions and for creating or validating demonstrations. DSPy Demonstrations are similar to few-shot examples, but they’re far more powerful. They can be created from scratch, given your program and their creation and selection can be optimized in many effective ways.

In many cases, compiling leads to better prompts than human writing because optimizers can try more things, much more systematically, and tune the metrics directly than a human can.

**Pipeline**: a ‘pipeline’ is is how DSPy refers to a sequence of connected modules that work together to achieve a complex task. For instance, a pipeline might summarize an article, translate it from a source language to a target language and then generate questions about it in a target language.

**Metrics**: DSPy defines several different metrics to measure the performance of the output. For instance, you might need the output to be an exact match for your label. In other cases a partial match might be a good fit for your needs. A commonly used metric provided by DSPy is the Semantic F1. This metric measures how much of the information in the label is contained in the answer and how little extraneous data that isn’t in the labeled target response is present in the answer. If you need a different way to measure performance, you can also provide your own custom metrics as well.

### Using DSPy

Getting started with DSPy is as simple as calling pip install dspy-ai. No special hardware is required as most models can be used in the cloud through an API or run locally. It can be run locally or on hosted notebook environments such as Google Colab or Watson Studio.

- [Building signatures](#buil1)
- [Compiling](#comp2)
- [Evaluation and iteration](#eval1)

A typical DSPy pipeline for retrieval augmented generation consists of a language model and a retrieval model. For instance, to work with OpenAI GPT-3.5 Turbo as the language model and ColBERTV2 retriever as the retrieval model, we would configure DSPy like so:

```python
import dspy
turbo = dspy.OpenAI(model=’gpt-3.5-turbo’)
colbertv2_wiki17_abstracts = dspy.ColBERTv2(url=’http://20.102.90.50:2017/wiki17_abstracts’)
# set the language model and the retrieval model
dspy.settings.configure(lm=turbo, rm=colbertv2_wiki17_abstracts)
```

**Building signatures**

Signatures are templates that allow you to configure how the input and output fields for the language model and the retrieval model can be structured. For instance, this code snippet shows the syntax to prompt the language model with context and the retrieval model with structure:

```python
class GenerateAnswer(dspy.Signature):
    """Answer questions with short factoid answers."""
    context = dspy.InputField(desc=”may contain relevant facts”)
    question = dspy.InputField()
    answer = dspy.OutputField(desc=”often between 1 and 5 words”)
```

We include small descriptions for the context and answer fields to define more robust guidelines on what the model will receive and should generate.

**Compiling**

Once you have your signatures defined, you can run your program and create optimal prompts for your task by using an appropriate optimizer for your task. In DSPy. this process is called compiling. Compiling a program updates the parameters stored in each module. In most scenarios, this is primarily in the form of collecting and selecting good demonstrations for inclusion within the prompt.

Compiling requires:

• A training set or bootstrapped examples.

• A metric for validation. In a RAG scenario, this would be a way to measure how accurate the predicted answer is and that the retrieved context contains the answer.

• A specific optimizer to generate prompts to test against. For instance, the BootstrapFewShot optimizer might be used to generate prompts and then test those generated prompts.

To compile a DSPy program, you configure which models you want to use and pass those to the compile method of the optimizer you’ve selected. For instance, a program for a RAG application would contain a language model and a retrieval model. Those would then be passed to the compile method and the optimizer would use retrieved data to set context for language generation.

You then define a metric to evaluate both the retrieval and language model. That metric definition would then be given to an optimizer such as the BootstrapFewShot or LabeledFewShot optimizer to use as it evaluates the prompts generated by the language model. Finally, the optimizer compiles a custom module containing the forward method that you’ve defined along with a training [dataset](https://www.ibm.com/think/topics/dataset).

Selecting which optimizer to use typically requires experimentation but there are guidelines:

• If you have very few examples (around 10), then you might start with BootstrapFewShot to generate new training data.

• If you have more data, for instance 50 examples or more, try BootstrapFewShotWithRandomSearch to generate new training data on random parts of your training data.

• If you need a very efficient program, you can fine tune a small LLM for your task with BootstrapFinetune.

**Evaluation and iteration**

After you’ve compiled your program and compared your metrics, you might be happy with the results. You may also find that you don’t like something about the final program or the results according to your chosen metric or metrics. Iterative development is key. DSPy provides tools to do that incrementally through iterating on your data, updating your program structure, the metric or metrics that you’ve chosen and which optimizer you’ve chosen.

### Learning More

DSPy is open source so you can inspect the code and see the progress of the development. The docs at the StanfordNLP site at [Github](https://github.com/stanfordnlp/dspy) contain the documentation and multiple step-by-step tutorials and demos for how to get started with DSPy.
