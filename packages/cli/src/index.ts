#!/usr/bin/env node
import { Command } from 'commander';
import { execa } from 'execa';
import fs from 'fs/promises';
import path from 'path';

const program = new Command();

program
  .name('copilot-wrapper')
  .description('A wrapper around copilot-cli to run multiple iterations')
  .option('-i, --iterations <number>', 'Number of iterations to run', '3')
  .requiredOption('-p, --prompt <string>', 'Path to the prompt file')
  .option('-a, --agent <string>', 'Agent to use')
  .option('-m, --model <string>', 'Model to use')
  .parse(process.argv);

const options = program.opts();

async function main() {
  const iterations = parseInt(options.iterations, 10);
  if (isNaN(iterations) || iterations < 1) {
    console.error('Error: Iterations must be a positive number.');
    process.exit(1);
  }

  const promptFile = path.resolve(process.cwd(), options.prompt);

  // CLI flags override environment variables
  // Priority: CLI Argument > Environment Variable
  const agent = options.agent || process.env.COPILOT_CLI_AGENT;
  const model = options.model || process.env.COPILOT_CLI_MODEL;

  let promptContent: string;
  try {
    promptContent = await fs.readFile(promptFile, 'utf-8');
  } catch (error) {
    console.error(`Error reading prompt file: ${promptFile}`);
    process.exit(1);
  }

  console.log(`Running copilot wrapper with ${iterations} iterations...`);
  console.log(`Prompt file: ${promptFile}`);
  if (agent) console.log(`Agent: ${agent}`);
  if (model) console.log(`Model: ${model}`);

  for (let i = 0; i < iterations; i++) {
    console.log(`\n--- Iteration ${i + 1}/${iterations} ---`);

    const args = ['--add-dir', '.', '--allow-all-tools'];

    if (agent) {
      args.push('--agent', agent);
    }

    if (model) {
      args.push('--model', model);
    }

    // Pass the prompt content
    args.push('-p', promptContent);

    try {
      // We use stdio: 'inherit' to let the user see the output in real-time
      await execa('copilot', args, { stdio: 'inherit' });
    } catch (error: any) {
      console.error(`Error in iteration ${i + 1}:`);
      if (error.exitCode) {
        console.error(`Exit code: ${error.exitCode}`);
      } else {
        console.error(error);
      }
      process.exit(1);
    }
  }
  console.log('\nAll iterations completed successfully.');
}

main();
