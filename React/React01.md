# 리액트

페이스북에서 만든 UI라이브러리 이다.

UI에 특화 전반적인 시스템을 직접 구축할 수 있으니 각자의 환경에 맞게 최적화할 수 있다.

반대로 신경 쓸 것이 많기 때문에 초심자에게 진입 장벽이 된다.



create-react-app => 리액트의 진입 장벽을 낮추기 위해서 제공

*하지만 create-react-app을 사용하면 동작 원리를 알기 어려우니 책에서는 바닥부터...

작업 디렉터리 생성



부트스트렙

가상돔 - 문서를 통으로 업데이트 하는것이 아니라 변경된 부분들만 바꿔치기 하는것

성능 최적화 가능

작업 디렉터리를 생성#1 명령 프롬프트(cmd.exe) 실행
\#2 작업 디렉터리 생성 및 이동

C:\Users\myanj>mkdir c:\react

C:\Users\myanj>cd 

C:\reactC:\react>
\#3 Visual Studio Code 실행
\#4 File > Open Folder … > C:\react 를 선택 후 Open
\#5 create-react-app 패키지 설치C:\react>npm install -g create-react-app
\#6 create-react-app으로 리액트 프로젝트 생성C:\react>create-react-app hello-react
\#7 디렉터리 이동 후 실행C:\react>cd hello-reactC:\react>npm start

```html
<html>
    <body>
        <h2>안녕하세요. 이 프로젝트가 마음에 드시면 좋아요 버튼을 눌러 주세요.</h2>
        <div id = "react-root">
            <button>좋아요</button>

        </div>
        <!-- <script src = "react.development.js"></script>
        <script src = "react-dom.development.js"></script>
        <script src = "sample1.js"></script> -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script>
            $(function(){
                // liked 변수의 값이 false 이면 "좋아요 취소" 를 보여주고
                // true 이면 "좋아요" 를 보여준다.
                let liked = false;
                $('button').click(function(){
                    liked = !liked;
                    if (liked) $(this).text('좋아요');
                    else $(this).text('좋아요 취소');
                });

                $('button').trigger('click');
                //상태(false)와 화면(좋아요)의 불일치를 보완하기 위해 리액트가 필요
                
                // $("button").click(function(){
                //     if ($(this).text() == "좋아요"){
                //         $(this).text("좋아요 취소");
                //      } else {
                //          $(this).text("좋아요");
                //      }
                // });
            });
        </script>

    </body>
</html>
```



```html

```

해쉬(hash)

1. 임의의 크기 입력 => 고정 크기 출력

2. 유일성 보장 => 무결성 보장 (권한이있는 사용자가 절차에 맞게 조작했음을 보장)

3. 단방향성 = 일방향성

   a 에서 H(a) 얻는건 가능 반대로는 불가능

4. 빠른 연산

5. 충돌회피 (고정 크기 출력값보다 입력이 더 클경우 중복(충돌)이 발생할 가능성이 있음 )

   인증(Authentication) 			인가(Authorization)

- type1 - 지식기반인증
- type2 - 소유기반인증
- type3 - 특징기반인증



자바스크립트 파일에서 import 키워드를 이용해서 가져온 CSS 파일 → build/static/css/main.{해시값}.chunk.css 파일에 모두 저장

해시값으로 무결성 보장, 캐시 컨트롤 가능