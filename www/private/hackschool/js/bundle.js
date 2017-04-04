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

	var _reducers = __webpack_require__(242);

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

	var _actions = __webpack_require__(197);

	var _menuBar = __webpack_require__(223);

	var _menuBar2 = _interopRequireDefault(_menuBar);

	var _profile = __webpack_require__(232);

	var _profile2 = _interopRequireDefault(_profile);

	var _sessionsGrid = __webpack_require__(234);

	var _sessionsGrid2 = _interopRequireDefault(_sessionsGrid);

	var _sessionDetail = __webpack_require__(236);

	var _sessionDetail2 = _interopRequireDefault(_sessionDetail);

	var _leaderboard = __webpack_require__(237);

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
				this.props.triggerSessionAction('fetch', null);
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

				var classes = this.props.currentSlide == 'sessions' ? "slide-wrapper" : "slide-wrapper slide-exit";

				return _react2.default.createElement(
					'div',
					null,
					this.props.dialog.active && _react2.default.createElement(_dialogBox2.default, null),
					this.props.currentSlide == 'sessions' && this.props.selectedSession && _react2.default.createElement(_sessionDetail2.default, null),
					_react2.default.createElement(_menuBar2.default, null),
					_react2.default.createElement(_profile2.default, null),
					_react2.default.createElement(
						'div',
						{ className: 'slide-outer' },
						_react2.default.createElement(
							'div',
							{ className: classes },
							_react2.default.createElement(_sessionsGrid2.default, null),
							_react2.default.createElement(_leaderboard2.default, null)
						)
					)
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
		    team = _ref.team,
		    selectedSession = _ref.selectedSession;

		return { dialog: dialog, user: user, scoreboard: scoreboard, currentSlide: currentSlide, sessions: sessions, team: team, selectedSession: selectedSession };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ fetchUser: _actions.fetchUser, triggerSessionAction: _actions.triggerSessionAction, fetchScoreboard: _actions.fetchScoreboard, triggerTeamAction: _actions.triggerTeamAction, changeDialog: _actions.changeDialog }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Dashboard);

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.GET_TEAM_RANK = exports.RESET_TEAM_ERROR = exports.LEAVE_TEAM = exports.JOIN_TEAM = exports.CREATE_TEAM = exports.FETCH_TEAM = exports.RESET_ATTEND = exports.ATTEND_SESSION = exports.FETCH_SESSIONS = exports.SELECT_SESSION = exports.SELECT_SLIDE = exports.CHANGE_DIALOG = exports.FETCH_SCOREBOARD = exports.FETCH_USER = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.fetchUser = fetchUser;
	exports.triggerSessionAction = triggerSessionAction;
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
	var FETCH_SCOREBOARD = exports.FETCH_SCOREBOARD = 'FETCH_SCOREBOARD';

	var CHANGE_DIALOG = exports.CHANGE_DIALOG = 'CHANGE_DIALOG';
	var SELECT_SLIDE = exports.SELECT_SLIDE = 'SELECT_SLIDE';
	var SELECT_SESSION = exports.SELECT_SESSION = 'SELECT_SESSION';

	var FETCH_SESSIONS = exports.FETCH_SESSIONS = 'FETCH_SESSIONS';
	var ATTEND_SESSION = exports.ATTEND_SESSION = 'ATTEND_SESSION';
	var RESET_ATTEND = exports.RESET_ATTEND = 'RESET_ATTEND';

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

	function triggerSessionAction(action, prop) {

		switch (action) {
			case 'fetch':
				return {
					type: FETCH_SESSIONS,
					payload: _axios2.default.get('/hackschool/sessions')
				};
			case 'attend':
				return {
					type: ATTEND_SESSION,
					payload: _axios2.default.post('/hackschool/sessions/attend', {
						session: {
							secret: prop
						}
					})
				};
			case 'reset-attend':
				return {
					type: RESET_ATTEND,
					payload: null
				};
			default:
				console.error(action);
				return {
					type: 'error',
					payload: null
				};
		}
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

	function triggerTeamAction(action, prop) {

		var url = action != 'fetch' ? '/hackschool/team/' + action : '/hackschool/team';

		switch (action) {
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
							name: prop
						}
					})
				};
			case 'join':
				return {
					type: JOIN_TEAM,
					payload: _axios2.default.post(url, {
						team: {
							id: prop
						}
					})
				};
			case 'leave':
				//if prop is null (incorrect name match),
				//simulate server response error
				var payload = prop ? _axios2.default.get(url) : { data: { error: 'wrong team name submitted' } };
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
				console.error(action);
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
			payload: (typeof match === 'undefined' ? 'undefined' : _typeof(match)) !== undefined ? match.rank : 'n/a'
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

	var _actions = __webpack_require__(197);

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

			_this.activateDialog = _this.activateDialog.bind(_this);
			_this.activateAttendance = _this.activateAttendance.bind(_this);
			return _this;
		}

		_createClass(MenuBar, [{
			key: 'activateDialog',
			value: function activateDialog() {
				this.props.changeDialog({ active: true });
			}
		}, {
			key: 'activateAttendance',
			value: function activateAttendance() {
				this.activateDialog();
				this.props.changeDialog({ attendance: true });
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: 'dashboard-menu desktop' },
						_react2.default.createElement(
							'a',
							{ href: '', className: 'hack-dash' },
							'HACKCAMP DASHBOARD'
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
							{ onClick: this.activateDialog },
							_react2.default.createElement('i', { className: 'fa fa-user', ariaHidden: 'true' }),
							' MANAGE TEAM'
						),
						_react2.default.createElement(
							'button',
							{ onClick: this.activateAttendance },
							_react2.default.createElement('i', { className: 'fa fa-calendar-o', ariaHidden: 'true' }),
							' ATTENDANCE'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'dashboard-menu mobile' },
						_react2.default.createElement(
							'a',
							{ href: '', className: 'hack-dash' },
							'HACKCAMP'
						),
						_react2.default.createElement(
							'a',
							{ className: 'menu-hover' },
							_react2.default.createElement(
								'button',
								null,
								'MENU'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'dropdown' },
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
								{ onClick: this.activateDialog },
								_react2.default.createElement('i', { className: 'fa fa-user', ariaHidden: 'true' }),
								' MANAGE TEAM'
							),
							_react2.default.createElement(
								'button',
								{ onClick: this.activateAttendance },
								_react2.default.createElement('i', { className: 'fa fa-calendar-o', ariaHidden: 'true' }),
								' ATTENDANCE'
							)
						)
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
		return (0, _redux.bindActionCreators)({ changeDialog: _actions.changeDialog }, dispatch);
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

	var _dialogAttendance = __webpack_require__(225);

	var _dialogAttendance2 = _interopRequireDefault(_dialogAttendance);

	var _dialogOnboard = __webpack_require__(229);

	var _dialogOnboard2 = _interopRequireDefault(_dialogOnboard);

	var _dialogManage = __webpack_require__(231);

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

				document.querySelector('body').classList.add('noscroll');
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(props) {
				this.setState({ triggerOnboard: props.dialog.onBoarding });
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				document.querySelector('body').classList.remove('noscroll');
			}
		}, {
			key: 'render',
			value: function render() {
				if (this.state.triggerOnboard == null) return null;

				var dialogBox = void 0;
				if (this.props.dialog.attendance) dialogBox = _react2.default.createElement(_dialogAttendance2.default, null);else dialogBox = this.state.triggerOnboard ? _react2.default.createElement(_dialogOnboard2.default, null) : _react2.default.createElement(_dialogManage2.default, null);
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

	var _dialog = __webpack_require__(226);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _dialogInput = __webpack_require__(227);

	var _dialogInput2 = _interopRequireDefault(_dialogInput);

	var _loading = __webpack_require__(228);

	var _loading2 = _interopRequireDefault(_loading);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _actions = __webpack_require__(197);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogAttendance = function (_Dialog) {
		_inherits(DialogAttendance, _Dialog);

		function DialogAttendance(props) {
			_classCallCheck(this, DialogAttendance);

			//this.state = {currentSlide: 0};

			var _this = _possibleConstructorReturn(this, (DialogAttendance.__proto__ || Object.getPrototypeOf(DialogAttendance)).call(this, props));

			_this.renderSlide = _this.renderSlide.bind(_this);
			_this.renderFormInput = _this.renderFormInput.bind(_this);
			_this.renderSuccess = _this.renderSuccess.bind(_this);
			return _this;
		}

		_createClass(DialogAttendance, [{
			key: 'renderFormInput',
			value: function renderFormInput() {
				return _react2.default.createElement(_dialogInput2.default, {
					action: 'attend',
					initialFormValue: 'ATTENDANCE CODE',
					message: 'Enter the attendance code.',
					onFormSubmit: this.onFormSubmit });
			}
		}, {
			key: 'renderSuccess',
			value: function renderSuccess() {
				var _this2 = this;

				//if we reach here, can assume this.props.team.team is defined
				return _react2.default.createElement(
					'div',
					{ className: 'create-success dialog-inner' },
					_react2.default.createElement(
						'h3',
						null,
						'Great! Input code verified. '
					),
					_react2.default.createElement(
						'button',
						{ className: 'btn-selection', onClick: function onClick() {
								return _this2.props.changeDialog({ active: false, onBoarding: false });
							} },
						'BACK TO DASHBOARD'
					)
				);
			}
		}, {
			key: 'renderSlide',
			value: function renderSlide(slideNum) {
				switch (slideNum) {
					case 0:
						return this.renderFormInput();
					case 1:
						if (!this.props.sessions.attend) return _react2.default.createElement(_loading2.default, { message: 'loading...' });else if (this.props.sessions.attendSuccess) return this.renderSuccess();else return this.renderFailure();
					default:
						return _react2.default.createElement(
							'div',
							null,
							'Something went wrong...'
						);
				}
			}
		}, {
			key: 'incrementSlide',
			value: function incrementSlide(num) {
				if (this.state.currentSlide == 1) this.props.triggerSessionAction('reset-attend', null);

				if (this.state.currentSlide == 0 && num < 0) {
					this.props.triggerSessionAction('reset-attend', null);
					this.props.changeDialog({ active: false, attendance: false });
				}

				this.setState({ currentSlide: this.state.currentSlide + num });
			}
		}, {
			key: 'renderFailure',
			value: function renderFailure() {
				return _dialog2.default.prototype.renderFailure.call(this, this.props.sessions.attend);
			}
		}, {
			key: 'render',
			value: function render() {
				return _dialog2.default.prototype.render.call(this, !this.props.sessions.attendSuccess);
			}
		}]);

		return DialogAttendance;
	}(_dialog2.default);

	function mapStateToProps(_ref) {
		var sessions = _ref.sessions;

		return { sessions: sessions };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ changeDialog: _actions.changeDialog, triggerSessionAction: _actions.triggerSessionAction }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogAttendance);

/***/ },

/***/ 226:
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

	var Dialog = function (_Component) {
		_inherits(Dialog, _Component);

		function Dialog(props) {
			_classCallCheck(this, Dialog);

			var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props));

			_this.state = { currentSlide: 0 };

			_this.onFormSubmit = _this.onFormSubmit.bind(_this);
			_this.incrementSlide = _this.incrementSlide.bind(_this);
			_this.formatMembers = _this.formatMembers.bind(_this);
			_this.renderFailure = _this.renderFailure.bind(_this);
			_this.render = _this.render.bind(_this);
			return _this;
		}

		_createClass(Dialog, [{
			key: 'incrementSlide',
			value: function incrementSlide(num, maxSlides, callback) {
				if (this.state.currentSlide == maxSlides) callback('reset-error', null);

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
			key: 'formatMembers',
			value: function formatMembers(members) {
				var _this2 = this;

				return members.map(function (member) {
					if (member.id == _this2.props.user.id) return;
					return _react2.default.createElement(
						'li',
						{ key: member.id },
						member.name
					);
				});
			}
		}, {
			key: 'renderFailure',
			value: function renderFailure(error) {
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
						error
					)
				);
			}
		}, {
			key: 'render',
			value: function render(back) {
				var _this3 = this;

				return _react2.default.createElement(
					'div',
					null,
					back && _react2.default.createElement(
						'button',
						{ className: 'back',
							onClick: function onClick() {
								return _this3.incrementSlide(-1);
							} },
						_react2.default.createElement('i', { className: 'fa fa-chevron-left hl', ariaHidden: 'true' })
					),
					this.renderSlide(this.state.currentSlide)
				);
			}
		}]);

		return Dialog;
	}(_react.Component);

	exports.default = Dialog;

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

				if (action == 'attend') {
					this.props.triggerSessionAction(action, userInput);
				} else {
					this.props.triggerTeamAction(action, userInput);
				}

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
		return (0, _redux.bindActionCreators)({ triggerTeamAction: _actions.triggerTeamAction, triggerSessionAction: _actions.triggerSessionAction }, dispatch);
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

	var _dialog = __webpack_require__(226);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _underscore = __webpack_require__(230);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _actions = __webpack_require__(197);

	var _dialogInput = __webpack_require__(227);

	var _dialogInput2 = _interopRequireDefault(_dialogInput);

	var _loading = __webpack_require__(228);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogOnboard = function (_Dialog) {
		_inherits(DialogOnboard, _Dialog);

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
			return _this;
		}

		_createClass(DialogOnboard, [{
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
								this.formatMembers(team.members)
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
			key: 'incrementSlide',
			value: function incrementSlide(num) {
				_dialog2.default.prototype.incrementSlide.call(this, num, 2, this.props.triggerTeamAction);
			}
		}, {
			key: 'renderFailure',
			value: function renderFailure() {
				return _dialog2.default.prototype.renderFailure.call(this, this.props.team.error);
			}
		}, {
			key: 'render',
			value: function render() {
				return _dialog2.default.prototype.render.call(this, !this.props.team.team); //continues back button if not in team
			}
		}]);

		return DialogOnboard;
	}(_dialog2.default);

	function mapStateToProps(_ref) {
		var team = _ref.team,
		    user = _ref.user;

		return { team: team, user: user };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ changeDialog: _actions.changeDialog, triggerTeamAction: _actions.triggerTeamAction }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogOnboard);

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

	var _dialog = __webpack_require__(226);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _reactRedux = __webpack_require__(159);

	var _redux = __webpack_require__(166);

	var _actions = __webpack_require__(197);

	var _dialogInput = __webpack_require__(227);

	var _dialogInput2 = _interopRequireDefault(_dialogInput);

	var _loading = __webpack_require__(228);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DialogManage = function (_Dialog) {
		_inherits(DialogManage, _Dialog);

		function DialogManage(props) {
			_classCallCheck(this, DialogManage);

			//this.state = {currentSlide: 0}

			var _this = _possibleConstructorReturn(this, (DialogManage.__proto__ || Object.getPrototypeOf(DialogManage)).call(this, props));

			_this.renderSlide = _this.renderSlide.bind(_this);
			_this.renderDefault = _this.renderDefault.bind(_this);
			_this.renderConfirm = _this.renderConfirm.bind(_this);
			_this.renderSuccess = _this.renderSuccess.bind(_this);
			return _this;
		}

		_createClass(DialogManage, [{
			key: 'renderDefault',
			value: function renderDefault() {
				var _this2 = this;

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
								return _this2.incrementSlide(1);
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
				var _this3 = this;

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
								return _this3.props.changeDialog({ onBoarding: true });
							} },
						'continue'
					)
				);
			}
		}, {
			key: 'renderSlide',
			value: function renderSlide(slideNum) {
				var finalSlide = this.props.team.error ? this.renderFailure() : this.props.team.team ? _react2.default.createElement(_loading2.default, { message: 'loading...' }) : this.renderSuccess();
				switch (slideNum) {
					case 0:
						return this.renderDefault();
					case 1:
						return this.renderConfirm();
					case 2:
						return finalSlide;

					default:
						return _react2.default.createElement(
							'div',
							null,
							'Something went wrong...lmao...'
						);
				}
			}
		}, {
			key: 'incrementSlide',
			value: function incrementSlide(num) {
				_dialog2.default.prototype.incrementSlide.call(this, num, 2, this.props.triggerTeamAction);
			}
		}, {
			key: 'renderFailure',
			value: function renderFailure() {
				return _dialog2.default.prototype.renderFailure.call(this, this.props.team.error);
			}
		}, {
			key: 'render',
			value: function render() {
				return _dialog2.default.prototype.render.call(this, this.props.team.team); //continues back button if still in team
			}
		}]);

		return DialogManage;
	}(_dialog2.default);

	function mapStateToProps(_ref) {
		var team = _ref.team,
		    user = _ref.user,
		    dialog = _ref.dialog;

		return { team: team, user: user, dialog: dialog };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ changeDialog: _actions.changeDialog, triggerTeamAction: _actions.triggerTeamAction }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DialogManage);

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

	var _actions = __webpack_require__(197);

	var _dashboardNav = __webpack_require__(233);

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
							style: { backgroundImage: 'url(' + member.profilePicture.small + ')' } }),
						_react2.default.createElement(
							'div',
							{ className: 'hover-name' },
							_react2.default.createElement('div', { className: 'triangle-with-shadow' }),
							_react2.default.createElement(
								'span',
								null,
								member.name
							)
						)
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
						this.props.teamRank
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
					{ className: 'profile-wrapper' },
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

		return { user: user, team: team, scoreboard: scoreboard, teamRank: team.rank };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ getTeamRank: _actions.getTeamRank }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Profile);

/***/ },

/***/ 233:
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
		return (0, _redux.bindActionCreators)({ selectSlide: _actions.selectSlide }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DashboardNav);

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

	var _actions = __webpack_require__(197);

	var _sessionItem = __webpack_require__(235);

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

			_this.renderSession = _this.renderSession.bind(_this);
			_this.onSelect = _this.onSelect.bind(_this);
			return _this;
		}

		_createClass(SessionsGrid, [{
			key: 'onSelect',
			value: function onSelect(session) {
				this.props.selectSession(session);
			}

			//TODO: TEST THIS

		}, {
			key: 'renderSession',
			value: function renderSession(session, i) {
				var _this2 = this;

				//if the link is not available, don't show its icon
				var sourceCodeLink = typeof session.sourceCodeLink != 'undefined';
				var slidesLink = typeof session.slidesLink != 'undefined';
				var videoLink = typeof session.videoLink != 'undefined';
				var blogPostLink = typeof session.blogPostLink != 'undefined';
				var attendance = this.props.user.attendance;

				return _react2.default.createElement(_sessionItem2.default, { key: session.id,
					title: session.name,
					number: session.number,
					image: session.image,
					onClickEvent: function onClickEvent() {
						return _this2.onSelect(session);
					},
					project: session.project,
					sourceCodeLink: sourceCodeLink,
					slidesLink: slidesLink,
					videoLink: videoLink,
					blogPostLink: blogPostLink,
					attendance: attendance });
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				return _react2.default.createElement(
					'div',
					{ className: 'grid-wrapper' },
					_react2.default.createElement(
						'div',
						{ className: 'grid' },
						this.props.sessions.map(function (item, i) {
							return _this3.renderSession(item, i);
						})
					)
				);
			}
		}]);

		return SessionsGrid;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var sessions = _ref.sessions,
		    user = _ref.user;

		return { sessions: sessions.data, user: user };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ selectSession: _actions.selectSession }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SessionsGrid);

/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = SessionItem;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function SessionItem(props) {

		return _react2.default.createElement(
			"div",
			{ className: "session-item", onClick: props.onClickEvent },
			_react2.default.createElement("div", { className: "img-wrapper",
				style: { backgroundImage: "url(" + props.image + ")" } }),
			props.attendance.includes(props.number) && _react2.default.createElement(
				"div",
				{ className: "attend" },
				_react2.default.createElement(
					"div",
					{ className: "circle-icon" },
					_react2.default.createElement("i", { className: "fa fa-check hl", ariaHidden: "true" })
				),
				_react2.default.createElement(
					"p",
					null,
					"ATTENDED"
				)
			),
			_react2.default.createElement(
				"div",
				{ className: "text-wrapper" },
				_react2.default.createElement(
					"h4",
					{ className: "week" },
					"Week ",
					props.number
				),
				_react2.default.createElement(
					"h3",
					null,
					props.title
				)
			),
			_react2.default.createElement(
				"div",
				{ className: "icons" },
				props.project && props.sourceCodeLink && _react2.default.createElement(
					"span",
					null,
					_react2.default.createElement("i", { className: "fa fa-code", ariaHidden: "true" })
				),
				props.project && props.slidesLink && _react2.default.createElement(
					"span",
					null,
					_react2.default.createElement("i", { className: "fa fa-film", ariaHidden: "true" })
				),
				props.project && props.videoLink && _react2.default.createElement(
					"span",
					null,
					_react2.default.createElement("i", { className: "fa fa-video-camera", ariaHidden: "true" })
				),
				props.project && props.blogPostLink && _react2.default.createElement(
					"span",
					null,
					_react2.default.createElement("i", { className: "fa fa-thumb-tack", ariaHidden: "true" })
				),
				props.project && _react2.default.createElement(
					"span",
					{ className: "right" },
					_react2.default.createElement("i", { className: "fa fa-plus hl", ariaHidden: "true" })
				)
			)
		);
	}

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

	var _redux = __webpack_require__(166);

	var _actions = __webpack_require__(197);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SessionDetail = function (_Component) {
		_inherits(SessionDetail, _Component);

		function SessionDetail(props) {
			_classCallCheck(this, SessionDetail);

			var _this = _possibleConstructorReturn(this, (SessionDetail.__proto__ || Object.getPrototypeOf(SessionDetail)).call(this, props));

			_this.toggleConfirm = _this.toggleConfirm.bind(_this);
			return _this;
		}

		_createClass(SessionDetail, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				document.querySelector('body').classList.add('noscroll');
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				document.querySelector('body').classList.remove('noscroll');
			}
		}, {
			key: 'toggleConfirm',
			value: function toggleConfirm() {
				document.querySelector('.session-inner').classList.toggle('exit-left');
				document.querySelector('.confirm').classList.toggle('exit-left');
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var session = this.props.selectedSession;
				if (!session) return null;

				var teamScore = this.props.team.team ? this.props.team.team.scores.find(function (score) {
					return score.sessionNumber == session.number;
				}) : null;

				if (!session.project) teamScore = null;else if (typeof teamScore == 'undefined' || teamScore == null) teamScore = '0/';else teamScore = teamScore.score + '/';

				//if no link, button will not be displayed
				var sourceCodeLink = typeof session.sourceCodeLink != 'undefined';
				var slidesLink = typeof session.slidesLink != 'undefined';
				var videoLink = typeof session.videoLink != 'undefined';
				var blogPostLink = typeof session.blogPostLink != 'undefined';
				var submissionLink = typeof session.submissionLink != 'undefined';

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
								{ className: 'session-inner' },
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
											teamScore,
											session.points
										)
									),
									sourceCodeLink && _react2.default.createElement(
										'a',
										{ href: session.sourceCodeLink, target: '_blank' },
										_react2.default.createElement(
											'button',
											null,
											_react2.default.createElement(
												'span',
												{ className: 'icon' },
												_react2.default.createElement('i', { className: 'fa fa-code', ariaHidden: 'true' })
											),
											' PROJECT'
										)
									),
									slidesLink && _react2.default.createElement(
										'a',
										{ href: session.slidesLink, target: '_blank' },
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
										{ href: session.videoLink, target: '_blank' },
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
										{ href: session.blogPostLink, target: '_blank' },
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
								submissionLink && _react2.default.createElement(
									'a',
									{ onClick: this.toggleConfirm },
									_react2.default.createElement(
										'button',
										{ className: 'btn-selection' },
										_react2.default.createElement('i', { className: 'fa fa-plus', ariaHidden: 'true' }),
										' ADD SUBMISSION'
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'confirm' },
								_react2.default.createElement(
									'h3',
									null,
									'Before you submit, make sure that: '
								),
								_react2.default.createElement(
									'ul',
									null,
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement('i', { className: 'fa fa-check', ariaHidden: 'true' }),
										' You are submitting only 1 zip file per team'
									),
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement('i', { className: 'fa fa-check', ariaHidden: 'true' }),
										' You are ',
										_react2.default.createElement(
											'strong',
											null,
											'not'
										),
										' making multiple submissions'
									),
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement('i', { className: 'fa fa-check', ariaHidden: 'true' }),
										' You have provided your team name & team ID in a text file'
									),
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement('i', { className: 'fa fa-check', ariaHidden: 'true' }),
										' You have included the contents of your entire ',
										_react2.default.createElement(
											'strong',
											null,
											'Android'
										),
										' project'
									),
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement('i', { className: 'fa fa-check', ariaHidden: 'true' }),
										' You have only done ',
										_react2.default.createElement(
											'strong',
											null,
											'either'
										),
										' the exercises or project, ',
										_react2.default.createElement(
											'strong',
											null,
											'not both'
										)
									),
									_react2.default.createElement(
										'li',
										null,
										_react2.default.createElement('i', { className: 'fa fa-check', ariaHidden: 'true' }),
										' If you have done the exercises, they should all be in ',
										_react2.default.createElement(
											'strong',
											null,
											'one project'
										)
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'notice' },
									_react2.default.createElement(
										'p',
										null,
										'Submissions will be due 1 week from the session, but we will accept late submissions taking some points for each day it is late. The lateness penalty for an assignment that is submitted between N and N+1 full days late (where N is nonnegative) is 2^N % of the assignment\'s value. That is, the penalty is 1% for being up to 1 day late, 2% for being from 1 to 2 days late, 4% for being from 2 to 3 days late, and so forth.'
									)
								),
								_react2.default.createElement(
									'a',
									{ onClick: this.toggleConfirm, className: 'cancel' },
									_react2.default.createElement(
										'button',
										{ className: 'btn-selection' },
										'CANCEL'
									)
								),
								_react2.default.createElement(
									'a',
									{ href: session.submissionLink, target: '_blank', onClick: function onClick() {
											return _this2.props.selectSession(null);
										} },
									_react2.default.createElement(
										'button',
										{ className: 'btn-selection' },
										'CONFIRM'
									)
								)
							)
						)
					)
				);
			}
		}]);

		return SessionDetail;
	}(_react.Component);

	function mapStateToProps(_ref) {
		var selectedSession = _ref.selectedSession,
		    team = _ref.team;

		return { selectedSession: selectedSession, team: team };
	}

	function mapDispatchToProps(dispatch) {
		return (0, _redux.bindActionCreators)({ selectSession: _actions.selectSession }, dispatch);
	}

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SessionDetail);

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

	var _featuredTeamList = __webpack_require__(238);

	var _featuredTeamList2 = _interopRequireDefault(_featuredTeamList);

	var _teamList = __webpack_require__(240);

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

	var _featuredTeamItem = __webpack_require__(239);

	var _featuredTeamItem2 = _interopRequireDefault(_featuredTeamItem);

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
			value: function renderList(team) {
				return _react2.default.createElement(_featuredTeamItem2.default, { key: team.id,
					featured: true,
					name: team.name,
					score: team.totalScore,
					members: team.members,
					rank: team.rank });
			}
		}, {
			key: 'render',
			value: function render() {
				//console.log('list', this.props.list);
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

/***/ 239:
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

	var FeaturedTeamItem = function (_Component) {
		_inherits(FeaturedTeamItem, _Component);

		function FeaturedTeamItem(props) {
			_classCallCheck(this, FeaturedTeamItem);

			var _this = _possibleConstructorReturn(this, (FeaturedTeamItem.__proto__ || Object.getPrototypeOf(FeaturedTeamItem)).call(this, props));

			_this.formatNumber = _this.formatNumber.bind(_this);
			_this.formatMembers = _this.formatMembers.bind(_this);
			return _this;
		}

		_createClass(FeaturedTeamItem, [{
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

		return FeaturedTeamItem;
	}(_react.Component);

	exports.default = FeaturedTeamItem;

/***/ },

/***/ 240:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(159);

	var _teamItem = __webpack_require__(241);

	var _teamItem2 = _interopRequireDefault(_teamItem);

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
				return _react2.default.createElement(_teamItem2.default, { key: team.id,
					name: team.name,
					score: team.totalScore,
					members: team.members,
					rank: team.rank });
			}
		}, {
			key: 'render',
			value: function render() {
				/*const list = [
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 1},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}},{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 2},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 1},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}},{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 2},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 1},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}},{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 2},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 1},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}},{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 2},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 1},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}},{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 2},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 1},
	   	{key: 1, name: 'team name', score: 50, members: [{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}},{profilePicture: {small: 'https://graph.facebook.com/1824232974501604/picture?width=250'}}], rank: 2}
	   ];*/

				if (this.props.list.length != 0) return _react2.default.createElement(
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
								{ className: 'header' },
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
				);

				return null;
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

/***/ 241:
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

	var TeamItem = function (_Component) {
		_inherits(TeamItem, _Component);

		function TeamItem(props) {
			_classCallCheck(this, TeamItem);

			var _this = _possibleConstructorReturn(this, (TeamItem.__proto__ || Object.getPrototypeOf(TeamItem)).call(this, props));

			_this.formatMembers = _this.formatMembers.bind(_this);
			return _this;
		}

		_createClass(TeamItem, [{
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

		return TeamItem;
	}(_react.Component);

	exports.default = TeamItem;

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _redux = __webpack_require__(166);

	var _reducer_user = __webpack_require__(243);

	var _reducer_user2 = _interopRequireDefault(_reducer_user);

	var _reducer_sessions = __webpack_require__(244);

	var _reducer_sessions2 = _interopRequireDefault(_reducer_sessions);

	var _reducer_selected_session = __webpack_require__(245);

	var _reducer_selected_session2 = _interopRequireDefault(_reducer_selected_session);

	var _reducer_scoreboard = __webpack_require__(246);

	var _reducer_scoreboard2 = _interopRequireDefault(_reducer_scoreboard);

	var _reducer_slide = __webpack_require__(247);

	var _reducer_slide2 = _interopRequireDefault(_reducer_slide);

	var _reducer_dialog = __webpack_require__(248);

	var _reducer_dialog2 = _interopRequireDefault(_reducer_dialog);

	var _reducer_team = __webpack_require__(249);

	var _reducer_team2 = _interopRequireDefault(_reducer_team);

	var _reducer_team_rank = __webpack_require__(250);

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
			case _actions.FETCH_USER:
				//console.log('user', action.payload.data.user)
				return action.payload.data.user;
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

	var _underscore = __webpack_require__(230);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var action = arguments[1];

		switch (action.type) {
			case _actions.FETCH_SESSIONS:
				//console.log(action.payload.data.sessions)
				if (!action.payload.data.success) return state;else {
					//console.log(action.payload.data.sessions)
					var cols = 4;
					return {
						attend: null,
						attendSuccess: false,
						data: action.payload.data.sessions.sort(function (a, b) {
							return a.number > b.number ? 1 : -1;
						}).reduce(function (arr, session) {
							if (!_underscore2.default.isEmpty(session.project)) {
								session.points = session.project.points;
								session.slidesLink = session.project.slidesLink;
								session.videoLink = session.project.videoLink;
								session.sourceCodeLink = session.project.sourceCodeLink;
								session.submissionLink = session.project.submissionLink;
								session.project = true;
							} else session.project = false;

							//if(arr.length == 0 || arr[arr.length-1].length >= cols)
							//	arr.push([session]);
							//else
							arr.push(session);

							return arr;
						}, [])
					};
				}
			case _actions.ATTEND_SESSION:
				//console.log('session', state)
				//action.payload.data.sessionNumber
				if (action.payload.data.success) {
					return {
						attend: action.payload.data.sessionNumber,
						attendSuccess: true,
						data: state.data
					};
				}
				return {
					attend: action.payload.data.error,
					attendSuccess: false,
					data: state.data
				};
			case _actions.RESET_ATTEND:
				return {
					attend: null,
					attendSuccess: false,
					data: state.data
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

/***/ 246:
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

/***/ 247:
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

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	//onBoarding value will be changed if team is null on dialog's render
	var defaultState = {
		active: false,
		onBoarding: false,
		attendance: false
	};

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
		var action = arguments[1];

		switch (action.type) {
			case _actions.CHANGE_DIALOG:
				return Object.assign({}, state, action.payload);
			default:
				return state;
		}
	};

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _actions = __webpack_require__(197);

	exports.default = function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { team: null, rank: 'n/a', error: null, done: false };
		var action = arguments[1];

		switch (action.type) {
			case _actions.FETCH_TEAM:
			case _actions.CREATE_TEAM:
			case _actions.JOIN_TEAM:
				//console.log('my team', action.payload.data.team)
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
			case _actions.LEAVE_TEAM:
				if (action.payload.data.success) {
					//console.log('my team', null);
					return {
						team: null,
						rank: 'n/a',
						error: null,
						done: true
					};
				}

				//wrong team name submitted, so null payload reaches here
				//console.log('my team', 'unchanged: ' + action.payload.data.error)
				return {
					team: state.team, //unchanged
					rank: state.rank, //unchanged
					error: action.payload.data.error, //updated
					done: true
				};
			case _actions.GET_TEAM_RANK:
				return {
					team: state.team,
					rank: action.payload, //update made here
					error: state.error,
					done: state.done
				};
			case _actions.RESET_TEAM_ERROR:
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

/***/ 250:
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