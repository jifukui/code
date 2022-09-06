#include<iostream>
#include<set>
using namespace std;
int main(){
  set<int> a;
  a.insert(3);
  a.insert(2);
  a.insert(5);
  for(auto &i:a){
    cout<<i<<endl;
   }
   cout<<"the size is "<<a.size()<<endl;
   return 0;
}