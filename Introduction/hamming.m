function w = hamming(N)
%HAMMING   Hamming window.
%   HAMMING(N) returns the N-point symmetric Hamming window in a column vector.

n = (0:N-1)';
w = 0.54 - 0.46*cos(2*pi*n/(N-1));