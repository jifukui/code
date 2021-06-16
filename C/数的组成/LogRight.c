#include <stdio.h>
int main(){
    unsigned int a = 4;
    int b = 4;
    int c = -4;
    a= a>>3;
    b=b>>3;
    c =c>>3;
    printf("the a is %d the b is %d the c is %d\r\n",a,b,c);
    return 0;
}