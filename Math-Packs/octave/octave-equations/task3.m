function [x, y] = task3 ()
  ## your code here
  sol = fsolve(@f, [0,2]);
  x = sol(1);
  y = sol(2);
endfunction

function y = f(x)
      y(1) = x(1)+sin(x(2))-1;
      y(2) = x(2)+cos(x(1))-1;
endfunction