#include <iostream>
using namespace std;
class BaseClass{
  public:
    BaseClass():i(new int(3)){}
    ~BaseClass(){delete i;}
    BaseClass(const BaseClass& m):i(new int(*m.i)){}
    BaseClass(BaseClass &&m):i(m.i){
      m.i=nullptr;
      // 这是移动构造函数必须要将之前的指针对象设置为空指针
      //移动语句不会改变对象的生命周期
    }
    int *i;
};
int main(){
  BaseClass a;
  BaseClass c(move(a));
  cout<<*a.i<<endl;
}
// g++ main.cpp -fno-elide-constructors