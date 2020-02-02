const path   = require("path");
const router = require('express').Router();
const debug  = require('debug')('routes');

const brokerManager   = require('./Server/BrokerManager');
const stockManager    = require('./Server/StockManager');
const settingsManager = require('./Server/SettingsManager');

// Broker requests:
router.get('/data/brokers', (req, res) => {
	debug("Get /data/brokers");
	res.send(brokerManager.getData());
});
router.get('/data/brokerById/:id', (req, res) => {
  let id = req.params.id;
  debug("Get /data/brokerById/"+id);
  res.send(brokerManager.getDataById(id));
});
router.post('/data/broker', (req, res) => {
	debug("Post /data/broker, data:");
	debug(req.body);
	brokerManager.addData(req.body);
	res.send(brokerManager.getData());
});
router.put('/data/broker/:id', (req, res) => {
	let id = req.params.id;
	debug("Put /data/broker/"+id+", data:");
	debug(req.body);
	brokerManager.changeDataById(id, req.body);
	res.send(brokerManager.getData());
});
router.put('/data/broker/delete/:id', (req, res) => {
	let id = req.params.id;
	debug("Put /data/broker/delete/"+id);
	brokerManager.removeDataById(id);
	res.send(brokerManager.getData());
})

// Stock requests:
router.get('/data/stocks', (req, res) => {
	debug("Get /data/stocks");
	res.send(stockManager.getData());
});
router.get('/data/stockById/:id', (req, res) => {
  let id = req.params.id;
  debug("Get /data/stockById/"+id);
  res.send(stockManager.getDataById(id));
});
router.post('/data/stock', (req, res) => {
	debug("Post /data/stock, data:");
	debug(req.body);
	stockManager.addData(req.body);
	res.send(stockManager.getData());
});
router.put('/data/stock/:id', (req, res) => {
	let id = req.params.id;
	debug("Put /data/stock/"+id+", data:");
	debug(req.body);
	stockManager.changeDataById(id, req.body);
	res.send(stockManager.getData());
});
router.put('/data/stock/delete/:id', (req, res) => {
	let id = req.params.id;
	debug("Put /data/stock/delete/"+id);
	stockManager.removeDataById(id);
	res.send(stockManager.getData());
})

// Settings requests:
router.get('/data/settings', (req, res) => {
	debug("Get /data/settings");
	res.send(settingsManager.getData());
});
router.put('/data/settings', (req, res) => {
	debug("Put /data/settings, data:");
	debug(req.body);
	settingsManager.changeData(req.body);
	res.end();
});

module.exports = router;
