#include <iostream>
using namespace std;
class Base
{
private:
  /* data */
public:
  Base(/* args */);
  virtual ~Base();
};

Base::Base(/* args */)
{
  cout<<"Base have creat"<<endl;
}

Base::~Base()
{
  cout<<"Base have delete"<<endl;
}
class Child:public Base
{
private:
  /* data */
public:
  Child(/* args */);
  ~Child();
  void deleteit(Base * base);
};

Child::Child(/* args */)
{
  cout<<"child have creat"<<endl;
}

Child::~Child()
{
  cout<<"child have delete"<<endl;
}
void Child::deleteit(Base * base){
  delete base;
}
int main(){
  Child  *guandian1=new Child();
  guandian1->deleteit(guandian1);
  Child guandian;
  return 0;
}
