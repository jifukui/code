#include<iostream>
using namespace std;
int main(){
  #ifdef __arm__
  cout << "this is an ARM"<<endl;
  #elif __x86_64__
  cout << "this is amd64"<<endl;
  #elif __aarch64__
  cout << "this is arm 64"<<endl;
  #elif __i386__
  cout << "this is i386"<<endl;
  #endif
}
//查看内置宏命令
// gcc -dM -E - < /dev/null