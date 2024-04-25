import {nextTick} from 'vue';
import '/@/theme/loading.scss';

/**
 * 页面全局 Loading
 * @method start 创建 loading
 * @method done 移除 loading
 */
export const NextLoading = {
    // 创建 loading
    start: () => {
        const bodys: Element = document.body;
        const div = <HTMLElement>document.createElement('div');
        div.setAttribute('class', 'loading-next');
        const htmls = `
        <h1>目前网站上游出现问题，有问题请至tg群组:<br><a href="https://t.me/FYLink_Group">https://t.me/FYLink_Group</a></h1>
			<div class="loading-next-box">
				<div class="loading-next-box-warp" >
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
					<div class="loading-next-box-item"></div>
                    <div>
                          <h3>  </h3>
                         <h3>loading...</h3>
                         <h3>tg群组:</h3>
                         <he><a href="https://t.me/FYLink_Group">https://t.me/FYLink_Group</a></h3>
                    <div>
				</div>

			</div>
		`;
        div.innerHTML = htmls;
        bodys.insertBefore(div, bodys.childNodes[0]);
        window.nextLoading = true;
    },
    // 移除 loading
    done: (time: number = 0) => {
        nextTick(() => {
            setTimeout(() => {
                window.nextLoading = false;
                const el = <HTMLElement>document.querySelector('.loading-next');
                el?.parentNode?.removeChild(el);
            }, time);
        });
    },
};
