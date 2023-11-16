#include <iostream>
using namespace std;
class Persion
{
private:
  /* data */
  string name;
  int age;
  
public:
  Persion():Persion("guandian",45){};
  Persion(string name):Persion(name,45){};
  Persion(int age):Persion("guandian1",age){};
  Persion(string name,int age):name(name),age(age){
    this->name = name;
    this->age = age;
  }
  void display(){
    cout<<"the name "<<name<<" age "<<age<<endl;
  }
};

int main(){
  Persion p1{};
  Persion p2{"guandian1111"};
  Persion p3{29};
  Persion p4{"guandian222222",10};
  p1.display();
  p2.display();
  p3.display();
  p4.display();
  return 0;
}