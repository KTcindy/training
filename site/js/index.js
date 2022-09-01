window.addEventListener('load', function() {
    var leftArrow = this.document.querySelector('.lf');
    var rightArrow = this.document.querySelector('.lr');
 
    // 鼠标移动到左右箭头的位置更换图片 有灰色背景的图片
    leftArrow.addEventListener('mouseenter', function() {
        this.style.backgroundPosition = '0 0';
    });
 
    leftArrow.addEventListener('mouseleave', function() {
        this.style.backgroundPosition = '-83px 0';
    });
 
    rightArrow.addEventListener('mouseenter', function() {
        this.style.backgroundPosition = '-42px 0';
    });
 
    rightArrow.addEventListener('mouseleave', function() {
        this.style.backgroundPosition = '-123px 0';
    });
 
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
 
    // 左箭头的点击事件，点击了就返回前一张图片 
    // 如果当前图片为第一张那么需要更换到最后一张图片也就是第四张
    leftArrow.addEventListener('click', function () {
        clearInterval(timer)
        
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
    });
 
    // 点击右箭头下一张图片切换
    // 如果当前为第五张图片，那么切换回第一张图片
    rightArrow.addEventListener('click', changeImage);
 
    var timer = this.setInterval(changeImage, 5000);
 
    function changeImage () {
        clearInterval(timer)
        if (currentIndex < 4) {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            imgs[++currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
            
            anime({//用animejs画圈
				targets: '.square .path-loop',
				delay: 750,
				strokeDashoffset: function(el) {
                    var svgLength = anime.setDashoffset(el);
					return [svgLength, 0];
				},
				easing: 'linear',
				duration: 4000,
			});
        } else {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            currentIndex = 0;
            imgs[currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        }
    };
 
    // 小圆点的点击事件
    for (let k = 0; k < dots.length; k++) {
        dots[k].setAttribute('data-index', k);
        dots[k].addEventListener('click', function() {
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
//

//  监听滚动事件
function getTop(){ 
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    return scrollTop
}

function getDom(clsName){
    var obj = document.getElementsByClassName(clsName);
    return obj;
}
// 动画处理函数
function getAnimation (target,add) {
    let navContent = getDom(target) 
    for (let index = 0; index < navContent.length; index++) {
        navContent[index].classList.add(add)
    }
}
window.addEventListener('scroll', function () {
    if (getTop() >= 600) {
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
    if (getTop() >= 1900) {
        // 团队介绍
        getAnimation('title_text', 'introduce-animation')
        getAnimation('introduce_message','text-animation')
    }
    if (getTop() >= 2500) {
        // 新闻动态
        getAnimation('news_text', 'introduce-animation')
        getAnimation('news_content_message','text-animation')
    }
})
