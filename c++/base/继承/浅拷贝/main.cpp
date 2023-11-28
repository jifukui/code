#include <iostream>
using namespace std;
class HasPtrMem
{
private:
  /* data */
  
public:
  HasPtrMem():d(new int(0 )){}
  //下面两个拷贝构造函数都在没有使用默认拷贝构造函数的情况下都会被调用
  // HasPtrMem(const HasPtrMem &h):d(new int(*h.d)) {cout<<"const"<<endl;}
  // HasPtrMem(HasPtrMem &h):d(new int(*h.d)) {cout<<"no const"<<endl;}
  ~HasPtrMem(){cout<<"delete"<<endl; delete d;}
  int * d;
};
int main(){
  HasPtrMem a;
  HasPtrMem b(a);
  //使用默认拷贝构造函数采用的是浅拷贝，将会造成a和b的d都指向了同一块内存
  // 释放地址空间的时候将会产生重复释放的问题
  cout<<&(*a.d)<<"  "<<&(*b.d)<<endl;
  cout<<*a.d<<endl;
  cout<<*b.d<<endl;
  return 0;
}
