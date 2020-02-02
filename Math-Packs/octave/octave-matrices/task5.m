function E = task5 ()
  n = 9;
  base_vec = (linspace(1, n, n))';
  E = linspace(base_vec, base_vec*n, n);
endfunction