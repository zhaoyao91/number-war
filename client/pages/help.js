import React from 'react';
import {Button} from 'react-bootstrap';
import {FlowRouter} from 'meteor/kadira:flow-router';

class Page extends React.Component {
    render() {
        return <div>
            <h1 style={{margin: '0 0 20px 0'}}>训练营</h1>

            <hr/>

            <h3>如何战斗？</h3>
            <p>在战斗页面，点击任意玩家，即可向他发起进攻！</p>

            <hr/>

            <h3>如何判决胜负？</h3>
            <p>每一位玩家都有一个数字，战斗时，双方使用各自数字的每一位相加后得到的数字的个位数进行pk，较大者获胜。如果用于pk的数字相同，则防守方获胜（所以不经过大脑乱点的话，战绩会越来越差哦）。</p>
            <p>例如，1122向3344发起进攻，pk时，1+1+2+2=6，个位为6，而3+3+4+4=14，个位为4，所以1122进攻获胜！ </p>
            <p>再例如，1234向9876发起进攻，pk时，1+2+3+4=10，个位为0（真惨），而9+8+7+6=30，个位也为0（真倒霉），但由于1234为进攻方，所以9876获胜。</p>

            <hr/>

            <h3>其他规则？</h3>
            <p>
                还需要说那么多干嘛？
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