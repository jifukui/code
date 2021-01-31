#include <iostream>
#include <string>
using namespace std;
class Person
{
private:
    int age;
    string name;
    int id;
public:
    Person();
    ~Person();
    string GetName();
    void SetName(string);
    int GetAge();
    void SetAge(int);
    int GetID();
    void SetID(int);
};