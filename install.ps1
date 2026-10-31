# ---------------------------------------------------------------------------
# GUARD: this folder is a distribution sample and must never be the active plugin.
# Run install.ps1 from the canonical checkout instead:
#   D:\DSHworkspace\dsh-custom-background_by_Nagisa
# ---------------------------------------------------------------------------
if ($PSScriptRoot -like '*CUSTOM_BACKGROUND_TEST*') {
  throw "Refusing to install from CUSTOM_BACKGROUND_TEST. Use the canonical folder: D:\DSHworkspace\dsh-custom-background_by_Nagisa"
}
# Installs this plugin into a DSH profile without copying anything.
#
# The profile links to this folder (pnpm "link:" dependency), so the plugin keeps
# living wherever it already is. Re-run this script after moving the folder, after a
# profile reset, or on a machine where the workspace was copied over.
#
#   powershell -ExecutionPolicy Bypass -File .\install.ps1            # default profile, in place
#   powershell -ExecutionPolicy Bypass -File .\install.ps1 -Profile dev
#
# Restart DSH afterwards; the client bundle only loads on start.

[CmdletBinding()]
param(
  [string]$Profile = 'desktop',
  [string]$Source = '',
  [string]$Target = '',
  [string]$Lang = 'auto'
)

$ErrorActionPreference = 'Stop'
$supported = @('auto', 'zh', 'zh-Hant', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'pt')
if ($supported -notcontains $Lang) { throw "Unsupported language '$Lang'. Use one of: $($supported -join ', ')" }

if ([string]::IsNullOrWhiteSpace($Source)) {
  $Source = Split-Path -Parent $MyInvocation.MyCommand.Path
}
$Source = (Resolve-Path -LiteralPath $Source).Path

# When the script runs from a temporary extraction folder (the EXE installer), the plugin has
# to be copied somewhere permanent before the profile can link to it.
if (-not [string]::IsNullOrWhiteSpace($Target)) {
  $Target = [System.IO.Path]::GetFullPath($Target)
  if ($Target -ne $Source) {
    Write-Host "copying plugin to $Target"
    if (-not (Test-Path -LiteralPath $Target)) { New-Item -ItemType Directory -Path $Target -Force | Out-Null }
    $skip = @('.git', 'node_modules', '.github')
    Get-ChildItem -LiteralPath $Source -Force | Where-Object { $skip -notcontains $_.Name } | ForEach-Object {
      Copy-Item -LiteralPath $_.FullName -Destination $Target -Recurse -Force
    }
    $Source = $Target
  }
}

$manifestPath = Join-Path $Source 'package.json'
if (-not (Test-Path -LiteralPath $manifestPath)) {
  throw "Not a plugin folder (no package.json): $Source"
}

# Bake the installer's language into the client bundle: the browser cannot read a config file
# next to the plugin, but it does read this constant.
$clientPath = Join-Path $Source 'client.js'
if (Test-Path -LiteralPath $clientPath) {
  $client = [System.IO.File]::ReadAllText($clientPath, [System.Text.Encoding]::UTF8)
  $pattern = "const INSTALLED_LANG = '[^']*'; // @installer-lang"
  if ($client -match $pattern) {
    $replacement = "const INSTALLED_LANG = '" + $Lang + "'; // @installer-lang"
    $updated = [regex]::Replace($client, $pattern, $replacement)
    if ($updated -ne $client) {
      [System.IO.File]::WriteAllText($clientPath, $updated, (New-Object System.Text.UTF8Encoding($false)))
      Write-Host "language : $Lang"
    }
  } else {
    Write-Host 'language : marker missing, keeping the bundled default' -ForegroundColor Yellow
  }
}
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$name = [string]$manifest.name
if (-not $name) { throw "package.json has no name: $manifestPath" }

$profileDir = Join-Path (Join-Path $env:USERPROFILE '.dsh\profiles') $Profile
if (-not (Test-Path -LiteralPath $profileDir)) {
  throw "DSH profile not found: $profileDir"
}

$profilePackagePath = Join-Path $profileDir 'package.json'
if (-not (Test-Path -LiteralPath $profilePackagePath)) {
  throw "Profile has no package.json: $profilePackagePath"
}

$profilePackage = Get-Content -LiteralPath $profilePackagePath -Raw | ConvertFrom-Json
if (-not $profilePackage.dsh) { $profilePackage | Add-Member -NotePropertyName dsh -NotePropertyValue ([pscustomobject]@{}) }
if (-not $profilePackage.dsh.profile) {
  $profilePackage.dsh | Add-Member -NotePropertyName profile -NotePropertyValue ([pscustomobject]@{})
}
if (-not $profilePackage.dsh.profile.bundles) {
  $profilePackage.dsh.profile | Add-Member -NotePropertyName bundles -NotePropertyValue @()
}

$bundles = @($profilePackage.dsh.profile.bundles)
if ($bundles -notcontains $name) { $bundles += $name }
$profilePackage.dsh.profile.bundles = $bundles

if (-not $profilePackage.dependencies) {
  $profilePackage | Add-Member -NotePropertyName dependencies -NotePropertyValue ([pscustomobject]@{})
}
$linkSpec = 'link:' + ($Source -replace '\\', '/')
$profilePackage.dependencies | Add-Member -NotePropertyName $name -NotePropertyValue $linkSpec -Force

Copy-Item -LiteralPath $profilePackagePath -Destination ($profilePackagePath + '.bak') -Force
# Write without a BOM and validate before trusting the result: Windows PowerShell's
# `Set-Content -Encoding utf8` emits a BOM, and a BOM (or a half-written file) makes the shell
# refuse to start with "unexpected token ... is not valid JSON".
$json = $profilePackage | ConvertTo-Json -Depth 32
$null = $json | ConvertFrom-Json
[System.IO.File]::WriteAllText($profilePackagePath, $json, (New-Object System.Text.UTF8Encoding($false)))
$roundTrip = [System.IO.File]::ReadAllText($profilePackagePath, [System.Text.Encoding]::UTF8)
try {
  $null = $roundTrip | ConvertFrom-Json
} catch {
  Copy-Item -LiteralPath ($profilePackagePath + '.bak') -Destination $profilePackagePath -Force
  throw "profile package.json failed validation; restored the backup"
}

Write-Host "profile : $profileDir"
Write-Host "plugin  : $Source"
Write-Host "bundle  : $name"
Write-Host "link    : $linkSpec"

# Link the package into the profile manually. Deliberately NO `pnpm install` here: that command
# resolves every other dependency of the profile (a registry range such as "dsh-ops": "^0.3.0"
# can move to a new release), and a third-party plugin changing under our feet is exactly the
# kind of thing that breaks the shell on next start. A junction is enough for the loader.
$scopeDir = Join-Path (Join-Path $profileDir 'node_modules') '@local'
New-Item -ItemType Directory -Path $scopeDir -Force | Out-Null
$packageLeaf = ($name -split '/')[-1]
$linkPath = Join-Path $scopeDir $packageLeaf
if (Test-Path -LiteralPath $linkPath) {
  $item = Get-Item -LiteralPath $linkPath -Force
  if ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) {
    # Junction or symlink: remove the link, never the target.
    [System.IO.Directory]::Delete($linkPath, $false)
  } else {
    Remove-Item -LiteralPath $linkPath -Recurse -Force
  }
}
New-Item -ItemType Junction -Path $linkPath -Target $Source | Out-Null
Write-Host ("linked  : " + $linkPath)

$token = ($manifest.dsh.client.inject | Measure-Object).Count
Write-Host ''
Write-Host 'Done. Restart DSH, then check Settings > General > Background.' -ForegroundColor Green
Write-Host ('Injected client entry points: ' + $token)
