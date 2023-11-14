#include <iostream>
#include <future>
using namespace std;
int test(int &a){
  ++a;
  cout<<"calling"<<endl;
  return a;
}
int main(){
  int a=8;
  
  future<int> p=async(launch::async,test,ref(a));
  cout<<"the a is now "<<a<<endl;
  cout<<"end  calling"<<endl;
  p.wait();
  cout<<"the a is now "<<a<<endl;
  return 0;
}
//g++ --std=c++20 main.cpp
//g++ --std=c++11 main.cpp -lpthread