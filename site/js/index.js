window.addEventListener('load', function () {
    let polling = this.document.getElementById('polling')

    // 获取图片 和 小点
    var imgs = this.document.querySelectorAll('.img');
    var dots = this.document.querySelector('.dots').querySelectorAll('span');

    // 给图片设置index 属性，好判断当前的图片是哪一张
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('data-index', i);
    }

    // 获取当前图片 和 图片的index（数组下标）
    var current = this.document.querySelector('.current');
    var currentIndex = current.getAttribute('data-index');

    //获取鼠标左右滑动事件
    polling.onmousedown = function (e) {
        e.preventDefault();
        var a1 = e.screenX;
        polling.onmouseup = function (e) {
            e.preventDefault();
            var a2 = e.screenX;
            if (a1 > a2) {
                // 左滑
                if (currentIndex > 0) {
                    imgs[currentIndex].classList.remove('current');
                    dots[currentIndex].classList.remove('square');
                    imgs[--currentIndex].classList.add('current');
                    dots[currentIndex].classList.add('square');
                } else {
                    imgs[currentIndex].classList.remove('current');
                    dots[currentIndex].classList.remove('square');
                    currentIndex = 4;
                    imgs[currentIndex].classList.add('current');
                    dots[currentIndex].classList.add('square');
                }
            }
            if (a1 < a2) {
                // 右滑
                changeImage()
            }
        }
    }
    var timer = this.setInterval(changeImage, 5000);

    function aniemMethods () {
        // console.log(currentIndex - 1, 'currentIndex');
        // console.dir(document.querySelectorAll('.path-loop')[currentIndex],'1')
        anime({//用animejs画圈
            targets: '.square .path-loop',
            delay: 750,
            strokeDashoffset: function (el) {
                var svgLength = anime.setDashoffset(el);
                return [svgLength, 0];
            },
            easing: 'linear',
            duration: 4000,
        });
    }

    function changeImage () {
        if (currentIndex < 4) {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            imgs[++currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
            aniemMethods()
        } else {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            currentIndex = 0;
            imgs[currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
            aniemMethods()
        }
    };

    // 小圆点的点击事件
    for (let k = 0; k < dots.length; k++) {
        dots[k].setAttribute('data-index', k);
        dots[k].addEventListener('click', function () {
            var index = this.getAttribute('data-index');
            if (index != currentIndex) {
                imgs[currentIndex].classList.remove('current');
                dots[currentIndex].classList.remove('square');
                imgs[index].classList.add('current');
                dots[index].classList.add('square');
                currentIndex = index;
            }
        })
    }
});

//  监听滚动事件
function getTop () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    return scrollTop
}

function getDom (clsName) {
    var obj = document.getElementsByClassName(clsName);
    return obj;
}
// 动画处理函数
function getAnimation (target, add) {
    let navContent = getDom(target)
    for (let index = 0; index < navContent.length; index++) {
        navContent[index].classList.add(add)
    }
}
function debounce (fn, delay = 500) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
window.addEventListener('scroll', function () {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight;
    console.log(viewPortHeight,getTop())
    if (getTop() >= 700) {
        // 此处特殊处理移动端 动画效果
        var sUserAgent = navigator.userAgent;
        if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
            return
        }
        anime({
            targets: ['.img-content-nav'],
            translateX: 150,
            duration: 500,
        });
    }
    // console.log(getTop())
    if (getTop() >= 1900) {
        // 团队介绍
        getAnimation('title_text', 'introduce-animation')
        getAnimation('introduce_message', 'text-animation')
    }
    if (getTop() >= 2500) {
        // 新闻动态
        getAnimation('news_text', 'introduce-animation')
        getAnimation('news_content_message', 'text-animation')
    }
})

