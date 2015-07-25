
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

	var storage = {
		key: null,
		write: function(field, data) {
			db.transaction(function(tx) {
				tx.executeSql("INSERT INTO main_table (id, data) VALUES (?,?)", {field, data}, function(tx, res) {
					console.log("insertId: " + res.insertId);
      				console.log("rowsAffected: " + res.rowsAffected);
				});
			});
		}
		read: function(field, callback) {
			db.transaction(function(tx) {
				tx.executeSql("SELECT data FROM main_table WHERE id = " + field, function(tx, res) {
					callback(res);
				});
			});
		}
	}
	var db = window.sqlitePlugin.openDatabase({name: "socializer.db", androidDatabaseImplementation: 2, androidLockWorkaround: 1});
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS main_table (id text primary key, data text)');
		db.executeSql("pragma table_info (test_table);", [], function(res) {
	      console.log("PRAGMA res: " + JSON.stringify(res));
	    });

	}

}