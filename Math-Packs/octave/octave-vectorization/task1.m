function y = task1 (a, x)
  ## your code here
  vect = linspace(0, length(a)-1, length(a));
  x = linspace(x, x, length(a));
  x = x.^vect;
  y = a*x';
endfunction

#############################################
##                Test code                ##
##     Do not delete it or correct it!     ##
#############################################
%!test                                     ##
%!  a = [1, 2, -2, 4], x = 1               ##
%!  y = task1 (a, x)                       ##
%!test                                     ##
%!  a = [1, -6, 0, -4, 5], x = -4          ##
%!  y = task1 (a, x)                       ##
%!test                                     ##
%!  a = 5, x = -10                         ##
%!  y = task1 (a, x)                       ##
#############################################