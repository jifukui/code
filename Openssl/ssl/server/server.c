#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
int main(){
    int socketfd ;
    sockaddr_in my_addr ;
    sockaddr_in other_addr ;
    int ret;
    int sin_size;
    sin_size = sizeof(sockaddr_in);
    socketfd = socket(AF_INET,SOCK_STREAM,0);
    if(socketfd==-1)
    {
        printf("have error for socket\r\n");
        return 0;
    }
    my_addr.sin_family = AF_INET;
    my_addr.sin_port = htons(4000);
    my_addr.sin_addr.s_addr = inet_addr("0.0.0.0");
    bzero(&(my_addr.sin_zero), 8);
    ret = bind (sockfd, (struct sockaddr *)&my_addr, sizeof(struct sockaddr));
    if(ret == -1){
        printf("have error for bind\r\n");
        return 0;
    }
    ret = listen(socketfd,1);
    if(ret == -1){
        printf("have error for listen\r\n");
        return 0;
    }
    while (1)
    {
        char data[500];
        char value[] =  "hello this is jifukui\r\n";
        ret = accept(socketfd,&other_addr, &sin_size);
        if(ret != -1){
            printf("good for accept\r\n");
        }
        ret = recv(socketfd,data,500,0);
        if(ret>0){
            printf("good get data is %s\r\n",data);
            send(socketfd,value,strlen(value),0);
        }
    }
    return 0;

}