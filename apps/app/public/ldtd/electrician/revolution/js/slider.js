          var revapi2,
            tpj;
          function revinit_revslider21() {
          jQuery(function() {
            tpj = jQuery;
            revapi2 = tpj("#rev_slider_2_1");
            if(revapi2==undefined || revapi2.revolution == undefined){
              revslider_showDoubleJqueryError("rev_slider_2_1");
            }else{
              revapi2.revolution({
                sliderLayout:"fullwidth",
                visibilityLevels:"1210,1210,778,480",
                gridwidth:"1210,1210,778,480",
                gridheight:"850,850,450,350",
                spinner:"spinner0",
                perspectiveType:"global",
                editorheight:"850,768,450,350",
                responsiveLevels:"1210,1210,778,480",
                progressBar:{disableProgressBar:true},
                navigation: {
                  onHoverStop:false,
                  touch: {
                    touchenabled:true
                  },
                  arrows: {
                    enable:true,
                    style:"uranus",
                    hide_onmobile:true,
                    hide_under:778,
                    hide_onleave:true,
                    left: {
                      h_offset:30
                    },
                    right: {
                      h_offset:30
                    }
                  }
                },
                fallbacks: {
                  allowHTML5AutoPlayOnAndroid:true
                },
              });
            }
            
          });
          } // End of RevInitScript
        var once_revslider21 = false;
        if (document.readyState === "loading") {document.addEventListener('readystatechange',function() { if((document.readyState === "interactive" || document.readyState === "complete") && !once_revslider21 ) { once_revslider21 = true; revinit_revslider21();}});} else {once_revslider21 = true; revinit_revslider21();}
        

          var htmlDivCss = unescape("%23rev_slider_2_1_wrapper%20.uranus.tparrows%20%7B%0A%20%20width%3A50px%3B%0A%20%20height%3A50px%3B%0A%20%20background%3Argba%28255%2C255%2C255%2C0%29%3B%0A%20%7D%0A%20%23rev_slider_2_1_wrapper%20.uranus.tparrows%3Abefore%20%7B%0A%20width%3A50px%3B%0A%20height%3A50px%3B%0A%20line-height%3A50px%3B%0A%20font-size%3A40px%3B%0A%20transition%3Aall%200.3s%3B%0A-webkit-transition%3Aall%200.3s%3B%0A%20%7D%0A%20%0A%20%20%23rev_slider_2_1_wrapper%20.uranus.tparrows%3Ahover%3Abefore%20%7B%0A%20%20%20%20opacity%3A0.75%3B%0A%20%20%7D%0A");
          var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
          if(htmlDiv) {
            htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
          }else{
            var htmlDiv = document.createElement('div');
            htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
            document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
          }

          var htmlDivCss = unescape("%0A%0A");
          var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
          if(htmlDiv) {
            htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
          }else{
            var htmlDiv = document.createElement('div');
            htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
            document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
          }
