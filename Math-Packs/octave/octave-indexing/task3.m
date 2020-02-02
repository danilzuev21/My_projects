function x1 = task3 (x)
  x1 = x(mod(x,3) == 0);
endfunction

#####################################
##            Test code            ##
## Do not delete it or correct it! ##
#####################################
%!test                             ##
%!  x = randi ([0, 70], 1, 10)     ##
%!  x1 = task3 (x)                 ##
%!test                             ##
%!  y = randi ([-50, 50], 1, 16)   ##
%!  y1 = task3 (y)                 ##
%!test                             ##
%!  z = randi ([-50, 100], 1, 20)  ##
%!  z1 = task1 (z)                 ##
%!test                             ##
%!  t = []                         ##
%!  E1 = task1 (t)                 ##
#####################################