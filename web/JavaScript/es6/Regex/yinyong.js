const print=console.log;
{
    const re=/^(?<word>[a-z]+)!\k<word>$/
    print(re.test('ab!ab'));
    print(re.test('ab!a'));
    print(re.test('ab!1ab'));
    print(re.test('111!111'));
}
{
    const re=/^(?<word>[a-z]+)!\1$/
    print(re.test('ab!ab'));
    print(re.test('ab!a'));
    print(re.test('ab!1ab'));
    print(re.test('111!111'));
}