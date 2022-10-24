import React, { FC, Suspense, useState } from 'react';
import style from './Score.module.scss';
import { timestampToUsedTimeString } from '../utils';

const Fireworks = React.lazy(() => import('./Fireworks'));

// 该组件条件渲染
const Score: FC<{
    level: number;
    score: number;
    time: number;
    success: boolean;
    pure?: boolean;
    restartMethod: () => void;
}> = ({ level, score, time, success, restartMethod }) => {
    const [tip] = useState<string>('');

    // 综合评分
    const rating = Math.max(0, score) * 100 - Math.round(time / 1000);

    return (
        <div className={style.modal}>
            <Suspense
                fallback={
                    <span style={{ position: 'absolute' }}>🎆fireworks🎆</span>
                }
            >
                {success && <Fireworks />}
            </Suspense>
            <div className={style.inner}>
                {success ? <h1>🎉恭喜通关！</h1> : <h1>😫就差一点！</h1>}
                <table>
                    <thead>
                        <tr>
                            <th>通关数</th>
                            <th>用时</th>
                            <th>得分</th>
                            <th>综合评分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{level}</td>
                            <td>{timestampToUsedTimeString(time)}</td>
                            <td>{score}</td>
                            <td>{rating}</td>
                        </tr>
                    </tbody>
                </table>

                {tip && <div>{tip}</div>}

                {
                    <button className={'primary'} onClick={restartMethod}>
                        再来一次
                    </button>
                }
            </div>
        </div>
    );
};

export default Score;
