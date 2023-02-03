-- local inspect = require "inspect"
local cu_values = {
    eth_uninstallFilter = 10,
    eth_accounts = 10,
    eth_blockNumber = 10,
    eth_chainId = 10,
    eth_protocolVersion = 10,
    eth_syncing = 10,
    net_listening = 10,
    net_version = 10,
    eth_subscribe = 10,
    eth_unsubscribe = 10,
    eth_feeHistory = 10,
    eth_maxPriorityFeePerGas = 10,
    eth_createAccessList = 10,
    bor_getAuthor = 10,
    bor_getCurrentProposer = 10,
    bor_getCurrentValidators = 10,
    bor_getRootHash = 10,
    bor_getSignersAtHash = 10,
    eth_getTransactionReceipt = 15,
    eth_getUncleByBlockHashAndIndex = 15,
    eth_getUncleByBlockNumberAndIndex = 15,
    eth_getTransactionByBlockHashAndIndex = 15,
    eth_getTransactionByBlockNumberAndIndex = 15,
    eth_getUncleCountByBlockHash = 15,
    eth_getUncleCountByBlockNumber = 15,
    web3_clientVersion = 15,
    web3_sha3 = 15,
    alchemy_getTokenMetadata = 16,
    eth_getBlockByNumber = 16,
    eth_getStorageAt = 17,
    eth_getTransactionByHash = 17,
    trace_get = 17,
    alchemy_getTokenAllowance = 19,
    eth_gasPrice = 19,
    eth_getBalance = 19,
    eth_getCode = 19,
    eth_getFilterChanges = 20,
    eth_newBlockFilter = 20,
    eth_newFilter = 20,
    eth_newPendingTransactionFilter = 20,
    eth_getBlockTransactionCountByHash = 20,
    eth_getBlockTransactionCountByNumber = 20,
    eth_getProof = 21,
    eth_getBlockByHash = 21,
    trace_block = 24,
    parity_getBlockReceipts = 24,
    erigon_forks = 24,
    erigon_getHeaderByHash = 24,
    erigon_getHeaderByNumber = 24,
    erigon_getLogsByHash = 24,
    erigon_issuance = 24,
    eth_getTransactionCount = 26,
    eth_call = 26,
    alchemy_getTokenBalances = 26,
    trace_transaction = 26,
    eth_getFilterLogs = 75,
    eth_getLogs = 75,
    trace_call = 75,
    trace_callMany = 75,
    trace_rawTransaction = 75,
    trace_filter = 75,
    eth_estimateGas = 87,
    alchemy_getAssetTransfers = 150,
    eth_sendRawTransaction = 250,
    debug_traceTransaction = 309,
    trace_replayTransaction = 2983,
    trace_replayBlockTransactions = 2983
}
local res = ngx.location.capture("/__internal_status_vhost/format/prometheus")
if res then
    local _content = res.body
    for line in _content:gmatch("([^\n]*)\n?") do
        ngx.say(line)
        local a = line:gmatch('(nginx_vts_filter_requests_)(total{.*,filter_name=")(.+)(",code="2xx"}) (.+)')
        for i1, i2, i3, i4, i5 in a do
            -- ngx.log(ngx.ERR, inspect({i1, i2, i3, i4, i5}))
            ngx.say(i1 .. "cu_" .. i2 .. i3 .. i4 .. " " .. cu_values[i3])
        end
    end
end
