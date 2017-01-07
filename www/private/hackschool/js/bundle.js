webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(158);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _reduxPromise = __webpack_require__(189);

	var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

	var _dashboard = __webpack_require__(196);

	var _dashboard2 = _interopRequireDefault(_dashboard);

	var _reducers = __webpack_require__(240);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxPromise2.default)(_redux.createStore);

	_reactDom2.default.render(_react2.default.createElement(
						_reactRedux.Provider,
						{ store: createStoreWithMiddleware(_reducers2.default) },
						_react2.default.createElement(_dashboard2.default, null)
	), document.querySelector('.container'));

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _index = __webpack_require__(197);

	var _menuBar = __webpack_require__(223);

	var _menuBar2 = _interopRequireDefault(_menuBar);

	var _profile = __webpack_require__(230);

	var _profile2 = _interopRequireDefault(_profile);

	var _sessionsGrid = __webpack_require__(232);

	var _sessionsGrid2 = _interopRequireDefault(_sessionsGrid);

	var _sessionDetail = __webpack_require__(234);

	var _sessionDetail2 = _interopRequireDefault(_sessionDetail);

	var _leaderboard = __webpack_require__(235);

	var _leaderboard2 = _interopRequireDefault(_leaderboard);

	var _dialogBox = __webpack_require__(224);

	var _dialogBox2 = _interopRequireDefault(_dialogBox);

	var _loading = __webpack_require__(228);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dashboard = function (_Component) {
		_inherits(Dashboard, _Component);

		function Dashboard() {
			_classCallCheck(this, Dashboard);

			return _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).apply(this, arguments));
		}

		_createClass(Dashboard, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.props.fetchUser('/hackschool/user');
				this.props.triggerTeamAction('fetch', null);
				this.props.fetchSessions('/hackschool/sessions');
				this.props.fetchScoreboard('/hackschool/scoreboard');
			}
		}, {
			key: 'render',
			value: function render() {
				//fetchUser not done yet
				if (!this.props.user) return _react2.default.createElement(_loading2.default, { message: 'Retrieving user info...' });

				//fetchSessions not done yet
				if (!this.props.sessions) return _react2.default.createElement(_loading2.default, { message: 'Retrieving sessions info...' });

				//fetchScoreboard not done yet
				if (!this.props.scoreboard) return _react2.default.createElement(_loading2.default, { message: 'Retrieving scoreboard info...' });

				if (!this.props.team.done) return _react2.default.createElement(_loading2.default, { message: 'Retrieving team info...' });

				var currentSlide = this.props.currentSlide == 'sessions' ? _react2.default.createElement(_sessionsGrid2.default, null) : _react2.default.createElement(_leaderboard2.default, null);

				return _react2.default.createElement(
					'div',
					null,
					this.props.dialog.active && _react2.default.createElement(_dialogBox2.default, null),
					this.props.currentSlide == 'sessions' && _react2.default.createElement(_sessionDetail2.default, null),
					_react2.default.createElement(_menuBar2.default, null),
					_react2.default.createElement(_profile2.default, null),
					currentSlide
				);
			}
		}]);

		return Dashboard;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var dialog = _ref.dialog,
		    user = _ref.user,
		    scoreboard = _ref.scoreboard,
		    currentSlide = _ref.currentSlide,
		    sessions = _ref.sessions,
		    team = _ref.team;

		return { dialog: dialog, user: user, scoreboard: scoreboard, currentSlide: currentSlide, sessions: sessions, team: team };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ fetchUser: _index.fetchUser, fetchSessions: _index.fetchSessions, fetchScoreboard: _index.fetchScoreboard, triggerTeamAction: _index.triggerTeamAction, changeDialog: _index.changeDialog }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Dashboard);

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.GET_TEAM_RANK = exports.RESET_TEAM_ERROR = exports.LEAVE_TEAM = exports.JOIN_TEAM = exports.CREATE_TEAM = exports.FETCH_TEAM = exports.SELECT_SESSION = exports.SELECT_SLIDE = exports.CHANGE_DIALOG = exports.FETCH_SCOREBOARD = exports.FETCH_SESSIONS = exports.FETCH_USER = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.fetchUser = fetchUser;
	exports.fetchSessions = fetchSessions;
	exports.fetchScoreboard = fetchScoreboard;
	exports.changeDialog = changeDialog;
	exports.selectSlide = selectSlide;
	exports.selectSession = selectSession;
	exports.triggerTeamAction = triggerTeamAction;
	exports.getTeamRank = getTeamRank;

	var _axios = __webpack_require__(198);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FETCH_USER = exports.FETCH_USER = 'FETCH_USER';
	var FETCH_SESSIONS = exports.FETCH_SESSIONS = 'FETCH_SESSIONS';
	var FETCH_SCOREBOARD = exports.FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';

	var CHANGE_DIALOG = exports.CHANGE_DIALOG = 'CHANGE_DIALOG';
	var SELECT_SLIDE = exports.SELECT_SLIDE = 'SELECT_SLIDE';
	var SELECT_SESSION = exports.SELECT_SESSION = 'SELECT_SESSION';

	var FETCH_TEAM = exports.FETCH_TEAM = 'FETCH_TEAM';
	var CREATE_TEAM = exports.CREATE_TEAM = 'CREATE_TEAM';
	var JOIN_TEAM = exports.JOIN_TEAM = 'JOIN_TEAM';
	var LEAVE_TEAM = exports.LEAVE_TEAM = 'LEAVE_TEAM';
	var RESET_TEAM_ERROR = exports.RESET_TEAM_ERROR = 'RESET_TEAM_ERROR';

	var GET_TEAM_RANK = exports.GET_TEAM_RANK = 'GET_TEAM_RANK';

	function fetchUser(url) {

		var request = _axios2.default.get(url);

		return {
			type: FETCH_USER,
			payload: request
		};
	}

	function fetchSessions(url) {

		var request = _axios2.default.get(url);

		return {
			type: FETCH_SESSIONS,
			payload: request
		};
	}

	function fetchScoreboard(url) {

		var request = _axios2.default.get(url);

		return {
			type: FETCH_SCOREBOARD,
			payload: request
		};
	}

	//change is an object
	function changeDialog(change) {
		return {
			type: CHANGE_DIALOG,
			payload: change
		};
	}

	//slide is a string
	function selectSlide(slide) {
		return {
			type: SELECT_SLIDE,
			payload: slide
		};
	}

	//session is a session/project obj
	function selectSession(session) {
		return {
			type: SELECT_SESSION,
			payload: session
		};
	}

	function triggerTeamAction(endpoint, props) {

		var url = endpoint != 'fetch' ? '/hackschool/team/' + endpoint : '/hackschool/team';

		switch (endpoint) {
			case 'fetch':
				return {
					type: FETCH_TEAM,
					payload: _axios2.default.get(url)
				};
			case 'create':
				return {
					type: CREATE_TEAM,
					payload: _axios2.default.post(url, {
						team: {
							name: props
						}
					})
				};
			case 'join':
				console.log('attempting to join...');
				return {
					type: JOIN_TEAM,
					payload: _axios2.default.post(url, {
						team: {
							id: props
						}
					})
				};
			case 'leave':
				//if props is null (incorrect name match),
				//simulate server response error
				var payload = props ? _axios2.default.get(url) : { data: { error: 'wrong team name submitted' } };
				return {
					type: LEAVE_TEAM,
					payload: payload
				};
			//this is needed if team.error is not null due to previously caused error,
			//and error is displayed (incorrectly) when correct input is submitted, and
			//should instead see loading render
			case 'reset-error':
				return {
					type: RESET_TEAM_ERROR,
					payload: null
				};
			default:
				console.error(endpoint);
				return {
					type: 'error',
					payload: null
				};
		}
	}

	function getTeamRank(scoreboard, teamID) {

		var match = scoreboard.find(function (team) {
			return team.id === teamID;
		});
		return {
			type: GET_TEAM_RANK,
			payload: (typeof match === 'undefined' ? 'undefined' : _typeof(match)) !== undefined ? scoreboard.indexOf(match) + 1 : 'n/a'
		};
	}

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _index = __webpack_require__(197);

	var _dialogBox = __webpack_require__(224);

	var _dialogBox2 = _interopRequireDefault(_dialogBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuBar = function (_Component) {
		_inherits(MenuBar, _Component);

		function MenuBar(props) {
			_classCallCheck(this, MenuBar);

			var _this = _possibleConstructorReturn(this, (MenuBar.__proto__ || Object.getPrototypeOf(MenuBar)).call(this, props));

			_this.toggleDialog = _this.toggleDialog.bind(_this);
			return _this;
		}

		_createClass(MenuBar, [{
			key: 'toggleDialog',
			value: function toggleDialog() {
				this.props.changeDialog({ active: true });
			}
		}, {
			key: 'render',
			value: function render() {

				return _react2.default.createElement(
					'div',
					{ className: 'dashboard-menu' },
					_react2.default.createElement(
						'p',
						null,
						'HACKSCHOOL DASHBOARD'
					),
					_react2.default.createElement(
						'a',
						{ href: '/auth/logout' },
						_react2.default.createElement(
							'button',
							null,
							_react2.default.createElement('i', { className: 'fa fa-power-off', ariaHidden: 'true' }),
							' SIGN OUT'
						)
					),
					_react2.default.createElement(
						'button',
						{ onClick: this.toggleDialog },
						_react2.default.createElement('i', { className: 'fa fa-user', ariaHidden: 'true' }),
						' MANAGE TEAM'
					)
				);
			}
		}]);

		return MenuBar;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var user = _ref.user,
		    dialog = _ref.dialog;

		return { user: user, dialog: dialog };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ changeDialog: _index.changeDialog }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MenuBar);

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _actions = __webpack_require__(197);

	var _dialogOnboard = __webpack_require__(225);

	var _dialogOnboard2 = _interopRequireDefault(_dialogOnboard);

	var _dialogManage = __webpack_require__(229);

	var _dialogManage2 = _interopRequireDefault(_dialogManage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogBox = function (_Component) {
		_inherits(DialogBox, _Component);

		function DialogBox(props) {
			_classCallCheck(this, DialogBox);

			var _this = _possibleConstructorReturn(this, (DialogBox.__proto__ || Object.getPrototypeOf(DialogBox)).call(this, props));

			_this.state = { triggerOnboard: null };
			return _this;
		}

		_createClass(DialogBox, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				if (!this.props.team) //team is null, trigger onboarding
					this.props.changeDialog({ onBoarding: true });else this.props.changeDialog({ onBoarding: false });
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(props) {
				this.setState({ triggerOnboard: props.dialog.onBoarding });
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.state.triggerOnboard == null) {
					return null;
				}

				var dialogBox = this.state.triggerOnboard ? _react2.default.createElement(_dialogOnboard2.default, null) : _react2.default.createElement(_dialogManage2.default, null);
				return _react2.default.createElement(
					'div',
					{ className: 'dialog-box-wrapper' },
					_react2.default.createElement(
						'div',
						{ className: 'dialog-box' },
						dialogBox
					)
				);
			}
		}]);

		return DialogBox;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var dialog = _ref.dialog,
		    team = _ref.team;

		return { dialog: dialog, team: team.team };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ changeDialog: _actions.changeDialog }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogBox);

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _underscore = __webpack_require__(226);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _index = __webpack_require__(197);

	var _dialogInput = __webpack_require__(227);

	var _dialogInput2 = _interopRequireDefault(_dialogInput);

	var _loading = __webpack_require__(228);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogOnboard = function (_Component) {
		_inherits(DialogOnboard, _Component);

		function DialogOnboard(props) {
			_classCallCheck(this, DialogOnboard);

			var _this = _possibleConstructorReturn(this, (DialogOnboard.__proto__ || Object.getPrototypeOf(DialogOnboard)).call(this, props));

			_this.state = {
				currentSlide: 0,
				action: null };

			_this.renderSlide = _this.renderSlide.bind(_this);
			_this.renderDefault = _this.renderDefault.bind(_this);
			_this.renderFormInput = _this.renderFormInput.bind(_this);
			_this.renderSuccess = _this.renderSuccess.bind(_this);
			_this.renderFailure = _this.renderFailure.bind(_this);

			_this.incrementSlide = _this.incrementSlide.bind(_this);
			_this.onFormSubmit = _this.onFormSubmit.bind(_this);
			return _this;
		}

		_createClass(DialogOnboard, [{
			key: 'incrementSlide',
			value: function incrementSlide(num) {
				if (this.state.currentSlide == 0 && num < 0) this.props.changeDialog({ active: false });

				this.setState({ currentSlide: this.state.currentSlide + num });
			}
		}, {
			key: 'onFormSubmit',
			value: function onFormSubmit(e) {
				e.preventDefault();
				this.incrementSlide(1);
			}
		}, {
			key: 'renderDefault',
			value: function renderDefault() {
				var _this2 = this;

				return _react2.default.createElement(
					'div',
					{ className: 'dialog-inner' },
					_react2.default.createElement(
						'h3',
						null,
						'You\'re not on a team yet.'
					),
					_react2.default.createElement(
						'h3',
						null,
						'You can:'
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn-selection', onClick: function onClick() {
								return _this2.setState({ currentSlide: 1, action: 'create' });
							} },
						'create a team'
					),
					_react2.default.createElement(
						'h3',
						{ className: 'or' },
						'or'
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn-selection', onClick: function onClick() {
								return _this2.setState({ currentSlide: 1, action: 'join' });
							} },
						'join a team'
					)
				);
			}
		}, {
			key: 'renderFormInput',
			value: function renderFormInput() {
				switch (this.state.action) {
					case 'create':
						return _react2.default.createElement(_dialogInput2.default, {
							action: 'CREATE',
							initialFormValue: 'Your team name',
							message: 'Give your team a name! Make sure to keep it community appropriate.',
							onFormSubmit: this.onFormSubmit });
					case 'join':
						return _react2.default.createElement(_dialogInput2.default, {
							action: 'JOIN',
							initialFormValue: 'team code',
							message: 'Paste the team ID below.',
							onFormSubmit: this.onFormSubmit });
					default:
						return _react2.default.createElement(
							'div',
							null,
							'Something went wrong...'
						);
				}
			}
		}, {
			key: 'renderFailure',
			value: function renderFailure() {
				return _react2.default.createElement(
					'div',
					{ className: 'dialog-inner' },
					_react2.default.createElement(
						'h3',
						null,
						'Error:'
					),
					_react2.default.createElement(
						'h3',
						null,
						this.props.team.error
					)
				);
			}
		}, {
			key: 'renderSuccess',
			value: function renderSuccess() {
				var _this3 = this;

				//if we reach here, can assume this.props.team.team is defined
				var team = this.props.team.team;
				switch (this.state.action) {
					case 'create':
						return _react2.default.createElement(
							'div',
							{ className: 'create-success dialog-inner' },
							_react2.default.createElement(
								'h3',
								null,
								'Awesome! Your team name is'
							),
							_react2.default.createElement(
								'h3',
								null,
								_react2.default.createElement(
									'span',
									{ className: 'hl' },
									team.name
								)
							),
							_react2.default.createElement(
								'h3',
								null,
								'and your team ID is:'
							),
							_react2.default.createElement(
								'div',
								{ className: 'team-id-copy' },
								_react2.default.createElement(
									'p',
									null,
									team.id
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'notice' },
								_react2.default.createElement(
									'p',
									null,
									'Make sure to share this ID with your teammates. You can access it anytime by clicking "Manage Team".'
								)
							),
							_react2.default.createElement(
								'button',
								{ className: 'btn-selection', onClick: function onClick() {
										return _this3.props.changeDialog({ active: false, onBoarding: false });
									} },
								'BACK TO DASHBOARD'
							)
						);
					case 'join':
						return _react2.default.createElement(
							'div',
							{ className: 'dialog-inner' },
							_react2.default.createElement(
								'h3',
								null,
								'Great! You\'ve joined team'
							),
							_react2.default.createElement(
								'h3',
								null,
								_react2.default.createElement(
									'span',
									{ className: 'hl' },
									team.name
								)
							),
							_react2.default.createElement(
								'h3',
								null,
								'Your teammates are'
							),
							_react2.default.createElement(
								'ul',
								{ className: 'team-members' },
								team.members.map(function (member) {
									return _react2.default.createElement(
										'li',
										{ key: member.id },
										member.name
									);
								})
							),
							_react2.default.createElement('br', null),
							_react2.default.createElement(
								'button',
								{ className: 'btn-selection', onClick: function onClick() {
										return _this3.props.changeDialog({ active: false, onBoarding: false });
									} },
								'BACK TO DASHBOARD'
							)
						);
					default:
						return _react2.default.createElement(
							'div',
							null,
							'Something went wrong...'
						);
				}
			}
		}, {
			key: 'renderSlide',
			value: function renderSlide(slideNum) {
				switch (slideNum) {
					case 0:
						return this.renderDefault();
					case 1:
						return this.renderFormInput();
					case 2:
						if (this.props.team.error) return this.renderFailure();else if (this.props.team.team) return this.renderSuccess();else //team is null, and no error
							return _react2.default.createElement(_loading2.default, { message: 'loading...' });
					default:
						return _react2.default.createElement(
							'div',
							null,
							'Something went wrong...'
						);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				return _react2.default.createElement(
					'div',
					null,
					!this.props.team.team && //if haven't joined team, continue displaying back button
					_react2.default.createElement(
						'button',
						{ className: 'back',
							onClick: function onClick() {
								return _this4.incrementSlide(-1);
							} },
						_react2.default.createElement('i', { className: 'fa fa-chevron-left hl', ariaHidden: 'true' })
					),
					this.renderSlide(this.state.currentSlide)
				);
			}
		}]);

		return DialogOnboard;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var team = _ref.team;

		return { team: team };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ changeDialog: _index.changeDialog }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogOnboard);

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _actions = __webpack_require__(197);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogOnboardInput = function (_Component) {
		_inherits(DialogOnboardInput, _Component);

		function DialogOnboardInput(props) {
			_classCallCheck(this, DialogOnboardInput);

			var _this = _possibleConstructorReturn(this, (DialogOnboardInput.__proto__ || Object.getPrototypeOf(DialogOnboardInput)).call(this, props));

			_this.state = { term: '' };

			_this.onInputChange = _this.onInputChange.bind(_this);
			_this.onFormSubmit = _this.onFormSubmit.bind(_this);
			return _this;
		}

		_createClass(DialogOnboardInput, [{
			key: 'onInputChange',
			value: function onInputChange(value) {
				this.setState({ term: value });
			}
		}, {
			key: 'onFormSubmit',
			value: function onFormSubmit(e) {
				var action = this.props.action.toLowerCase();

				var userInput = this.state.term;
				if (action == 'leave' && this.state.term != this.props.team.name) userInput = null;
				this.props.triggerTeamAction(action, userInput);
				this.props.onFormSubmit(e);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var additional = _react2.default.createElement(
					'span',
					null,
					this.props.additional
				);
				var label = _react2.default.createElement(
					'label',
					null,
					this.props.formLabel
				);

				return _react2.default.createElement(
					'div',
					{ className: 'dialog-inner' },
					_react2.default.createElement(
						'h3',
						null,
						this.props.message
					),
					_react2.default.createElement(
						'h3',
						{ className: 'hl' },
						additional
					),
					_react2.default.createElement(
						'form',
						{ onSubmit: this.onFormSubmit },
						_react2.default.createElement('input', { type: 'text',
							value: this.state.term,
							placeholder: this.props.initialFormValue,
							onChange: function onChange(e) {
								return _this2.onInputChange(e.target.value);
							} }),
						label,
						_react2.default.createElement(
							'button',
							{ className: 'btn-action', type: 'submit' },
							this.props.action
						)
					)
				);
			}
		}]);

		return DialogOnboardInput;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var team = _ref.team;

		return { team: team.team };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ triggerTeamAction: _actions.triggerTeamAction }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogOnboardInput);

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Loading;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Loading(_ref) {
		var message = _ref.message;

		return _react2.default.createElement(
			"div",
			{ className: "loading" },
			_react2.default.createElement("img", { src: "/common/images/loading.gif" }),
			_react2.default.createElement(
				"h1",
				null,
				message
			)
		);
	};

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _index = __webpack_require__(197);

	var _dialogInput = __webpack_require__(227);

	var _dialogInput2 = _interopRequireDefault(_dialogInput);

	var _loading = __webpack_require__(228);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogManage = function (_Component) {
		_inherits(DialogManage, _Component);

		function DialogManage(props) {
			_classCallCheck(this, DialogManage);

			var _this = _possibleConstructorReturn(this, (DialogManage.__proto__ || Object.getPrototypeOf(DialogManage)).call(this, props));

			_this.state = { currentSlide: 0 };

			_this.incrementSlide = _this.incrementSlide.bind(_this);
			_this.formatMembers = _this.formatMembers.bind(_this);
			_this.renderSlide = _this.renderSlide.bind(_this);
			_this.renderDefault = _this.renderDefault.bind(_this);
			_this.renderConfirm = _this.renderConfirm.bind(_this);
			_this.renderFailure = _this.renderFailure.bind(_this);
			_this.renderSuccess = _this.renderSuccess.bind(_this);
			_this.onFormSubmit = _this.onFormSubmit.bind(_this);
			return _this;
		}

		_createClass(DialogManage, [{
			key: 'incrementSlide',
			value: function incrementSlide(num) {
				if (this.state.currentSlide == 2) //at error message
					this.props.triggerTeamAction('reset-error', null);

				if (this.state.currentSlide == 0 && num < 0) this.props.changeDialog({ active: false });

				this.setState({ currentSlide: this.state.currentSlide + num });
			}
		}, {
			key: 'formatMembers',
			value: function formatMembers(members) {
				var _this2 = this;

				return members.filter(function (member) {
					return member.name.toUpperCase() != _this2.props.user.name.toUpperCase();
				}).map(function (member) {
					return _react2.default.createElement(
						'li',
						{ key: member.id },
						_react2.default.createElement(
							'span',
							null,
							member.name
						)
					);
				});
			}
		}, {
			key: 'onFormSubmit',
			value: function onFormSubmit(e) {
				e.preventDefault();
				this.incrementSlide(1);
			}
		}, {
			key: 'renderDefault',
			value: function renderDefault() {
				var _this3 = this;

				var team = this.props.team.team;
				return _react2.default.createElement(
					'div',
					{ className: 'left-align' },
					_react2.default.createElement(
						'h3',
						null,
						team.name
					),
					_react2.default.createElement(
						'h3',
						{ className: 'team-id' },
						'Team ID: ',
						team.id
					),
					_react2.default.createElement(
						'ul',
						{ className: 'team-members' },
						_react2.default.createElement(
							'li',
							null,
							this.props.user.name,
							' (you)'
						),
						this.formatMembers(team.members)
					),
					_react2.default.createElement(
						'button',
						{ className: 'leave', onClick: function onClick() {
								return _this3.incrementSlide(1);
							} },
						'Leave team'
					)
				);
			}
		}, {
			key: 'renderConfirm',
			value: function renderConfirm() {
				var team = this.props.team.team;
				return _react2.default.createElement(_dialogInput2.default, {
					action: 'LEAVE',
					initialFormValue: 'team name',
					message: 'Please confirm that you want to leave team',
					additional: team.name,
					onFormSubmit: this.onFormSubmit,
					formLabel: 'Type the name of your team to proceed.' });
			}
		}, {
			key: 'renderSuccess',
			value: function renderSuccess() {
				var _this4 = this;

				return _react2.default.createElement(
					'div',
					{ className: 'dialog-inner' },
					_react2.default.createElement(
						'h3',
						null,
						'You have successfully left your team.'
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn-selection', onClick: function onClick() {
								return _this4.props.changeDialog({ onBoarding: true });
							} },
						'continue'
					)
				);
			}
		}, {
			key: 'renderFailure',
			value: function renderFailure() {
				return _react2.default.createElement(
					'div',
					{ className: 'dialog-inner' },
					_react2.default.createElement(
						'h3',
						null,
						'Sorry,'
					),
					_react2.default.createElement(
						'h3',
						null,
						this.props.team.error
					)
				);
			}
		}, {
			key: 'renderSlide',
			value: function renderSlide(slideNum) {
				switch (slideNum) {
					case 0:
						return this.renderDefault();
					case 1:
						return this.renderConfirm();
					case 2:
						if (this.props.team.error) return this.renderFailure();else if (this.props.team.team) //team is not null yet, but no error
							return _react2.default.createElement(_loading2.default, { message: 'loading...' });else return this.renderSuccess();

					default:
						return _react2.default.createElement(
							'div',
							null,
							'Something went wrong...lmao...'
						);
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this5 = this;

				return _react2.default.createElement(
					'div',
					null,
					this.props.team.team && //if haven't left team, continue displaying back button
					_react2.default.createElement(
						'button',
						{ className: 'back',
							onClick: function onClick() {
								return _this5.incrementSlide(-1);
							} },
						_react2.default.createElement('i', { className: 'fa fa-chevron-left hl', ariaHidden: 'true' })
					),
					this.renderSlide(this.state.currentSlide)
				);
			}
		}]);

		return DialogManage;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var team = _ref.team,
		    user = _ref.user,
		    dialog = _ref.dialog;

		return { team: team, user: user, dialog: dialog };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ changeDialog: _index.changeDialog, triggerTeamAction: _index.triggerTeamAction }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogManage);

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _actions = __webpack_require__(197);

	var _dashboardNav = __webpack_require__(231);

	var _dashboardNav2 = _interopRequireDefault(_dashboardNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Profile = function (_Component) {
		_inherits(Profile, _Component);

		function Profile(props) {
			_classCallCheck(this, Profile);

			var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this, props));

			_this.formatOtherMembers = _this.formatOtherMembers.bind(_this);
			return _this;
		}

		//not just initial mount, need to change to whenever update
		//can't use componentWillUpdate() since will generate infinite loop
		//TODO: figure this out


		_createClass(Profile, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				if (this.props.team.team) this.props.getTeamRank([].concat(_toConsumableArray(this.props.scoreboard.featured), _toConsumableArray(this.props.scoreboard.list)), this.props.team.team.id);
			}
		}, {
			key: 'formatOtherMembers',
			value: function formatOtherMembers(members) {
				var _this2 = this;

				//extract members that are not this user, then format
				return members.filter(function (member) {
					return member.id != _this2.props.user.id;
				}).map(function (member) {
					return _react2.default.createElement(
						'li',
						{ key: member.id },
						_react2.default.createElement('div', { className: 'team-profile-pic shadow' }),
						_react2.default.createElement('div', { className: 'team-profile-pic',
							style: { backgroundImage: 'url(' + member.profilePicture.small + ')' } })
					);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props.team;

				var teamDisplay = props.team ? _react2.default.createElement(
					'h4',
					{ className: 'team' },
					'Team ',
					props.team.name
				) : _react2.default.createElement(
					'h4',
					{ className: 'team' },
					'Not on a team'
				);
				var teamMembers = props.team ? this.formatOtherMembers(props.team.members) : null;

				var teamRanking = props.team ? _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h3',
						null,
						'TEAM RANKING'
					),
					_react2.default.createElement(
						'h3',
						{ className: 'number' },
						props.rank
					)
				) : null;
				var totalScore = props.team ? _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h3',
						null,
						'TOTAL POINTS'
					),
					_react2.default.createElement(
						'h3',
						{ className: 'number' },
						props.team.totalScore
					)
				) : null;

				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: 'profile' },
						_react2.default.createElement('div', { className: 'profile-pic shadow' }),
						_react2.default.createElement('div', { className: 'profile-pic main',
							style: { backgroundImage: 'url(' + this.props.user.profilePicture.medium + ')' } }),
						_react2.default.createElement(
							'div',
							{ className: 'main-profile-info' },
							_react2.default.createElement(
								'h3',
								{ className: 'greeting' },
								'Hello,'
							),
							_react2.default.createElement(
								'h1',
								null,
								this.props.user.name
							),
							teamDisplay,
							_react2.default.createElement(
								'ul',
								{ className: 'team-members' },
								teamMembers
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'info-right' },
							teamRanking,
							totalScore
						)
					),
					_react2.default.createElement(_dashboardNav2.default, null)
				);
			}
		}]);

		return Profile;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var user = _ref.user,
		    team = _ref.team,
		    scoreboard = _ref.scoreboard;

		return { user: user, team: team, scoreboard: scoreboard };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ getTeamRank: _actions.getTeamRank }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Profile);

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _index = __webpack_require__(197);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DashboardNav = function (_Component) {
		_inherits(DashboardNav, _Component);

		function DashboardNav() {
			_classCallCheck(this, DashboardNav);

			return _possibleConstructorReturn(this, (DashboardNav.__proto__ || Object.getPrototypeOf(DashboardNav)).apply(this, arguments));
		}

		_createClass(DashboardNav, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				return _react2.default.createElement(
					'div',
					{ className: 'dashboard-nav' },
					_react2.default.createElement(
						'button',
						{ onClick: function onClick() {
								return _this2.props.selectSlide('sessions');
							} },
						this.props.currentSlide == 'sessions' && _react2.default.createElement('div', { className: 'select' }),
						this.props.currentSlide != 'sessions' && _react2.default.createElement('div', { className: 'no-select' }),
						_react2.default.createElement(
							'h3',
							null,
							'SESSIONS'
						)
					),
					_react2.default.createElement(
						'button',
						{ onClick: function onClick() {
								return _this2.props.selectSlide('leaderboard');
							} },
						this.props.currentSlide == 'leaderboard' && _react2.default.createElement('div', { className: 'select' }),
						this.props.currentSlide != 'leaderboard' && _react2.default.createElement('div', { className: 'no-select' }),
						_react2.default.createElement(
							'h3',
							null,
							'LEADERBOARD'
						)
					)
				);
			}
		}]);

		return DashboardNav;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var currentSlide = _ref.currentSlide;

		return { currentSlide: currentSlide };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ selectSlide: _index.selectSlide }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DashboardNav);

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _index = __webpack_require__(197);

	var _sessionItem = __webpack_require__(233);

	var _sessionItem2 = _interopRequireDefault(_sessionItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SessionsGrid = function (_Component) {
		_inherits(SessionsGrid, _Component);

		function SessionsGrid(props) {
			_classCallCheck(this, SessionsGrid);

			var _this = _possibleConstructorReturn(this, (SessionsGrid.__proto__ || Object.getPrototypeOf(SessionsGrid)).call(this, props));

			_this.renderRow = _this.renderRow.bind(_this);
			_this.renderSession = _this.renderSession.bind(_this);
			_this.onSelect = _this.onSelect.bind(_this);
			return _this;
		}

		_createClass(SessionsGrid, [{
			key: 'onSelect',
			value: function onSelect(session) {
				this.props.selectSession(session);
			}
		}, {
			key: 'renderSession',
			value: function renderSession(session, row, column) {
				var _this2 = this;

				//if the link is not available, don't show its icon
				var slidesLink = session.slidesLink == "" ? false : true;
				var videoLink = session.videoLink == "" ? false : true;
				var blogPostLink = session.blogPostLink == "" ? false : true;

				return _react2.default.createElement(
					'td',
					{ className: 'project-td',
						key: session.id },
					_react2.default.createElement(_sessionItem2.default, { row: row,
						col: column,
						title: session.name,
						number: session.number,
						image: session.image,
						onClickEvent: function onClickEvent() {
							return _this2.onSelect(session);
						},
						project: session.project,
						slidesLink: slidesLink,
						videoLink: videoLink,
						blogPostLink: blogPostLink })
				);
			}
		}, {
			key: 'renderRow',
			value: function renderRow(row, rowNum) {
				var _this3 = this;

				return _react2.default.createElement(
					'tr',
					{ className: 'row', key: 'row-' + row[0].id },
					row.map(function (proj, colNum) {
						return _this3.renderSession(proj, rowNum, colNum % 4);
					})
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;

				return _react2.default.createElement(
					'div',
					{ className: 'grid-wrapper' },
					_react2.default.createElement(
						'table',
						{ className: 'grid' },
						_react2.default.createElement(
							'tbody',
							null,
							this.props.sessions.map(function (row, rowNum) {
								return _this4.renderRow(row, rowNum);
							})
						)
					)
				);
			}
		}]);

		return SessionsGrid;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var sessions = _ref.sessions;

		return { sessions: sessions };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ selectSession: _index.selectSession }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SessionsGrid);

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SessionItem = function (_Component) {
		_inherits(SessionItem, _Component);

		function SessionItem() {
			_classCallCheck(this, SessionItem);

			return _possibleConstructorReturn(this, (SessionItem.__proto__ || Object.getPrototypeOf(SessionItem)).apply(this, arguments));
		}

		_createClass(SessionItem, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"div",
					{ className: "session-item", onClick: this.props.onClickEvent },
					_react2.default.createElement("div", { className: "img-wrapper",
						style: { backgroundImage: "url(" + this.props.image + ")" } }),
					_react2.default.createElement(
						"div",
						{ className: "text-wrapper" },
						_react2.default.createElement(
							"h4",
							{ className: "week" },
							"Week ",
							this.props.number
						),
						_react2.default.createElement(
							"h3",
							null,
							this.props.title
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "icons" },
						this.props.project && this.props.slidesLink && _react2.default.createElement(
							"span",
							null,
							_react2.default.createElement("i", { className: "fa fa-film", ariaHidden: "true" })
						),
						this.props.project && this.props.videoLink && _react2.default.createElement(
							"span",
							null,
							_react2.default.createElement("i", { className: "fa fa-video-camera", ariaHidden: "true" })
						),
						this.props.project && this.props.blogPostLink && _react2.default.createElement(
							"span",
							null,
							_react2.default.createElement("i", { className: "fa fa-thumb-tack", ariaHidden: "true" })
						),
						this.props.project && _react2.default.createElement(
							"span",
							{ className: "right" },
							_react2.default.createElement("i", { className: "fa fa-plus hl", ariaHidden: "true" })
						)
					)
				);
			}
		}]);

		return SessionItem;
	}(_react.Component);

	exports.default = SessionItem;

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _index = __webpack_require__(197);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SessionDetail = function (_Component) {
		_inherits(SessionDetail, _Component);

		function SessionDetail() {
			_classCallCheck(this, SessionDetail);

			return _possibleConstructorReturn(this, (SessionDetail.__proto__ || Object.getPrototypeOf(SessionDetail)).apply(this, arguments));
		}

		_createClass(SessionDetail, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				var session = this.props.selectedSession;
				if (!session) return null;

				//if no project or empty string, button will not be displayed
				var slidesLink = !session.project || session.slidesLink == "" ? false : true;
				var videoLink = !session.project || session.videoLink == "" ? false : true;
				var blogPostLink = !session.project || session.blogPostLink == "" ? false : true;

				return _react2.default.createElement(
					'div',
					{ className: 'session-detail-wrapper' },
					_react2.default.createElement(
						'button',
						{ className: 'back',
							onClick: function onClick() {
								return _this2.props.selectSession(null);
							} },
						_react2.default.createElement('i', { className: 'fa fa-chevron-left hl', ariaHidden: 'true' })
					),
					_react2.default.createElement(
						'div',
						{ className: 'session-detail' },
						_react2.default.createElement('div', { className: 'img-top',
							style: { backgroundImage: 'url(' + session.image + ')' } }),
						_react2.default.createElement(
							'div',
							{ className: 'session-content' },
							_react2.default.createElement(
								'div',
								{ className: 'content-left' },
								_react2.default.createElement(
									'div',
									{ className: 'header' },
									_react2.default.createElement(
										'h4',
										{ className: 'hl-grey week' },
										'Week ',
										session.number
									),
									_react2.default.createElement(
										'h3',
										null,
										session.name
									)
								),
								_react2.default.createElement(
									'p',
									null,
									session.desc
								),
								_react2.default.createElement('div', { className: 'gradient' })
							),
							_react2.default.createElement(
								'div',
								{ className: 'content-right' },
								session.project && _react2.default.createElement(
									'div',
									{ className: 'scores' },
									_react2.default.createElement(
										'p',
										null,
										'SCORE'
									),
									_react2.default.createElement(
										'p',
										null,
										session.points
									)
								),
								slidesLink && _react2.default.createElement(
									'a',
									{ href: session.slidesLink },
									_react2.default.createElement(
										'button',
										null,
										_react2.default.createElement(
											'span',
											{ className: 'icon' },
											_react2.default.createElement('i', { className: 'fa fa-film', ariaHidden: 'true' })
										),
										' SLIDES'
									)
								),
								videoLink && _react2.default.createElement(
									'a',
									{ href: session.videoLink },
									_react2.default.createElement(
										'button',
										null,
										_react2.default.createElement(
											'span',
											{ className: 'icon' },
											_react2.default.createElement('i', { className: 'fa fa-video-camera', ariaHidden: 'true' })
										),
										' SCREENCAST'
									)
								),
								blogPostLink && _react2.default.createElement(
									'a',
									{ href: session.blogPostLink },
									_react2.default.createElement(
										'button',
										null,
										_react2.default.createElement(
											'span',
											{ className: 'icon' },
											_react2.default.createElement('i', { className: 'fa fa-thumb-tack', ariaHidden: 'true' })
										),
										' BLOG POST'
									)
								)
							),
							_react2.default.createElement(
								'button',
								{ className: 'btn-selection' },
								_react2.default.createElement('i', { className: 'fa fa-plus', ariaHidden: 'true' }),
								' ADD SUBMISSION'
							)
						)
					)
				);
			}
		}]);

		return SessionDetail;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var selectedSession = _ref.selectedSession;

		return { selectedSession: selectedSession };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ selectSession: _index.selectSession }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SessionDetail);

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _featuredTeamList = __webpack_require__(236);

	var _featuredTeamList2 = _interopRequireDefault(_featuredTeamList);

	var _teamList = __webpack_require__(238);

	var _teamList2 = _interopRequireDefault(_teamList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Leaderboard = function (_Component) {
		_inherits(Leaderboard, _Component);

		function Leaderboard() {
			_classCallCheck(this, Leaderboard);

			return _possibleConstructorReturn(this, (Leaderboard.__proto__ || Object.getPrototypeOf(Leaderboard)).apply(this, arguments));
		}

		_createClass(Leaderboard, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'leaderboard' },
					_react2.default.createElement(_featuredTeamList2.default, null),
					_react2.default.createElement(_teamList2.default, null)
				);
			}
		}]);

		return Leaderboard;
	}(_react.Component);

	exports.default = Leaderboard;

/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _teamFeaturedItem = __webpack_require__(237);

	var _teamFeaturedItem2 = _interopRequireDefault(_teamFeaturedItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FeaturedTeamList = function (_Component) {
		_inherits(FeaturedTeamList, _Component);

		function FeaturedTeamList(props) {
			_classCallCheck(this, FeaturedTeamList);

			var _this = _possibleConstructorReturn(this, (FeaturedTeamList.__proto__ || Object.getPrototypeOf(FeaturedTeamList)).call(this, props));

			_this.renderList = _this.renderList.bind(_this);
			return _this;
		}

		_createClass(FeaturedTeamList, [{
			key: 'renderList',
			value: function renderList(team, i) {
				return _react2.default.createElement(_teamFeaturedItem2.default, { key: team.id,
					featured: true,
					first: i == 0,
					name: team.name,
					score: team.totalScore,
					members: team.members,
					rank: i + 1 });
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'featured-team-list' },
					this.props.list.map(this.renderList),
					this.props.list.length == 0 && _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'h3',
							null,
							'No teams yet!'
						)
					)
				);
			}
		}]);

		return FeaturedTeamList;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var scoreboard = _ref.scoreboard;

		return { list: scoreboard.featured };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(FeaturedTeamList);

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TeamFeaturedItem = function (_Component) {
		_inherits(TeamFeaturedItem, _Component);

		function TeamFeaturedItem(props) {
			_classCallCheck(this, TeamFeaturedItem);

			var _this = _possibleConstructorReturn(this, (TeamFeaturedItem.__proto__ || Object.getPrototypeOf(TeamFeaturedItem)).call(this, props));

			_this.formatNumber = _this.formatNumber.bind(_this);
			_this.formatMembers = _this.formatMembers.bind(_this);
			return _this;
		}

		_createClass(TeamFeaturedItem, [{
			key: 'formatNumber',
			value: function formatNumber(number) {
				switch (number) {
					case 1:
						return '1st';
					case 2:
						return '2nd';
					case 3:
						return '3rd';
					default:
						return number;
				}
			}
		}, {
			key: 'formatMembers',
			value: function formatMembers(members) {
				return members.map(function (member) {
					return _react2.default.createElement('li', { key: member.id,
						className: 'team-profile-pic',
						style: { backgroundImage: 'url(' + member.profilePicture.small + ')' } });
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					{ className: 'team-item-featured team-item' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'h2',
							{ className: 'hl' },
							this.formatNumber(this.props.rank)
						),
						_react2.default.createElement(
							'ul',
							null,
							this.formatMembers(this.props.members)
						)
					),
					_react2.default.createElement(
						'h3',
						null,
						this.props.name
					),
					_react2.default.createElement(
						'h3',
						{ className: 'hl-grey' },
						this.props.score,
						' points'
					)
				);
			}
		}]);

		return TeamFeaturedItem;
	}(_react.Component);

	exports.default = TeamFeaturedItem;

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _teamGridItem = __webpack_require__(239);

	var _teamGridItem2 = _interopRequireDefault(_teamGridItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TeamList = function (_Component) {
		_inherits(TeamList, _Component);

		function TeamList(props) {
			_classCallCheck(this, TeamList);

			var _this = _possibleConstructorReturn(this, (TeamList.__proto__ || Object.getPrototypeOf(TeamList)).call(this, props));

			_this.renderList = _this.renderList.bind(_this);
			return _this;
		}

		_createClass(TeamList, [{
			key: 'renderList',
			value: function renderList(team, i) {
				var highest = 4;
				return _react2.default.createElement(_teamGridItem2.default, { key: team.id,
					name: team.name,
					score: team.totalScore,
					members: team.members,
					rank: i + highest });
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					this.props.list.length != 0 && _react2.default.createElement(
						'div',
						{ className: 'team-list' },
						_react2.default.createElement('div', { className: 'gradient' }),
						_react2.default.createElement(
							'table',
							null,
							_react2.default.createElement(
								'thead',
								null,
								_react2.default.createElement(
									'tr',
									null,
									_react2.default.createElement('th', null),
									_react2.default.createElement(
										'th',
										null,
										'MEMBERS'
									),
									_react2.default.createElement(
										'th',
										null,
										'TEAM NAME'
									),
									_react2.default.createElement(
										'th',
										null,
										'POINTS'
									)
								)
							),
							_react2.default.createElement(
								'tbody',
								null,
								this.props.list.map(this.renderList)
							)
						)
					)
				);
			}
		}]);

		return TeamList;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var scoreboard = _ref.scoreboard;

		return { list: scoreboard.list };
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps)(TeamList);

/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TeamGridItem = function (_Component) {
		_inherits(TeamGridItem, _Component);

		function TeamGridItem(props) {
			_classCallCheck(this, TeamGridItem);

			var _this = _possibleConstructorReturn(this, (TeamGridItem.__proto__ || Object.getPrototypeOf(TeamGridItem)).call(this, props));

			_this.formatMembers = _this.formatMembers.bind(_this);
			return _this;
		}

		_createClass(TeamGridItem, [{
			key: "formatMembers",
			value: function formatMembers(members) {
				return members.map(function (member) {
					return _react2.default.createElement("li", { key: member.id,
						className: "team-profile-pic",
						style: { backgroundImage: "url(" + member.profilePicture.small + ")" } });
				});
			}
		}, {
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"tr",
					{ className: "team-item" },
					_react2.default.createElement(
						"td",
						null,
						this.props.rank
					),
					_react2.default.createElement(
						"td",
						null,
						_react2.default.createElement(
							"ul",
							null,
							this.formatMembers(this.props.members)
						)
					),
					_react2.default.createElement(
						"td",
						null,
						_react2.default.createElement(
							"p",
							null,
							this.props.name
						)
					),
					_react2.default.createElement(
						"td",
						null,
						_react2.default.createElement(
							"p",
							null,
							this.props.score
						)
					)
				);
			}
		}]);

		return TeamGridItem;
	}(_react.Component);

	exports.default = TeamGridItem;

/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _redux = __webpack_require__(166);

	var _reducer_user = __webpack_require__(241);

	var _reducer_user2 = _interopRequireDefault(_reducer_user);

	var _reducer_sessions = __webpack_require__(242);

	var _reducer_sessions2 = _interopRequireDefault(_reducer_sessions);

	var _reducer_selected_session = __webpack_require__(243);

	var _reducer_selected_session2 = _interopRequireDefault(_reducer_selected_session);

	var _reducer_scoreboard = __webpack_require__(244);

	var _reducer_scoreboard2 = _interopRequireDefault(_reducer_scoreboard);

	var _reducer_slide = __webpack_require__(245);

	var _reducer_slide2 = _interopRequireDefault(_reducer_slide);

	var _reducer_dialog = __webpack_require__(246);

	var _reducer_dialog2 = _interopRequireDefault(_reducer_dialog);

	var _reducer_team = __webpack_require__(247);

	var _reducer_team2 = _interopRequireDefault(_reducer_team);

	var _reducer_team_rank = __webpack_require__(248);

	var _reducer_team_rank2 = _interopRequireDefault(_reducer_team_rank);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
		user: _reducer_user2.default,
		sessions: _reducer_sessions2.default,
		selectedSession: _reducer_selected_session2.default,
		scoreboard: _reducer_scoreboard2.default,
		currentSlide: _reducer_slide2.default,
		dialog: _reducer_dialog2.default,
		team: _reducer_team2.default,
		teamRank: _reducer_team_rank2.default
	});

	exports.default = rootReducer;

/***/ },

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var action = arguments[1];


		switch (action.type) {
			case _actions.FETCH_USER:
				console.log('user', action.payload.data.user);
				return action.payload.data.user;
			default:
				return state;
		}
	};

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _actions = __webpack_require__(197);

	var _underscore = __webpack_require__(226);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var action = arguments[1];

		switch (action.type) {

			case _actions.FETCH_SESSIONS:
				if (!action.payload.data.success) return state;else {
					var _ret = function () {
						var cols = 4;
						return {
							v: action.payload.data.sessions.reduce(function (arr, session) {

								if (!_underscore2.default.isEmpty(session.project)) {
									session.points = session.project.points;
									session.slidesLink = session.project.slidesLink;
									session.videoLink = session.project.videoLink;
									session.submissionLink = session.project.submissionLink;
									session.project = true;
								} else session.project = false;

								if (arr.length == 0 || arr[arr.length - 1].length >= cols) arr.push([session]);else arr[arr.length - 1].push(session);

								return arr;
							}, [])
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}
			default:
				return state;
		}
	};

/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var action = arguments[1];


		switch (action.type) {

			case _actions.SELECT_SESSION:
				return action.payload;
			default:
				return state;

		}
	};

/***/ },

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var action = arguments[1];


		switch (action.type) {
			case _actions.FETCH_SCOREBOARD:
				return {
					featured: [].concat(_toConsumableArray(action.payload.data.scoreboard.slice(0, 3))),
					list: [].concat(_toConsumableArray(action.payload.data.scoreboard.slice(3)))
				};
			default:
				return state;
		}
	};

/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'sessions';
		var action = arguments[1];


		switch (action.type) {
			case _actions.SELECT_SLIDE:
				return action.payload;
			default:
				return state;
		}
	};

/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	//onBoarding value will be changed if team is null on dialog's render
	var defaultState = {
		active: false,
		onBoarding: false
	};

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
		var action = arguments[1];


		switch (action.type) {
			case _actions.CHANGE_DIALOG:
				var temp = {};

				//clones state into temp
				for (var property in state) {
					temp[property] = state[property];
				}

				//updates property values
				for (var _property in action.payload) {
					if (action.payload.hasOwnProperty(_property)) {
						temp[_property] = action.payload[_property];
					}
				}
				return temp;

			default:
				return state;
		}
	};

/***/ },

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _index = __webpack_require__(197);

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { team: null, rank: 'n/a', error: null, done: false };
		var action = arguments[1];

		switch (action.type) {
			case _index.FETCH_TEAM:
			case _index.CREATE_TEAM:
			case _index.JOIN_TEAM:
				console.log('my team', action.payload.data.team);
				return action.payload.data.success ? {
					team: action.payload.data.team,
					rank: state.rank,
					error: null,
					done: true
				} : {
					team: null,
					rank: state.rank,
					error: action.payload.data.error,
					done: true
				};
			case _index.LEAVE_TEAM:
				if (action.payload.data.success) {
					console.log('my team', null);
					return {
						team: null,
						rank: 'n/a',
						error: null,
						done: true
					};
				}

				//wrong team name submitted, so null payload reaches here
				console.log('my team', 'unchanged: ' + action.payload.data.error);
				return {
					team: state.team, //unchanged
					rank: state.rank, //unchanged
					error: action.payload.data.error, //updated
					done: true
				};
			case _index.GET_TEAM_RANK:
				return {
					team: state.team,
					rank: action.payload, //update made here
					error: state.error,
					done: state.done
				};
			case _index.RESET_TEAM_ERROR:
				return {
					team: state.team,
					rank: state.rank,
					error: null,
					done: true
				};
			default:
				return state;
		}
	};

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var action = arguments[1];


		switch (action.type) {
			case _actions.FETCH_TEAM_RANK:
				return action.payload;
			default:
				return state;
		}
	};

/***/ }

});