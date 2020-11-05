
.\test.ps1 -g -verbose -switchs $false,$true,$true;


$domain = "www.mossfly.com"
#使用通配符
switch -wildcard($domain) {
    "*" { # match
        "匹配'*'" ;
        $t="ttt"
        $domain = ",,,"; # $domain作为匹配项"www.mossfly.com"，未改变
    }
    "*.com" { # match
        "匹配*.com" ;
        "$domain ,$t"
        $_ = ",,," # $domain作为作为匹配项,现在改变为",,,"
    }
    "*.*.*" { "匹配*.*.*"; } # not
    ",,," { "sssss"; break; } # match
    default {
        "default"
    }
}

$domain #  无论那种形式，再switch结束最后值改变为",,,"