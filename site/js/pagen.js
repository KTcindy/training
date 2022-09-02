class Pagenation {
    constructor(obj) {
        this.wrap = obj.wrap; //容器
        this.page = obj.page || 1; //默认初始页
        this.size = obj.size || 8; //默认页面固定条数
        this.total = obj.total || 0; //默认总条数
        this.pages = Math.ceil(this.total / this.size); //默认总页数
        this.callback = obj.callback; //默认回调函数
        this.quickPages = 5; //默认快速翻页的页数
        this.interval = obj.interval ? (obj.interval < 3 ? obj.interval : 4) : 4; //默认间隔的数字是4+1=5个
        this.init(); //初始化
    }
    init = () => { //创建dom结构
        this.wrap.innerHTML = ''; //渲染元素前先清空之前的所有元素
        this.wrap.appendChild(this.prevBtn()); //添加上一页按钮
        if (this.pages > 0) {
            this.wrap.appendChild(this.pageNum()); //添加页数按钮
        }
        this.wrap.appendChild(this.nextBtn()); //添加下一页按钮
        this.switchPage(); //绑定按钮事件
    }
    changeSize = (s) => { //设置新的页码显示条数
        this.size = s || 10;
        this.pages = Math.ceil(this.total / this.size);
        this.init();
    }
    changeTotal = (t) => { //设置新的总条数
        this.total = t || 0;
        this.pages = Math.ceil(this.total / this.size);
        this.init();
    }
    switchPage = () => { //绑定按钮事件
        var _this = this; //声明变量指向当前构造函数
        let numbers = this.wrap.querySelectorAll('.number');
        for (let i = 0, len = numbers.length; i < len; i++) {
            numbers[i].onclick = function () { //数字按钮点击事件
                if (_this.page != this.innerText) {
                    console.log(_this.page, this.innerText)
                    _this.page = Number(this.innerText);
                    _this.init();
                    _this.callback(_this.page); //按钮事件回调函数
                }
            };
        }
        this.wrap.querySelector('.btn-prev').onclick = function () { //上一页按钮点击事件
            _this.page = --_this.page;
            _this.init();
            _this.callback(_this.page); //按钮事件回调函数
        };
        this.wrap.querySelector('.btn-next').onclick = function () { //下一页按钮点击事件
            _this.page = ++_this.page;
            _this.init();
            _this.callback(_this.page); //按钮事件回调函数
        };
        let quickprev = this.wrap.querySelector('.btn-quickprev')
        if (quickprev) {
            quickprev.onclick = function () { //快速向上翻多页按钮点击事件
                _this.page = _this.page - _this.quickPages < 0 ? 1 : _this.page - _this.quickPages;
                _this.init();
                _this.callback(_this.page); //按钮事件回调函数
            };
            quickprev.onmouseenter = function (e) { //快速向上翻多页按钮鼠标移入事件
                e.target.classList.add('active_page');
                e.target.innerText = '<<';
            };
            quickprev.onmouseleave = function (e) { //快速向上翻多页按钮鼠标移出事件
                e.target.classList.remove('active_page');
                e.target.innerText = '...';
            };
        }
        let quicknext = this.wrap.querySelector('.btn-quicknext')
        if (quicknext) {
            quicknext.onclick = function () { //快速向下翻多页按钮点击事件
                _this.page = _this.page + _this.quickPages > _this.pageT ? _this.pageT : _this.page + _this.quickPages;
                _this.init();
                _this.callback(_this.page); //按钮事件回调函数
            };
            quicknext.onmouseenter = function (e) { //快速向下翻多页按钮鼠标移入事件
                e.target.classList.add('active_page');
                e.target.innerText = '>>';
            };
            quicknext.onmouseleave = function (e) { //快速向下翻多页按钮鼠标移出事件
                e.target.classList.remove('active_page');
                e.target.innerText = '...';
            };
        }
    }
    prevBtn () { //添加上一页按钮
        let btnprev = document.createElement('button');
        btnprev.setAttribute('class', 'btn-prev');
        btnprev.setAttribute('type', 'button');
        btnprev.innerText = '<';
        if (this.page === 1 || this.pages <= 0) {
            btnprev.setAttribute('disabled', true);
        } else {
            btnprev.removeAttribute('disabled');
        }
        return btnprev;
    }
    nextBtn () { //添加下一页按钮
        let btnnext = document.createElement('button');
        btnnext.setAttribute('class', 'btn-next');
        btnnext.setAttribute('type', 'button');
        btnnext.innerText = '>';
        if (this.page === this.pages || this.pages <= 0) {
            btnnext.setAttribute('disabled', true);
        } else {
            btnnext.removeAttribute('disabled');
        }
        return btnnext;
    }
    pageNum = () => {
        //添加页数按钮
        let ol = document.createElement('ol'); //数字按钮区域容器
        ol.classList.add(this.wrap.id + '_pager');
        let currentPage = this.page;
        let resetPages = this.pages;
        let first = currentPage <= this.interval ? 1 : currentPage > (resetPages - this.interval) ? resetPages - (this.interval + 1) : currentPage - (this.interval - 1);
        first = first === 0 ? 1 : first;
        ol.appendChild(this.renderNum(1));
        if (first - 1 >= 1) {
            ol.appendChild(this.renderButton('btn-quickprev'));
        }
        let last = first + this.interval + 2;
        for (let i = first + 1; i < last; i++) {
            if (i === resetPages - this.interval && last > resetPages) {
                ol.appendChild(this.renderNum(first));
            }
            if (i <= resetPages) {
                ol.appendChild(this.renderNum(i));
            }
            if (i === last - 1 && resetPages - i > 1) {
                ol.appendChild(this.renderButton('btn-quicknext'));
                ol.appendChild(this.renderNum(resetPages));
            }
        }
        return ol;
    }
    //渲染数字按钮结构
    renderNum = (i) => {
        let num = document.createElement('li');
        num.classList.add('number');
        num.innerText = i;
        if(i === this.page) {
                 num.classList.add('active_page');
        }
        return num;
    };
    renderButton = (name) => {
        //渲染翻页按钮结构
        let button = document.createElement('li');
        button.classList.add(name);
        button.innerText = '...';
        return button;
    }
}