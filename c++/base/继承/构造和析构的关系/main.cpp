#include <iostream>
#include <string>
using namespace std;
class Persion
{
private:
  /* data */
  string name;
public:
  Persion(string name);
  virtual ~Persion();
  // ~Persion();
  string getname();
};

Persion::Persion(string name)
{
  this->name = name;
  cout<<"start person: "<<this->getname()<<endl;
}

Persion::~Persion()
{
  cout<<"end person: "<<this->getname()<<endl;
}
string Persion::getname(){
  return this->name;
}

class Sb:public Persion{
  private:
   int age;
  public:
    Sb(int age, string name);
    ~Sb();
};
Sb::Sb(int age, string name):Persion(name){
  this->age = age;
  cout<<"start Sb: "<<this->getname()<<endl;
}
Sb::~Sb(){
  cout<<"end Sb: "<<this->getname()<<endl;
}
int main(){
  Persion p("guandian");
  Sb *p1=new Sb(43,"guandian1");
  Persion *p3=dynamic_cast<Persion *>(p1);
  delete p3;
  return 0;
}
// 这种程序进行析构的时候如果基类不进行将析构函数设置为虚函数，使用指针转换的时候将不会调用子类的析构函数
// 因此基类的析构函数应当设置为虚函数