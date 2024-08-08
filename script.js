// 目次の自動生成
const tocList = document.getElementById('tocList');
const topics = document.querySelectorAll('.topic');

topics.forEach(topic => {
    const title = topic.querySelector('h3').textContent;
    const id = topic.id;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = title;
    li.appendChild(a);
    tocList.appendChild(li);
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// コピーボタンの機能
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const pre = button.nextElementSibling;
        const code = pre.querySelector('code');
        const range = document.createRange();
        range.selectNode(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        button.textContent = 'コピーしました!';
        setTimeout(() => {
            button.textContent = 'コピー';
        }, 2000);
    });
});