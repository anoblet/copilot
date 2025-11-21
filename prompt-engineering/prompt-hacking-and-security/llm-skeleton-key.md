# When AI chatbots break bad

**Author:** [Sascha Brodsky](https://www.ibm.com/think/author/sascha-brodsky), Staff Writer, IBM

A new challenge has emerged in the rapidly evolving world of artificial intelligence. “AI whisperers” are probing the boundaries of AI ethics by convincing well-behaved chatbots to break their own rules.

Known as [prompt injections](https://www.ibm.com/think/topics/prompt-injection) or “jailbreaks,” these exploits expose vulnerabilities in AI systems and raise concerns about their security. Microsoft recently made waves with its “[Skeleton Key](https://www.microsoft.com/en-us/security/blog/2024/06/26/mitigating-skeleton-key-a-new-type-of-generative-ai-jailbreak-technique/)” technique, a multi-step process designed to circumvent an AI’s ethical guardrails. But this approach isn’t as novel as it might seem.

“Skeleton Key is unique in that it requires multiple interactions with the AI,” explains Chenta Lee, IBM’s Chief Architect of Threat Intelligence. “Previously, most prompt injection attacks aimed to confuse the AI in one try. Skeleton Key takes multiple shots, which can increase the success rate.”

## The art of AI manipulation

The world of AI jailbreaks is diverse and ever-evolving. Some attacks are surprisingly simple, while others involve elaborate scenarios that require the expertise of a sophisticated hacker. What unites them is a common goal: pushing these digital assistants beyond their programmed limits.

These exploits tap into the very nature of language models. AI chatbots are trained to be helpful and to understand context. Jailbreakers create scenarios where the AI believes ignoring its usual ethical guidelines is appropriate.

While multi-step attacks like Skeleton Key grab headlines, Lee argues that single-shot techniques remain a more pressing concern. “It’s easier to use one shot to attack a large language model,” he notes. “Imagine putting a prompt injection in your resume to confuse an AI-powered hiring system. That’s a one-shot attack with no chance for multiple interactions.”

According to cybersecurity experts, the potential consequences are alarming. “Malicious actors could use Skeleton Key to bypass AI safeguards and generate harmful content, spread disinformation or automate [social engineering attacks](https://www.ibm.com/topics/social-engineering) at scale,” warns Stephen Kowski, Field CTO at SlashNext Email Security+.

While many of these attacks remain theoretical, real-world implications are starting to surface. Lee cites an example of researchers convincing a company’s AI-powered virtual agent to offer massive, unauthorized discounts. “You can confuse their virtual agent and get a good discount. That might not be what the company wants,” he says.

In his own research, Lee has developed proofs of concept to show how an LLM can be hypnotized to create vulnerable and malicious code and how live audio conversations can be [intercepted and distorted](https://www.ibm.com/think/insights/using-generative-ai-distort-live-audio-transactions) in near real time.

## Fortifying the digital frontier

Defending against these attacks is an ongoing challenge. Lee outlines two main approaches: improved AI training and building AI firewalls.

“We want to do better training so the model itself will know, ‘Oh, someone is trying to attack me,'” Lee explains. “We’re also going to inspect all the incoming queries to the language model and detect prompt injections.”

As [generative AI](https://www.ibm.com/think/topics/generative-ai) becomes more integrated into our daily lives, understanding these vulnerabilities isn’t just a concern for tech experts. It’s increasingly crucial for anyone interacting with AI systems to be aware of their potential weaknesses.

Lee parallels the early days of SQL injection attacks on databases. “It took the industry 5-10 years to make everyone understand that when writing a SQL query, you need to parameterize all the inputs to be immune to injection attacks,” he says. “For AI, we’re beginning to utilize language models everywhere. People need to understand that you can’t just give simple instructions to an AI because that will make your software vulnerable.”

The discovery of jailbreaking methods like Skeleton Key may dilute public trust in AI, potentially slowing the adoption of beneficial AI technologies. According to Narayana Pappu, CEO of Zendata, transparency and independent verification are essential to rebuild confidence.

“AI developers and organizations can strike a balance between creating powerful, versatile language models and ensuring robust safeguards against misuse,” he said. “They can do that via internal system transparency, understanding AI/data supply chain risks and building evaluation tools into each stage of the development process.”
