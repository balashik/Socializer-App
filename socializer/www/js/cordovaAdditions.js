
if(window._cordovaNative) {

	var contentWidth = document.body.scrollWidth, 
	    windowWidth = window.innerWidth, 
	    newScale = windowWidth / contentWidth;
	    document.body.style.zoom = newScale;
	var ww = ($(window).width() < window.screen.width) ?
	    $(window).width() : window.screen.width;
	    
	// min width of site
	var mw = 1020;
	//calculate ratio
	var ratio =  ww / mw;
	if (ww < mw) {
	    $('meta[type="viewport"]').attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
	} else {
	    $('meta[type="viewport"]').attr('content', 'initial-scale=1.0, maximum-scale=2, minimum-scale=1.0, user-scalable=yes, width=' + ww);
	}

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
			console.log("Tryin to write: field='" + field + "' data='" + data + "'");
			db.transaction(function (tx) {
				tx.executeSql("INSERT INTO main_table (id, data) VALUES (?,?)", [field, data], function(tx, res) {
					console.log("Write results: " + JSON.stringify(res));
				});
			});
		}
		this.read = function(field, callback) {
			console.log("Tryin to red: field='" + field + "'");
			db.transaction(function (tx) {
				tx.executeSql("SELECT data FROM main_table WHERE id = " + field, [], function(tx, res) {
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
						console.log(JSON.stringify(res.rows.item(i)));
						var item = res.rows.item(i);
						console.log(item);
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
	console.log("Key: '" + key + "' Number: '" + number + "'");
	network.login(number, key, function (res) {
		if(res.result > 0) {
			console.log("Login sucessfull");
			network.retrieveAll(function (data) {
				storage.read("last_check", function (check) {
					if(check != null) {

					}
				});
				window.plugins.calllog.list(25000000, function (data) {
					for(var i = 0; i < data.rows.length; ++i) {
						console.log(JSON.stringify(data.rows[i]) + "\ncalltime: " + new Date(data.rows[i].date).toLocaleTimeString() + "\n");
					}
			    }, function (error) {
			        console.log(JSON.stringify(error));
			    });
			});
		} else {
			console.log(JSON.stringify(res));
		}
	});
}