function y = dd(k, n, m, x)
%	Lagrange interpolation coefficients

y = 1;
q = x(k);
for l=1:m
	xx = 2*(q - x(l:m:n));
	y = y*prod(xx(xx ~= 0));
end
y=1/y;

