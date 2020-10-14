#include<stdio.h>
int main()
{
     int arr[50],n,search;
     printf("Enter no. of element\n");
     scanf("%d",&n);
     printf("Enter the array element");
     for(int i=0;i<n;i++)
     {
          scanf("%d",&arr[i]);
     }
     printf("Enter element those you want to search");
     scanf("%d",&search);
     int first = 0;
     int last = n-1;
     int middle =(first+last)/2;
     while(first<=last)
     {
          if(arr[middle]<search)
          {
               first = middle + 1;
          }
          else if(arr[middle]==search)
          {
               printf("position:%d",middle+1);
               break;
          }
          else{
               last = middle - 1;
          }
          middle = (first+last)/2;
     }
     if(first>last){
          printf("not found");
     }
     return 0;
}