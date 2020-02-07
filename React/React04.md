```jsx
//App.js
import React from 'react';
import Todo from './Todo';

class App extends React.Component {
  render() {
    return <><Todo /></>
  }
}

export default App;

```

```jsx
//Todo.js
import React from 'react';
import Title from './Title';

class Todo extends React.Component {
    state = { count: 0, count1: 0 };
    onClick = () => {
        this.setState({ count: this.state.count + 1});
    };
    onClick2 = () => {
        this.setState({ count1: this.state.count1 + 1});
    };    
    render() {
        return (
            <div>
                <Title title={`현재 카운트: ${this.state.count}`}></Title>
                <p>{this.state.count1}</p>
                <button onClick={this.onClick}>증가</button>
                <button onClick={this.onClick2}>증가2</button>
            </div>
        );
    }
}
export default Todo;

```

```jsx
//Title.js
import React from 'react';

function Title(props) {
    console.log(props);
    return <p>{props.title}</p>
}
// 함수형 컴포넌트인 경우, React.memo를 이용해서 자식 컴포넌트의 불필요한 렌더링을 줄일 수 있음
// props 값이 변경되는 경우에만 호출되는 것을 확인할 수 있음
// export default Title;
export default React.memo(Title);
```

