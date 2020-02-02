function [xs, xz, xe, dx] = task4 (a)
  ## your code here
  x0 = log(0.5*(a+sqrt(a^2+4)));
  xs = fsolve(@(x) exp(x)-exp(-x)-a, 0);
  xz = fzero(@(x) exp(x)-exp(-x)-a, [x0-1, x0+1]);
  xe = x0;
  dx = xe - xs;
endfunction