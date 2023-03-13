#include <iostream>
#include <string>
using namespace std;
class Person{
  private:
    int age{3};
    string name{"guandian"};
    friend void display(Person &p);
  public:
  void display();
};
void Person::display(){
  cout<<"the age is "<<this->age<<" and the name is "<<this->name<<endl;
}
void display(Person &p){
  cout<<"Hello this is friend"<<endl;
  cout<<"the age is "<<p.age<<" and the name is "<<p.name<<endl;
}
int main(){
  Person guan;
  guan.display();
  display(guan);
  return 0;
}