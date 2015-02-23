
function estimation(x,N,M); 
j=x(1:N);
w = hanning(N); % crée une fenêtre de Hanning sous forme de vecteur colonne
%TFD du signal
y=fft(j,M);
%caculer Ix
Ix=y.*conj(y);
plot(Ix);

end