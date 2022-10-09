#include <iostream>
using namespace std;
class Base{
  private:
    string name;
    int age;
  public:
    void display();
    void display(string str);
};
void Base::display(){
  cout<<__func__<<endl;
}
void Base::display(string str){
  cout<<str<<endl;
  cout<<__func__<<endl;
}
int main(){
  Base base;
  base.display();
  base.display("Hello,World");
  return 0;
}