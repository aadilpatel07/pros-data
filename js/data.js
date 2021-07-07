const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function sortByProperty(property){  
    return function(a,b){  
        if(a[property] > b[property])  
          return 1;  
        else if(a[property] < b[property])  
          return -1;  
    
        return 0;  
    }  
  }
  
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://oidata-5bdd.restdb.io/views/7dData",
    method: "GET",
    headers: {
      "content-type": "application/json",
      "x-apikey": "6005b4ca1346a1524ff12bc6",
      "cache-control": "no-cache",
      origin: "*",
    },
  };
  var data;
  var dataKeys;
  $.ajax(settings).done(function (response) {
    data = response;
    dataKeys = Object.keys(data);
    for(const key in data){
      data[key].sort(sortByProperty("Client Type"));
      // console.log(data[key]);
    }
    $(".loader-wrapper").fadeOut("slow");
    $("body").removeAttr("style");
    fillData();
    updateChart();
    var date = new Date(dataKeys[0]);
    $("#lstUpd").html($("#lstUpd").html() +" "+ date.getDate() +" "+ monthNames[date.getMonth()] +" "+ date.getFullYear());
  });

  function fillData(){
    //future Index
    //clients
    $("#IdxFutLC").html(data[dataKeys[0]][0]["Future Index Long"] - data[dataKeys[1]][0]["Future Index Long"]);
    $("#IdxFutSC").html(data[dataKeys[0]][0]["Future Index Short"] - data[dataKeys[1]][0]["Future Index Short"]);
    
    //diis
    $("#IdxFutLD").html(data[dataKeys[0]][1]["Future Index Long"] - data[dataKeys[1]][1]["Future Index Long"]);
    $("#IdxFutSD").html(data[dataKeys[0]][1]["Future Index Short"] - data[dataKeys[1]][1]["Future Index Short"]);
    // bullOrBear($("#IdxFutSD"));
    
    //fiis
    $("#IdxFutLF").html(data[dataKeys[0]][2]["Future Index Long"] - data[dataKeys[1]][2]["Future Index Long"]);
    $("#IdxFutSF").html(data[dataKeys[0]][2]["Future Index Short"] - data[dataKeys[1]][2]["Future Index Short"]);
    // bullOrBear($("#IdxFutSF"));
    
    //pros
    $("#IdxFutLP").html(data[dataKeys[0]][3]["Future Index Long"] - data[dataKeys[1]][3]["Future Index Long"]);
    $("#IdxFutSP").html(data[dataKeys[0]][3]["Future Index Short"] - data[dataKeys[1]][3]["Future Index Short"]);
    // bullOrBear($("#IdxFutSP"));

    //Future Stock
    //clients
    $("#StkFutLC").html(data[dataKeys[0]][0]["Future Stock Long"] - data[dataKeys[1]][0]["Future Stock Long"]);
    $("#StkFutSC").html(data[dataKeys[0]][0]["Future Stock Short"] - data[dataKeys[1]][0]["Future Stock Short"]);
    //diis
    $("#StkFutLD").html(data[dataKeys[0]][1]["Future Stock Long"] - data[dataKeys[1]][1]["Future Stock Long"]);
    $("#StkFutSD").html(data[dataKeys[0]][1]["Future Stock Short"] - data[dataKeys[1]][1]["Future Stock Short"]);
    //fiis
    $("#StkFutLF").html(data[dataKeys[0]][2]["Future Stock Long"] - data[dataKeys[1]][2]["Future Stock Long"]);
    $("#StkFutSF").html(data[dataKeys[0]][2]["Future Stock Short"] - data[dataKeys[1]][2]["Future Stock Short"]);
    //pros
    $("#StkFutLP").html(data[dataKeys[0]][3]["Future Stock Long"] - data[dataKeys[1]][3]["Future Stock Long"]);
    $("#StkFutSP").html(data[dataKeys[0]][3]["Future Stock Short"] - data[dataKeys[1]][3]["Future Stock Short"]);

    //Option Call 
    //clients
    $("#OptCallLC").html(data[dataKeys[0]][0]["Option Index Call Long"] - data[dataKeys[1]][0]["Option Index Call Long"]);
    $("#OptCallSC").html(data[dataKeys[0]][0]["Option Index Call Short"] - data[dataKeys[1]][0]["Option Index Call Short"]);
    //diis
    $("#OptCallLD").html(data[dataKeys[0]][1]["Option Index Call Long"] - data[dataKeys[1]][1]["Option Index Call Long"]);
    $("#OptCallSD").html(data[dataKeys[0]][1]["Option Index Call Short"] - data[dataKeys[1]][1]["Option Index Call Short"]);
    //fiis
    $("#OptCallLF").html(data[dataKeys[0]][2]["Option Index Call Long"] - data[dataKeys[1]][2]["Option Index Call Long"]);
    $("#OptCallSF").html(data[dataKeys[0]][2]["Option Index Call Short"] - data[dataKeys[1]][2]["Option Index Call Short"]);
    //pros
    $("#OptCallLP").html(data[dataKeys[0]][3]["Option Index Call Long"] - data[dataKeys[1]][3]["Option Index Call Long"]);
    $("#OptCallSP").html(data[dataKeys[0]][3]["Option Index Call Short"] - data[dataKeys[1]][3]["Option Index Call Short"]);

    //Option Putt 
    //clients
    $("#OptPutLC").html(data[dataKeys[0]][0]["Option Index Put Long"] - data[dataKeys[1]][0]["Option Index Put Long"]);
    $("#OptPutSC").html(data[dataKeys[0]][0]["Option Index Put Short"] - data[dataKeys[1]][0]["Option Index Put Short"]);
    //diis
    $("#OptPutLD").html(data[dataKeys[0]][1]["Option Index Put Long"] - data[dataKeys[1]][1]["Option Index Put Long"]);
    $("#OptPutSD").html(data[dataKeys[0]][1]["Option Index Put Short"] - data[dataKeys[1]][1]["Option Index Put Short"]);
    //fiis
    $("#OptPutLF").html(data[dataKeys[0]][2]["Option Index Put Long"] - data[dataKeys[1]][2]["Option Index Put Long"]);
    $("#OptPutSF").html(data[dataKeys[0]][2]["Option Index Put Short"] - data[dataKeys[1]][2]["Option Index Put Short"]);
    //pros
    $("#OptPutLP").html(data[dataKeys[0]][3]["Option Index Put Long"] - data[dataKeys[1]][3]["Option Index Put Long"]);
    $("#OptPutSP").html(data[dataKeys[0]][3]["Option Index Put Short"] - data[dataKeys[1]][3]["Option Index Put Short"]);


    $("[data-TargetNum]").each(function(index){
      $(this).attr("data-TargetNum",$(this).html());
      if($(this).html()>0)
        $(this).prev().html("Added "+$(this).prev().html());
      else
        $(this).prev().html("Closed "+$(this).prev().html());
    });

    //bull or bear
      //index fut
    var clients = 0;
    var fiis = 0;
    var diis = 0;
    var pro = 0;
    clients += bullOrBear($("#IdxFutSC"),$("#IdxFutLC").prev(),$("#IdxFutLC").next());
    diis += bullOrBear($("#IdxFutSD"),$("#IdxFutLD").prev(),$("#IdxFutLD").next());
    fiis += bullOrBear($("#IdxFutSF"),$("#IdxFutLF").prev(),$("#IdxFutLF").next());
    pro += bullOrBear($("#IdxFutSP"),$("#IdxFutLP").prev(),$("#IdxFutLP").next());

      //stock fut
    clients += bullOrBear($("#StkFutSC"),$("#StkFutLC").prev(),$("#StkFutLC").next());
    diis += bullOrBear($("#StkFutSD"),$("#StkFutLD").prev(),$("#StkFutLD").next());
    fiis += bullOrBear($("#StkFutSF"),$("#StkFutLF").prev(),$("#StkFutLF").next());
    pro += bullOrBear($("#StkFutSP"),$("#StkFutLP").prev(),$("#StkFutLP").next());

      //stock fut
    clients += bullOrBear($("#OptCallSC"),$("#OptCallLC").prev(),$("#OptCallLC").next());
    diis += bullOrBear($("#OptCallSD"),$("#OptCallLD").prev(),$("#OptCallLD").next());
    fiis += bullOrBear($("#OptCallSF"),$("#OptCallLF").prev(),$("#OptCallLF").next());
    pro += bullOrBear($("#OptCallSP"),$("#OptCallLP").prev(),$("#OptCallLP").next());

      //stock fut
    clients += bullOrBear($("#OptPutSC"),$("#OptPutLC").prev(),$("#OptPutLC").next(),true);
    diis += bullOrBear($("#OptPutSD"),$("#OptPutLD").prev(),$("#OptPutLD").next(),true);
    fiis += bullOrBear($("#OptPutSF"),$("#OptPutLF").prev(),$("#OptPutLF").next(),true);
    pro += bullOrBear($("#OptPutSP"),$("#OptPutLP").prev(),$("#OptPutLP").next(),true);

    //render participant view : bull,bear,neutral
    participantViewRender("#clientView",clients);
    participantViewRender("#diiView",diis);
    participantViewRender("#fiiView",fiis);
    participantViewRender("#proView",pro);

    if (bull > bear)
      $("#mrktSent").html("Bullish").addClass("text-success");
    else if(bear > bull)
      $("#mrktSent").html("Bearish").addClass("text-danger");
    else if(bear == bull)
      $("#mrktSent").html("Neutral").addClass("text-warning");
    
    sntmntChart.data.datasets[0].data = [(bull/(bull+bear)*100).toFixed(2),(bear/(bull+bear)*100).toFixed(2)];
    sntmntChart.update();
    //render nums
    $(function () {

      // ! Counter (used for Social Proof)
  
      /* Usage example
          <div id="counters_1">
              <div ="counter" data-TargetNum="10" data-Speed="6000"></div>
              <div class="counter" data-TargetNum="7" data-Speed="7000" 
              data-Direction="reverse" data-Easing="linear"></div>
              <div class="counter" data-TargetNum="80333" data-Speed="2500">0</div>
          </div>
          <div id="counters_2">
              <div class="counter" data-TargetNum="4200" data-Speed="1000">0</div>
              <div class="counter" data-TargetNum="4500" data-Speed="4000">0</div>
              <div class="counter" data-TargetNum="4743">0</div>
          </div>
          <div id="counters_3">
              <div class="counter" data-TargetNum="5200" data-Speed="1000">0</div>
              <div class="counter" data-TargetNum="5500" data-Speed="4000">0</div>
              <div class="counter" data-TargetNum="5743">0</div>
          </div>
      
         Required attr: data-TargetNum
         Optionals attr: data-Speed(milisecons), data-Direction(reverse), data-Easing(linear, swing)
  
         **CONFIG**
         Please set a the ID's to watch, a class for all counters and a default speed
  
         Avoid to use this script in pages where it isn't needed
      */
  
      // CONFIG
      let visibilityIds = ['#counters_1', '#counters_2', '#counters_3']; //must be an array, could have only one element
      let counterClass = '.counter';
      let defaultSpeed = 3000; //default value
  
      // END CONFIG
  
      //init if it becomes visible by scrolling
      $(window).on('scroll', function () {
          
      });
  
      //init if it's visible by page loading
      getVisibilityStatus();
  
      function getVisibilityStatus() {
          elValFromTop = [];
          var windowHeight = $(window).height(),
              windowScrollValFromTop = $(this).scrollTop();
  
          visibilityIds.forEach(function (item, index) { //Call each class
              try { //avoid error if class not exist
                  elValFromTop[index] = Math.ceil($(item).offset().top);
              } catch (err) {
                  return;
              }
              // if the sum of the window height and scroll distance from the top is greater than the target element's distance from the top, 
              //it should be in view and the event should fire, otherwise reverse any previously applied methods
              if ((windowHeight + windowScrollValFromTop) > elValFromTop[index]) {
                  counter_init(item);
              }
          });
      }
  
      function counter_init(groupId) {
          let num, speed, direction, index = 0;
          $(counterClass).each(function () {
              num = $(this).attr('data-TargetNum');
              speed = $(this).attr('data-Speed');
              direction = $(this).attr('data-Direction');
              easing = $(this).attr('data-Easing');
              if (speed == undefined) speed = defaultSpeed;
              $(this).addClass('c_' + index); //add a class to recognize each counter
              doCount(num, index, speed, groupId, direction, easing);
              index++;
          });
      }
  
      function doCount(num, index, speed, groupClass, direction, easing) {
          let className = groupClass + ' ' + counterClass + '.' + 'c_' + index;
          if(easing == undefined) easing = "swing";
          $(className).animate({
              num
          }, {
              duration: +speed,
              easing: easing,
              step: function (now) {
                  if (direction == 'reverse') {
                      $(this).text(num - Math.floor(now));
                  } else {
                      $(this).text(Math.floor(now));
                  }
              },
              complete: doCount
          });
          for(const elem of $(".counter")){
              elem.innerHTML = number_format(elem.innerHTML);
          }
      }
  
  
  })
  }

  function participantViewRender(partyElem,partyView){
    if (partyView >= 1)
      $(partyElem).html("Bullish").addClass("text-success");
    else if(partyView <= -1)
      $(partyElem).html("Bearish").addClass("text-danger");
    else if(partyView == 0)
      $(partyElem).html("Neutral").addClass("text-warning");
  }
  var bull = 0;
  var bear = 0;
  function bullOrBear(elem,td1,td2,isPut=false){
    // console.log(td1.next().html());
    // return;
    var whtIs = 0;
    // bullish = 1, bearish = -1,neutral = 0

    if(td1.html() == "Added Longs" && td2.html() == "Closed Shorts"){
      if(!isPut){
        $(elem).next().html("Bullish").addClass("text-success");
        bull++;
        whtIs = 1;
      }
      else{
        $(elem).next().html("Bearish").addClass("text-danger");
        bear++;
        whtIs = -1
      }
    }
    else if(td1.html() == "Closed Longs" && td2.html() == "Added Shorts"){
      if(!isPut){
        $(elem).next().html("Bearish").addClass("text-danger");
        bear++;
        whtIs = -1;
      }
      else{
        $(elem).next().html("Bullish").addClass("text-success");
        bull++;
        whtIs = 1;
      }
    }
    else
    {
      // console.log( );
      if (parseInt(td1.next().html()) > parseInt(td2.next().html()) ){
        if(!isPut){
          $(elem).next().html("Bullish").addClass("text-success");
          bull++;
          whtIs = 1;
        }
        else{
          $(elem).next().html("Bearish").addClass("text-danger");
          bear++;
          whtIs = -1;
        }
      }
      else if (parseInt(td1.next().html()) < parseInt(td2.next().html())){
        if(!isPut){
          $(elem).next().html("Bearish").addClass("text-danger");
          bear++;
          whtIs = -1;
        }
        else{
          $(elem).next().html("Bullish").addClass("text-success");
          bull++;
          whtIs = 1;
        }
      }
      else
        $(elem).next().html("Neutral").addClass("text-warning");
    }

    return whtIs;
  }
  function updateChart(chtData="Future Index",elem){
    $(".dropdown-item").css("cursor","pointer");
    if(elem != null)
    {
      $(".dropdown-item").removeClass("active");
      $(elem).addClass("active");
    }  
    var arr = [];
    var client = [];
    var dii = [];
    var fii = [];
    var pro = [];
    $("#chartTitle").html(chtData+" Data");
    myLineChart.options.title.text = chtData+" Data";

    for (let i = 0; i < 7; i++) {
      var date = new Date(dataKeys[i]);

      client.push( data[dataKeys[i]][0][chtData+" Long"] - data[dataKeys[i]][0][chtData+" Short"] );
      dii.push( data[dataKeys[i]][1][chtData+" Long"] - data[dataKeys[i]][1][chtData+" Short"] );
      fii.push( data[dataKeys[i]][2][chtData+" Long"] - data[dataKeys[i]][2][chtData+" Short"] );
      pro.push( data[dataKeys[i]][3][chtData+" Long"] - data[dataKeys[i]][3][chtData+" Short"] );

      arr.push(date.getDate()+" "+monthNames[date.getMonth()]);
    }
    myLineChart.data.datasets[0].label = "Client";
    myLineChart.data.datasets[1].label = "DIIs";
    myLineChart.data.datasets[2].label = "FIIs";
    myLineChart.data.datasets[3].label = "Pro";

    myLineChart.data.datasets[0].data = client.reverse();
    myLineChart.data.datasets[1].data = dii.reverse();
    myLineChart.data.datasets[2].data = fii.reverse();
    myLineChart.data.datasets[3].data = pro.reverse();

    myLineChart.data.labels = arr.reverse();
    myLineChart.update();
  }

  function fillCanvasBackgroundWithColor(canvas, color) {
    // Get the 2D drawing context from the provided canvas.
    const context = canvas.getContext('2d');
    context.save();
  
    context.globalCompositeOperation = 'destination-over';
  
    // Fill in the background. We do this by drawing a rectangle
    // filling the entire canvas, using the provided color.
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Restore the original context state from `context.save()`
    context.restore();
  }

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }