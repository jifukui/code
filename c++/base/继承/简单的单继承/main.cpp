#include<iostream>
#include<string>
using namespace std;
class Person{
  private:
    string name;
    int age;
  public:
    void display();
    Person()=default;
    Person(string name, int age);
    ~Person();
    Person(const Person& other)=delete;
    Person& operator=(const Person& other)=delete;
};
Person::Person(string name, int age):name(name),age(age){

}
Person::~Person(){
  cout<<"the person have been deleted "<<name<<endl;
}
void Person::display(){
  cout<<"my name is "<<name<<endl;
  cout<<"my age is "<<age<<endl;
}
class Teacher : public Person{
  private:
    static  string job;
  public:
    Teacher()=default;
    Teacher(string name,int age);
    void display();  
};
Teacher::Teacher(string name,int age):Person(name,age){

}
string Teacher::job = "teacher";
void Teacher::display(){
  Person::display();
  cout<<"my job is "<<job<<endl;
}
int main(){
  Teacher t1("guandian",29);
  // Teacher t3
  t1.display();
  Teacher* t2=new Teacher("guandian2",29);
  t2->display();
  // 使用拷贝赋值函数失败
  // Teacher t3{};
  // t3=t1; 
  //使用拷贝构造函数失败
  // Teacher t4(t1);
  delete t2;
  return 0;
}