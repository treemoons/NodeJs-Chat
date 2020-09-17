
using System.Collections.Generic;
MyStruct a;
a.testa = "ss";
System.Console.WriteLine(a.testa);

struct MyStruct
{
    public MyStruct(string a)
    {
        testa = a;
    }
    public string testa;
    void ss()
    {
        List<string> list = new List<string>();
        list[0] = "ss";
        Console.WriteLine(testa);
    }
}