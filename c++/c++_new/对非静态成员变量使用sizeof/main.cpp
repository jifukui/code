#include <iostream>
using namespace std;
class Person{
  private:
    // string name;
    int age;
    Person *child;
  public:
  friend void display();
};
void display(){
  cout<<sizeof(Person::age)<<endl;
  cout<<sizeof(Person::child)<<endl;
}
int main(){
  Person guandian;
  cout<<sizeof(guandian)<<endl;
  display();
  return 0;
}