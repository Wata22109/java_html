const quizData = [
    {
        question: "JavaScriptの正式名称は？",
        options: ["JavaScript", "ECMAScript", "TypeScript", "CoffeeScript"],
        correct: 1,
        explanation: "JavaScriptの正式名称はECMAScriptです。JavaScriptはECMAScriptの実装の一つです。"
    },
    {
        question: "JavaScriptの変数宣言に使用されないキーワードは？",
        options: ["var", "let", "const", "string"],
        correct: 3,
        explanation: "'string'は変数宣言のキーワードではなく、データ型を表します。変数宣言には'var'、'let'、'const'を使用します。"
    },
    {
        question: "JavaScriptの配列の最初の要素のインデックスは？",
        options: ["0", "1", "-1", "2"],
        correct: 0,
        explanation: "JavaScriptの配列は0から始まるインデックスを使用します。最初の要素のインデックスは0です。"
    },
    {
        question: "JavaScriptでコメントを書く際に使用されない記号は？",
        options: ["//", "/*", "*/", "#"],
        correct: 3,
        explanation: "JavaScriptでは'//'（単一行コメント）と'/* */'（複数行コメント）を使用します。'#'はJavaScriptではコメントに使用しません。"
    },
    {
        question: "JavaScriptの等価演算子として正しいものは？",
        options: ["=", "==", "===", "===="],
        correct: 2,
        explanation: "'==='は厳密等価演算子で、値と型の両方が等しいかをチェックします。'=='は等価演算子、'='は代入演算子です。"
    },
    {
        question: "JavaScriptの'undefined'と'null'は同じ値である。",
        options: ["正しい", "誤り"],
        correct: 1,
        explanation: "誤りです。'undefined'は変数が宣言されているが値が設定されていない状態、'null'は意図的に値が空であることを示す値です。"
    },
    {
        question: "JavaScriptのイベントループは何を処理する？",
        options: ["同期処理", "非同期処理", "エラー処理", "データ処理"],
        correct: 1,
        explanation: "イベントループは非同期処理を管理します。コールスタックが空になった後、キューにある非同期タスクを実行します。"
    },
    {
        question: "JavaScriptのプロトタイプベースの継承とは何か？",
        options: ["クラスベースの継承", "オブジェクトベースの継承", "関数ベースの継承", "変数ベースの継承"],
        correct: 1,
        explanation: "JavaScriptはプロトタイプベースの言語で、オブジェクトが他のオブジェクトから直接継承します。これはクラスベースの継承とは異なります。"
    },
    {
        question: "JavaScriptのclosureの主な利点は？",
        options: ["データの隠蔽", "メモリの節約", "実行速度の向上", "コードの短縮"],
        correct: 0,
        explanation: "クロージャの主な利点はデータの隠蔽（カプセル化）です。外部からアクセスできない私的な状態を作成できます。"
    },
    {
        question: "JavaScriptのPromiseオブジェクトの状態として存在しないものは？",
        options: ["pending", "fulfilled", "rejected", "canceled"],
        correct: 3,
        explanation: "Promiseの状態は'pending'（初期状態）、'fulfilled'（成功）、'rejected'（失敗）の3つです。'canceled'という状態は存在しません。"
    }
];

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initQuiz() {
    currentQuestions = shuffleArray([...quizData]).slice(0, 5);
    currentQuestion = 0;
    score = 0;
    loadQuiz();
}

function loadQuiz() {
    const quizElement = document.getElementById("quiz");
    const currentQuizData = currentQuestions[currentQuestion];

    quizElement.innerHTML = `
        <h2>${currentQuestion + 1}. ${currentQuizData.question}</h2>
        ${currentQuizData.options.map((option, index) => `
            <div>
                <input type="radio" name="answer" value="${index}" id="option${index}">
                <label for="option${index}">${option}</label>
            </div>
        `).join("")}
    `;
}

function checkAnswer() {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (answer) {
        if (parseInt(answer.value) === currentQuestions[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < currentQuestions.length) {
            loadQuiz();
        } else {
            showResults();
        }
    } else {
        alert("回答を選択してください。");
    }
}

function showResults() {
    const resultsElement = document.getElementById("results");
    resultsElement.innerHTML = `
        <h2>クイズ終了！</h2>
        <p>正解数: ${score}/${currentQuestions.length}</p>
        <button id="showExplanations">問題の解説を見る</button>
    `;
    document.getElementById("submit").style.display = "none";
    document.getElementById("showExplanations").addEventListener("click", showExplanations);
}

function showExplanations() {
    const resultsElement = document.getElementById("results");
    let explanationsHTML = "<h2>問題の解説</h2>";
    
    currentQuestions.forEach((question, index) => {
        explanationsHTML += `
            <div class="explanation">
                <h3>${index + 1}. ${question.question}</h3>
                <p>正解: ${question.options[question.correct]}</p>
                <p>${question.explanation}</p>
            </div>
        `;
    });
    
    resultsElement.innerHTML = explanationsHTML;
}

document.getElementById("submit").addEventListener("click", checkAnswer);

initQuiz();