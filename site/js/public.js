// 移除显示
function handleClick () {
    document.getElementById('icon').classList.remove('hidden')
}
// 添加隐藏
function handelClons () {
    document.getElementById('icon').classList.add('hidden')
}
function header (pageType) {
    let dom = ""
    dom += `<div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
                企业站
                <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1 " id="menu">
                    <nav>
                        <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                            <li class="${pageType === "index" ? 'active' : false}">
                                <a class="inline-block no-underline hover:text-black mx-6 py-2 px-4"
                                    href="./index.html">首页</a>
                            </li>
                            <li class="${pageType === "news" ? 'active' : false}">
                                <a class="inline-block no-underline hover:text-black mx-6 py-2 px-4"
                                    href="./news.html">新闻列表页</a>
                            </li>
                            <li class="${pageType === "personalCenter" ? 'active' : false}">
                                <a class="inline-block no-underline hover:text-black mx-6 py-2 px-4"
                                    href="./personalCenter.html">关于我们</a>
                            </li>

                        </ul>
                    </nav>
                </div>
                <label for="menu-toggle" class="cursor-pointer md:hidden block"  onclick="handleClick()">
                    <svg class="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>        
             </div>`
    return dom
}
function footer () {
    let dom = '';
    dom += ` <div class="footer-top md:flex flex-wrap pt-10">
                <div class="md:w-1/4 px-4 md:text-center">地址：中国山东省青岛市市南区某某中路20号</div>
                <a href="mailto: 2571595225@qq.com" class="md:w-1/4 px-4 md:text-center">邮箱：1370XXX171@qq.com</a>
                <div class="md:w-1/4 px-4 md:text-center">电话：0591-88888888</div>
             </div>
            <div class="footer-bottom flex pt-10 pb-6">
                <div class="px-2 w-1/6 xl:w-1/3 flex justify-end"><img
                        src="./img/911B38D2-D3A0-490A-893D-B5743077E0CD.png" alt=""></div>
                <div class="w-5/6 xl:w-1/2">Copyright © 2009 - 2022 Cld , All Rights Reserved 某某网络科技有限公司 版权所有
                    陕ICP备xxxxxxx号</div>
            </div>`
    return dom
}
function newsList (pagelist,data) {
    let dom = "" //容器元素
    for (let i = 0; i < pagelist.length; i++) {
        let { content, img, title, id } = data[i]
        dom += `<a href="./NewsDetailsPage.html?id=${id}" class="ease-in-out block block-ds h-full p-4 sm:w-1/2 md:w-1/4 xl:1/2">
                <div class="img-wrap overflow-hidden">
                    <img id="img" class="transition duration-500 w-full ease-in-out bg-blue-600 hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110" src="./img/9F27B6F4-AE35-4E04-90A1-5C29FEA20C59.png" data-src="${img}" />    
                </div>
                <div class="content_message">
                    <h5 class="pb-4 font-semibold text-base h-20 py-4">${title}</h5>
                    <p class="text-sm leading-loose">${content}</p>
                </div>
            </a>
            `
    }
    return dom
}
function https (get, URL) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open(get, URL, true);//读取本地json
        xhr.send(null);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    let data = JSON.parse(xhr.response)
                    resolve(data)
                }
            }
        }
    })
}