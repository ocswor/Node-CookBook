const getReadAndLikeNum = async function (ctx) {
    const {req, res} = ctx;
    const link = req.url;
    if (!/mp\/getappmsgext/.test(link)) return;


    const body = res.response.body.toString();
    const data = JSON.parse(body);
    console.log(data)

};

const getPostList = async function (ctx) {
    const {req, res} = ctx;
    const link = req.url;
    if (!/\/mp\/profile_ext\?action=getmsg&__biz=/.test(link)) return;

    const body = res.response.body.toString();

    try {
        const data = JSON.parse(body);
        const postList = JSON.parse(data.general_msg_list).list;
        await savePostsData(postList);
    } catch (e) {
        throw e;
    }
};

module.exports = {
    getReadAndLikeNum,
    getPostList
};