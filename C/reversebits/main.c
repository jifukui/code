#include<stdio.h>
static unsigned long rev(unsigned long v) 
{
    unsigned long s = 8 * sizeof(v); // bit size; must be power of 2
    unsigned long mask = ~0;
    /***/
    while ((s >>= 1) > 0) 
    {
        mask ^= (mask << s);
        v = ((v >> s) & mask) | ((v << s) & ~mask);
    }
    return v;
}
int main()
{
    unsigned long data=1;
    data=rev(data);
    printf("The data is %ld\n",data);
    return 0;
}