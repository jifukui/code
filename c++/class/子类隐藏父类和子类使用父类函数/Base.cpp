#include "Base.h"
void Base::setname(std::string name){
  this->name=name;
}
void Base::setage(int age){
  this->age=age;
}
void Base::displayage(){
  std::cout<<"the base output age "<<this->age<<std::endl;
}
void Base::displayname(){
  std::cout<<"the base output name "<<this->name<<std::endl;
}
void Base::displayname(int age){
  std::cout<<"the base output name "<<this->name<< " and age is  "<<age<<std::endl;
}