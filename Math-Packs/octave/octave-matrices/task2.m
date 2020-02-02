function B = task2 ()
  n = 10;
  B = zeros(n);
  B(1:2:n, 2:2:n) = 1;
  B(2:2:n, 1:2:n) = 1;
endfunction