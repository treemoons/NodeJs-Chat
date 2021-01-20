
  param (
    [string]$openurl
  )
  if ($openurl) {
    return "E:\Html\AllTest\Schema.json"
  }
  else {
    electron ./electronTest/main.js 
  }
