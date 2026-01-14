# JAVASCRIPT CLIENT - AI AGENT INSTRUCTIONS

## ⚠️ CRITICAL: CHECK YOUR REPOSITORY FIRST

Before making ANY changes, verify you're in the correct repository:

```bash
git remote -v
```

- ✅ **CORRECT**: `origin .../algolia/api-clients-automation.git` → You may proceed
- ❌ **WRONG**: `origin .../algolia/algoliasearch-client-javascript.git` → STOP! This is the PUBLIC repository

**If you're in `algoliasearch-client-javascript`**: Do NOT make changes here. All changes must go through `api-clients-automation`. PRs and commits made directly to the public repo will be discarded on next release.

## ⚠️ BEFORE ANY EDIT: Check If File Is Generated

Before editing ANY file, verify it's hand-written by checking `config/generation.config.mjs`:

```javascript
// In generation.config.mjs - patterns WITHOUT '!' are GENERATED (do not edit)
'clients/algoliasearch-client-javascript/packages/**/package.json',  // Generated
'!clients/algoliasearch-client-javascript/packages/client-common/**', // Hand-written ✓
```

**Hand-written (safe to edit):**

- `packages/client-common/**` - Core transport, types, utilities
- `packages/requester-*/**` - HTTP requesters (browser-xhr, node-http, fetch)
- `packages/logger-console/**` - Logging utilities
- `packages/algoliasearch/__tests__/**` - Tests
- `scripts/**` - Build scripts

**Generated (DO NOT EDIT):**

- `packages/*/model/**` - API models
- `packages/*/src/**` (except client-common) - API clients
- `packages/**/package.json` - Package configs

## Language Conventions

### Naming

- **Files**: `camelCase.ts` for source, `camelCase.test.ts` for tests
- **Variables/Functions**: `camelCase`
- **Types/Interfaces**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE` or `camelCase` depending on scope

### Formatting

- Prettier with project config (`.prettierrc`)
- 120 char line width
- Single quotes, trailing commas
- Run: `yarn cli format javascript clients/algoliasearch-client-javascript`

### TypeScript Patterns

- Strict mode enabled
- No `any` - use `unknown` or proper types
- No `@ts-ignore` or `@ts-expect-error`
- Prefer `type` over `interface` for object shapes
- Use `readonly` for immutable properties

### Dependencies

- **HTTP**: Custom requesters (not axios/fetch directly)
- **Build**: tsup for bundling
- **Test**: Vitest
- **Monorepo**: Yarn workspaces + Lerna

## Client Patterns

### Transporter Architecture

```typescript
// Core transport in packages/client-common/src/transporter/
createTransporter({
  hosts, // Host[] - API hosts with failover
  hostsCache, // Cache for host state
  requester, // Pluggable HTTP implementation
  requestsCache, // Request deduplication
  responsesCache, // Response caching
});
```

### Retry Strategy

- Hosts tracked as `up`, `down`, or `timedOut`
- Automatic failover to next host on failure
- Timeout increases with retry count
- Network errors are retryable, 4xx errors are not

### Cache System

- `createMemoryCache()` - In-memory, serializable
- `createBrowserLocalStorageCache()` - Browser persistence
- `createNullCache()` - No-op for servers
- `createFallbackableCache()` - Chain caches

## Common Gotchas

### Browser vs Node

- Different requesters for each environment
- Use `requester-browser-xhr` for browsers
- Use `requester-node-http` for Node.js
- Check bundle targets in `tsup.config.ts`

### Async Patterns

- All API methods return Promises
- No callback-style APIs
- Use `async/await`, avoid `.then()` chains in new code

### Type Imports

```typescript
// Use 'import type' for type-only imports
import type { SearchResponse } from './types';
```

### Environment Detection

```typescript
// Avoid direct process/window checks
// Use requester abstraction instead
```

## Build & Test Commands

```bash
# From repo root (api-clients-automation)
yarn cli build clients javascript              # Build all JS packages
yarn cli cts generate javascript               # Generate CTS tests
yarn cli cts run javascript                    # Run CTS tests
yarn cli playground javascript node search     # Interactive playground
yarn cli format javascript clients/algoliasearch-client-javascript

# From client directory (for package-specific work)
cd clients/algoliasearch-client-javascript
yarn build                                      # Build packages
yarn test                                       # Run tests
```
