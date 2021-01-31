#include "Person.h"
using namespace std;

string Person::GetName(){
    return name;
}

int Person::GetAge(){
    return age;
}
int Person::GetID(){
    return id;
}
void Person::SetName(string name1){
    name = name1;
}
void Person::SetAge(int age1){
    age = age1
}
void Person::SetID(int id1){
    id = id1
}
Person::Person(){
    cout<<"构造函数"<<endl;
}
Person::~Person(){
    cout<<"析构函数"<<endl;
}
int main(){
    Person jifukui;
    jifukui.SetName("jifukui");
    jifukui.SetAge(23);
    jifukui.SetID(12344);
    cout<<jifukui.GetName()<<","<<jifukui.GetAge()<<","<<jifukui.GetID()<<endl;
    return 0;
}