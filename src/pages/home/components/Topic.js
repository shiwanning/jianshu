import  React, { PureComponent } from 'react';
import { TopicWrapper, TopicItem } from '../style';
import { connect } from 'react-redux';
class Topic extends PureComponent {
    render(){
        const { topicList } = this.props;
        return(
            <TopicWrapper>
                {topicList.map((item) =>
                    <TopicItem key={ item.get('id') }>
                        <img
                            className="topic-pic"
                            alt=""
                            src={ item.get('imgUrl') }/>
                        { item.get('title') }
                    </TopicItem>
                )}
            </TopicWrapper>
        )
    }
}


const mapStateToProps = (state) => ({
    topicList: state.getIn(['home','topicList']),
});


export default connect(mapStateToProps,null)(Topic);