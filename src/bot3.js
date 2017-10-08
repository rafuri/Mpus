const LineConnect = require('./connect');
let line = require('./main3.js');
let LINE = new line();

const auth = {
	authToken: 'ElWqyR0CAsKLOCtGjSOb.1H3tzpGjt1HOUUnfmYe+UW.KaAm+pOOb+KzpGaUXil10M+omU5dYOs51oitWPF10Ak=',
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
