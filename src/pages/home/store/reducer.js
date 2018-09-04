import { fromJS } from 'immutable';
import { constants } from  './index';
const defaultState = fromJS({
    topicList: [
    ],
    articleList: [
    ],
    recommendList: [
    ],
    articlePage: 1,
    scrollTop: false,
});


const initHomePageData = (state, action) => {
    const { topicList, articleList, recommendList } = action;
    return state.merge({
        topicList,
        articleList,
        recommendList,
    });
};
const loadMoreList = (state, action) => {
    const { moreList,page:articlePage } = action;
    return state.merge({
        articlePage,
        articleList: state.get('articleList').concat(moreList),
    });
};
const scrollToTop = (state, action) => {
    const { scrollTop } = action;
    return state.merge({
        scrollTop,
    });
};

export default function (state = defaultState ,action){
    const { type } = action;
    //const newState = JSON.parse(JSON.stringify(state));
    switch (type){
        case constants.INIT_HOME_PAGE_DATA:
            return initHomePageData(state, action);
        case constants.LOAD_MORE_LIST:
            return loadMoreList(state, action);
        case constants.SCROLL_TO_TOP:
            return scrollToTop(state, action);
        default:
            return state;
    }
}