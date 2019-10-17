#include <stdio.h>
typedef struct  Person{
    char* name;
    unsigned age;
    void (*display)();
}  person;
void test(){
    printf("hhahaahah\n");
}
int main()
{
     person ji;
     ji.name="jifukui";
     ji.age=28;
     ji.display=test;
     ji.display();
     return 0;
}
