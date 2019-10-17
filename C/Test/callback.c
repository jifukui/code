#include <stdio.h>
struct typedef Person{
    char name[12];
    unsigned age;
    void (*display)();
} typedef person;
void (*test)(){
    printf("hhahaahah");
}
int main()
{
     struct person ji;
     ji.name="jifukui";
     ji.age=28;
     ji.display=test;
     ji.display();
     return 0;
}