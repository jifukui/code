#include<iostream>
#include<cassert>
using namespace std;
// #define NDEBUG
// 这个宏好像没有什么用的
#define assert_Static(x) {\
  do{\
    1/(x);\
  }while(0);\
}
int main(){
  int a = 9;
  assert_Static(a>0);
  cout<<"Hello this is first"<<endl;
  assert_Static(a>12);
  cout<<"Hello this is second"<<endl;
  return 0;
}