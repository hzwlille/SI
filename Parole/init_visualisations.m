
% Initialisation de la visualisation
largeur_ecran = 1024;
hauteur_ecran =  768;
% largeur_ecran = 1280;
% hauteur_ecran = 1024;
largeur_ecran = 1024;
hauteur_ecran =  768;
x1_visu = 10;
y1_visu = 40;
nbre_lignes = 3;
nbre_colonnes = 4;
ecart_hor = 11;
ecart_ver = 30;
largeur = (largeur_ecran - 2*x1_visu - (nbre_colonnes-1)*ecart_hor)/nbre_colonnes;
hauteur = (hauteur_ecran - y1_visu - nbre_lignes*ecart_ver)/nbre_lignes;
x2_visu = x1_visu + largeur + ecart_hor;
x3_visu = x2_visu + largeur + ecart_hor;
x4_visu = x3_visu + largeur + ecart_hor;
y2_visu = y1_visu + hauteur + ecart_ver;
y3_visu = y2_visu + hauteur + ecart_ver;  
figure(1); clf; set(1,'Position', [x1_visu y3_visu 2*largeur+ecart_hor hauteur], 'MenuBar', 'none')
figure(2); clf; set(2,'Position', [x1_visu y2_visu largeur hauteur], 'MenuBar', 'none')
figure(3); clf; set(3,'Position', [x2_visu y2_visu largeur hauteur], 'MenuBar', 'none')
figure(4); clf; set(4,'Position', [x1_visu y1_visu 2*largeur+ecart_hor hauteur], 'MenuBar', 'none')
