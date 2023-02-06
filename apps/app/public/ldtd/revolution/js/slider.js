var revapi2,
            tpj;
          function revinit_revslider23() {
          jQuery(function() {
            tpj = jQuery;
            revapi2 = tpj("#rev_slider_2_3");
            if(revapi2==undefined || revapi2.revolution == undefined){
              revslider_showDoubleJqueryError("rev_slider_2_3");
            }else{
              revapi2.revolution({
                sliderType:"carousel",
                duration:"18000ms",
                visibilityLevels:"1240,1240,778,480",
                gridwidth:"1141,1141,778,480",
                gridheight:"582,582,400,250",
                autoHeight:true,
                spinner:"spinner0",
                maxHeight:"1145px",
                perspective:600,
                perspectiveType:"global",
                editorheight:"582,768,400,250",
                responsiveLevels:"1240,1240,778,480",
                progressBar:{disableProgressBar:true},
                navigation: {
                  onHoverStop:false
                },
                fallbacks: {
                  allowHTML5AutoPlayOnAndroid:true
                },
              });
            }
            
          });
          } // End of RevInitScript
        var once_revslider23 = false;
        if (document.readyState === "loading") {document.addEventListener('readystatechange',function() { if((document.readyState === "interactive" || document.readyState === "complete") && !once_revslider23 ) { once_revslider23 = true; revinit_revslider23();}});} else {once_revslider23 = true; revinit_revslider23();}



    var revapi1,
            tpj;
        function revinit_revslider12() {
        jQuery(function() {
            tpj = jQuery;
            revapi1 = tpj("#rev_slider_1_2");
            if(revapi1==undefined || revapi1.revolution == undefined){
                revslider_showDoubleJqueryError("rev_slider_1_2");
            }else{
                revapi1.revolution({
                    sliderLayout:"fullwidth",
                    visibilityLevels:"1240,1240,778,480",
                    gridwidth:"1240,1240,778,480",
                    gridheight:"930,930,450,320",
                    spinner:"spinner0",
                    perspective:600,
                    perspectiveType:"global",
                    editorheight:"930,768,450,320",
                    responsiveLevels:"1240,1240,778,480",
                    progressBar:{disableProgressBar:true},
                    navigation: {
                        onHoverStop:false
                    },
                    fallbacks: {
                        allowHTML5AutoPlayOnAndroid:true
                    },
                });
            }
            
        });
        } // End of RevInitScript
    var once_revslider12 = false;
    if (document.readyState === "loading") {document.addEventListener('readystatechange',function() { if((document.readyState === "interactive" || document.readyState === "complete") && !once_revslider12 ) { once_revslider12 = true; revinit_revslider12();}});} else {once_revslider12 = true; revinit_revslider12();}
