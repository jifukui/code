#include <iostream>
using namespace std;
class Base
{
private:
  int a=1;
  int b=2;
  int  c=3;
public:
  Base();
  Base(int a);
  Base(int a,int b);
  Base(int a,int b,int c);
  virtual void display();
};
Base::Base(){

}
Base::Base(int a)
{
  this->a=a;
}
Base::Base(int a,int b)
{
  this->a=a;
  this->b=b;
  
}
Base::Base(int a,int b,int c)
{
  this->a=a;
  this->b=b;
  this->c=c;
}
void Base::display(){
  cout<<this->a<<" "<<this->b<<" " <<this->c<<endl;
}
class Test : public Base{
  private:
  int d=9;
  public:
  // Test(int value);
  using Base::Base;
  
  // void display(){
  //   cout<<this->a<<" "<<this->b<<" " <<this->c<<" "<<this->d<<endl;
  // }
};
// Test::Test(int value){
//   this->d=value;
// }

int main(){
  Test a(99,100);
  a.display();
  return 0;
}