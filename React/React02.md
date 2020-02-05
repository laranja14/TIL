``` js
export function Todo ({title}) {
    return <div>{title}</div>;
};
//Todo를 한번만 사용한다면 위처럼 사용가능

// 보통은 아래처럼
function Todo ({title}) {
    return <div>{title}</div>;
};

export default Todo;

```

```js
import react, {Component} from 'rect';

class Todolist extends Component {
    state = {						// 
        todos: [],
    };
	render() {
        const { todos } = this.state; // state 안에 todos 항목을 가지고온다.
    	return (
       		<div>						// html과 유사하게 사용한다.
                <button onClick={}>할일추가</button>
                {todos}
            </div>   	
        );
    }
}
```

https://velopert.com/3612

https://velopert.com/3626

리액트 공부



#### p63 객체 비구조화

```html
<script>
    {
        const obj1 = {age: 21, name: "Mike"}
        const {age,name} = obj1;
        console.log(age); //21
        console.log(name);// Mike
        

    }

    {
        const obj1 = {age: 21, name: "Mike"}
        const {name,age} = obj1;    // 객체는 배열과 다르게 순차가 아니라 이름으로 인식
        console.log(age);   //21
        console.log(name); // Mike
    }

    {
         const obj1 = {age: 21, name: "Mike"}
        const {age: a, name: b} = obj1;    // 굳이 a,b로 쓰고싶다면 이처럼 별칭을 이용 가능
        console.log(a);   //21
        console.log(b); // Mike
    }

    {
        const obj = {age: undefined, name: null, grade: 'A'};
        const {age =0, name = 'noname', grade = 'f'} = obj;
        console.log(age);       // 0
        console.log(name);      // null
        console.log(grade);     // 'A'
    }

    {
        const obj = {age: undefined, name: "Mike"};
        const {age: newage =0, name} = obj;
        //console.log(age);     //별칭을 주면 원래의 이름은 사용불가능  
        console.log(newage);      
        console.log(name);    
    }

    {
        const obj1 = {age: 21, grade: 'A'};
        const { age = getDefultAge(), grade} = obj1;
        console.log(age);
        console.log(grade);
    }
    
        function getDefultAge() {
            return 0;
        }

    {
    const obj1 = {age: undefined, grade: 'A'};
        const { age = getDefultAge(), grade} = obj1;
        console.log(age);       //0
        console.log(grade);     //A
    }

    {
        const obj = { age : 21, name: "Mike", grade: "A"};
        const {name,grade, ...rest} =obj;  //rest 는 나머지 모두를 나타냄
        console.log(rest);
    }
        // for 문에서 객체 비구조화를 활용
    {
        const people = [
            { age: 21, name: "Mike"},
            { age: 22, name: "Jone"},
        ];
        for (i of people) {
            let age = i.age;
            let name = i.name;
            console.log(age,name); 
        }
        for (i of people) {
            console.log(i);
            console.log(i["age"], i["name"]);
        }
        for ({age,name} of people) {
            console.log(i);
            console.log(i["age"], i["name"]);
        }
    }

```



#### p65 비구조화 심화 학습

```html
<script>
    {
        const obj = {name: "Mike", mother: {name: "Sara"}};
        const { name,mother: {name: motherName}} = obj;
        console.log(name);
        console.log(motherName);

    }

    {
        const obj = {name: "Mike", mother: {name: "Sara"}};
        const { name,mother } = obj;
        console.log(name);            //Mike
        console.log(mother["Name"]);  //Sara
    }

    {
        const obj = {name: "Mike", mother: {motherName: "Sara"}};
        const { name,mother: {motherName}} = obj;
        console.log(name);
        console.log(motherName);
    }
    //  비구조화에서 기본값은 변수 단위가 아니라 패턴 단위로 적용
    {
        //  우측 배열이 비어 있기 때문에 객체 기본값을 이용
        const [ { prop: x1 } = { prop: 123 } ] = [ ];
        console.log(x1);        // 123
    }
    {
        //  우측 배열이 비어 있지 않기 때문에 객체 기본값을 이용하지 않음
        const [ { prop: x1 } = { prop: 123 } ] = [ {} ];
        console.log(x1);        // undefined
    }

    //  객체 비구조화에서 계산된 속성명을 사용
    //  객체 비구조화에서 계산된 속성명을 사용할 때는 반드시 별칭을 입력해야 함
    {
        const index = 1;
        // const { key1 } = { key1: 123 };
        const { [`key${index}`]: valueOfTheIndex } = { key1: 123 };
        console.log(valueOfTheIndex);   // 123
    }

    //  별칭을 이용해서 다른 객체와 배열의 속성값 할당

    {
        const obj = {};
        const arr = [];
        const res = { foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true };
        console.log(obj);   // { prop: 123 }
        console.log(arr);   // [ true ]
    }
</script>
    
```



#### p67 매개변수 기본값

```html
<script>
//  매개변수 기본값 설정
{
    function printLog(a = 1) {
        console.log(a);
        console.log({ a });          // <== 단축 속성명
    }
    printLog();         //  1           <== 매개변수의 기본값이 사용
                        //  { a: 1 }
    printLog(2);        //  2
                        //  { a: 2 }
}
//  매개변수 기본값으로 함수를 호출
{
    function getDefault() {
        return 1;
    }
    function printLog(a = getDefault()) {
        console.log({ a });
    }
    printLog();         // { a: 1 }
    printLog(2);        // { a: 2 }
}
//  매개변수 기본값을 이용해서 필수입력 여부를 표현
{
    function required() {
        throw new Error('필수입력입니다.');
    }
    function printLog(a = required()) {
        console.log({ a });
    }
    printLog(2);        // { a: 2 }
    printLog();         // Uncaught Error: 필수입력입니다.
}
</script>

```

동기 비동기