#include <iostream>
using namespace std;
class Base{
  public:
  void display();
  void display(int age);
};
void Base::display(){
  cout<<"Hello this is base"<<endl;
}
void Base::display(int age){
  cout<<"Hello this is base and the age is "<<age<<endl;
}
class Child :public Base{
  public:
  void display();
};
void Child::display(){
  cout<<"Hello this is child"<<endl;
}
int main(){
  Child child;
  child.display();
  child.Base::display(4);
  return 0;
}