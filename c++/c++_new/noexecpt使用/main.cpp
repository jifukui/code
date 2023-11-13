#include <iostream>
using namespace std;
void test1 () {
  cout<<"Hello world!"<<endl;
  throw std::runtime_error("have get data");
}
void test () noexcept{
  cout<<"Hello world!"<<endl;
  // throw std::runtime_error("have get data");
}
int main(){
  try{
    test1();
  }catch(const exception& err){
    cout<<"Error: "<<err.what()<<endl;
  }
  test();
  cout<<"this is test!"<<endl;
  return 0;
}

// noexceptx修饰函数将不会产生异常，如果此函数抛出异常将会调用terminate退出进程
// g++ main.cpp 