function F = task6 (n, a, b)
  matr1 = eye(n)*a;
  matr2 = [(linspace(0,0, n-1))' eye(n-1)*b; linspace(0,0, n)];
  F = matr1+matr2+matr2';
endfunction

#####################################
##            Test code            ##
## Do not delete it or correct it! ##
#####################################
%!test F1 = task6 (4, 1, 2)        ##
%!test F2 = task6 (1, 3, 8)        ##
%!test F3 = task6 (0, 1, 1)        ##
%!test F4 = task6 (5, -4, 9)       ##
#####################################