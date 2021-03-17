export default {
  data () {
    return {
      PRchecked: false,
      isExtendIn: "拡大しない",
      closeButtonAdd: "不要",
      isUpshiftIn: "不要",
      isHeightChangeIn: "不要",
      isCloseButtonImageChange: false,
      normalGAMheadTag: "",
      normalGAMbodyTag: "",
      
      zoneType: "",
      zoneId: "",
      aladdinTag: "",
      height: "",
      prepend: "",
      append: "",
      prBarStatus: {
        prBackground: "#000000",
        prTextHeight: 20,
        prTextColor: "#FFFFFF",
        prTextSize: 15,
        prText: "[PR]"
      },
      closeButtonStatus: {
        closeButtonPos: "左",
        closeButtonSize: 16,
        closeButtonUrl: "https://works.gsspcln.jp/w/ad_format/close_icons/close_icon_bold.png"
      },
      
      creativeTag: "",
      GAMheadTag: "",
      GAMbodyTag: ""
    }
  },
  
  methods: {
    inputPrepend: function () {
      if (this.zoneType === "スタンダードバナー"){
        this.prepend = "<div id=\"geniee_overlay\" style=\"height: " + this.height + "px; width: 100%;\">";
      } else {
        this.prepend = "";
      }
    },
    inputAppend: function () {
      if (this.zoneType === "スタンダードバナー"){
        this.append = "</div>\n";
        if (this.PRchecked){
          this.append += "<div style=\"background-color:" + this.prBarStatus.prBackground + ";text-align:center; width:320px; height:" + this.prBarStatus.prTextHeight + "px; color:" + this.prBarStatus.prTextColor + "; margin: 0 auto; font-size:" + this.prBarStatus.prTextSize + "px;\">" + this.prBarStatus.prText + "</div>\n"
        }
        
      } else if (this.zoneType === "SPオーバーレイ") {
        this.append = "";
        if (this.PRchecked){
          this.append += "<script type=\"text/javascript\">\n(function(window, document) {\n  var adStr = \"" + this.prBarStatus.prText + "\",\n  bottomHeight = \"" + this.prBarStatus.prTextHeight + "px\",\n  ovBase = document.getElementById(\"geniee_overlay\");\n  ovBase.style.bottom = bottomHeight;\n  createAdInfo();\n\n  function createAdInfo() {\n    var div = document.createElement(\"div\");\n    div.setAttribute(\"style\", \"background-color:" + this.prBarStatus.prBackground + ";text-align:center;width:320px;color:" + this.prBarStatus.prTextColor + "!important;margin: 0 auto; font-size:" + this.prBarStatus.prTextSize + "px;\");\n    div.setAttribute(\"id\", \"gn_expand_area\");\n    div.style.height = bottomHeight;\n    div.innerHTML = adStr;\n    ovBase.appendChild(div);\n  }\n})(window, document);\n</scr" + "ipt>\n"
        }
      }
      if (this.isExtendIn === "Aladdin配信時のみ") {
        var extendCode = "<script>\n    window.__gn_gam_expand_params = true;\n</scr" + "ipt>\n<script type='text/javascript'>\n(function(d) {\n  var s = window.innerWidth / 320,\n  BOOTS_HEIGHT = 0;\n\n  d.getElementById('geniee_overlay').style.webkitTransform = 'scale(' + s + ')';\n  d.getElementById('geniee_overlay').style.webkitTransformOrigin = 'bottom';\n  d.getElementById('geniee_overlay').style.transform = 'scale(' + s + ')';\n  d.getElementById('geniee_overlay').style.transformOrigin = 'bottom';\n\n  if(d.getElementById('gn_expand_area') !== null) {\n    d.getElementById('geniee_overlay').style.bottom = BOOTS_HEIGHT * s + 'px';\n  }\n})(document);\n</scr" + "ipt>\n<script>\n    window.__gn_gam_expand_params = true;\n</scr" + "ipt>\n";
        this.append += extendCode;
      }
      if (this.closeButtonAdd ===  "Aladdin配信時のみ") {
        var closeButtonPosition = "";
        var closeButtonSetting = "";
        closeButtonPosition = "closeIcon.style.left = \"0px\";\n";
        if (this.closeButtonStatus.closeButtonPos === "左") closeButtonPosition = "closeIcon.style.left = \"0px\";\n";
        else if (this.closeButtonStatus.closeButtonPos === "中央") closeButtonPosition = "";
        else if (this.closeButtonStatus.closeButtonPos === "右") closeButtonPosition = "closeIcon.style.right = \"0px\";\n";
        closeButtonSetting = "<script>\n    var geniee_overlay = parent.document.getElementById('geniee_overlay_outer');\n    var closeIcon = document.createElement('img');\n    var buttonSize = " + this.closeButtonStatus.closeButtonSize + ";\n    closeIcon.src = '" + this.closeButtonStatus.closeButtonUrl + "';\n    closeIcon.style.width = buttonSize + 'px';\n    closeIcon.style.height = buttonSize + 'px';\n    closeIcon.style.position = 'absolute';\n    closeIcon.style.top = '-' + buttonSize + 'px';\n    " + closeButtonPosition + "    var gn_delivery = geniee_overlay.getElementsByTagName('div')[1];\n    geniee_overlay.getElementsByTagName('div')[0].insertBefore(closeIcon, gn_delivery);\n    closeIcon.addEventListener('click',function(){\n        geniee_overlay.style.display = 'none';\n    });\n</scr" + "ipt>";
        this.creativeTag += closeButtonSetting;
      }
      if (this.isUpshiftIn === "Aladdin配信時のみ") {
        var upshiftCode = "<script>\n    window.__gn_gam_upshift_params = true;\n</scr" + "ipt>";
        this.append += upshiftCode;
      }
    },
    inputPreApp: function () {
      this.inputPrepend();
      this.inputAppend();
      this.inputPageGAMTag();
    },
    inputPageGAMTag: function () {
      if (this.aladdinTag === "") return;
      this.creativeTag = this.aladdinTag;
      this.creativeTag += "<script>\n    (function (window, document) {\n        window.addEventListener('load', function () {\n            setTimeout(function () {\n                var al = document.getElementById('geniee_overlay').parentNode.getElementsByTagName('script').length - 2;\n                var a = document.getElementById('geniee_overlay').parentNode.getElementsByTagName('script')[al];\n                if (a.src.indexOf('sa_overlay') >= 0) a.remove();\n\n                 var boots_height = 20,\n                    s = window.innerWidth / 320,\n                    ov_base = document.getElementById('geniee_overlay');\n                if (!document.getElementById('gn_expand_area')) boots_height = 0;\n                ov_base.style.bottom = boots_height * s + 'px';\n                ov_base.style.top = '';\n                ov_base.style.webkitTransformOrigin = 'bottom';\n                ov_base.style.transformOrigin = 'bottom';\n\n                 window.addEventListener('scroll', function () {\n                    ov_base.style.bottom = boots_height * s + 'px';\n                    ov_base.style.top = '';\n                    ov_base.style.webkitTransformOrigin = 'bottom';\n                    ov_base.style.transformOrigin = 'bottom';\n                }, false);\n            }, 100);\n        }, false);\n    })(window, document);\n</scr" + "ipt>";
      if (this.isExtendIn === "Aladdin配信時のみ"){
        var creativeExtendCode = "<script>\n    (function (window, document) {\n        if (typeof window.__gn_gam_expand_params === 'undefined') return;\n        window.addEventListener('load', function () {\n            var s = parent.window.innerWidth / 320,\n                BOOTS_HEIGHT = 0;\n            var a = parent.document.getElementById('geniee_overlay_outer');\n\n            a.style.webkitTransform = 'scale(' + s + ')';\n            a.style.webkitTransformOrigin = 'bottom';\n            a.style.transform = 'scale(' + s + ')';\n            a.style.transformOrigin = 'bottom';\n\n            if (parent.document.getElementById('gn_expand_area') !== null) {\n                a.style.bottom = BOOTS_HEIGHT * s + 'px';\n            }\n\n            var b = document.getElementById('geniee_overlay');\n\n             b.style.webkitTransform = 'scale(1)';\n            b.style.transform = 'scale(1)';\n        }, false);\n    })(window, document);\n</script>\n";
        this.creativeTag += creativeExtendCode;
      }
      if (this.closeButtonAdd ===  "Aladdin配信時のみ"){
        var closeButtonPosition = "";
        var closeButtonSetting = "";
        closeButtonPosition = "closeIcon.style.left = \"0px\";\n";
        if (this.closeButtonStatus.closeButtonPos === "左") closeButtonPosition = "closeIcon.style.left = \"0px\";\n";
        else if (this.closeButtonStatus.closeButtonPos === "中央") closeButtonPosition = "";
        else if (this.closeButtonStatus.closeButtonPos === "右") closeButtonPosition = "closeIcon.style.right = \"0px\";\n";
        closeButtonSetting = "<script>\n    var geniee_overlay = parent.document.getElementById('geniee_overlay_outer');\n    var closeIcon = document.createElement('img');\n    var buttonSize = " + this.closeButtonStatus.closeButtonSize + ";\n    closeIcon.src = '" + this.closeButtonStatus.closeButtonUrl + "';\n    closeIcon.style.width = buttonSize + 'px';\n    closeIcon.style.height = buttonSize + 'px';\n    closeIcon.style.position = 'absolute';\n    closeIcon.style.top = '-' + buttonSize + 'px';\n    " + closeButtonPosition + "    var gn_delivery = geniee_overlay.getElementsByTagName('div')[1];\n    geniee_overlay.getElementsByTagName('div')[0].insertBefore(closeIcon, gn_delivery);\n    closeIcon.addEventListener('click',function(){\n        geniee_overlay.style.display = 'none';\n    });\n</scr" + "ipt>\n";
        this.creativeTag += closeButtonSetting;
      }
      if (this.PRchecked){
        var creativePRbarCode = "<script>\n    (function (window, document) {\n        window.addEventListener('load', function () {\n            setTimeout(function () {\n                var b = document.getElementById('gn_expand_area');\n                if (!b) return;\n                var a = parent.document.getElementById('geniee_overlay_outer');\n                var div = document.createElement('div');\n                var property = b.outerHTML.split('style=\"')[1].split('\"')[0];\n                var inner = b.innerText;\n                var h = b.style.height;\n\n                div.setAttribute('style', property);\n                div.setAttribute('id', 'gn_outer_expand_area');\n                div.innerHTML = inner;\n                a.appendChild(div);\n                a.style.bottom = h + 'px';\n                b.remove();\n                document.getElementById('geniee_overlay').style.bottom = '0px';\n            }, 1000);\n        }, false);\n    })(window, document);\n</scr" + "ipt>\n";
        this.creativeTag += creativePRbarCode;
      }
      if (this.isUpshiftIn === "Aladdin配信時のみ") {
        var creativeUpshiftCode = "<script>\n    (function (window, document) {\n        if (typeof window.__gn_gam_upshift_params === 'undefined') return;\n        window.addEventListener('load', function () {\n            var a = document.getElementById('geniee_overlay'),\n                d = parent.document,\n                w = parent.window,\n                h = 0,\n                ov_base = d.getElementById('geniee_overlay_outer'),\n                banner_height = parseFloat(a.style.height),\n                boots_height = 0,\n                s = parent.window.innerWidth / 320;\n            if (d.getElementById('gn_outer_expand_area')) boots_height = parseFloat(d.getElementById('gn_outer_expand_area').style.height);\n\n             w.addEventListener('scroll', function () {\n                h = Math.max.apply(null, [d.body.clientHeight, d.body.scrollHeight, d.documentElement.scrollHeight, d.documentElement.clientHeight]);\n                var sc_top = d.body.scrollTop || d.documentElement.scrollTop,\n                    scr_h = w.innerHeight;\n                if (h <= sc_top + scr_h + banner_height + boots_height) {\n                    ov_base.style.bottom = '';\n                    ov_base.style.top = '0px';\n                    ov_base.style.webkitTransformOrigin = 'top';\n                    ov_base.style.transformOrigin = 'top';\n                } else {\n                    ov_base.style.bottom = '0px';\n                    ov_base.style.top = '';\n                    ov_base.style.webkitTransformOrigin = 'bottom';\n                    ov_base.style.transformOrigin = 'bottom';\n                }\n            }, false);\n        }, false);\n    })(window, document);\n</scr" + "ipt>\n";
        this.creativeTag += creativeUpshiftCode;
      }
      if (this.isHeightChangeIn === "Aladdin配信時のみ") {
        var creativeHeightChangeCode = "<script>\n    (function (window, document) {\n        window.addEventListener('load', function () {\n            var a = document.getElementById('geniee_overlay');\n            var f = window.frameElement;\n            var df = f.parentNode.parentNode;\n\n             setTimeout(function () {\n                f.style.height = a.style.height;\n                df.style.height = a.style.height;\n\n                 a.style.bottom = '0px';\n            }, 1000);\n            setTimeout(function () {\n                a.style.bottom = '0px';\n            }, 1500);\n        }, false);\n    })(window, document);\n</scr" + "ipt>\n";
        this.creativeTag += creativeHeightChangeCode;
      }
    },
    
    processingGAMTag: function () {
      var headTag = this.normalGAMheadTag;
      var bodyTag = this.normalGAMbodyTag;
      if (headTag !== "") this.GAMheadTag = headTagProcess(headTag, this.zoneId);
      if (bodyTag !== "") this.GAMbodyTag = bodyTagProcess(bodyTag, this.zoneId, this.isExtendIn, this.closeButtonAdd, this.closeButtonStatus);
      
      function replaceSearch (target, start, end){
          let s = target.indexOf(start),
              el = end.length,
              e = target.indexOf(end, s + 1) + el,
              result = target.slice(s, e);
          return result;
      }
      function headTagProcess (normal, zoneId) {
        var divId = replaceSearch(normal, "'div-gpt-ad-", "')").slice(1).slice(0,-2);

          var tag = normal.replace(divId, zoneId);

        return tag;
      }
      function bodyTagProcess (normal, zoneId, isExtendIn, closeButtonAdd, closeButtonStatus) {
        var divId = new RegExp(replaceSearch(normal, "'div-gpt-ad-", "'").slice(1).slice(0,-1), "g");
          console.log(divId);
        
        normal = normal.replace(divId, zoneId);
        var tag = "<div id=\"geniee_overlay_outer\" style=\"position:fixed; bottom: 0px;left:0px; right:0px; margin:auto; z-index:1000000000;width:100%;\">\n  " + normal + "\n</div>";
        if (isExtendIn === "Aladdin配信時・AdX配信時ともに") tag += "<script>\n    (function (window, document) {\n        window.addEventListener(\"load\", function () {\n            setTimeout(function () {\n                var geniee_overlay_outer = parent.document.getElementById(\"geniee_overlay_outer\");\n\n                 if (geniee_overlay_outer.getElementsByTagName(\"iframe\").length) {\n                    var s = parent.window.innerWidth / geniee_overlay_outer.getElementsByTagName(\"iframe\")[0].clientWidth,\n                        BOOTS_HEIGHT = 0;\n                    geniee_overlay_outer.style.webkitTransform = \"scale(\" + s + \")\";\n                    geniee_overlay_outer.style.webkitTransformOrigin = \"bottom\";\n                    geniee_overlay_outer.style.transform = \"scale(\" + s + \")\";\n                    geniee_overlay_outer.style.transformOrigin = \"bottom\";\n\n                    if (parent.document.getElementById(\"gn_expand_area\") !== null) {\n                        geniee_overlay_outer.style.bottom = BOOTS_HEIGHT * s + \"px\";\n                    }\n                }\n            }, 500);\n        }, false);\n    })(window, document);\n</scr" + "ipt>\n"
      
        if (closeButtonAdd === "Aladdin配信時・AdX配信時ともに"){
          var closeButtonElement = " \n<div id=\"geniee_overlay_inner\" style=\"position: relative;margin: auto; width: 320px;\">\n        <img src=\"" + closeButtonStatus.closeButtonUrl +"\" width=\"" + closeButtonStatus.closeButtonSize +"\" height=\"" + closeButtonStatus.closeButtonSize +"\" id=\"geniee_overlay_close\" style=\"position: absolute; top: -" + closeButtonStatus.closeButtonSize +"px;"; // left: 0;\">\n ";
          if (closeButtonStatus.closeButtonPos === "左") closeButtonElement += "left: 0;\">\n ";
          else if (closeButtonStatus.closeButtonPos === "右") closeButtonElement += "right: 0;\">\n ";
          else if (closeButtonStatus.closeButtonPos === "中央") closeButtonElement += "left: 0; right: 0; margin: auto;\">\n ";
        
          var divide1 = "<div id=\"" + zoneId +"\"";
          var divide1pos = tag.indexOf(divide1);
          if (divide1pos < 0){
            divide1 = "<div id='" + zoneId +"'";
            divide1pos = tag.indexOf(divide1);
          }
          tag = tag.slice(0,divide1pos) + closeButtonElement + tag.slice(divide1pos);
        
          var divide2 = "</div>";
          var divide2pos = tag.lastIndexOf(divide2);
          tag = tag.slice(0,divide2pos) + " </div>\n    " + tag.slice(divide2pos);
        
          tag += "<script>\n    (function (window, document) {\n        var geniee_overlay_outer = document.getElementById(\"geniee_overlay_outer\");\n        var geniee_overlay_inner = document.getElementById(\"geniee_overlay_inner\");\n        var closeIcon = document.getElementById(\"geniee_overlay_close\");\n\n         closeIcon.addEventListener(\"click\", function () {\n            geniee_overlay_outer.getElementsByTagName(\"iframe\")[0].contentWindow.document.getElementsByClassName(\"gnROV\")[0].dataset[\"isRefresh\"] = \"false\";\n           geniee_overlay_outer.style.display = \"none\";\n        });\n        window.addEventListener(\"load\", function () {\n            setTimeout(function () {\n                if (geniee_overlay_outer.getElementsByTagName(\"iframe\").length) {\n                    var iframe = geniee_overlay_outer.getElementsByTagName(\"iframe\")[0];\n                    var iframeWidth = iframe.clientWidth;\n                    geniee_overlay_inner.style.width = iframeWidth + \"px\";\n                    document.getElementById(\"" + zoneId + "\").style.margin = \"0\";\n                }\n                geniee_overlay_outer.style.opacity = \"1\";\n            }, 2000);\n        }, false);\n    })(window, document);\n</scr" + "ipt>\n";
        }
        return tag;
      }
    },
    inputAll: function () {
      this.inputPreApp();
      this.processingGAMTag();
    },
  }
}