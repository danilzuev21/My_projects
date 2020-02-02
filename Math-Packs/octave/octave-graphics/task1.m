function [x, y] = task1 ()
  ## your code here
  x = -2*pi:0.1:2*pi;
  y = sin(x)+sin(3*x);
  plot(x,y);
endfunction