
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

		var castGroup = group;
        for(var i = 0; i < group.contacts.length; ++i) {
        	console.log("Pushing");
            castGroup.contacts[i] = {displayName: group.contacts[i].displayName, id: group.contacts[i].id, phoneNumbers: group.contacts[i].phoneNumbers};
            if(castGroup.contacts[i].communications == null) {
            	castGroup.contacts[i].communications = {
            		calls: {
            			count:0, 
            			missed: false
            		}, 
            		whatsapp: {
            			count: 0, 
            			missed: false
            		}, 
            		sms: {
            			count: 0, 
            			missed: false
            		}
            	};
            } else {
            	if(castGroup.contacts[i].communications.calls == null) {
            		castGroup.contacts[i].communications.calls = {count: 0, missed: false};
            	}
            	if(castGroup.contacts[i].communications.whatsapp == null) {
            		castGroup.contacts[i].communications.whatsapp = {count: 0, missed: false};
            	}
            	if(castGroup.contacts[i].communications.sms == null) {
            		castGroup.contacts[i].communications.sms = {count: 0, missed: false};
            	}
            }
            
        }
        var sendBlock = {group:castGroup};

		$.ajax({
            method: "POST",
            url: "http://socializerapp.herokuapp.com/createGroup",
            data: sendBlock,
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(data) {
            	console.log(JSON.stringify(data));
                if(data.result > 0) {
                	network.retrieveAll(function(retrievedData) {
                		console.log(JSON.stringify(retrievedData));
                		if(retrievedData.result > 0) {
                			if(callback != null) {
                				callback(data);
                			}
                		}
                	});
                } else if(data.result == -30) {
                	if(callback != null) {
                		callback(data);
                	}
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
            url: "http://socializerapp.herokuapp.com/deleteGroup",
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