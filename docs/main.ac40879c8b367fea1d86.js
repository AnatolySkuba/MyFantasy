(() => {
	"use strict";
	var t,
		e = {
			975: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.Background = void 0);
				var r = (function (t) {
					function e(e) {
						return t.call(this, e, 0, 0, "") || this;
					}
					return (
						o(e, t),
						(e.prototype.place = function (t) {
							var e = this.scene.add.sprite(0, 0, "sprite", "".concat(t, ".jpg")),
								i = function () {
									window.innerHeight / window.innerWidth > e.height / e.width
										? ((e.displayHeight = window.innerHeight), (e.scaleX = e.scaleY))
										: ((e.displayWidth = window.innerWidth), (e.scaleY = e.scaleX)),
										(e.y = window.innerHeight / 2),
										(e.x = window.innerWidth / 2);
								};
							i(), this.scene.scale.on("resize", i, this), "background" === t && this.backgroundOverlay();
						}),
						(e.prototype.backgroundOverlay = function () {
							var t = this,
								e = this.scene.add.sprite(0, 0, "sprite", "backgroundOverlay.png"),
								i = function () {
									(e.displayHeight = 2 * window.innerHeight), (e.displayWidth = 2 * window.innerWidth);
								};
							i(),
								this.scene.scale.on("resize", i, this),
								this.scene.time.addEvent({
									delay: 1500,
									callback: function () {
										return t.backgroundOverlayOff(e);
									},
								});
						}),
						(e.prototype.backgroundOverlayOff = function (t) {
							this.scene.tweens.add({ targets: t, alpha: 0, duration: 200 });
						}),
						(e.prototype.button = function () {
							var t = this;
							this.scene.time.addEvent({
								delay: 2e3,
								callback: function () {
									var e = t.scene.add.sprite(0, 0, "sprite", "backgroundOverlay.png").setSize(200, 200),
										i = t.scene.add.sprite(0, 0, "sprite", "button.png"),
										n = t.scene.add.sprite(0, 0, "sprite", "arrow.png"),
										o = t.scene.add.text(0, 0, "Swipe to play!", t.configText()),
										r = function () {
											(e.displayHeight = 2 * window.innerHeight),
												(e.displayWidth = 2 * window.innerWidth),
												(i.displayHeight = 0.09 * window.innerHeight),
												(i.scaleX = i.scaleY),
												i.setPosition(window.innerWidth / 2, window.innerHeight / 1.1),
												(n.displayHeight = 0.09 * window.innerHeight),
												(n.scaleX = n.scaleY),
												n.setPosition(window.innerWidth / 2 - 1.8 * n.displayHeight, window.innerHeight / 1.1),
												t.scene.tweens.add({
													targets: n,
													ease: "Circular",
													x: window.innerWidth / 2 + 1.8 * n.displayHeight,
													loop: -1,
													duration: 1e3,
												}),
												(o.displayHeight = 0.06 * window.innerHeight),
												(o.scaleX = o.scaleY),
												o.setPosition(
													window.innerWidth / 2 - o.displayWidth / 2,
													window.innerHeight / 1.1 - o.displayHeight / 2,
												);
										};
									r(),
										t.scene.scale.on("resize", r, t),
										t.scene.input.on("pointerdown", function () {
											window.location.href = "https://apps.apple.com/us/app/id1491717191";
										});
								},
							});
						}),
						(e.prototype.configText = function () {
							return {
								fontFamily: "Nunito Sans",
								fontStyle: "normal",
								fontWeight: 700,
								fontSize: "24px",
								lineHeight: "33px",
								align: "center",
								letterSpacing: "-0.05px",
								color: "#FFFFFF",
							};
						}),
						e
					);
				})(i(260).Physics.Arcade.Sprite);
				e.Background = r;
			},
			764: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.Girl = void 0);
				var r = (function (t) {
					function e(e) {
						return t.call(this, e) || this;
					}
					return (
						o(e, t),
						(e.prototype.placeFirst = function (t) {
							var e = this;
							t.map(function (t) {
								var i = e.scene.add.sprite(0, 0, "sprite", "".concat(t, ".png"));
								("animationSurprised" !== t && "animationJoy" !== t) ||
									((i.visible = !1),
									e.scene.time.addEvent({
										delay: "animationSurprised" === t ? 0 : 750,
										callback: function () {
											return e.eventAnimation(i);
										},
									})),
									"animationShy" === t && i.setVisible(!1),
									e.pushGirlState(i);
								var n = function () {
									(i.displayHeight = 0.95 * window.innerHeight),
										(i.scaleX = i.scaleY),
										i.setPosition(window.innerWidth / 2, window.innerHeight - i.displayHeight / 2);
								};
								n(), e.scene.scale.on("resize", n, e);
							}),
								this.scene.time.addEvent({
									delay: 1500,
									callback: function () {
										return e.moveLower();
									},
								});
						}),
						(e.prototype.placeNext = function (t, e) {
							var i = this;
							["Club", "NightClub"].includes(e)
								? this.lastScene(t, e)
								: (["Dress", "Costume"].includes(e)
										? (t = ["body", "animationShy", "animationJoy", "hair"]).splice(-1, 0, "".concat(e))
										: t.splice(-1, 0, "".concat(e)),
								  t.map(function (t) {
										var e = i.scene.add.sprite(0, 0, "sprite", "".concat(t, ".png"));
										("animationShy" !== t && "animationJoy" !== t) || (e.visible = !1), i.pushGirlState(e);
										var n = function () {
											(e.displayHeight = 1.07 * window.innerHeight),
												(e.scaleX = e.scaleY),
												e.setPosition(window.innerWidth / 2, window.innerHeight - e.displayHeight / 3.132);
										};
										n(), i.scene.scale.on("resize", n, i);
								  }));
						}),
						(e.prototype.moveLower = function () {
							var t = this;
							this.getGirlState().map(function (e) {
								t.scene.tweens.add({
									targets: e,
									displayHeight: 1.07 * window.innerHeight,
									displayWidth: 0.714875 * window.innerHeight,
									y: window.innerHeight - e.displayHeight / 2.7,
									duration: 100,
									onComplete: function () {
										return t.placeLower();
									},
								});
							});
						}),
						(e.prototype.placeLower = function () {
							var t = this;
							this.getGirlState().map(function (e) {
								var i = function () {
									(e.displayHeight = 1.07 * window.innerHeight),
										(e.scaleX = e.scaleY),
										e.setPosition(window.innerWidth / 2, window.innerHeight - e.displayHeight / 3.132);
								};
								i(), t.scene.scale.on("resize", i, t);
							});
						}),
						(e.prototype.eventAnimation = function (t) {
							var e = 0,
								i = setInterval(function () {
									6 == ++e && window.clearInterval(i), t.visible ? (t.visible = !1) : (t.visible = !0);
								}, 125);
						}),
						(e.prototype.lastScene = function (t, e) {
							var i = this;
							t.splice(1, 1, "animationSad"),
								this.man(),
								t.map(function (e) {
									var n = i.scene.add.sprite(0, 0, "sprite", "".concat(e, ".png"));
									("animationSad" !== e && "animationJoy" !== e) ||
										((n.visible = !1),
										((t.includes("Dress") && "animationJoy" === e) ||
											(t.includes("Costume") && "animationSad" === e)) &&
											i.scene.time.addEvent({
												delay: 300,
												callback: function () {
													n.visible = !0;
												},
											})),
										i.pushGirlState(n);
									var o = function () {
										(n.displayHeight = 0.9 * window.innerHeight),
											(n.scaleX = n.scaleY),
											n.setPosition(
												window.innerWidth / 2 - n.displayWidth / 5,
												window.innerHeight - n.displayHeight / 2.5,
											);
									};
									o(), i.scene.scale.on("resize", o, i);
								}),
								this.moveRight(),
								this.manText(t);
						}),
						(e.prototype.moveRight = function () {
							var t = this;
							this.getGirlState().map(function (e) {
								(e.x = window.innerWidth / 2 - e.displayWidth / 1.2),
									t.scene.tweens.add({ targets: e, x: window.innerWidth / 2 - e.displayWidth / 5, duration: 100 });
							});
						}),
						(e.prototype.man = function () {
							var t = this.scene.add.sprite(0, 0, "sprite", "man.png"),
								e = function () {
									(t.displayHeight = 0.9 * window.innerHeight),
										(t.scaleX = t.scaleY),
										t.setPosition(
											window.innerWidth / 2 + t.displayWidth / 4.3,
											window.innerHeight - t.displayHeight / 2.05,
										);
								};
							e(),
								this.scene.scale.on("resize", e, this),
								(t.x = window.innerWidth / 2 + t.displayWidth / 1.2),
								this.scene.tweens.add({ targets: t, x: window.innerWidth / 2 + t.displayWidth / 4.3, duration: 100 });
						}),
						(e.prototype.manText = function (t) {
							var e = this.scene.add.sprite(0, 0, "sprite", "textBlockMan.png"),
								i = this.scene.add.text(
									0,
									0,
									t.includes("Dress") ? "You are beautiful!❤️" : "What a weird appearance!",
									this.configText(),
								),
								n = function () {
									(e.displayHeight = 0.15 * window.innerHeight),
										(e.scaleX = e.scaleY),
										e.setPosition(window.innerWidth / 2, window.innerHeight / 2);
								};
							n(),
								this.scene.scale.on("resize", n, this),
								(e.x = window.innerWidth / 1.1),
								(e.displayWidth = 0),
								(e.displayHeight = 0),
								this.scene.tweens.add({
									targets: e,
									x: window.innerWidth / 2,
									displayHeight: 0.15 * window.innerHeight,
									displayWidth: 0.459677419 * window.innerHeight,
									delay: 200,
									duration: 100,
								}),
								(i.displayHeight = window.innerHeight * (t.includes("Dress") ? 0.05 : 0.038)),
								(i.scaleX = i.scaleY),
								i.setPosition(
									window.innerWidth / 2 - (t.includes("Dress") ? 0.5 * i.displayWidth : 4.7 * i.displayHeight),
									window.innerHeight / (t.includes("Dress") ? 2.03 : 2),
								);
							var o = window.innerWidth / 2 - (t.includes("Dress") ? i.displayWidth / 2 : 4.7 * i.displayHeight);
							(i.x = window.innerWidth / 2 + i.displayWidth / 2),
								(i.displayWidth = 0),
								(i.displayHeight = 0),
								this.scene.tweens.add({
									targets: i,
									displayHeight: window.innerHeight * (t.includes("Dress") ? 0.05 : 0.038),
									displayWidth: window.innerHeight * (t.includes("Dress") ? 0.4 : 0.37),
									x: o,
									delay: 200,
									duration: 100,
								});
						}),
						(e.prototype.configText = function () {
							return {
								fontFamily: "Nunito Sans",
								fontStyle: "italic bold",
								fontWeight: 600,
								fontSize: "30px",
								lineHeight: "33px",
								align: "center",
								letterSpacing: "-0.05px",
								color: "#303052",
							};
						}),
						e
					);
				})(i(606).State);
				e.Girl = r;
			},
			801: function (t, e, i) {
				var n =
						(this && this.__createBinding) ||
						(Object.create
							? function (t, e, i, n) {
									void 0 === n && (n = i);
									var o = Object.getOwnPropertyDescriptor(e, i);
									(o && !("get" in o ? !e.__esModule : o.writable || o.configurable)) ||
										(o = {
											enumerable: !0,
											get: function () {
												return e[i];
											},
										}),
										Object.defineProperty(t, n, o);
							  }
							: function (t, e, i, n) {
									void 0 === n && (n = i), (t[n] = e[i]);
							  }),
					o =
						(this && this.__exportStar) ||
						function (t, e) {
							for (var i in t) "default" === i || Object.prototype.hasOwnProperty.call(e, i) || n(e, t, i);
						};
				Object.defineProperty(e, "__esModule", { value: !0 }),
					o(i(975), e),
					o(i(764), e),
					o(i(774), e),
					o(i(103), e),
					o(i(501), e),
					o(i(960), e),
					o(i(606), e);
			},
			960: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.Options = void 0);
				var r = (function (t) {
					function e(e, i) {
						var n = t.call(this, e) || this;
						return (n.clickHandler = i), n;
					}
					return (
						o(e, t),
						(e.prototype.place = function (t) {
							var i = this;
							this.showHandPointer(),
								t.map(function (t, n) {
									var o = i.scene.physics.add.sprite(0, 0, "sprite", "optionLight.png").setDebug(!1, !1, 0),
										r = i.scene.physics.add
											.sprite(
												0,
												0,
												"sprite",
												"".concat(t, ".").concat("Club" === t || "NightClub" === t ? "jpg" : "png"),
											)
											.setInteractive()
											.setDebug(!1, !1, 0);
									i.showTextureLight(r, o),
										r.on("pointerdown", function () {
											i.animation("animationJoy"),
												i.hideHandPointer(),
												i.hideOptions(r),
												i.scene.time.addEvent({
													delay: 500,
													callback: function () {
														i.removeGirlState(), i.clickHandler(r.frame.name.slice(6, -4), i.getGirlOptions());
													},
												});
										}),
										[r, o].map(function (t) {
											var o = function () {
												(t.displayHeight = 0.27 * window.innerHeight),
													(t.scaleX = t.scaleY),
													t.setPosition(
														window.innerWidth / 2 + ((0 === n ? -1 : 1) * t.displayWidth) / 1.8,
														window.innerHeight - t.displayHeight / 1.5,
													);
											};
											o(), i.scene.scale.on("resize", o, i), e.textures.push(t), i.showOption(t);
										});
								}),
								this.scene.add.layer().add(e.handPointer);
						}),
						(e.prototype.showOption = function (t) {
							var e, i;
							(t.displayWidth = 0),
								(t.displayHeight = 0),
								this.scene.tweens.add({
									targets: t,
									displayHeight: 0.27 * window.innerHeight,
									displayWidth: 0.236842105 * window.innerHeight,
									delay:
										null !==
											(i = null === (e = this.getGirlOptions()) || void 0 === e ? void 0 : e.includes("tShirt")) &&
										void 0 !== i
											? i
											: "optionLight.png" === t.frame.name
											? 1600
											: 1500,
									duration: 100,
								});
						}),
						(e.prototype.showTextureLight = function (t, i) {
							var n = this;
							this.scene.physics.add.overlap(e.handPointer, t, function () {
								n.scene.tweens.add({
									targets: i,
									displayHeight: 0.3564 * window.innerHeight,
									displayWidth: 0.312631579 * window.innerHeight,
									duration: 50,
								}),
									n.scene.tweens.add({
										targets: i,
										displayHeight: 0.27 * window.innerHeight,
										displayWidth: 0.236842105 * window.innerHeight,
										delay: 200,
										duration: 50,
									});
							});
						}),
						(e.prototype.showHandPointer = function () {
							var t = this,
								i = this.scene.physics.add.sprite(0, 0, "sprite", "hand.png").setSize(1, 1).setOffset(57),
								n = function () {
									(i.displayHeight = 0.27 * window.innerHeight),
										(i.scaleX = i.scaleY),
										i.setPosition(
											window.innerWidth / 2 - i.displayWidth / 3,
											window.innerHeight - i.displayHeight / 3.5,
										);
								};
							n(),
								this.scene.scale.on("resize", n, this),
								(i.y = window.innerHeight + i.displayHeight / 2.5),
								this.scene.tweens.add({
									targets: i,
									y: window.innerHeight - i.displayHeight / 3.5,
									duration: 150,
									delay: this.getGirlOptions() ? 2e3 : 3500,
									onComplete:
										this.handPointerTweens(i) &&
										function () {
											t.animation("animationShy");
										},
									onCompleteParams: [i],
								}),
								(e.handPointer = i);
						}),
						(e.prototype.handPointerTweens = function (t) {
							return (
								(e.Tween = this.scene.tweens.add({
									targets: t,
									x: window.innerWidth / 2 + 0.9 * t.displayWidth,
									ease: "Linear",
									delay: this.getGirlOptions() ? 2300 : 3800,
									yoyo: !0,
									duration: 300,
									repeat: -1,
								})),
								!0
							);
						}),
						(e.prototype.hideHandPointer = function () {
							(e.handPointer.y = window.innerHeight - e.handPointer.displayHeight / 3.5),
								this.scene.tweens.add({
									targets: e.handPointer,
									y: window.innerHeight + e.handPointer.displayHeight / 2.5,
									duration: 150,
								}),
								e.Tween.stop();
						}),
						(e.prototype.hideOptions = function (t) {
							var i = this;
							e.textures.map(function (e) {
								t !== e && "optionLight.png" !== e.frame.name
									? (i.scene.tweens.add({
											targets: t,
											displayHeight: 0.25 * window.innerHeight,
											displayWidth: 0.219298245 * window.innerHeight,
											duration: 150,
									  }),
									  i.scene.tweens.add({
											targets: t,
											displayHeight: 0.27 * window.innerHeight,
											displayWidth: 0.236842105 * window.innerHeight,
											delay: 150,
											duration: 150,
									  }),
									  i.scene.tweens.add({
											targets: [t, e],
											displayHeight: 0,
											displayWidth: 0,
											delay: 400,
											duration: 100,
											onComplete: function () {
												(t.visible = !1), (e.visible = !1);
											},
									  }))
									: "optionLight.png" === e.frame.name && e.setVisible(!1);
							});
						}),
						(e.textures = []),
						e
					);
				})(i(606).State);
				e.Options = r;
			},
			501: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.Progress = void 0);
				var r = (function (t) {
					function e(e) {
						return t.call(this, e) || this;
					}
					return (
						o(e, t),
						(e.prototype.place = function (t) {
							this.progressArray = t;
							var e = this.scene.add.sprite(0, 0, "sprite", "".concat(t[0], ".jpg"));
							this.showProgress(e);
						}),
						(e.prototype.placeNext = function () {
							var t = this.scene.add.sprite(
								0,
								0,
								"sprite",
								"".concat(this.progressArray[this.getGirlState().length - 4], ".jpg"),
							);
							return this.showProgress(t), !0;
						}),
						(e.prototype.showProgress = function (t) {
							var e = function () {
								(t.displayHeight = 0.01 * window.innerHeight),
									(t.scaleX = t.scaleY),
									t.setPosition(window.innerWidth / 2, 4.7 * t.displayHeight);
							};
							e(),
								this.scene.scale.on("resize", e, this),
								(t.alpha = 0),
								this.scene.tweens.add({
									targets: t,
									delay: "progress0.jpg" === t.frame.name ? 1500 : 0,
									alpha: 1,
									duration: 200,
								}),
								this.hideProgress(t);
						}),
						(e.prototype.hideProgress = function (t) {
							this.scene.tweens.add({
								targets: t,
								delay: "progress0.jpg" === t.frame.name ? 3e3 : 1500,
								alpha: 0,
								duration: 200,
							});
						}),
						e
					);
				})(i(606).State);
				e.Progress = r;
			},
			606: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.State = void 0);
				var r = (function (t) {
					function e(e) {
						return t.call(this, e, 0, 0, "") || this;
					}
					return (
						o(e, t),
						(e.prototype.setGirlState = function (t) {
							e.girlState = t;
						}),
						(e.prototype.pushGirlState = function (t) {
							e.girlState.push(t);
						}),
						(e.prototype.removeGirlState = function () {
							(e.girlTextures = []),
								e.girlState.map(function (t) {
									e.girlTextures.push(t.frame.name.slice(0, -4)), (t.visible = !1);
								}),
								(e.girlState = []);
						}),
						(e.prototype.animation = function (t) {
							e.girlState.map(function (e) {
								e.frame.name === "".concat(t, ".png") && e.setVisible(!0);
							});
						}),
						(e.prototype.getGirlState = function () {
							return e.girlState;
						}),
						(e.prototype.getGirlOptions = function () {
							return e.girlTextures;
						}),
						(e.girlState = []),
						e
					);
				})(i(260).Physics.Arcade.Sprite);
				e.State = r;
			},
			774: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.TextBlock = void 0);
				var r = (function (t) {
					function e(e) {
						return t.call(this, e, 0, 0, "") || this;
					}
					return (
						o(e, t),
						(e.prototype.start = function () {
							var t = this.scene.add.sprite(0, 0, "sprite", "textBlock.png"),
								e = this.scene.add.text(0, 0, "I received an invitation\nto the party!", this.configText()),
								i = function () {
									(t.displayHeight = 0.17 * window.innerHeight),
										(t.scaleX = t.scaleY),
										t.setPosition(window.innerWidth / 2, window.innerHeight / 2.1),
										(e.displayHeight = 0.08 * window.innerHeight),
										(e.scaleX = e.scaleY),
										e.setPosition(window.innerWidth / 2 - e.displayWidth / 2, window.innerHeight / 2.2);
								};
							i(),
								this.scene.scale.on("resize", i, this),
								this.showTextBlock([t, e]),
								this.scene.time.addEvent({
									delay: 750,
									callback: function () {
										e.text = " I need to prepare my\nappearance";
									},
								});
						}),
						(e.prototype.showTextBlock = function (t) {
							var e = this;
							t.map(function (t) {
								(t.displayWidth = 0),
									(t.displayHeight = 0),
									e.scene.tweens.add({
										targets: t,
										displayHeight: window.innerHeight * ("Sprite" === t.type ? 0.17 : 0.08),
										displayWidth: window.innerHeight * ("Sprite" === t.type ? 0.51548387 : 0.336),
										duration: 100,
									});
							}),
								this.hideTextBlock(t);
						}),
						(e.prototype.hideTextBlock = function (t) {
							var e = this;
							this.scene.tweens.add({
								targets: t,
								displayWidth: 0,
								displayHeight: 0,
								delay: 1500,
								duration: 100,
								onComplete: function () {
									e.scene.tweens.add({ targets: t, alpha: 0 });
								},
							});
						}),
						(e.prototype.configText = function () {
							return {
								fontFamily: "Nunito Sans",
								fontStyle: "italic bold",
								fontWeight: 600,
								fontSize: "30px",
								lineHeight: "33px",
								align: "center",
								letterSpacing: "-0.05px",
								color: "#303052",
							};
						}),
						e
					);
				})(i(260).Physics.Arcade.Sprite);
				e.TextBlock = r;
			},
			103: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.Tooltip = void 0);
				var r = (function (t) {
					function e(e) {
						var i = t.call(this, e) || this;
						return (i.tooltips = []), i;
					}
					return (
						o(e, t),
						(e.prototype.place = function (t) {
							this.tooltipsArray = t;
							var e = this.scene.add.sprite(0, 0, "sprite", "overlay.png"),
								i = this.scene.add.text(0, 0, "".concat(t[0]), this.configText());
							this.showTooltip(e, i);
						}),
						(e.prototype.placeNext = function () {
							var t = this.scene.add.sprite(0, 0, "sprite", "overlay.png"),
								e = this.scene.add.text(
									0,
									0,
									"".concat(this.tooltipsArray[this.getGirlState().length - 4]),
									this.configText(),
								);
							this.showTooltip(t, e);
						}),
						(e.prototype.showTooltip = function (t, e) {
							var i = this,
								n = function () {
									(t.displayHeight = 0.047 * window.innerHeight),
										(t.scaleX = t.scaleY),
										t.setPosition(window.innerWidth / 2, t.displayHeight),
										(e.displayHeight = 0.03 * window.innerHeight),
										(e.scaleX = e.scaleY),
										e.setPosition(window.innerWidth / 2 - e.displayWidth / 2, 1.1 * e.displayHeight);
								};
							n(),
								this.scene.scale.on("resize", n, this),
								[t, e].map(function (t) {
									i.tooltips.push(t),
										(t.y = -t.displayHeight),
										i.scene.tweens.add({
											targets: t,
											y: t.displayHeight * ("Sprite" === t.type ? 1 : 1.1),
											delay: "Choose your appearance" === e.text ? 3500 : 2e3,
											duration: 100,
										});
								});
						}),
						(e.prototype.hideTooltip = function () {
							var t = this;
							this.tooltips.map(function (e) {
								var i = function (e) {
									e.y === e.displayHeight * ("Sprite" === e.type ? 1 : 1.1)
										? ((e.y = e.displayHeight * ("Sprite" === e.type ? 1 : 1.1)),
										  t.scene.tweens.add({
												targets: e,
												y: -e.displayHeight,
												duration: 100,
												onComplete: function () {
													e.visible = !1;
												},
										  }))
										: t.scene.time.addEvent({
												delay: 100,
												callback: function () {
													i(e);
												},
										  });
								};
								i(e);
							});
						}),
						(e.prototype.configText = function () {
							return {
								fontFamily: "Nunito Sans",
								fontStyle: "normal",
								fontWeight: 700,
								fontSize: "24px",
								lineHeight: "33px",
								align: "center",
								letterSpacing: "-0.05px",
								color: "#FFFFFF",
							};
						}),
						e
					);
				})(i(606).State);
				e.Tooltip = r;
			},
			607: (t, e, i) => {
				var n = i(260),
					o = i(542),
					r = {
						parent: "game",
						type: Phaser.AUTO,
						width: window.outerWidth,
						height: window.outerHeight,
						backgroundColor: "rgba(6, 6, 6, 0.8)",
						scale: { mode: Phaser.Scale.RESIZE },
						physics: { default: "arcade", arcade: { debug: !0 } },
						render: { antialiasGL: !1, pixelArt: !0 },
						callbacks: {
							postBoot: function () {
								window.sizeChanged();
							},
						},
						canvasStyle: "display: block; width: 100%; height: 100%;",
						autoFocus: !0,
						audio: { disableWebAudio: !1 },
						scene: [o.LoadingScene, o.Main],
					};
				(window.sizeChanged = function () {
					window.game.isBooted &&
						setTimeout(function () {
							window.game.scale.resize(window.innerWidth, window.innerHeight),
								window.game.canvas.setAttribute(
									"style",
									"display: block; width: ".concat(window.innerWidth, "px; height: ").concat(window.innerHeight, "px;"),
								);
						}, 100);
				}),
					(window.onresize = function () {
						return window.sizeChanged();
					}),
					(window.game = new n.Game(r));
			},
			542: function (t, e, i) {
				var n =
						(this && this.__createBinding) ||
						(Object.create
							? function (t, e, i, n) {
									void 0 === n && (n = i);
									var o = Object.getOwnPropertyDescriptor(e, i);
									(o && !("get" in o ? !e.__esModule : o.writable || o.configurable)) ||
										(o = {
											enumerable: !0,
											get: function () {
												return e[i];
											},
										}),
										Object.defineProperty(t, n, o);
							  }
							: function (t, e, i, n) {
									void 0 === n && (n = i), (t[n] = e[i]);
							  }),
					o =
						(this && this.__exportStar) ||
						function (t, e) {
							for (var i in t) "default" === i || Object.prototype.hasOwnProperty.call(e, i) || n(e, t, i);
						};
				Object.defineProperty(e, "__esModule", { value: !0 }), o(i(476), e), o(i(708), e);
			},
			708: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.Main = void 0);
				var r = i(260),
					s = i(801),
					a = (function (t) {
						function e() {
							var e = t.call(this, "intro-scene") || this;
							return (
								(e.clickHandler = function (t, i) {
									["Club", "NightClub"].includes(t) && e.background.place(t),
										e.tooltip.hideTooltip(),
										e.girl.placeNext(i, t),
										["Club", "NightClub"].includes(t)
											? e.background.button()
											: e.progress.placeNext() && e.tooltip.placeNext(),
										i.includes("tShirt") && e.options.place(["optionBag", "optionBagBlue"]),
										i.includes("Dress") &&
											(["Sunglasses", "Choker"].includes(t)
												? e.options.place(["optionNightClub", "optionClub"])
												: ["Bag", "BagBlue"].includes(t) && e.options.place(["optionSunglasses", "optionChoker"])),
										i.includes("Costume") &&
											(["Sunglasses", "Necklace"].includes(t)
												? e.options.place(["optionNightClub", "optionClub"])
												: ["Bag", "BagBlue"].includes(t) && e.options.place(["optionSunglasses", "optionNecklace"]));
								}),
								e
							);
						}
						return (
							o(e, t),
							(e.prototype.create = function () {
								(this.background = new s.Background(this)), (this.girl = new s.Girl(this));
								var t = new s.TextBlock(this);
								(this.tooltip = new s.Tooltip(this)),
									(this.progress = new s.Progress(this)),
									(this.options = new s.Options(this, this.clickHandler)),
									this.background.place("background"),
									this.girl.placeFirst([
										"body",
										"animationSurprised",
										"animationShy",
										"animationJoy",
										"tShirt",
										"hair",
									]),
									t.start(),
									this.progress.place(["progress0", "progress1", "progress2", "progress3"]),
									this.tooltip.place([
										"Choose your appearance",
										"Choose your bag",
										"Choose your accessory",
										"Choose your place",
									]),
									this.options.place(["optionCostume", "optionDress"]);
							}),
							e
						);
					})(r.Scene);
				e.Main = a;
			},
			476: function (t, e, i) {
				var n,
					o =
						(this && this.__extends) ||
						((n = function (t, e) {
							return (
								(n =
									Object.setPrototypeOf ||
									({ __proto__: [] } instanceof Array &&
										function (t, e) {
											t.__proto__ = e;
										}) ||
									function (t, e) {
										for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
									}),
								n(t, e)
							);
						}),
						function (t, e) {
							if ("function" != typeof e && null !== e)
								throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
							function i() {
								this.constructor = t;
							}
							n(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
						});
				Object.defineProperty(e, "__esModule", { value: !0 }), (e.LoadingScene = void 0);
				var r = (function (t) {
					function e() {
						return t.call(this, "loading-scene") || this;
					}
					return (
						o(e, t),
						(e.prototype.preload = function () {
							window.innerHeight > 768
								? this.load.atlas(
										"sprite",
										"/MyFantasy/assets/spriteDesktop.png",
										"/MyFantasy/assets/spriteDesktop.json",
								  )
								: this.load.atlas(
										"sprite",
										"/MyFantasy/assets/spriteMobile.png",
										"/MyFantasy/assets/spriteMobile.json",
								  );
						}),
						(e.prototype.create = function () {
							this.scene.start("intro-scene");
						}),
						e
					);
				})(i(260).Scene);
				e.LoadingScene = r;
			},
		},
		i = {};
	function n(t) {
		var o = i[t];
		if (void 0 !== o) return o.exports;
		var r = (i[t] = { exports: {} });
		return e[t].call(r.exports, r, r.exports, n), r.exports;
	}
	(n.m = e),
		(t = []),
		(n.O = (e, i, o, r) => {
			if (!i) {
				var s = 1 / 0;
				for (d = 0; d < t.length; d++) {
					for (var [i, o, r] = t[d], a = !0, c = 0; c < i.length; c++)
						(!1 & r || s >= r) && Object.keys(n.O).every(t => n.O[t](i[c]))
							? i.splice(c--, 1)
							: ((a = !1), r < s && (s = r));
					if (a) {
						t.splice(d--, 1);
						var p = o();
						void 0 !== p && (e = p);
					}
				}
				return e;
			}
			r = r || 0;
			for (var d = t.length; d > 0 && t[d - 1][2] > r; d--) t[d] = t[d - 1];
			t[d] = [i, o, r];
		}),
		(n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
		(() => {
			var t = { 179: 0 };
			n.O.j = e => 0 === t[e];
			var e = (e, i) => {
					var o,
						r,
						[s, a, c] = i,
						p = 0;
					if (s.some(e => 0 !== t[e])) {
						for (o in a) n.o(a, o) && (n.m[o] = a[o]);
						if (c) var d = c(n);
					}
					for (e && e(i); p < s.length; p++) (r = s[p]), n.o(t, r) && t[r] && t[r][0](), (t[r] = 0);
					return n.O(d);
				},
				i = (self.webpackChunkMyFantasy = self.webpackChunkMyFantasy || []);
			i.forEach(e.bind(null, 0)), (i.push = e.bind(null, i.push.bind(i)));
		})();
	var o = n.O(void 0, [426], () => n(607));
	o = n.O(o);
})();
