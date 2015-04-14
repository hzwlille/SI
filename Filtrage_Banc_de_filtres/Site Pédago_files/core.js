
var Try = {
 these: function () {
    for (var i = 0, X = arguments.length, r ; i < X ; i++)
      try{return arguments[i]();}catch(e) {}
    return null;
  }
};

function getXhr(){
  return Try.these(
            function(){return new XMLHttpRequest()},
            function(){return new ActiveXObject('Msxml2.XMLHTTP')},
            function(){return new ActiveXObject('Microsoft.XMLHTTP')}
            ) || false;
}

function sendData(method,url,data){
  var x = getXhr();
  if( !x ) return false;
  if( method == "GET" ){
    var t = !data ?  url : url + '?' + data; 
      x.open( "GET", t, true );
      x.send( null );
  }else if( method == "POST" ){
    x.open( "POST", url, true );
    x.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
    x.send( data );
  }
  return x;
}

function $(e){
  if( arguments.length > 1 ){
    for( var i = 0, X = arguments.length,  r = [] ; i < X ; i++ )
      r.push( $( arguments[i] ) );
    return r;
  }else
    return typeof e == "string" ? document.getElementById( e ) : false; 
}

function $E( n ){return document.createElement( n || "div" );}

function $T( c ){return document.createTextNode( c || "" );}

function $D( d ){
  var n = $( d );
  try{n.parentNode.removeChild( n );}catch( e ){return false}
}

function stripTag(s){return s.replace(/<\/?[^>]+>/gi,'');}

function getElementsByClass( cName, elType ){
  var tb = document.getElementsByTagName(elType);
  for( var i = 0, rtab = [], X = tb.length, j = 0 ; i < X; i++ ){
    if(tb[i].className == cName){
      rtab[j] = tb[i];
      j++;
    }
  }
  return rtab;
}

function $BC( cN, tn ){
  var tb = document.getElementsByTagName( tn || '*' ), tmp, rtb = [];
  for( var i = 0, X = tb.length, j = 0 ; i < X; i++ )
    if( ( tmp = tb[i].className ) == cN ){rtb[j++] = tb[i];}
    /* else if( /[\w\d]+\s+[\w\d]+/.test( tmp ) && tmp.indexOf( cN ) > -1 ) */
    /*   for( var k=0, t=tmp.split(/\s/), Y=t.length ; k < Y ; k++ ) */
    /* 	if( t[k] == cN ) rtb[j++] = tb[i]; */
 return rtb;
}

// @DEPRECATED HOOKed on $BC
// function getElementsByClass(cName,elType){ return $BC(cName,elType); }

function getScrollXY(){
  return Try.these(
		function(){return [document.documentElement.scrollLeft,document.documentElement.scrollTop];},
		function(){return [document.body.scrollLeft,document.body.scrollTop];},
		function(){return [window.pageXOffset,window.pageYOffset];}
		) || false;
}

Browser = {
 IE : !!(window.attachEvent && !window.opera),
 Opera : !!window.opera,
 WebKit : navigator.userAgent.indexOf('AppleWebKit/') > -1, 
 Gecko : navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('AppleWebKit/') == -1, 
 MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
};

function getClientSize(){
  return Browser.IE ? 
    [document.documentElement.clientWidth,document.documentElement.clientHeight]:
    [window.innerWidth,window.innerHeight] || false;
}

function checkMail(mail){
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( mail );
}

function innerPop(id,w,h,ctt,color,fcolor){
  var cs = getClientSize(),
    scr = getScrollXY(),
    mx = ( ( cs[0] / 2 ) + scr[0] ),
    my = ( ( cs[1] / 2 ) + scr[1] ),
    l = ( mx - ( w / 2 ) ),
    t = ( my - ( h / 2 ) ),
    e = $E(),
    c = $(id);
  e.innerHTML = ctt;
  e.id = 'TPCTT_'+id;
  e.style.marginTop = "1.5em";
  if( !c ){
    c = $E();
    c.id = id;
    c.innerHTML = "<div id='TPCLOSE' >"+
      "<img onclick=\"closePop('"+id+"');\" src='close.png' "+
      " style='position:absolute;top:3px;right:3px;padding:1px;cursor:pointer;border:1px solid black;'/>"+
      "</div>\n";
    c.appendChild(e);
    var bRef = document.getElementsByTagName("body").item(0);
    bRef.appendChild(c);
  }
  else{
    var p = $( 'TPCTT_'+id );
    if( p )
      c.removeChild(p);
    c.appendChild(e);
  }
  c.style.position = 'absolute';
  c.style.zIndex = '1111';
  c.style.width = w+"px";
  c.style.height = h+"px";
  c.style.left = l+"px";
  c.style.top = t+"px";
  c.style.display = "block";
  c.style.backgroundColor = color;
  c.style.color = fcolor;
  c.style.overflow = "auto";
  c.style.borderBottom = "1px solid black";
  c.style.borderRight = "1px solid black";
  c.style.borderTop = "1px solid #B2B2B2";
  c.style.borderLeft = "1px solid #B2B2B2";
  
  c.style.fontFamily = "verdana,sans-serif";
}

function closePop(id){
  $( id ).style.display = "none";
  $( 'TPCTT_'+id ).innerHTML = "";
}

function show(targetId,ONOFF){
  var tid=$(targetId);
  if(ONOFF=='ON') tid.style.display='block';
  if(ONOFF=='OFF') tid.style.display='none';
}

// function fill(targetId,InnerHTML){$(targetId).innerHTML=InnerHTML;}

function fill( id, c ){return apend( $( id ), c );}

function apend( el, ctt ){
  var tmp = el.getElementsByTagName( '*' );
  if( tmp && tmp.length > 0 )
    for( var i=0, X = tmp.length; i<X; i++ )
      try{el.removeChild( tmp[i] );}catch(e){}

//   el.innerHTML = "";
  var c = $E();
  c.innerHTML = ctt;
  el.appendChild( c );

//  el.innerHTML = ctt;
}


function empty(tarId){$(tarId).innerHTML='';}

function erase( d, cttId ){
  var n = $( d );
  try{n.parentNode.removeChild( n );}catch( e ){return false}
}
//-------------------------------------------------------------->
// SPECIFIK SP && COMMUN FRONT ET BACK !
//-------------------------------------------------------------->

function changeState(mId) {
    var d = $('IM'+mId);

    var tb = $BC('TOPMENU_W', 'a');
    for (var i = 0, tl = tb.length; i < tl; i++) {
        tb[i].className = "TOPMENU";
        //$('IM'+tb[i].id.substring(2)).src = "../images/menugch_puce-off.png";
    }

    var tb = $BC('TOPMENU', 'a');
    for (var i = 0, tl = tb.length; i < tl; i++) {
        if (tb[i].id == "ME"+mId) {
            tb[i].className = "TOPMENU_W";
        }
    }
}


function showSubMenu(subId) {
    var tb = $BC("SUBHIDER", "ul");
    for (var i = 0,X = tb.length; i < X; i++) {
        tb[i].style.display = (tb[i].id == "SMH"+subId) ? "block" : "none" ;
    }
}

function topMenu(mId){
    changeState(mId);
    showSubMenu(mId);
    getArticle(mId,'TOP');
}

function subMenu( mId ){
    getArticle(mId,'SUB');
    $('SME' + mId).parentNode.style.display = 'block';
    backer.changeH('SR'+ mId);
}

function newzJump(el){
    if( document.location == el.href ) window.location.reload();
    else{
        showSubMenu();
        changeState();
    };
}

/// AJAX [BACK / NEXT / RELOAD] handling
function gotHash(){
    if( /#R(\d+)/.test( window.location.hash ) ) return topMenu( RegExp.$1 );
    if( /#SR(\d+)/.test( window.location.hash ) ) return  subMenu( RegExp.$1 );
    if( /#(GET\w+)/.test( window.location.hash ) ) return menuAdmin( RegExp.$1 );
}

var backer = {
    lastH : null,
    runnin : true,
    interID : null,

    // getH : function(){ return window.location.hash; }
    changeH : function( H ){
        window.location.hash = H;
    },

    add2H : function( H ){
        window.location.hash += H;
    },

    run : function( s ){
        !!s ? this.interID = setInterval( this.listener, 300 ) : 
        clearInterval( this.interID );
        this.runnin = !!s ;
    },

    listener : function(){
        if( backer.lastH != window.location.hash ){
            backer.lastH = window.location.hash;
            if( backer.runnin ) gotHash();
        }
    }
};
// Watchout 4 anchor change every 300ms
// backer.interID = setInterval( backer.listener, 300 );


function bkColor(targetId, ONOFF) {
    var tid = $(targetId);
    if(ONOFF=='ON') {
        tid.style.backgroundColor = "#fff";
    } else if(ONOFF=='OFF') {
        tid.style.backgroundColor = "#e5e5e5";
    } else if(ONOFF=='MENUON') {
        show('LABELS','ON');
        tid.style.backgroundColor = "#007a94";
    } else if(ONOFF=='MENUOFF') {
        show('LABELS','OFF');
        tid.style.backgroundColor = "#007a94";
    }
}


function showhide(id) {
    var el = $('DOS_H_'+id),
        im = $('IMG_'+id);

    if (el.style.display == 'block') {
        show(el.id,'OFF');
        im.src=im.src.replace(/moins.png/,"plus.png");
    } else if (el.style.display=='none') {
        show(el.id,'ON');
        im.src=im.src.replace(/plus.png/,"moins.png");
    }
}


//------------------------------------------------------------------6>
// Loadin GIF THINGS
//------------------------------------------------------------------6>

// SHOW / HIDE THE LOADING GIF
function setLoad(bool){
    bool ? show('LOADDIV','ON') : show('LOADDIV','OFF');
}

function popDL(fileId, siteId) {
    var popdl = window.open("../include/getDL.php?FIC_ID=" + fileId + "&SP_ID=" + siteId, "popdl", "");
}

//------------------------------------------------------------------6>
// DOSSIERS DE PARTAGE
//------------------------------------------------------------------6>

function startNDir(id){
  callCancel();
  show('ADDNDIRD'+id,'ON');
}

function printSP(){
    var print = window.open("","print","");
}

// NEW !
function oPop( id, s, ctt, apd ){
    this.c = $( id ) || $E() ;
    this.c.id = id;
    this.c.style.width = s[0] + 'px';
    this.c.style.height = s[1] + 'px';
    this.c.style.left = s[2] + 'px';
    this.c.style.top = s[3] + 'px';
    this.c.style.position = "absolute";
    this.c.style.overflow = "auto";
    document.body.appendChild( this.c );
  
    this.draw = function(ctt) {
        if( !apd ) this.c.innerHTML = "";
        pfill(this.c, ctt);
        this.c.style.display = "block";
    };
    this.draw(ctt);
    return this.c;
}

function flexPop(id, hf, vf, ctt, apd) {
    var cs = getClientSize(),
    scr = getScrollXY(),
    sh = hf[0] + hf[1] + hf[2],
    sv = vf[0] + vf[1] + vf[2],
    w = parseInt( ( hf[1] / sh ) * cs[0] ),
    h = parseInt( ( vf[1] / sv ) * cs[1] ),
    x = parseInt( ( ( hf[0] / sh ) * cs[0] ) + scr[0] ),
    y = parseInt( ( ( vf[0] / sv ) * cs[1] ) + scr[1] );
    return new oPop( id, [w,h,x,y], ctt, apd );
}

function pfill(e, c) {
    e.innerHTML = "";
    var t = $E();
    t.innerHTML = c;
    e.appendChild(t);
}

function toggleThread(id) {
    var t = $('FULLMSG'+id),
    close = t.style.display == 'none';
    t.style.display = (close)
        ? 'block' 
        : 'none';

    $('WTH'+id).className = (!close)
        ? 'WRAPTHCL'
        : 'WRAPTH';
    var gif = (close ? 'less' : 'plus') + '.gif',
        pix = $('TGPX'+id),
        s = pix.src.split('/');
    s[s.length-1] = gif;
    pix.src = s.join('/');
}

function toggleNews(){
    var n = $('news_content'), 
        p = $('toggle_news'),
        close = n.style.display == 'none',
        gif = ( close ? 'less' : 'plus' ) + '.gif',
        s = p.src.split('/');

    s[s.length-1] = gif;
    n.style.display = (close)
        ? 'block' 
        : 'none';
    p.src = s.join('/');
}


function guessName(el, tar) {
    $(tar).value = (el.value.indexOf('\\') > -1)
        ? el.value.split('\\')[el.value.split('\\').length-1] 
        : el.value;
}
