#include <iostream>
#include <sstream>
#include <fstream>

using namespace std;

typedef char base;
struct s_expr;
struct  two_ptr
{
    s_expr *hd;
    s_expr *tl;
};
struct s_expr
{
    bool tag;
    union
    {
        base atom;
        two_ptr pair;
    }node;
};
typedef s_expr *lisp;

lisp head (const lisp s);
lisp tail (const lisp s);
lisp cons (const lisp h, const lisp t);
lisp make_atom (const base x);
bool isAtom (const lisp s);
bool isNull (const lisp s);
void destroy (lisp s);
void read_lisp ( lisp& y, stringstream &xstream);
void read_s_expr (base prev, lisp& y, stringstream &xstream);
void read_seq ( lisp& y, stringstream &xstream);
void write_lisp (const lisp x);
void write_seq (const lisp x);

bool res(lisp s, char x){
    if (isNull(s)) return false;
    if (isAtom(s))
        return x == s->node.atom;
    else
        if(isNull(tail(s)))
        {
            if(!isNull(head(s)))
                return res(head(s),x);
            else
                return 0;
        }
        if(isNull(head(s)))
            return res(tail(s),x);
        return res(tail(s),x)+res(head(s),x);
}


int main()
{
    stringstream xstream;
    bool b;
    lisp s = NULL;
    char x;
    string str;
    char str0[100];
    short int tmp = 0;
    while(tmp != 3)
    {
        xstream.str("");
        xstream.clear();
        cout<<"Введите 1, если желаете вводить выражение с клавиатуры.\n"
              "Введите 2, если желаете брать выражение из файла test.txt.\n"
              "Введите, 3 если хотите закончить работу."<<endl;
        cin>>tmp;
        switch(tmp){
            case 1:
            {
                b = 1;
                cout<<"Введите искомый элемент X\n";
                cin >> x;
                cout << "Введите list1: \n";
                cin.get();
                cin.getline(str0, 1000);
                xstream << str0;
                break;
            }
            case 2:
            {
                b = 1;
		cout<<"Введите искомый элемент\n";
		cin>>x;
                ifstream outfile;
                outfile.open("test.txt");
                if (!outfile)
                {
                    cout << "Входной файл не открыт!\n";
                    b = 0;
                    break;
                }
                outfile.read(str0, 1000);
                outfile.close();
                xstream << str0;
                break;
            }
            case 3:
            {
                b = 0;
                break;
            }
            default:
            {
                cout<<"Введите верное число\n";
                break;
            }
        }
	try
	{
	    read_lisp (s, xstream);
	}
	catch(int a)
	{
	    b = 0;
	    switch(a){
		case 1:cerr << "Memory not enough\n"; break;
		case 2:cerr << "Error: the initial brace is closing\n"; break;
		case 3:cerr << "Error: there is no closing bracket\n"; break;
	    }
	    continue;
	}
        if(b)
        {
            cout << "Введен list1: \n";
            write_lisp (s);
            cout<<endl;
            cout << "Произведен поиск элемента: \n";
            if(res(s,x))
                cout<<"Элемент Х найден.\n";
            else
                cout<<"Элемент Х не найден.\n";
            destroy(s);
        }
    }
    return 0;
}

lisp head(const lisp s)
{
    if (s != NULL)
        return s->node.pair.hd;
    else
    {
        return NULL;
    }
}

bool isAtom(const lisp s)
{
    if(s == NULL)
        return false;
    else
        return (s -> tag);
}

bool isNull (const lisp s)
{
    return s==NULL;
}

lisp tail(const lisp s)
{
    if (s != NULL)
        return s->node.pair.tl;
    else
    {
        return NULL;
    }
}

lisp cons(const lisp h, const lisp t)
{
    lisp p;
    p = new s_expr;
    if ( p == NULL) throw 1;
    else {
        p->tag = false;
        p->node.pair.hd = h;
        p->node.pair.tl = t;
        return p;
    }
}


lisp make_atom(const base x)
{
    lisp s;
    s = new s_expr;
    s -> tag = true;
    s->node.atom = x;
    return s;
}


void destroy (lisp s)
{
    if ( s != NULL)
    {
        if (!isAtom(s))
        {
            destroy ( head (s));
            destroy ( tail(s));
        }
        delete s;
    }
}

void read_lisp ( lisp& y, stringstream &xstream)
{
    base x;
    do
        xstream >> x;
    while (x==' ');
    if(x)
        read_s_expr ( x, y, xstream);
}

void read_s_expr (base prev, lisp& y, stringstream &xstream)
{
    if ( prev == ')' ) throw 2;
    else
        if ( prev != '(' )
            y = make_atom (prev);
         else read_seq (y, xstream);
}

void read_seq ( lisp& y, stringstream &xstream)
{
    base x;
    lisp p1, p2;

    if (!(xstream >> x)) throw 3;
    else
    {
        while  ( x==' ' )
            xstream >> x;
        if ( x == ')' )
            y = NULL;
        else
        {
            read_s_expr ( x, p1, xstream);
            read_seq ( p2, xstream);
            y = cons (p1, p2);
        }
    }
}

void write_lisp (const lisp x)
{
    if (isNull(x))
        cout << " ()";
    else
        if (isAtom(x))
            cout << ' ' << x->node.atom;
        else
        {
            cout << " (" ;
            write_seq(x);
            cout << " )";
        }
}

void write_seq (const lisp x)
{
    if (!isNull(x))
    {
        write_lisp(head (x));
        write_seq(tail (x));
    }
}
