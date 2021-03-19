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

////////////////////////////////////////////////
$(document).ready(function() {
    setTimeout(function(){
      $('html').addClass('ready');
      init();
    }, 300);

});

function init() {

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
    $('main').click(function(){
      window.location = "input.html";
    })
  }

  $('#orderName').on('keypress', function(e) {
    if (e.which === 13) {
      var getUserName = $('#orderName').val();
      const finalOrderName = getUserName.replace(/ /g, "%20");
      console.log(finalOrderName);
      window.location = "menu.html?name="+finalOrderName;
    }
  });




  var url_string = window.location.href;
  var url = new URL(url_string);
  var userOrderName = url.searchParams.get("name");

  // if(userOrderName != null){
  //   console.log(userOrderName);
  // }

  if ($('.menulayout').length){

    $('.drinkBtn').click(function(){
      var ccheck = $('#drinksTypeSelect').is(":checked")
      console.log(ccheck);
      if(ccheck == false){
        $('#drinksTypeSelect').removeAttr('checked');
        $('html, body').animate({
           scrollTop: $("#cold-drinks").offset().top - 200
         });
      }else{
        $('#drinksTypeSelect').attr('checked', 'checked');
        $('html, body').animate({
           scrollTop: $("#hot-drinks").offset().top - 200
         });
      }
    })
  }

  if ($('.selectDrinksLayout').length) {

    function closeMenuOverlay(){
      $('.eaDrinkOverlay').remove();
      $('.bgOverlay').removeClass('hotOverlay');
      $('.bgOverlay').removeClass('coldOverlay');
    }
    $('body').on('click', '.tobeClosed', function(e) {
        if($(e.target).is(this)){
          closeMenuOverlay();
          startScroll();
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
          <div class="lazyVideo">\
            <img class="poster" src="./files/media/poster/'+drink['poster']+'">\
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
          <div class="lazyVideo">\
            <img class="poster" src="./files/media/poster/'+drink['poster']+'">\
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
    gsap.to('.hotOverlay', { className: '+=' + 'coldOverlay',
      scrollTrigger: {
        trigger: '#cold-drinks',
        start: "top center",
        toggleActions:"play reverse play reverse",
        onEnter: function() {
          $('#drinksTypeSelect').removeAttr('checked');
        },
        onEnterBack: function() {
          $('#drinksTypeSelect').removeAttr('checked');
        },
        onLeave: function() {
          $('#drinksTypeSelect').attr('checked', 'checked');
        },
        onLeaveBack: function() {
          $('#drinksTypeSelect').attr('checked', 'checked');
        }
      }
    });

    // gsap.to('.menuOverlay',{ autoAlpha: 0,
    //   scrollTrigger: {
    //     trigger: '#cold-drinks',
    //     start: "top center",
    //     toggleActions:"play reverse play reverse",
    //     onEnter: function() {
    //       $('#drinksTypeSelect').removeAttr('checked');
    //       $('.menuOverlay').addClass('coldOverlay');
    //       $('.menuOverlay').removeClass('hotOverlay');
    //     },
    //     onEnterBack: function() {
    //       $('#drinksTypeSelect').removeAttr('checked');
    //       $('.menuOverlay').addClass('coldOverlay');
    //       $('.menuOverlay').removeClass('hotOverlay');
    //     },
    //     onLeave: function() {
    //       $('#drinksTypeSelect').attr('checked', 'checked');
    //       ('.menuOverlay').addClass('hotOverlay');
    //       $('.menuOverlay').removeClass('coldOverlay');
    //     },
    //     onLeaveBack: function() {
    //       $('#drinksTypeSelect').attr('checked', 'checked');
    //       ('.menuOverlay').addClass('hotOverlay');
    //       $('.menuOverlay').removeClass('coldOverlay');
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
      stopScroll();
      var selectValue = $(this).attr("data-id");
      var originCountry;
      var getDrinksOrigin, getDrinksEspresso, getDrinksMilk;
      var drinkType;
      var getSingleDrink = getSingleDrinks(allDrinks, selectValue);
      $.each(getSingleDrink , function (id, drink) {
        drinkType = drink['hot-drink'];

        //append each drink
        $thisDrink = $('\
          <div class="eaDrinkOverlay tobeClosed">\
            <div class="eaOverlay">\
              <div class="closeOverlay">\
                <img src="files/media/close.png" alt="">\
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
        $thisDrink.appendTo($('body'));


        // close overlay
        $('.closeOverlay').click(function(){
          closeMenuOverlay();
          startScroll();
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

        });

        $thisDrinkOption = $('\
          <div class="dec button">-</div>\
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
          if(drinkType){
            $('.bgOverlay').addClass('hotOverlay');
            $('.bgOverlay').removeClass('coldOverlay');
          }else{
            $('.bgOverlay').addClass('coldOverlay');
            $('.bgOverlay').removeClass('hotOverlay');
          }


          $checkDrinksWrapper = $('\
            <div class="checkDrinksWrapper">\
            </div>\
          ');
          $checkDrinksWrapper.appendTo($('.eaOverlay'));
          // check if drink has origin
          getDrinksOrigin = $("input[name='origin']:checked").val();
          console.log(getDrinksOrigin);

          if(getDrinksOrigin !== undefined){
            $addOrigin = $('\
              <p class="modSubhead">'+getDrinksOrigin+'</p>\
            ');
            $addOrigin.appendTo($('.checkDrinksWrapper'));
          }
          // check if drink has espress
          getDrinksEspresso = $("input[name='espresso']").val();
          if(getDrinksEspresso !== undefined){
            $addEspresso = $('\
              <p class="modSubhead">'+getDrinksEspresso+' shots</p>\
            ');
            $addEspresso.appendTo($('.checkDrinksWrapper'));
          }
          // check if drink has milk
          getDrinksMilk = $("input[name='milk']:checked").val();
          if(getDrinksMilk !== undefined){
            $addMilk = $('\
              <p class="modSubhead">'+getDrinksMilk+'</p>\
            ');
            $addMilk.appendTo($('.checkDrinksWrapper'));
          }

          $finalCfmOrder = $('\
            <div class="finalCfm">\
              <p class="changeBtn">change</p>\
              <p class="cfmBtn">order</p>\
            </div>\
          ');
          $finalCfmOrder.appendTo($('.eaOverlay'));

          $('.menulayout').css('display','none');
          $('.eaDrinkOverlay').addClass('finalOrderOverlay');
          $('.modifier, .confirmDrinks').hide();




          $('.changeBtn').click(function(){
            $('.menulayout').css('display','flex');
            $('.eaDrinkOverlay').removeClass('finalOrderOverlay');
            $('.eaDrinkOverlay').addClass('tobeClosed');
            $('.checkDrinksWrapper').remove();
            $('.finalCfm').remove();
            $('.modifier, .confirmDrinks').show();
          })

          $('.cfmBtn').click(function(){
            window.location = "complete.html?name="+userOrderName;

          })

        })










      });


    })




  }



  if ($('.completed-layout').length){
    $('.appendText').text('Enjoy your coffee, '+userOrderName+'!');
    $(".orderMore").prop("href", "menu.html?name="+userOrderName);
    var interval;
    $(document).on('mousemove keyup keypress',function(){
      clearTimeout(interval);//clear it as soon as any event occurs
    //do any process and then call the function again
      settimeout();//call it again
    })
    $(document).ready(function() {
      settimeout();
    });

    function settimeout(){
      console.log('did run');
        interval=setTimeout(function(){
        window.location = "index.html";
      },10000)
    }
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
