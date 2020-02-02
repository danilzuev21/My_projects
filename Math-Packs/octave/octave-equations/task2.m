function x = task2 ()
  x = fzero(@(x) x+sin(x)-1,0.5);
endfunction