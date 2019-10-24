const print=console.log;
{
    let va=/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/
    const data=va.exec("1991-1-5");
    print(data);
    print(data.groups.year);
    print(data.groups.month);
    print(data.groups.day);
}