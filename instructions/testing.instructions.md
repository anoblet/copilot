# Testing Strategy Instructions

## ⚠️ CRITICAL: CO-LOCATED TEST ARCHITECTURE ⚠️

**ABSOLUTE RULE**: All tests must be co-located with their source files. This project uses a component-directory architecture where each testable unit has its own directory containing both source and test files.

## 1. Directory Structure

### Components
```
src/components/
├── personality-application/
│   ├── personality-application.ts
│   └── personality-application.test.ts
├── personality-test/
│   ├── personality-test.ts
│   ├── personality-test.test.ts
│   └── personality-test-isolated.test.ts
├── navigation-desktop/
│   ├── navigation-desktop.ts
│   └── navigation-desktop.test.ts
└── [component-name]/
    ├── [component-name].ts
    └── [component-name].test.ts
```

### Services
```
src/services/
├── auth-service/
│   ├── auth-service.ts
│   └── auth-service.test.ts
├── storage-service/
│   ├── storage-service.ts
│   └── storage-service.test.ts
└── [service-name]/
    ├── [service-name].ts
    └── [service-name].test.ts
```

### Utilities
```
src/
├── utils.ts
├── utils.test.ts
├── types.ts
└── types.test.ts
```

## 2. Intelligent Test Execution

### Change Detection System
The project implements intelligent test execution that only runs tests for modified files and their dependents:

- **File Change Detection**: Uses `git diff` to identify modified files
- **Dependency Mapping**: Tracks component relationships in `src/dependency-map.json`
- **Selective Execution**: Runs only relevant tests based on changes

### Test Execution Commands

```bash
# Run tests for changed files only
npm run test:changed

# Run tests for changed files and all dependents
npm run test:affected

# Run tests for specific component
npm run test:component personality-application

# Run all tests (fallback)
npm run test:all
```

## 3. Pre-Commit Integration

### Husky Hook Configuration
Tests are automatically executed before git operations to ensure code quality:

```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run intelligent test execution
npm run test:changed

# Only proceed if tests pass
if [ $? -ne 0 ]; then
  echo "Tests failed. Commit aborted."
  exit 1
fi
```

### Git Workflow Integration
Before any git flow operations (branch, commit, push, PR, merge), relevant tests are executed:

1. **Pre-Branch**: Run affected tests before creating feature branches
2. **Pre-Commit**: Run changed tests before commit
3. **Pre-Push**: Run affected tests before push
4. **Pre-Merge**: Run full test suite before merge to development

## 4. Dependency Mapping

### Component Dependencies
The `src/dependency-map.json` file tracks:
- Component file paths
- Test file paths  
- Dependency relationships
- Parent-child component relationships

### Updating Dependencies
When adding new components or changing dependencies:

1. Update `src/dependency-map.json`
2. Add dependency relationships
3. Ensure test paths are correct
4. Verify change detection works

Example dependency entry:
```json
{
  "personality-application": {
    "path": "src/components/personality-application/personality-application.ts",
    "dependencies": [
      "personality-test",
      "personality-dashboard",
      "services"
    ],
    "testPath": "src/components/personality-application/personality-application.test.ts"
  }
}
```

## 5. Test Organization Principles

### Co-Location Rules
- **Each component gets its own directory**
- **Tests live next to source files**
- **No separate tests/ directory**
- **Isolated and integration tests can coexist**

### Naming Conventions
- Source: `[component-name].ts`
- Tests: `[component-name].test.ts`
- Isolated tests: `[component-name]-isolated.test.ts`
- Integration tests: `[component-name]-integration.test.ts`

### Test Categories
1. **Unit Tests**: Component-specific functionality
2. **Integration Tests**: Component interaction testing
3. **Isolated Tests**: Component testing in isolation
4. **End-to-End Tests**: Full user flow testing

## 6. Playwright Configuration

### Test Discovery
Playwright is configured to discover tests in the new co-located structure:

```javascript
// playwright.config.ts
export default defineConfig({
  testDir: './src',
  testMatch: '**/*.test.ts',
  testIgnore: [
    'node_modules/**',
    'dist/**',
    'tests/**' // Old structure ignored
  ]
});
```

### Test Execution
- Tests run in headless mode by default
- Reports written to files, not served
- Multi-browser testing (Chromium, Firefox, Safari)
- Mobile device testing included

## 7. CI/CD Integration

### GitHub Actions
The testing strategy integrates with CI/CD:

```yaml
# .github/workflows/test.yml
jobs:
  test-changed:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Need full history for git diff
      - name: Install dependencies
        run: npm ci
      - name: Run intelligent tests
        run: npm run test:affected
```

### Branch Protection
- Tests must pass before merge
- Changed files trigger relevant test execution
- Full test suite runs on main/development branches

## 8. Performance Optimization

### Selective Execution Benefits
- **Faster Feedback**: Only run relevant tests
- **Resource Efficiency**: Reduced CI/CD time
- **Developer Experience**: Quick local testing
- **Scalability**: Handles large codebases efficiently

### Test Execution Timing
- Changed tests: ~30 seconds to 2 minutes
- Affected tests: ~1-5 minutes
- Full test suite: ~10-20 minutes

## 9. Debugging and Troubleshooting

### Common Issues
1. **Missing Dependencies**: Update dependency-map.json
2. **Import Errors**: Check relative paths in restructured files
3. **Test Discovery**: Verify test file naming conventions
4. **Git Diff Issues**: Ensure clean git state

### Debug Commands
```bash
# Check which files are detected as changed
git diff --name-only HEAD

# Verify dependency mapping
node src/intelligent-test-runner.js component personality-application

# Test specific component
npm run test:component login-modal

# Verbose test output
npm run test:changed -- --reporter=verbose
```

## 10. Maintenance and Updates

### Regular Maintenance
- Update dependency map when adding components
- Review test coverage regularly
- Optimize test execution times
- Update CI/CD configurations

### Migration Notes
- Legacy tests/ directory should be empty
- All tests moved to co-located positions
- Import paths updated for new structure
- Playwright configuration updated

## 11. Success Metrics

### Quality Indicators
- ✅ All tests co-located with source files
- ✅ Change detection working correctly
- ✅ Selective execution reducing test time by 70%+
- ✅ Zero manual test selection required
- ✅ Pre-commit hooks preventing broken commits
- ✅ Component isolation enabling parallel development

### Performance Targets
- Changed file detection: <5 seconds
- Selective test execution: <50% of full suite time
- Component test isolation: 100% independent
- Git workflow integration: Seamless, no manual intervention

---

## 🎯 IMPLEMENTATION CHECKLIST

### Project Setup
- [ ] All components moved to component directories
- [ ] All tests co-located with source files
- [ ] Import paths updated throughout project
- [ ] Dependency mapping created and accurate

### Test Execution
- [ ] Intelligent test runner implemented
- [ ] Change detection working
- [ ] Selective execution verified
- [ ] Component-specific testing available

### Git Integration
- [ ] Pre-commit hooks configured
- [ ] Husky integration working
- [ ] Git workflow automation complete
- [ ] CI/CD pipeline updated

### Documentation
- [ ] Testing strategy documented
- [ ] Developer workflows updated
- [ ] Troubleshooting guide available
- [ ] Migration from old structure complete

**THE CO-LOCATED TEST ARCHITECTURE IS MANDATORY AND MUST BE MAINTAINED.**

This strategy ensures maintainable, scalable, and efficient testing that scales with project growth while providing immediate feedback to developers.
