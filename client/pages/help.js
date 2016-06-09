import React from 'react';
import {Button} from 'react-bootstrap';
import {FlowRouter} from 'meteor/kadira:flow-router';

class Page extends React.Component {
    render() {
        return <div>
            <h1 style={{margin: '0 0 20px 0'}}>训练营</h1>

            <hr/>

            <h3>什么是显示数字？</h3>
            <p>在战斗页面，你将看到玩家列表和固定在底部的个人战斗状态，其中右侧展示的数字，即为每个玩家的显示数字。</p>

            <hr/>

            <h3>什么是战斗数字？</h3>
            <p>将显示数字的每一位相加后，得到的数字的个位部分，即为战斗数字，列如，若显示数字为357，则3+5+7=1<span style={{color: 'red'}}>5</span>，因此，其对应的战斗数字为<span style={{color: 'red'}}>5</span>。</p>

            <h3>什么是战斗模式？</h3>
            <p>个人战斗状态栏左边显示的即为自己的战斗模式，可能是“比大”或“比小”</p>

            <hr/>

            <h3>如何战斗？</h3>
            <p>在战斗页面，点击任意玩家，即可向他发起进攻！</p>
            <p>战斗时，根据进攻方的战斗模式，比较双方的战斗数字大小来判决胜负。</p>
            <p>战斗数字相同时，判进攻方失败。</p>

            <hr/>

            <h3>其他规则？</h3>
            <p>
                真的木有啦~
                <Button href={FlowRouter.path('game')} bsStyle="primary">赶紧来战斗吧！</Button>
            </p>

            <hr/>

            <h3>联系我们？</h3>
            <p>
                本产品由
                <a href="http://www.ydcy-tech.com" target="blank">悦动创艺</a>
                无聊出品。
            </p>
            <p>
                想整点儿更有趣的创意？猛戳
                <a href="http://www.pangkers.com" target="blank">旁客网</a>
                。
            </p>
        </div>
    }
}

export default Page;