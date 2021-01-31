#include <iostream>
class Person
{
private:
    string name;
    int age;
    int id;
public:
    Person();
    ~Person();
    string GetName();
    void SetName(string name);
    int GetAge();
    void SetAge(int age);
    int GetID();
    void SetID(int id);
};