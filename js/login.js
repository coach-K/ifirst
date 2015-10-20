/*
	THIS IS A LOGIN CLASS, IT SHOULD BE INHERITED.
	NB: NO CODE SHOULD BE ADDED TO THIS CLASS OR FILE.
*/

var Login = function()

Ifirst.prototype.thirdPartyLogin = function(provider) {
    var deferred = $.Deferred();

    this.getRef().authWithOAuthPopup(provider, function (err, user) {
        if (err) {
            deferred.reject(err);
        }

        if (user) {
            deferred.resolve(user);
        }
    });

    return deferred.promise();
};

Ifirst.prototype.authWithPassword = function(userObj) {
    var deferred = $.Deferred();
    
    this.getRef().authWithPassword(userObj, function onAuth(err, user) {
        if (err) {
            deferred.reject(err);
        }

        if (user) {
            deferred.resolve(user);
        }

    });

    return deferred.promise();
}

Ifirst.prototype.createUser = function(userObj) {
    var deferred = $.Deferred();
    this.getRef().createUser(userObj, function (err) {

        if (!err) {
            deferred.resolve();
        } else {
            deferred.reject(err);
        }

    });

    return deferred.promise();
}

Ifirst.prototype.createUserAndLogin = function(userObj) {
        return createUser(userObj)
            .then(function () {
            return authWithPassword(userObj);
        });
    }