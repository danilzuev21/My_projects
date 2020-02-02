function task4 ()
  ## your code here
  t = 0:0.1:2*pi+0.1;
  x = cos(t);
  y = sin(t);
  num = 1:10;
  plot(x'.*num,y'.*num);
endfunction