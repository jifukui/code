#include <stdio.h>
int main
{
    int i=0;
    int flag;
    char val[6];
    char data[7][6]={
        "kmpt",
        "Kmpt",
        "kMpt",
        "kmPt",
        "kmpT",
        "KMPT",
        "kpt"
    };
    for(i=0;i<6;i++)
    {
        flag=sscanf(data[i],".%{k|K}{m|M}{p|P}{t|T}",val);
        if(flag)
        {
            printf("The flag is %d the str is %s",val);
        }
    }
    return 0;
}