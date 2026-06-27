# Clone all child repositories listed in .meta/manifest.json
# Usage: .\init.ps1
#        .\init.ps1 -Only iot-gateway,website

param(
  [string]$Only,
  [switch]$Https,
  [switch]$RequiredOnly
)

$args = @("tooling/scripts/init-repos.mjs")
if ($Only) { $args += "--only=$Only" }
if ($Https) { $args += "--https" }
if ($RequiredOnly) { $args += "--required-only" }

node @args
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
