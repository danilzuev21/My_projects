#include <iostream>

using namespace std;

struct point{
    int x;
    int y;
};

class square{
private:
    unsigned short int size;
    bool** is_empty;
    int* min;
    unsigned short int minnum;
    unsigned short int num;
    int* current;
public:
    point search_empty(){
        point empty;
        for(int x = 0; x < size; x++)
        {
            for(int y = 0; y < size; y++)
                if(is_empty[x][y] == 0)
                {
                    empty.x = x;
                    empty.y = y;
                    return empty;
                }
        }
        empty.x = size+1;
        empty.y = size+1;
        return empty;
    }
    square(unsigned short int n):size(n),is_empty(size ? new bool*[size] : nullptr), min(size ? new int[3*size*size] : nullptr),minnum(size*size+1),num(0),current(size ? new int[3*size*size] : nullptr),number_op(0)
    {
        for(int i = 0; i<size;i++)
        {
            is_empty[i] = new bool[size];
            for(int j = 0; j<size; j++)
                is_empty[i][j] = false;
        }
    }
    ~square(){
        for(int i = 1;i<size;i++)
            delete [] is_empty[i];
        delete [] is_empty;
        delete [] min;
        delete [] current;
    }
    void add(point p, unsigned short int s)
    {
        current[num*3] = p.x+1;
        current[num*3+1] = p.y+1;
        current[num*3+2] = s;
        num++;
        for(int i = p.x; i < p.x+s ; i++)
            for(int j = p.y ; j < p.y+s ; j++)
                is_empty[i][j] = true;
    }
    void backtrack(point p, int s)
    {
        current[num*3] = 0;
        current[num*3+1] = 0;
        current[num*3+2] = 0;
        num--;
        for(int i = p.x; i < p.x+s ; i++)
            for(int j = p.y ; j < p.y+s ; j++)
                is_empty[i][j] = false;
    }
    void search()
    {
        for(int i = size-1;i>0;i--)
        {
            point p = search_empty();
            if(p.x > size || p.y > size)
            {
                if(num < minnum)
                {
                    for(int j = 0; j < num*3;j++)
                    {
                        min[j] = current[j];
                    }
                    minnum = num;
                }
                break;
            }
            if(num+1 == minnum)
            {
                break;
            }
            int a;
            int b;
            for(a = p.x; a<size;a++)
                if(is_empty[a][p.y] != false)
                    break;
            for(b = p.y; b<size;b++)
                if(is_empty[p.x][b] != false)
                    break;
            if(a - p.x < i || b - p.y  <i)
            {
                i = a - p.x  > b - p.y ? b - p.y : a - p.x;
            }
            add(this->search_empty(),i);
            this->search();
            this->backtrack(p,i);
        }
    }
    void set_first()
    {
        point first_sq{0,0};
        point second_sq{0,0};
        point third_sq{0,0};
        if(!(size%2))
        {
            add(first_sq, size/2);
            second_sq.x = size/2;
            third_sq.y = size/2;
            add(second_sq,size/2);
            add(third_sq,size/2);
            return;
        }
        if(!(size%3))
        {
            add(first_sq, 2*size/3);
            second_sq.x = 2*size/3;
            third_sq.y = 2*size/3;
            add(second_sq,size/3);
            add(third_sq,size/3);
            return;
        }
        if(!(size%5))
        {
            add(first_sq, 3*size/5);
            second_sq.x = 3*size/5;
            third_sq.y = 3*size/5;
            add(second_sq, 2*size/5);
            add(third_sq,2*size/5);
            return;
        }
        add(first_sq, size/2+1);
        second_sq.x = size/2+1;
        third_sq.y = size/2+1;
        add(second_sq,size - (size/2+1));
        add(third_sq,size - (size/2+1));
        return;
    }

    void print()
    {
        cout<<minnum<<endl;
        for(int j = 0; j<minnum;j++)
        {
            for(int k = 0; k<3; k++)
                cout<<min[j*3 + k]<<' ';
            cout<<endl;
        }
    }
};

int main()
{
    int n;
    cin>>n;
    square s(n);
    s.set_first();
    s.search();
    s.print();
}
