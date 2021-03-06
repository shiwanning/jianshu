import React, { PureComponent } from  'react';
import { HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, NavSearchWrapper, SearchInfo, SearchInfoTitle, SearchInfoSwitch, SearchInfoItem, SearchInfoList } from './style';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { Link } from 'react-router-dom';


class Header extends PureComponent{
   render(){
       const {
           focused,
           handleInputOnFocus,
           handleInputOnBlur,
           currentList,
           getListAreaHandleChanged,
           handleMouseEnter,
           handleMouseLeave,
           mouseIn,
           list,
           login,
           logOut
           } = this.props;
       return(
           <HeaderWrapper>
               <Link to="/">
                   <Logo/>
               </Link>
               <Nav>
                   <NavItem className="left active">首页</NavItem>
                   <NavItem className="left">下载App</NavItem>
                   {!login? <Link to="/login"><NavItem className="right">登录</NavItem></Link>
                       : <NavItem className="right" onClick = {logOut}>退出</NavItem>}
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
                               onFocus = { () =>  handleInputOnFocus(list) }
                               onBlur = { handleInputOnBlur }
                           >
                           </NavSearch>
                       </CSSTransition>
                       <i className={ focused ? 'iconfont focused zoom' : 'iconfont zoom' }>&#xe614;</i>
                       { this.getListArea(focused, mouseIn, currentList, getListAreaHandleChanged, handleMouseEnter, handleMouseLeave)}
                   </NavSearchWrapper>
               </Nav>
               <Addition>
                   <Link to="/write">
                       <Button className="writting">
                           <i className="iconfont">&#xe6a4;</i>写文章
                       </Button>
                   </Link>
                   {!login&&<Button className="reg">注册</Button>}
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
                        <SearchInfoSwitch onClick={() => {handleListChanged(this.spinIcon)}}>
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
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
       login: state.getIn(['login','login']),
       //focused: state.get('header').get('focused'),
   }
};
const mapDispatchToProps = (dispatch) => {
   return {
       handleInputOnFocus(list){
           console.log(list+"--------------");
           (list.size === 0)&&dispatch(actionCreators.getList());
            dispatch(actionCreators.handleInputOnFocus());
       },
       handleInputOnBlur(){
           dispatch(actionCreators.handleInputOnBlur());
       },
       getListAreaHandleChanged(spinIcon){
           let originAngle = spinIcon.style.transform.replace(/[^0-9]/ig, '');
           if(originAngle){
               originAngle = parseInt(originAngle,10);
           }else{
               originAngle = 0;
           }
           spinIcon.style.transform = 'rotate('+(originAngle+360)+'deg)';
           dispatch(actionCreators.getListAreaHandleChanged());
       },
       handleMouseEnter(){
           dispatch(actionCreators.handleMouseEnter());
       },
       handleMouseLeave(){
           dispatch(actionCreators.handleMouseLeave());
       },
       logOut(){
           dispatch(loginActionCreators.logOut());
       },
   }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);