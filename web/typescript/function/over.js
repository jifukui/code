var jiprint = console.log;
{
    function test(value) {
        switch (typeof value) {
            case 'boolean':
                {
                    var man = value ? "man" : "woman";
                    jiprint("The sex is " + man);
                    break;
                }
            case 'number':
                {
                    jiprint("Age is " + value);
                    break;
                }
            case 'string':
                {
                    jiprint("Name is " + value);
                    break;
                }
            default:
                {
                    jiprint("have error");
                }
        }
    }
    var data = {
        name: "hjkh",
        age: 58,
        sex: false
    };
    test(data.name);
    test(data.age);
    test(data.sex);
    test(26);
}
