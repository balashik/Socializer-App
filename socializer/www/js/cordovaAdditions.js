
function newKeyUpDown(originalFunction, eventType) {
    return function() {
        if ("ontouchstart" in document.documentElement) { // if it's a touch device, or test here specifically for android chrome
            var $element = $(this), $input = null;
            if (/input/i.test($element.prop('tagName')))
                $input = $element;
            else if ($('input', $element).size() > 0)
                $input = $($('input', $element).get(0));

            if ($input) {
                var currentVal = $input.val(), checkInterval = null;
                $input.focus(function(e) {
                    clearInterval(checkInterval);
                    checkInterval = setInterval(function() {
                        if ($input.val() != currentVal) {
                            var event = jQuery.Event(eventType);
                            currentVal = $input.val();
                            event.which = event.keyCode = (currentVal && currentVal.length > 0) ? currentVal.charCodeAt(currentVal.length - 1) : '';
                            $input.trigger(event);
                        }
                    }, 30);
                });
                $input.blur(function() {
                    clearInterval(checkInterval);
                });
            }
        }
        return originalFunction.apply(this, arguments);
    }
}
$.fn.keyup = newKeyUpDown($.fn.keyup, 'keyup');
$.fn.keydown = newKeyUpDown($.fn.keydown, 'keydown');

function GlobalController() {

	this.backButtonListener = null;

	this.setBackButtonListener = function(callback) {
		if(window._cordovaNative) {
			console.log("backButtonListener Set:\n" + callback);
			backButtonListener = callback;
		}
	}

	function backEventListener(e) {
		console.log(backButtonListener);
		if(backButtonListener != null) {
			backButtonListener();
		} else {
			navigator.app.exitApp();
		}
	}

	if(window._cordovaNative) {
		document.addEventListener('backbutton', backEventListener);
	}
}

if(window._cordovaNative) {

	var logger= $("<div>");
	$("body").prepend(logger);

	function Storage() {
		var db = window.sqlitePlugin.openDatabase({name: "socializer.db", androidDatabaseImplementation: 2, androidLockWorkaround: 1});
		db.transaction(function (tx) {
			tx.executeSql('CREATE TABLE IF NOT EXISTS main_table (id text primary key, data text)');
			db.executeSql("pragma table_info (main_table);", [], function(res) {
		      console.log("PRAGMA res: " + JSON.stringify(res));
		    });
		});
		this.write = function(field, data) {
			console.log("Atempting to write: field='" + field + "' data='" + data + "'");
			db.transaction(function (tx) {
				tx.executeSql("INSERT INTO main_table (id, data) VALUES (?,?)", [field, data], function(tx, res) {
					console.log("Write results: " + JSON.stringify(res));
				});
			});
		}
		this.read = function(field, callback) {
			console.log("Atempting to read: field='" + field + "'");
			db.transaction(function (tx) {
				tx.executeSql("SELECT * FROM main_table WHERE id = '" + field + "'", [], function(tx, res) {
					console.log("Read results: " + JSON.stringify(res));
					if(callback != null) {
						callback(res);
					}
				});
			});
		}
		this.delete = function(field) {
			console.log("Deleting field: '" + field + "'");
			db.transaction(function	(tx) {
				tx.executeSql("DELETE FROM main_table WHERE id='" + field + "'", [], function(txt, res) {
					console.log("Delete results: " + JSON.stringify(res));
				});
			})
		}
		this.readPhoneData = function(callback) {
			db.transaction(function(tx) {
				tx.executeSql("SELECT * FROM main_table WHERE (id='number') OR (id='key')", [],  function(tx, res) {
					console.log("ReadPhoneData results: " + JSON.stringify(res));
					if(callback != null) {
						var k = FindData("key", res);
						var n = FindData("number", res);
						callback(n, k);
					} else {
						console.log("Callback is null");
					}
				});
			});
		}

		function FindData(id, res) {
			console.log("Inside FindData: id='" + id + "'");
			if(res != null) {
				console.log(JSON.stringify(res));
				if(res.rows != null) {
					console.log(JSON.stringify(res.rows));
					for(var i = 0; i < res.rows.length; ++i) {
						// console.log(JSON.stringify(res.rows.item(i)));
						var item = res.rows.item(i);
						// console.log(item);
						if(item.id == id) {
							return item.data;
						}
					}
				}
			}
		}
	}

	var storage;

	document.addEventListener("deviceready", function() {
		
		globalController = new GlobalController();

		var contentWidth = document.body.scrollWidth, 
		    windowWidth = window.innerWidth, 
		    newScale = windowWidth / contentWidth;
		    document.body.style.zoom = newScale;
		var ww = ($(window).width() < window.screen.width) ? $(window).width() : window.screen.width;
		console.log("Window width: " + ww);
		    
		// min width of site
		var mw = 640;
		//calculate ratio
		var ratio =  ww / mw;
		if (ww < mw) {
			console.log("First");
		    $('meta[type="viewport"]').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=no, width=' + ww);
		} else {
			console.log("Second");
		    $('meta[type="viewport"]').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=no, width=' + ww);
		}

		loadingManager.AlignPage(ratio);

		storage = new Storage();

		storage.readPhoneData(function (number, key) {
			if((key != null) && (number != null)) {
				FullLogin(number, key);
			} else {
				console.log("No key or number found, writing new ones");

				var newKey = Math.random().toString(36).substring(7);
				var number = "0523275495";
				storage.write("key", newKey);
				storage.write("number", number);
				network.register(number, newKey, function(res) {
					if(res.result > 0) {
						FullLogin(number, newKey);
					}
				});
			}
		});
	});

}

function FullLogin(number, key) {
	// console.log("Key: '" + key + "' Number: '" + number + "'");
	network.login(number, key, function (res) {
		if(res.result > 0) {
			console.log("Login sucessfull");
			network.retrieveAll(function (data) {
				storage.read("last_check", function (res) {
					var lastCheckTime = res.rows.item(0).data
					if(lastCheckTime != null) {
						var previous = parseInt(lastCheckTime);
						var now = new Date();
						var offset = now.getTime() - previous;
						var checkDate = new Date(previous);
						console.log("Last check was: " + checkDate.toLocaleDateString() + " " + checkDate.toLocaleTimeString());
						window.plugins.calllog.list(offset, function (data) {
							// console.log(JSON.stringify(allGroups));
							if(data != null) {
								if(data.rows != null) {
									var calls = []
									for(var i = 0; i < data.rows.length; ++i) {
										if(data.rows[i].type != 3) {
											calls.push(data.rows[i]);
											// console.log(JSON.stringify(data.rows[i]) + "\ncalltime: " + new Date(data.rows[i].date).toLocaleTimeString() + "\n");
											// console.log(JSON.stringify(allGroups));
										}
									}
									WriteCallDataToContacts(calls);
								}
							}
							storage.write("last_check", now.getTime());
							InitListPage();
					    }, function (error) {
					        console.log(JSON.stringify(error));
			    		});
					} else {
						storage.write("last_check", new Date().getTime());
					}
				});
				
			});
		} else {
			console.log(JSON.stringify(res));
		}
	});
}

function WriteCallDataToContacts(recentCalls) {

	// console.log("1");
	for(var recentCallsIndex = 0; recentCallsIndex < recentCalls.length; ++recentCallsIndex) {
		// console.log(JSON.stringify(recentCalls[recentCallsIndex]));
		// console.log("2");
		for(var groupsIndex = 0; groupsIndex < allGroups.length; ++groupsIndex) {
			// console.log("3");
			for(var contactsIndex = 0; contactsIndex < allGroups[groupsIndex].contacts.length; ++contactsIndex) {
				// console.log("4");
				for(var phoneNumberIndex = 0; phoneNumberIndex < allGroups[groupsIndex].contacts[contactsIndex].phoneNumbers.length; ++phoneNumberIndex) {
					// console.log("5");
					if(recentCalls[recentCallsIndex].number.localeCompare(allGroups[groupsIndex].contacts[contactsIndex].phoneNumbers[phoneNumberIndex]) == 0) {
						if(allGroups[groupsIndex].contacts[contactsIndex].communications == null) {
							allGroups[groupsIndex].contacts[contactsIndex].communications = {
								calls: {
									count: 0, 
									missed: false
								}, 
								sms: {
									count: 0,
									missed: false
								},
								whatsapp: {
									count:0,
									missed: false
								}
							};
						}
						++allGroups[groupsIndex].contacts[contactsIndex].communications.calls.count; 
					}
				}
			}
		}
	}

}