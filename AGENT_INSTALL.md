# AGENT INSTALL — dsh-custom-background 1.1.0

This folder is the **no-EXE** distribution: no installer binary, no build tooling. It is meant
to be dropped into the workspace and installed by an agent (Claude / Codex / DSH itself) that
has shell access.

## What the agent must do

1. Locate the DSH profile directory:

   ```
   %USERPROFILE%\.dsh\profiles\desktop
   ```

   If the user has a non-default profile, ask which one.

2. Run the bundled installer from this folder:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
   ```

   Optional switches:

   | Switch | Meaning |
   |---|---|
   | `-Profile <name>` | profile id, default `desktop` |
   | `-Lang <code>` | bake the default UI language: `auto`, `zh`, `zh-Hant`, `en`, `ja`, `ko`, `es`, `fr`, `de`, `ru`, `pt` |
   | `-Target <path>` | copy the plugin there first, then link that copy |

3. Ask the user to **restart DeepSeek Harness**. The client bundle is only loaded at start.

4. Verify after restart: **Settings › General › Background** should show
   `背景`.

## What the script changes (be ready to explain or undo it)

- writes `link:<this folder>` into `<profile>/package.json` → `dependencies`
- adds `@local/dsh-custom-background_by_nagisa` to `<profile>/package.json` → `dsh.profile.bundles`
- backs that file up to `package.json.bak` first, writes **without a BOM**, and restores the
  backup automatically if the result does not parse
- creates a junction `<profile>/node_modules/@local/dsh-custom-background_by_nagisa`
  pointing at this folder
- does **not** run `pnpm install` — that deliberately avoids touching other plugins' versions

## Undo

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\uninstall.ps1
```

then delete the folder. `uninstall.ps1` removes both the dependency entry and the bundle
entry, restoring `package.json.bak` first if anything looks wrong.

## Troubleshooting for the agent

| Symptom | Cause | Fix |
|---|---|---|
| Shell shows `Unexpected token '﻿'` on startup | `package.json` was written with a UTF-8 BOM | rewrite it without a BOM: `[System.IO.File]::WriteAllText($p, ([System.IO.File]::ReadAllText($p)).TrimStart([char]0xFEFF), (New-Object System.Text.UTF8Encoding($false)))` |
| `entry did not activate … import failed` | the client bundle's `id` does not match the package name | check the first line of `client.js`: `id: '@local/dsh-custom-background_by_nagisa'` |
| Plugin not visible after install | DSH was not restarted | restart the app |

## Do not

- do not run `pnpm install` in the profile to "fix" things — resolve the actual error instead;
- do not copy this folder into the profile's `node_modules` by hand; use the junction the
  script creates;
- do not rename `package.json`'s `name` or `client.js`'s `id` independently — they must match.
