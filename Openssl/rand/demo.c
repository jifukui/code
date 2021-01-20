#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <openssl/ssl.h>
#include <openssl/rand.h>
const int rand_num = 16 ;
const int rand_len = 64 ;
const int out_len  = 32 ;
int main(){
    printf("the max number is %u\r\n",RAND_MAX);
    time_t *t;
    int i = 0 , ret ;
    unsigned int value = 0;
    char data[rand_num];
    char out[out_len];
    srand((unsigned int ) time(t));
    for(i = 0 ; i < rand_num ; i++ ){
        //do{
            data[i] = (unsigned char) (rand() % 128);
        //}while(data[i] == 0);
        printf("the i is %u and the value is %u\r\n",i,data[i]);
    }
    //data[rand_num-1] = 0 ;
    RAND_add(data,rand_len,rand_num);
    RAND_seed(data,rand_len);
    while(1)
	{
		ret=RAND_status();
		if(ret==1)
		{
			printf("seeded enough!\n");
			break;
		}
		else	
		{
			printf("not enough sedded!\n");
			RAND_poll();
		}
	}
	do{
        ret=RAND_bytes(out, out_len);
    }while(ret!=1);	
	printf("rand data: \r\n");
	for (i = 0; i < out_len; i++){
		printf("%02x ", out[i]);
	}
	RAND_cleanup();
    return 0;
}