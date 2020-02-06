### Promise

```html
<script>

    // 예외 처리를 catch 구문을 이용해야하는 이유
    // 1. 가독성이 좋다.
    Promise.reject("error1").then(null, reject => console.log(reject)); // 앞의 널은 resolve시 뒤에는 reject시
    Promise.reject("error2").catch(data => console.log(data));

    // 2. resolve 함수 내에서 발생하는 예외를 처리
    Promise.resolve()
        .then(
            () => {
                console.log("#1");
                // throw new Error("Error Occured");
            }
        )
        .catch(data => console.log("#4",data));
</script>
```



**MyName.js**

```jsx
import React,{Component}from 'react';
class MyName extends Component {
    render() {
        return(
            <div>
                안녕하세요.
                나는 <b>{ this.props.whoami}</b> 입니다.
            </div>
        )
    }
}
export default MyName;
```

Component 를 이용하여  MyName whoami 불러오기 (모두 불러온다.)

**App.js**

```jsx
import React,{ Fragment }from 'react';
import MyName from './MyName';

class App extends React.Component {
  render() {
    return (
    <>
    <MyName whoami = "홍길동"/>
    <MyName whoami = "리액트"/>
    <MyName whoami = "홍동홍"/>
    <MyName whoami = "길동길"/>
    </>
    );
  }
}

export default App;
```

**indx.js**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MyName from './MyName';

ReactDOM.render(<MyName />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```



1. jQuery 를 이용하여 빈칸넣기
2. Todo list 만들기 - 리액트



**문제 예)**

```jsx
import React from 'react';
class MyComponent extends React.Component {
    state = {
        desc: '',
        currentId: 1,
        todoList: [],
    };
    onAdd = () =>{
   
        
    };
    onDelete = e => {
        
        
        
    };
    onSaveToServer = () => {
        // todoList 전송
    };
    onChangeDesc = e => {					// onChangeDesc를 1번으로 만든다

        
    };
    render() {
        const { desc, todoList } = this.state;
        return (
            <div>
                <h3>할 일 목록</h3>
                <ul>
                   	{
                     
                        
                        
                  	}
                </ul>
                <input type="text" value={desc} onChange={this.onChangeDesc}/>
                <button onClick={this.onAdd}>추가</button>
                <button onClick={this.onSaveToServer}>서버에 저장</button>
            </div>
        );
    }
}
export default MyComponent;
```





```jsx
import React from 'react';
class MyComponent extends React.Component {
    state = {
        desc: '',
        currentId: 1,
        todoList: [],
    };


    onAdd = () =>{							//2번으로 만든다
        const { desc, currentId, todoList } = this.state;
        const todo = { id: currentId, desc };  // 단축속성명 (desc: desc)를 줄인것
        this.setState({
            currentId: currentId + 1,
            todoList: [...todoList, todo],
        });
    };


    onDelete = e => {									//4번으로 만든다
        const { todoList } = this.state;
        const id = Number(e.target.dataset.id);
        const newTodoList = todoList.filter(todo => todo.id !== id);
        this.setState({ todoList: newTodoList }); // 리스트를 새롭게 만들어서 다시 todoList에 넣는다.
    };


    onSaveToServer = () => {
        // todoList 전송
        console.log(this.state.todoList);
    };


    onChangeDesc = e => {				// onChangeDesc를 1번으로 만든다
        const desc = e.target.value;
        this.setState({ desc });
    };


    render() {
        const { desc, todoList } = this.state;
        return (
            <div>
                <h3>할 일 목록</h3>
                <ul>								{//3번으로 만든다}
                    {todoList.map(todo => (			// 객체를 반환하는 경우 소괄호로 감쌈
                        <li key={todo.id}>			
                            <span>{todo.desc}</span>
                            <button data-id={todo.id} onClick={this.onDelete}>
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
                <input type="text" value={desc} onChange={this.onChangeDesc}/>
                <button onClick={this.onAdd}>추가</button>
                <button onClick={this.onSaveToServer}>서버에 저장</button>
            </div>
        );
    }
}
export default MyComponent;
```

