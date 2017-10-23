module.exports = (() => {
	function request(type, url, obj, cb) {
		if(typeof obj === 'function') {
			cb = obj;
			obj = {};
		}
		else if(typeof obj === 'undefined') {
			obj = {};
			cb = ()=>{};
		}
		$.ajax ({
			url,type,data:obj,success:(data) => {
			if (!data.res && !data.err) return cb(data);
			if (data.err) return cb(data.err);
			cb(null, data.res);
		}});
	}
	return {
		listServers(cb) {request('get', '/api/v1/servers', cb);},
		createServer(serverInfo, cb) {request('post', '/api/v1/servers/create', serverInfo, cb);}
	};
})();
