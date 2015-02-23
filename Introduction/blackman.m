function w = blackman(N)
%BLACKMAN   Blackman window.
%   BLACKMAN(N) returns the N-point symmetric Blackman window in a column
%   vector.

alpha = 0.16;
n = (0:N-1)';
w = (1-alpha)/2 - 0.5*cos(2*pi*n/(N-1)) + alpha/2*cos(4*pi*n/(N-1));