import  React, { PureComponent } from 'react';
import { DetailWrapper, Header, Content } from  './style';
import { actionCreators } from './store/index';
import { connect } from  'react-redux';
class Detail extends PureComponent {

   componentDidMount(){
      const { initDetailData } = this.props;
       initDetailData();
       console.log(this.props);
   }

    render(){
        const { title, content } = this.props;
        const html = {__html:content};
        console.log( title );
        return(
            <DetailWrapper>
                <Header >{ title }</Header>
                <Content dangerouslySetInnerHTML = {html}/>
            </DetailWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    content: state.getIn(['detail', 'content']),
    title: state.getIn(['detail', 'title'])
});

const mapDispatchToProps = (dispatch) => ({
    initDetailData(){
        dispatch(actionCreators.initDetailData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);