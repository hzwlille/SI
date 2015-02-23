
function estimation(x,M); 

%TFD du signal
y=fft(x,1024);
%caculer Ix
Ix=y.*conj(y);
plot(Ix);

end