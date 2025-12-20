import { execFileSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cliPath = path.resolve(__dirname, "../src/index.ts");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents);
}

function assertSymlink(filePath, expectedTarget) {
  const stat = fs.lstatSync(filePath);
  if (!stat.isSymbolicLink()) {
    throw new Error(`Expected symlink at ${filePath}`);
  }
  const target = fs.readlinkSync(filePath);
  if (target !== expectedTarget) {
    throw new Error(
      `Symlink target mismatch at ${filePath}: expected '${expectedTarget}', got '${target}'`
    );
  }
}

function runLink(configPath, cwd) {
  execFileSync(process.execPath, [cliPath, configPath], {
    cwd,
    stdio: "pipe",
    env: process.env,
  });
}

function runLinkExpectFailure(configPath, cwd, expectedSubstring) {
  try {
    runLink(configPath, cwd);
  } catch (err) {
    const stderr = err?.stderr?.toString?.() ?? "";
    const stdout = err?.stdout?.toString?.() ?? "";
    const combined = `${stdout}\n${stderr}`;

    if (!combined.includes(expectedSubstring)) {
      throw new Error(
        `Expected failure output to include '${expectedSubstring}'. Output was:\n${combined}`
      );
    }
    return;
  }

  throw new Error("Expected link command to fail, but it succeeded.");
}

function createTempWorkspace() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "scad-link-"));
  const srcDir = path.join(root, "src");
  const destDir = path.join(root, "dest");
  ensureDir(srcDir);
  ensureDir(destDir);
  return { root, srcDir, destDir };
}

function cleanupTempWorkspace(root) {
  fs.rmSync(root, { recursive: true, force: true });
}

function testMixedArraySchema() {
  const { root, srcDir, destDir } = createTempWorkspace();

  try {
    writeFile(path.join(srcDir, "documentation.agent.md"), "# doc");
    writeFile(path.join(srcDir, "plan.agent.md"), "# plan");
    writeFile(path.join(srcDir, "extra.md"), "# extra");
    writeFile(path.join(srcDir, "nested.txt"), "nested");
    writeFile(path.join(srcDir, "copilot-instructions.md"), "# instructions");
    writeFile(path.join(srcDir, "mcp.json"), '{"mcp":true}');
    writeFile(path.join(srcDir, "settings.json"), '{"settings":true}');

    const config = {
      ".github": [
        {
          agents: [
            "../../../src/documentation.agent.md",
            { nested: ["../../../../src/nested.txt"] },
            "../../../src/plan.agent.md",
          ],
          extra: ["../../../src/extra.md"],
        },
        "../../src/copilot-instructions.md",
      ],
      ".vscode": ["../../src/mcp.json", "../../src/settings.json"],
    };

    const configPath = path.join(root, "link.json");
    writeFile(configPath, JSON.stringify(config, null, 2));

    runLink(configPath, destDir);

    assertSymlink(
      path.join(destDir, ".github", "copilot-instructions.md"),
      "../../src/copilot-instructions.md"
    );
    assertSymlink(
      path.join(destDir, ".github", "agents", "documentation.agent.md"),
      "../../../src/documentation.agent.md"
    );
    assertSymlink(
      path.join(destDir, ".github", "agents", "plan.agent.md"),
      "../../../src/plan.agent.md"
    );
    assertSymlink(
      path.join(destDir, ".github", "agents", "nested", "nested.txt"),
      "../../../../src/nested.txt"
    );
    assertSymlink(
      path.join(destDir, ".github", "extra", "extra.md"),
      "../../../src/extra.md"
    );

    assertSymlink(
      path.join(destDir, ".vscode", "mcp.json"),
      "../../src/mcp.json"
    );
    assertSymlink(
      path.join(destDir, ".vscode", "settings.json"),
      "../../src/settings.json"
    );
  } finally {
    cleanupTempWorkspace(root);
  }
}

function testLegacyObjectSchema() {
  const { root, srcDir, destDir } = createTempWorkspace();

  try {
    writeFile(path.join(srcDir, "a.txt"), "a");
    writeFile(path.join(srcDir, "b.txt"), "b");

    const config = {
      legacy: {
        sub: ["../../src/a.txt", "../../src/b.txt"],
      },
    };

    const configPath = path.join(root, "link.json");
    writeFile(configPath, JSON.stringify(config, null, 2));

    runLink(configPath, destDir);

    assertSymlink(
      path.join(destDir, "legacy", "sub", "a.txt"),
      "../../src/a.txt"
    );
    assertSymlink(
      path.join(destDir, "legacy", "sub", "b.txt"),
      "../../src/b.txt"
    );
  } finally {
    cleanupTempWorkspace(root);
  }
}

function testInvalidTypesFailFast() {
  const { root, destDir } = createTempWorkspace();

  try {
    const config = {
      bad: [null],
    };

    const configPath = path.join(root, "link.json");
    writeFile(configPath, JSON.stringify(config, null, 2));

    runLinkExpectFailure(configPath, destDir, "bad[0]");
  } finally {
    cleanupTempWorkspace(root);
  }
}

function main() {
  testMixedArraySchema();
  testLegacyObjectSchema();
  testInvalidTypesFailFast();
  console.log("link: verification OK");
}

main();
