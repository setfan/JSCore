//Giphy Search Module
var GiphySearch = (function () {

  var giphyConfig = {
    baseUrl: "//api.giphy.com/v1/gifs",
    apiKey: "dc6zaTOxFJmzC",
    apiURL: "&api_key=",
    rating: "&rating=pg",
    limit: "&limit=50",
    searchURL: "/search?q=",
    trending: "/trending"
  };

  var Grid;

  var searchInput,
    searchResults,
    searchResultsView,
    searchButton,
    searchButtonReply,
    loadMore;

  var destFunction = 'comment';

  //utility functions
  function debounce(func, wait, immediate) {
    var timeout;

    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function validIdentifier(s) {
    //is it blank?
    if (s === "") return false;
    //must be at least 2 chars
    if (s.length < 3) return false;
    //only letters and spaces
    if (/[^a-z0-9 ]/i.test(s)) return false;

    return true;
  }

  function buildSearchURL(searchTerm) {
    var termsArray = searchTerm.split(' ');

    for (var i = termsArray.length - 1; i >= 0; i--) {
      termsArray[i] = encodeURIComponent(termsArray[i]);
    }

    var searchQuery = termsArray.join('+');


    return giphyConfig.baseUrl + giphyConfig.searchURL + searchQuery + giphyConfig.rating + giphyConfig.limit + giphyConfig.apiURL + giphyConfig.apiKey;
  }

  function searchGiphy(searchTerm) {

    var request = buildSearchURL(searchTerm);

    fetch(request)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        (json.data.length > 0) ? populateSearchTerms(json) : showNoResultsMessage();
      })
      .catch(function (error) {
        console.log('something went wrong :( BUt this may help ' + error);
      });
  }





  function showNoResultsMessage() {
    document.querySelector('.search-results-view').classList.remove('transition-results', 'show-gifs', 'gif-hidden');
    document.querySelector('.search-results-view').classList.add('show-results', 'show-no-results');

    document.querySelector('.js-no-results').innerHTML = "No results for the search: " + searchInput.value;
  }



  function buildHTMLGIF(gifData) {
    var image = document.createElement('img');
    image.setAttribute("class", 'result-gif-link');
    image.setAttribute("id", "imagegresult");
    $(image).addClass(destFunction);
    image.src = gifData.images.fixed_width.url;
    image.width = gifData.images.fixed_width.width;
    image.height = gifData.images.fixed_width.height;
    image.alt = gifData.source;

    return image.outerHTML;
  }


  function populateSearchTerms(json) {
    searchResultsView.removeClass('gif-hidden');
    searchResultsView.addClass('show-results transition-results show-gifs');

    //empty results
    searchResults.html('');

    var htmlResults = "";

    for (var i = 0, length = json.data.length; i < length; i++) {
      htmlResults += buildHTMLGIF(json.data[i]);
    }

    searchResults.html(htmlResults);

    setTimeout(initializeMasonryLayout, 250);
  }

  function initializeMasonryLayout() {
    Grid = new Masonry(searchResults, {
      itemSelector: '.result-gif-link',
      columnWidth: 200,
      gutter: 16
    });
  }

  function handleSearchLogic(a) {
    var searchField = $(a.target);
    destFunction = searchField.data('function');

    if (destFunction == 'comment') {
      var dest = '#newCommentAttachment';
    } else {
      var dest = '#replyCommentAttachment';
    }

    searchResults = $(dest).find('.search-results');
    searchResultsView = $(dest).find('.search-results-view');

    if (validIdentifier(searchField.val())) {
      searchGiphy(searchField.val());
    }
  }

  function bindElementListeners() {
    searchInput.on('keyup', debounce(handleSearchLogic, 250));
    searchInputReply.on('keyup', debounce(handleSearchLogic, 250));

    // TODO: Fix, not working! Target is the button itself.
    searchButton.on('click', debounce(handleSearchLogic, 250));
    searchButtonReply.on('click', debounce(handleSearchLogic, 250));
  }


  function setupSearch(privateKey) {
    if (!!privateKey) {
      giphyConfig.apiKey = privateKey;
    }

    searchInput = $('#newCommentAttachment' + '> .gif-search > input');
    searchInputReply = $('#replyCommentAttachment' + '> .gif-search > input');

    searchButton = $('#newCommentAttachment' + '> .gif-search > .btn');
    searchButtonReply = $('#replyCommentAttachment' + '> .gif-search > .btn');

    bindElementListeners();
  }


  //Giphy API - Public functions
  return {
    init: setupSearch
  };

}());


var publicKey = 'dc6zaTOxFJmzC';

GiphySearch.init(publicKey);

//polyfills
if ("document" in self) { if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) { (function (t) { "use strict"; if (!("Element" in t)) return; var e = "classList", i = "prototype", n = t.Element[i], s = Object, r = String[i].trim || function () { return this.replace(/^\s+|\s+$/g, "") }, a = Array[i].indexOf || function (t) { var e = 0, i = this.length; for (; e < i; e++) { if (e in this && this[e] === t) { return e } } return -1 }, o = function (t, e) { this.name = t; this.code = DOMException[t]; this.message = e }, l = function (t, e) { if (e === "") { throw new o("SYNTAX_ERR", "An invalid or illegal string was specified") } if (/\s/.test(e)) { throw new o("INVALID_CHARACTER_ERR", "String contains an invalid character") } return a.call(t, e) }, c = function (t) { var e = r.call(t.getAttribute("class") || ""), i = e ? e.split(/\s+/) : [], n = 0, s = i.length; for (; n < s; n++) { this.push(i[n]) } this._updateClassName = function () { t.setAttribute("class", this.toString()) } }, u = c[i] = [], f = function () { return new c(this) }; o[i] = Error[i]; u.item = function (t) { return this[t] || null }; u.contains = function (t) { t += ""; return l(this, t) !== -1 }; u.add = function () { var t = arguments, e = 0, i = t.length, n, s = false; do { n = t[e] + ""; if (l(this, n) === -1) { this.push(n); s = true } } while (++e < i); if (s) { this._updateClassName() } }; u.remove = function () { var t = arguments, e = 0, i = t.length, n, s = false, r; do { n = t[e] + ""; r = l(this, n); while (r !== -1) { this.splice(r, 1); s = true; r = l(this, n) } } while (++e < i); if (s) { this._updateClassName() } }; u.toggle = function (t, e) { t += ""; var i = this.contains(t), n = i ? e !== true && "remove" : e !== false && "add"; if (n) { this[n](t) } if (e === true || e === false) { return e } else { return !i } }; u.toString = function () { return this.join(" ") }; if (s.defineProperty) { var h = { get: f, enumerable: true, configurable: true }; try { s.defineProperty(n, e, h) } catch (d) { if (d.number === -2146823252) { h.enumerable = false; s.defineProperty(n, e, h) } } } else if (s[i].__defineGetter__) { n.__defineGetter__(e, f) } })(self) } else { (function () { "use strict"; var t = document.createElement("_"); t.classList.add("c1", "c2"); if (!t.classList.contains("c2")) { var e = function (t) { var e = DOMTokenList.prototype[t]; DOMTokenList.prototype[t] = function (t) { var i, n = arguments.length; for (i = 0; i < n; i++) { t = arguments[i]; e.call(this, t) } } }; e("add"); e("remove") } t.classList.toggle("c3", false); if (t.classList.contains("c3")) { var i = DOMTokenList.prototype.toggle; DOMTokenList.prototype.toggle = function (t, e) { if (1 in arguments && !this.contains(t) === !e) { return e } else { return i.call(this, t) } } } t = null })() } }


function toggleSearchGif(dest) {
  $(dest + '>.gif-search').slideToggle();
  $(dest + '>.attachment-selector > .attachGIF').toggleClass('attachment-selected');
  if ($(dest + '>.attachment-selector > .attachGIF').hasClass('attachment-selected')) {
    $(dest + '>.gif-search > input').focus();
  } else {
    $(dest + '>.search-results-view').addClass('gif-hidden');
  }
}

function removeAttachment(dest) {
  $(dest + '>.attachment-selector > .attachGIF').removeClass('attachment-selected');
  $(dest + '>.attachment-selector > .attachImage').removeClass('attachment-selected');
  $(dest + '>.attachment-selector').removeClass('gif-hidden');

  $(dest + '>.gif-selector').addClass('gif-hidden');
  $(dest + '>.gif-selector > .preview').attr('src', '');

  $(dest + '.inputfile').val('');
  $(dest + '>.gif-selector > input').val('');
}

function uploadCommentPhoto(sender) {
  var dest = '#newCommentAttachment';
  var reader = new FileReader();

  reader.onload = function (e) {
    $(dest + '>.gif-selector').removeClass('gif-hidden');
    $(dest + '>.gif-selector > .preview').attr('src', e.target.result);
    $(dest + '>.attachment-selector').addClass('gif-hidden');

    $('#txtCommentBody').focus();
  };

  reader.readAsDataURL(sender.files[0]);
}


function uploadReplyPhoto(sender) {
  var dest = '#replyCommentAttachment';
  var reader = new FileReader();

  reader.onload = function (e) {
    $(dest + '>.gif-selector').removeClass('gif-hidden');
    $(dest + '>.gif-selector > .preview').attr('src', e.target.result);
    $(dest + '>.attachment-selector').addClass('gif-hidden');

    $('#txtReplyBody').focus();
  };

  reader.readAsDataURL(sender.files[0]);
}



$(document).ready(function(){
  $(document).on('click', '.result-gif-link', function(){
    var $this = $(this);
    var url = $this.attr('src');

    var isCommentGif = $(this).hasClass('comment');
    var dest = isCommentGif ? '#newCommentAttachment' : '#replyCommentAttachment';

    $(dest + '>.search-results-view').addClass('gif-hidden');
    $(dest + '>.gif-search').slideUp();
    $(dest + '>.attachment-selector').addClass('gif-hidden');

    $(dest + '>.gif-selector').removeClass('gif-hidden');

    $(dest + '>.gif-selector > .preview').attr('src', url);

    if (isCommentGif) {
      $('#hdnGiphyUrlComment').val(url);
      $('#txtCommentBody').focus();
    } else {
      $('#hdnGiphyUrlReply').val(url);
      $('#txtReplyBody').focus();
    }


  })
})