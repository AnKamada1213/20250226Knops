$(function () {
  // 初期表示時に DownMove クラスを追加
  $('#page-top, #line').addClass('DownMove');

  // スムーススクロール
  $('a[href^="#"]').click(function (e) {
    if ($(this).closest('.tab').length) {
      return;
    }
    let href = $(this).attr("href");
    let target = $(href === "#" || href === "" ? "html" : href);
    let position = target.offset().top;
    $("html, body").animate({ scrollTop: position }, 600, "swing");
    e.preventDefault();
  });

  // PageTop と Line ボタンの表示/非表示制御
  function PageTopAnime() {
    const scroll = $(window).scrollTop();
    const documentHeight = $(document).height();
    const windowHeight = $(window).height();
    const offset = 200;

    if (scroll >= window.innerHeight) {
      $('#page-top, #line, #hotpepper').removeClass('Hidden DownMove FadeOut').addClass('UpMove');
    } else {
      $('#page-top, #line, #hotpepper').addClass('Hidden');
    }

    if (scroll > documentHeight - windowHeight - offset) {
      $('#page-top, #line, #hotpepper').removeClass('UpMove').addClass('FadeOut');
    } else {
      $('#page-top, #line, #hotpepper').removeClass('FadeOut');
    }
  }

  // 初期状態で非表示設定
  $(window).on("load", function () {
    PageTopAnime();
  });

  // スクロールイベント
  $(window).scroll(PageTopAnime);

  // ページトップボタンのクリックでスムーズスクロール
  $('#page-top a').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });

  $(function () {
    function fadeInOnScroll() {
        $(".fade-in").each(function () {
            let elementTop = $(this).offset().top; // 要素の位置
            let windowHeight = $(window).height(); // ウィンドウの高さ
            let scrollTop = $(window).scrollTop(); // スクロール量

            // 画面の1/10（10%）スクロールしたら表示
            if (scrollTop + windowHeight * 0.1 > elementTop) {
                $(this).addClass("visible");
            }
        });
    }

    $(window).on("scroll", fadeInOnScroll);
    fadeInOnScroll(); // 初回実行
});

  // アコーディオンエリア
  $('.qa_title').on('click', function () {
    var findElm = $(this).next(".qa_box");
    $(findElm).slideToggle();
    $(this).toggleClass('close');
  });

  $('.accordion-area section:first-of-type').addClass("open");
  $(".open").each(function () {
    $(this).children('.qa_title').addClass('close');
    $(this).children('.qa_box').slideDown(500);
  });

  // トップページのメッセージ
  $(".text-box p").css({
    opacity: 0,
    transform: "translateX(-50px)"
  });

  $(".text-box p").each(function (index) {
    $(this).delay(index * 500).queue(function (next) {
      $(this).css({
        opacity: 1,
        transform: "translateX(0)",
        transition: "opacity 2s ease-out, transform 2s ease-out"
      });
      next();
    });
  });

});
