
function Network() {

	var connected = false;

	this.login = function(number, key, callback) {
		console.log("Trying login with values: Number:'" + number + "' Key:'" + key +"'");
		$.ajax({
	        method: "POST",
	        url: "http://socializerapp.herokuapp.com/login",
	        contentType: "application/x-www-form-urlencoded",
	        data: {pn: number, key: key},
	        dataType: "json",
	        success: function(data) {
	        	if(data.result > 0) {
	        		connected = true;
	        	}
	        	if(callback != null) {
	        		callback(data);
	        	}
	        }
	    });
	}

	this.register = function(number, key, callback) {
		$.ajax({
	        method: "POST",
	        url: "http://socializerapp.herokuapp.com/register",
	        contentType: "application/x-www-form-urlencoded",
	        data: {pn: number, key: key},
	        dataType: "json",
	        success: function(data) {
	        	if(callback != null) {
	        		callback(data);
	        	}
	        }
	    });
	}

	this.retrieveAll = function(callback) {
		if(!connected) {
			console.log("Not connected");
			return;
		}

		$.ajax({
	        method: "POST",
	        url: "http://socializerapp.herokuapp.com/retrieveAll",
	        contentType: "application/x-www-form-urlencoded",
	       	dataType: "json",
	        success: function(data) {
	        	if(data.result > 0) {
	        		allGroups = data.data;
	        	}
	        	if(callback != null) {
	        		callback(data);
	        	}
	        }
	    });
	}

	this.createGroup = function(group, callback) {
		if(!connected) {
			console.log("Not connected");
			return;
		}

		$.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/createGroup",
            data: group,
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(data) {
                if(data.result > 0) {
                	retrieveAll(function(retrievedData) {
                		if(retrievedData.result > 0) {
                			if(callback != null) {
                				callback(data);
                			}
                		}
                	});
                }
            }
        });
	}

	this.deleteGroup = function(groupName, callback) {
		if(!connected) {
			console.log("Not connected");
			return;
		}
		
		$.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/createGroup",
            data: {groupName: groupName},
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(data) {
                if(data.result > 0) {
                	retrieveAll(function(retrievedData) {
                		if(retrievedData.result > 0) {
                			if(callback != null) {
                				callback(data);
                			}
                		}
                	});
                }
            }
        });
	}

}

var network = new Network();