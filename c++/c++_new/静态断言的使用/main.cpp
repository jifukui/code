#include <iostream>
using namespace std;
int main(){
  const int i=0;
  static_assert(i==1, "Invalid number of arguments");
  return 0;
}
// 使用静态断言将会在编译期间检测程序的问题
// 断言接收两个参数，第一个参数是一个表达式，第二个参数是断言检测失败输出的断言信息
// gcc main.cpp