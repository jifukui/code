#include <iostream>
#include <source_location>
#include <string_view>
using namespace std;

void log(string_view message,const source_location& location = std::source_location::current()){
  cout << "信息："
          << location.file_name() << ':'
          << location.line() << ' '
          << message << '\n';
}

int main(){
  log("Hello this is test!");
  return 0;
}

// g++ -std=c++20 -O2 -Wall  main.cpp
// 这个需要c++20的支持