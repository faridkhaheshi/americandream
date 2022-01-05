var wordsPerPage = 300;

var persianDigitLookup = {
  "0": String.fromCharCode(1776),
  "1": String.fromCharCode(1777),
  "2": String.fromCharCode(1778),
  "3": String.fromCharCode(1779),
  "4": String.fromCharCode(1780),
  "5": String.fromCharCode(1781),
  "6": String.fromCharCode(1782),
  "7": String.fromCharCode(1783),
  "8": String.fromCharCode(1784),
  "9": String.fromCharCode(1785)
};

document.addEventListener("DOMContentLoaded", function() {
  var article = document.querySelector("#main-content");
  var wordAtStart = parseInt(article.dataset.atStart);
  var wordCount = parseInt(article.dataset.contains);
  var totalWords = parseInt(article.dataset.totalWords);

  var currentPage = null;
  var elem = document.getElementById("page-number");

  function word2page(wordCount) {
    if (wordCount === 0) return 1; // for the cover page.
    return Math.ceil(wordCount / wordsPerPage);
  }

  function percent2pages(percent) {
    var wordsRead = Math.ceil(percent * wordCount) + wordAtStart;
    return word2page(wordsRead);
  }

  function getWindowHeight() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0
    );
  }

  function getWindowYScroll() {
    return (
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      0
    );
  }

  function getDocHeight() {
    return Math.max(
      document.body.scrollHeight || 0,
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0,
      document.documentElement.offsetHeight || 0,
      document.body.clientHeight || 0,
      document.documentElement.clientHeight || 0
    );
  }

  function calcPage() {
    var scrollPosition = getWindowYScroll();
    var winHeight = getWindowHeight();
    var docHeight = getDocHeight();
    var seen = scrollPosition + winHeight;
    var percent = scrollPosition / (docHeight - winHeight);
    var page = percent2pages(percent);
    var totalPages = word2page(totalWords);
    return { page: page, totalPages: totalPages };
  }

  function polishNumber(number) {
    var strNum = number.toString();
    var converted = strNum.split("").reduce(function(acc, c) {
      var convertedChar = persianDigitLookup[c];
      return acc + convertedChar;
    }, "");
    return converted;
  }

  function updatePage() {
    var pageInfo = calcPage();
    if (pageInfo.page !== currentPage) {
      // only update on when new page reached
      currentPage = pageInfo.page;
      elem.innerHTML =
        polishNumber(pageInfo.page) +
        " از " +
        polishNumber(pageInfo.totalPages);
    }
  }
  updatePage();
  window.addEventListener("scroll", function() {
    updatePage();
  });

  var openMenuButton = document.getElementById("menu-button");
  var closeMenuButton = document.getElementById("close-modal-button");
  var menu = document.getElementById("menu");
  openMenuButton.addEventListener("click", function() {
    menu.classList.add("is-visible");
  });
  closeMenuButton.addEventListener("click", function() {
    menu.classList.remove("is-visible");
  });
  document.addEventListener("click", e => {
    if (e.target == document.querySelector(".menu-modal.is-visible")) {
      menu.classList.remove("is-visible");
    }
  });
  document.addEventListener("keyup", e => {
    if (e.key == "Escape" && document.querySelector(".menu-modal.is-visible")) {
      menu.classList.remove("is-visible");
    }
  });
});
