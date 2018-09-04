import  React, { PureComponent } from 'react';
import { RecommandWrapper, RecommandItem} from '../style';
import { connect } from 'react-redux';
class Recommand extends PureComponent {

    render(){
        const { recommendList } = this.props;
        return(
            <RecommandWrapper>
                {recommendList.map((item) => (
                    <RecommandItem
                        imgUrl={item.get('imgUrl')}
                        key = {item.get('id')}
                    >
                    </RecommandItem>
                ))}
            </RecommandWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    recommendList: state.getIn(['home','recommendList']),
});
export default connect(mapStateToProps, null)(Recommand);