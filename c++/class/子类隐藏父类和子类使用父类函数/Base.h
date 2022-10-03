#include <iostream>
#include <string>
class Base{
  protected:
    int age;
    std::string name;
  public:
    void setname(std::string name);
    void setage(int age);
    void displayname();
    void displayname(int age);
    void displayage();
};