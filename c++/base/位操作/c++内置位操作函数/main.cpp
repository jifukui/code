#include<iostream>
#include<bitset>
using namespace std;
int main(){
  bitset <32> a(0x8f);
  cout<<"the 7 bit is 1 "<<a.test(7)<<endl;
  cout<<"the value 0x8f 1  nums is "<<a.count()<<endl;
  return 0;
}