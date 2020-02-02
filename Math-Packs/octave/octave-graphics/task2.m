function [x, y] = task2 ()
  ## your code here
  x = -2*pi:0.1:2*pi;
  vect = 1:1:10;
  vect2 = 1./vect;
  vect = vect'*x;
  vect = sin(vect);
  y = sum(vect2'.*vect);
  plot(x,y);
endfunction