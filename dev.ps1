# SyncroBrain one-shot local bootstrap (Windows)
# Usage: .\dev.ps1
#        .\dev.ps1 -SkipDocker
#        .\dev.ps1 -RequiredOnly

param(
  [switch]$SkipDocker,
  [switch]$SkipInit,
  [switch]$RequiredOnly,
  [switch]$Https
)

$args = @("tooling/scripts/dev-up.mjs")
if ($SkipDocker) { $args += "--skip-docker" }
if ($SkipInit) { $args += "--skip-init" }
if ($RequiredOnly) { $args += "--required-only" }
if ($Https) { $args += "--https" }

node @args
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
