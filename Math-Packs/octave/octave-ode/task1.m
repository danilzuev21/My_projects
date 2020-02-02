function [x, y1, y2] = task1 ()
  x = linspace(0,1,100);
  y1 = lsode(@f,1,x);
  y2 = exp(-2*x) + x/2;
  plot(x, y1);
  hold on;
  plot(x, y2);
endfunction
function ydot = f(y, x)
  ydot = x+0.5-2*y;
endfunction