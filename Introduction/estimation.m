
function estimation(x,N,M); 
j=x(1:N);
%TFD du signal
y=fft(j,M);
%caculer Ix
Ix=y.*conj(y);
plot(Ix);

end