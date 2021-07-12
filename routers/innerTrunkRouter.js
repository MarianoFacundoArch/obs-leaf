const express = require('express')
const protectedEndpointAuth = require('../middleware/protectedEndpointAuth')
const router = express.Router()

router.get('/innerTrunk', protectedEndpointAuth, async (req, res) => {})
