function x = task1 (n)
  ## your code here
  c = linspace(1,1,n+1);
  x = roots(c);
  plot(real(x)', imag(x)',"*");
endfunction