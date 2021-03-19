// ========================================================================================================================
// my set Up
//Safari Back Reload
window.onpageshow = function(event) {if (event.persisted) {window.location.reload();}};
//Detect Responsive
function smartDevice() {return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}
function ie() {if (document.documentMode || /Edge/.test(navigator.userAgent)) {return true;} else {return false;}}
function minXS() {return Modernizr.mq('(min-width: 0px)');}
function minSM() {return Modernizr.mq('(min-width: 321px)');}
function minMD() {return Modernizr.mq('(min-width: 429px)');}
function minLG() {return Modernizr.mq('(min-width: 1025px)');}
function maxXS() {return Modernizr.mq('(max-width: 320px)');}
function maxSM() {return Modernizr.mq('(max-width: 428px)');}
function maxMD() {return Modernizr.mq('(max-width: 1024px)');}
function maxLG() {return Modernizr.mq('(max-width: 1280px)');}
// end my Set Up
// ========================================================================================================================

function changePage(pageId) {
  gsap.to($('.swupWrapper'), 0.6, {opacity: 0, ease: Power4.easeOut, onComplete:function(){
    TweenMax.set($('.swupWrapper'), {clearProps: 'all'})
    $('.swupWrapper').removeClass('showPage');

    $('#'+pageId+'').addClass('showPage');
    gsap.set($('#'+pageId+''), {opacity: 0})
    gsap.to($('#'+pageId+''), 0.6, {opacity: 1, ease: Power4.easeOut, onComplete:function(){
      TweenMax.set($('#'+pageId+''), {clearProps: 'all'})
      ScrollTrigger.refresh()


      if(pageId == "page-menu") {
        $('.menuOverlay').addClass('hotOverlay');

        gsap.to('.menuOverlay', { className: '+=' + 'coldOverlay menuOverlay',
          scrollTrigger: {
            trigger: '#cold-drinks',
            start: "top center",
            toggleActions:"play reverse play reverse",
            onEnter: function() {
              // console.log('scroll trigger function running');
              $('#drinksTypeSelect').prop('checked', false);
            },
            onEnterBack: function() {
              $('#drinksTypeSelect').prop('checked', false);
            },
            onLeave: function() {
              $('#drinksTypeSelect').prop('checked', true);
            },
            onLeaveBack: function() {
              $('#drinksTypeSelect').prop('checked', true);
            }
          }
        });
      }

      if(pageId == "page-input") {
        $("#orderName").focus();
      }


    }})
  }})
};

////////////////////////////////////////////////
$(document).ready(function() {
    setTimeout(function(){
      $('html').addClass('ready');
      init();

      // const options = [{
      //   from: '(.*)',
      //   to: '(.*)',
      //   in: (next) => {
      //     document.querySelector('#swup').style.opacity = 0;
      //     TweenMax.to(document.querySelector('#swup'), .5, {
      //       opacity: 1,
      //       onComplete: next
      //     });
      //   },
      //   out: (next) => {
      //     document.querySelector('#swup').style.opacity = 1;
      //     TweenMax.to(document.querySelector('#swup'), .5, {
      //       opacity: 0,
      //       onComplete: next
      //     });
      //   }
      // }];

      // const swup = new Swup({
      //   plugins: [
      //     new SwupJsPlugin(options),
      //     new SwupDebugPlugin()
      //   ],
      //   linkSelector: 'a[data-swup]',
      //   animateHistoryBrowsing: true
      // });

      if ($('.mainPage').length){
        $('.mainPage').click(function(){
          // swup.loadPage({
          //   url: "input.html"
          // });

          changePage('page-input');
          $('.nextBtn').addClass('disabled');
          $('.inputNameWrap input').val("");
        })
      }
      // swup.on('contentReplaced', init);
    }, 300);

});
var finalOrderName;
var parseSelectedDrinks, parseOrigin, parseMilk, parseEspresso;
function init() {

  $('.inputWrap a, .fixedWrap a').click(function(e){
    e.preventDefault();
    changePage('page-home');
  })

  $('a[data-swup]').click(function(){
    // $('.menuOverlay').css('opacity','0');
    setTimeout(function() {
      // $('.menuOverlay').remove();
      $('.menuOverlay').removeClass('hotOverlay');
      $('.menuOverlay').removeClass('coldOverlay');
    }, 200);
  })

  // check for idling status
  function inactivityTime() {
    // console.log('inactivityTime() running');
    var time;
    var idleTimeout;
    window.onload = resetTimer;
    // DOM Events
    window.onkeypress = resetTimer;
    window.ontouchstart = resetTimer;
    window.onclick = resetTimer;
    window.onkeypress = resetTimer;

    function showIdleScreen() {
      //console.log("screen is idle.");

      // swup.loadPage({
      //   url: "index.html"
      // });
      changePage('page-home');
      resetTimer();
      // window.location = "index.html";
    }

    function resetTimer() {
      clearTimeout(time);
      time = setTimeout(showIdleScreen, 120000);
      // 1000 milliseconds = 1 second
    }
  };

  // inactivityTime();



  // console.log(window.location.pathname);




  var leftoffsetY;
  var scrollStop = $('html').hasClass('noScroll');

  function stopScroll() {
      if(!scrollStop) {
        leftoffsetY = window.pageYOffset;
        var topY = -leftoffsetY + 'px';
        $('html').addClass('noScroll');
        $('body').css({'top':topY});
        scrollStop = true;
      }

  }

  function startScroll() {
      if(scrollStop) {
          $('html').removeClass('noScroll');
          $('html, body').scrollTop(leftoffsetY);
          scrollStop = false;
      }

  }

  if ($('.mainPage').length){

    $('.mainPage').click(function(){
      // swup.loadPage({
      //   url: "input.html"
      // });
      changePage('page-input');
      $('.nextBtn').addClass('disabled');
      $('.inputNameWrap input').val("");
    })
  }

  if ($('.input-layout').length){
    $("#orderName").focus();

    var currentTime = new Date().getHours();

    $('.greetings').html('evening');

    if (4 <= currentTime&&currentTime <= 12) {
      $('.greetings').html('morning');
    }

    if (12 <= currentTime&&currentTime < 19) {
      $('.greetings').html('afternoon');
    }
  }

  var url_string = window.location.href;
  var url = new URL(url_string);
  var userOrderName = url.searchParams.get("name");


  $('#orderName').on('keyup', function(e) {    
    if($('#orderName').val().length) {
      $('.nextBtn').removeClass('disabled');
    } else {
      $('.nextBtn').addClass('disabled');
    }

    // if (e.which === 13) {
    //   var getUserName = $('#orderName').val();
    //   finalOrderName = getUserName.replace(/ /g, "%20");
    //   // console.log(finalOrderName);
    //   // swup.loadPage({
    //   //   url: "menu.html"
    //   // });
    //   // window.location.href = "/menu.html?name="+finalOrderName;
    //   // changePage('page-menu');


    //   closeMenuOverlay();
    //   $('.menulayout .r').css('display','flex');
    //   $('.eaDrinkOverlay').removeClass('finalOrderOverlay');
    //   $('.eaDrinkOverlay').addClass('tobeClosed');
    //   $('.checkDrinksWrapper').remove();
    //   $('.finalCfm').remove();
    //   $('.modifier, .confirmDrinks').show();
    // }
  });

  $('.nextBtn').click(function(){
    var getUserName = $('#orderName').val();
    finalOrderName = getUserName.replace(/ /g, "%20");
    // console.log(finalOrderName);
    // swup.loadPage({
    //   url: "menu.html"
    // });
    // window.location.href = "/menu.html?name="+finalOrderName;
    // changePage('page-menu');

    changePage('page-menu');

    closeMenuOverlay();
    $('.menulayout .r').css('display','flex');
    $('.eaDrinkOverlay').removeClass('finalOrderOverlay');
    $('.eaDrinkOverlay').addClass('tobeClosed');
    $('.checkDrinksWrapper').remove();
    $('.finalCfm').remove();
    $('.modifier, .confirmDrinks').show(); 
  });




  if ($('.menulayout').length){

    $addMenuOverlay = $('<div class="menuOverlay hotOverlay"></div>');
    $addMenuOverlay.removeClass('hotOverlay');
    $addMenuOverlay.appendTo($('main'));

    $('.drinkBtn').click(function(){
      var ccheck = $('#drinksTypeSelect').is(":checked")
      // console.log(ccheck);
      if(ccheck == false){
        $('#drinksTypeSelect').prop('checked', false);
        $('html, body').animate({
           scrollTop: $("#cold-drinks").offset().top - 200
         });
      }else{
        $('#drinksTypeSelect').prop('checked', true);
        $('html, body').animate({
           scrollTop: $("#hot-drinks").offset().top - 200
         });
      }
    })
  }

  if ($('.selectDrinksLayout').length) {

    function closeMenuOverlay(){
      $('.eaDrinkOverlay').css('opacity','0');
      ScrollTrigger.getAll().forEach(ST => ST.enable());
      setTimeout(function() {
        $('.eaDrinkOverlay').remove();
      }, 200);


    }
    $('body').on('click', '.tobeClosed', function(e) {
        if($(e.target).is(this)){
          closeMenuOverlay();
          // startScroll();
        }
    });


    function getAllDrinks(){
        var result = null;
        $.ajax({
            async: false,
            url: "./files/js/drinks.json",
            dataType: "json",
        }).done(function(data) {
          result = data;
        });
        return result;
    }

    var allDrinks = getAllDrinks();

    function getAllHotDrinks(obj) {
        var objects = {};
        $.each(obj , function (i, thisDrink) {
          if(thisDrink['hot-drink']) {
            objects[i] = thisDrink;
          }
        });
        return objects;
    }

    function getAllColdDrinks(obj) {
        var objects = {};
        $.each(obj , function (i, thisDrink) {
          if(!thisDrink['hot-drink']) {
            objects[i] = thisDrink;
          }
        });
        return objects;
    }

    function getSingleDrinks(obj, thisid) {
        var objects = {};
        $.each(obj , function (i, thisDrink) {
          if(i == thisid) {
            objects[i] = thisDrink;
          }
        });
        return objects;
    }




    var allHotDrinks = getAllHotDrinks(allDrinks);
    var allColdDrinks = getAllColdDrinks(allDrinks);




    // append all hot drinks
    $.each(allHotDrinks , function (id, drink) {

      //append each drink
      $thisDrink = $('\
        <div class="eaDrink">\
          <div class="lazyVideoOff">\
            <video autoplay muted loop playsinline>\
              <source src="./files/media/'+drink['video']+'" type="video/mp4"/>\
            </video>\
          </div>\
          <h4>'+drink['title']+'</h4>\
          <p class="desc">'+drink['description']+'</p>\
          <p class="selectBtn" data-id="'+id+'">SELECT</p>\
        </div>\
      ');
      $thisDrink.appendTo($('#hot-drinks'));

      //append modifier options for this drink
      // $.each(drink['modifier'] , function (modifier, options) {
      //   $thisDrinkModifer = $('\
      //     <label for="'+modifier+'">'+modifier+':</label>\
      //     <select id="'+modifier+'" style="margin-right: 20px;">\</select>\
      //   ');
      //
      //   $thisDrinkModifer.appendTo($('#'+id+''));
      //
      //   $.each(options, function (option, price) {
      //     $thisDrinkOption = $('\
      //       <option value="'+option+'">'+option+' - $'+price+'</option>\
      //     ');
      //
      //     $thisDrinkOption.appendTo($('#'+id+' ' + 'select#'+modifier+''))
      //   });
      // });



    });

    // append all cold drinks
    $.each(allColdDrinks , function (id, drink) {

      //append each drink
      $thisDrink = $('\
        <div class="eaDrink">\
          <div class="lazyVideoOff">\
            <video autoplay muted loop playsinline>\
              <source src="./files/media/'+drink['video']+'" type="video/mp4"/>\
            </video>\
          </div>\
          <h4>'+drink['title']+'</h4>\
          <p class="desc">'+drink['description']+'</p>\
          <p class="selectBtn" data-id="'+id+'">SELECT</p>\
        </div>\
      ');
      $thisDrink.appendTo($('#cold-drinks'));

      //append modifier options for this drink
      // $.each(drink['modifier'] , function (modifier, options) {
      //   $thisDrinkModifer = $('\
      //     <label for="'+modifier+'">'+modifier+':</label>\
      //     <select id="'+modifier+'" style="margin-right: 20px;">\</select>\
      //   ');
      //
      //   $thisDrinkModifer.appendTo($('#'+id+''));
      //
      //   $.each(options, function (option, price) {
      //     $thisDrinkOption = $('\
      //       <option value="'+option+'">'+option+' - $'+price+'</option>\
      //     ');
      //
      //     $thisDrinkOption.appendTo($('#'+id+' ' + 'select#'+modifier+''))
      //   });
      // });

    });


    // change background color hot/cold when scroll
    // gsap.to('.menuOverlay', { className: '+=' + 'coldOverlay menuOverlay',
    //   scrollTrigger: {
    //     trigger: '#cold-drinks',
    //     start: "top center",
    //     toggleActions:"play reverse play reverse",
    //     onEnter: function() {
    //       // console.log('scroll trigger function running');
    //       $('#drinksTypeSelect').removeAttr('checked');
    //     },
    //     onEnterBack: function() {
    //       $('#drinksTypeSelect').removeAttr('checked');
    //     },
    //     onLeave: function() {
    //       $('#drinksTypeSelect').attr('checked', 'checked');
    //     },
    //     onLeaveBack: function() {
    //       $('#drinksTypeSelect').attr('checked', 'checked');
    //     }
    //   }
    // });

    var eaDrinkArray = gsap.utils.toArray('.eaDrink');


    eaDrinkArray.forEach((item) => {
      gsap.to(item, { autoAlpha: 0,
        scrollTrigger: {
          trigger: item,
          start: 'top top+=50',
          scrub: true,
          end: '+=500'
        }
      });
    })


    // click overlay
    $('.selectBtn').click(function(){

      ScrollTrigger.getAll().forEach(ST => ST.disable());


      setTimeout(function() {
        $('.eaDrinkOverlay').css('opacity','1');
      }, 200);

      // stopScroll();
      var selectValue = $(this).attr("data-id");
      var originCountry;
      var getDrinksOrigin, getDrinksEspresso, getDrinksMilk;
      var drinkType;
      var getSingleDrink = getSingleDrinks(allDrinks, selectValue);
      $.each(getSingleDrink , function (id, drink) {
        drinkType = drink['hot-drink'];
        parseSelectedDrinks = drink['title'];

        //append each drink
        $thisDrink = $('\
          <div class="eaDrinkOverlay tobeClosed">\
            <div class="eaOverlay">\
              <div class="closeOverlay">\
                <img src="files/media/close.svg" alt="">\
              </div>\
              <video playsinline loop muted autoplay poster="./files/media/poster/'+drink['poster']+'"><source src="./files/media/'+drink['video']+'" type="video/mp4"></video>\
              <h2>'+drink['title']+'</h2>\
              <div class="modifier">\
                <div class="modifierName">\
                </div>\
                <div class="modifierItem">\
                </div>\
              </div>\
            </div>\
          </div>\
        ');
        $thisDrink.appendTo($('.menulayout '));


        // close overlay
        $('.closeOverlay').click(function(){
          closeMenuOverlay();
          // startScroll();
        })



        //append modifier options for this drink
        $.each(drink['modifier'] , function (modifier, options) {
          originCountry = modifier;
          $thisDrinkModiferItem = $('\
            <p class="modSubhead">'+modifier+'</p>\
          ');
          $thisDrinkModiferItem.appendTo($('.modifierName'));

          $thisDrinkModifer = $('\
            <div id="'+modifier+'" class="'+modifier+'Wrap">\</div>\
          ');
          $thisDrinkModifer.appendTo($('.modifierItem'));

          // if(typeof drink['modifier']['espresso'] !== "undefined"){
          //   console.log('not empty');
          // }

          // if(['espresso'] == "undefined"){
          //   console.log(' empty');
          // }
          // if(drink['modifier'] == "espresso"){
          //   console.log(' is expresso');
          // }
        });
        // origin modifer
        $.each(drink['modifier']['origin'] , function (modifier, options) {

          $thisDrinkOption = $('\
            <input type="radio" value="'+modifier+'" id="'+modifier+'" name="origin">\
            <label for="'+modifier+'">'+modifier+'</label>\
          ');
          $thisDrinkOption.appendTo($('div#origin'))
          $('.originWrap').each(function(){
            $('input[type=radio]:first', this).attr('checked', true);
          });
        });

        $thisDrinkOption = $('\
          <div class="dec button">&mdash;</div>\
          <input type="text" name="espresso" id="espresso" value="1">\
          <div class="inc button">+</div>\
          <label for="name">SHOTS</label>\
        ');

        $thisDrinkOption.appendTo($('div#espresso'))

        $(".button").on("click", function() {
          var $button = $(this);
          var oldValue = $button.parent().find("input").val();
          if ($button.text() == "+") {
        	  var newVal = parseFloat(oldValue) + 1;
            if(newVal >= 2){
              newVal = 2;
            }
        	} else {
      	   // Don't allow decrementing below zero
            if (oldValue > 0) {
              var newVal = parseFloat(oldValue) - 1;
      	    } else {
              newVal = 0;
            }
      	  }

          $button.parent().find("input").val(newVal);
          getDrinksEspresso = newVal;

        });
        // expresso modifer
        // $.each(drink['modifier']['espresso'] , function (modifier, options) {
        //   $thisDrinkOption = $('\
        //     <input type="text" value="'+modifier+'" id="'+modifier+'" name="'+originCountry+'">\
        //     <label for="'+modifier+'">'+modifier+'</label>\
        //   ');
        //   $thisDrinkOption.appendTo($('div#'+originCountry+''))
        // });

        // milk modifer
        $.each(drink['modifier']['milk'] , function (modifier, options) {
          $thisDrinkOption = $('\
            <input type="radio" value="'+modifier+'" id="'+modifier+'" name="milk">\
            <label for="'+modifier+'">'+modifier+'</label>\
          ');
          $thisDrinkOption.appendTo($('div#milk'))
          $('.milkWrap').each(function(){
            $('input[type=radio]:first', this).attr('checked', true);
          });
        });

        $confirmDrinks = $('\
          <div class="confirmDrinks">\
            <h4>CONFIRM</h4>\
          </div>\
        ');

        $confirmDrinks.appendTo($('.eaOverlay'));

        $('.confirmDrinks').click(function(){



          $('.eaDrinkOverlay').removeClass('tobeClosed');
          // change background based on drink type
          // console.log(drinkType);
          setTimeout(function() {
            if(drinkType){

              $('.menuOverlay').addClass('hotOverlay');
              $('.menuOverlay').removeClass('coldOverlay');
            }
            if(drinkType == false){

              $('.menuOverlay').addClass('coldOverlay');
              $('.menuOverlay').removeClass('hotOverlay');
            }
          }, 200);


          $checkDrinksWrapper = $('\
            <div class="checkDrinksWrapper">\
            </div>\
          ');
          $checkDrinksWrapper.appendTo($('.eaOverlay'));
          // check if drink has origin
          getDrinksOrigin = $("input[name='origin']:checked").val();


          if(getDrinksOrigin !== undefined){
            $addOrigin = $('\
              <p class="modSubhead">'+getDrinksOrigin+'</p>\
            ');
            $addOrigin.appendTo($('.checkDrinksWrapper'));
            parseOrigin = getDrinksOrigin;
          }else{
            // console.log('did run');
            parseOrigin = "not available";
          }

          // check if drink has espress
          getDrinksEspresso = $("input[name='espresso']").val();
          if(getDrinksEspresso !== undefined){
            $addEspresso = $('\
              <p class="modSubhead">'+getDrinksEspresso+' shots</p>\
            ');
            $addEspresso.appendTo($('.checkDrinksWrapper'));
            parseEspresso = getDrinksEspresso;
          }else{
            parseEspresso = "not available";
          }
          // check if drink has milk
          getDrinksMilk = $("input[name='milk']:checked").val();

          if(getDrinksMilk !== undefined){
            $addMilk = $('\
              <p class="modSubhead">'+getDrinksMilk+'</p>\
            ');
            $addMilk.appendTo($('.checkDrinksWrapper'));
            parseMilk = getDrinksMilk;
          }else{

            parseMilk = "not available";
          }

          $finalCfmOrder = $('\
            <div class="finalCfm">\
              <p class="changeBtn">change</p>\
              <p class="cfmBtn">order</p>\
            </div>\
          ');
          $finalCfmOrder.appendTo($('.eaOverlay'));

          $('.menulayout .r').css('display','none');
          $('.eaDrinkOverlay').addClass('finalOrderOverlay');
          $('.modifier, .confirmDrinks').hide();




          // console.log(finalOrderName);
          // console.log(parseOrigin);
          // console.log(parseEspresso);
          // console.log(parseMilk);
          // console.log(parseSelectedDrinks);

          $('.changeBtn').click(function(){
            $('.menulayout .r').css('display','flex');
            $('.eaDrinkOverlay').removeClass('finalOrderOverlay');
            $('.eaDrinkOverlay').addClass('tobeClosed');
            $('.checkDrinksWrapper').remove();
            $('.finalCfm').remove();
            $('.modifier, .confirmDrinks').show();
          })

          $('.cfmBtn').click(function(){
            // $('.menuOverlay').css('opacity','0');
            setTimeout(function() {
              // $('.menuOverlay').remove();
              $('.menuOverlay').removeClass('hotOverlay');
              $('.menuOverlay').removeClass('coldOverlay');
            }, 200);
            // swup.loadPage({
            //   url: "complete.html"
            // });
            changePage('page-complete');
			$.post("http://ec2-52-221-198-237.ap-southeast-1.compute.amazonaws.com/sales",
					{
						"receiptNo": "KIOSK_ORDER",
						"receiptRemark": "",
						"receiptServerName": "aws",
						"receiptTableNo": "",
						"newItems": [
							{
								"itemCode": selectValue,
								"itemName": "",
								"itemQty": 1,
								"itemCourse": "1",
								"modifiers": [{
									"modifierCode": "MOD_"+String(getDrinksEspresso)+"SHOT",
									"modifierName": "KIOSK2",
									"modifierQty": 1
								}]
							}       
						]
					});
			
					

            function titleCase(str) {
               var splitStr = str.toLowerCase().split(' ');
               for (var i = 0; i < splitStr.length; i++) {
                   // You do not need to check if i is larger than splitStr length, as your for does that for you
                   // Assign it back to the array
                   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
               }
               // Directly return the joined string
               return splitStr.join(' '); 
            }

            $('.appendText').text('Enjoy your '+titleCase(parseSelectedDrinks)+', '+finalOrderName+'!');
            // $(".orderMore").prop("href", "menu.html?name="+userOrderName);
            $(".orderMore").click(function(){
              // swup.loadPage({
              //   url: "input.html"
              // });
              changePage('page-input');
              $('.nextBtn').addClass('disabled');
              $('.inputNameWrap input').val("");
            })

            // console.log(finalOrderName);
            // console.log(parseOrigin);
            // console.log(parseEspresso);
            // console.log(parseMilk);
            // console.log(parseSelectedDrinks);
          })

        })










      });




    })
  }



  if ($('.completed-layout').length){
    // console.log(finalOrderName);
    // console.log(parseOrigin);
    // console.log(parseEspresso);
    // console.log(parseMilk);
    // console.log(parseSelectedDrinks);

    $('.appendText').text('Enjoy your '+parseSelectedDrinks+', '+finalOrderName+'!');
    // $(".orderMore").prop("href", "menu.html?name="+userOrderName);
    $(".orderMore").click(function(){
      // swup.loadPage({
      //   url: "input.html"
      // });
      changePage('page-home');
    })
  }

  // LAZY LOADING
  // LAZY LOADING
  function initIntersecLazyLoad() {
    var itemQueue = [];
    var delay = 80;
    var queueTimer;

    function processLazyQueue () {
      if (queueTimer) return // We're already processing the queue
      queueTimer = window.setInterval(function () {
        if (itemQueue.length) {
          setTimeout(function () {
            $(itemQueue.shift()).addClass('loaded');
          }, 500);
          processLazyQueue()
        } else {
          window.clearInterval(queueTimer)
          queueTimer = null
        }
      }, delay)
    }

    var lazyVideos = [].slice.call(document.querySelectorAll(".lazyVideo video"));

    if ("IntersectionObserver" in window) {
      var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.load();
            entry.target.addEventListener('loadeddata', function (event) {
              vid = $(entry.target)[0];
              vid.muted = true;
              vid.currentTime = 0;
              vid.pause();
              vid.play();

              itemQueue.push(entry.target);
              processLazyQueue();
              lazyVideoObserver.unobserve(entry.target);
            });
          }
        });
      });

      lazyVideos.forEach(function(lazyVideo) {
          lazyVideoObserver.observe(lazyVideo);
      });
    } else {
      //load all images if IntersectionObserver not compatiable
      lazyImages.forEach(function(lazyImage) {
        $(lazyImage).imagesLoaded().progress( function( instance, image ) {
          var result = image.isLoaded ? 'loaded' : 'broken';
          if(result == "loaded") {
            itemQueue.push(lazyImage);
            processLazyQueue();
            lazyImageObserver.unobserve(lazyImage);
          } else {
            lazyImage.classList.add("imgBroken");
          }
        });
      });
    }
  }
  initIntersecLazyLoad();




} /*end init*/
