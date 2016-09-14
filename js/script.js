/* Owl Slider v0.0.1 alpha | VNBStudio.ru */
function OS(obj){
  this.showEl = 0;
  this.interval = false;
  this.settings = {
    'speed':2000,
    'width':500,
    'height':200,
    'paginator':true,
  };
  $.extend(this.settings,obj.settings);
  if(obj.container!==undefined){
    this.container = obj.container;
  } else {
      console.log('Контейнер не определен');
    return false;
  }
  if(obj.img!==undefined){
    this.img = obj.img;
  } else {
      console.log('Адреса изображений не определены');
    return false;
  }
  this.build();
}

OS.prototype.build = function(){
  var self = this;
  $(this.container).css({
    'width':this.settings.width,
    'height':this.settings.height,
  });
  var paginator = $('<span/>');
  $.each(this.img,function(key,value){
    var el = $('<div/>',{
      "data-os-num":key,
      "css":{
        "background-image":"url('"+value.img+"')",
        'width':self.settings.width,
        'height':self.settings.height,
        'position':'absolute',
      }
    });
    var pEl = $('<em/>',{
      "data-os-num":key,
      'click':function(){
        clearInterval(self.interval);
        self.showEl = key;
        $(self.container+'>span>em').removeClass('active');
        $(self.container+'>div').css('opacity',0);
        $(self.container+'>div[data-os-num="'+key+'"]').animate({
          'opacity':1,
        }).show();
        $(self.container+'>span>em[data-os-num="'+key+'"]').addClass('active');
        self.OWLart();
      },
    });
    if(key!==0){
      el.hide();
      el.css('opacity',0);
    } else {
      el.css('opacity',1);
      pEl.addClass('active');
    }
    $(self.container).append(el);

    paginator.append(pEl);
  });
  $(self.container).append(paginator);
  this.OWLart();
};

OS.prototype.OWLart = function(){
  var self = this;
  this.interval = setInterval(function(){
    var elements = $(self.container+'>div');
    var length = elements.length;
    elements.hide();
    if(self.showEl==(length-1)){
      self.showEl = 0;
    } else {
      self.showEl = self.showEl+1;
    }
    $.each(elements,function(key,value){
      $(self.container+'>span>em').removeClass('active');
      if($(value).attr('data-os-num')==self.showEl){
        $(value).animate({
          'opacity':1,
        }).show();
      } else {
        $(value).css('opacity',0);
      }
      $(self.container+'>span>em[data-os-num="'+self.showEl+'"]').addClass('active');
    });
  },self.settings.speed);
};

$(document).ready(function(){
  new OS({
          'container':'.OWL-slider',
          'img':[
            {
              'img':'img/1.jpg',
            },
            {
              'img':'img/2.jpg',
            },
            {
              'img':'img/3.jpg',
            },
            {
              'img':'img/2.jpg',
            },
          ],
          'settings':{
                      'speed':3000,
                      'width':800,
                      'height':350,
                     }
        }
      );
});
