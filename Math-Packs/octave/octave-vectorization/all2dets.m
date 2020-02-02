function Y = all2dets (X)
  ## your code here
  matr = X(:,1)*(X(:,2))';
  Y = matr - matr';
endfunction

#############################################
##                Test code                ##
##     Do not delete it or correct it!     ##
#############################################
%!test                                     ##
%!  X = [5, 8];                            ##
%!  Y = all2dets (X)                       ##
%!test                                     ##
%!  X = [ 4,  6                            ##
%!        3, -4                            ##
%!       -3, 15                            ##
%!        0,  1                            ##
%!        2,  3]                           ##
%!  Y = all2dets (X)                       ##
#############################################