(function(){
    'use strict';

    var question = document.getElementById('question');
    var btn = document.getElementById('btn');
    var answers = document.querySelectorAll('#answers > li');
    var shuffledAnswers;
    var result = document.getElementById('result');
    var scoreLabel = document.querySelector('#result > p');

    var commentary = document.getElementById('commentary');

    //クイズの中身
    var quizSet = [
        {q: 'A 紅一点は中国の詩に由来する言葉ですが、紅一点とは何の花をさすでしょうか？' , a: ['A0 ザクロ','A1 バラ','A2 ボタン'] , c: '緑一面の世界に真っ赤なザクロの花が一輪だけ咲いていて目立つことが語源です'},
        {q: 'B 目からうろこの語源はある人物が起こした奇跡です。その人物は誰でしょうか？' , a: ['B0 キリスト','B1 ムハンマド','B2 ブッタ'] ,
        c: 'キリスト教を迫害していたサウロの目が見えなくなった時、イエスに使わされたアナニヤがサウロの目の上に手を置くと、サウロは目が見えるようになりました。 <br><br> この時サウロが、「目から鱗のようなものが落ちた」といったことから。'},
        {q: 'C サボるの語源は何語でしょうか？' , a: ['C0 フランス語','C1 ロシア語','C2 ギリシャ語'] , c: 'フランス語で労働争議中の労働者による生産設備等の破壊行動を指します。転じて日本では意図的な怠業を指す言葉となりました。'}

    ];

    var currentNum = 0;
    var isAnswered;
    var score = 0;

    //[1 2 3 4 5] -> [1 2 5 4 3] 一つずつ入れ替えて外していく
    function shuffle(arr){
        var i;
        var j;
        var tmp;
        for(i = arr.length -1; i >=0 ;i--){
            j = Math.floor(Math.random()* (i+1));
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }


    function setQuiz(){
        var i;

        question.textContent = quizSet[currentNum].q;
        shuffledAnswers = shuffle(quizSet[currentNum].a.slice());
        isAnswered = false;

        for(i =0; i < answers.length ; i++){
            answers[i].classList.remove('correct');
            answers[i].classList.remove('wrong');
            answers[i].textContent = shuffledAnswers[i];
        }

        btn.classList.add('disabled');
        //最後の問題のみ id="btn"　のテキストを変更
        if(currentNum === quizSet.length -1){
            btn.textContent = 'show score';
        }
    }


    function setEvents(){
        var i;
        for(i=0; i< answers.length ; i++){
            answers[i].addEventListener('click', function(){
                checkAnswer(this);
            });
        }

        btn.addEventListener('click', function(){
            if(this.classList.contains('disabled')){
                return;
            }

            //次の問題に移行したら解説消す
            commentary.innerHTML  = '';

            //クイズ終了
            if(currentNum === quizSet.length){
            scoreLabel.textContent = 'score:' + score + '/'+ quizSet.length;
            result.classList.add('show');
            }else{
                setQuiz();
            }

        });
    }


    function checkAnswer(node){
        if(isAnswered){
            return;
        }
        isAnswered = true;
        if(node.textContent === quizSet[currentNum].a[0]){
            node.textContent += '...正解!'
            node.classList.add('correct');
            score++;
            //解説表示　innerHTMLでタグ有効
            commentary.innerHTML  = '<b>【解説】</b>' + '<br>' + quizSet[currentNum].c
        }else{
            node.textContent += '...間違い!'
            node.classList.add('wrong');
        }
        btn.classList.remove('disabled');

        currentNum++;
    }


    setQuiz();
    setEvents();


})();
