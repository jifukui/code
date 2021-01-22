#include <stdio.h>
#include <memory.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <unistd.h>
#include "pthread.h"
#include <openssl/crypto.h>
#include <openssl/x509.h>
#include <openssl/pem.h>
#include <openssl/ssl.h>
#include <openssl/err.h>

#define    MAX_T 1000
#define    CLIENTCERT       "certs/sslclientcert.pem"
#define    CLIENTKEY        "certs/sslclientkey.pem"
#define    CAFILE           "certs/cacert.pem"

static pthread_mutex_t *lock_cs;

static long *lock_count;

pthread_t pthreads_thread_id(void)
{
       pthread_t ret;
       ret=pthread_self();
       return(ret);
}
void pthreads_locking_callback(int mode, int type, char *file,int line)
{
        if (mode & CRYPTO_LOCK)
        {
            pthread_mutex_lock(&(lock_cs[type]));
            lock_count[type]++;
        }
        else
        {
            pthread_mutex_unlock(&(lock_cs[type]));
        }
}

int verify_callback(int ok, X509_STORE_CTX *ctx)
{
    printf("verify_callback\n");
    return ok;
}

int  SSL_CTX_use_PrivateKey_file_pass(SSL_CTX *ctx,char *filename,char *pass)
{
    EVP_PKEY    *pkey=NULL;
    BIO               *key=NULL;
    key=BIO_new(BIO_s_file());
    BIO_read_filename(key,filename);
    pkey=PEM_read_bio_PrivateKey(key,NULL,NULL,pass);
    if(pkey==NULL)
    {
        printf("PEM_read_bio_PrivateKey err");
        return -1;
    }
    if (SSL_CTX_use_PrivateKey(ctx,pkey) <= 0)
    {
        printf("SSL_CTX_use_PrivateKey err\n");
        return -1;
    }
    BIO_free(key);
    return 1;
}

 

void*thread_main(void *arg)
{
    int err,buflen,read;
    int sd;
    SSL_CTX *ctx=(SSL_CTX *)arg;
    struct sockaddr_in dest_sin;
    int sock;
    SSL               *ssl;
    X509             *server_cert;
    char     *str;
    char        buf [1024];
    SSL_METHOD     *meth;
    FILE              *fp;
    sock = socket(AF_INET, SOCK_STREAM, 0);
    dest_sin.sin_family = AF_INET;
    dest_sin.sin_addr.s_addr = inet_addr( "127.0.0.1" );
    dest_sin.sin_port = htons( 1111 );
again:
    err=connect( sock,&dest_sin, sizeof( dest_sin));
    if(err<0)
    {
        sleep(1);
        goto again;
    }
    ssl = SSL_new (ctx);                        
    if(ssl==NULL)
    {
        printf("ss new err\n");
        return ;
    }
    SSL_set_fd(ssl,sock);
    err = SSL_connect (ssl);                    
    if(err<0)
    {
        printf("SSL_connect err\n");
        return;
    }
    printf ("SSL connection using %s\n", SSL_get_cipher (ssl));
    server_cert = SSL_get_peer_certificate (ssl);      
    printf ("Server certificate:\n");
    str = X509_NAME_oneline (X509_get_subject_name (server_cert),0,0);
    printf ("\t subject: %s\n", str);
    OPENSSL_free (str);
    str = X509_NAME_oneline (X509_get_issuer_name  (server_cert),0,0);
    printf ("\t issuer: %s\n", str);
    OPENSSL_free (str);  
    X509_free (server_cert);
    err = SSL_write (ssl, "Hello World!", strlen("Hello World!"));
    if(err<0)
    {
        printf("ssl write err\n");
        return ;
    }
    SSL_shutdown (ssl);  /* send SSL/TLS close_notify */
    SSL_free (ssl);
    closesocket(sock);

}

int main ()
{
    int   err,buflen,read;
    int   sd;
    struct  sockaddr_in dest_sin;
    int sock;
    SSL_CTX *ctx;
    SSL  *ssl;   
    X509 *server_cert;
    char *str;   
    char buf [1024];
    SSL_METHOD *meth;  
    int i;
    pthread_t pid[MAX_T];  
    SSLeay_add_ssl_algorithms();
    meth = SSLv3_client_method();  
    SSL_load_error_strings();
    ctx = SSL_CTX_new (meth);    
    if(ctx==NULL)
    {
        printf("ssl ctx new eer\n");
        return -1;
    }
    if (SSL_CTX_use_certificate_file(ctx, CLIENTCERT, SSL_FILETYPE_PEM) <= 0)
    {
        ERR_print_errors_fp(stderr);
        exit(3);
    } 
    if (SSL_CTX_use_PrivateKey_file_pass(ctx, CLIENTKEY, "123456") <= 0)
    {
        ERR_print_errors_fp(stderr);
        exit(4);
    }
    lock_cs=OPENSSL_malloc(CRYPTO_num_locks() * sizeof(pthread_mutex_t));
    lock_count=OPENSSL_malloc(CRYPTO_num_locks() * sizeof(long));
    for (i=0; i<CRYPTO_num_locks(); i++)
    {
        lock_count[i]=0;
        pthread_mutex_init(&(lock_cs[i]),NULL);
    }
    CRYPTO_set_id_callback((unsigned long (*)())pthreads_thread_id);
    CRYPTO_set_locking_callback((void (*)())pthreads_locking_callback);
    for(i=0;i<MAX_T;i++)
    {           
        err=pthread_create(&(pid[i]),NULL,&thread_main,(void *)ctx);
        if(err!=0)
        {
            printf("pthread_create err\n");
            continue;
        }
    }
    for (i=0; i<MAX_T; i++)
    {
        pthread_join(pid[i],NULL);
    }
    SSL_CTX_free (ctx);
    printf("test ok\n");
    return 0;
}