$(document).on('ready', function() {
  $('.whatis__slider-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.whatis__slider-nav',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000
  });
  $('.whatis__slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.whatis__slider-main',
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000
  });

  var list = $('.vants-list');
  var blockPosition = list.offset().top;
  var wh = $(window).height();
  var ww = $(window).width();
  if (ww > 992) {
    $(window).on('scroll', () => {
      var currentScroll = $(this).scrollTop();
      if (currentScroll > blockPosition - wh * 0.7) {
        list.addClass('slideInHalf');
      }
    });

    function addClass() {
      list.removeClass('slideInHalf');
    }

    list.on('mouseenter', () => {
      if (!list.hasClass('slideInFull')) {
        list.addClass('slideInFull');
        setTimeout(addClass, 2000);
      }
    });
  } else {
    list.addClass('slideInFull');
  }

  $('.date').html(moment().subtract(2, 'days').format('DD.MM.YYYY'));

  var timer = function(element) {
    var _currentDate = new Date();
    var count = 31;
    var _toDate = new Date(_currentDate.getFullYear(),
        _currentDate.getMonth(),
        _currentDate.getDate(),
        _currentDate.getHours(),
        _currentDate.getMinutes() + count, 1);
    element.countdown(_toDate, function(event) {
        var hours = event.strftime('%H');
        var min = event.strftime('%M');
        var sec = event.strftime('%S');
        $('.hour1').text(hours[0]);
        $('.hour2').text(hours[1]);
        $('.minute1').text(min[0]);
        $('.minute2').text(min[1]);
        $('.second1').text(sec[0]);
        $('.second2').text(sec[1]);
    });
  };
  timer($('.timer-wrap'));

  var reviewName = '';
  var reviewContent = '';
  var reviewRating = 0;

  $('.rating input').on('click', function() {
    reviewRating = ($(this).val());
  });

  $('.submitReview').on('click', function(){
    var nameRawVal = $('.testimonials-submit #name').val();
    var nameVal = nameRawVal.toLowerCase().charAt(0).toUpperCase() + nameRawVal.slice(1);
    var contentVal = $('.testimonials-submit #review').val();
    setTimeout(() => {
      createReviewItem(nameVal, contentVal, reviewRating);
      $('.reviewForm, input, textarea').val('');
      $('[name="rating"]').prop('checked', false);
    }, 1500);
  });

  function createReviewItem(name, content, rating) {
    reviewName = name;
    reviewContent = content;
    var reviewDate = moment().format('DD.MM.YYYY');
    reviewRating = rating;
    var papa = $('.testimonials-list');
    papa.prepend(`
    <li class="testimonials-list__item test-item">
    <div class="review-header">
      <div class="review__avatar"></div>
      <div class="review__data">
        <div class="review__person">
          <span class="name" data-name>${reviewName}</span
          ><span class="date">${reviewDate}</span>
        </div>
        <span class="rating star${reviewRating}" data-rating></span>
      </div>
    </div>
    <div class="review-content" data-content>
      <p>
      ${reviewContent}
      </p>
    </div>
  </li>
    `);
  }
});

$(document).on('click', 'a[href^="#"]', function(e) {
  // target element id
  var id = $(this).attr('href');

  // target element
  var $id = $(id);
  if ($id.length === 0) {
    return;
  }

  // prevent standard hash navigation (avoid blinking in IE)
  e.preventDefault();

  // top position relative to the document
  var pos = $id.offset().top;

  // animated top scrolling
  $('body, html').animate({ scrollTop: pos });
});
