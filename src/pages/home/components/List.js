import  React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreators } from  '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
    render(){
        const { articleList, articlePage, loadMoreList } = this.props;
        return(
            <div>
                {
                    articleList.map((item, index) => (
                        <Link key={ index } to={'/detail?id='+item.get('id')}>
                            <ListItem >
                                <img
                                    src={ item.get('imgUrl') }
                                    alt=""
                                    className="list-pic"></img>
                                <ListInfo>
                                    <h3 className="title">{ item.get('title') }</h3>
                                    <p className="desc">{ item.get('desc') }</p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                    ))
                }
                <LoadMore onClick={ () => loadMoreList(articlePage)}>更多文字</LoadMore>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    articleList: state.getIn(['home','articleList']),
    articlePage: state.getIn(['home','articlePage']),
});

const mapDispatchToProps = (dispatch) => ({
    loadMoreList(page){
        dispatch(actionCreators.loadMoreList(page));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);