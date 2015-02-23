function obspec(nu0,N,Nfft,fen); % fonction sans paramètre de sortie

% créer un sinus de fréq. réduite 0
% construction du signal
n = 0:N-1 ;
x = sin(2*pi*nu0*n)';

w = hanning(N); % crée une fenêtre de Hanning sous forme de vecteur colonne
% la longueur du signal
i=fft(x.*w,Nfft); % calcule la fft de x fenêtré par w sur Nfft points
fre=(0:1/1023:1)';
plot(fre,abs(i));

end

