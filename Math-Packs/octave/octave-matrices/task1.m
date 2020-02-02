function A = task1 ()
    n = 10;
    vec = linspace(1, 1, n);
    matr = zeros(n-1, n);
    A = [vec; matr];
endfunction