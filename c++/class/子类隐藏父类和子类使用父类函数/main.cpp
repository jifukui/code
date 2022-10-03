#include "child.h"
int main(){
  int age = 43;
  Child guandian;
  guandian.setname("guandian");
  guandian.setage(43);
  guandian.displayname();
  guandian.displayage();
  guandian.Base::displayname(age);
  guandian.Base::displayname();
  guandian.Base::displayage();
  return 0;
}