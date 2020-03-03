var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation(props) {
    _classCallCheck(this, Navigation);

    var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

    _this.requestJSONData();
    return _this;
  }

  _createClass(Navigation, [{
    key: 'requestJSONData',
    value: function requestJSONData() {
      var _this2 = this;

      var citiesRequest = new XMLHttpRequest();
      citiesRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');
      citiesRequest.onload = function () {
        var citiesArr = JSON.parse(citiesRequest.responseText);
        _this2.getJSONData(citiesArr); // pass data to fn getJSONData
      };
      citiesRequest.send();
    }
  }, {
    key: 'getJSONData',
    value: function getJSONData(data) {
      console.log(data);
    }
  }, {
    key: 'render',
    value: function render() {

      // var ourRequest = new XMLHttpRequest();

      // ourRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');
      // ourRequest.onload = function() {
      //   console.log('json', ourRequest.responseText);
      //   this.jsonData = JSON.parse(ourRequest.responseText);
      //   console.log('json parsed', this.jsonData.cities[0].section);
      // }
      // ourRequest.send();

      return React.createElement(
        'div',
        { className: 'parent' },
        'new test'
      );
    }
  }]);

  return Navigation;
}(React.Component);

var Cities = function (_React$Component2) {
  _inherits(Cities, _React$Component2);

  function Cities() {
    _classCallCheck(this, Cities);

    return _possibleConstructorReturn(this, (Cities.__proto__ || Object.getPrototypeOf(Cities)).apply(this, arguments));
  }

  return Cities;
}(React.Component);

var domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(React.createElement(Navigation, null), domContainer);