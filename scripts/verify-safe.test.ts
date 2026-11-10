import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { HumanPromptSchema, HumanResponseSchema } from '../packages/mcp/src/shared/humanProtocol.ts';
import { UserInputInputSchema } from '../packages/mcp/src/shared/userInput.ts';
test('MCP rejects invalid prompts/timeouts while permitting empty human responses', () => {
 assert.equal(HumanPromptSchema.safeParse({requestId:'r',prompt:''}).success,false);
 assert.equal(HumanResponseSchema.safeParse({requestId:'r',value:''}).success,true);
 assert.equal(UserInputInputSchema.safeParse({prompt:'Question',timeoutMs:-1}).success,false);
 assert.equal(UserInputInputSchema.safeParse({prompt:'Question',timeoutMs:0}).success,true);
});
test('skill synchronization preview never launches an installer', () => {
 const result=spawnSync(process.execPath,['scripts/sync-skills.ts','--dry-run'],{encoding:'utf8',timeout:10000,env:{...process.env,PATH:''}});
 assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/dry-run/);
 assert.doesNotMatch(result.stdout,/install failed/);
});
