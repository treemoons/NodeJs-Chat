
param (
    [switch]$g,
    [switch]$verbose
    # [switch[]] $switchs 
)
$i = 0;

    Write-Host $switchs -ForegroundColor Blue;
$switchs | ForEach-Object {
    if ($_) {
        
            Write-Host "foreach : $_" -ForegroundColor Magenta;
       
        $i++;
            Write-Host "i : $i" -ForegroundColor Yellow;
    }
};
if ($i -gt 2) {
    Write-Host "i > 2" -ForegroundColor Red;
}
if ($g) {
    
    Write-Host "-g" -ForegroundColor Magenta;
}
if ($verbose) {
    Write-Host "cesh`e[35m-verbose" -ForegroundColor Blue;
}

 Write-Host "`e[35m"(Get-Item .\newtest.html|Out-Host) -ForegroundColor Red
