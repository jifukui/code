#include<iostream>
using namespace std;
int var=9;
int main(){
  int var=102;
  cout<<"the local "<<var<<" The gogal is "<<::var<<endl;
  return 0;
}