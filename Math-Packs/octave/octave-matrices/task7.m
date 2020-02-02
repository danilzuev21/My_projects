function G = task7 (n)
G = ones(n);
for i = 2:2:n
  G(i:n,i)+=1;
  G(i, i+1:n)+=1;
endfor
endfunction

#####################################
##            Test code            ##
## Do not delete it or correct it! ##
#####################################
%!test G1 = task7 (5)              ##
%!test G2 = task7 (1)              ##
%!test G3 = task7 (2)              ##
%!test G4 = task7 (8)              ##
%!test G5 = task7 (0)              ##
#####################################