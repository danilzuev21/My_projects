function D = task4 ()
  n = 10;
  base_vec = linspace(1, n^2);
  D = (reshape(base_vec, n, n))';
endfunction