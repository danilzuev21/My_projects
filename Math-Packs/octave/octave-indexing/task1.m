function A1 = task1 (A)
  A1 = A(1:columns(A)/2, 1:columns(A)/2);
endfunction

#####################################
##            Test code            ##
## Do not delete it or correct it! ##
#####################################
%!test                             ##
%!  A = randi (15, 4)              ##
%!  A1 = task1 (A)                 ##
%!test                             ##
%!  B = randi (20, 8)              ##
%!  B1 = task1 (B)                 ##
%!test                             ##
%!  C = randi (100, 14)            ##
%!  C1 = task1 (C)                 ##
%!test                             ##
%!  E = []                         ##
%!  E1 = task1 (E)                 ##
#####################################