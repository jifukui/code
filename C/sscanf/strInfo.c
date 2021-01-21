#include<stdio.h>
const int num = 4;
int main(){
    char *str[num]={
        "123456",
        "jifukui",
        "ji123ji",
        "hajhdjh8378-092jhfhy"
    };
    char buf[16];
    char temp[] = "%[^0-9]c";
    int len;
    int i;
    for( i = 0 ; i < num ; i++){
        len = sscanf(str[i],temp,buf);
        printf("the %d is %s and match is %d and buf is %s\r\n",i,str[i],len,buf);
    }
    return 0;
}