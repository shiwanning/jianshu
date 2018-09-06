import  React, { PureComponent } from 'react';
import { DetailWrapper, Header, Content } from  './style';
import { actionCreators } from './store/index';
import { connect } from  'react-redux';
class Detail extends PureComponent {

   componentDidMount(){
      const { initDetailData, match : { params : { id : requestId} } } = this.props;
       initDetailData(requestId);
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
    initDetailData(id){
        dispatch(actionCreators.initDetailData(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);