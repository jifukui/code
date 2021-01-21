#include<stdio.h>
#define  num  8
int main(){
    char *str[num]={
        "123456",
        "jifukui",
        "ji123ji",
        "hajhdjh8378-092jhfhy",
        "1231rrer2",
        "fgiuo&fhg",
        "-_**hf",
        "**-_798"
    };
    char buf[16];
    char temp[]="%*[0-9]%[^0-9]";
    char temp1[]="%*[0-9a-zA-Z_-]%[^0-9a-zA-Z_-]";
    int len;
    int i;
    for( i = 0 ; i < num ; i++){
        len = sscanf(str[i],temp1,buf);
        printf("the %d is %s and match is %d and buf is %s\r\n",i,str[i],len,buf);
    }
    for( i = 0 ; i < num ; i++){
        len = sscanf(str[i],temp,buf);
        printf("the %d is %s and match is %d and buf is %s\r\n",i,str[i],len,buf);
    }
    return 0;
}