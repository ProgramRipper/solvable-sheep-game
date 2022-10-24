import React, { FC, useState, Suspense } from 'react';
import './App.scss';
import {
    LAST_LEVEL_STORAGE_KEY,
    LAST_SCORE_STORAGE_KEY,
    LAST_TIME_STORAGE_KEY,
} from './utils';
import { Theme } from './themes/interface';
import Game from './components/Game';
import { Title } from './components/Title';
import { PersonalInfo } from './components/PersonalInfo';

const App: FC<{ theme: Theme<any> }> = ({ theme: initTheme }) => {
    console.log('initTheme', initTheme);
    // console.log(JSON.stringify(theme));

    const [theme] = useState<Theme<any>>(initTheme);

    // 读取缓存关卡得分
    const [initLevel] = useState<number>(
        Number(localStorage.getItem(LAST_LEVEL_STORAGE_KEY) || '1')
    );
    const [initScore] = useState<number>(
        Number(localStorage.getItem(LAST_SCORE_STORAGE_KEY) || '0')
    );
    const [initTime] = useState<number>(
        Number(localStorage.getItem(LAST_TIME_STORAGE_KEY) || '0')
    );

    return (
        <>
            {theme.background && (
                <img
                    alt="background"
                    src={theme.background}
                    className="background"
                    style={{
                        filter: theme.backgroundBlur ? 'blur(8px)' : 'none',
                    }}
                />
            )}
            <Title title={theme.title} desc={theme.desc} />
            <Game
                key={theme.title}
                theme={theme}
                initLevel={initLevel}
                initScore={initScore}
                initTime={initTime}
            />
            <PersonalInfo />
            <div className={'flex-spacer'} style={{ minHeight: 52 }} />
            <Suspense fallback={<span>Loading</span>} />
        </>
    );
};

export default App;
