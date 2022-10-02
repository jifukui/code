#include <iostream>
using namespace std;
int main(){
  int arr[10]={0,1,2,3,4,5,6,7,8,9};
  int *beg=begin(arr);
  int *last=end(arr);
  for(auto i=beg;i!=last;i++){
    cout<<"the i is "<<*i<<endl;
  }
  return 0;
}