function X = task2 (x)
  ## your code here
  matr = linspace(x,x,length(x));
  X = matr - matr';
endfunction

#############################################
##                Test code                ##
##     Do not delete it or correct it!     ##
#############################################
%!test                                     ##
%!  x = randi ([-10, 10], 4, 1)            ##
%!  X = task2 (x)                          ##
%!test                                     ##
%!  x = randi ([0, 50], 7, 1)              ##
%!  y = task2 (x)                          ##
%!test                                     ##
%!  x = 10                                 ##
%!  X = task2 (x)                          ##
#############################################