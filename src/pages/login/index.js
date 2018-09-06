import  React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button } from './style';
import { actionCreators } from './store/index';
import { Redirect } from 'react-router-dom';
class Login extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            userName: '',
            passWord: '',
        };
    }


    render(){
        const { loginToServer, login } = this.props;
        const { userName, passWord } = this.state;
        return !login?
            (
             <LoginWrapper>
                <LoginBox>
                    <Input
                        name="userName"
                        placeholder="userName"
                        value={userName}
                        onChange={(evt) => this.handleChangedInput(evt)}
                    />
                    <Input
                        name="passWord"
                        placeholder="passWord"
                        value={passWord}
                        type="password"
                        onChange={(evt) => this.handleChangedInput(evt)}
                    />
                    <Button onClick={ () => loginToServer({ userName, passWord }) }>Login</Button>
                </LoginBox>
            </LoginWrapper>
            )
            :
            (<Redirect to="/" />)
    }
    handleChangedInput = (evt) =>{
       const { target : { value, name } } = evt;
        this.setState(
            (preState) => ({
                [name]: value,
            })
        );
    };
}


const mapStateToProps = (state) => ({
     login: state.getIn(['login','login']),
});

const mapDispatchToProps = (dispatch) => ({
    loginToServer(obj){
        dispatch(actionCreators.loginUser(obj));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);