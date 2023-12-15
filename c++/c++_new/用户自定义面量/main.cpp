#include <cstdlib>
#include <iostream>
using namespace std;

using uint8 = unsigned char;
class  RGBA
{
private:
  /* data */
public:
   RGBA(uint8 R,uint8 G,uint8 B,uint8 A=0):r(R),g(G),b(B),a(A){

   }
  uint8 r,g,b,a;
};

RGBA operator ""_C(const char * col,size_t n){
  const char * p=col;
  const char * end=col+n;
  const char * r,*g,*b,*a;
  // cout<<"the string "<<col<<" the length is "<<n<<endl;
  r=g=b=a=nullptr;
  for(;p!=end;p++){
    // cout<<"the value is "<<*p<<endl;
    if(*p=='r'){
      r=p;
      // cout<<"the r is "<<r<<endl;
    }else if(*p=='g'){
      g=p;
      // cout<<"the g is "<<g<<endl;
    }else if(*p=='b'){
      b=p;
      // cout<<"the b is "<<b<<endl;
    }else if(*p=='a'){
      a=p;
      // cout<<"the a is "<<a<<endl;
    }
  }
  if((r==nullptr)||(g==nullptr)||(b==nullptr)){
    cout<<"have get a null pointer"<<endl;
    throw;
  }
  else if(a==nullptr){
    return RGBA(atoi(r+1),atoi(g+1),atoi(b+1));
  }else{
    return RGBA(atoi(r+1),atoi(g+1),atoi(b+1),atoi(b+1));
  }
}

std::ostream & operator <<(std::ostream &out ,RGBA &col){
  return out<<"r: "<<(int)col.r<<",g: "<<(int)col.g
  <<",b: "<<(int)col.b<<",a: "<<(int)col.a<<endl;
}

void blend(RGBA &&col1,RGBA && col2){
  cout<<"blend "<<endl<<col1<<col2<<endl;
}
int main(){
  cout<<"starting..."<<endl;
  blend("r255 g240 b155"_C,"r15 g255 b10 a7"_C);
}