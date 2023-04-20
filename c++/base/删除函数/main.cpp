#include <iostream>
using namespace std;
int add(int x, int y)=delete;
int main(int argc, char){
  int a=8;
  int b=9;
  int c=add(a,b);
  cout<<a<<" "<<b<<" "<<c<<endl;
  return 0;
}
int add(int x, int y){
  return x+y;
}