function [sumH, meanH, meanH1] = task5 (Height)
  matr1 = Height(Height(:,2)==1, 1);
  matr2 = Height(Height(:,2)==2, 1);
  matr3 = Height(Height(:,2)==3, 1);
  matr4 = Height(Height(:,2)==4, 1);
  matr5 = Height(Height(:,2)==5, 1);
  sumH = [sum(matr1) 
          sum(matr2) 
          sum(matr3) 
          sum(matr4) 
          sum(matr5)];
  meanH = [mean(matr1) 
           mean(matr2)
           mean(matr3)
           mean(matr4)
           mean(matr5)];
  matr1 = matr1(matr1>=1 & matr1<=2);
  matr2 = matr2(matr2>=1 & matr2<=2);
  matr3 = matr3(matr3>=1 & matr3<=2);
  matr4 = matr4(matr4>=1 & matr4<=2);
  matr5 = matr5(matr5>=1 & matr5<=2);
  meanH1 = [mean(matr1)
            mean(matr2)
            mean(matr3)
            mean(matr4)
            mean(matr5)];
endfunction

#############################################
##                Test code                ##
##     Do not delete it or correct it!     ##
#############################################
%!test                                     ##
%!  Height = [0.90, 1                      ##
%!            0.94, 1                      ##
%!            1.00, 3                      ##
%!            1.73, 2                      ##
%!            0.20, 5                      ##
%!            1.90, 4                      ##
%!            1.76, 4                      ##
%!            1.65, 2                      ##
%!            0.85, 3                      ##
%!            1.63, 2                      ##
%!            0.11, 5];                    ##
%!  [sumH, meanH, meanH1] = task5 (Height) ##
#############################################