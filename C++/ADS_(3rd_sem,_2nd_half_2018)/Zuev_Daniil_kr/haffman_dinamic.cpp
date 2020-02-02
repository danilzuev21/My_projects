#include <iostream>
#include <cmath>
#include <cstring>
#include <sstream>
#include <fstream>
#include "haffman_dinamic.hpp"

using namespace std;

bin_tree* create()
{
    bin_tree* bt;
    bt = new bin_tree;
    bt->parent = NULL;
    bt->left = NULL;
    bt->right = NULL;
    bt->weight = 0;
    bt->el = '\n';
    bt->path = "";
    return bt;
}
bin_tree* create_node(bin_tree* btnul,char x)
{
    bin_tree* bt_left;
    bt_left = create();
    bt_left->parent = btnul;

    bin_tree* bt_right;
    bt_right = create();
    bt_right->el = x;
    bt_right->parent = btnul;

    btnul->left = bt_left;
    btnul->right = bt_right;
    btnul->right->parent = btnul;
    btnul->el = char(0);
    return btnul;
}
string path_redefenition(bin_tree* bt)
{
    string a;
    if(bt->parent == NULL)
        return "";
    a = path_redefenition(bt->parent);
    if(bt->parent->left == bt)
        a = a + '0';
    else
        a = a + '1';
    return a;
}
string char_to_bin(char x)
{
    int a = (int)x;
    string bin;
    while(a)
    {
        char b;
        b = '0' + a%2;
        a = a/2;
        bin = b + bin;
    }
    bin = '0' + bin;
    return bin;
}
bin_tree** comparison(bin_tree* list[], int& size, bin_tree* bt)
{
    bt->weight+=1;
    for(int i = 0; i<size-2;i++)
    {
        if(list[i]->weight > list[i+1]->weight)
        {
            int j = i+1;
            while(list[i]->weight > list[j]->weight)
                j++;
            j--;
            bin_tree* tmpl;
            bin_tree* tmpr;
            int tmpi;
            char tmpel;
            if(list[i]->parent == list[j])
                return comparison(list, size, list[j]);
            tmpl = list[j]->left;
            tmpr = list[j]->right;
            tmpi = list[j]->weight;
            tmpel = list[j]->el;
            list[j]->left = list[i]->left;
            list[j]->right = list[i]->right;
            list[j]->weight = list[i]->weight;
            list[j]->el = list[i]->el;
            list[i]->left = tmpl;
            list[i]->right = tmpr;
            list[i]->weight = tmpi;
            list[i]->el = tmpel;
            if(list[i]->left != NULL)
                list[i]->left->parent = list[i];
            if(list[j]->left != NULL)
                list[j]->left->parent = list[j];
            if(list[i]->right != NULL)
                list[i]->right->parent = list[i];
            if(list[j]->right != NULL)
                list[j]->right->parent = list[j];
            return comparison(list, size, list[j]->parent);
        }
    }
    if(bt->parent!=NULL)
    {

        list = comparison(list, size, bt->parent);
    }
    return list;
}
bin_tree** get_new(char a, bin_tree* btnul, bin_tree* list[], int &size)
{
    btnul = create_node(btnul, char(a));

    bin_tree** list1;
    list1 = new bin_tree*[size+2];
    list1[0] = btnul->left;
    list1[1] = btnul->right;
    size+=2;
    for(int i = 2; i<size; i++)
    {
        list1[i] = list[i-2];
    }
    return comparison(list1, size, btnul->right);
}
string code(stringstream& xstream, string* accordance)
{
    string a;
    int j = 0;
    string bin_code;
    char x;
    bin_tree** list;
    list = new bin_tree*[1];
    int size = 1;
    bin_tree* bt;
    bt = create();
    bt->parent = NULL;
    list[0] = bt;
    while(xstream>>x)
    {
        int i;
        for(i = size-1; i>=0; i--)
        {
            if(list[i]->el == x)
            {
                i--;
                break;
            }
        }
        i++;
        a+=list[i]->path;
        if(list[i]->el == '\n')
        {
            bin_code = char_to_bin(x);
            accordance[j]+=x;
            accordance[j]+=" - ";
            accordance[j]+=bin_code;
            j++;
            a+=bin_code;
            list = get_new(x,list[i],list,size);
        }
        else
        {
            list = comparison(list, size, list[i]);
        }
        for(i = 0;i<size;i++)
            list[i]->path = path_redefenition(list[i]);
    }
    return a;
}
string generate(int count, int length)
{
    string str;
    int a;
    char c;
    for(int i = 0;i<length;i++)
    {
        a = rand()%count;
        c = 'a'+a;
        str+=c;
    }
    return str;
}
