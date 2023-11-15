#include <iostream>
using namespace std;
template<typename T, typename U=int>
void Tempfunc(T x=1, U y=2){
  cout<<"the x is "<<x<<" and y is "<<y<<endl;
  cout<<"the x size is "<<sizeof(x)<<" and y size is "<<sizeof(y)<<endl;
}
int main(){
  // Tempfunc();
  Tempfunc(9);
  Tempfunc(2,100);
  Tempfunc(7,0.3);
  Tempfunc(7,"hello");
  return 0;
}