import React, { Component } from  'react';
import { HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, NavSearchWrapper, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoItem, SearchInfoList } from './style';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';


class Header extends Component{
   render(){
       const {
           focused,
           handleInputOnFocus,
           handleInputOnBlur,
           currentList,
           getListAreaHandleChanged,
           handleMouseEnter,
           handleMouseLeave,
           mouseIn
           } = this.props;
       return(
           <HeaderWrapper>
               <Logo href="/"/>
               <Nav>
                   <NavItem className="left active">首页</NavItem>
                   <NavItem className="left">下载App</NavItem>
                   <NavItem className="right">登录</NavItem>
                   <NavItem className="right">
                       <i className="iconfont">&#xe636;</i>
                   </NavItem>
                   <NavSearchWrapper>
                       <CSSTransition
                           classNames = "slide"
                           timeout = {500}
                           in = { focused }
                       >
                           <NavSearch
                               className = { focused ? 'focused' : '' }
                               onFocus = { handleInputOnFocus }
                               onBlur = { handleInputOnBlur }
                           >
                           </NavSearch>
                       </CSSTransition>
                       <i className={ focused ? 'iconfont focused zoom' : 'iconfont zoom' }>&#xe614;</i>
                       { this.getListArea(focused, mouseIn, currentList, getListAreaHandleChanged, handleMouseEnter, handleMouseLeave)}
                   </NavSearchWrapper>
               </Nav>
               <Addition>
                   <Button className="writting">
                       <i className="iconfont">&#xe6a4;</i>写文章
                   </Button>
                   <Button className="reg">注册</Button>
               </Addition>
           </HeaderWrapper>
       )
   }


    getListArea = (show,mouseIn,list,handleListChanged,handleMouseEnter,handleMouseLeave) => {
        if (show || mouseIn) {
            return(
                <SearchInfo
                    onMouseEnter = { handleMouseEnter }
                    onMouseLeave = { handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={handleListChanged}>
                            <i className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        { list.map((item,index) =>
                            <SearchInfoItem key={ item }>{ item }</SearchInfoItem>
                        )}
                    </SearchInfoList>
                </SearchInfo>
            );
        }else{
            return null;
        }
    };
}




// immutable不可变对象对比返回一个新对象
// (state:react-immutable/combineReducer,reducer:immutable/fromJS)
const mapStateToProps = (state) => {
   return {
       focused: state.getIn(['header','focused']),
       list: state.getIn(['header','list']),
       currentList: state.getIn(['header','currentList']),
       mouseIn: state.getIn(['header','mouseIn']),
       //focused: state.get('header').get('focused'),
   }
};
const mapDispatchToProps = (dispatch) => {
   return {
       handleInputOnFocus(){
            dispatch(actionCreators.getList());
            dispatch(actionCreators.handleInputOnFocus());
       },
       handleInputOnBlur(){
           dispatch(actionCreators.handleInputOnBlur());
       },
       getListAreaHandleChanged(){
           dispatch(actionCreators.getListAreaHandleChanged());
       },
       handleMouseEnter(){
           dispatch(actionCreators.handleMouseEnter());
       },
       handleMouseLeave(){
           dispatch(actionCreators.handleMouseLeave());
       },

   }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);