clear all;
Fe=48000;
t=(0:10*Fe-1)/Fe;
T=1/Fe;





%décimation
y=x(1:M:end);
%insertion
y=zeros(L*length(x(:)));
y(1:L:end)=x;