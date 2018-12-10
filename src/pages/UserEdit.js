import React from 'react';
import PropTypes from "prop-types";
import UserEditor from '../components/UserEditor';
import { get } from '../utils/request';

class UserEdit extends React.Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
      };
    constructor (props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount () {
        const userId = this.context.router.route.match.params.id;
        get('http://localhost:3000/user/' + userId)
            .then(res => {
                this.setState({
                    user: res
                })
            })
    }

    render () {
        const {user} = this.state;
        return (
            user ? <UserEditor editTarget={user} /> : '加载中'
            
        )
    }
}

  
export default UserEdit;