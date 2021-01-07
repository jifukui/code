#include <libusb.h>
int main(){
    libusb_version * version = NULL;
    version = libusb_get_version();
    if(version){
        printf("the major is %d\r\n",version.major);
    }else{
        printf("Get Version have error\r\n");
    }
}