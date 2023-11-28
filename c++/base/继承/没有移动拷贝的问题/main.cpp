#include <iostream>
using namespace std;
class HasPtrMem
{

public:
  HasPtrMem():d(new int(0)){
    cout<<"Constructing:"<<++n_cstr<<endl;
  }
  HasPtrMem(const HasPtrMem &h):d(new int(*h.d)){
    cout<<"copy Constructing:"<<++n_cptr<<endl;
  }
  ~HasPtrMem(){
    cout<<"Destruct:"<<++n_dstr<<endl;
  }
  int *d;
  static int n_cstr;
  static int n_cptr;
  static int n_dstr;
};
int HasPtrMem::n_cptr=0;
int HasPtrMem::n_dstr=0;
int HasPtrMem::n_cstr=0;
HasPtrMem GetTemp(){
  // 第一次调用拷贝构造函数
  return HasPtrMem();
}
int main(){
  //为a赋值变量的时候会第二次调用拷贝构造函数
  HasPtrMem a=GetTemp();
  return 0;
}
//g++ main.cpp -fno-elide-constructors 使用此编译指令关闭编译器的处理部分