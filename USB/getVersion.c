#include <libusb-1.0/libusb.h>
#include <stdio.h>
int main(){
    struct libusb_version * version = NULL;
    version = libusb_get_version();
    if(version){
        printf("the major is %d\r\n",version->major);
        printf("the minor is %d\r\n",version->minor);
        printf("the micro is %d\r\n",version->micro);
        printf("the nano is %d\r\n",version->nano);
        printf("the rc is %s\r\n",version->rc);
        printf("the describe is %s\r\n",version->describe);
    }else{
        printf("Get Version have error\r\n");
    }
}