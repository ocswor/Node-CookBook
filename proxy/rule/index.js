'use strict';

const {
    getReadAndLikeNum,
} = require('./wechatRule');


const sendResFns = [
    getReadAndLikeNum
];

const rule = {
    // 模块介绍
    summary: 'The rule for wechat spider, written by liqiang.',

    // 发送请求前拦截处理
    * beforeSendRequest(requestDetail) {
        const {requestOptions} = requestDetail;
        const {headers} = requestOptions;
        const {Accept} = headers;
    },

    // 发送响应前处理
    * beforeSendResponse(requestDetail, responseDetail) {
        const fnLens = sendResFns.length;
        if (fnLens === 0) return;
        let i = 0;
        const ctx = {req: requestDetail, res: responseDetail};
        const handleFn = () => {
            const fn = sendResFns[i];
            return fn(ctx).then(res => {
                if (res) return res;
                i += 1;
                if (i >= fnLens) return;
                return handleFn();
            });
        };
        return handleFn().catch(e => {
            throw e;
        });
    }

    // 是否处理https请求 已全局开启解析https请求 此处注释掉即可
    // *beforeDealHttpsRequest(requestDetail) { /* ... */ },

    // 请求出错的事件
    // *onError(requestDetail, error) { /* ... */ },

    // https连接服务器出错
    // *onConnectError(requestDetail, error) { /* ... */ }
};

module.exports = rule;
