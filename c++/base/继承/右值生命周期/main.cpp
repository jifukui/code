#include <iostream>
using namespace std;
class HugeMem{
  public:
  HugeMem(int size):sz(size>0?size:1){
    c=new int[sz];
  }
  ~HugeMem(){delete []c; cout<<"HugeMem destruct"<<endl;}
  HugeMem(HugeMem&& other):sz(other.sz),c(other.c) {
    cout<<"have called HugeMem"<<endl;
    other.c=nullptr;
  }
  int *c;
  int sz;
};

class Moveable{
  public:
    Moveable():i(new int(3)),h(1024){}
    ~Moveable(){delete i;}
    Moveable(Moveable&& other):i(other.i),h(move(other.h)){
        // 这里将左值转化为右值
        // 不会出现问题是由于other是临时变量将会被析构生命周期结束
        other.i=nullptr;
    }
    int *i;
    HugeMem h;
};

Moveable GetTemp(){
  Moveable tmp=Moveable();
  cout<<hex<<"Huge Mem from"<<__func__\
  <<" @"<<tmp.h.c<<endl;
  return tmp;
}
int main (){
  Moveable a(GetTemp());
  cout<<hex<<"Huge Mem from"<<__func__\
  <<" @"<<a.h.c<<endl;
}

// g++ main.cpp -fno-elide-constructors -g