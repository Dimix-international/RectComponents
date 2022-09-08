import './slider.css';
import {SliderProps} from "./Slider.props";
import {useRef, useState} from "react";

const cn = require('classnames');
const FADE_DURATION = 300;

export const Slider = ({reviews}: SliderProps): JSX.Element => {

    const [slide, setSlide] = useState(0);
    const [fadeState, setFadeState] = useState<'fade-in' |'fade-out'>('fade-in');
    const currentTimer = useRef<NodeJS.Timeout | undefined>(undefined);


    const handlerClick = (move: number) => {
        const timer = setTimeout(() => {
            setSlide(s => s + move);
            setFadeState('fade-in');
        }, FADE_DURATION);

        clearTimeout(currentTimer.current);
        setFadeState('fade-out');
        currentTimer.current = timer
    }

    return (
        <div className={'slider'}>
            <div className={cn('slide', fadeState)} style={{
                transitionDuration: `${FADE_DURATION}ms`
            }}>
                <div className="left">
                    <div className="text">
                        { reviews[slide].text }
                    </div>
                    <div className="name">
                        { reviews[slide].name }
                    </div>
                    <div className="jobPosition">
                        { reviews[slide].jobPosition }
                    </div>
                </div>
                <div
                    className="right"
                    style={{
                        backgroundImage: `url(${reviews[slide].image})`
                    }}
                >
                </div>
            </div>

            {
                slide > 0 && <button className={cn('arrow', 'arrowLeft')} onClick={() => handlerClick(-1)}>
                    {'>'}
                </button>
            }
            {
                slide < reviews.length - 1 && <button className={cn('arrow', 'arrowRight')} onClick={() => handlerClick(1)}>
                    {'>'}
                </button>
            }
        </div>
    )
}