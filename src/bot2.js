const LineConnect = require('./connect');
let line = require('./main.js');
let LINE = new line();

const auth = {
	authToken: 'ElNvQLW7oZrF94HGF0jf.D/BTSBFAfWHX6zzv5v/vlW.rFhFekOXuY7VApRMbcywICdf8Wa2rBZq9dCZ3UIt9GQ=',
}
let client =  new LineConnect(auth);
//let client =  new LineConnect();

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});
