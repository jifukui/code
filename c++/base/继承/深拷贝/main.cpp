#include <iostream>
using namespace std;
class HasPtrMem
{
private:
  /* data */
  
public:
  HasPtrMem():d(new int(0 )){}
  HasPtrMem(HasPtrMem &h):d(new int(*h.d)) {cout<<"no const"<<endl;}
  ~HasPtrMem(){cout<<"delete"<<endl; delete d;}
  int * d;
};
int main(){
  HasPtrMem a;
  HasPtrMem b(a);
  cout<<&(*a.d)<<"  "<<&(*b.d)<<endl;
  cout<<*a.d<<endl;
  cout<<*b.d<<endl;
  return 0;
}
