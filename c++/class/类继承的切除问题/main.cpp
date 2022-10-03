#include <iostream>
#include <string>
using namespace std;
class Base{
  protected:
    string name;
    int age;
  public:
    Base(string name,int age);
    Base();
    void display();
};
Base::Base(string name,int age):name("guandian"),age(250){}
Base::Base(){}
void Base::display(){
  cout<<"hello this is Base the name is "<<this->name<<" and the age is "<<this->age<<endl;
}
class Child:public Base{
  public:
    Child();
    Child(string name,int age);
    void display();
    void display(Base &info);
};
Child::Child(){}
Child::Child(string name,int age):Base(name,age){}
void Child::display(){
  cout<<"hello this is child the name is "<<this->name<<" and the age is "<<this->age<<endl;
}
void Child::display(Base &info){
  // cout<<"hello this is child base the name is "<<this->name<<" and the age is "<<this->age<<endl;
  info.display();
}
int main(){
  Child guandian("guandian",25);
  guandian.display();
  guandian.display(guandian);
  return 0;
}