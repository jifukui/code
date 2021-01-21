#include<stdio.h>
int main(){
    char *str[2]={
        "123456",
        "jifukui"
    };
    char temp[] = "%[^0-9]";
    int len;
    int i;
    for( i = 0 ; i < 2 ; i++){
        len = sscanf(str[i],temp);
        printf("the %d match is %d\r\n",i,len);
    }
    return 0;
}