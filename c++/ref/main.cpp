#include  <iostream>
void changethe(int &data);
int main(){
    int b = 8;
    changethe(b);
    std::cout<<"the value of b is "<<b<<std::endl;
    return 0;
}
void changethe(int & a){
    a = a+10;
}