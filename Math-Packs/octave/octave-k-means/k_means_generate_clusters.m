function xy = k_means_generate_clusters (k)
  ## function creates 'k' clusters
  xy = [];
  
  for i = 1:k
    xy = [xy; generate_cluster(100)];
  endfor
endfunction

function xy = generate_cluster (n)
  ## the procedure creates one cluster
  ## with a random center and size
  m = rand (1, 2) * 50; # random center
  s = rand * 3 + 1; # random size
  xy = randn (n, 2) * s + m;
endfunction