#include<iostream>
using namespace std;
int var=9;
int main(){
  int var=102;
  if(1){
    int var=1001;
    if(1){
      int var=1002;
      cout<<"the local "<<var<<endl;
    }
  }
  return 0;
}