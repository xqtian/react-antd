import React from 'react';
import PropTypes from "prop-types";
import BookEditor from '../components/BookEditor';
import {get} from '../utils/request';

class BookEdit extends React.Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
      };
    constructor (props) {
        super(props);
        this.state = {
            book: null
        }
    }

    componentDidMount () {
        const bookId = this.context.router.route.match.params.id;
        get('http://localhost:3000/book/' + bookId)
            .then(res => {
                this.setState({
                    book: res
                });
            });
    }

    render () {
        const {book} = this.state;
        return (
            book ? <BookEditor editTarget={book} /> : <span>加载中...</span>
        )
    }
}

export default BookEdit;