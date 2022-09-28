#include <iostream>
using namespace std;
template <class T>
T jimax(T a,T b){
  return a>b?a:b;
}
int main(){
  cout<<"3,5 max is :"<<jimax(3,5)<<endl;
  cout<<"3.9,2.5 max is :"<<jimax(3.9,2.5)<<endl;
  return 0;
}