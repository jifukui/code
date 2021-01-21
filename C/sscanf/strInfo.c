#include<stdio.h>
int main(){
    char *str[2]={
        "123456",
        "jifukui"
    };
    char buf[16];
    char temp[] = "%[^0-9]c";
    int len;
    int i;
    for( i = 0 ; i < 2 ; i++){
        len = sscanf(str[i],temp,buf);
        printf("the %d is %s and match is %d and buf is %s\r\n",i,str[i],len,buf);
    }
    return 0;
}