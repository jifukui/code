#include <iostream>
using namespace std;
void RunCode(int &&m){
  cout<<"this is rvalue reference"<<endl;
}

void RunCode(int &m) {
  cout<<"this is lvalue reference"<<endl;
}

void RunCode(const int &&m) {
  cout<<"this is const rvalue reference"<<endl;
}

void RunCode(const int &m) {
  cout<<"this is const lvalue reference"<<endl;
}

template <typename T>
void PerfectForward(T && t){
  RunCode(forward<T>(t));
}

int main() {
  int a ;
  int b;
  const int c=1;
  const int d=0;
  PerfectForward(a);
  PerfectForward(move(b));
  PerfectForward(c);
  PerfectForward(move(d));
  return 0;
}