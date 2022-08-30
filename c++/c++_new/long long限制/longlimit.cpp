#include <iostream>
#include <limits>
using namespace std;
int main(){
  cout<<"std::numeric_limits<long long>::max()="<<numeric_limits<long long>::max()<<endl;
  cout<<"std::numeric_limits<long long>::min()="<<numeric_limits<long long>::min()<<endl;
  cout<<"std::numeric_limits<unsigned long long>::max()="<<numeric_limits<unsigned long long>::max()<<endl;
  return 0;
}