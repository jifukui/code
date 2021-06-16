#include <stdio.h>
int main(){
    unsigned int a = 4;
    int b = 4;
    int c = -4;
    a= a>>5;
    b=b>>5;
    c =c>>5;
    printf("the a is %d the b is %d the c is %d\r\n",a,b,c);
    return 0;
}