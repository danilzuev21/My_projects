function a = sieve (n)
  ## your answer here
  function a = filter_multiples (a, k)
    a = a(!(a>k & mod(a, k) == 0));
  endfunction
  
  a = 1:n;
  i = 2;
  
  while (i < length (a))
    a = filter_multiples (a, a(i));
    i++;
  endwhile
endfunction
#эта функция оставляет в векторе a изначально
#состоящем из всех чисел от 1 до n
#только простые числа и единицу

#####################################
##            Test code            ##
## Do not delete it or correct it! ##
#####################################
%!test a = sieve (50)              ##
%!test a = sieve (100)             ##
%!test a = sieve (200)             ##
#####################################