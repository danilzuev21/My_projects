function C1 = task6 (C)
  C(mod(C, 2) == 1)*=2;
  C1 = C;
endfunction


#############################################
##                Test code                ##
##     Do not delete it or correct it!     ##
#############################################
%!test                                     ##
%!  C = randi ([-50, 50], 1, 25)           ##
%!  C1 = task6 (C)                         ##
%!test                                     ##
%!  D = randi ([-50, 50], 5, 15)           ##
%!  D1 = task6 (C)                         ##
%!test                                     ##
%!  E = []                                 ##
%!  E1 = task6 (E)                         ##
%!test                                     ##
%!  F = randi ([-100, 100], 10)            ##
%!  F1 = task6 (F)                         ##
#############################################