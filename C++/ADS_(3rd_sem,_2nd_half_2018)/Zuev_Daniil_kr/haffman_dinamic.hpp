#include <cstring>
#ifndef HAFFMAN_DINAMIC_HPP
#define HAFFMAN_DINAMIC_HPP

using namespace std;

struct bin_tree{
    bin_tree* parent;
    bin_tree* left;
    bin_tree* right;
    int weight;
    char el;
    string path;
};
bin_tree* create();
bin_tree* create_node(bin_tree* btnul,char x);
string path_redefenition(bin_tree* bt);
bin_tree** comparison(bin_tree* list[], int& size, bin_tree* bt);
bin_tree** get_new(char a, bin_tree* btnul, bin_tree* list[], int &size);
string code(stringstream& xstream, string* accordance);
string generate(int count, int length);

#endif // HAFFMAN_DINAMIC_HPP
