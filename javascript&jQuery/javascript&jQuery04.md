#### p162 화살표함수

```html
<html>
    <head>
        <script>
            // function sum (a,b=0,c=0) {
            //     return a + b + c;
            // }

            // let sum = function (a, b, c, ){
            //     return a + b + c;
            // };

            // 화살표함수 추천
            let sum = (a,b=0,c=0) => {
                return a + b + c;
            };
            
            console.log(sum(1));
            console.log(sum(1,2));
            console.log(sum(1,2,3));
        </script>
    </head>
    <body></body>
</html>

```

#### p164 전개연산자

```html
<html>
    <head>
        <script>
            function test(a,b, ...values) {
                console.log('a', a);
                console.log('b', b);
                values.forEach(i => console.log('values', i));
            }

            let value = [1,2,3,4,5,6,1,2];
            test(...value,...value);
        </script>
    </head>
    <body></body>
</html>

```

#### p171 배열 vs 객체

```html
<html>

<head>
    <script>
        //  배열 요소에 접근하기 위해서는 배열의 인덱스를 이용
        let colors = [ '빨강', '파랑', '초록' ];
        console.log(colors);     
        console.log(colors[0]);     

        //  객체 요소에 접근하기 위해서는 속성의 이름을 이용
        //  객체에 정의되어 있는 함수를 메소드라고 한다.
        let person = {
            name: '홍길동', 
            age: 23,
            'isMarried': false,
            'favorite colors' : [ '빨강', '초록' ],
            hello: function () { return "안녕, 나는 홍길동이야"; }, 
        };
        console.log(person);
        console.log(person.name);
        console.log(person['name']);
        console.log(person['favorite colors']);
        console.log(person.hello());
    </script>
</head>

<body></body>

</html>

```

this : 객체가 가지고 있는 속성

```html
<html>
<head>
    <script>
        //  객체 요소에 접근하기 위해서는 속성의 이름을 이용
        let person = {
            firstName : "길동", 
            lastName : "홍", 
            id : 1234, 
            getFullName : function() {
                return this.lastName + this.firstName;
            }
        };
        console.log(person);
        console.log(person.lastName + person.firstName);    //  홍길동
        console.log(person.getFullName());                  //  홍길동
    </script>
</head>
<body></body>
</html>
```

#### p176 객체와 반복문

```html
<html>
<head>
    <script>
        //  객체 요소에 접근하기 위해서는 속성의 이름을 이용
        let person = {
            firstName : "길동", 
            lastName : "홍", 
            id : 1234, 
            getFullName : function() {
                return this.lastName + this.firstName;
            }
        };
        
        //  for in 구문을 이용해서 객체 내부를 출력
        for (let key in person) {
            console.log(`${key} : ${person[key]}`);
        }
    </script>
</head>
<body></body>
</html>
```

#### p177 객체 관련 키워드 : in, with

```html
<html>
<head>
    <script>
        let score = {
            C: 80, 
            Java: 90, 
            Python: 100,
        };

        console.log(`score 객체에 Java 점수 항목이 포함되어 있나요? ${'Java' in score}`);
        console.log(`score 객체에 JavaScript 점수 항목이 포함되어 있나요? ${'JavaScript' in score}`);

        //  각 과목별 점수를 출력
        console.log(`C : ${score.C}`);
        console.log(`Java : ${score.Java}`);
        console.log(`Python : ${score.Python}`);

        with(score) {
            console.log(`C : ${C}`);
            console.log(`Java : ${Java}`);
            console.log(`Python : ${Python}`);
        }
    </script>
</head>
<body></body>
</html>
```

#### p182 객체의 속성 추가 및 제거

```html
<html>
<head>
    <script>
        let person = {};

        person.name = '홍길동';
        person.age = 23;
        person.isMarried = false;
        // person 객체가 가지고 있는 모든 속성과 속성값을 반환하는 메소드 
        person.toString = function() {
            let output = '';
            for (let key in person) {
                if (key != 'toString') {
                    output += `${key} : ${person[key]}\n`;
                }
            }
            return output;
        };

        console.log(person.toString());

        delete person.name;
        console.log(person.toString());

        delete(person.isMarried);
        console.log(person.toString());
    </script>
</head>
<body></body>
</html>
```

``

```html
<html>
<head>
    <script>
        let students = [];
    students.push({ name: 'aaa', korean: 46, math: 65, english: 25, science: 64 });
    students.push({ name: 'bbb', korean: 56, math: 63, english: 85, science: 62 });
    students.push({ name: 'ccc', korean: 56, math: 63, english: 22, science: 43 });
    students.push({ name: 'ddd', korean: 12, math: 25, english: 26, science: 23 });
    students.push({ name: 'eee', korean: 18, math: 85, english: 25, science: 25 });
    students.push({ name: 'fff', korean: 32, math: 22, english: 79, science: 25 });
    students.push({ name: 'ggg', korean: 52, math: 26, english: 42, science: 42 });
    students.push({ name: 'hhh', korean: 22, math: 25, english: 41, science: 56 });
    students.push({ name: 'iii', korean: 87, math: 79, english: 25, science: 86 });
    students.push({ name: 'jjj', korean: 24, math: 42, english: 71, science: 88 });
        // 학생별 총점, 평균점을 구하는 메소드를 추가
    students.forEach(student => {
        console.log(typeof student);
        console.log(student);
        // 총점을 구하는 메소드를 추가
        student.getSum = function(){
            return this.korean + this.math + this.english + this.science;
        };
        // 평균점을 구하는 메소드를 추가
        student.getAverage = function() {
            return this.getSum() /4;
        };
    });
    
    // 학생별 총점, 평균점을 출력
    students.forEach(student => {
        console.log(`이름 : ${student.name}, 총점 : ${student.getSum()}, 평균 : ${student.getAverage()}`);
    });

    </script>
</head>
<body></body>
</html>
```



#### p189 함수를 사용한 객체 생성

```html
<html>
<head>
    <script>
        function makeStudent(name, korean, math, english, science) {
            let result = {
                name : name,
                korean : korean,
                math : math, 
                english : english, 
                science : science,
                getSum : function() {
                    return this.korean + this.math + this.english + this.science;
                }, 
                getAverage : function() {
                    return this.getSum() / 4;
                }
            };
            return result;
        }
        let students = [];
        students.push(makeStudent('aaa', 46, 65, 25, 64));
        students.push(makeStudent('bbb', 56, 63, 85, 62));
        students.push(makeStudent('ccc', 56, 63, 22, 43));
        students.push(makeStudent('ddd', 12, 25, 26, 23));
        students.push(makeStudent('eee', 18, 85, 25, 25));
        students.push(makeStudent('fff', 32, 22, 79, 25));
        students.push(makeStudent('ggg', 52, 26, 42, 42));
        students.push(makeStudent('hhh', 22, 25, 41, 56));
        students.push(makeStudent('iii', 87, 79, 25, 86));
        students.push(makeStudent('jjj', 24, 42, 71, 88));

        students.forEach(student => {
            with(student) {
                console.log(`이름 : ${name}, 총점 : ${getSum()}, 평균 : ${getAverage()}\n`);
            }
        })
    </script>
</head>
<body></body>
</html>
```

#### p192 옵션객체 초기화

```html
<html>
<head>
    <script>
        //  test 함수는 obj 객체를 매개변수로 받아들인다.
        function test(obj) {
            obj.valueA = obj.valueA || 0;
            obj.valueB = obj.valueB || 0;
            obj.valueC = obj.valueC || 0;

            with(obj) {
                console.log(`${valueA} : ${valueB} : ${valueC}`);
            }
        }
        test({ valueA: 52, valueB: 273 });
    </script>
</head>
<body></body>
</html>
```

#### p194 참조복사와 값복사 ☆

```html
<html>
<head>
    <script>
        let oldValue = 10;
        let newValue = oldValue;			//	값을 복사
        console.log(oldValue, newValue);    //  10, 10

        oldValue = 100;
        console.log(oldValue, newValue);    //  100, 10

        let oldArray = [ 10, 20 ];
        let newArray = oldArray;			//	주소를 공유
        console.log(oldArray, newArray);    //  [10, 20] [10, 20]

        oldArray[0] = 100;
        newArray[1] = 999;
        console.log(oldArray, newArray);    //  [100, 999] [ 100, 999 ]

        let oldObject = { name: 'aaa', age: 50 };
        let newObject = oldObject;          //	주소를 공유
        console.log(oldObject, newObject);  // 	{name: 'aaa', age: 50} {name: 'aaa', age: 50} 

        oldObject.name = 'bbb';         
        newObject.age = 30;
        console.log(oldObject, newObject);  // 	{name: 'bbb', age: 30} {name: 'bbb', age: 30}

        // 	매개변수로 전달된 obj와 동일한 구조와 값을 가지는 객체를 만들어서 반환하는 함수
        function cloneObject(obj) {
            let output = {};
            for (let key in obj) {
                output[key] = obj[key];
            }
            return output;
        }
        let oldObject2 = { name: 'xyz', age: 123 };
        let newObject2 = cloneObject(oldObject2);
        console.log(oldObject2, newObject2); // {name: 'xyz', age: 123} {name: 'xyz', age: 123}

        oldObject2.name = 'zzz';
        newObject2.age = 999;
        console.log(oldObject2, newObject2); // {name: 'zzz', age: 123} {name: 'xyz', age: 999}

	  // 	매개변수로 전달된 arr와 동일한 크기와 값을 가지는 배열을 만들어서 반환하는 함수
        function cloneArray(arr) {
            let output = [];
            for (let i of arr) {
                output.push(i);
            }
            return output;             
        }
        let oldArray2 = [ 10, 20 ];
        let newArray2 = cloneArray(oldArray2); 
        console.log(oldArray2, newArray2);  // [ 10, 20 ]  [ 10, 20 ]

        oldArray2[0] = 100;
        newArray2[1] = 200;
        console.log(oldArray2, newArray2);  // [ 100, 20 ] [ 10, 200 ]
    </script>
</head>
<body></body>
</html>

```

#### p200 전개 연산자를 사용한 배열 테크닉

```html
<script>
        // 전개 연산자를 이용한 배열의 깊은 복사
        let oldArray = [ 1, 2, 3, 4 ];
        let newArray = [...oldArray];
        console.log(oldArray, newArray);    //  [ 1, 2, 3, 4 ] [ 1, 2, 3, 4 ]

        oldArray[0] = 100;
        newArray[1] = 200;
        console.log(oldArray, newArray);    //  [ 100, 2, 3, 4 ] [ 1, 200, 3, 4 ]
</script>


<script>
        // 전개 연산자를 이용한 배열 합병
        let arrayA = [ 1, 2, 3 ];
        let arrayB = [ 'a', 'b', 'c' ];
        let newArray = [ ...arrayA, ...arrayB ];
        console.log(newArray);  // [1, 2, 3, "a", "b", "c"]
</script>


    <script>
        //  전개 연산자를 이용한 객체 깊은 복사
        let objA = { name: 'aaa', age: 10 };
        let objB = { ...objA };
        console.log(objA, objB);    // {name: "aaa", age: 10} {name: "aaa", age: 10}

        objA.name = 'bbb';
        objB.age = 100;
        console.log(objA, objB);    // {name: "bbb", age: 10} {name: "aaa", age: 100}
    </script>
```



