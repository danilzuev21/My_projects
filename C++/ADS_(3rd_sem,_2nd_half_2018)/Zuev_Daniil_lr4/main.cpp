#include <iostream>
#include <sstream>
#include <fstream>
#include <cstring>
#include <exception>
#include <cstdlib>

using namespace std;

class error5: public exception
{
public:
    explicit error5(const char* a)
        {this->a=a; }

    virtual const char* what() const throw()
    { return "Wrong character.\n"; }
    void printErr()
    {
        cout<<"The character \""<<a<<"\" is not int.\n";
    }
private:
    const char* a;
};

/*-------------------------БИНАРНОЕ ДЕРЕВО---------------------------------------*/
template <typename T>
class BTree
{
private:
    BTree* left;
    BTree* right;
    T node;
public:
    BTree(){left = NULL; right = NULL;}
    ~BTree(){delete left; delete right;}
    T Root();
    BTree* Left();
    BTree* Right();
    BTree* cons(T ,BTree* ,BTree* );
};
template<typename T>
T BTree<T>::Root()
{
    return node;
}
template<typename T>
BTree<T>* BTree<T>::Left(){
    return left;
}
template<typename T>
BTree<T>* BTree<T>::Right()
{
    return right;
}
template<typename T>
BTree<T>* BTree<T>::cons(T root,BTree* BTl,BTree* BTr)
{
    BTree<T>* BT;
    BT = new BTree<T>;
    BT->node = root;
    BT->left = BTl;
    BT->right = BTr;
    return BT;
}
template <typename T>
BTree<T>* read_binTree(stringstream &xstream)
{
    T t;
    BTree<T>* BT;
    BT = new BTree<T>;
    char x;
    char* a;
    a = new char[10];
    if(!(xstream>>x))
        throw logic_error("The end of the line at the place where the subtree should be met.\n");
    if(x == '#')
        return NULL;
    if(x == '(')
    {
        a[0] = xstream.get();
        if(!atof(a))
        {
            xstream.putback(a[0]);
            if(!(xstream>>t)||t==')'||t=='(')
            {
                if(a[0] == '(' || a[0]==')')
                    throw invalid_argument("Missing node.\n");
                else throw invalid_argument("An item with invalid type was encountered.\n");
            }
        }
        else
        {
            xstream.putback(a[0]);
            if(!(xstream>>t))
                    throw logic_error("Missing node.\n");
        }
        if(xstream.peek() != '(' && xstream.peek() != ')' && xstream.peek() != '#' && xstream.peek() != EOF)
            throw invalid_argument("An item with invalid type was encountered.\n");
        BTree<T>* left;
        BTree<T>* right;
        if(xstream.peek()==')')
        {
            left = NULL;
            right = NULL;
        }
        else
        {
            if (xstream.peek() == EOF) throw invalid_argument("Missing closing backet!\n");
            left = read_binTree<T>(xstream);
            right = read_binTree<T>(xstream);
        }
        xstream>>x;
        if (!(x == ')')) throw invalid_argument("Missing closing backet!\n");
        BT = BT->cons(t, left, right);
    }
    else throw invalid_argument("Missing opening bracket!\n");
    return BT;
}
template<typename T>
int print_BTree(BTree<T>* BT, int t)
{
    if(BT != NULL)
    {
        t++;
        print_BTree(BT->Right(),t);
        for(int j = 0; j<t-1;j++)
            cout<<'\t';
        cout<<BT->Root()<<endl;
        print_BTree(BT->Left(),t);
    }
    else
        cout<<endl;
    return 0;
}
/*------------------------------------ЛЕС----------------------------------------*/
template<typename T>
class Forest;

template<typename T>
struct tree{
    T node;
    Forest<T>* f;
};

template<typename T>
class Forest
{
private:
    tree<T>* t;
    Forest* f;
public:
    Forest()
    {
        t = NULL;
        f = NULL;
    }
    ~Forest(){delete t; delete f;}
    Forest* tail_forest();
    Forest* current_forest();
    T root();
    Forest* create_forest(tree<T>* ,Forest* );
    tree<T>* create_tree(T , Forest<T>* );
    Forest* sum(Forest<T>*, Forest<T>* );

};
template<typename T>
Forest<T>* Forest<T>::tail_forest()
{
    return f;
}
template<typename T>
Forest<T>* Forest<T>::current_forest()
{
    return t->f;
}
template<typename T>
T Forest<T>::root()
{
    return t->node;
}
template<typename T>
Forest<T>* Forest<T>::create_forest(tree<T>* t,Forest* f)
{
    Forest* fn;
    fn = new Forest;
    fn->t = t;
    fn->f = f;
    return fn;
}
template<typename T>
tree<T>* Forest<T>::create_tree(T node, Forest<T>* f)
{
    tree<T>* t;
    t = new tree<T>;
    t->node = node;
    t->f = f;
    return t;
}
template<typename T>
Forest<T>* Forest<T>::sum(Forest<T>* f1, Forest<T>* f2)
{
    Forest<T>* f;
    f = new Forest<T>;
    if(f1 != NULL)
        f = create_forest(f1->t, sum(f1->f,f2));
    else
        f = f2;
    return f;
}
template<typename T>
int print_Forest(Forest<T>* F, int t)
{
    if(F != NULL)
    {
        if(F->tail_forest() != NULL)
            print_Forest(F->tail_forest(), t);
        for(int j = 0; j<t;j++)
            cout<<'\t';
        cout<<F->root()<<endl;
        t++;
            print_Forest(F->current_forest(), t);
    }
    return 0;
}
template<typename T>
int print_width(Forest<T>* f1)
{
    Forest<T>* f2;
    f2 = NULL;
    while(f1 != NULL)
    {
        cout<<"| "<<f1->root()<<" |";
        f2 = f2->sum(f2,f1->current_forest());
        f1 = f1->tail_forest();
    }
    if(f2!=NULL)
        print_width(f2);
    return 0;
}
/*--------------------------ОСТАЛЬНЫЕ-ФУНКЦИИ------------------------------------*/
template<typename T>
Forest<T>* BinTree_to_Forest(BTree<T>* BT)
{
    tree<T>* TR;
    TR = new tree<T>;
    Forest<T>* F;
    F = new Forest<T>;
    if(BT->Left()!=NULL)
        TR = F->create_tree(BT->Root(),BinTree_to_Forest(BT->Left()));
    else
        TR = F->create_tree(BT->Root(), NULL);
    if(BT->Right() != NULL)
        F = F->create_forest(TR, BinTree_to_Forest(BT->Right()));
    else
        F = F->create_forest(TR, NULL);
    return F;
}

template<typename T>
void print_Trees(BTree<T>* BT, Forest<T>* F)
{
    cout<<"BinTree:\n";
    print_BTree(BT, 0);
    cout<<"Forest:\n";
    print_Forest(F, 0);
    cout<<"The BFS:\n";
    print_width(F);
    cout<<endl;
}

int main()
{
    stringstream xstream;

    short int tmp = 0;
    while(tmp != 3)
    {
        string type;
        string str0;
        string tmp1;
        try{
            xstream.str("");
            xstream.clear();
            cout<<"Введите 1, если желаете вводить выражение с клавиатуры.\n"
              "Введите 2, если желаете брать выражение из файла test.txt.\n"
              "Введите, 3 если хотите закончить работу."<<endl;
            getline(cin, tmp1);
            if(!atoi(tmp1.c_str() ))
                throw error5(tmp1.c_str());
            else tmp = atoi(tmp1.c_str());
            switch(tmp){
                case 1:
                {
                    cout<<"Введите тип данных:"<<endl;
                    getline(cin,type);
                    cout << "Введите формулу: \n";
                    getline(cin, str0);
                    xstream << str0;
                    break;
                }
                case 2:
                {
                    ifstream outfile;
                    outfile.open("test.txt");
                    if (!outfile)
                        throw runtime_error("File is not open.\n");
                    getline(outfile, type);
                    getline(outfile, str0);
                    outfile.close();
                    xstream << str0;
                    break;
                }
                case 3:
                    continue;
                default:
                    throw invalid_argument("You entered wrong number.\n");;
            }
            if(type == "char")
            {
                BTree<char>* BT;
                BT = new BTree<char>;
                BT = read_binTree<char>(xstream);
                Forest<char>* F;
                F = BinTree_to_Forest(BT);
                print_Trees(BT,F);
                continue;
            }
            if(type == "int")
            {
                BTree<int>* BT;
                BT = new BTree<int>;
                BT = read_binTree<int>(xstream);
                Forest<int>* F;
                F = BinTree_to_Forest(BT);
                print_Trees(BT,F);
                continue;
            }
            if(type == "float")
            {
                BTree<float>* BT;
                BT = new BTree<float>;
                BT = read_binTree<float>(xstream);
                Forest<float>* F;
                F = BinTree_to_Forest(BT);
                print_Trees(BT,F);
                continue;
            }
            if(type == "double")
            {
                BTree<double>* BT;
                BT = new BTree<double>;
                BT = read_binTree<double>(xstream);
                Forest<double>* F;
                F = BinTree_to_Forest(BT);
                print_Trees(BT,F);
                continue;
            }
            throw invalid_argument("Type is not correct.\n");
        }
        catch(error5& e)
        {
            cout<<e.what();
            e.printErr();
            continue;
        }
        catch(exception& e)
        {
            cout<<e.what();
            continue;
        }
    }
    return 0;
}
