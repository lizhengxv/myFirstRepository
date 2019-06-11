import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { observable, action } from 'mobx';
import {observer} from 'mobx-react'

import cssobj from './index.scss';




class Store{
   @observable cache = {
        num : 0
    }
    @action.bound add(){
        this.cache.num++;
    }
    @action.bound handleDecrease(){
        this.cache.num--;
    }
    @action.bound asycAdd(){
        setTimeout(() => {
            this.cache.num+=5;
        }, 500);
    }
}

const store = new Store();

console.log(store);

@observer
class Bar extends Component{
    render(){

        let num = this.props.num

        return(
            <div>
                { num }
            </div>
        )
    }
}



// 就算没有用到可观察数据，也可以用 @observer修饰一下，也没啥副作用
@observer
class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        let {numobj,handleAdd,handleDecrease,asycAdd }= this.props // {num:0}
        return(
            <div className={ cssobj.main } >
                <Bar num={numobj.num}  />
                <button onClick={handleAdd} > 点击+1 </button> <br/>
                <button onClick={handleDecrease} > 点击-1 </button><br/>
                <button onClick={asycAdd} > 异步+5 </button>
            </div>
        )
    }
}



ReactDOM.render( <App 
    numobj={store.cache} 
    handleAdd={store.add} 
    asycAdd={store.asycAdd}
    handleDecrease={store.handleDecrease} /> , 
    
    document.getElementById('app') )