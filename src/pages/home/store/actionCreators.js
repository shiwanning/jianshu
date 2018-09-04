import { constants } from './index';
import axios from  'axios';
import { fromJS }  from 'immutable' ;

const InitDataFromHome = (initData) => {
    const { topicList, articleList, recommendList } = initData;
    return {
        type: constants.INIT_HOME_PAGE_DATA,
        topicList: fromJS(topicList),
        articleList: fromJS(articleList),
        recommendList: fromJS(recommendList),
    };
};
const loadMoreListFromHome = (moreList,page) => {
    return {
        type: constants.LOAD_MORE_LIST,
        moreList: fromJS(moreList),
        page,
    } ;
};


export const InitHomePageData = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const { data : { data: InitData }} = res;
            dispatch(InitDataFromHome(InitData));
        });
    }
};


export const loadMoreList = (page) => {
    return (dispatch) => {
        axios.get('/api/homeList.json?page='+page).then((res) => {
           const { data : { data : arrayObject }} = res;
           dispatch(loadMoreListFromHome(arrayObject,page+1));
        });
    }
};

export const scrollToTop = (scrollTop) => {
    return {
        type: constants.SCROLL_TO_TOP,
        scrollTop,
    }
};