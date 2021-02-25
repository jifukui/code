#include <stdio.h>
#define likely(x) __builtin_expect(!!(x), 1) //x很可能为真       
#define unlikely(x) __builtin_expect(!!(x), 0) //x很可能为假
int main(){
    int i = 100;
    if(i==0){
        printf("is equal\r\n");
    }else{
        printf("is not equal\r\n");
    }
    return 0;
}