const print=console.log;
{
    let data=/^(?<one>.*):(?<two>.*)$/;
    let value="foo:bar";
    //print(data.exec(value));
    let {groups:{one,two}}=data.exec(value);
    print(one);
    print(two);
}
{
    let re=/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/;
    let data="2015-12-11".replace(re,'$<day>/$<month>/$<year>');
    print(data);
}