
function getArticle(mId, mTyp) {
	setLoad(true);
	show('CONTENT', 'OFF');
	var req 
            = sendData(
                'POST',
                'ajaxDispatcher.php',
                'ACTION=GETART&MENUID='+ mId + '&SP_ID=' + $('HSPID').value + '&preview='+$('preview').value
            );
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			fill('CONTENT', req.responseText);
			show('CONTENT', 'ON');
			setLoad(false);
		}
	};
}

function cancelUpFile() {
    this.close();
}

function getLicense(licId) {
    var req = sendData('POST', 'ajaxDispatcher.php', 'ACTION=LICENSE&LICID=' + licId);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            fill('POPUP_LICENSE', req.responseText);
            show('POPUP_LICENSE', 'ON');
        }
    };
}

function getArtFileUp() {
    var artid = $('LINKONEDITID').value,
        req = sendData('POST', 'ajaxDispatcher.php', 'ACTION=GETARTFILEUP&ARTID=' + artid);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            getArticle(req.responseText);
        }
    };
}

function addComm(tid, mid) {
    setLoad(true);
    callCancel();

    var req = sendData('POST', 'ajaxDispatcher.php', 'ACTION=ADDCOM&TOPID=' + tid + '&MSGID=' + mid);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            var par = $('ADDCOMM_' + tid + '_' + mid);
            fill('ADDCOMM_' + tid + '_' + mid, req.responseText);
            show('ADDCOMM_' + tid + '_' + mid, 'ON');
        }
    };
    setLoad(false);
}


function clearTidMid() {
    var el = $('TID_MID'),
        tidmid = el.value.split("_");
    fill('ADDCOMM_' + tidmid[0] + '_' + tidmid[1], "&nbsp;");
    show('ADDCOMM_' + tidmid[0] + '_' + tidmid[1], 'OFF');
}


function submitComm(tid, mid) {
    setLoad(true);
    var tt = escape($('COMM_TXT_' + tid).value),
        ctt = escape($('COMM_CTT_' + tid).value),
        data = isNaN(mid)
            ? "ACTION=NEWMSG&TOPICID=" + tid + "&TITLE=" + tt + "&CONTENT=" + ctt
            : "ACTION=NEWANS&TOPICID=" + tid + "&MSGID=" + mid + "&TITLE=" + tt + "&CONTENT=" + ctt,
        req = sendData('POST', 'ajaxDispatcher.php', data);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            getArticle(req.responseText);
        }
    };
}


function changeDirName(dirid) {
    callCancel();
    show('CHANGEDIRNAME' + dirid, 'ON');
}

function changeDirN(dirid, artid) {
    var newname = escape($('NEWDIRNAME' + dirid).value), 
        req = sendData('POST', 'ajaxDispatcher.php', 'ACTION=CHANGEDIRNAME&DIRID=' + dirid + '&NEWNAME=' + newname + '&ARTID=' + artid);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.responseText == "-1") {
                alert("vous n\'avez pas les droits pour modifier ce dossier")
            } else {
                getArticle(req.responseText);
            }
        }
    };
}

function cancelChangeDNAme() {
    setLoad(true);
    var tb = $BC('CHANGEDIRNAME', 'div'),
        i = 0;
    for (i, X = tb.length; i != X; i++) {
        if (tb[i].style.display == "block") {
            tb[i].style.display = "none";
        }
    }
    setLoad(false);
}

function delFile(id) {
    callCancel();
    var file2del = $('FILE' + id),
        resp = confirm('Voulez vous vraiment effacer ce fichier ?'),
        req;
    file2del.style.border = "3px solid red";
    if (!resp) {
        file2del.style.border = "0px solid red";
        return false;
    }
    setLoad(true);
    req = sendData('POST', 'ajaxDispatcher.php', 'ACTION=DELFILE&FILEID=' + id);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.responseText == '-5') {
                alert("Vous n\'avez pas les droits pour effacer ce fichier");
                file2del.style.border = "0px solid red";
            } else {
                getArticle(req.responseText);
            }
        }
    };
    setLoad(false);
}

function callCancel() {
    cancelAddPartDir();
}

function addDir(dirid, artid) {
    setLoad(true);
    var spid = $('HSPID').value,
        name = "",
        req;

    if ($('NSDIRNAME' + dirid).value) {
        name = escape($('NSDIRNAME' + dirid).value);
    } else {
        alert('Vous devez choisir un nom !');
        setLoad(false);
    }

    req = sendData('POST', 'ajaxDispatcher.php', 'ACTION=ADDDIR&DIRID='
                + dirid + '&DOSNAME=' + name + '&SPID=' + spid + '&ARTID=' + artid);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.responseText == "-1") {
                alert('vous n\'avez pas les droits pour créer un dossier');
            } else {
                getArticle(req.responseText);
            }
        }
    };
    setLoad(false);
}


function cancelAddPartDir() {
    setLoad(true);
    var tb = $BC('ADDNEWPARTDIR', 'div'),
        i;

    for (i = 0, X = tb.length; i != X; i++) {
        if (tb[i].style.display == "block") {
            tb[i].style.display = "none";
        }
    }

    tb = $BC('NSDIRNAME', 'input');
    X = tb.length;

    for (i = 0; i != X; i++) {
        if (tb[i].value != "") {
            tb[i].value = "";
        }
    }
    setLoad(false);
}


function newFile(id, dosid, rootdos, mcomm, mail, parttype, dispcomm) {
    callCancel();
    $('LINKONEDITID').value = id;

    var req = sendData('POST', 'ajaxDispatcher.php', 'ACTION=NEWFILERIGHT&ARTID=' + id);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.responseText == 1) {
                popfile = window.open("popupFileFront.php?ARTID=" + id
                        + "&DOSID=" + dosid + "&ROOTDOS=" + rootdos
                        + "&MUSTCOMM=" + mcomm + "&SENDMAIL=" + mail
                        + "&SP_ID=" + $('HSPID').value + "&PARTTYPE="
                        + parttype + "&DISPCOMM=" + dispcomm, "popfile",
                        "width=750,height=500,left=25,top=25,toolbar=0");
                popfile.focus();
            } else {
                alert('Vous n\'avez pas les droits pour pouvoir poster ici.');
                return;
            }
        }
    };
}


function majFile(ficid, artid, dosid, rootdos, mcomm, mmail, parttype, dispcomm) {
    callCancel();
    $('LINKONEDITID').value = artid;

    popfile = window.open("popupFileFront.php?FICID=" + ficid + '&DOSID='
                    + dosid + '&ROOTDOS=' + rootdos + '&MUSTCOMM=' + mcomm
                    + '&SENDMAIL=' + mmail + "&SP_ID=" + $('HSPID').value
                    + "&PARTTYPE=" + parttype + "&DISPCOMM=" + dispcomm, "popfile",
                    "width=750,height=500,left=25,top=25,toolbar=0");
    popfile.focus();
}


