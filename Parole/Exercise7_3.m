signal_x_filtre=conv([1; a],signal_x);
spectro(signal_x_filtre,Fe,1024,20e-3,10e-3);