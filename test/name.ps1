
write-host "([datetime]('2020-12-26')-[datetime]('2020-11-09')).Days;`n出差天数"(([datetime]('2020-12-25') - [datetime]('2020-11-09')).Days+1)"天";


write-host "([datetime]('2020-12-26')-[datetime]::Now).Days;`n出差天数"([datetime]('2021-01-01') - [datetime]::Now).Days"天";

