/**
 * @author Sławomir Kokłowski {@link https://www.kurshtml.edu.pl}
 * @copyright NIE usuwaj tego komentarza! (Do NOT remove this comment!)
 * @version 2.5.1
 */

// *With changes by Jack's Style

function GalleryModel(items) {
  this.items = items || [];
}

GalleryModel.prototype.get = function (index) {
  var item = this.items[index];
  if (!item) {
    return null;
  }
  return {
    title: item.getAttribute("data-gallery"),
    src: this._getSrc(item),
    alt: item.title,
    protected: !item.getAttribute("href"),
  };
};

GalleryModel.prototype.indexOf = function (src) {
  for (var i = 0; i < this.items.length; ++i) {
    var item = this.items[i];
    if (this._getSrc(item) === src) {
      return i;
    }
  }
  return -1;
};

GalleryModel.prototype.count = function () {
  return this.items.length;
};

GalleryModel.prototype.preload = function (index) {
  var item = this.items[index];
  if (item) {
    new Image().src = item.href;
  }
};

GalleryModel.prototype._getSrc = function (item) {
  return item.getAttribute("href") || item.getAttribute("data-href");
};

function GalleryView(items) {
  this.items = items || [];
  this._reset();
  this.style = this._createStyle();
  this.delay = 500;
  this._overflow = "";
  this._timeout = null;
  this._listeners = [];
  this._protectedEvents = [
    "mousedown",
    "contextmenu",
    "selectstart",
    "select",
    "copy",
    "dragstart",
    "drag",
  ];
}

GalleryView.prototype.start = function (callback) {
  this.items.forEach(function (item) {
    var src = item.getAttribute("href");
    if (!src) {
      src = item.getAttribute("data-href");
      item.style.cursor = "pointer";
    }
    item.addEventListener("click", function (event) {
      callback(src);
      event.preventDefault();
    });
  });
};

GalleryView.prototype.open = function (goBack, goForward, onClose, onLoad) {
  this.onLoad = onLoad;
  this._overflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  this.container = this._createContainer();
  this.progress = this._createPropress();
  this.container.appendChild(this.progress);
  this.caption = this._createCaption();
  this.container.appendChild(this.caption);
  this.back = this._createNavigation("&#10094;", this.style.back, goBack);
  this.container.appendChild(this.back);
  this.forward = this._createNavigation(
    "&#10095;",
    this.style.forward,
    goForward
  );
  this.container.appendChild(this.forward);
  this.container.appendChild(this._createCloseButton(onClose));
  document.body.appendChild(this.container);
  this._addListener(
    document,
    "keydown",
    this._onKeyDown.bind(this, goBack, goForward, onClose)
  );
};

GalleryView.prototype.close = function (callback) {
  clearTimeout(this._timeout);
  this._listeners.forEach(function (listener) {
    listener.target.removeEventListener(listener.type, listener.callback);
  });
  this._listeners = [];
  this.container.parentNode.removeChild(this.container);
  document.body.style.overflow = this._overflow;
  this._reset();
  if (callback) {
    callback();
  }
};

GalleryView.prototype.display = function (image, first, last) {
  this[first ? "_hide" : "_show"]("back");
  this[last ? "_hide" : "_show"]("forward");
  this._hide("caption");
  this.setCaption(image.title, image.alt);
  if (this.image) {
    this.image.style.visibility = "hidden";
    this._displayProgress();
    if (image.protected) {
      this._protect();
    }
    this.image.src = image.src;
    if (!image.protected) {
      this._unprotect();
    }
  } else {
    this._displayProgress();
    this.image = this._createImage(image.src);
    this.image.style.visibility = "hidden";
    if (image.protected) {
      this._protect();
    }
    this.container.insertBefore(this.image, this.container.firstChild);
  }
};

GalleryView.prototype.setCaption = function (title, alt) {
  this.caption.innerHTML = "";
  if (title) {
    var b = document.createElement("b");
    b.innerText = title;
    this.caption.appendChild(b);
  }
  if (alt) {
    if (title) {
      this.caption.appendChild(document.createElement("br"));
    }
    this.caption.appendChild(document.createTextNode(alt));
  }
};

GalleryView.prototype._protect = function () {
  var callback = function (event) {
    event.preventDefault();
  };
  this._protectedEvents.forEach(function (type) {
    this._addListener(this.image, type, callback);
  }, this);
  this.image.galleryimg = "no";
};

GalleryView.prototype._unprotect = function () {
  this.image.removeAttribute("galleryimg");
  var listeners = [];
  this._listeners.forEach(function (listener) {
    if (
      listener.target === this.image &&
      this._protectedEvents.indexOf(listener.type) >= 0
    ) {
      listener.target.removeEventListener(listener.type, listener.callback);
    } else {
      listeners.push(listener);
    }
  }, this);
  this._listeners = listeners;
};

GalleryView.prototype._reset = function () {
  this.container = null;
  this.image = null;
  this.progress = null;
  this.caption = null;
  this.back = null;
  this.forward = null;
  this.onLoad = null;
};

GalleryView.prototype._addListener = function (target, type, callback) {
  this._listeners.push({
    target: target,
    type: type,
    callback: callback,
  });
  target.addEventListener(type, callback);
};

GalleryView.prototype._onKeyDown = function (
  goBack,
  goForward,
  onClose,
  event
) {
  switch (event.keyCode) {
    case 27:
      this.close(onClose);
      break;
    case 37:
      goBack(event);
      break;
    case 39:
      goForward(event);
      break;
  }
};

GalleryView.prototype._createStyle = function () {
  var margin = "20px";
  var overlayStyle = {
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  var buttonStyle = {
    border: 0,
    padding: 0,
    lineHeight: 1,
    color: "#111",
    background: "rgba(255, 255, 255, 0.3)",
    cursor: "pointer",
  };
  var navigationStyle = {
    fontSize: "26px",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    position: "absolute",
    fontWeight: "bold",
  };
  var style = {
    container: {
      position: "fixed",
      zIndex: 6000000,
      background: "rgba(0, 0, 0, 0.92)",
    },
    image: {
      maxWidth: "90%",
      maxHeight: "90%",
    },
    progress: {
      position: "absolute",
    },
    caption: {
      position: "absolute",
      bottom: 0,
      left: 0,
      boxSizing: "border-box",
      width: "100%",
      padding: margin,
      color: "#fff",
      background: "rgba(0, 0, 0, 0.5)",
      font: "15px sans-serif",
      textAlign: "center",
    },
    back: {
      left: margin,
    },
    forward: {
      right: margin,
    },
    close: {
      borderRadius: "20%",
      position: "absolute",
      top: margin,
      right: margin,
      fontSize: "20px",
      width: "30px",
      height: "30px",
    },
  };
  this._forEach(overlayStyle, function (key, value) {
    style.container[key] = style.progress[key] = value;
  });
  this._forEach(buttonStyle, function (key, value) {
    style.close[key] = style.back[key] = style.forward[key] = value;
  });
  this._forEach(navigationStyle, function (key, value) {
    style.back[key] = style.forward[key] = value;
  });
  return style;
};

GalleryView.prototype._forEach = function (data, callback) {
  for (var key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      callback.call(this, key, data[key]);
    }
  }
};

GalleryView.prototype._show = function (name) {
  this[name].style.display = this.style[name].display || "";
};

GalleryView.prototype._hide = function (name) {
  this[name].style.display = "none";
};

GalleryView.prototype._setStyle = function (element, style) {
  this._forEach(style, function (key, value) {
    element.style[key] = value;
  });
};

GalleryView.prototype._createContainer = function () {
  var div = document.createElement("div");
  this._setStyle(div, this.style.container);
  return div;
};

GalleryView.prototype._createImage = function (src) {
  var img = document.createElement("img");
  this._addListener(img, "load", this._onLoad.bind(this));
  this._setStyle(img, this.style.image);
  img.src = src;
  return img;
};

GalleryView.prototype._createPropress = function () {
  var div = document.createElement("div");
  this._setStyle(div, this.style.progress);
  div.style.display = "none";
  div.appendChild(document.createElement("progress"));
  return div;
};

GalleryView.prototype._displayProgress = function () {
  clearTimeout(this._timeout);
  this._timeout = setTimeout(this._show.bind(this, "progress"), this.delay);
};

GalleryView.prototype._createCaption = function () {
  var div = document.createElement("div");
  this._setStyle(div, this.style.caption);
  div.style.display = "none";
  return div;
};

GalleryView.prototype._createNavigation = function (text, style, callback) {
  var button = document.createElement("button");
  button.type = "button";
  this._setStyle(button, style);
  button.style.display = "none";
  button.innerHTML = text;
  this._addListener(button, "click", callback);
  return button;
};

GalleryView.prototype._createCloseButton = function (callback) {
  var button = document.createElement("button");
  button.type = "button";
  this._setStyle(button, this.style.close);
  button.innerHTML = "&#10006;";
  this._addListener(button, "click", this.close.bind(this, callback));
  return button;
};

GalleryView.prototype._onLoad = function () {
  clearTimeout(this._timeout);
  this._hide("progress");
  this.image.style.visibility = "visible";
  if (this.caption.innerText) {
    this._show("caption");
  }
  if (this.onLoad) {
    this.onLoad();
  }
};

function Gallery(model, view) {
  this.model = model;
  this.view = view;
  this.current = 0;
  this.opened = false;
  this.hash = "";
}

Gallery.prototype.start = function () {
  this.view.start(this.display.bind(this));
  if (location.hash) {
    var current = this.model.indexOf(location.hash.substring(1));
    if (current >= 0) {
      this.display(current);
    }
  }
};

Gallery.prototype.display = function (data) {
  var index = typeof data === "string" ? this.model.indexOf(data) : data;
  var image = this.model.get(index);
  if (image) {
    this.current = index;
    if (!this.opened) {
      this.hash = location.hash;
      this.view.open(
        this.goBack.bind(this),
        this.goForward.bind(this),
        this._onClose.bind(this),
        this._onLoad.bind(this)
      );
      this.opened = true;
    }
    this.view.display(
      image,
      this.current <= 0,
      this.current >= this.model.count() - 1
    );
    this._navigate(image.protected ? "" : "#" + image.src);
  }
};

Gallery.prototype.goBack = function () {
  this.display(this.current - 1);
};

Gallery.prototype.goForward = function () {
  this.display(this.current + 1);
};

Gallery.prototype._navigate = function (hash) {
  if (
    location.hash !== hash &&
    typeof history !== "undefined" &&
    history.replaceState
  ) {
    history.replaceState(null, "", location.pathname + location.search + hash);
  }
};

Gallery.prototype._onClose = function () {
  this.opened = false;
  this._navigate(this.hash);
};

Gallery.prototype._onLoad = function () {
  this.model.preload(this.current + 1);
  this.model.preload(this.current - 1);
};

(function () {
  var data = {};
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-gallery]"),
    function (item) {
      var key = item.getAttribute("data-gallery") || "";
      if (data[key]) {
        data[key].push(item);
      } else {
        data[key] = [item];
      }
    }
  );
  Object.keys(data).forEach(function (key) {
    var items = data[key];
    new Gallery(new GalleryModel(items), new GalleryView(items)).start();
  });
})();
