%Tracer TFD de w
Nw=15;
w=hann(Nw);
tfdw=abs(fft(w,2048));
plot(tfdw);