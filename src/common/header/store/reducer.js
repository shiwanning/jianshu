import { constants }  from './index';
import { fromJS } from 'immutable';
const defaultState = fromJS({
    focused: false,
    list: [],
    page: 1,
    totalPage: 1,
    currentList: [],
    row: 10,
    mouseIn: false,
});

export default function (state = defaultState ,action){
    const { type } = action;
    const newState = JSON.parse(JSON.stringify(state));
    switch (type){
        case constants.SEARCH_FOCUS:
            return  state.set('focused',true);

        case constants.SEARCH_BLUR:
            return  state.set('focused',false);

        case constants.GET_HEADER_LIST:
            const { data, totalPage } = action;
            const { row : size } = newState;

            return  state.set('list',data)
                .set('totalPage',totalPage)
                .set('page',1)
                .set('currentList',fromJS(data.slice(0,size)));

        case constants.HANDLE_MOUSE_ENTER:
            return state.set('mouseIn',true);

        case constants.HADNLE_MOUSE_LEAVE:
            return state.set('mouseIn',false);

        case constants.CHANGE_HEADER_LIST:
            const { page:currentPage, totalPage:stateTotalPage, list, row } = newState;
            let newPage = currentPage;
            let newCurrentList = [];
            if (currentPage >= stateTotalPage) {
                newPage = 1;
                newCurrentList = list.slice(0,row);
            }else{
                newPage++;
                if(newPage === stateTotalPage){
                  newCurrentList = list.slice(row*(newPage-1));
                }else{
                  newCurrentList = list.slice(row*(newPage-1), row*(newPage-1)+10);
                }
            }
            return state.set('currentList', fromJS(newCurrentList)).set('page', newPage);

        default:
            return state;
    }
}