## jQuery

- 모든 브라우저에서 동작하는 클라이언트 자바스크립트 라이브러리
- 2006년 1월, 존 레식이 BarCamp NYC에서 발표
- 무료로 사용 가능한 오픈 소스 라이브러리
- jQuery는 다음 기능을 위해 제작됨
  - 문서 객체 모델과 관련된 처리를 쉽게 구현
  - 일관된 이벤트 연결을 쉽게 구현
  - 시각적 효과를 쉽게 구현
  - ajax 애플리케이션을 쉽게 개발
    - 자바스크립트를 이용해서 서버에 요청을 보낸다.(DATA만 교환) 화면 깜빡임이 없음
- 다운 로드 => https://jquery.com/download/

CDN 사용

소스코드에 추가

``` html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
```

설치해서 사용

C:\javascript>npm install jquery

![img](images/pasted image 0-1580279615813.png)

소스코드에 경로 추가

```html
 <script src="/node_modules/jquery/dist/jquery.js"></script>
```

#### p415 $(document).ready()

```html
    <script>
        //  문서가 준비되면 매개변수로 전달한 콜백 함수를 실행하라는 의미
        window.onload = () => {
            console.log("loaded");
        };
        jQuery(document).ready(function() {
            console.log("#1");
        });
        $(document).ready(function() {
            console.log("#2");
        });      
        jQuery(function() {
            console.log("#3");
        });
        $(function() {
            console.log("#4");
        });
    </script>

```

#### selector(선택자) <- DOM 특정 위치 지정(선택)

CSS 선택자의 대부분을 지원

$("*") => 전체 선택자, all selector

$(".class") => 클래스 선택자

$("#id") => 아이디 선택자

$("element") => 요소(태그, element) 선택자

$("selector1, selector2, ... , seletorN") => 다중 선택자 (multiple selector)

```html
<html>
<head>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script>
        $(function() {
            //  후손 선택자
            //  body 태그 아래의 모든 태그
            $("body *").css('color', 'red');

            //  요소 선택자(element selector)
            //  H1 태그
            $("H1").css('background', 'yellow');

            //  ID 선택자 => 해당 문서에서 유일해야 함
            $("#title").css('border', '1px solid red');

            //  클래스 선택자 
            $(".right").css('textAlign', 'right');

            //  다중 선택자
            $("span, #title, .right").css('text-decoration', 'underline');
        });

        window.onload = () => {
            let ptags = document.getElementsByTagName("p");
            for (let p of ptags) {
                p.innerText = 'ptags';
            }
            
            let title = document.getElementById("title");
            title.style.borderWidth = '3px';
            title.style.borderStyle = 'dotted';
            title.style.borderColor = 'blue';
            
            let rights = document.getElementsByClassName("right");
            for (r of rights) {
                r.style.textAlign = "center";
            }
        }; 
    </script>
</head>
<body>
    <h1 class="right">제목1</h1>
    <p>내용1내용1내용1내용1내용1내용1내용1내용1내용1내용1내용1</p>
    <p>내용1내용1내용1내용1내용1내용1내용1내용1내용1내용1내용1</p>
    <span>다른내용</span>
    <span>다른내용</span>
    <h1 id="title">제목2</h1>
    <p class="right">내용2내용2내용2내용2내용2내용2내용2내용2내용2</p>
    <span>다른내용</span>
    <span>다른내용</span>
</body>
</html>
```

#### p423 자식 선택자, 후손 선택자

https://api.jquery.com/child-selector/

자식 선택자 ⇒ $("parent > child")

후손 선택자 ⇒ $("parent child")

![img](images/pasted image 0-1580282734547.png)

```html
<html>
<head>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script>
        $(function() {
            //  ID가 menu인 ul 태그 아래 있는 모든 li 태그의 값 색깔을 파란색으로 설정
            $("ul#menu li").css('color', 'blue');
            
            //  ID가 menu인 ul 태그 바로 아래 있는 li 태그의 값에 대해 밑줄을 출력
            $("ul#menu > li").css('border', '1px solid red');
        });
    </script>
</head>
<body>
    <div>
        <ul id="menu">
            <li>첫번째</li>
            <li>두번째</li>
            <li>세번째
                <ul>
                    <li>3-1</li>
                    <li>3-2</li>
                    <li>3-3</li>
                </ul>
            </li>
            <li>네번째</li>
        </ul>
    </div>
</body>
</html>
```

p425 속성 선택자

``` html
<html>
<head>
    <script src="/node_modules/jquery/dist/jquery.js"></script>
    <script>
        $(function() {
            //  속성 선택자 
            //  $("엘리먼트이름[속성이름='속성값']")
            //  <form> 아래에서 사용하는 사용자 입력을 처리하는 태그를 제어할 때 사용
            //  <input type="text"> <input type="number"> <input type="radio"> ...
            $('ul[id="submenu"] li').css('color', 'red');
            $('ul#submenu li').css('background', 'yellow');
        });
    </script>
</head>
<body>
    <div>
        <!-- 
            <태그명 속성명="속성값" 속성명="속성값">태그값</태그명>
            태그 => element
            속성 => attribute
        -->
        <ul id="menu">
            <li>첫번째</li>
            <li>두번째</li>
            <li>세번째
                <ul id="submenu">
                    <li>3-1</li>
                    <li>3-2</li>
                    <li>3-3</li>
                </ul>
            </li>
            <li>네번째</li>
        </ul>
    </div>
</body>
</html>
```

