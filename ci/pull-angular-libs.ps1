$env:GIT_REDIRECT_STDERR = '2>&1'
git subtree pull -P angular/libs/coding-management origin angular/libs/coding-management
if (-Not $?) {
    Write-Host ("subtree pull failed ")
    exit $LASTEXITCODE
}

