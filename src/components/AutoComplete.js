import React from 'react';
import PropTypes from "prop-types";
import {Input} from 'antd';
require('../styles/auto-complete.css');

function getItemValue (item) {
    return item.value || item;
}

class AutoComplete extends React.Component {
    // static contextTypes = {
    //     value: PropTypes.string.isRequired,
    //     options: PropTypes.array.isRequired,
    //     onValueChange: PropTypes.func.isRequired
    //   };
    constructor (props) {
        super(props);

        this.state = {
            show: false,
            displayValue: '',
            activeItemIndex: -1
        }
    }

    handleChange = (value) => {
        // debugger
        console.log(111)
        this.setState({
            activeItemIndex: -1,
            displayValue: ''
        })
        this.props.onChange(value);
    }

    handlekeyDown = (e) => {
        const {activeItemIndex} = this.state;
        const {options} = this.state;

        switch (e.keyCode) {
            case 13: {
                if(activeItemIndex >= 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleChange(getItemValue(options[activeItemIndex]));
                }
                break;
            }
            case 38:
            case 40: {
                e.preventDefault();
                this.moveItem(e.keyCode === 38 ? 'up' : 'down');
                break;
            }
        }
    }

    moveItem = (direction) => {
        const {activeItemIndex} = this.state;
        const {options} = this.props;
        const lastIndex = options.length - 1;
        let newIndex = -1;

        if(direction === 'up') {
            if(activeItemIndex === -1) {
                newIndex = lastIndex;
            }else {
                newIndex = activeItemIndex - 1;
            }
        }else {
            if(activeItemIndex < lastIndex) {
                newIndex = activeItemIndex + 1;
            }
        }

        let newDisplayValue = '';
        if(newIndex >= 0) {
            newDisplayValue = getItemValue(options[newIndex]);
        }

        this.setState({
            displayValue: newDisplayValue,
            activeItemIndex: newIndex
        });
    }

    handleEnter = (index) => {
        console.log()
        const currentItem = this.props.options[index];
        this.setState({
            activeItemIndex: index,
            displayValue: getItemValue(currentItem)
        });
    }
    aaa = () => {
        console.log(222)
    }
    handleLeave = () => {
        this.setState({
            activeItemIndex: -1,
            displayValue: ''
        });
    }


    render () {
        const {displayValue, activeItemIndex, show} = this.state;
        const {value, options} = this.props;
       
        return (
            <div className={'wrapper'}>
                <Input 
                    value = {value || ''} 
                    onChange={e => this.handleChange(e.target.value)}
                    onKeyDown={this.handlekeyDown}
                    onFocus={() => this.setState({show: true})}
                    onBlur={() => this.setState({show: false})}/>
                {
                   show && options.length > 0 && (
                        <ul className={'options'} onMouseLeave={this.handleLeave}>
                            {
                                options.map((item, index) => {
                                    return (
                                        <li 
                                            key={index}
                                            className={index === activeItemIndex ? 'active' : ''}
                                            onMouseEnter={() => this.handleEnter(index)}
                                            onMouseDown={() => this.handleChange(getItemValue(item))}>
                                            {item.text || item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )}
            </div>
        );
    }
}

export default AutoComplete;