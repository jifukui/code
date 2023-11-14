#include<iostream>
using namespace std;
class Base{
  public:
  virtual void display();
};
void Base::display(){
  cout<<"Hello this is base"<<endl;
}
class Child:public Base
{
public:
  void display() override;
};
// void Child::display(){
//   cout<<"Hello this is child"<<endl;
// }
//对于创建无参对象不需要添加双括号
// override关键字是在子类中定义的含义为子类必须要重写此函数
int main(){
  Base b;
  Child c;
  b.display();
  c.display();
  return 0;
}

