# Removes this plugin from a DSH profile. The plugin folder itself is left untouched.
#
#   powershell -ExecutionPolicy Bypass -File .\uninstall.ps1
#   powershell -ExecutionPolicy Bypass -File .\uninstall.ps1 -Profile dev
#
# Restart DSH afterwards.

[CmdletBinding()]
param(
  [string]$Profile = 'desktop',
  [string]$Source = ''
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($Source)) {
  $Source = Split-Path -Parent $MyInvocation.MyCommand.Path
}
$Source = (Resolve-Path -LiteralPath $Source).Path

$manifest = Get-Content -LiteralPath (Join-Path $Source 'package.json') -Raw | ConvertFrom-Json
$name = [string]$manifest.name
if (-not $name) { throw "package.json has no name: $Source" }

$profileDir = Join-Path (Join-Path $env:USERPROFILE '.dsh\profiles') $Profile
$profilePackagePath = Join-Path $profileDir 'package.json'
if (-not (Test-Path -LiteralPath $profilePackagePath)) {
  throw "Profile has no package.json: $profilePackagePath"
}

$profilePackage = Get-Content -LiteralPath $profilePackagePath -Raw | ConvertFrom-Json

if ($profilePackage.dsh -and $profilePackage.dsh.profile -and $profilePackage.dsh.profile.bundles) {
  $profilePackage.dsh.profile.bundles = @($profilePackage.dsh.profile.bundles) | Where-Object { $_ -ne $name }
}
if ($profilePackage.dependencies -and $profilePackage.dependencies.PSObject.Properties[$name]) {
  $profilePackage.dependencies.PSObject.Properties.Remove($name)
}

Copy-Item -LiteralPath $profilePackagePath -Destination ($profilePackagePath + '.bak') -Force
$profilePackage | ConvertTo-Json -Depth 32 | Set-Content -LiteralPath $profilePackagePath -Encoding utf8

Write-Host "Removed $name from profile '$Profile'."

$runtime = Join-Path (Join-Path $env:USERPROFILE '.dsh\dsh-runtimes') 'dsh-primary-runtime\dependencies'
$node = Join-Path $runtime 'node\bin\node.exe'
$pnpm = Join-Path $runtime 'pnpm\bin\pnpm.mjs'
if (Test-Path -LiteralPath $node -and Test-Path -LiteralPath $pnpm) {
  & $node $pnpm install --dir $profileDir
}

Write-Host 'Restart DSH to finish.' -ForegroundColor Green
