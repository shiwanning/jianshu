import  React, { PureComponent } from 'react';
import { HomeWrapper, HomeLeft, HomeRight, BackToTop } from './style';
import { List, Recommand, Topic, Writer } from  './components';
import { actionCreators } from './store';
import { connect } from 'react-redux';

class Home extends PureComponent {

    //shouldComponentUpdate  / immutable+ PureComponent
    /*shouldComponentUpdate(nextProps, nextState){
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
        } else {
            return false
        }
    }*/


    componentDidMount(){
        const { InitHomePageDataHa } = this.props;
        InitHomePageDataHa();
        this.bindEventListener();
    }
    componentWillUnmount(){
       this.RemoveBindEventListener();
    }
    render(){
        const { scrollTop } = this.props;
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img
                        className="banner-img"
                        alt=""
                        src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"></img>
                    <Topic></Topic>
                    <List></List>
                </HomeLeft>
                <HomeRight>
                    <Recommand></Recommand>
                    <Writer></Writer>
                </HomeRight>
                {scrollTop&&<BackToTop onClick = {this.handleScrollTop}>返回顶部</BackToTop>}
            </HomeWrapper>
        )
    }
    handleScrollTop = () => {
        window.scrollTo(0, 0);
    };
    RemoveBindEventListener = () => {
        const { scrollToTop } = this.props;
        window.removeEventListener('scroll', scrollToTop);
    };
    bindEventListener = () => {
        const { scrollToTop } = this.props;
        window.addEventListener('scroll', scrollToTop);
    };
}
const mapStateToProps = (state) => ({
    scrollTop: state.getIn(['home','scrollTop']),
});
const mapDispatchToProps = (dispatch) => ({
    InitHomePageDataHa(){
        dispatch(actionCreators.InitHomePageData());
    },
    scrollToTop(e){
        const scrollValue = document.documentElement.scrollTop;
        if (scrollValue > 100){
            dispatch(actionCreators.scrollToTop(true));
        }else{
            dispatch(actionCreators.scrollToTop(false));
        }
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);