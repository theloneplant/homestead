module.exports = function(){
	var $u = {};
	var config			= require('./util/config');
	$u.api				= require('./util/api');
	$u.cardmanager		= require('./util/cardmanager');
	return $u;
}();
