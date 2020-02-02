function B1 = task2 (B)
  B1 = [B(rows(B)/2+1:rows(B),:); B(1:rows(B)/2,:)];
endfunction

#####################################
##            Test code            ##
## Do not delete it or correct it! ##
#####################################
%!test                             ##
%!  A = randi (50, 4, 9)           ##
%!  A1 = task2 (A)                 ##
%!test                             ##
%!  B = randi (100, 8)             ##
%!  B1 = task2 (B)                 ##
%!test                             ##
%!  C = randi (100, 14, 2)         ##
%!  C1 = task1 (C)                 ##
%!test                             ##
%!  E = []                         ##
%!  E1 = task1 (E)                 ##
#####################################