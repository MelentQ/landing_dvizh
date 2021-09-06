import '../vendor/hystmodal.min.js';

window.hystModal = new HystModal({
  linkAttributeName: "data-hystmodal",
  afterClose: function(modal){
            
    //If Youtube video inside Modal, close it on modal closing
    let videoframe = modal.openedWindow.querySelector('iframe');
    if(videoframe){
        videoframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
    }
  }
});