#include<iostream>
#include<cassert>
using namespace std;
// #define NDEBUG
// 这个宏好像没有什么用的
int main(){
  const int a = 9 ;
  const int a1 = 9 ;
  static_assert(a>0,"first");
  cout<<"Hello this is first"<<endl;
  static_assert(a1>10,"second");
  cout<<"Hello this is second"<<endl;
  return 0;
}