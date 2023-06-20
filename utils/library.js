function getElement(_selector){
    return document.querySelector(_selector);
}
function getElementAll(_selector){
    return document.querySelectorAll(_selector);
}
function showMessage(_selector, _msgError){
    let domMsg = getElement(_selector);
    domMsg.innerHTML=_msgError;
    if(_msgError.trim().length>0)
        domMsg.style.setProperty("display","inherit");
    else
    domMsg.style.setProperty("display","none");
    return 1;
}