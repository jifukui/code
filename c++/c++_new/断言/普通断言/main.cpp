#include<iostream>
#include<cassert>
using namespace std;
// #define NDEBUG
// 这个宏好像没有什么用的
int main(){
  int a =9;
  assert(a>0);
  cout<<"Hello this is first"<<endl;
  assert(a>10);
  cout<<"Hello this is second"<<endl;
  return 0;
}