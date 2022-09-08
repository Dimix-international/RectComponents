import {useState} from "react";
import './menu.css';
import {IMenuItem, menu} from "./data";


export const InfinityMenu = (): JSX.Element => {

    const [isOpened, setIsOpened] = useState(false);
    const [level, setLevel] = useState(1);
    const [currentMenu, setCurrentMenu] = useState<IMenuItem[][]>([menu]);

    const selectLevel = (level:number, menu?:IMenuItem[]) => {
        if(!menu) return;

        setLevel(level);
        setCurrentMenu((prev) => {
            prev[level] = menu;
            return prev;
        })
    }

    const backLevel = () => {
        setLevel(prev => prev - 1);
        setCurrentMenu((prev) => {
            prev[level] = [];
            return prev;
        })
    }

    return (
        <>
            <button onClick={() => setIsOpened(prev => !prev)}>Открыть меню</button>

            <nav className={'menu'} role={'navigation'}>

                <div
                    className={`cover ${isOpened && 'coverShow'}`}
                    onClick={() => setIsOpened(prev => !prev)}
                />

                <div className={`mobileMenuBox ${isOpened && 'mobileMenuBoxShow'}`}>

                    <div className="menuHeader">
                        {
                            level > 1 && <button className={'back-button'} onClick={backLevel}>{'<'}Назад</button>
                        }
                        {
                            level === 1 && <div className={'back-button'}>Menu</div>
                        }
                        <button
                            className={'closeButton'}
                            onClick={() => setIsOpened(prev => !prev)}
                        >
                            X
                        </button>
                    </div>

                    <div
                        className={'level'}
                        style={{
                            transform: `translateX(calc(-100% * ${level - 1} - 24px * ${level - 1}))`
                        }}
                    >
                        {
                            currentMenu.map((item, index) => (
                                <div key={index}>
                                    {
                                        item.map((m, j) => (
                                            <div key={`${index}-${j}`}>
                                                {
                                                    m?.children && <button
                                                        className={'item'}
                                                        onClick={() => selectLevel(level + 1, m.children)}
                                                    >
                                                        {m.name}
                                                    <span>{'>'}</span>
                                                    </button>
                                                }
                                                {
                                                    m?.link && <a
                                                        className={'item'}
                                                        href={m.link}
                                                    >
                                                        {m.name}
                                                    </a>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>
            </nav>
        </>
    )
}