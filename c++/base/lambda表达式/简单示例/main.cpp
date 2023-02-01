#include<iostream>
#include<vector>
using namespace std;
int main(){
  vector<int> val(10);
  int n=0;
  auto foo=[](int i)->int {return i+10;};
  for(auto &i:val){
    i=n++;
    i=foo(i);
    cout<<i<<endl;
  }
  
  cout<<val.size()<<endl;
  return 0;
}