function w = hanning(N)
%HANNING   Hanning window.
%   HANNING(N) returns the N-point symmetric Hanning window in a column
%   vector.

n = (0:N-1)';
w = 0.5 * (1 - cos(2*pi*n/(N-1)));